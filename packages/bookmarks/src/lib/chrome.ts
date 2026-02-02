/**
 * Chrome JSON adapter.
 *
 * Reads Chrome's Bookmarks JSON and extracts a clean BookmarkSchema.BookmarkTree (lossy -- discards Chrome metadata).
 * Applies BookmarkPatch[] surgically to the native JSON structure (preserves all metadata).
 * Handles Chrome's Windows-epoch timestamps, MD5 checksum recalculation, and atomic file writes.
 */

import { DateTime, Effect, Schema } from "effect"
import { rename } from "node:fs/promises"
import * as Patch from "./patch.js"
import * as BookmarkSchema from "./schema/__.js"

// -- Chrome JSON type aliases --

type ChromeNode = {
  type: "url" | "folder"
  name: string
  id: string
  guid: string
  date_added: string
  date_last_used?: string
  url?: string
  children?: ChromeNode[]
  meta_info?: Record<string, string>
  date_modified?: string
}

type ChromeRoot = {
  bookmark_bar: ChromeNode
  other: ChromeNode
  synced: ChromeNode
}

type ChromeBookmarksFile = {
  checksum: string
  roots: ChromeRoot
  version: number
  sync_metadata?: string
}

// -- Chrome timestamp helpers --

/** Offset in seconds between Windows epoch (1601-01-01) and Unix epoch (1970-01-01). */
const WINDOWS_EPOCH_OFFSET = 11_644_473_600n

/** Convert Chrome timestamp (Windows epoch microseconds as string) to Unix milliseconds. */
export const chromeTimestampToUnixMs = (chromeTs: string): number => {
  const us = BigInt(chromeTs)
  if (us === 0n) return 0
  const unixSeconds = us / 1_000_000n - WINDOWS_EPOCH_OFFSET
  return Number(unixSeconds) * 1000
}

/** Convert Unix milliseconds to Chrome timestamp (Windows epoch microseconds as string). */
export const unixMsToChromeTimestamp = (unixMs: number): string => {
  const unixSeconds = BigInt(Math.floor(unixMs / 1000))
  const us = (unixSeconds + WINDOWS_EPOCH_OFFSET) * 1_000_000n
  return us.toString()
}

/** Generate a Chrome timestamp for "now". */
const nowChromeTimestamp = (): string => unixMsToChromeTimestamp(DateTime.toEpochMillis(DateTime.unsafeNow()))

// -- Chrome section key ↔ domain section key mappings --

const CHROME_KEY_TO_SECTION: Record<string, "favorites_bar" | "other" | "mobile"> = {
  bookmark_bar: "favorites_bar",
  other: "other",
  synced: "mobile",
}

const SECTION_TO_CHROME_KEY: Record<string, keyof ChromeRoot> = {
  favorites_bar: "bookmark_bar",
  other: "other",
  mobile: "synced",
}

// -- Chrome JSON ↔ domain Schema transforms (read path: lossy, discards Chrome metadata) --

const ChromeLeafTransform = Schema.transform(
  Schema.Struct({
    type: Schema.Literal("url"),
    name: Schema.String,
    url: Schema.String,
  }),
  BookmarkSchema.BookmarkLeaf,
  {
    strict: false,
    decode: (chrome) => ({ _tag: "BookmarkLeaf" as const, url: chrome.url, name: chrome.name }),
    encode: (leaf) => ({
      type: "url" as const,
      name: leaf.name,
      url: leaf.url,
    }),
  },
)

const ChromeFolderTransform = Schema.transform(
  Schema.Struct({
    type: Schema.Literal("folder"),
    name: Schema.String,
    children: Schema.optional(Schema.Array(Schema.Unknown)),
  }),
  BookmarkSchema.BookmarkFolder,
  {
    strict: false,
    decode: (chrome) => ({
      _tag: "BookmarkFolder" as const,
      name: chrome.name,
      children: chrome.children ? decodeNodes(chrome.children as ChromeNode[]) : [],
    }),
    encode: (folder) => ({
      type: "folder" as const,
      name: folder.name,
      children: folder.children as any,
    }),
  },
)

// -- MD5 checksum calculation --

/**
 * Encode a string as UTF-16LE bytes (matching Chromium's internal string16 representation).
 * This is used for the "name" (title) field in the checksum calculation.
 */
const toUtf16LeBytes = (str: string): Uint8Array => {
  const codeUnits: number[] = []
  for (let i = 0; i < str.length; i++) {
    codeUnits.push(str.charCodeAt(i))
  }
  const bytes = new Uint8Array(codeUnits.length * 2)
  for (let i = 0; i < codeUnits.length; i++) {
    bytes[i * 2] = codeUnits[i]! & 0xff
    bytes[i * 2 + 1] = (codeUnits[i]! >> 8) & 0xff
  }
  return bytes
}

