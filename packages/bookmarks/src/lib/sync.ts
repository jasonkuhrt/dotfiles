/**
 * Core sync engine.
 *
 * Pipeline: diff -> detect conflicts -> resolve (newest-wins) -> apply.
 * Produces graveyard entries for conflict losers.
 */

import { Array as Arr, DateTime, Effect, Order, Trie, pipe } from "effect"
import * as Patch from "./patch.js"
import type * as SchemaModule from "./schema.js"
import * as Schema from "./schema.js"

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

/** Run a full bidirectional sync. */
export declare const sync: (options?: { readonly dryRun?: boolean }) => Effect.Effect<SyncResult, Error>
