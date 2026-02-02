/**
 * Core sync engine.
 *
 * Pipeline: git baseline -> three-way diff -> resolve conflicts -> apply -> save -> auto-commit.
 * Git is the state store: the committed bookmarks.yaml IS the baseline for both sides.
 * Produces graveyard entries for conflict losers.
 */

import { Array as Arr, DateTime, Duration, Effect, Order, Schema as EffectSchema, Trie, pipe } from "effect"
import { execFile } from "node:child_process"
import * as Path from "node:path"
import * as Yaml from "yaml"
import * as Graveyard from "./graveyard.js"
import * as Patch from "./patch.js"
import * as Safari from "./safari.js"
import type * as SchemaModule from "./schema.js"
import * as Schema from "./schema.js"
import * as YamlModule from "./yaml.js"

export interface SyncResult {
  readonly applied: readonly Patch.BookmarkPatch[]
  readonly graveyarded: readonly Patch.BookmarkPatch[]
}

export interface ConflictResolution {
  readonly apply: readonly Patch.BookmarkPatch[]
  readonly graveyard: readonly Patch.BookmarkPatch[]
}

// -- Git baseline --

/**
 * Read the last-committed version of bookmarks.yaml from git.
 * Returns empty BookmarkTree if the file has never been committed.
 */
export const readGitBaseline = (yamlPath: string): Effect.Effect<SchemaModule.BookmarkTree, Error> =>
  Effect.gen(function* () {
    const repoRoot = yield* gitRepoRoot(yamlPath)
    const relPath = Path.relative(repoRoot, yamlPath)

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
      return new Schema.BookmarkTree({})
    }

    // Parse and validate the committed YAML
    const parsed: unknown = Yaml.parse(raw)
    const config = yield* EffectSchema.decodeUnknown(Schema.BookmarksConfig)(parsed).pipe(
      Effect.mapError((e) => new Error(`Failed to parse committed bookmarks.yaml: ${e.message}`)),
    )
    return config.base
  })

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

/** Auto-commit bookmarks.yaml so the committed version becomes the new baseline. */
export const gitAutoCommit = (yamlPath: string): Effect.Effect<void, Error> =>
  Effect.gen(function* () {
    const repoRoot = yield* gitRepoRoot(yamlPath)
    const relPath = Path.relative(repoRoot, yamlPath)

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
  tree: SchemaModule.BookmarkTree,
  patches: readonly Patch.BookmarkPatch[],
): Effect.Effect<SchemaModule.BookmarkTree, Error> =>
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
const applyOne = (trie: Trie.Trie<Schema.BookmarkLeaf>, patch: Patch.BookmarkPatch): Trie.Trie<Schema.BookmarkLeaf> =>
  Patch.$match(patch, {
    Add: ({ url, name, path }) => {
      const fullPath = `${path}/${name}`
      return Trie.insert(trie, fullPath, new Schema.BookmarkLeaf({ name, url }))
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
        Trie.insert(newKey, new Schema.BookmarkLeaf({ name: newName, url })),
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
  readonly safariPlistPath: string
  readonly dryRun?: boolean
  /** Max age for graveyard entries before GC removes them. Default: 90 days. */
  readonly graveyardMaxAge?: Duration.Duration
}

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
    // 1. Read Safari bookmarks
    yield* Effect.log("Reading Safari bookmarks...")
    const safariTree = yield* Safari.readBookmarks(config.safariPlistPath)

    // 2. Read git baseline (committed bookmarks.yaml, or empty tree if never committed)
    yield* Effect.log("Reading git baseline...")
    const baselineTree = yield* readGitBaseline(config.yamlPath)

    // 3. Load current YAML from disk (user's edits since last commit)
    const yamlConfig = yield* YamlModule.load(config.yamlPath).pipe(
      Effect.catchAll(() =>
        Effect.succeed(
          new Schema.BookmarksConfig({
            targets: {
              safari: {
                default: new Schema.TargetProfile({ path: config.safariPlistPath }),
              },
            },
            base: new Schema.BookmarkTree({}),
          }),
        ),
      ),
    )
    const yamlTree = yamlConfig.base

    // 4. Three-way diff: generate patches from each side against baseline
    yield* Effect.log("Generating patches...")
    const yamlPatches = yield* Patch.generatePatches(baselineTree, yamlTree, "yaml")
    const browserPatches = yield* Patch.generatePatches(baselineTree, safariTree, "safari")
    yield* Effect.log(`  YAML: ${yamlPatches.length} patches, Safari: ${browserPatches.length} patches`)

    // 5. Resolve conflicts (newest-wins, YAML tie-break)
    const resolution = yield* resolveConflicts(yamlPatches, browserPatches)
    yield* Effect.log(`  -> ${resolution.apply.length} to apply, ${resolution.graveyard.length} to graveyard`)

    // 6. Apply resolved patches to baseline
    const mergedTree = yield* applyPatches(baselineTree, resolution.apply)

    // 6b. Add graveyard entries for conflict losers
    const withGraveyard = resolution.graveyard.length > 0
      ? yield* Graveyard.addGraveyardEntries(mergedTree, resolution.graveyard, "safari", "conflict")
      : mergedTree

    // 6c. Run graveyard GC (remove entries older than maxAge)
    const maxAge = config.graveyardMaxAge ?? Duration.days(90)
    const finalTree = yield* Graveyard.gc(withGraveyard, maxAge)

    if (!config.dryRun) {
      // 7. Save merged YAML
      yield* Effect.log("Saving bookmarks.yaml...")
      const newConfig = new Schema.BookmarksConfig({
        targets: yamlConfig.targets,
        base: finalTree,
        profiles: yamlConfig.profiles,
      })
      yield* YamlModule.save(config.yamlPath, newConfig)

      // 8. Auto-commit bookmarks.yaml (committed version = new baseline)
      yield* Effect.log("Auto-committing bookmarks.yaml...")
      yield* gitAutoCommit(config.yamlPath)
    }

    yield* Effect.log(`Sync complete: ${resolution.apply.length} applied, ${resolution.graveyard.length} graveyarded`)

    return {
      applied: resolution.apply,
      graveyarded: resolution.graveyard,
    }
  })
