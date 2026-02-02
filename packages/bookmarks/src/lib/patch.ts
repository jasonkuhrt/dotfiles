/**
 * Domain-specific bookmark patch types and generation.
 *
 * Patches are the intermediate representation between "what changed"
 * and "apply the change." URL is the identity key.
 *
 * Key data structures:
 * - BookmarkIndex (HashMap<string, BookmarkEntry>) — URL-keyed, used for diffing
 * - BookmarkTrie (Trie<BookmarkLeaf>) — path-keyed, used for applying patches
 */

import { Data, DateTime, Effect, HashMap, Option, Trie, pipe } from "effect"
import * as SchemaModule from "./schema.js"

// -- Patch types (Data.TaggedEnum) --

export type BookmarkPatch = Data.TaggedEnum<{
  Add: { readonly url: string; readonly name: string; readonly path: string; readonly date: DateTime.Utc }
  Remove: { readonly url: string; readonly path: string; readonly date: DateTime.Utc }
  Rename: { readonly url: string; readonly oldName: string; readonly newName: string; readonly date: DateTime.Utc }
  Move: { readonly url: string; readonly fromPath: string; readonly toPath: string; readonly date: DateTime.Utc }
}>

export const { Add, Remove, Rename, Move, $is, $match } = Data.taggedEnum<BookmarkPatch>()

// -- BookmarkEntry (for URL-keyed diffing) --

export interface BookmarkEntry {
  readonly url: string
  readonly name: string
  readonly path: string
}

export type BookmarkIndex = HashMap.HashMap<string, BookmarkEntry>

// -- BookmarkTrie (for path-keyed patch application) --

export type BookmarkTrie = Trie.Trie<SchemaModule.BookmarkLeaf>

// -- Section keys for tree traversal --

const sectionKeys = ["favorites_bar", "other", "reading_list", "mobile"] as const

// -- flatten: BookmarkTree → BookmarkIndex (URL-keyed) --

export interface FlattenResult {
  readonly index: BookmarkIndex
  readonly warnings: readonly string[]
}

/** Flatten a BookmarkTree into a URL-keyed HashMap for diffing. First occurrence wins on duplicates. */
export const flatten = (tree: SchemaModule.BookmarkTree): FlattenResult => {
  const entries: Array<readonly [string, BookmarkEntry]> = []
  const warnings: Array<string> = []
  const seen = new Set<string>()

  const visit = (nodes: SchemaModule.BookmarkSection | undefined, path: string): void => {
    if (!nodes) return
    for (const node of nodes) {
      if (SchemaModule.BookmarkLeaf.is(node)) {
        if (seen.has(node.url)) {
          warnings.push(`Duplicate URL "${node.url}" at path "${path}" — keeping first occurrence`)
        } else {
          seen.add(node.url)
          entries.push([node.url, { url: node.url, name: node.name, path }])
        }
      } else if (SchemaModule.BookmarkFolder.is(node)) {
        visit(node.children as SchemaModule.BookmarkSection, path === "" ? node.name : `${path}/${node.name}`)
      }
    }
  }

  for (const key of sectionKeys) {
    visit(tree[key], key)
  }

  return { index: HashMap.fromIterable(entries), warnings }
}

// -- toTrie: BookmarkTree → BookmarkTrie (path-keyed) --

/** Convert a BookmarkTree to a path-keyed Trie. Key = "section/folder/.../leafName". */
export const toTrie = (tree: SchemaModule.BookmarkTree): BookmarkTrie => {
  let trie: BookmarkTrie = Trie.empty()

  const visit = (nodes: SchemaModule.BookmarkSection | undefined, path: string): void => {
    if (!nodes) return
    for (const node of nodes) {
      if (SchemaModule.BookmarkLeaf.is(node)) {
        const fullPath = `${path}/${node.name}`
        trie = Trie.insert(trie, fullPath, node)
      } else if (SchemaModule.BookmarkFolder.is(node)) {
        visit(node.children as SchemaModule.BookmarkSection, `${path}/${node.name}`)
      }
    }
  }

  for (const key of sectionKeys) {
    visit(tree[key], key)
  }

  return trie
}

