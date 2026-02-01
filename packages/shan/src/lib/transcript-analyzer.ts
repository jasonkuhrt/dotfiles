/**
 * Transcript analyzer - extracts metrics from Claude Code JSONL transcripts.
 *
 * Key insight: Multiple `assistant` entries can share the same `requestId`,
 * representing one API call that produces thinking + text + tool_use blocks.
 * We group by requestId to get actual request-level stats.
 *
 * Token metrics:
 * - `deltaTokens`: input_tokens + output_tokens for this request (summed across streaming chunks)
 * - `cumulativeTokens`: Running sum of delta tokens
 * - Top consumers are ranked by delta tokens (context consumption per request)
 */

import type {
  TranscriptEntry,
  AssistantEntry,
  UserEntry,
  Usage,
} from "./transcript-schema.js"
import { decodeToolInput, type SkillInput } from "./transcript-schema.js"

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface AnalyzedEntry {
  index: number
  entry: TranscriptEntry
  timestamp: Date
  elapsedMs: number
  cumulativeTokens: number // Running sum of input_tokens + output_tokens
  deltaTokens: number // input_tokens + output_tokens for this request
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
  deltaTokens: number // input_tokens + output_tokens for this request
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
    totalTokens: number // Final cumulative tokens
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
  // All entry types have `timestamp` but with different optionality
  let ts: string | undefined
  switch (entry.type) {
    case "user":
    case "assistant":
    case "system":
    case "queue-operation":
      ts = entry.timestamp
      break
    case "progress":
    case "file-history-snapshot":
    case "summary":
      ts = entry.timestamp
      break
  }
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
      tools.push(block.name)
    }
  }
  return tools
}

const countFilesRead = (tools: string[]): number => {
  return tools.filter((t) => t === "Read").length
}

const extractTextFromContent = (content: UserEntry["message"]["content"]): string => {
  if (typeof content === "string") return content

  const texts: string[] = []
  for (const block of content) {
    if (block.type === "text") {
      texts.push(block.text)
    }
  }
  return texts.join("\n")
}

