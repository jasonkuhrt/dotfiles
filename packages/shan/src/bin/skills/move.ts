/**
 * shan skills move <axis> <direction> <targets> [--scope user] [--strict]
 *
 * Migrate skills between scopes (user/project) or commitments (core/pluggable).
 * Two-phase execution: validate all, abort on error, then execute.
 *
 * Axes:
 *   scope up       — project → user
 *   scope down     — user → project
 *   commitment up  — pluggable → core
 *   commitment down — core → pluggable
 */

import { Console, Effect } from "effect"
import { cp, lstat, mkdir, rename, symlink, unlink } from "node:fs/promises"
import * as path from "node:path"
import * as Lib from "../../lib/skill-library.js"

export type MoveAxis = "scope" | "commitment"
export type MoveDirection = "up" | "down"

export interface SkillsMoveOptions {
  readonly scope: Lib.Scope
  readonly strict: boolean
}

/** Validated move action ready for Phase 2. */
interface ValidatedMove {
  readonly colonName: string
  readonly flatName: string
  readonly execute: () => Effect.Effect<void, unknown>
  readonly subActions: Lib.HistoryEntry[]
}

export const skillsMove = (
  axis: MoveAxis,
  direction: MoveDirection,
  targetInput: string,
  options: SkillsMoveOptions,
) =>
  Effect.gen(function* () {
    if (!targetInput) {
      yield* Console.error("Usage: shan skills move <axis> <direction> <targets>")
      return yield* Effect.fail(new Error("Missing targets"))
    }

    const targets = Lib.parseTargets(targetInput)
    const batch = Lib.emptyBatch<ValidatedMove>()

    // ── Phase 1: Validate all targets ───────────────────────────────

    for (const target of targets) {
      const result = yield* validateMove(axis, direction, target, options)
      if (result._tag === "error") {
        batch.errors.push({ name: target, reason: result.reason })
      } else if (result._tag === "skip") {
        batch.skips.push({ name: target, reason: result.reason })
      } else {
        batch.actions.push(result.action)
      }
    }

    // ── Abort check ─────────────────────────────────────────────────

    const label = `${axis} ${direction}`
    if (Lib.shouldAbort(batch, options.strict)) {
      yield* Lib.reportBatch(batch, label, (a) => a.colonName, { aborted: true })
      return yield* Effect.fail(new Error("Some targets failed"))
    }

    // ── Phase 2: Execute all mutations ──────────────────────────────

    const state = yield* Lib.loadState()
    const config = yield* Lib.loadConfig()
    const allSubActions: Lib.HistoryEntry[] = []

    for (const action of batch.actions) {
      yield* action.execute()
      allSubActions.push(...action.subActions)
    }

    // Record composite history entry
    const history = Lib.getProjectHistory(state, options.scope)
    if (history.undoneCount > 0) {
      history.entries.splice(history.entries.length - history.undoneCount)
      history.undoneCount = 0
    }
    history.entries.push(Lib.MoveOp({
      targets,
      scope: options.scope,
      timestamp: new Date().toISOString(),
      axis,
      direction,
      subActions: allSubActions,
    }))
    if (history.entries.length > config.skills.historyLimit) {
      history.entries.splice(0, history.entries.length - config.skills.historyLimit)
    }
    const newState = Lib.setProjectHistory(state, options.scope, history)
    yield* Lib.saveState(newState)

    // Report results
    yield* Lib.reportBatch(batch, label, (a) => a.colonName)

    // Collateral notifications for cross-project uninstalls
    for (const sub of allSubActions) {
      if (sub._tag === "OffOp" && sub.scope !== options.scope && sub.scope !== "user") {
        yield* Console.log(`  uninstalled from: ${sub.scope}`)
      }
    }
  })

// ── Validation ────────────────────────────────────────────────────

type ValidationResult =
  | { readonly _tag: "ok"; readonly action: ValidatedMove }
  | { readonly _tag: "skip"; readonly reason: string }
  | { readonly _tag: "error"; readonly reason: string }

const validateMove = (
  axis: MoveAxis,
  direction: MoveDirection,
  target: string,
  options: SkillsMoveOptions,
): Effect.Effect<ValidationResult, never> =>
  Effect.gen(function* () {
    if (axis === "scope" && direction === "up") return yield* validateScopeUp(target, options)
    if (axis === "scope" && direction === "down") return yield* validateScopeDown(target, options)
    if (axis === "commitment" && direction === "up") return yield* validateCommitmentUp(target, options)
    if (axis === "commitment" && direction === "down") return yield* validateCommitmentDown(target, options)
    return { _tag: "error", reason: `unknown move: ${axis} ${direction}` }
  })

