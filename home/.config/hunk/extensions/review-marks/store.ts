import type { ExtensionDiffFile, ExtensionDiffHunk } from "hunkdiff/extension"

/**
 * Review marks for the session.
 *
 * Ported from `src/store.ts` of evantravers/hunk-mark-as-reviewed (MIT, 8ca0c46).
 * Marks live at module scope, so soft reloads keep them and quitting Hunk
 * discards them. They are keyed by identity rather than by file id or hunk
 * index, which both renumber on reload: a hunk mark is path + `@@` header +
 * old/new spans, and a hunk-less file (binary, skipped) gets a path-only mark.
 */

const FILE_PREFIX = "file"
const HUNK_PREFIX = "hunk"

let reviewed: ReadonlySet<string> = new Set()
let hidingReviewedFiles = false

/**
 * The files and per-path hunks of the most recent `changeset_loaded`.
 * Changeset transforms receive files without `hunks`, so a transform's
 * full-review check answers from this record, and navigation walks these files.
 */
let latestFiles: readonly ExtensionDiffFile[] = []
let knownHunks: ReadonlyMap<string, readonly ExtensionDiffHunk[]> = new Map()

function hunkKey(path: string, hunk: ExtensionDiffHunk) {
  const oldSpan = hunk.oldRange ? `${hunk.oldRange[0]}-${hunk.oldRange[1]}` : "?"
  const newSpan = hunk.newRange ? `${hunk.newRange[0]}-${hunk.newRange[1]}` : "?"
  return [HUNK_PREFIX, path, hunk.header, oldSpan, newSpan].join("\0")
}

function fileKey(path: string) {
  return [FILE_PREFIX, path].join("\0")
}

/** Whether a mark is a path-only file mark. */
function isFileKey(key: string) {
  return key.startsWith(`${FILE_PREFIX}\0`)
}

/** The path a mark belongs to. */
function keyPath(key: string) {
  const rest = key.slice(key.indexOf("\0") + 1)
  return isFileKey(key) ? rest : rest.slice(0, rest.indexOf("\0"))
}

export function isHunkReviewed(path: string, hunk: ExtensionDiffHunk) {
  return reviewed.has(hunkKey(path, hunk))
}

/** A file's hunks, from the file itself or else from the last `changeset_loaded`. */
export function hunksFor(file: ExtensionDiffFile): readonly ExtensionDiffHunk[] {
  return file.hunks ?? knownHunks.get(file.path) ?? []
}

export interface Progress {
  reviewed: number
  total: number
}

/** Progress through one file; a hunk-less file is one unit that its file mark completes. */
export function fileProgress(file: ExtensionDiffFile): Progress {
  const hunks = hunksFor(file)
  if (hunks.length === 0) {
    return { reviewed: reviewed.has(fileKey(file.path)) ? 1 : 0, total: 1 }
  }
  return {
    reviewed: hunks.filter((hunk) => reviewed.has(hunkKey(file.path, hunk))).length,
    total: hunks.length,
  }
}

/** Full-review check where only a path is known, as in a changeset transform. */
export function isPathFullyReviewed(path: string) {
  const hunks = knownHunks.get(path)
  if (!hunks || hunks.length === 0) return reviewed.has(fileKey(path))
  return hunks.every((hunk) => reviewed.has(hunkKey(path, hunk)))
}

/** Toggle one hunk's mark, returning whether it is now reviewed. */
export function toggleHunk(path: string, hunk: ExtensionDiffHunk) {
  const key = hunkKey(path, hunk)
  const next = new Set(reviewed)
  const nowReviewed = !next.has(key)
  if (nowReviewed) next.add(key)
  else next.delete(key)
  reviewed = next
  return nowReviewed
}

/**
 * Toggle a whole file: unmark everything when it is fully reviewed, otherwise
 * mark everything. Returns whether the file is now reviewed.
 */
export function toggleFile(file: ExtensionDiffFile) {
  const progress = fileProgress(file)
  const markAll = progress.reviewed < progress.total
  const hunks = hunksFor(file)
  const keys =
    hunks.length === 0 ? [fileKey(file.path)] : hunks.map((hunk) => hunkKey(file.path, hunk))
  const next = new Set(reviewed)
  for (const key of keys) {
    if (markAll) next.add(key)
    else next.delete(key)
  }
  reviewed = next
  return markAll
}

/** Clear every mark. */
export function resetReviewed() {
  reviewed = new Set()
}

export function isHidingReviewedFiles() {
  return hidingReviewedFiles
}

export function setHidingReviewedFiles(hide: boolean) {
  hidingReviewedFiles = hide
}

/** Record a freshly loaded changeset's files. */
export function noteFiles(files: readonly ExtensionDiffFile[]) {
  latestFiles = files
  knownHunks = new Map(files.map((file) => [file.path, file.hunks ?? []]))
}

export function getLatestFiles() {
  return latestFiles
}

/**
 * Drop marks that no longer match the loaded changeset, returning how many.
 * A mark on a loaded path must match one of its hunks, or be its file mark.
 * A mark on an absent path survives only while reviewed files are hidden,
 * since the hide transform may be what removed that file.
 */
export function reconcile(files: readonly ExtensionDiffFile[]) {
  const liveKeysByPath = new Map<string, ReadonlySet<string>>()
  for (const file of files) {
    liveKeysByPath.set(
      file.path,
      new Set((file.hunks ?? []).map((hunk) => hunkKey(file.path, hunk))),
    )
  }

  const next = new Set<string>()
  for (const key of reviewed) {
    const live = liveKeysByPath.get(keyPath(key))
    if (live ? isFileKey(key) || live.has(key) : hidingReviewedFiles) next.add(key)
  }

  const dropped = reviewed.size - next.size
  if (dropped > 0) reviewed = next
  return dropped
}