const extractSkillFromUser = (entry: UserEntry, previousSkill: string | null): SkillInfo | null => {
  const text = extractTextFromContent(entry.message.content)

  // Pattern 1: "Base directory for this skill:" in message content
  const baseDirMatch = text.match(/Base directory for this skill:\s*([^\n]+)/)
  if (baseDirMatch) {
    const path = baseDirMatch[1]!.trim()
    const parts = path.split("/")
    const skillIndex = parts.findIndex((p) => p === "skills")
    if (skillIndex !== -1 && skillIndex < parts.length - 1) {
      const skillName = parts[skillIndex + 1]!
      return {
        name: skillName,
        isInitial: previousSkill === null,
        isProgressive: previousSkill === skillName,
      }
    }
  }

  // Pattern 2: Skill invocation markers like "### Skill: foo"
  const skillHeaderMatch = text.match(/### Skill:\s*(\S+)/)
  if (skillHeaderMatch) {
    const skillName = skillHeaderMatch[1]!
    return {
      name: skillName,
      isInitial: previousSkill === null,
      isProgressive: previousSkill === skillName,
    }
  }

  return null
}

const extractSkillFromTool = (tools: string[], entry: AssistantEntry): string | null => {
  if (!tools.includes("Skill")) return null

  for (const block of entry.message.content) {
    if (block.type === "tool_use" && block.name === "Skill") {
      const input = decodeToolInput(block) as SkillInput
      return input.skill ?? null
    }
  }
  return null
}

const checkTruncated = (entry: UserEntry): boolean => {
  const content = entry.message.content
  if (typeof content === "string") return false

  for (const block of content) {
    if (block.type === "tool_result") {
      const resultContent = block.content
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
    if (block.type === "tool_result" && block.is_error) {
      return true
    }
  }
  return false
}

// -----------------------------------------------------------------------------
// Main analyzer
// -----------------------------------------------------------------------------

// Alert threshold: 5000 tokens (per plan spec line 166)
const ALERT_THRESHOLD_TOKENS = 5000

export const analyzeTranscript = (entries: TranscriptEntry[]): AnalyzedTranscript => {
  // -------------------------------------------------------------------------
  // Pass 1: Aggregate token usage per requestId
  // -------------------------------------------------------------------------
  interface RequestData {
    totalInputTokens: number
    totalCacheCreationTokens: number
    totalOutputTokens: number
    cacheHit: boolean
    firstIndex: number
    tools: string[]
    model: "opus" | "sonnet" | "haiku" | null
    skillInvoked: string | null
  }
  const requestTokens = new Map<string, RequestData>()

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]!
    if (entry.type !== "assistant") continue

    // TS narrows entry to AssistantEntry after the type guard above
    const requestId = entry.requestId
    if (!requestId) continue

    const usage = extractUsage(entry)
    const tools = extractTools(entry)
    const model = extractModel(entry)
    const skillInvoked = extractSkillFromTool(tools, entry)

    const existing = requestTokens.get(requestId)
    if (existing) {
      if (usage) {
        existing.totalInputTokens += usage.input_tokens ?? 0
        existing.totalCacheCreationTokens += usage.cache_creation_input_tokens ?? 0
        existing.totalOutputTokens += usage.output_tokens ?? 0
        if ((usage.cache_read_input_tokens ?? 0) > 0) {
          existing.cacheHit = true
        }
      }
      existing.tools.push(...tools)
      if (!existing.model && model) {
        existing.model = model
      }
      if (!existing.skillInvoked && skillInvoked) {
        existing.skillInvoked = skillInvoked
      }
    } else {
      requestTokens.set(requestId, {
        totalInputTokens: usage?.input_tokens ?? 0,
        totalCacheCreationTokens: usage?.cache_creation_input_tokens ?? 0,
        totalOutputTokens: usage?.output_tokens ?? 0,
        cacheHit: (usage?.cache_read_input_tokens ?? 0) > 0,
        firstIndex: i,
        tools,
        model,
        skillInvoked,
      })
    }
  }

  // -------------------------------------------------------------------------
  // Pass 2: Process all entries, assigning tokens from requestId map
  // -------------------------------------------------------------------------
  const analyzed: AnalyzedEntry[] = []
  let startTime: Date | null = null
  let cumulativeTokens = 0
  let prevElapsedMs = 0
  let currentSkill: string | null = null
  const seenRequestIds = new Set<string>()

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]!
    const timestamp = parseTimestamp(entry)

    if (timestamp && !startTime) {
      startTime = timestamp
    }

    const rawElapsedMs = startTime && timestamp ? timestamp.getTime() - startTime.getTime() : 0
    const elapsedMs = Math.max(prevElapsedMs, rawElapsedMs)
    prevElapsedMs = elapsedMs

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

        if (requestId && !seenRequestIds.has(requestId)) {
          seenRequestIds.add(requestId)
          const reqData = requestTokens.get(requestId)
          if (reqData) {
            deltaTokens = reqData.totalInputTokens + reqData.totalCacheCreationTokens + reqData.totalOutputTokens
            cumulativeTokens += deltaTokens
            cacheHit = reqData.cacheHit
            tools = reqData.tools
            model = reqData.model
            filesRead = countFilesRead(tools)

            if (reqData.skillInvoked) {
              skill = {
                name: reqData.skillInvoked,
                isInitial: currentSkill === null,
                isProgressive: currentSkill === reqData.skillInvoked,
              }
              currentSkill = reqData.skillInvoked
            } else if (currentSkill) {
              skill = {
                name: currentSkill,
                isInitial: false,
                isProgressive: true,
              }
            }
          }
        } else if (requestId) {
          const reqData = requestTokens.get(requestId)
          if (reqData) {
            cacheHit = reqData.cacheHit
          }
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
      alert: deltaTokens >= ALERT_THRESHOLD_TOKENS,
      topRank: null,
    })
  }

  // -------------------------------------------------------------------------
  // Pass 3: Identify top consumers and assign ranks
  // -------------------------------------------------------------------------
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

  for (const tc of topConsumers) {
    const entry = analyzed[tc.index]
    if (entry) {
      entry.topRank = tc.rank
    }
  }

  // -------------------------------------------------------------------------
  // Calculate summary
  // -------------------------------------------------------------------------
  const requestCount = requestTokens.size
  const userCount = analyzed.filter((e) => e.type === "user").length
  const progressCount = analyzed.filter((e) => e.type === "progress").length
  const cacheHits = [...requestTokens.values()].filter((r) => r.cacheHit).length
  const cacheMisses = [...requestTokens.values()].filter((r) => !r.cacheHit).length
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
      totalTokens: finalEntry?.cumulativeTokens ?? 0,
      finalElapsedMs: finalEntry?.elapsedMs ?? 0,
      cacheHitRate,
      errorCount,
      truncatedCount,
      alertCount,
    },
  }
}