// ── Scope Up (project → user) ────────────────────────────────────

const validateScopeUp = (target: string, _options: SkillsMoveOptions): Effect.Effect<ValidationResult, never> =>
  Effect.gen(function* () {
    const flatName = Lib.flattenName(Lib.colonToPath(target))
    const projectOutfitDir = Lib.outfitDir("project")
    const userOutfitDir = Lib.outfitDir("user")
    const projectOutfitPath = path.join(projectOutfitDir, flatName)
    const userOutfitPath = path.join(userOutfitDir, flatName)

    // Check if it exists in project outfit
    const projectStat = yield* Effect.tryPromise(() => lstat(projectOutfitPath)).pipe(
      Effect.catchAll(() => Effect.succeed(null)),
    )

    // Check if it's in the project library (not installed)
    const projLibDir = Lib.projectLibraryDir()
    const relPath = Lib.colonToPath(target)
    const projLibPath = path.join(projLibDir, relPath)
    const projLibExists = yield* Effect.tryPromise(async () => {
      const s = await lstat(projLibPath)
      return s.isDirectory()
    }).pipe(Effect.catchAll(() => Effect.succeed(false)))

    // Already at user scope?
    const userExists = yield* Effect.tryPromise(() => lstat(userOutfitPath)).pipe(
      Effect.catchAll(() => Effect.succeed(null)),
    )
    if (userExists) return { _tag: "skip" as const, reason: "already at user scope" }

    if (projectStat?.isDirectory() && !projectStat.isSymbolicLink()) {
      // Core skill — move directory
      return {
        _tag: "ok" as const,
        action: {
          colonName: target,
          flatName,
          execute: () => executeScopeUpCore(projectOutfitPath, userOutfitPath, target),
          subActions: [Lib.MoveDirOp({
            targets: [target], scope: "project", timestamp: new Date().toISOString(),
            sourcePath: projectOutfitPath, destPath: userOutfitPath,
          })],
        },
      }
    }

    if (projectStat?.isSymbolicLink()) {
      // Pluggable, installed at project scope
      const userLibDir = Lib.LIBRARY_DIR
      const userLibPath = path.join(userLibDir, relPath)

      return {
        _tag: "ok" as const,
        action: {
          colonName: target,
          flatName,
          execute: () => executeScopeUpPluggableInstalled(projectOutfitPath, userOutfitPath, projLibPath, userLibPath, projLibExists, relPath),
          subActions: buildScopeUpPluggableSubActions(target, projectOutfitPath, userOutfitPath, projLibPath, userLibPath, projLibExists),
        },
      }
    }

    if (projLibExists) {
      // Pluggable, not installed — just move library dir
      const userLibPath = path.join(Lib.LIBRARY_DIR, relPath)
      return {
        _tag: "ok" as const,
        action: {
          colonName: target,
          flatName,
          execute: () => executeMoveLibraryDir(projLibPath, userLibPath),
          subActions: [Lib.MoveLibraryDirOp({
            targets: [target], scope: "project", timestamp: new Date().toISOString(),
            sourcePath: projLibPath, destPath: userLibPath,
          })],
        },
      }
    }

    return { _tag: "error" as const, reason: "not found at project scope" }
  })

// ── Scope Down (user → project) ──────────────────────────────────

