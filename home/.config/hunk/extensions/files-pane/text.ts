/**
 * Terminal-cell measuring, clamping, and padding.
 *
 * Mirrors `measureTextWidth`, `fitText`, and `padText` from Hunk's
 * `packages/hunk/src/ui/lib/text.ts` (0.22.0). Two stock steps are absent: the
 * control-sequence sanitizing, because every label here comes from an escaped
 * review path, and the width tables, because `Bun.stringWidth` is what OpenTUI
 * itself measures with under Bun.
 */

declare const Bun: { stringWidth(text: string): number }

const printableAscii = /^[ -~]*$/
const graphemes = new Intl.Segmenter(undefined, { granularity: "grapheme" })

/** Measure text in terminal cells, treating CJK and emoji clusters as wide. */
export function measureTextWidth(text: string) {
  return printableAscii.test(text) ? text.length : Bun.stringWidth(text)
}

/** Take the leading grapheme clusters that fit within `width` cells. */
function sliceToWidth(text: string, width: number) {
  const limit = Math.max(0, width)
  if (printableAscii.test(text)) {
    const sliced = text.slice(0, limit)
    return { text: sliced, width: sliced.length }
  }

  let sliced = ""
  let used = 0
  for (const { segment } of graphemes.segment(text)) {
    const clusterWidth = Bun.stringWidth(segment)
    if (used + clusterWidth > limit) {
      break
    }
    sliced += segment
    used += clusterWidth
  }
  return { text: sliced, width: used }
}

/** Clamp text to a fixed width using a cell-aware overflow marker. */
export function fitText(text: string, width: number, overflowMarker = ".") {
  if (width <= 0) {
    return ""
  }
  if (measureTextWidth(text) <= width) {
    return text
  }

  const marker = sliceToWidth(overflowMarker, width)
  return `${sliceToWidth(text, width - marker.width).text}${marker.text}`
}

/** Clamp and then right-pad text to an exact width. */
export function padText(text: string, width: number) {
  const fitted = fitText(text, width)
  return `${fitted}${" ".repeat(Math.max(0, width - measureTextWidth(fitted)))}`
}
