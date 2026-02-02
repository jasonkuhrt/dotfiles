/**
 * Graveyard management and garbage collection.
 *
 * The graveyard is a real bookmark folder (`_graveyard/`) that stores
 * conflict losers with self-describing names: `YYYY-MM-DD_{source}_{reason}/`.
 * GC removes entries older than the configured max age (default 90 days).
 *
 * Original bookmark paths are preserved as nested folders inside each
 * graveyard event folder, so the structure is:
 *   other/_graveyard/2025-01-15_safari_conflict/favorites_bar/AI/Tools/ChatGPT
 */

import { DateTime, Duration, Effect, Option } from "effect"
import * as Patch from "./patch.js"
import { BookmarkFolder, BookmarkLeaf, BookmarkTree, type BookmarkNode } from "./schema.js"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Name of the top-level graveyard folder under `other`. */
export const GRAVEYARD_FOLDER_NAME = "_graveyard"

/** Regex for parsing graveyard event folder names. */
const EVENT_FOLDER_RE = /^(\d{4}-\d{2}-\d{2})_([^_]+)_([^_]+)$/

// ---------------------------------------------------------------------------
// Helpers (internal)
// ---------------------------------------------------------------------------

/** Format a DateTime.Utc as YYYY-MM-DD. */
const formatDate = (dt: DateTime.Utc): string => DateTime.formatIsoDateUtc(dt)

/** Build a graveyard event folder name from date, source, and reason. */
export const makeEventFolderName = (
  date: DateTime.Utc,
  source: string,
  reason: string,
): string => `${formatDate(date)}_${source}_${reason}`

/** Parse a graveyard event folder name, returning the date portion. */
export const parseEventFolderName = (
  name: string,
): Option.Option<{ date: DateTime.Utc; source: string; reason: string }> => {
  const m = EVENT_FOLDER_RE.exec(name)
  if (!m) return Option.none()
  const dateOpt = DateTime.make(m[1]!)
  if (Option.isNone(dateOpt)) return Option.none()
  return Option.some({ date: dateOpt.value as DateTime.Utc, source: m[2]!, reason: m[3]! })
}

/**
 * Build a nested folder structure representing the original path of a bookmark.
 *
 * Given path "favorites_bar/AI/Tools" and a leaf bookmark, produces:
 *   BookmarkFolder("favorites_bar", [BookmarkFolder("AI", [BookmarkFolder("Tools", [leaf])])])
 */
const buildPathFolders = (
  pathSegments: readonly string[],
  leaf: BookmarkNode,
): BookmarkNode => {
  if (pathSegments.length === 0) return leaf

  let current: BookmarkNode = leaf
  for (let i = pathSegments.length - 1; i >= 0; i--) {
    current = new BookmarkFolder({ name: pathSegments[i]!, children: [current] })
  }
  return current
}

/**
 * Extract bookmark info from a patch for graveyard entry creation.
 * Returns the url, name, and path segments for the bookmark being affected.
 */
const patchToBookmarkInfo = (patch: Patch.BookmarkPatch): { url: string; name: string; pathSegments: string[] } =>
  Patch.$match(patch, {
    Add: (p) => ({ url: p.url, name: p.name, pathSegments: p.path.split("/") }),
    Remove: (p) => ({ url: p.url, name: p.url, pathSegments: p.path.split("/") }),
    Rename: (p) => ({ url: p.url, name: p.oldName, pathSegments: [] }),
    Move: (p) => ({ url: p.url, name: p.url, pathSegments: p.fromPath.split("/") }),
  })

/**
 * Find or create the _graveyard folder within the `other` section.
 * Returns the updated `other` array and the graveyard folder.
 */
const ensureGraveyardFolder = (
  other: readonly BookmarkNode[],
): { other: readonly BookmarkNode[]; graveyardFolder: BookmarkFolder } => {
  const existing = other.find(
    (n): n is BookmarkFolder => BookmarkFolder.is(n) && n.name === GRAVEYARD_FOLDER_NAME,
  )
  if (existing) {
    return { other, graveyardFolder: existing }
  }
  const folder = new BookmarkFolder({ name: GRAVEYARD_FOLDER_NAME, children: [] })
  return { other: [...other, folder], graveyardFolder: folder }
}

/**
 * Find or create an event folder within the graveyard folder.
 * Returns the updated graveyard folder.
 */
const ensureEventFolder = (
  graveyardFolder: BookmarkFolder,
  eventFolderName: string,
): { graveyardFolder: BookmarkFolder; eventFolder: BookmarkFolder } => {
  const existing = graveyardFolder.children.find(
    (n): n is BookmarkFolder => BookmarkFolder.is(n) && n.name === eventFolderName,
  )
  if (existing) {
    return { graveyardFolder, eventFolder: existing }
  }
  const folder = new BookmarkFolder({ name: eventFolderName, children: [] })
  const updated = new BookmarkFolder({
    name: graveyardFolder.name,
    children: [...graveyardFolder.children, folder],
  })
  return { graveyardFolder: updated, eventFolder: folder }
}