const validateScopeDown = (target: string, _options: SkillsMoveOptions): Effect.Effect<ValidationResult, never> =>
  Effect.gen(function* () {
    const flatName = Lib.flattenName(Lib.colonToPath(target))
    const projectOutfitDir = Lib.outfitDir("project")
    const userOutfitDir = Lib.outfitDir("user")
    const userOutfitPath = path.join(userOutfitDir, flatName)
    const projectOutfitPath = path.join(projectOutfitDir, flatName)
    const relPath = Lib.colonToPath(target)

    // Check if it exists in user outfit
    const userStat = yield* Effect.tryPromise(() => lstat(userOutfitPath)).pipe(
      Effect.catchAll(() => Effect.succeed(null)),
    )

    // Check user library
    const userLibPath = path.join(Lib.LIBRARY_DIR, relPath)
    const userLibExists = yield* Effect.tryPromise(async () => {
      const s = await lstat(userLibPath)
      return s.isDirectory()
    }).pipe(Effect.catchAll(() => Effect.succeed(false)))

    // Already at project scope?
    const projectExists = yield* Effect.tryPromise(() => lstat(projectOutfitPath)).pipe(
      Effect.catchAll(() => Effect.succeed(null)),
    )
    if (projectExists) return { _tag: "skip" as const, reason: "already at project scope" }

    if (userStat?.isDirectory() && !userStat.isSymbolicLink()) {
      // Core skill — move directory
      return {
        _tag: "ok" as const,
        action: {
          colonName: target,
          flatName,
          execute: () => executeScopeDownCore(userOutfitPath, projectOutfitPath),
          subActions: [Lib.MoveDirOp({
            targets: [target], scope: "user", timestamp: new Date().toISOString(),
            sourcePath: userOutfitPath, destPath: projectOutfitPath,
          })],
        },
      }
    }

    if (userStat?.isSymbolicLink() || userLibExists) {
      // Pluggable — move library dir, repoint installs
      const projLibDir = Lib.projectLibraryDir()
      const projLibPath = path.join(projLibDir, relPath)

      // Find all scopes where installed
      const state = yield* Lib.loadState()
      const affectedScopes = findAffectedScopes(state, flatName)

      return {
        _tag: "ok" as const,
        action: {
          colonName: target,
          flatName,
          execute: () => executeScopeDownPluggable(userLibPath, projLibPath, projectOutfitPath, relPath, affectedScopes),
          subActions: buildScopeDownPluggableSubActions(target, userLibPath, projLibPath, affectedScopes),
        },
      }
    }

    return { _tag: "error" as const, reason: "not found at user scope" }
  })

// ── Commitment Up (pluggable → core) ─────────────────────────────

const validateCommitmentUp = (target: string, _options: SkillsMoveOptions): Effect.Effect<ValidationResult, never> =>
  Effect.gen(function* () {
    const flatName = Lib.flattenName(Lib.colonToPath(target))
    const relPath = Lib.colonToPath(target)

    // Find the skill in a library
    const resolved = yield* Lib.resolveTarget(target, "project")
    if (!resolved) {
      // Check if it's already core
      const userOutfitPath = path.join(Lib.outfitDir("user"), flatName)
      const projectOutfitPath = path.join(Lib.outfitDir("project"), flatName)
      const userCore = yield* isCorePath(userOutfitPath)
      const projectCore = yield* isCorePath(projectOutfitPath)
      if (userCore || projectCore) return { _tag: "skip" as const, reason: "already core" }
      return { _tag: "error" as const, reason: "not found" }
    }

    const outfitScope = resolved.libraryScope
    const outfitDir = Lib.outfitDir(outfitScope)
    const outfitPath = path.join(outfitDir, flatName)
    const libraryPath = path.join(resolved.libraryDir, relPath)

    // Find all scopes where installed
    const state = yield* Lib.loadState()
    const affectedScopes = findAffectedScopes(state, flatName)

    return {
      _tag: "ok" as const,
      action: {
        colonName: target,
        flatName,
        execute: () => executeCommitmentUp(libraryPath, outfitPath, outfitScope, flatName, affectedScopes),
        subActions: buildCommitmentUpSubActions(target, outfitScope, affectedScopes, libraryPath, outfitPath),
      },
    }
  })

// ── Commitment Down (core → pluggable) ───────────────────────────

const validateCommitmentDown = (target: string, _options: SkillsMoveOptions): Effect.Effect<ValidationResult, never> =>
  Effect.gen(function* () {
    const flatName = Lib.flattenName(Lib.colonToPath(target))
    const relPath = Lib.colonToPath(target)

    // Find in outfit as core
    const userOutfitPath = path.join(Lib.outfitDir("user"), flatName)
    const projectOutfitPath = path.join(Lib.outfitDir("project"), flatName)
    const userCore = yield* isCorePath(userOutfitPath)
    const projectCore = yield* isCorePath(projectOutfitPath)

    if (!userCore && !projectCore) {
      // Check if already pluggable
      const resolved = yield* Lib.resolveTarget(target, "project")
      if (resolved) return { _tag: "skip" as const, reason: "already pluggable" }
      return { _tag: "error" as const, reason: "not found" }
    }

    const scope: Lib.Scope = projectCore ? "project" : "user"
    const outfitPath = scope === "project" ? projectOutfitPath : userOutfitPath
    const libDir = scope === "project" ? Lib.projectLibraryDir() : Lib.LIBRARY_DIR
    const libPath = path.join(libDir, relPath)

    // Check library destination not occupied
    const libOccupied = yield* Effect.tryPromise(async () => {
      const s = await lstat(libPath)
      return s.isDirectory()
    }).pipe(Effect.catchAll(() => Effect.succeed(false)))

    if (libOccupied) {
      return { _tag: "error" as const, reason: "library path already occupied" }
    }

    return {
      _tag: "ok" as const,
      action: {
        colonName: target,
        flatName,
        execute: () => executeCommitmentDown(outfitPath, libPath, scope, flatName),
        subActions: [
          Lib.MoveToLibraryOp({
            targets: [target], scope, timestamp: new Date().toISOString(),
            sourcePath: outfitPath, destPath: libPath,
          }),
          Lib.OnOp({
            targets: [target], scope, timestamp: new Date().toISOString(),
            snapshot: [], generatedRouters: [],
          }),
        ],
      },
    }
  })

