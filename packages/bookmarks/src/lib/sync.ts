/**
 * Core sync engine.
 *
 * Pipeline: git baseline -> three-way diff -> resolve conflicts -> apply -> save -> auto-commit.
 * Git is the state store: the committed bookmarks.yaml IS the baseline for both sides.
 * Produces graveyard entries for conflict losers.
 */

import { Array as Arr, DateTime, Duration, Effect, Order, Schema, Trie, pipe } from "effect"
import { execFile } from "node:child_process"
import * as Fs from "node:fs/promises"
import * as Path from "node:path"
import * as Yaml from "yaml"
import * as Paths from "./paths.js"
import * as Graveyard from "./graveyard.js"
import * as Patch from "./patch.js"
import * as Targets from "./targets.js"
import { BookmarkLeaf, BookmarkTree, BookmarksConfig, TargetProfile } from "./schema/__.js"
import * as YamlModule from "./yaml.js"

export interface SyncResult {
  readonly applied: readonly Patch.BookmarkPatch[]
  readonly graveyarded: readonly Patch.BookmarkPatch[]
  readonly targets: readonly TargetResult[]
}

export interface ConflictResolution {
  readonly apply: readonly Patch.BookmarkPatch[]
  readonly graveyard: readonly Patch.BookmarkPatch[]
}

export interface TargetResult {
  readonly target: Targets.TargetDescriptor
  readonly applied: readonly Patch.BookmarkPatch[]
  readonly graveyarded: readonly Patch.BookmarkPatch[]
}

export interface StatusTargetResult {
  readonly target: Targets.TargetDescriptor
  readonly yamlPatches: readonly Patch.BookmarkPatch[]
  readonly browserPatches: readonly Patch.BookmarkPatch[]
}

export interface StatusResult {
  readonly yamlPath: string
  readonly targets: readonly StatusTargetResult[]
}

export interface BackupResult {
  readonly backupDir: string
  readonly files: readonly string[]
  readonly skipped: readonly string[]
}

// -- Git baseline --

/**
 * Read the last-committed version of bookmarks.yaml from git.
 * Returns empty BookmarkTree if the file has never been committed.
 */
export const readGitBaselineConfig = (yamlPath: string): Effect.Effect<BookmarksConfig | null, Error> =>
  Effect.gen(function* () {
    const { repoRoot, relPath } = yield* resolveGitTarget(yamlPath)

    const raw = yield* Effect.tryPromise({
      try: () =>
        new Promise<string>((resolve, reject) => {
          execFile("git", ["show", `HEAD:${relPath}`], { cwd: repoRoot }, (err, stdout) => {
            if (err) reject(err)
            else resolve(stdout)
          })
        }),
      catch: () => new Error(`git show HEAD:${relPath} failed — treating as fresh sync`),
    }).pipe(
      Effect.catchAll(() => Effect.succeed(null as string | null)),
    )

    if (raw === null) {
      yield* Effect.log("No committed bookmarks.yaml found — using empty baseline (fresh sync)")
      return null
    }

    // Parse and validate the committed YAML
    const parsed = yield* Effect.try({
      try: () => Yaml.parse(raw) as unknown,
      catch: (e) => new Error(`Failed to parse committed bookmarks.yaml: ${e}`),
    })
    const config = yield* Schema.decodeUnknown(BookmarksConfig)(parsed).pipe(
      Effect.mapError((e) => new Error(`Failed to parse committed bookmarks.yaml: ${e.message}`)),
    )
    return config
  })

export const readGitBaseline = (yamlPath: string): Effect.Effect<BookmarkTree, Error> =>
  readGitBaselineConfig(yamlPath).pipe(
    Effect.map((config) => config?.base ?? BookmarkTree.make({})),
  )

/** Resolve the git repo root for a given file path. */
const gitRepoRoot = (filePath: string): Effect.Effect<string, Error> =>
  Effect.tryPromise({
    try: () =>
      new Promise<string>((resolve, reject) => {
        execFile(
          "git",
          ["rev-parse", "--show-toplevel"],
          { cwd: Path.dirname(filePath) },
          (err, stdout) => {
            if (err) reject(err)
            else resolve(stdout.trim())
          },
        )
      }),
    catch: (e) => new Error(`Failed to find git repo root: ${e}`),
  })

