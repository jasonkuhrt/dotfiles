/**
 * Chart renderer - Creates filled area charts with sub-row precision.
 *
 * Uses Unicode block elements (▁▂▃▄▅▆▇█) for sub-row precision within each row.
 * Charts are "filled" - all rows below current value are filled with full blocks.
 */

import type { AnalyzedEntry } from "../transcript-analyzer.js"

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const BLOCKS = [" ", "▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"]
const TIME_FILL = "▓"
const TOKEN_FILL = "█"

// Row count bounds
const MIN_ROWS = 10
const MAX_ROWS = 30

// -----------------------------------------------------------------------------
// Dynamic row calculation
// -----------------------------------------------------------------------------

/**
 * Interpolate between min and max rows based on value position in a range.
 * Uses logarithmic scaling for smoother transitions across magnitudes.
 */
const interpolateRows = (value: number, lowThreshold: number, highThreshold: number): number => {
  if (value <= lowThreshold) return MIN_ROWS
  if (value >= highThreshold) return MAX_ROWS

  // Log scale for smoother interpolation across magnitudes
  const logLow = Math.log10(lowThreshold)
  const logHigh = Math.log10(highThreshold)
  const logValue = Math.log10(value)

  const t = (logValue - logLow) / (logHigh - logLow)
  return Math.round(MIN_ROWS + t * (MAX_ROWS - MIN_ROWS))
}

/**
 * Calculate rows for time chart based on session duration.
 * - < 1 minute: 10 rows
 * - 1 hour+: 30 rows
 * - Logarithmic interpolation between
 */
const calculateTimeRows = (maxMs: number): number => {
  const ONE_MINUTE = 60_000
  const ONE_HOUR = 3_600_000
  return interpolateRows(maxMs, ONE_MINUTE, ONE_HOUR)
}

/**
 * Calculate rows for token chart based on total tokens.
 * - < 10k tokens: 10 rows
 * - 500k+ tokens: 30 rows
 * - Logarithmic interpolation between
 */
