/**
 * Core library for the shan skills system.
 *
 * Architecture:
 *   ~/.claude/skills-library/    User library: pluggable skills shared across all projects
 *   .claude/skills-library/      Project library: pluggable skills committed to a repo
 *   ~/.claude/skills/            User outfit: core (real dirs) + pluggable (symlinks → library)
 *   .claude/skills/              Project outfit: same structure, scoped to project
 *   ~/.claude/shan/config.json   Settings (lazy-created)
 *   ~/.claude/shan/state.json    Undo/redo history + current install index (lazy-created)
 *
 * Terminology:
 *   outfit      — the effective set of active skills that CC sees
 *   library     — the canonical store of all pluggable skills (user or project)
 *   core        — real directory in outfit (shan never touches)
 *   pluggable   — symlink in outfit → library (shan manages)
 *   scope       — "user" | "project"
 *   provenance  — which library a skill comes from ("user" or "project")
 */

import { Console, Data, Effect, Option, Schema } from "effect"
import { lstat, mkdir, readdir, readFile, readlink, rm, symlink, unlink, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import * as path from "node:path"

// ── Paths ──────────────────────────────────────────────────────────

export const LIBRARY_DIR = path.join(homedir(), ".claude/skills-library")
export const USER_OUTFIT_DIR = path.join(homedir(), ".claude/skills")
export const SHAN_DIR = path.join(homedir(), ".claude/shan")
export const STATE_FILE = path.join(SHAN_DIR, "state.json")
export const CONFIG_FILE = path.join(SHAN_DIR, "config.json")

/** Project-level library. Evaluated lazily (depends on cwd). */
export const projectLibraryDir = () => path.join(process.cwd(), ".claude/skills-library")

/**
 * Library directories to search, in priority order.
 * - project scope: project library first, then user library
 * - user scope: user library only (project skills can't be installed at user scope)
 */
export const librarySearchOrder = (scope: Scope): string[] => {
  if (scope === "user") return [LIBRARY_DIR]
  return [projectLibraryDir(), LIBRARY_DIR]
}

// ── Enums ──────────────────────────────────────────────────────────

export const Scope = Schema.Literal("user", "project")
export type Scope = typeof Scope.Type

export const Commitment = Schema.Literal("core", "pluggable")
export type Commitment = typeof Commitment.Type

export const Status = Schema.Literal("on", "off")
export type Status = typeof Status.Type

export const NodeType = Schema.Literal("leaf", "group", "callable-group")
export type NodeType = typeof NodeType.Type

export const Level = Schema.Literal("error", "warning", "info")
export type Level = typeof Level.Type

// ── Frontmatter (serialization boundary) ──────────────────────────

export const SkillFrontmatter = Schema.Struct({
  name: Schema.String,
  description: Schema.String,
  whenToUse: Schema.optional(Schema.String),
  disableModelInvocation: Schema.optional(Schema.Boolean),
  argumentHint: Schema.optional(Schema.String),
})
export type SkillFrontmatter = typeof SkillFrontmatter.Type

// ── Domain Entities ───────────────────────────────────────────────

export class OutfitEntry extends Schema.TaggedClass<OutfitEntry>()("OutfitEntry", {
  name: Schema.String,
  dir: Schema.String,
  commitment: Commitment,
  scope: Scope,
  symlinkTarget: Schema.optional(Schema.String),
}) {
  static is = Schema.is(OutfitEntry)
}

export class LibraryNode extends Schema.TaggedClass<LibraryNode>()("LibraryNode", {
  colonName: Schema.String,
  libraryRelPath: Schema.String,
  nodeType: NodeType,
  frontmatter: Schema.optional(SkillFrontmatter),
}) {
  static is = Schema.is(LibraryNode)
}

// ── Internal computation types (not domain entities) ──────────────

export interface SkillInfo {
  readonly colonName: string
  readonly libraryRelPath: string
  readonly libraryDir: string        // absolute path to the library root this skill was found in
  readonly libraryScope: Scope       // which library: "user" or "project"
  readonly frontmatter: SkillFrontmatter | null
}

export interface ResolvedTarget {
  readonly colonName: string
  readonly libraryPath: string
  readonly libraryDir: string        // which library root it was found in
  readonly libraryScope: Scope       // provenance: "user" or "project"
  readonly nodeType: NodeType
  readonly leaves: SkillInfo[]
}

export interface OnOffResult {
  readonly on: string[]
  readonly skip: string[]
  readonly errors: Array<{ name: string; reason: string }>
}

// ── Two-phase validation infrastructure ─────────────────────────────

/** A validated action ready for Phase 2 execution. Generic over the action payload. */
export interface BatchValidation<$Action> {
  readonly actions: $Action[]
  readonly skips: Array<{ name: string; reason: string }>
  readonly errors: Array<{ name: string; reason: string }>
}

/** Create an empty batch validation. */
export const emptyBatch = <$Action>(): BatchValidation<$Action> => ({
  actions: [],
  skips: [],
  errors: [],
})

/** Check whether Phase 1 validation indicates abort. */
export const shouldAbort = <$Action>(batch: BatchValidation<$Action>, strict: boolean): boolean =>
  batch.errors.length > 0 || (strict && batch.skips.length > 0)

/** Log validation results using the standard output format. */
export const reportBatch = <$Action>(
  batch: BatchValidation<$Action>,
  successLabel: string,
  nameOf: (action: $Action) => string,
  options?: { aborted?: boolean },
) =>
  Effect.gen(function* () {
    if (batch.actions.length > 0 && !options?.aborted) {
      yield* Console.log(`  ${successLabel}: ${batch.actions.map(nameOf).join(", ")}`)
    }
    if (batch.skips.length > 0) {
      yield* Console.log(`  skip: ${batch.skips.map((s) => s.name).join(", ")} (${batch.skips[0]?.reason ?? "already"})`)
    }
    for (const err of batch.errors) {
      yield* Console.error(`  error: ${err.name} (${err.reason})`)
    }
    if (options?.aborted && batch.actions.length > 0) {
      yield* Console.error(`  abort: ${batch.actions.map(nameOf).join(", ")} (not applied)`)
    }
  })

// ── History (Data.TaggedEnum) ─────────────────────────────────────

interface HistoryEntryFields {
  readonly targets: ReadonlyArray<string>
  readonly scope: string
  readonly timestamp: string
  readonly snapshot: ReadonlyArray<string>
  readonly generatedRouters: ReadonlyArray<string>
}

interface FsOpFields {
  readonly targets: ReadonlyArray<string>
  readonly scope: string
  readonly timestamp: string
  readonly sourcePath: string
  readonly destPath: string
}

interface MoveOpFields {
  readonly targets: ReadonlyArray<string>
  readonly scope: string
  readonly timestamp: string
  readonly axis: "scope" | "commitment"
  readonly direction: "up" | "down"
  readonly subActions: ReadonlyArray<HistoryEntry>
}

interface DoctorOpFields {
  readonly targets: ReadonlyArray<string>
  readonly scope: string
  readonly timestamp: string
}

export type HistoryEntry = Data.TaggedEnum<{
  readonly OnOp: HistoryEntryFields
  readonly OffOp: HistoryEntryFields
  readonly MoveOp: MoveOpFields
  readonly CopyToOutfitOp: FsOpFields
  readonly MoveToLibraryOp: FsOpFields
  readonly MoveDirOp: FsOpFields
  readonly MoveLibraryDirOp: FsOpFields
  readonly DoctorOp: DoctorOpFields
}>

export const {
  OnOp,
  OffOp,
  MoveOp,
  CopyToOutfitOp,
  MoveToLibraryOp,
  MoveDirOp,
  MoveLibraryDirOp,
  DoctorOp,
  $is: isHistoryEntry,
  $match: matchHistoryEntry,
} = Data.taggedEnum<HistoryEntry>()

export interface ProjectHistory {
  entries: HistoryEntry[]
  undoneCount: number
}

export interface ScopeState {
  installs: string[] // flat names of pluggable skills installed by shan (symlinks only)
}

export interface ShanState {
  version: 2
  current: Record<string, ScopeState> // "global" for user, or project paths
  history: Record<string, ProjectHistory>
}

export interface ShanConfig {
  version: 1
  skills: {
    historyLimit: number
    defaultScope: Scope
    doctor?: {
      disabled?: string[]
    }
  }
}

// ── Errors ────────────────────────────────────────────────────────

export class SkillNotFoundError extends Data.TaggedError("SkillNotFoundError")<{
  readonly name: string
}> {}

export class CollisionError extends Data.TaggedError("CollisionError")<{
  readonly name: string
  readonly scope: string
}> {}

export class LibraryPathOccupiedError extends Data.TaggedError("LibraryPathOccupiedError")<{
  readonly path: string
}> {}

export class BrokenSymlinkError extends Data.TaggedError("BrokenSymlinkError")<{
  readonly name: string
  readonly target: string
}> {}

// ── Doctor types (used in Steps 8-9) ──────────────────────────────

export class DoctorReconciled extends Schema.TaggedClass<DoctorReconciled>()("DoctorReconciled", {
  restored: Schema.Array(Schema.String),
  removed: Schema.Array(Schema.String),
  repointed: Schema.Array(Schema.String),
  untracked: Schema.Array(Schema.String),
  newLeaves: Schema.Array(Schema.String),
  regenerated: Schema.Array(Schema.String),
  pruned: Schema.Array(Schema.String),
}) {
  static is = Schema.is(DoctorReconciled)
}

export type DoctorFinding = Data.TaggedEnum<{
  readonly BrokenSymlink: { readonly scope: string; readonly name: string; readonly symlinkTarget: string; readonly renameTo: Option.Option<string> }
  readonly StateDrift: { readonly scope: string; readonly name: string; readonly kind: "missing-symlink" | "untracked-symlink" | "irrecoverable" }
  readonly NewLeaf: { readonly scope: string; readonly name: string; readonly groupName: string }
  readonly StaleRouter: { readonly scope: string; readonly name: string; readonly added: ReadonlyArray<string>; readonly removed: ReadonlyArray<string> }
  readonly OrphanedRouter: { readonly scope: string; readonly name: string }
  readonly OrphanedScope: { readonly scopePath: string }
  readonly StaleGitignore: { readonly entries: ReadonlyArray<string> }
  readonly FrontmatterMismatch: { readonly scope: string; readonly name: string; readonly expected: string; readonly actual: string }
  readonly NameConflict: { readonly name: string; readonly libraryScope: string; readonly coreScope: string }
  readonly DuplicateName: { readonly flatName: string; readonly paths: ReadonlyArray<string> }
  readonly Shadow: { readonly name: string }
  readonly StaleShadow: { readonly scope: string; readonly name: string }
  readonly CrossScopeInstall: { readonly name: string; readonly symlinkTarget: string }
}>

export const {
  $match: matchDoctorFinding,
} = Data.taggedEnum<DoctorFinding>()

// ── Doctor aspect interface ───────────────────────────────────────

export interface DoctorAspect {
  readonly name: string
  readonly description: string
  readonly level: Level
  readonly detect: (ctx: DoctorContext) => Effect.Effect<DoctorFinding[]>
  readonly fix?: (finding: DoctorFinding) => Effect.Effect<void>
}

export interface DoctorContext {
  readonly state: ShanState
  readonly userOutfit: OutfitEntry[]
  readonly projectOutfit: OutfitEntry[]
}

// ── Config ─────────────────────────────────────────────────────────

const DEFAULT_CONFIG: ShanConfig = {
  version: 1,
  skills: {
    historyLimit: 50,
    defaultScope: "project",
  },
}

export const loadConfig = () =>
  Effect.gen(function* () {
    const content = yield* Effect.tryPromise(() => readFile(CONFIG_FILE, "utf-8")).pipe(
      Effect.catchAll(() => Effect.succeed(null)),
    )
    if (!content) return DEFAULT_CONFIG
    try {
      return { ...DEFAULT_CONFIG, ...JSON.parse(content) } as ShanConfig
    } catch {
      return DEFAULT_CONFIG
    }
  })

// ── State ──────────────────────────────────────────────────────────

const DEFAULT_STATE: ShanState = {
  version: 2,
  current: {},
  history: {},
}

/** Reconstruct a HistoryEntry from raw JSON (handles v1 `op` field and v2 `_tag` field). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deserializeHistoryEntry = (raw: any): HistoryEntry | null => {
  // Migrate v1 `op` field → v2 `_tag` field
  const tag = raw["_tag"] ?? (raw["op"] === "on" ? "OnOp" : raw["op"] === "off" ? "OffOp" : null)
  if (!tag) return null

  const base = {
    targets: (raw["targets"] as string[]) ?? [],
    scope: (raw["scope"] as string) ?? "",
    timestamp: (raw["timestamp"] as string) ?? "",
  }

  if (tag === "OnOp" || tag === "OffOp") {
    const fields = {
      ...base,
      snapshot: (raw["snapshot"] as string[]) ?? [],
      generatedRouters: (raw["generatedRouters"] as string[]) ?? [],
    }
    return tag === "OnOp" ? OnOp(fields) : OffOp(fields)
  }

  if (tag === "MoveOp") {
    const subRaw = (raw["subActions"] as any[]) ?? []
    return MoveOp({
      ...base,
      axis: raw["axis"] ?? "scope",
      direction: raw["direction"] ?? "up",
      subActions: subRaw.map((s) => deserializeHistoryEntry(s)).filter((e): e is HistoryEntry => e !== null),
    })
  }

  const fsFields = { ...base, sourcePath: raw["sourcePath"] ?? "", destPath: raw["destPath"] ?? "" }
  if (tag === "CopyToOutfitOp") return CopyToOutfitOp(fsFields)
  if (tag === "MoveToLibraryOp") return MoveToLibraryOp(fsFields)
  if (tag === "MoveDirOp") return MoveDirOp(fsFields)
  if (tag === "MoveLibraryDirOp") return MoveLibraryDirOp(fsFields)

  if (tag === "DoctorOp") return DoctorOp(base)

  return null
}

export const loadState = () =>
  Effect.gen(function* () {
    const content = yield* Effect.tryPromise(() => readFile(STATE_FILE, "utf-8")).pipe(
      Effect.catchAll(() => Effect.succeed(null)),
    )
    if (!content) return DEFAULT_STATE
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw = JSON.parse(content) as any
      const rawHistory = (raw["history"] ?? {}) as Record<string, any>
      const history: Record<string, ProjectHistory> = {}
      for (const [key, ph] of Object.entries(rawHistory)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rawEntries = ((ph as any)["entries"] ?? []) as any[]
        const entries = rawEntries
          .map((e) => deserializeHistoryEntry(e))
          .filter((e): e is HistoryEntry => e !== null)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const undoneCount = ((ph as Record<string, unknown>)["undoneCount"] as number) ?? 0
        history[key] = { entries, undoneCount }
      }
      // Migrate v1 → v2: add `current` if missing
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const current = (raw["current"] as Record<string, ScopeState>) ?? {}
      return { version: 2 as const, current, history }
    } catch {
      return DEFAULT_STATE
    }
  })

export const saveState = (state: ShanState) =>
  Effect.gen(function* () {
    yield* Effect.tryPromise(() => mkdir(SHAN_DIR, { recursive: true }))
    yield* Effect.tryPromise(() => writeFile(STATE_FILE, JSON.stringify(state, null, 2) + "\n"))
  })

export const getProjectHistory = (state: ShanState, scope: Scope): ProjectHistory => {
  const key = scope === "user" ? "global" : process.cwd()
  return state.history[key] ?? { entries: [], undoneCount: 0 }
}

export const setProjectHistory = (state: ShanState, scope: Scope, history: ProjectHistory): ShanState => {
  const key = scope === "user" ? "global" : process.cwd()
  return { ...state, history: { ...state.history, [key]: history } }
}

/** Get the current install list for a scope key. */
export const getCurrentInstalls = (state: ShanState, scope: Scope): string[] => {
  const key = scope === "user" ? "global" : process.cwd()
  return state.current[key]?.installs ?? []
}

/** Set the current install list for a scope key, returning updated state. */
export const setCurrentInstalls = (state: ShanState, scope: Scope, installs: string[]): ShanState => {
  const key = scope === "user" ? "global" : process.cwd()
  return { ...state, current: { ...state.current, [key]: { installs } } }
}

/** Add a flat name to the current install list (idempotent). */
export const addCurrentInstall = (state: ShanState, scope: Scope, flatName: string): ShanState => {
  const installs = getCurrentInstalls(state, scope)
  if (installs.includes(flatName)) return state
  return setCurrentInstalls(state, scope, [...installs, flatName])
}

/** Remove a flat name from the current install list (idempotent). */
export const removeCurrentInstall = (state: ShanState, scope: Scope, flatName: string): ShanState => {
  const installs = getCurrentInstalls(state, scope)
  const filtered = installs.filter((n) => n !== flatName)
  if (filtered.length === installs.length) return state
  return setCurrentInstalls(state, scope, filtered)
}

/**
 * Bootstrap the `current` section for a scope by scanning the outfit directory.
 * Used on first use in a project or after doctor reconciliation.
 */
export const bootstrapCurrent = (scope: Scope) =>
  Effect.gen(function* () {
    const outfit = yield* listOutfit(scope)
    const installs = outfit
      .filter((e) => e.commitment === "pluggable")
      .map((e) => e.name)
    return installs
  })

// ── Outfit path resolution ─────────────────────────────────────────

export const outfitDir = (scope: Scope): string =>
  scope === "user" ? USER_OUTFIT_DIR : path.join(process.cwd(), ".claude/skills")

// ── Name translation ───────────────────────────────────────────────

/** Translate colon name to library-relative path: "ts:tooling" → "ts/tooling" */
export const colonToPath = (colonName: string): string => colonName.replaceAll(":", "/")

/** Translate library-relative path to colon name: "ts/tooling" → "ts:tooling" */
export const pathToColon = (relPath: string): string => relPath.replaceAll("/", ":")

/** Flatten a library-relative path to a symlink name: "ts/tooling" → "ts_tooling" */
export const flattenName = (relPath: string): string => relPath.replaceAll("/", "_")

/** Unflatten a symlink name to a library-relative path: "ts_tooling" → "ts/tooling" */
export const unflattenName = (flatName: string): string => flatName.replaceAll("_", "/")

// ── Frontmatter parsing ────────────────────────────────────────────

/** Extract YAML frontmatter from a SKILL.md file. */
export const readFrontmatter = (skillDir: string) =>
  Effect.gen(function* () {
    const skillMd = path.join(skillDir, "SKILL.md")
    const content = yield* Effect.tryPromise(() => readFile(skillMd, "utf-8")).pipe(
      Effect.catchAll(() => Effect.succeed(null)),
    )
    if (!content) return null

    const match = content.match(/^---\n([\s\S]*?)\n---/)
    if (!match?.[1]) return null

    const yaml = match[1]
    const fm: Record<string, string | boolean> = {}
    for (const line of yaml.split("\n")) {
      const sepIdx = line.indexOf(":")
      if (sepIdx === -1) continue
      const key = line.slice(0, sepIdx).trim()
      const raw = line.slice(sepIdx + 1).trim()
      // Handle multi-line (>-) by taking just the first line value
      if (raw === ">-" || raw === ">") continue
      if (raw === "true") fm[key] = true
      else if (raw === "false") fm[key] = false
      // Strip surrounding quotes
      else fm[key] = raw.replace(/^["']|["']$/g, "")
    }

    return {
      name: String(fm["name"] ?? ""),
      description: String(fm["description"] ?? ""),
      disableModelInvocation: fm["disable-model-invocation"] === true,
      ...(fm["when-to-use"] ? { whenToUse: String(fm["when-to-use"]) } : {}),
      ...(fm["argument-hint"] ? { argumentHint: String(fm["argument-hint"]) } : {}),
    } satisfies SkillFrontmatter
  })

// ── Budget ─────────────────────────────────────────────────────────

/** Claude Code's budget algorithm: [name, desc, whenToUse].join(" ").length / 4 */
export const estimateBudget = (fm: SkillFrontmatter): number => {
  const parts = [fm.name, fm.description]
  if (fm.whenToUse) parts.push(fm.whenToUse)
  return Math.ceil(parts.join(" ").length / 4)
}

// ── Library operations ─────────────────────────────────────────────

/** Check if the library directory exists. */
export const libraryExists = (scope?: Scope) =>
  Effect.gen(function* () {
    const dirs = scope ? librarySearchOrder(scope) : [LIBRARY_DIR, projectLibraryDir()]
    for (const dir of dirs) {
      const exists = yield* Effect.tryPromise(async () => {
        const stat = await lstat(dir)
        return stat.isDirectory()
      }).pipe(Effect.catchAll(() => Effect.succeed(false)))
      if (exists) return true
    }
    return false
  })

/**
 * Determine the node type at a library path.
 * - Leaf: has SKILL.md, no subdirectories with SKILL.md
 * - Group: has subdirectories, no SKILL.md
 * - Callable group: has both SKILL.md and subdirectories with SKILL.md
 */
export const getNodeType = (libraryPath: string) =>
  Effect.gen(function* () {
    const hasSkillMd = yield* Effect.tryPromise(async () => {
      const stat = await lstat(path.join(libraryPath, "SKILL.md"))
      return stat.isFile()
    }).pipe(Effect.catchAll(() => Effect.succeed(false)))

    const entries = yield* Effect.tryPromise(() => readdir(libraryPath)).pipe(
      Effect.catchAll(() => Effect.succeed([] as string[])),
    )

    let hasSubdirs = false
    for (const entry of entries) {
      const entryPath = path.join(libraryPath, entry)
      const stat = yield* Effect.tryPromise(() => lstat(entryPath)).pipe(
        Effect.catchAll(() => Effect.succeed(null)),
      )
      if (stat?.isDirectory()) {
        hasSubdirs = true
        break
      }
    }

    if (hasSkillMd && hasSubdirs) return "callable-group" as NodeType
    if (hasSkillMd) return "leaf" as NodeType
    if (hasSubdirs) return "group" as NodeType
    // Edge case: empty dir or just files — treat as leaf if SKILL.md is absent
    return "group" as NodeType
  })

/**
 * Resolve a target name (colon syntax) to its library path and node type.
 * Returns null if not found in library.
 */
export const resolveTarget = (colonName: string, scope: Scope = "project") =>
  Effect.gen(function* () {
    const relPath = colonToPath(colonName)
    const dirs = librarySearchOrder(scope)

    for (const libDir of dirs) {
      const libraryPath = path.join(libDir, relPath)
      const libScope: Scope = libDir === LIBRARY_DIR ? "user" : "project"

      const exists = yield* Effect.tryPromise(async () => {
        const stat = await lstat(libraryPath)
        return stat.isDirectory()
      }).pipe(Effect.catchAll(() => Effect.succeed(false)))

      if (!exists) continue

      const nodeType = yield* getNodeType(libraryPath)

      // For leaf skills, the leaves array is just the skill itself
      if (nodeType === "leaf") {
        const fm = yield* readFrontmatter(libraryPath)
        return {
          colonName,
          libraryPath,
          libraryDir: libDir,
          libraryScope: libScope,
          nodeType,
          leaves: [{
            colonName,
            libraryRelPath: relPath,
            libraryDir: libDir,
            libraryScope: libScope,
            frontmatter: fm,
          }],
        } as ResolvedTarget
      }

      const leaves = yield* resolveLeaves(relPath, libDir)

      // For callable groups, include the group's own SKILL.md as a leaf
      if (nodeType === "callable-group") {
        const fm = yield* readFrontmatter(libraryPath)
        return {
          colonName,
          libraryPath,
          libraryDir: libDir,
          libraryScope: libScope,
          nodeType,
          leaves: [{
            colonName,
            libraryRelPath: relPath,
            libraryDir: libDir,
            libraryScope: libScope,
            frontmatter: fm,
          }, ...leaves],
        } as ResolvedTarget
      }

      // Pure group — only descendant leaves
      return {
        colonName,
        libraryPath,
        libraryDir: libDir,
        libraryScope: libScope,
        nodeType,
        leaves,
      } as ResolvedTarget
    }

    return null
  })

/**
 * Recursively enumerate all descendant leaf skills in a library path.
 */
export const resolveLeaves = (relPath: string, libDir: string = LIBRARY_DIR): Effect.Effect<SkillInfo[], never, never> =>
  Effect.gen(function* () {
    const absPath = path.join(libDir, relPath)
    const libScope: Scope = libDir === LIBRARY_DIR ? "user" : "project"
    const entries = yield* Effect.tryPromise(() => readdir(absPath)).pipe(
      Effect.catchAll(() => Effect.succeed([] as string[])),
    )

    const results: SkillInfo[] = []

    for (const entry of entries.sort()) {
      const entryPath = path.join(absPath, entry)
      const stat = yield* Effect.tryPromise(() => lstat(entryPath)).pipe(
        Effect.catchAll(() => Effect.succeed(null)),
      )
      if (!stat?.isDirectory()) continue

      const childRelPath = path.join(relPath, entry)
      const childColonName = pathToColon(childRelPath)
      const hasSkillMd = yield* Effect.tryPromise(async () => {
        const s = await lstat(path.join(entryPath, "SKILL.md"))
        return s.isFile()
      }).pipe(Effect.catchAll(() => Effect.succeed(false)))

      if (hasSkillMd) {
        const fm = yield* readFrontmatter(entryPath)
        results.push({
          colonName: childColonName,
          libraryRelPath: childRelPath,
          libraryDir: libDir,
          libraryScope: libScope,
          frontmatter: fm,
        })
      }

      // Recurse into subdirectories regardless (they may have deeper leaves)
      const childLeaves = yield* resolveLeaves(childRelPath, libDir)
      results.push(...childLeaves)
    }

    return results
  })

/**
 * List all skills in the library (recursive tree walk).
 */
export const listLibrary = () =>
  Effect.gen(function* () {
    const exists = yield* libraryExists()
    if (!exists) return []

    return yield* resolveLeaves("")
  })

// ── Outfit operations ──────────────────────────────────────────────

/**
 * List all entries in an outfit directory with commitment detection.
 */
export const listOutfit = (scope: Scope) =>
  Effect.gen(function* () {
    const dir = outfitDir(scope)
    const entries = yield* Effect.tryPromise(() => readdir(dir)).pipe(
      Effect.catchAll(() => Effect.succeed([] as string[])),
    )

    const results: OutfitEntry[] = []
    for (const name of entries.sort()) {
      const entryPath = path.join(dir, name)
      const stat = yield* Effect.tryPromise(() => lstat(entryPath)).pipe(
        Effect.catchAll(() => Effect.succeed(null)),
      )
      if (!stat) continue

      if (stat.isSymbolicLink()) {
        const target = yield* Effect.tryPromise(() => readlink(entryPath)).pipe(
          Effect.catchAll(() => Effect.succeed("")),
        )
        results.push(OutfitEntry.make({ name, dir: entryPath, commitment: "pluggable", scope, symlinkTarget: target }))
      } else if (stat.isDirectory()) {
        results.push(OutfitEntry.make({ name, dir: entryPath, commitment: "core", scope }))
      }
    }
    return results
  })

/**
 * Check for collision at the given name across relevant scopes.
 * Returns a collision reason string, or null if no collision.
 */
export const checkCollision = (flatName: string, scope: Scope) =>
  Effect.gen(function* () {
    // User outfit always checked (highest priority)
    const userOutfit = yield* listOutfit("user")
    const userEntry = userOutfit.find((e) => e.name === flatName)
    if (userEntry?.commitment === "core") {
      return "collides with core skill at user level"
    }

    // When operating at project scope, also check user-level pluggable
    if (scope === "project") {
      if (userEntry) {
        return "collides with skill at user level"
      }

      // Check project core
      const projectOutfit = yield* listOutfit("project")
      const projectEntry = projectOutfit.find((e) => e.name === flatName)
      if (projectEntry?.commitment === "core") {
        return "collides with core skill at project level"
      }
    }

    return null
  })

// ── Snapshot operations ────────────────────────────────────────────

/**
 * Take a snapshot of the current pluggable outfit state.
 * Returns list of symlink names (pluggable skills that are on).
 */
export const snapshotOutfit = (scope: Scope) =>
  Effect.gen(function* () {
    const outfit = yield* listOutfit(scope)
    return outfit.filter((e) => e.commitment === "pluggable").map((e) => e.name)
  })

/**
 * Detect generated routers in the outfit.
 * A generated router is a real directory that corresponds to a group name in the library.
 */
export const detectGeneratedRouters = (scope: Scope) =>
  Effect.gen(function* () {
    const outfit = yield* listOutfit(scope)
    const routers: string[] = []
    for (const entry of outfit) {
      if (entry.commitment !== "core") continue
      // Check if this name corresponds to a group in any accessible library
      for (const libDir of librarySearchOrder(scope)) {
        const libraryPath = path.join(libDir, entry.name)
        const exists = yield* Effect.tryPromise(async () => {
          const stat = await lstat(libraryPath)
          return stat.isDirectory()
        }).pipe(Effect.catchAll(() => Effect.succeed(false)))
        if (exists) {
          const nodeType = yield* getNodeType(libraryPath)
          if (nodeType === "group" || nodeType === "callable-group") {
            routers.push(entry.name)
            break
          }
        }
      }
    }
    return routers
  })

/**
 * Restore an outfit to match a snapshot.
 * Adds missing symlinks, removes extra ones. Never touches core skills.
 */
export const restoreSnapshot = (snapshot: ReadonlyArray<string>, generatedRouters: ReadonlyArray<string>, scope: Scope) =>
  Effect.gen(function* () {
    const dir = outfitDir(scope)
    const currentOutfit = yield* listOutfit(scope)
    const snapshotSet = new Set(snapshot)
    const routerSet = new Set(generatedRouters)

    // Remove symlinks not in snapshot
    for (const entry of currentOutfit) {
      if (entry.commitment !== "pluggable") continue
      if (!snapshotSet.has(entry.name)) {
        yield* Effect.tryPromise(() => unlink(path.join(dir, entry.name))).pipe(
          Effect.catchAll(() => Effect.void),
        )
      }
    }

    // Remove generated routers not in snapshot
    const currentRouters = yield* detectGeneratedRouters(scope)
    for (const router of currentRouters) {
      if (!routerSet.has(router)) {
        yield* Effect.tryPromise(() => rm(path.join(dir, router), { recursive: true })).pipe(
          Effect.catchAll(() => Effect.void),
        )
      }
    }

    // Add symlinks from snapshot that are missing
    for (const name of snapshot) {
      const entryPath = path.join(dir, name)
      const exists = yield* Effect.tryPromise(async () => {
        await lstat(entryPath)
        return true
      }).pipe(Effect.catchAll(() => Effect.succeed(false)))

      if (!exists) {
        // Reverse-resolve: symlink name → library path (check both libraries)
        const libRelPath = unflattenName(name)
        let restored = false
        for (const libDir of librarySearchOrder(scope)) {
          const libPath = path.join(libDir, libRelPath)
          const libExists = yield* Effect.tryPromise(async () => {
            const stat = await lstat(libPath)
            return stat.isDirectory()
          }).pipe(Effect.catchAll(() => Effect.succeed(false)))

          if (libExists) {
            yield* Effect.tryPromise(() => symlink(libPath, entryPath)).pipe(
              Effect.catchAll((err) => Console.error(`  warn: could not restore ${name}: ${err}`)),
            )
            restored = true
            break
          }
        }
        if (!restored) {
          yield* Console.error(`  warn: skipping ${name} — no longer in any library`)
        }
      }
    }

    // Restore generated routers
    for (const router of generatedRouters) {
      const routerPath = path.join(dir, router)
      const exists = yield* Effect.tryPromise(async () => {
        await lstat(routerPath)
        return true
      }).pipe(Effect.catchAll(() => Effect.succeed(false)))

      if (!exists) {
        // Re-generate the router (check both libraries)
        for (const libDir of librarySearchOrder(scope)) {
          const libPath = path.join(libDir, router)
          const libExists = yield* Effect.tryPromise(async () => {
            const stat = await lstat(libPath)
            return stat.isDirectory()
          }).pipe(Effect.catchAll(() => Effect.succeed(false)))

          if (libExists) {
            const leaves = yield* resolveLeaves(router, libDir)
            const routerContent = generateRouter(router, leaves)
            yield* Effect.tryPromise(() => mkdir(routerPath, { recursive: true }))
            yield* Effect.tryPromise(() => writeFile(path.join(routerPath, "SKILL.md"), routerContent))
            break
          }
        }
      }
    }
  })

// ── Auto-router generation ─────────────────────────────────────────

/**
 * Generate a namespace router SKILL.md for a top-level group.
 */
export const generateRouter = (groupName: string, children: SkillInfo[]): string => {
  const childNames = children.map((c) => c.colonName).join(", ")
  const childLines = children
    .map((c) => {
      const hint = c.frontmatter?.argumentHint ? ` \`${c.frontmatter.argumentHint}\`` : ""
      const desc = c.frontmatter?.description ?? "(no description)"
      return `- **${c.colonName}**${hint} — ${desc}`
    })
    .join("\n")

  return `---
name: ${groupName}
description: "${groupName} namespace. Routes to sub-skills: ${childNames}."
disable-model-invocation: true
---

# ${groupName}

Available sub-skills:

${childLines}

Interpret the user's request and route to the most appropriate sub-skill above.
If the user's intent is unclear, present the options and ask which they need.
`
}

// ── Gitignore management ───────────────────────────────────────────

const GITIGNORE_START = "# shan-managed (do not edit)"
const GITIGNORE_END = "# end shan-managed"

/**
 * Add entries to the shan-managed section of a project's .gitignore.
 */
export const manageGitignore = (projectRoot: string, newEntries: string[]) =>
  Effect.gen(function* () {
    const gitignorePath = path.join(projectRoot, ".gitignore")
    let content = yield* Effect.tryPromise(() => readFile(gitignorePath, "utf-8")).pipe(
      Effect.catchAll(() => Effect.succeed("")),
    )

    // Parse existing shan-managed entries
    const startIdx = content.indexOf(GITIGNORE_START)
    const endIdx = content.indexOf(GITIGNORE_END)

    let existingEntries: string[] = []
    let before = content
    let after = ""

    if (startIdx !== -1 && endIdx !== -1) {
      before = content.slice(0, startIdx)
      after = content.slice(endIdx + GITIGNORE_END.length)
      const managed = content.slice(startIdx + GITIGNORE_START.length, endIdx)
      existingEntries = managed.split("\n").map((l) => l.trim()).filter(Boolean)
    }

    // Merge and sort
    const allEntries = [...new Set([...existingEntries, ...newEntries])].sort()

    if (allEntries.length === 0) return

    // Rebuild content
    const managedSection = `${GITIGNORE_START}\n${allEntries.join("\n")}\n${GITIGNORE_END}`

    // Ensure before ends with newline
    const trimmedBefore = before.trimEnd()
    const newContent = trimmedBefore
      ? `${trimmedBefore}\n\n${managedSection}${after}`
      : `${managedSection}${after}`

    yield* Effect.tryPromise(() => writeFile(gitignorePath, newContent.trimEnd() + "\n"))
  })

/** Remove entries from the shan-managed .gitignore section. If no entries remain, remove the section. */
export const manageGitignoreRemove = (projectRoot: string, entriesToRemove: string[]) =>
  Effect.gen(function* () {
    const gitignorePath = path.join(projectRoot, ".gitignore")
    const content = yield* Effect.tryPromise(() => readFile(gitignorePath, "utf-8")).pipe(
      Effect.catchAll(() => Effect.succeed("")),
    )

    const startIdx = content.indexOf(GITIGNORE_START)
    const endIdx = content.indexOf(GITIGNORE_END)
    if (startIdx === -1 || endIdx === -1) return

    const before = content.slice(0, startIdx)
    const after = content.slice(endIdx + GITIGNORE_END.length)
    const managed = content.slice(startIdx + GITIGNORE_START.length, endIdx)
    const existingEntries = managed.split("\n").map((l) => l.trim()).filter(Boolean)
    const removeSet = new Set(entriesToRemove)
    const remaining = existingEntries.filter((e) => !removeSet.has(e))

    if (remaining.length === 0) {
      // Remove the entire section
      const newContent = (before.trimEnd() + after).trimEnd()
      yield* Effect.tryPromise(() => writeFile(gitignorePath, newContent ? newContent + "\n" : ""))
    } else {
      const managedSection = `${GITIGNORE_START}\n${remaining.join("\n")}\n${GITIGNORE_END}`
      const trimmedBefore = before.trimEnd()
      const newContent = trimmedBefore
        ? `${trimmedBefore}\n\n${managedSection}${after}`
        : `${managedSection}${after}`
      yield* Effect.tryPromise(() => writeFile(gitignorePath, newContent.trimEnd() + "\n"))
    }
  })

/**
 * Read current shan-managed gitignore entries.
 */
export const readGitignoreEntries = (projectRoot: string) =>
  Effect.gen(function* () {
    const gitignorePath = path.join(projectRoot, ".gitignore")
    const content = yield* Effect.tryPromise(() => readFile(gitignorePath, "utf-8")).pipe(
      Effect.catchAll(() => Effect.succeed("")),
    )

    const startIdx = content.indexOf(GITIGNORE_START)
    const endIdx = content.indexOf(GITIGNORE_END)

    if (startIdx === -1 || endIdx === -1) return []

    const managed = content.slice(startIdx + GITIGNORE_START.length, endIdx)
    return managed.split("\n").map((l) => l.trim()).filter(Boolean)
  })

// ── Output helpers ─────────────────────────────────────────────────

export const printTable = (rows: readonly (readonly string[])[]) =>
  Effect.gen(function* () {
    if (rows.length === 0) return
    const widths = rows[0]!.map((_, i) => Math.max(...rows.map((r) => (r[i] ?? "").length)))
    for (const row of rows) {
      const line = row.map((cell, i) => cell.padEnd(widths[i]!)).join("  ")
      yield* Console.log(line)
    }
  })

// ── Parse batch targets ────────────────────────────────────────────

/** Parse comma-separated targets, trimming whitespace. */
export const parseTargets = (input: string): string[] =>
  input
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