/**
 * Calculate Chrome's MD5 checksum for the bookmark tree.
 *
 * Walks the tree depth-first through bookmark_bar, other, synced roots.
 * For each node feeds into MD5: id (ASCII), name (UTF-16LE), type ("url"|"folder" ASCII),
 * and for URL nodes also the url (ASCII). For folders, recurses into children.
 */
export const calculateChecksum = (roots: ChromeRoot): string => {
  const hasher = new Bun.CryptoHasher("md5")

  const updateNode = (node: ChromeNode): void => {
    // id as ASCII bytes
    hasher.update(node.id)
    // name as UTF-16LE bytes
    hasher.update(toUtf16LeBytes(node.name))

    if (node.type === "url") {
      hasher.update("url")
      hasher.update(node.url ?? "")
    } else {
      hasher.update("folder")
      if (node.children) {
        for (const child of node.children) {
          updateNode(child)
        }
      }
    }
  }

  // Process roots in the canonical order: bookmark_bar, other, synced
  updateNode(roots.bookmark_bar)
  updateNode(roots.other)
  updateNode(roots.synced)

  return hasher.digest("hex")
}

// -- readBookmarks --

/** Read Chrome bookmarks from a Bookmarks JSON file path into a clean BookmarkSchema.BookmarkTree. */
export const readBookmarks = (bookmarksPath: string): Effect.Effect<BookmarkSchema.BookmarkTree, Error> =>
  Effect.gen(function* () {
    const text = yield* Effect.tryPromise({
      try: () => Bun.file(bookmarksPath).text(),
      catch: (cause) => new Error(`Failed to read Chrome bookmarks at ${bookmarksPath}`, { cause }),
    })

    const file = JSON.parse(text) as ChromeBookmarksFile
    const { roots } = file

    const sections: Partial<Record<"favorites_bar" | "other" | "mobile", BookmarkSchema.BookmarkSection>> = {}

    for (const [chromeKey, sectionKey] of Object.entries(CHROME_KEY_TO_SECTION)) {
      const rootNode = roots[chromeKey as keyof ChromeRoot]
      if (rootNode?.children && rootNode.children.length > 0) {
        sections[sectionKey] = decodeNodes(rootNode.children)
      }
    }

    return BookmarkSchema.BookmarkTree.make({
      favorites_bar: sections.favorites_bar,
      other: sections.other,
      mobile: sections.mobile,
    })
  })

// -- applyPatches --

/**
 * Apply bookmark patches surgically to an existing Chrome Bookmarks JSON, preserving all metadata.
 *
 * Architecture note: this operates on raw ChromeNode references via in-place mutation rather than
 * Schema decode->mutate->encode. Schema.transform creates new objects on decode, breaking reference
 * chains to parent nodes in the tree. Surgical patches require mutable references to the original
 * nodes so that modifications propagate through the tree without parent/index tracking.
 * New nodes are constructed with required Chrome metadata (guid, id, timestamps).
 */
export const applyPatches = (
  bookmarksPath: string,
  patches: ReadonlyArray<Patch.BookmarkPatch>,
): Effect.Effect<void, Error> =>
  Effect.gen(function* () {
    const text = yield* Effect.tryPromise({
      try: () => Bun.file(bookmarksPath).text(),
      catch: (cause) => new Error(`Failed to read Chrome bookmarks at ${bookmarksPath}`, { cause }),
    })

    const file = JSON.parse(text) as ChromeBookmarksFile
    const { roots } = file

    // Track next sequential ID for new nodes
    let nextId = findMaxId(roots) + 1

    for (const patch of patches) {
      Patch.$match(patch, {
        Add: ({ url, name, path }) => {
          const { chromeKey, folderPath } = parseDomainPath(path)
          const rootNode = roots[chromeKey]
          if (!rootNode.children) rootNode.children = []
          const parent = ensureFolderPath(rootNode.children, folderPath, () => nextId++)
          const ts = nowChromeTimestamp()
          parent.push({
            type: "url",
            name,
            url,
            id: String(nextId++),
            guid: crypto.randomUUID(),
            date_added: ts,
            date_last_used: "0",
          } as unknown as ChromeNode)
        },
        Remove: ({ url }) => {
          removeNodeByUrl(roots, url)
        },
        Rename: ({ url, newName }) => {
          const node = findNodeByUrl(roots, url)
          if (node) {
            node.name = newName
          }
        },
        Move: ({ url, toPath }) => {
          const removed = extractNodeByUrl(roots, url)
          if (removed) {
            const { chromeKey, folderPath } = parseDomainPath(toPath)
            const rootNode = roots[chromeKey]
            if (!rootNode.children) rootNode.children = []
            const parent = ensureFolderPath(rootNode.children, folderPath, () => nextId++)
            parent.push(removed)
          }
        },
      })
    }

    // Recalculate checksum
    file.checksum = calculateChecksum(roots)

    // Serialize and write atomically
    const serialized = JSON.stringify(file, null, 3)
    const tmpPath = `${bookmarksPath}.tmp.${Date.now()}`

    yield* Effect.tryPromise({
      try: async () => {
        await Bun.write(tmpPath, serialized)
        await rename(tmpPath, bookmarksPath)
      },
      catch: (cause) => new Error(`Failed to write Chrome bookmarks at ${bookmarksPath}`, { cause }),
    })
  })

