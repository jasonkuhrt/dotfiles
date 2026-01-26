/**
 * Legend renderer - Creates TOP CONSUMERS, SUMMARY, and LEGEND sections.
 */

import type { AnalyzedTranscript, TopConsumer } from "../transcript-analyzer.js"

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const SEPARATOR = "━".repeat(80)

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------


const formatTools = (tools: string[]): string => {
  if (tools.length === 0) return ""

  const counts = new Map<string, number>()
  for (const tool of tools) {
    counts.set(tool, (counts.get(tool) ?? 0) + 1)
  }

  const parts: string[] = []
  for (const [name, count] of counts) {
    parts.push(count > 1 ? `${name} ×${count}` : name)
  }

  return parts.join(", ").slice(0, 18).padEnd(18)
}

// -----------------------------------------------------------------------------
// TOP CONSUMERS
// -----------------------------------------------------------------------------

const formatDelta = (tokens: number): string => {
  if (tokens >= 1000) {
    return `+${(tokens / 1000).toFixed(1)}k`
  }
  return `+${tokens}`
}

const renderTopConsumer = (tc: TopConsumer): string => {
  const rank = String(tc.rank).padStart(4)
  const index = `#${tc.index}`.padStart(5)
  const delta = formatDelta(tc.deltaTokens).padStart(7)
  const tools = formatTools(tc.tools)
  const skill = (tc.skill ?? "").slice(0, 18).padEnd(18)
  const model = (tc.model ?? "").padEnd(6)
  const cache = tc.cacheHit ? "● hit" : "○ miss"

  return `${rank}  ${index}  ${delta}  ${tools}  ${skill}  ${model}  ${cache}`
}

export const renderTopConsumers = (topConsumers: TopConsumer[]): string[] => {
  if (topConsumers.length === 0) {
    return []
  }

  const lines: string[] = [
    SEPARATOR,
    " TOP CONSUMERS (Δ > 5k tokens)",
    SEPARATOR,
  ]

  for (const tc of topConsumers) {
    lines.push(renderTopConsumer(tc))
  }

  return lines
}

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------

export const renderSummary = (summary: AnalyzedTranscript["summary"]): string[] => {
  const lines: string[] = [
    "",
    SEPARATOR,
    " SUMMARY",
    SEPARATOR,
  ]

  const entries = `${summary.totalEntries} (${summary.requestCount} requests, ${summary.userCount} user, ${summary.progressCount} progress)`
  const cacheRate = `${Math.round(summary.cacheHitRate * 100)}%`

  lines.push(` Entries  ${entries}`)
  lines.push(`   Cache  hit rate  ${cacheRate}`)
  lines.push(`  Errors  ${summary.errorCount}`)
  lines.push(`   Trunc  ${summary.truncatedCount}`)
  lines.push(`  Alerts  ${summary.alertCount}`)

  return lines
}

// -----------------------------------------------------------------------------
// LEGEND
// -----------------------------------------------------------------------------

interface LegendSymbol {
  symbol: string
  label: string
}

interface LegendEntry {
  name: string
  description: string
  symbols: LegendSymbol[]
}

const LEGEND_ENTRIES: LegendEntry[] = [
  {
    name: "type",
    description: "Message origin in the conversation flow.",
    symbols: [
      { symbol: "·", label: "progress/system" },
      { symbol: "◦", label: "user" },
      { symbol: "●", label: "assistant" },
    ],
  },
  {
    name: "skill",
    description: "Whether a skill was activated during this turn.",
    symbols: [
      { symbol: "◆", label: "initial activation" },
      { symbol: "╰", label: "progressive" },
      { symbol: "◇", label: "other" },
    ],
  },
  {
    name: "tool",
    description: "Which tools Claude invoked.",
    symbols: [
      { symbol: "▢", label: "Bash" },
      { symbol: "▤", label: "Read" },
      { symbol: "▣", label: "WebFetch" },
      { symbol: "▥", label: "Grep" },
      { symbol: "▦", label: "Edit" },
      { symbol: "▧", label: "Glob" },
      { symbol: "▨", label: "Task" },
      { symbol: "▩", label: "Write" },
    ],
  },
  {
    name: "cache",
    description: "Whether Claude reused a cached response.",
    symbols: [
      { symbol: "●", label: "hit" },
      { symbol: "○", label: "miss" },
    ],
  },
  {
    name: "model",
    description: "Which Claude model generated the response.",
    symbols: [
      { symbol: "◈", label: "opus" },
      { symbol: "◇", label: "sonnet" },
      { symbol: "◦", label: "haiku" },
    ],
  },
  {
    name: "files",
    description: "Count of files touched this turn.",
    symbols: [
      { symbol: "1-9", label: "count" },
      { symbol: "+", label: "10+" },
    ],
  },
  {
    name: "trunc",
    description: "Response exceeded length limit and was cut short.",
    symbols: [{ symbol: "†", label: "truncated" }],
  },
  {
    name: "error",
    description: "A tool returned an error in its result.",
    symbols: [{ symbol: "×", label: "error" }],
  },
  {
    name: "tokens",
    description: "Token consumption flags and ranking.",
    symbols: [
      { symbol: "‼", label: "5k+ alert" },
      { symbol: "1-9", label: "top consumer rank" },
    ],
  },
]