/**
 * Replace the graveyard folder in the `other` array with an updated version.
 */
const replaceGraveyardInOther = (
  other: readonly BookmarkNode[],
  graveyardFolder: BookmarkFolder,
): readonly BookmarkNode[] =>
  other.map((n) =>
    BookmarkFolder.is(n) && n.name === GRAVEYARD_FOLDER_NAME ? graveyardFolder : n,
  )

/**
 * Replace an event folder inside the graveyard folder.
 */
const replaceEventInGraveyard = (
  graveyardFolder: BookmarkFolder,
  eventFolder: BookmarkFolder,
): BookmarkFolder =>
  new BookmarkFolder({
    name: graveyardFolder.name,
    children: graveyardFolder.children.map((n) =>
      BookmarkFolder.is(n) && n.name === eventFolder.name ? eventFolder : n,
    ),
  })

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Create a graveyard entry from a conflict-losing patch. */
export const addToGraveyard = (
  tree: BookmarkTree,
  patch: Patch.BookmarkPatch,
  source: string,
  reason: string,
): Effect.Effect<BookmarkTree, Error> =>
  Effect.gen(function* () {
    const now = yield* DateTime.now
    const info = patchToBookmarkInfo(patch)
    const eventFolderName = makeEventFolderName(now, source, reason)

    // Create the leaf bookmark to store in graveyard
    const graveyardLeaf = new BookmarkLeaf({ name: info.name, url: info.url })

    // Build the nested path structure
    const entry = buildPathFolders(info.pathSegments, graveyardLeaf)

    // Ensure `other` section exists
    const otherSection = tree.other ?? []

    // Ensure _graveyard folder exists
    const { other: otherWithGraveyard, graveyardFolder } = ensureGraveyardFolder(otherSection)

    // Ensure event folder exists
    const { graveyardFolder: graveyardWithEvent, eventFolder } = ensureEventFolder(
      graveyardFolder,
      eventFolderName,
    )

    // Add the entry to the event folder
    const updatedEventFolder = new BookmarkFolder({
      name: eventFolder.name,
      children: [...eventFolder.children, entry],
    })

    // Reassemble: event -> graveyard -> other -> tree
    const updatedGraveyard = replaceEventInGraveyard(graveyardWithEvent, updatedEventFolder)
    const updatedOther = replaceGraveyardInOther(otherWithGraveyard, updatedGraveyard)

    return new BookmarkTree({
      ...tree,
      other: updatedOther,
    })
  })

/** Batch version: add multiple patches to graveyard. */
export const addGraveyardEntries = (
  tree: BookmarkTree,
  patches: readonly Patch.BookmarkPatch[],
  source: string,
  reason: string,
): Effect.Effect<BookmarkTree, Error> =>
  Effect.gen(function* () {
    let current = tree
    for (const patch of patches) {
      current = yield* addToGraveyard(current, patch, source, reason)
    }
    return current
  })

/** Remove graveyard entries older than maxAge. */
export const gc = (
  tree: BookmarkTree,
  maxAge: Duration.Duration,
): Effect.Effect<BookmarkTree, Error> =>
  Effect.gen(function* () {
    const otherSection = tree.other
    if (!otherSection) return tree

    const graveyardFolder = otherSection.find(
      (n): n is BookmarkFolder => BookmarkFolder.is(n) && n.name === GRAVEYARD_FOLDER_NAME,
    )
    if (!graveyardFolder) return tree

    const now = yield* DateTime.now
    const maxAgeMillis = Duration.toMillis(maxAge)

    // Filter event folders: keep those whose date is within maxAge
    const keptChildren = graveyardFolder.children.filter((child) => {
      if (!BookmarkFolder.is(child)) return true // keep non-folder nodes (shouldn't exist, but safe)
      const parsed = parseEventFolderName(child.name)
      if (Option.isNone(parsed)) return true // keep unparseable folders
      const ageMillis = DateTime.distance(parsed.value.date, now)
      return ageMillis < maxAgeMillis
    })

    // If all children were kept, no change needed
    if (keptChildren.length === graveyardFolder.children.length) return tree

    // If no children remain, remove the graveyard folder entirely
    if (keptChildren.length === 0) {
      const updatedOther = otherSection.filter(
        (n) => !(BookmarkFolder.is(n) && n.name === GRAVEYARD_FOLDER_NAME),
      )
      return new BookmarkTree({
        ...tree,
        other: updatedOther,
      })
    }

    // Otherwise, update the graveyard folder with remaining children
    const updatedGraveyard = new BookmarkFolder({
      name: GRAVEYARD_FOLDER_NAME,
      children: keptChildren,
    })
    const updatedOther = replaceGraveyardInOther(otherSection, updatedGraveyard)
    return new BookmarkTree({
      ...tree,
      other: updatedOther,
    })
  })