// ── Execution helpers ─────────────────────────────────────────────

const executeScopeUpCore = (src: string, dest: string, target: string) =>
  Effect.gen(function* () {
    yield* Effect.tryPromise(() => mkdir(path.dirname(dest), { recursive: true }))
    yield* Effect.tryPromise(() => rename(src, dest))
    yield* Lib.manageGitignoreRemove(process.cwd(), [`.claude/skills/${Lib.flattenName(Lib.colonToPath(target))}`])
  })

const executeScopeUpPluggableInstalled = (
  projectOutfitPath: string, userOutfitPath: string,
  projLibPath: string, userLibPath: string,
  projLibExists: boolean, relPath: string,
) =>
  Effect.gen(function* () {
    // Off at project scope
    yield* Effect.tryPromise(() => unlink(projectOutfitPath)).pipe(Effect.catchAll(() => Effect.void))
    // Move library dir if it was in project library
    if (projLibExists) {
      yield* Effect.tryPromise(() => mkdir(path.dirname(userLibPath), { recursive: true }))
      yield* Effect.tryPromise(() => rename(projLibPath, userLibPath))
    }
    // On at user scope
    const libTarget = path.join(Lib.LIBRARY_DIR, relPath)
    yield* Effect.tryPromise(() => mkdir(path.dirname(userOutfitPath), { recursive: true }))
    yield* Effect.tryPromise(() => symlink(libTarget, userOutfitPath))
  })

const executeMoveLibraryDir = (src: string, dest: string) =>
  Effect.gen(function* () {
    yield* Effect.tryPromise(() => mkdir(path.dirname(dest), { recursive: true }))
    yield* Effect.tryPromise(() => rename(src, dest))
  })

const executeScopeDownCore = (src: string, dest: string) =>
  Effect.gen(function* () {
    yield* Effect.tryPromise(() => mkdir(path.dirname(dest), { recursive: true }))
    yield* Effect.tryPromise(() => rename(src, dest))
  })

const executeScopeDownPluggable = (
  userLibPath: string, projLibPath: string,
  projectOutfitPath: string, relPath: string,
  affectedScopes: string[],
) =>
  Effect.gen(function* () {
    const flatName = Lib.flattenName(relPath)
    // Always remove user outfit symlink (source scope)
    const userLink = path.join(Lib.outfitDir("user"), flatName)
    yield* Effect.tryPromise(() => unlink(userLink)).pipe(Effect.catchAll(() => Effect.void))
    // Off at all other affected scopes (cross-project installs)
    for (const scopeKey of affectedScopes) {
      if (scopeKey === "global") continue // already handled above
      const outfitDir = path.join(scopeKey, ".claude/skills")
      const linkPath = path.join(outfitDir, flatName)
      yield* Effect.tryPromise(() => unlink(linkPath)).pipe(Effect.catchAll(() => Effect.void))
    }
    // Move library dir
    yield* Effect.tryPromise(() => mkdir(path.dirname(projLibPath), { recursive: true }))
    yield* Effect.tryPromise(() => rename(userLibPath, projLibPath))
    // On at project scope
    yield* Effect.tryPromise(() => mkdir(path.dirname(projectOutfitPath), { recursive: true }))
    yield* Effect.tryPromise(() => symlink(projLibPath, projectOutfitPath))
  })

