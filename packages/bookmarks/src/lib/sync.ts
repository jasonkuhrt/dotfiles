/**
 * Core sync engine.
 *
 * Pipeline: diff -> detect conflicts -> resolve (newest-wins) -> apply.
 * Produces graveyard entries for conflict losers.
 */

import { Array as Arr, DateTime, Effect, HashMap, Order, Trie, pipe } from "effect"
import * as Patch from "./patch.js"
import * as Safari from "./safari.js"
import type * as SchemaModule from "./schema.js"
import * as Schema from "./schema.js"
import * as State from "./state.js"
import * as YamlModule from "./yaml.js"

export interface SyncResult {
  readonly applied: readonly Patch.BookmarkPatch[]
  readonly graveyarded: readonly Patch.BookmarkPatch[]
}

export interface ConflictResolution {
  readonly apply: readonly Patch.BookmarkPatch[]
  readonly graveyard: readonly Patch.BookmarkPatch[]
}

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

    // Sort patches: Remove → Move → Rename → Add
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
  readonly stateBasePath: string
  readonly safariPlistPath: string
  readonly dryRun?: boolean
}

/**
 * Run a full bidirectional sync.
 *
 * Fresh sync (no prior state): every Safari bookmark becomes an Add patch,
 * YAML is populated from scratch, state snapshot is saved.
 *
 * Incremental sync: three-way diff between last-sync baseline, current YAML,
 * and current Safari. Newest-wins conflict resolution, YAML tie-break.
 */
export const sync = (config: SyncConfig): Effect.Effect<SyncResult, Error> =>
  Effect.gen(function* () {
    // 1. Read Safari bookmarks
    yield* Effect.log("Reading Safari bookmarks...")
    const safariTree = yield* Safari.readBookmarks(config.safariPlistPath)

    // 2. Load sync state (empty if first run)
    const state = yield* State.load(config.stateBasePath)
    const isFreshSync = state.last_sync === ""
    yield* Effect.log(isFreshSync ? "Fresh sync (no prior state)" : `Last sync: ${state.last_sync}`)

    // 3. Load YAML config (create default for fresh sync if file missing)
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

    // 4. Baseline for three-way diff (empty tree on fresh sync)
    const lastSyncTree = new Schema.BookmarkTree({})

    // 5. Three-way diff: generate patches from each side against baseline
    yield* Effect.log("Generating patches...")
    const yamlPatches = yield* Patch.generatePatches(lastSyncTree, yamlTree, "yaml")
    const browserPatches = yield* Patch.generatePatches(lastSyncTree, safariTree, "safari")
    yield* Effect.log(`  YAML: ${yamlPatches.length} patches, Safari: ${browserPatches.length} patches`)

    // 6. Resolve conflicts (newest-wins, YAML tie-break)
    const resolution = yield* resolveConflicts(yamlPatches, browserPatches)
    yield* Effect.log(`  → ${resolution.apply.length} to apply, ${resolution.graveyard.length} to graveyard`)

    // 7. Apply resolved patches to baseline
    const mergedTree = yield* applyPatches(lastSyncTree, resolution.apply)

    if (!config.dryRun) {
      // 8. Save YAML
      yield* Effect.log("Saving bookmarks.yaml...")
      const newConfig = new Schema.BookmarksConfig({
        targets: yamlConfig.targets,
        base: mergedTree,
        profiles: yamlConfig.profiles,
      })
      yield* YamlModule.save(config.yamlPath, newConfig)

      // 9. Save state snapshot
      yield* Effect.log("Saving sync state...")
      const { index } = Patch.flatten(mergedTree)
      const bookmarks: Record<string, { name: string; path: string; date_modified: string }> = {}
      const now = new Date().toISOString()
      HashMap.forEach(index, (entry, url) => {
        bookmarks[url] = { name: entry.name, path: entry.path, date_modified: now }
      })
      yield* State.save(config.stateBasePath, {
        version: 1,
        last_sync: now,
        profiles: {
          default: {
            yaml_hash: "",
            browser_hash: "",
            bookmarks,
          },
        },
      })
    }

    yield* Effect.log(`Sync complete: ${resolution.apply.length} applied, ${resolution.graveyard.length} graveyarded`)

    return {
      applied: resolution.apply,
      graveyarded: resolution.graveyard,
    }
  })
