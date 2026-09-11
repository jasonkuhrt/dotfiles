import type {
  ExtensionDiffFile,
  ExtensionDiffHunk,
  ExtensionLineHighlight,
  ExtensionLineHighlightTone,
} from "hunkdiff/extension"

/**
 * Line marks that paint reviewed hunks.
 *
 * Ported from `src/highlights.ts` of evantravers/hunk-mark-as-reviewed (MIT, 8ca0c46).
 */

const TONES: readonly ExtensionLineHighlightTone[] = [
  "dim",
  "match",
  "current",
  "info",
  "warning",
  "error",
]

/** The configured tone when Hunk knows it, else "dim": text receding toward its background reads as done. */
export function resolveReviewedTone(configured: unknown): ExtensionLineHighlightTone {
  return TONES.find((tone) => tone === configured) ?? "dim"
}

/**
 * Each side's line text lengths from a unified diff, by 1-based source line
 * number. Mark ranges must stay inside the raw line text, so painting a whole
 * line needs its real length.
 */
function patchLineLengths(patch: string) {
  const lengths = { old: new Map<number, number>(), new: new Map<number, number>() }
  let oldLine = 0
  let newLine = 0
  let inHunk = false
  for (const raw of patch.split("\n")) {
    if (raw.startsWith("@@")) {
      const match = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(raw)
      inHunk = match !== null
      if (match) {
        oldLine = Number.parseInt(match[1]!, 10)
        newLine = Number.parseInt(match[2]!, 10)
      }
      continue
    }
    if (!inHunk) continue

    const length = raw.length - 1
    switch (raw[0]) {
      case " ":
        lengths.old.set(oldLine++, length)
        lengths.new.set(newLine++, length)
        break
      case "-":
        lengths.old.set(oldLine++, length)
        break
      case "+":
        lengths.new.set(newLine++, length)
        break
      case "\\":
        break // "\ No newline at end of file" describes the previous line.
      default:
        inHunk = false // Anything else ends the hunk body.
    }
  }
  return lengths
}

/**
 * Full-line marks for every line of the given hunks, on both sides. Context
 * lines answer to either side's number, added lines exist only on the new side
 * and removed lines only on the old, so marking each side's span paints exactly
 * the hunks' rows. Empty lines have no cells to paint and are skipped.
 */
export function reviewedHunkMarks(
  file: ExtensionDiffFile,
  hunks: readonly ExtensionDiffHunk[],
  tone: ExtensionLineHighlightTone,
): ExtensionLineHighlight[] | null {
  if (hunks.length === 0) return null

  const lengths = patchLineLengths(file.patch)
  const marks: ExtensionLineHighlight[] = []
  for (const hunk of hunks) {
    for (const side of ["old", "new"] as const) {
      const span = side === "old" ? hunk.oldRange : hunk.newRange
      if (!span) continue
      for (let line = span[0]; line <= span[1]; line += 1) {
        const length = lengths[side].get(line)
        if (length) marks.push({ side, line, range: [0, length], tone })
      }
    }
  }
  return marks.length > 0 ? marks : null
}
