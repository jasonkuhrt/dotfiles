/**
 * Dimension track renderer - Creates rows of symbols below the charts.
 *
 * Each dimension is a row with one character per transcript entry,
 * showing metadata like type, tools, cache status, etc.
 */

import type { AnalyzedEntry } from "../transcript-analyzer.js"

// -----------------------------------------------------------------------------
// Symbol definitions
// -----------------------------------------------------------------------------

const SYMBOLS = {
  type: {
    user: "◦",
    assistant: "●",
    other: "·", // progress, system, etc.
  },
  skill: {
    initial: "◆",
    progressive: "╰",
    other: "◇",
    none: " ",
  },
  tool: {
    Bash: "▢",
    Read: "▤",
    WebFetch: "▣",
    Grep: "▥",
    Edit: "▦",
    Glob: "▧",
    Task: "▨",
    Write: "▩",
    none: " ",
  },
  cache: {
    hit: "●",
    miss: "○",
    none: " ",
  },
  model: {
    opus: "◈",
    sonnet: "◇",
    haiku: "◦",
    none: " ",
  },
  trunc: {
    yes: "†",
    no: " ",
  },
  error: {
    yes: "×",
    no: " ",
  },
  alert: {
    yes: "‼",
    no: " ",
  },
} as const

// -----------------------------------------------------------------------------
// Dimension mappers
// -----------------------------------------------------------------------------

type DimensionMapper = (entry: AnalyzedEntry) => string

const mapType: DimensionMapper = (entry) => {
  if (entry.type === "user") return SYMBOLS.type.user
  if (entry.type === "assistant") return SYMBOLS.type.assistant
  return SYMBOLS.type.other
}

const mapSkill: DimensionMapper = (entry) => {
  if (!entry.skill) return SYMBOLS.skill.none
  if (entry.skill.isInitial) return SYMBOLS.skill.initial
  if (entry.skill.isProgressive) return SYMBOLS.skill.progressive
  return SYMBOLS.skill.other
}

const mapTool: DimensionMapper = (entry) => {
  if (entry.tools.length === 0) return SYMBOLS.tool.none
  // Show the first tool (most significant)
  const tool = entry.tools[0]!
  return (SYMBOLS.tool as Record<string, string>)[tool] ?? SYMBOLS.tool.none
}

const mapCache: DimensionMapper = (entry) => {
  if (entry.cacheHit === null) return SYMBOLS.cache.none
  return entry.cacheHit ? SYMBOLS.cache.hit : SYMBOLS.cache.miss
}

const mapModel: DimensionMapper = (entry) => {
  if (!entry.model) return SYMBOLS.model.none
  return SYMBOLS.model[entry.model]
}

const mapFiles: DimensionMapper = (entry) => {
  if (entry.filesRead === 0) return " "
  if (entry.filesRead >= 10) return "+"
  return String(entry.filesRead)
}

const mapTrunc: DimensionMapper = (entry) => {
  return entry.truncated ? SYMBOLS.trunc.yes : SYMBOLS.trunc.no
}

const mapError: DimensionMapper = (entry) => {
  return entry.error ? SYMBOLS.error.yes : SYMBOLS.error.no
}

const mapAlert: DimensionMapper = (entry) => {
  return entry.alert ? SYMBOLS.alert.yes : SYMBOLS.alert.no
}

const mapTop: DimensionMapper = (entry) => {
  if (entry.topRank === null) return " "
  return String(entry.topRank)
}

// -----------------------------------------------------------------------------
// Dimension definitions
// -----------------------------------------------------------------------------

interface Dimension {
  name: string
  mapper: DimensionMapper
}

const DIMENSIONS: Dimension[] = [
  { name: "type", mapper: mapType },
  { name: "skill", mapper: mapSkill },
  { name: "tool", mapper: mapTool },
  { name: "cache", mapper: mapCache },
  { name: "model", mapper: mapModel },
  { name: "files", mapper: mapFiles },
  { name: "trunc", mapper: mapTrunc },
  { name: "error", mapper: mapError },
  { name: "alert", mapper: mapAlert },
  { name: "top", mapper: mapTop },
]

// -----------------------------------------------------------------------------
// Label width calculator
// -----------------------------------------------------------------------------

/**
 * Calculate the max label width needed for dimension track labels.
 */
export const getDimensionLabelWidth = (): number => {
  let maxWidth = 0
  for (const dim of DIMENSIONS) {
    maxWidth = Math.max(maxWidth, dim.name.length)
  }
  return maxWidth
}

// -----------------------------------------------------------------------------
// Rendering
// -----------------------------------------------------------------------------

export const renderDimensions = (entries: AnalyzedEntry[], labelWidth: number = 8): string[] => {
  const lines: string[] = []

  for (const dim of DIMENSIONS) {
    // Use labelWidth-1 for text, leaving 1 char for gutter space
    const label = dim.name.padStart(labelWidth - 1) + " "
    let chars = ""
    for (const entry of entries) {
      chars += dim.mapper(entry)
    }
    lines.push(label + chars)
  }

  return lines
}