// -----------------------------------------------------------------------------
// Text Wrapping
// -----------------------------------------------------------------------------

const wrapText = (text: string, maxWidth: number): string[] => {
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = ""

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    if (testLine.length <= maxWidth) {
      currentLine = testLine
    } else {
      if (currentLine) lines.push(currentLine)
      currentLine = word
    }
  }
  if (currentLine) lines.push(currentLine)

  return lines
}

// -----------------------------------------------------------------------------
// Entry Block Rendering
// -----------------------------------------------------------------------------

interface RenderedBlock {
  lines: string[]
  height: number
}

const renderEntryBlock = (entry: LegendEntry, columnWidth: number): RenderedBlock => {
  const lines: string[] = []
  const contentWidth = columnWidth - 2 // Account for indent

  // Category name (uppercase for visibility)
  lines.push(entry.name.toUpperCase())

  // Wrapped description
  const descLines = wrapText(entry.description, contentWidth)
  for (const line of descLines) {
    lines.push(line)
  }

  // Blank line before symbols
  lines.push("")

  // Symbols - one per line with indent
  for (const sym of entry.symbols) {
    lines.push(`  ${sym.symbol} ${sym.label}`)
  }

  return { lines, height: lines.length }
}

// -----------------------------------------------------------------------------
// Column Balancing Algorithm
// -----------------------------------------------------------------------------

interface Column {
  entries: LegendEntry[]
  totalHeight: number
}

const balanceColumns = (entries: LegendEntry[], numColumns: number, columnWidth: number): Column[] => {
  // Calculate heights for all entries
  const entryHeights = entries.map((entry) => ({
    entry,
    height: renderEntryBlock(entry, columnWidth).height + 1, // +1 for spacing between blocks
  }))

  // Initialize columns
  const columns: Column[] = Array.from({ length: numColumns }, () => ({
    entries: [],
    totalHeight: 0,
  }))

  // Greedy assignment: add each entry to the shortest column
  for (const { entry, height } of entryHeights) {
    // columns is guaranteed non-empty since numColumns >= 1
    const shortestColumn = columns.reduce((min, col) => (col.totalHeight < min.totalHeight ? col : min))!
    shortestColumn.entries.push(entry)
    shortestColumn.totalHeight += height
  }

  return columns
}

// -----------------------------------------------------------------------------
// Multi-Column Rendering
// -----------------------------------------------------------------------------

const renderColumnsToLines = (columns: Column[], columnWidth: number, gap: number): string[] => {
  // Render each column's blocks
  const renderedColumns: string[][] = columns.map((col) => {
    const lines: string[] = []
    for (const entry of col.entries) {
      const block = renderEntryBlock(entry, columnWidth)
      lines.push(...block.lines)
      lines.push("") // Spacing between blocks
    }
    return lines
  })

  // Find max height across all columns
  const maxHeight = Math.max(...renderedColumns.map((col) => col.length))

  // Pad columns to equal height
  for (const col of renderedColumns) {
    while (col.length < maxHeight) {
      col.push("")
    }
  }

  // Merge columns side by side
  const result: string[] = []
  for (let i = 0; i < maxHeight; i++) {
    const row = renderedColumns.map((col) => (col[i] ?? "").padEnd(columnWidth)).join(" ".repeat(gap))
    result.push(row)
  }

  return result
}

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

export const renderLegend = (): string[] => {
  const totalWidth = 80
  const numColumns = 3
  const gap = 2
  const columnWidth = Math.floor((totalWidth - gap * (numColumns - 1)) / numColumns)

  const columns = balanceColumns(LEGEND_ENTRIES, numColumns, columnWidth)
  const contentLines = renderColumnsToLines(columns, columnWidth, gap)

  return ["", SEPARATOR, "  LEGEND", SEPARATOR, ...contentLines]
}