const executeCommitmentUp = (
  libraryPath: string, outfitPath: string,
  outfitScope: Lib.Scope, flatName: string,
  affectedScopes: string[],
) =>
  Effect.gen(function* () {
    // Always remove source scope's symlink
    const sourceLink = path.join(Lib.outfitDir(outfitScope), flatName)
    yield* Effect.tryPromise(() => unlink(sourceLink)).pipe(Effect.catchAll(() => Effect.void))
    // Off at all other affected scopes
    for (const scopeKey of affectedScopes) {
      const outfitDir = scopeKey === "global" ? Lib.outfitDir("user") : path.join(scopeKey, ".claude/skills")
      const linkPath = path.join(outfitDir, flatName)
      yield* Effect.tryPromise(() => unlink(linkPath)).pipe(Effect.catchAll(() => Effect.void))
    }
    // Copy library contents to outfit (becomes core)
    yield* Effect.tryPromise(() => mkdir(path.dirname(outfitPath), { recursive: true }))
    yield* Effect.tryPromise(() => cp(libraryPath, outfitPath, { recursive: true }))
  })

const executeCommitmentDown = (
  outfitPath: string, libPath: string,
  scope: Lib.Scope, flatName: string,
) =>
  Effect.gen(function* () {
    // Move from outfit to library
    yield* Effect.tryPromise(() => mkdir(path.dirname(libPath), { recursive: true }))
    yield* Effect.tryPromise(() => rename(outfitPath, libPath))
    // Create symlink back (auto-install)
    yield* Effect.tryPromise(() => symlink(libPath, outfitPath))
    // Update gitignore if project scope
    if (scope === "project") {
      yield* Lib.manageGitignore(process.cwd(), [`.claude/skills/${flatName}`])
    }
  })

// ── Sub-action builders ───────────────────────────────────────────

const buildScopeUpPluggableSubActions = (
  target: string, _projectOutfitPath: string, _userOutfitPath: string,
  projLibPath: string, userLibPath: string, projLibExists: boolean,
): Lib.HistoryEntry[] => {
  const ts = new Date().toISOString()
  const actions: Lib.HistoryEntry[] = [
    Lib.OffOp({ targets: [target], scope: "project", timestamp: ts, snapshot: [], generatedRouters: [] }),
  ]
  if (projLibExists) {
    actions.push(Lib.MoveLibraryDirOp({
      targets: [target], scope: "project", timestamp: ts,
      sourcePath: projLibPath, destPath: userLibPath,
    }))
  }
  actions.push(Lib.OnOp({ targets: [target], scope: "user", timestamp: ts, snapshot: [], generatedRouters: [] }))
  return actions
}

const buildScopeDownPluggableSubActions = (
  target: string, userLibPath: string, projLibPath: string,
  affectedScopes: string[],
): Lib.HistoryEntry[] => {
  const ts = new Date().toISOString()
  const actions: Lib.HistoryEntry[] = []
  for (const scopeKey of affectedScopes) {
    actions.push(Lib.OffOp({
      targets: [target], scope: scopeKey, timestamp: ts, snapshot: [], generatedRouters: [],
    }))
  }
  actions.push(Lib.MoveLibraryDirOp({
    targets: [target], scope: "user", timestamp: ts,
    sourcePath: userLibPath, destPath: projLibPath,
  }))
  actions.push(Lib.OnOp({
    targets: [target], scope: "project", timestamp: ts, snapshot: [], generatedRouters: [],
  }))
  return actions
}

const buildCommitmentUpSubActions = (
  target: string, outfitScope: Lib.Scope,
  affectedScopes: string[], libraryPath: string, outfitPath: string,
): Lib.HistoryEntry[] => {
  const ts = new Date().toISOString()
  const actions: Lib.HistoryEntry[] = []
  for (const scopeKey of affectedScopes) {
    actions.push(Lib.OffOp({
      targets: [target], scope: scopeKey, timestamp: ts, snapshot: [], generatedRouters: [],
    }))
  }
  actions.push(Lib.CopyToOutfitOp({
    targets: [target], scope: outfitScope, timestamp: ts,
    sourcePath: libraryPath, destPath: outfitPath,
  }))
  return actions
}

// ── Utility helpers ───────────────────────────────────────────────

/** Check if a path is a real directory (core skill), not a symlink. */
const isCorePath = (p: string) =>
  Effect.tryPromise(async () => {
    const s = await lstat(p)
    return s.isDirectory() && !s.isSymbolicLink()
  }).pipe(Effect.catchAll(() => Effect.succeed(false)))

/** Find all scope keys in state.json that have this flat name installed. */
const findAffectedScopes = (state: Lib.ShanState, flatName: string): string[] =>
  Object.entries(state.current)
    .filter(([_, scopeState]) => scopeState.installs.includes(flatName))
    .map(([key]) => key)