/** Resolve a possibly symlinked home path to the repo-relative file path git expects. */
const resolveGitTarget = (filePath: string): Effect.Effect<{ repoRoot: string; relPath: string }, Error> =>
  Effect.gen(function* () {
    const realDir = yield* Effect.tryPromise({
      try: () => Fs.realpath(Path.dirname(filePath)),
      catch: () => Path.dirname(filePath),
    })
    const canonicalPath = Path.join(realDir, Path.basename(filePath))
    const repoRoot = yield* gitRepoRoot(canonicalPath)
    return {
      repoRoot,
      relPath: Path.relative(repoRoot, canonicalPath),
    }
  })

/** Auto-commit bookmarks.yaml so the committed version becomes the new baseline. */
export const gitAutoCommit = (yamlPath: string): Effect.Effect<void, Error> =>
  Effect.gen(function* () {
    const { repoRoot, relPath } = yield* resolveGitTarget(yamlPath)

    // Stage the file
    yield* Effect.tryPromise({
      try: () =>
        new Promise<void>((resolve, reject) => {
          execFile("git", ["add", relPath], { cwd: repoRoot }, (err) => {
            if (err) reject(err)
            else resolve()
          })
        }),
      catch: (e) => new Error(`git add failed: ${e}`),
    })

    // Check if there are staged changes to commit
    const hasStagedChanges = yield* Effect.tryPromise({
      try: () =>
        new Promise<boolean>((resolve, reject) => {
          execFile("git", ["diff", "--cached", "--quiet", "--", relPath], { cwd: repoRoot }, (err) => {
            if (err && "code" in err && err.code === 1) resolve(true) // exit code 1 = differences
            else if (err) reject(err)
            else resolve(false) // exit code 0 = no differences
          })
        }),
      catch: (e) => new Error(`git diff --cached failed: ${e}`),
    })

    if (!hasStagedChanges) {
      yield* Effect.log("No changes to commit (bookmarks.yaml unchanged)")
      return
    }

    // Commit with auto-sync message
    yield* Effect.tryPromise({
      try: () =>
        new Promise<void>((resolve, reject) => {
          execFile(
            "git",
            ["commit", "-m", "chore(bookmarks): auto-sync bookmarks.yaml", "--", relPath],
            { cwd: repoRoot },
            (err) => {
              if (err) reject(err)
              else resolve()
            },
          )
        }),
      catch: (e) => new Error(`git commit failed: ${e}`),
    })

    yield* Effect.log("Auto-committed bookmarks.yaml (new baseline)")
  })

// -- resolveConflicts --

/** Resolve conflicts between YAML-side and browser-side patches. Newest wins. */
export const resolveConflicts = (
  yamlPatches: readonly Patch.BookmarkPatch[],
  browserPatches: readonly Patch.BookmarkPatch[],
): Effect.Effect<ConflictResolution, Error> =>
  Effect.gen(function* () {
    const yamlByUrl = Arr.groupBy(yamlPatches, (p) => p.url)
    const browserByUrl = Arr.groupBy(browserPatches, (p) => p.url)

    const apply: Patch.BookmarkPatch[] = []
    const graveyard: Patch.BookmarkPatch[] = []

    // Collect all unique URLs from both sides
    const allUrls = new Set([...Object.keys(yamlByUrl), ...Object.keys(browserByUrl)])

    for (const url of allUrls) {
      const yamlGroup = yamlByUrl[url]
      const browserGroup = browserByUrl[url]

      if (yamlGroup && !browserGroup) {
        apply.push(...yamlGroup)
      } else if (browserGroup && !yamlGroup) {
        apply.push(...browserGroup)
      } else if (yamlGroup && browserGroup) {
        const yamlMax = maxDate(yamlGroup)
        const browserMax = maxDate(browserGroup)

        if (DateTime.greaterThan(browserMax, yamlMax)) {
          apply.push(...browserGroup)
          graveyard.push(...yamlGroup)
        } else {
          // YAML wins (tie-break: YAML wins when equal)
          apply.push(...yamlGroup)
          graveyard.push(...browserGroup)
        }
      }
    }

    return { apply, graveyard }
  })

