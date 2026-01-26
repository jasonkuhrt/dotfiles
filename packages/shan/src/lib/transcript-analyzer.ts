/**
 * Transcript analyzer - extracts metrics from Claude Code JSONL transcripts.
 *
 * Key insight: Multiple `assistant` entries can share the same `requestId`,
 * representing one API call that produces thinking + text + tool_use blocks.
 * We group by requestId to get actual request-level stats.
 */

import type {
  TranscriptEntry,
  AssistantEntry,
  UserEntry,
  ToolUseBlock,
  Usage,
} from "./transcript-schema.js"

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface AnalyzedEntry {
  index: number
  entry: TranscriptEntry
  timestamp: Date
  elapsedMs: number
  cumulativeTokens: number
  deltaTokens: number
  type: "user" | "assistant" | "progress" | "system" | "other"
  requestId: string | null
  // Dimensions
  tools: string[]
  skill: SkillInfo | null
  cacheHit: boolean | null
  model: "opus" | "sonnet" | "haiku" | null
  filesRead: number
  truncated: boolean
  error: boolean
  alert: boolean
  topRank: number | null
}

export interface SkillInfo {
  name: string
  isInitial: boolean
  isProgressive: boolean
}

export interface TopConsumer {
  rank: number
  index: number
  deltaTokens: number
  tools: string[]
  skill: string | null
  model: "opus" | "sonnet" | "haiku" | null
  cacheHit: boolean
}

export interface AnalyzedTranscript {
  entries: AnalyzedEntry[]
  topConsumers: TopConsumer[]
  summary: {
    totalEntries: number
    requestCount: number
    userCount: number
    progressCount: number
    finalTokens: number
    finalElapsedMs: number
    cacheHitRate: number
    errorCount: number
    truncatedCount: number
    alertCount: number
  }
}

// -----------------------------------------------------------------------------
// Parsing helpers
// -----------------------------------------------------------------------------

const parseTimestamp = (entry: TranscriptEntry): Date | null => {
  const ts = (entry as { timestamp?: string }).timestamp
  if (!ts) return null
  const date = new Date(ts)
  return isNaN(date.getTime()) ? null : date
}

const extractUsage = (entry: AssistantEntry): Usage | null => {
  return entry.message.usage ?? null
}

const extractModel = (entry: AssistantEntry): "opus" | "sonnet" | "haiku" | null => {
  const model = entry.message.model
  if (!model) return null
  if (model.includes("opus")) return "opus"
  if (model.includes("sonnet")) return "sonnet"
  if (model.includes("haiku")) return "haiku"
  return null
}

const extractTools = (entry: AssistantEntry): string[] => {
  const tools: string[] = []
  for (const block of entry.message.content) {
    if (block.type === "tool_use") {
      tools.push((block as ToolUseBlock).name)
    }
  }
  return tools
}

const countFilesRead = (tools: string[]): number => {
  return tools.filter((t) => t === "Read").length
}

const extractSkillFromUser = (entry: UserEntry, previousSkill: string | null): SkillInfo | null => {
  const content = entry.message.content
  if (typeof content !== "string") return null

  // Pattern: "Base directory for this skill:" in message content
  const match = content.match(/Base directory for this skill:\s*([^\n]+)/)
  if (!match) return null

  const path = match[1]!
  // Extract skill name from path (last component before SKILL.md or similar)
  const parts = path.split("/")
  const skillIndex = parts.findIndex((p) => p === "skills")
  if (skillIndex === -1 || skillIndex >= parts.length - 1) return null

  const skillName = parts[skillIndex + 1]!

  return {
    name: skillName,
    isInitial: previousSkill === null,
    isProgressive: previousSkill === skillName,
  }
}

const checkTruncated = (entry: UserEntry): boolean => {
  const content = entry.message.content
  if (typeof content === "string") return false

  for (const block of content) {
    if (block.type === "tool_result") {
      // Check for truncation indicators in the content
      const resultContent = (block as { content?: unknown }).content
      if (typeof resultContent === "string" && resultContent.includes("[truncated]")) {
        return true
      }
    }
  }
  return false
}

const checkError = (entry: UserEntry): boolean => {
  const content = entry.message.content
  if (typeof content === "string") return false

  for (const block of content) {
    if (block.type === "tool_result" && (block as { is_error?: boolean }).is_error) {
      return true
    }
  }
  return false
}

// -----------------------------------------------------------------------------
// Main analyzer
// -----------------------------------------------------------------------------