// -- Read path helpers (Schema-driven decoding) --

function decodeNodes(children: ChromeNode[]): BookmarkSchema.BookmarkNode[] {
  const nodes: BookmarkSchema.BookmarkNode[] = []
  for (const child of children) {
    if (child.type === "url") {
      nodes.push(Schema.decodeUnknownSync(ChromeLeafTransform)(child))
    } else if (child.type === "folder") {
      nodes.push(Schema.decodeUnknownSync(ChromeFolderTransform)(child))
    }
  }
  return nodes
}

// -- Write path helpers (raw JSON mutation -- see applyPatches architecture note) --

/** Parse a domain path like "favorites_bar/Dev" into Chrome root key + folder path. */
const parseDomainPath = (path: string): { chromeKey: keyof ChromeRoot; folderPath: string[] } => {
  const [sectionKey, ...rest] = path.split("/")
  const chromeKey = SECTION_TO_CHROME_KEY[sectionKey!] ?? (sectionKey as keyof ChromeRoot)
  return { chromeKey, folderPath: rest }
}

/** Walk or create nested folders, returning the final children array. */
const ensureFolderPath = (
  children: ChromeNode[],
  folderPath: string[],
  allocateId: () => number,
): ChromeNode[] => {
  let current = children
  for (const folderName of folderPath) {
    const existing = current.find((c) => c.type === "folder" && c.name === folderName)
    if (existing) {
      if (!existing.children) existing.children = []
      current = existing.children
    } else {
      const ts = nowChromeTimestamp()
      const newFolder: ChromeNode = {
        type: "folder",
        name: folderName,
        children: [],
        id: String(allocateId()),
        guid: crypto.randomUUID(),
        date_added: ts,
        date_modified: ts,
        date_last_used: "0",
      }
      current.push(newFolder)
      current = newFolder.children!
    }
  }
  return current
}

/** Find a URL node by URL anywhere in the roots. */
const findNodeByUrl = (roots: ChromeRoot, url: string): ChromeNode | undefined => {
  for (const key of ["bookmark_bar", "other", "synced"] as const) {
    const found = findInChildren(roots[key].children ?? [], url)
    if (found) return found
  }
  return undefined
}

/** Find a URL node by URL in a children array (recursive). */
const findInChildren = (children: ChromeNode[], url: string): ChromeNode | undefined => {
  for (const node of children) {
    if (node.type === "url" && node.url === url) return node
    if (node.children) {
      const found = findInChildren(node.children, url)
      if (found) return found
    }
  }
  return undefined
}

/** Remove a URL node by URL from anywhere in the roots. Returns true if removed. */
const removeNodeByUrl = (roots: ChromeRoot, url: string): boolean => {
  for (const key of ["bookmark_bar", "other", "synced"] as const) {
    if (roots[key].children && removeFromChildren(roots[key].children!, url)) return true
  }
  return false
}

/** Remove a URL node from a children array (recursive). */
const removeFromChildren = (children: ChromeNode[], url: string): boolean => {
  for (let i = 0; i < children.length; i++) {
    const node = children[i]!
    if (node.type === "url" && node.url === url) {
      children.splice(i, 1)
      return true
    }
    if (node.children && removeFromChildren(node.children, url)) return true
  }
  return false
}

/** Extract (remove and return) a URL node by URL from anywhere in the roots. */
const extractNodeByUrl = (roots: ChromeRoot, url: string): ChromeNode | undefined => {
  for (const key of ["bookmark_bar", "other", "synced"] as const) {
    if (roots[key].children) {
      const found = extractFromChildren(roots[key].children!, url)
      if (found) return found
    }
  }
  return undefined
}

/** Extract a URL node from a children array (recursive). */
const extractFromChildren = (children: ChromeNode[], url: string): ChromeNode | undefined => {
  for (let i = 0; i < children.length; i++) {
    const node = children[i]!
    if (node.type === "url" && node.url === url) {
      children.splice(i, 1)
      return node
    }
    if (node.children) {
      const found = extractFromChildren(node.children, url)
      if (found) return found
    }
  }
  return undefined
}

/** Find the maximum numeric ID across all nodes in the roots. */
const findMaxId = (roots: ChromeRoot): number => {
  let maxId = 0
  const walk = (node: ChromeNode): void => {
    const id = parseInt(node.id, 10)
    if (id > maxId) maxId = id
    if (node.children) {
      for (const child of node.children) walk(child)
    }
  }
  walk(roots.bookmark_bar)
  walk(roots.other)
  walk(roots.synced)
  return maxId
}