/** Find the maximum date among a group of patches. */
const maxDate = (patches: readonly Patch.BookmarkPatch[]): DateTime.Utc =>
  patches.reduce<DateTime.Utc>(
    (max, p) => (DateTime.greaterThan(p.date, max) ? p.date : max),
    patches[0]!.date,
  )

// -- applyPatches --

/** Apply a set of patches to a bookmark tree, producing the updated tree. */
export const applyPatches = (
  tree: BookmarkTree,
  patches: readonly Patch.BookmarkPatch[],
): Effect.Effect<BookmarkTree, Error> =>
  Effect.gen(function* () {
    let trie = Patch.toTrie(tree)

    // Sort patches: Remove -> Move -> Rename -> Add
    const opPriority: Record<Patch.BookmarkPatch["_tag"], number> = { Remove: 0, Move: 1, Rename: 2, Add: 3 }
    const byOpOrder = Order.mapInput(Order.number, (p: Patch.BookmarkPatch) => opPriority[p._tag])
    const sorted = Arr.sort(patches, byOpOrder)

    for (const patch of sorted) {
      trie = applyOne(trie, patch)
    }

    return Patch.fromTrie(trie)
  })

/** Apply a single patch to the Trie via exhaustive Patch.$match. */
const applyOne = (trie: Trie.Trie<BookmarkLeaf>, patch: Patch.BookmarkPatch): Trie.Trie<BookmarkLeaf> =>
  Patch.$match(patch, {
    Add: ({ url, name, path }) => {
      const fullPath = `${path}/${name}`
      return Trie.insert(trie, fullPath, BookmarkLeaf.make({ name, url }))
    },

    Remove: ({ url, path }) => {
      const entries = Array.from(Trie.entriesWithPrefix(trie, path))
      const match = entries.find(([_, leaf]) => leaf.url === url)
      return match ? Trie.remove(trie, match[0]) : trie
    },

    Rename: ({ url, newName }) => {
      const allEntries = Array.from(trie)
      const match = allEntries.find(([_, leaf]) => leaf.url === url)
      if (!match) return trie
      const [oldKey] = match
      const pathPrefix = oldKey.substring(0, oldKey.lastIndexOf("/"))
      const newKey = `${pathPrefix}/${newName}`
      return pipe(
        Trie.remove(trie, oldKey),
        Trie.insert(newKey, BookmarkLeaf.make({ name: newName, url })),
      )
    },

    Move: ({ url, fromPath, toPath }) => {
      const entries = Array.from(Trie.entriesWithPrefix(trie, fromPath))
      const match = entries.find(([_, leaf]) => leaf.url === url)
      if (!match) return trie
      const [oldKey, leaf] = match
      const leafName = oldKey.substring(oldKey.lastIndexOf("/") + 1)
      const newKey = `${toPath}/${leafName}`
      return pipe(
        Trie.remove(trie, oldKey),
        Trie.insert(newKey, leaf),
      )
    },
  })

export interface SyncConfig {
  readonly yamlPath: string
  readonly dryRun?: boolean
  /** Max age for graveyard entries before GC removes them. Default: 90 days. */
  readonly graveyardMaxAge?: Duration.Duration
  /** Optional YAML config override for one-way workflows such as `pull`. */
  readonly yamlOverride?: BookmarksConfig
}

export interface BackupConfig {
  readonly yamlPath: string
  readonly backupDir: string
}

const defaultTargets = () => ({
  safari: {
    default: TargetProfile.make({ path: Paths.defaultSafariPlistPath() }),
  },
})

const emptyConfig = (
  targets: BookmarksConfig["targets"] = defaultTargets(),
): BookmarksConfig =>
  BookmarksConfig.make({
    targets,
    base: BookmarkTree.make({}),
  })

