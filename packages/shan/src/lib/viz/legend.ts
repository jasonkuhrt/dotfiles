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

const formatDelta = (tokens: number): string => {
  if (tokens >= 1000) {
    return `+${(tokens / 1000).toFixed(1)}k`
  }
  return `+${tokens}`
}

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

export const renderLegend = (): string[] => {
  return [
    "",
    SEPARATOR,
    "  LEGEND",
    SEPARATOR,
    "    type   (empty) progress/system/snapshot   ◦ user   ● assistant",
    "   skill   ◆ initial load   ╰ progressive @ref   ◇ other",
    "    tool   ▢ Bash   ▤ Read   ▣ WebFetch   ▥ Grep   ▦ Edit   ▧ Glob",
    "   cache   ● hit   ○ miss",
    "   model   ◈ opus   ◇ sonnet   ◦ haiku",
    "   files   1-9 count   + 10+",
    "   trunc   † truncated",
    "   error   × failed",
    "   alert   ‼ 5k+ tokens",
    "     top   1-9 rank in top consumers",
  ]
}