export const analyzeTranscript = (entries: TranscriptEntry[]): AnalyzedTranscript => {
  const analyzed: AnalyzedEntry[] = []
  let startTime: Date | null = null
  let cumulativeTokens = 0
  let currentSkill: string | null = null
  const requestTokens = new Map<string, number>()

  // First pass: analyze each entry
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]!
    const timestamp = parseTimestamp(entry)

    if (timestamp && !startTime) {
      startTime = timestamp
    }

    const elapsedMs = startTime && timestamp ? timestamp.getTime() - startTime.getTime() : 0

    let type: AnalyzedEntry["type"] = "other"
    let requestId: string | null = null
    let tools: string[] = []
    let skill: SkillInfo | null = null
    let cacheHit: boolean | null = null
    let model: "opus" | "sonnet" | "haiku" | null = null
    let filesRead = 0
    let truncated = false
    let error = false
    let deltaTokens = 0

    switch (entry.type) {
      case "user":
        type = "user"
        skill = extractSkillFromUser(entry, currentSkill)
        if (skill) {
          currentSkill = skill.name
        }
        truncated = checkTruncated(entry)
        error = checkError(entry)
        break

      case "assistant":
        type = "assistant"
        requestId = entry.requestId ?? null
        tools = extractTools(entry)
        model = extractModel(entry)
        filesRead = countFilesRead(tools)

        const usage = extractUsage(entry)
        if (usage) {
          // Total input = base input + cache creation + cache read
          const inputTokens =
            usage.input_tokens +
            (usage.cache_creation_input_tokens ?? 0) +
            (usage.cache_read_input_tokens ?? 0)
          const totalTokens = inputTokens + usage.output_tokens
          // Only count tokens once per requestId
          if (requestId && !requestTokens.has(requestId)) {
            requestTokens.set(requestId, totalTokens)
            deltaTokens = totalTokens
            cumulativeTokens += totalTokens
          }
          cacheHit = (usage.cache_read_input_tokens ?? 0) > 0
        }
        break

      case "progress":
        type = "progress"
        break

      case "system":
        type = "system"
        break

      default:
        type = "other"
    }

    analyzed.push({
      index: i,
      entry,
      timestamp: timestamp ?? new Date(0),
      elapsedMs,
      cumulativeTokens,
      deltaTokens,
      type,
      requestId,
      tools,
      skill,
      cacheHit,
      model,
      filesRead,
      truncated,
      error,
      alert: deltaTokens > 5000,
      topRank: null, // Filled in second pass
    })
  }

  // Second pass: identify top consumers and assign ranks
  const assistantEntries = analyzed.filter((e) => e.type === "assistant" && e.deltaTokens > 0)
  const sorted = [...assistantEntries].sort((a, b) => b.deltaTokens - a.deltaTokens)
  const top9 = sorted.slice(0, 9)

  const topConsumers: TopConsumer[] = top9.map((e, i) => ({
    rank: i + 1,
    index: e.index,
    deltaTokens: e.deltaTokens,
    tools: e.tools,
    skill: e.skill?.name ?? null,
    model: e.model,
    cacheHit: e.cacheHit ?? false,
  }))

  // Assign top ranks back to entries
  for (const tc of topConsumers) {
    const entry = analyzed[tc.index]
    if (entry) {
      entry.topRank = tc.rank
    }
  }

  // Calculate summary
  const requestCount = new Set(analyzed.filter((e) => e.requestId).map((e) => e.requestId)).size
  const userCount = analyzed.filter((e) => e.type === "user").length
  const progressCount = analyzed.filter((e) => e.type === "progress").length
  const cacheHits = analyzed.filter((e) => e.cacheHit === true).length
  const cacheMisses = analyzed.filter((e) => e.cacheHit === false).length
  const cacheHitRate = cacheHits + cacheMisses > 0 ? cacheHits / (cacheHits + cacheMisses) : 0
  const errorCount = analyzed.filter((e) => e.error).length
  const truncatedCount = analyzed.filter((e) => e.truncated).length
  const alertCount = analyzed.filter((e) => e.alert).length
  const finalEntry = analyzed[analyzed.length - 1]

  return {
    entries: analyzed,
    topConsumers,
    summary: {
      totalEntries: analyzed.length,
      requestCount,
      userCount,
      progressCount,
      finalTokens: finalEntry?.cumulativeTokens ?? 0,
      finalElapsedMs: finalEntry?.elapsedMs ?? 0,
      cacheHitRate,
      errorCount,
      truncatedCount,
      alertCount,
    },
  }
}