const loadConfig = (config: SyncConfig): Effect.Effect<BookmarksConfig, Error> =>
  config.yamlOverride
    ? Effect.succeed(config.yamlOverride)
    : Effect.gen(function* () {
        const exists = yield* Effect.tryPromise({
          try: () => Fs.access(config.yamlPath).then(() => true, () => false),
          catch: (e) => new Error(`Failed to inspect ${config.yamlPath}: ${e}`),
        })
        if (!exists) return emptyConfig()
        return yield* YamlModule.load(config.yamlPath)
      })

const flattenOrdered = (
  tree: BookmarkTree,
): { readonly entries: readonly Patch.BookmarkEntry[]; readonly warnings: readonly string[] } => {
  const entries: Patch.BookmarkEntry[] = []
  const warnings: string[] = []
  const seen = new Set<string>()

  const visit = (nodes: readonly (BookmarkLeaf | { readonly name: string; readonly children: readonly unknown[] })[] | undefined, path: string): void => {
    if (!nodes) return
    for (const node of nodes) {
      if (BookmarkLeaf.is(node)) {
        if (seen.has(node.url)) {
          warnings.push(`Duplicate URL "${node.url}" at path "${path}" — keeping first occurrence`)
        } else {
          seen.add(node.url)
          entries.push({ url: node.url, name: node.name, path })
        }
      } else {
        visit(
          node.children as readonly (BookmarkLeaf | { readonly name: string; readonly children: readonly unknown[] })[],
          path === "" ? node.name : `${path}/${node.name}`,
        )
      }
    }
  }

  for (const sectionKey of ["favorites_bar", "other", "reading_list", "mobile"] as const) {
    visit(tree[sectionKey] as readonly (BookmarkLeaf | { readonly name: string; readonly children: readonly unknown[] })[] | undefined, sectionKey)
  }

  return { entries, warnings }
}

const sameEntry = (left: Patch.BookmarkEntry, right: Patch.BookmarkEntry): boolean =>
  left.url === right.url &&
  left.name === right.name &&
  left.path === right.path

const treeFromEntries = (entries: readonly Patch.BookmarkEntry[]): BookmarkTree => {
  let trie = Trie.empty<BookmarkLeaf>()

  for (const entry of entries) {
    trie = Trie.insert(
      trie,
      `${entry.path}/${entry.name}`,
      BookmarkLeaf.make({ name: entry.name, url: entry.url }),
    )
  }

  return Patch.fromTrie(trie)
}

const isTreeEmpty = (tree: BookmarkTree): boolean =>
  (tree.favorites_bar?.length ?? 0) === 0 &&
  (tree.other?.length ?? 0) === 0 &&
  (tree.reading_list?.length ?? 0) === 0 &&
  (tree.mobile?.length ?? 0) === 0

export const decomposeResolvedTrees = (
  targets: BookmarksConfig["targets"],
  resolvedTrees: Readonly<Record<string, BookmarkTree>>,
): BookmarksConfig => {
  const profileKeys = Object.keys(resolvedTrees)
  if (profileKeys.length === 0) return emptyConfig(targets)

  const orderedEntriesByKey = Object.fromEntries(
    profileKeys.map((profileKey) => [profileKey, flattenOrdered(resolvedTrees[profileKey]!).entries]),
  ) as Record<string, readonly Patch.BookmarkEntry[]>

  const entryIndexByKey = Object.fromEntries(
    profileKeys.map((profileKey) => [
      profileKey,
      new Map(orderedEntriesByKey[profileKey].map((entry) => [entry.url, entry])),
    ]),
  ) as Record<string, Map<string, Patch.BookmarkEntry>>

  const firstProfileKey = profileKeys[0]!
  const baseEntries = orderedEntriesByKey[firstProfileKey].filter((entry) =>
    profileKeys.every((profileKey) => {
      const other = entryIndexByKey[profileKey].get(entry.url)
      return other !== undefined && sameEntry(entry, other)
    })
  )
  const baseEntryIndex = new Map(baseEntries.map((entry) => [entry.url, entry]))

  const profiles: Record<string, BookmarkTree> = {}

  for (const profileKey of profileKeys) {
    const overlayEntries = orderedEntriesByKey[profileKey].filter((entry) => {
      const commonEntry = baseEntryIndex.get(entry.url)
      return commonEntry === undefined || !sameEntry(commonEntry, entry)
    })

    const overlayTree = treeFromEntries(overlayEntries)
    if (!isTreeEmpty(overlayTree)) profiles[profileKey] = overlayTree
  }

  return BookmarksConfig.make({
    targets,
    base: treeFromEntries(baseEntries),
    profiles: Object.keys(profiles).length > 0 ? profiles : undefined,
  })
}

