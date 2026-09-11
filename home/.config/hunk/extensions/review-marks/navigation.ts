import type { ExtensionDiffFile, ExtensionDiffHunk } from "hunkdiff/extension"

/**
 * Next and previous unreviewed hunk, in review-stream order across files,
 * wrapping at the ends.
 *
 * Ported from `src/nav.ts` of evantravers/hunk-mark-as-reviewed (MIT, 8ca0c46).
 */

export interface HunkTarget {
  fileId: string
  hunkIndex: number
}

/**
 * Find the nearest unreviewed hunk after (`direction` 1) or before (-1) the
 * current one, or null when there are no hunks or all are reviewed. Without a
 * current hunk the search starts just outside the list.
 */
export function findUnreviewedHunk(
  files: readonly ExtensionDiffFile[],
  current: { fileId: string | null; hunkIndex: number | null },
  direction: 1 | -1,
  isReviewed: (path: string, hunk: ExtensionDiffHunk) => boolean,
): HunkTarget | null {
  const hunks = files.flatMap((file) =>
    (file.hunks ?? []).map((hunk) => ({
      fileId: file.id,
      hunkIndex: hunk.index,
      reviewed: isReviewed(file.path, hunk),
    })),
  )
  if (!hunks.some((entry) => !entry.reviewed)) return null

  const found = hunks.findIndex(
    (entry) => entry.fileId === current.fileId && entry.hunkIndex === current.hunkIndex,
  )
  const start = found >= 0 ? found : direction === 1 ? -1 : hunks.length
  for (let step = 1; step <= hunks.length; step += 1) {
    const entry =
      hunks[(((start + step * direction) % hunks.length) + hunks.length) % hunks.length]!
    if (!entry.reviewed) return { fileId: entry.fileId, hunkIndex: entry.hunkIndex }
  }
  return null
}
