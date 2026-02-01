/**
 * shan transcript dump - Convert Claude Code JSONL transcripts to navigable Markdown.
 */

import { Console, Effect, Schema } from "effect"
import type {
  TranscriptEntry,
  ToolUseBlock,
  UserEntry,
  AssistantEntry,
} from "../../lib/transcript-schema.js"
import { TranscriptEntry as TranscriptEntrySchema } from "../../lib/transcript-schema.js"
import { loadTranscript, ensureOutputDir, writeOutput } from "../../lib/transcript-io.js"
import { resolveSessionPath, extractSessionId } from "../../lib/session-resolver.js"
import { pickSession, type PickSessionOptions } from "../../lib/session-picker.js"

// -----------------------------------------------------------------------------
// Config
// -----------------------------------------------------------------------------

const COL_NUM = 3
const COL_TIME = 16 // "mm/dd/yyyy hh:mm"
const COL_TYPE = 21 // "file-history-snapshot" is the longest
const COL_SUMMARY = 30

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const PAD_CHAR = "_"

const pad = (s: string, width: number): string =>
  s.length >= width ? s.slice(0, width) : s + PAD_CHAR.repeat(width - s.length)

const formatEntryTimestamp = (entry: TranscriptEntry): string => {
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
  if (!ts) return pad("", COL_TIME)

  const date = new Date(ts)
  if (isNaN(date.getTime())) return pad("", COL_TIME)

  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const dd = String(date.getDate()).padStart(2, "0")
  const yyyy = date.getFullYear()
  const hh = String(date.getHours()).padStart(2, "0")
  const min = String(date.getMinutes()).padStart(2, "0")

  return `${mm}/${dd}/${yyyy} ${hh}:${min}`
}

const formatHeading = (n: number, time: string, type: string, summary: string): string => {
  const numStr = String(n).padStart(COL_NUM, "0")
  const timeStr = pad(time, COL_TIME)
  const typeStr = pad(type, COL_TYPE)
  const summaryStr = pad(summary, COL_SUMMARY)
  return `# \`${numStr}\` \`${timeStr}\` \`${typeStr}\` \`${summaryStr}\``
}

const extractUserSummary = (entry: UserEntry): string => {
  const content = entry.message.content
  if (typeof content === "string") {
    return content.slice(0, COL_SUMMARY).replace(/\n/g, " ")
  }
  const toolResults = content.filter((b) => b.type === "tool_result")
  if (toolResults.length > 0) {
    return `tool_result ×${toolResults.length}`
  }
  const textBlock = content.find((b) => b.type === "text")
  if (textBlock && textBlock.type === "text") {
    return textBlock.text.slice(0, COL_SUMMARY).replace(/\n/g, " ")
  }
  return "(content)"
}

const extractAssistantSummary = (entry: AssistantEntry): string => {
  const content = entry.message.content
  const toolUses = content.filter((b): b is ToolUseBlock => b.type === "tool_use")

  if (toolUses.length === 0) {
    return "text"
  }

  const counts = new Map<string, number>()
  for (const tool of toolUses) {
    counts.set(tool.name, (counts.get(tool.name) ?? 0) + 1)
  }

  const parts: string[] = []
  for (const [name, count] of counts) {
    parts.push(count > 1 ? `${name} ×${count}` : name)
  }

  return parts.join(", ").slice(0, COL_SUMMARY)
}

const getSummary = (entry: TranscriptEntry): string => {
  switch (entry.type) {
    case "user":
      return extractUserSummary(entry)
    case "assistant":
      return extractAssistantSummary(entry)
    case "summary":
      return "(compaction)"
    case "system":
      return entry.subtype ?? "system"
    case "progress":
      return entry.data.hookName ?? entry.data.type
    case "file-history-snapshot":
      return "snapshot"
    case "queue-operation":
      return entry.operation
  }
}

// Effect JSON codec: TranscriptEntry → JSON string (pretty-printed)
const encodeEntryToJson = Schema.encodeSync(
  Schema.parseJson(TranscriptEntrySchema, { space: 2 }),
)

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

export interface DumpOptions extends PickSessionOptions {
  raw?: boolean
}

export const transcriptDump = (input: string | undefined, options: DumpOptions = {}) =>
  Effect.gen(function* () {
    if (options.raw) {
      // Raw mode: resolve session + copy JSONL as-is (no parsing needed)
      const sessionPath = input
        ? yield* resolveSessionPath(input)
        : yield* pickSession(options)
      const sessionId = extractSessionId(sessionPath)
      const outputDir = yield* ensureOutputDir()

      yield* Console.log(`Copying: ${sessionPath}`)
      const text = yield* Effect.promise(() => Bun.file(sessionPath).text())
      const outputPath = yield* writeOutput(outputDir, `${sessionId}.jsonl`, text)
      yield* Console.log(`Wrote: ${outputPath}`)
      return
    }

    // Formatted mode: load + parse via shared helper
    const { sessionId, entries } = yield* loadTranscript(input, options)
    const outputDir = yield* ensureOutputDir()

    const output: string[] = []
    let n = 0

    for (const entry of entries) {
      n++
      const time = formatEntryTimestamp(entry)
      const summary = getSummary(entry)
      const heading = formatHeading(n, time, entry.type, summary)
      const body = "```json\n" + encodeEntryToJson(entry) + "\n```"

      output.push(heading)
      output.push("")
      output.push(body)
      output.push("")
    }

    const outputPath = yield* writeOutput(outputDir, `${sessionId}.transcript.md`, output.join("\n"))
    yield* Console.log(`Wrote: ${outputPath} (${n} entries)`)
  })