const saveConfig = (yamlPath: string, config: BookmarksConfig): Effect.Effect<void, Error> =>
  Effect.gen(function* () {
    yield* Effect.log("Saving bookmarks.yaml...")
    yield* YamlModule.save(yamlPath, config)
    yield* Effect.log("Auto-committing bookmarks.yaml...")
    yield* gitAutoCommit(yamlPath)
  })

const resolveProfileTrees = (
  config: BookmarksConfig,
  profileKeys: readonly string[],
): Effect.Effect<Record<string, BookmarkTree>, Error> =>
  Effect.gen(function* () {
    const trees: Record<string, BookmarkTree> = {}
    for (const profileKey of profileKeys) {
      trees[profileKey] = yield* YamlModule.resolveProfile(config, profileKey)
    }
    return trees
  })

const syncTarget = (
  target: Targets.TargetDescriptor,
  baselineTree: BookmarkTree,
  yamlTree: BookmarkTree,
  maxAge: Duration.Duration,
  dryRun: boolean,
): Effect.Effect<{ readonly target: Targets.TargetDescriptor; readonly tree: BookmarkTree; readonly result: TargetResult }, Error> =>
  Effect.gen(function* () {
    const browserTree = yield* Targets.readTree(target)
    const yamlPatches = yield* Patch.generatePatches(baselineTree, yamlTree, "yaml")
    const browserPatches = yield* Patch.generatePatches(baselineTree, browserTree, target.browser)
    const resolution = yield* resolveConflicts(yamlPatches, browserPatches)
    const mergedTree = yield* applyPatches(baselineTree, resolution.apply)
    const withGraveyard = resolution.graveyard.length > 0
      ? yield* Graveyard.addGraveyardEntries(
          mergedTree,
          resolution.graveyard,
          Targets.graveyardSourceOf(target),
          "conflict",
        )
      : mergedTree
    const finalTree = yield* Graveyard.gc(withGraveyard, maxAge)
    const browserApplyPatches = yield* Patch.generatePatches(browserTree, finalTree, target.browser)

    if (!dryRun) {
      yield* Targets.applyPatches(target, browserApplyPatches)
    }

    return {
      target,
      tree: finalTree,
      result: {
        target,
        applied: browserApplyPatches,
        graveyarded: resolution.graveyard,
      },
    }
  })

const pullTarget = (
  target: Targets.TargetDescriptor,
  currentTree: BookmarkTree,
): Effect.Effect<{ readonly target: Targets.TargetDescriptor; readonly tree: BookmarkTree; readonly result: TargetResult }, Error> =>
  Effect.gen(function* () {
    const browserTree = yield* Targets.readTree(target)
    const pulledPatches = yield* Patch.generatePatches(currentTree, browserTree, target.browser)
    return {
      target,
      tree: browserTree,
      result: {
        target,
        applied: pulledPatches,
        graveyarded: [],
      },
    }
  })

const pushTarget = (
  target: Targets.TargetDescriptor,
  yamlTree: BookmarkTree,
  dryRun: boolean,
): Effect.Effect<TargetResult, Error> =>
  Effect.gen(function* () {
    const browserTree = yield* Targets.readTree(target)
    const browserApplyPatches = yield* Patch.generatePatches(browserTree, yamlTree, "yaml")

    if (!dryRun) {
      yield* Targets.applyPatches(target, browserApplyPatches)
    }

    return {
      target,
      applied: browserApplyPatches,
      graveyarded: [],
    }
  })