const calculateTokenRows = (maxTokens: number): number => {
  const LOW_TOKENS = 10_000
  const HIGH_TOKENS = 500_000
  return interpolateRows(maxTokens, LOW_TOKENS, HIGH_TOKENS)
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const getBlockChar = (value: number, rowMin: number, rowMax: number): string => {
  if (value <= rowMin) return " "
  if (value >= rowMax) return BLOCKS[8]!
  const normalized = (value - rowMin) / (rowMax - rowMin)
  // Ensure any value in this row shows at least ▁ (index 1), not space
  const index = Math.max(1, Math.round(normalized * 8))
  return BLOCKS[Math.min(index, 8)]!
}

const formatDuration = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  if (totalMinutes >= 60) {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours}h ${minutes}m`
  }

  return `${totalMinutes}m ${seconds}s`
}

const niceScale = (max: number, targetRows: number): number[] => {
  // Handle edge case where max is very small
  if (max < 1) {
    return Array.from({ length: targetRows }, (_, i) => i + 1)
  }

  // Find a nice step size that produces at least targetRows
  const rawStep = max / targetRows
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)))

  // Try progressively smaller nice steps until we get enough rows
  const niceMultipliers = [1, 2, 5, 10]

  for (const mult of niceMultipliers) {
    const niceStep = Math.max(1, Math.floor(mult * magnitude))
    const potentialRows = Math.ceil(max / niceStep) + 1

    if (potentialRows >= targetRows) {
      // This step size gives us enough rows
      const steps: number[] = []
      for (let i = niceStep; steps.length < targetRows; i += niceStep) {
        steps.push(i)
      }
      return steps
    }
  }

  // Fallback: use raw step to guarantee targetRows
  const step = Math.max(1, Math.ceil(max / targetRows))
  return Array.from({ length: targetRows }, (_, i) => (i + 1) * step)
}

// -----------------------------------------------------------------------------
// Chart rendering
// -----------------------------------------------------------------------------

export interface ChartOptions {
  entries: AnalyzedEntry[]
  getValue: (entry: AnalyzedEntry) => number
  fillChar: string
  formatHeader: (value: number) => string
  formatYLabel: (value: number) => string
  labelWidth: number
  rows: number
}

export const renderChart = (options: ChartOptions): string[] => {
  const { entries, getValue, fillChar, formatHeader, formatYLabel, labelWidth, rows } = options

  const values = entries.map(getValue)
  const maxValue = Math.max(...values, 1)
  const scale = niceScale(maxValue, rows)
  const numRows = scale.length

  // Header line with final value (account for gutter space)
  const finalValue = values[values.length - 1] ?? 0
  const header = formatHeader(finalValue).padStart(labelWidth + entries.length)
  const lines: string[] = [header]

  // Render rows from top to bottom
  for (let row = numRows - 1; row >= 0; row--) {
    const rowMax = scale[row]!
    const rowMin = row === 0 ? 0 : scale[row - 1]!
    // Use labelWidth-1 for text, leaving 1 char for gutter space
    const label = formatYLabel(rowMax).padStart(labelWidth - 1) + " "

    let rowChars = ""
    for (const value of values) {
      if (value >= rowMax) {
        // Value is above this row - full fill
        rowChars += fillChar
      } else if (value > rowMin) {
        // Value is within this row - partial fill
        rowChars += getBlockChar(value, rowMin, rowMax)
      } else {
        // Value is below this row - empty
        rowChars += " "
      }
    }

    lines.push(label + rowChars)
  }

  return lines
}

// -----------------------------------------------------------------------------
// Y-axis label formatters (exported for width calculation)
// -----------------------------------------------------------------------------

export const formatTimeLabel = (ms: number): string => {
  if (ms >= 60000) {
    const minutes = Math.floor(ms / 60000)
    return `${minutes}m`
  }
  const seconds = Math.floor(ms / 1000)
  return `${seconds}s`
}

export const formatTokenLabel = (tokens: number): string => {
  if (tokens >= 1000) {
    return `${Math.floor(tokens / 1000)}k`
  }
  return String(Math.floor(tokens))
}

// -----------------------------------------------------------------------------
// Label width calculators
// -----------------------------------------------------------------------------

/**
 * Calculate the max label width needed for time chart Y-axis.
 */
export const getTimeChartLabelWidth = (entries: AnalyzedEntry[]): number => {
  const maxMs = Math.max(...entries.map((e) => e.elapsedMs), 1)
  const rows = calculateTimeRows(maxMs)
  const scale = niceScale(maxMs, rows)

  let maxWidth = 0
  for (const value of scale) {
    const label = formatTimeLabel(value)
    maxWidth = Math.max(maxWidth, label.length)
  }
  return maxWidth
}

/**
 * Calculate the max label width needed for token chart Y-axis.
 */
export const getTokenChartLabelWidth = (entries: AnalyzedEntry[]): number => {
  const maxTokens = Math.max(...entries.map((e) => e.cumulativeTokens), 1)
  const rows = calculateTokenRows(maxTokens)
  const scale = niceScale(maxTokens, rows)

  let maxWidth = 0
  for (const value of scale) {
    const label = formatTokenLabel(value)
    maxWidth = Math.max(maxWidth, label.length)
  }
  return maxWidth
}

// -----------------------------------------------------------------------------
// Chart renderers
// -----------------------------------------------------------------------------

export const renderTimeChart = (entries: AnalyzedEntry[], labelWidth: number = 8): string[] => {
  const maxMs = Math.max(...entries.map((e) => e.elapsedMs), 1)
  const rows = calculateTimeRows(maxMs)

  return renderChart({
    entries,
    getValue: (e) => e.elapsedMs,
    fillChar: TIME_FILL,
    formatHeader: formatDuration,
    formatYLabel: formatTimeLabel,
    labelWidth,
    rows,
  })
}

export const renderTokenChart = (entries: AnalyzedEntry[], labelWidth: number = 8): string[] => {
  const maxTokens = Math.max(...entries.map((e) => e.cumulativeTokens), 1)
  const rows = calculateTokenRows(maxTokens)

  return renderChart({
    entries,
    getValue: (e) => e.cumulativeTokens,
    fillChar: TOKEN_FILL,
    formatHeader: (tokens) => tokens.toLocaleString() + " Tokens",
    formatYLabel: formatTokenLabel,
    labelWidth,
    rows,
  })
}