// -- fromTrie: BookmarkTrie → BookmarkTree --

/** Reconstruct a BookmarkTree from a path-keyed Trie. */
export const fromTrie = (trie: BookmarkTrie): SchemaModule.BookmarkTree => {
  // Collect entries grouped by section
  const sections: Record<string, Array<{ readonly segments: readonly string[]; readonly leaf: SchemaModule.BookmarkLeaf }>> = {}

  Trie.forEach(trie, (leaf, key) => {
    // key format: "sectionKey/folder1/.../leafName"
    const parts = key.split("/")
    const sectionKey = parts[0]!
    const segments = parts.slice(1)
    if (!sections[sectionKey]) sections[sectionKey] = []
    sections[sectionKey]!.push({ segments, leaf })
  })

  const buildNodes = (
    items: Array<{ readonly segments: readonly string[]; readonly leaf: SchemaModule.BookmarkLeaf }>,
  ): SchemaModule.BookmarkSection => {
    // Group by first segment
    const direct: SchemaModule.BookmarkLeaf[] = []
    const grouped: Record<string, Array<{ readonly segments: readonly string[]; readonly leaf: SchemaModule.BookmarkLeaf }>> = {}

    for (const item of items) {
      if (item.segments.length === 1) {
        direct.push(item.leaf)
      } else {
        const folderName = item.segments[0]!
        if (!grouped[folderName]) grouped[folderName] = []
        grouped[folderName]!.push({ segments: item.segments.slice(1), leaf: item.leaf })
      }
    }

    const result: Array<SchemaModule.BookmarkNode> = []

    // Add folders first (preserving order by first encounter)
    for (const [folderName, children] of Object.entries(grouped)) {
      result.push(new SchemaModule.BookmarkFolder({ name: folderName, children: buildNodes(children) }))
    }

    // Then leaves
    for (const leaf of direct) {
      result.push(leaf)
    }

    return result
  }

  const makeSection = (key: string): SchemaModule.BookmarkSection | undefined => {
    const items = sections[key]
    if (!items || items.length === 0) return undefined
    return buildNodes(items)
  }

  return new SchemaModule.BookmarkTree({
    favorites_bar: makeSection("favorites_bar"),
    other: makeSection("other"),
    reading_list: makeSection("reading_list"),
    mobile: makeSection("mobile"),
  })
}

// -- generatePatches --

/** Generate patches by diffing last-sync state against current state. */
export const generatePatches = (
  lastSync: SchemaModule.BookmarkTree,
  current: SchemaModule.BookmarkTree,
  _source: string,
  dates?: HashMap.HashMap<string, DateTime.Utc>,
): Effect.Effect<readonly BookmarkPatch[], Error> =>
  Effect.gen(function* () {
    const now = yield* DateTime.now
    const { index: lastIndex } = flatten(lastSync)
    const { index: currentIndex } = flatten(current)
    const patches: BookmarkPatch[] = []

    const dateFor = (url: string): DateTime.Utc =>
      dates
        ? pipe(HashMap.get(dates, url), Option.getOrElse(() => now))
        : now

    // URLs in current but not in lastSync → add
    // URLs in both → check for rename / move
    HashMap.forEach(currentIndex, (entry, url) => {
      const lastEntry = HashMap.get(lastIndex, url)
      if (Option.isNone(lastEntry)) {
        patches.push(Add({ url, name: entry.name, path: entry.path, date: dateFor(url) }))
      } else {
        const prev = lastEntry.value
        if (prev.path !== entry.path) {
          patches.push(Move({ url, fromPath: prev.path, toPath: entry.path, date: dateFor(url) }))
        }
        if (prev.name !== entry.name) {
          patches.push(Rename({ url, oldName: prev.name, newName: entry.name, date: dateFor(url) }))
        }
      }
    })

    // URLs in lastSync but not in current → remove
    HashMap.forEach(lastIndex, (entry, url) => {
      if (Option.isNone(HashMap.get(currentIndex, url))) {
        patches.push(Remove({ url, path: entry.path, date: dateFor(url) }))
      }
    })

    return patches
  })