const gcTree = (
  currentTree: BookmarkTree,
  maxAge: Duration.Duration,
): Effect.Effect<BookmarkTree, Error> =>
  Graveyard.gc(currentTree, maxAge)

/**
 * Run a full bidirectional sync.
 *
 * Git is the state store. The committed bookmarks.yaml is the baseline for
 * three-way diff. After sync, bookmarks.yaml is auto-committed so the
 * committed version becomes the new baseline.
 *
 * Fresh sync (no committed bookmarks.yaml): baseline is empty tree,
 * every Safari bookmark becomes an Add patch, YAML is populated from scratch.
 *
 * Incremental sync: three-way diff between committed YAML (baseline),
 * current YAML on disk (user edits), and current Safari (browser changes).
 * Newest-wins conflict resolution, YAML tie-break.
 */
export const sync = (config: SyncConfig): Effect.Effect<SyncResult, Error> =>
  Effect.gen(function* () {
    const yamlConfig = yield* loadConfig(config)
    const baselineConfig = (yield* readGitBaselineConfig(config.yamlPath))
      ?? emptyConfig(yamlConfig.targets)
    const maxAge = config.graveyardMaxAge ?? Duration.days(90)
    const targetResults: TargetResult[] = []
    const resolvedTrees = yield* resolveProfileTrees(
      yamlConfig,
      Targets.listConfiguredProfileKeys(yamlConfig),
    )

    for (const target of Targets.listEnabledTargets(yamlConfig)) {
      yield* Effect.log(`Syncing ${Targets.displayNameOf(target)}...`)
      const baselineTree = yield* YamlModule.resolveProfile(baselineConfig, Targets.keyOf(target))
      const yamlTree = resolvedTrees[Targets.keyOf(target)] ?? BookmarkTree.make({})
      const targetSync = yield* syncTarget(
        target,
        baselineTree,
        yamlTree,
        maxAge,
        config.dryRun ?? false,
      )
      resolvedTrees[Targets.keyOf(target)] = targetSync.tree
      targetResults.push(targetSync.result)
    }

    const nextConfig = decomposeResolvedTrees(yamlConfig.targets, resolvedTrees)
    if (!config.dryRun) {
      yield* saveConfig(config.yamlPath, nextConfig)
    }

    return {
      applied: targetResults.flatMap((result) => result.applied),
      graveyarded: targetResults.flatMap((result) => result.graveyarded),
      targets: targetResults,
    }
  })

export const pull = (config: SyncConfig): Effect.Effect<SyncResult, Error> =>
  Effect.gen(function* () {
    const yamlConfig = yield* loadConfig(config)
    const targetResults: TargetResult[] = []
    const profileKeys = Targets.listConfiguredProfileKeys(yamlConfig)
    const resolvedTrees = yield* resolveProfileTrees(yamlConfig, profileKeys)

    for (const target of Targets.listEnabledTargets(yamlConfig)) {
      yield* Effect.log(`Pulling ${Targets.displayNameOf(target)}...`)
      const targetPull = yield* pullTarget(
        target,
        resolvedTrees[Targets.keyOf(target)] ?? BookmarkTree.make({}),
      )
      resolvedTrees[Targets.keyOf(target)] = targetPull.tree
      targetResults.push(targetPull.result)
    }

    const nextConfig = decomposeResolvedTrees(yamlConfig.targets, resolvedTrees)
    if (!config.dryRun) {
      yield* saveConfig(config.yamlPath, nextConfig)
    }

    return {
      applied: targetResults.flatMap((result) => result.applied),
      graveyarded: [],
      targets: targetResults,
    }
  })

export const push = (config: SyncConfig): Effect.Effect<SyncResult, Error> =>
  Effect.gen(function* () {
    const yamlConfig = yield* loadConfig(config)
    const targetResults: TargetResult[] = []

    for (const target of Targets.listEnabledTargets(yamlConfig)) {
      yield* Effect.log(`Pushing ${Targets.displayNameOf(target)}...`)
      const yamlTree = yield* YamlModule.resolveProfile(yamlConfig, Targets.keyOf(target))
      targetResults.push(
        yield* pushTarget(target, yamlTree, config.dryRun ?? false),
      )
    }

    return {
      applied: targetResults.flatMap((result) => result.applied),
      graveyarded: [],
      targets: targetResults,
    }
  })

