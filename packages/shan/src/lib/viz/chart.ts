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

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const getBlockChar = (value: number, rowMin: number, rowMax: number): string => {
  if (value <= rowMin) return " "
  if (value >= rowMax) return BLOCKS[8]!
  const normalized = (value - rowMin) / (rowMax - rowMin)
  const index = Math.round(normalized * 8)
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

const formatTokens = (tokens: number): string => {
  return tokens.toLocaleString() + " Tokens"
}

const niceScale = (max: number, targetRows: number): number[] => {
  // Find a nice step size
  const rawStep = max / targetRows
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)))
  const normalized = rawStep / magnitude

  let niceStep: number
  if (normalized <= 1) niceStep = magnitude
  else if (normalized <= 2) niceStep = 2 * magnitude
  else if (normalized <= 5) niceStep = 5 * magnitude
  else niceStep = 10 * magnitude

  const steps: number[] = []
  for (let i = niceStep; i <= max + niceStep; i += niceStep) {
    steps.push(i)
    if (steps.length >= targetRows) break
  }
  return steps
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

  // Header line with final value
  const finalValue = values[values.length - 1] ?? 0
  const header = formatHeader(finalValue).padStart(labelWidth + entries.length)
  const lines: string[] = [header]

  // Render rows from top to bottom
  for (let row = numRows - 1; row >= 0; row--) {
    const rowMax = scale[row]!
    const rowMin = row === 0 ? 0 : scale[row - 1]!
    const label = formatYLabel(rowMax).padStart(labelWidth)

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

export const renderTimeChart = (entries: AnalyzedEntry[], labelWidth: number = 8): string[] => {
  return renderChart({
    entries,
    getValue: (e) => e.elapsedMs,
    fillChar: TIME_FILL,
    formatHeader: formatDuration,
    formatYLabel: (ms) => {
      const minutes = Math.floor(ms / 60000)
      return `${minutes}m`
    },
    labelWidth,
    rows: 4,
  })
}

export const renderTokenChart = (entries: AnalyzedEntry[], labelWidth: number = 8): string[] => {
  return renderChart({
    entries,
    getValue: (e) => e.cumulativeTokens,
    fillChar: TOKEN_FILL,
    formatHeader: formatTokens,
    formatYLabel: (tokens) => {
      if (tokens >= 1000) {
        return `${Math.floor(tokens / 1000)}k`
      }
      return String(tokens)
    },
    labelWidth,
    rows: 8,
  })
}