export const status = (config: SyncConfig): Effect.Effect<StatusResult, Error> =>
  Effect.gen(function* () {
    const yamlConfig = yield* loadConfig(config)
    const targetStatuses: StatusTargetResult[] = []

    for (const target of Targets.listEnabledTargets(yamlConfig)) {
      const yamlTree = yield* YamlModule.resolveProfile(yamlConfig, Targets.keyOf(target))
      const browserTree = yield* Targets.readTree(target)
      targetStatuses.push({
        target,
        yamlPatches: yield* Patch.generatePatches(browserTree, yamlTree, "yaml"),
        browserPatches: yield* Patch.generatePatches(yamlTree, browserTree, target.browser),
      })
    }

    return {
      yamlPath: config.yamlPath,
      targets: targetStatuses,
    }
  })

export const backup = (config: BackupConfig): Effect.Effect<BackupResult, Error> =>
  Effect.gen(function* () {
    const yamlConfig = yield* loadConfig({ yamlPath: config.yamlPath })
    const backupDir = config.backupDir
    const timestamp = DateTime.formatIso(DateTime.unsafeNow())
      .replaceAll(":", "-")
      .replaceAll(".", "-")
    const files: string[] = []
    const skipped: string[] = []

    yield* Effect.tryPromise({
      try: () => Fs.mkdir(backupDir, { recursive: true }),
      catch: (e) => new Error(`Failed to create backup directory ${backupDir}: ${e}`),
    })

    const candidates = [
      { label: "yaml", path: config.yamlPath, filename: `${timestamp}--bookmarks.yaml` },
      ...Targets.listTargets(yamlConfig).map((target) => ({
        label: Targets.displayNameOf(target),
        path: target.path,
        filename: `${timestamp}--${Targets.displayNameOf(target).replaceAll("/", "--")}--${Path.basename(target.path)}`,
      })),
    ]

    for (const candidate of candidates) {
      const destination = Path.join(backupDir, candidate.filename)
      const exists = yield* Effect.tryPromise({
        try: () => Fs.access(candidate.path).then(() => true, () => false),
        catch: () => false,
      })

      if (!exists) {
        skipped.push(candidate.label)
        continue
      }

      yield* Effect.tryPromise({
        try: () => Fs.copyFile(candidate.path, destination),
        catch: (e) => new Error(`Failed to back up ${candidate.path}: ${e}`),
      })
      files.push(destination)
    }

    return { backupDir, files, skipped }
  })

export const gc = (config: SyncConfig): Effect.Effect<SyncResult, Error> =>
  Effect.gen(function* () {
    const yamlConfig = yield* loadConfig(config)
    const maxAge = config.graveyardMaxAge ?? Duration.days(90)
    const targetResults: TargetResult[] = []
    const profileKeys = Targets.listConfiguredProfileKeys(yamlConfig)
    const currentResolvedTrees = yield* resolveProfileTrees(yamlConfig, profileKeys)
    const cleanedResolvedTrees: Record<string, BookmarkTree> = {}

    for (const profileKey of profileKeys) {
      cleanedResolvedTrees[profileKey] = yield* gcTree(
        currentResolvedTrees[profileKey]!,
        maxAge,
      )
    }

    for (const target of Targets.listEnabledTargets(yamlConfig)) {
      const cleanedTree = cleanedResolvedTrees[Targets.keyOf(target)] ?? BookmarkTree.make({})
      targetResults.push(
        yield* pushTarget(target, cleanedTree, config.dryRun ?? false),
      )
    }

    const nextConfig = decomposeResolvedTrees(yamlConfig.targets, cleanedResolvedTrees)
    if (!config.dryRun) {
      yield* saveConfig(config.yamlPath, nextConfig)
    }

    return {
      applied: targetResults.flatMap((result) => result.applied),
      graveyarded: [],
      targets: targetResults,
    }
  })
