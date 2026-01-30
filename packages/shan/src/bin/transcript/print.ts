/**
 * shan transcript print — Render Claude Code transcripts as readable conversation logs.
 *
 * Default output is pure chat: user messages, Claude's prose, tool calls as one-liners.
 * Use --show to add layers: results, diffs, thinking, trace, all.
 */

import { Console, Effect } from "effect"
import { join } from "node:path"
import { mkdir } from "node:fs/promises"
import type {
  AssistantEntry,
  UserEntry,
  ToolUseBlock,
  TextBlock,
  ThinkingBlock,
  ToolResultBlock,
} from "../../lib/transcript-schema.js"
import { parseTranscriptEntries, type ParsedEntry } from "../../lib/transcript-parser.js"
import { resolveSessionPath, extractSessionId } from "../../lib/session-resolver.js"
import { pickSession, type PickSessionOptions } from "../../lib/session-picker.js"

// -----------------------------------------------------------------------------
// Show layers
// -----------------------------------------------------------------------------

const LAYERS = ["results", "diffs", "thinking", "trace"] as const
type Layer = (typeof LAYERS)[number]

const parseShowFlags = (showArgs: string[]): Set<Layer> => {
  const layers = new Set<Layer>()
  for (const arg of showArgs) {
    for (const part of arg.split(",")) {
      const trimmed = part.trim()
      if (trimmed === "all") {
        for (const l of LAYERS) layers.add(l)
      } else if (LAYERS.includes(trimmed as Layer)) {
        layers.add(trimmed as Layer)
      }
    }
  }
  return layers
}

// -----------------------------------------------------------------------------
// Tool call summarizers
// -----------------------------------------------------------------------------

const truncate = (s: string, max: number): string =>
  s.length <= max ? s : s.slice(0, max - 1) + "…"

const summarizeToolCall = (tool: ToolUseBlock): string => {
  const input = tool.input as Record<string, unknown>
  switch (tool.name) {
    case "Read":
      return `**Read** \`${input["file_path"] ?? "?"}\``
    case "Write":
      return `**Wrote** \`${input["file_path"] ?? "?"}\``
    case "Edit":
      return `**Edited** \`${input["file_path"] ?? "?"}\``
    case "Bash":
      return `**Ran** \`${truncate(String(input["command"] ?? ""), 80)}\``
    case "Grep":
      return `**Searched** for \`${truncate(String(input["pattern"] ?? ""), 60)}\``
    case "Glob":
      return `**Searched** for \`${truncate(String(input["pattern"] ?? ""), 60)}\``
    case "WebSearch":
      return `**Web search** \`${truncate(String(input["query"] ?? ""), 60)}\``
    case "WebFetch":
      return `**Fetched** \`${truncate(String(input["url"] ?? ""), 80)}\``
    case "Task":
      return `**Subagent** — ${truncate(String(input["description"] ?? ""), 60)}`
    case "LSP":
      return `**LSP** \`${input["operation"]}\` on \`${input["filePath"]}\``
    default:
      return `**${tool.name}**`
  }
}

// -----------------------------------------------------------------------------
// Result extraction
// -----------------------------------------------------------------------------

const extractResultText = (content: unknown): string | null => {
  if (typeof content === "string") return content
  if (Array.isArray(content)) {
    for (const item of content) {
      if (typeof item === "object" && item !== null && "type" in item) {
        const typed = item as { type: string; text?: string }
        if (typed.type === "text" && typed.text) return typed.text
      }
    }
  }
  return null
}

// -----------------------------------------------------------------------------
// Turn collapsing
// -----------------------------------------------------------------------------

interface Turn {
  type: "user" | "claude" | "summary"
  entries: ParsedEntry[]
}

const collapseIntoTurns = (entries: ParsedEntry[]): Turn[] => {
  const turns: Turn[] = []
  let current: Turn | null = null

  for (const parsed of entries) {
    const { entry } = parsed

    // Skip non-conversation entries
    if (entry.type !== "user" && entry.type !== "assistant" && entry.type !== "summary") continue

    if (entry.type === "summary") {
      if (current) turns.push(current)
      turns.push({ type: "summary", entries: [parsed] })
      current = null
      continue
    }

    if (entry.type === "user") {
      // User entries with only tool_result content are part of the assistant turn
      const userEntry = entry as UserEntry
      const content = userEntry.message.content
      const isToolResultOnly =
        typeof content !== "string" &&
        content.length > 0 &&
        content.every((b) => b.type === "tool_result")

      if (isToolResultOnly && current?.type === "claude") {
        current.entries.push(parsed)
        continue
      }

      // Real user message
      if (current) turns.push(current)
      current = { type: "user", entries: [parsed] }
      continue
    }

    if (entry.type === "assistant") {
      if (current?.type === "claude") {
        current.entries.push(parsed)
      } else {
        if (current) turns.push(current)
        current = { type: "claude", entries: [parsed] }
      }
      continue
    }
  }

  if (current) turns.push(current)
  return turns
}

// Build a map of tool_use_id -> tool result content from user entries in a turn
const buildToolResultMap = (turnEntries: ParsedEntry[]): Map<string, ToolResultBlock> => {
  const map = new Map<string, ToolResultBlock>()
  for (const { entry } of turnEntries) {
    if (entry.type !== "user") continue
    const content = (entry as UserEntry).message.content
    if (typeof content === "string") continue
    for (const block of content) {
      if (block.type === "tool_result") {
        map.set(block.tool_use_id, block as ToolResultBlock)
      }
    }
  }
  return map
}

// -----------------------------------------------------------------------------
// Entry rendering
// -----------------------------------------------------------------------------

const renderUserContent = (entry: UserEntry): string[] => {
  const lines: string[] = []
  const content = entry.message.content
  if (typeof content === "string") {
    lines.push(content)
  } else {
    for (const block of content) {
      if (block.type === "text") {
        lines.push((block as TextBlock).text)
      }
    }
  }
  return lines
}

const renderAssistantContent = (
  entry: AssistantEntry,
  layers: Set<Layer>,
  toolResults: Map<string, ToolResultBlock>,
): string[] => {
  const lines: string[] = []

  for (const block of entry.message.content) {
    if (block.type === "text") {
      lines.push((block as TextBlock).text)
      lines.push("")
    } else if (block.type === "tool_use") {
      const tool = block as ToolUseBlock
      lines.push(`- ${summarizeToolCall(tool)}`)

      // --show diffs: expand Edit calls
      if (layers.has("diffs") && tool.name === "Edit") {
        const input = tool.input as Record<string, unknown>
        if (input["old_string"] && input["new_string"]) {
          lines.push("  ```diff")
          for (const l of String(input["old_string"]).split("\n")) {
            lines.push(`  - ${l}`)
          }
          for (const l of String(input["new_string"]).split("\n")) {
            lines.push(`  + ${l}`)
          }
          lines.push("  ```")
        }
      }

      // --show results: tool result summaries
      if (layers.has("results")) {
        const result = toolResults.get(tool.id)
        if (result) {
          if (result.is_error) {
            const text = extractResultText(result.content)
            lines.push(`  > *(error)* ${truncate((text ?? "").replace(/\n/g, " "), 200)}`)
          } else {
            const text = extractResultText(result.content)
            if (text) {
              lines.push(`  > ${truncate(text.replace(/\n/g, " "), 200)}`)
            }
          }
        }
      }
    } else if (block.type === "thinking" && layers.has("thinking")) {
      const thinking = (block as ThinkingBlock).thinking
      lines.push(`> *thinking:* ${truncate(thinking.replace(/\n/g, " "), 300)}`)
      lines.push("")
    }
  }

  return lines
}

// -----------------------------------------------------------------------------
// Turn rendering
// -----------------------------------------------------------------------------

const renderTurn = (turn: Turn, layers: Set<Layer>, index: number): string[] => {
  if (turn.type === "summary") {
    return ["---", "*Earlier context was summarized.*", "", "---", ""]
  }

  const lines: string[] = []

  if (turn.type === "user") {
    const entry = turn.entries[0]!.entry as UserEntry
    const heading = layers.has("trace") ? `## You [${String(index).padStart(3, "0")}]` : "## You"
    lines.push(heading, "")
    lines.push(...renderUserContent(entry))
    lines.push("")
  }

  if (turn.type === "claude") {
    const heading = layers.has("trace") ? `## Claude [${String(index).padStart(3, "0")}]` : "## Claude"
    lines.push(heading, "")

    const toolResults = buildToolResultMap(turn.entries)

    for (const { entry } of turn.entries) {
      if (entry.type === "assistant") {
        lines.push(...renderAssistantContent(entry as AssistantEntry, layers, toolResults))
      }
    }
  }

  return lines
}

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

export interface PrintOptions extends PickSessionOptions {
  show?: string[]
}

export const transcriptPrint = (input: string | undefined, options: PrintOptions = {}) =>
  Effect.gen(function* () {
    const sessionPath = input
      ? yield* resolveSessionPath(input)
      : yield* pickSession(options)
    const sessionId = extractSessionId(sessionPath)

    const layers = parseShowFlags(options.show ?? [])

    const outputDir = join(process.cwd(), ".claude", "transcripts")
    yield* Effect.promise(() => mkdir(outputDir, { recursive: true }))

    yield* Console.log(`Reading: ${sessionPath}`)

    const text = yield* Effect.promise(() => Bun.file(sessionPath).text())
    const parsed = yield* parseTranscriptEntries(text)
    const turns = collapseIntoTurns(parsed)

    const output: string[] = []

    // Trace header
    if (layers.has("trace")) {
      output.push("---")
      output.push(`session: ${sessionId}`)
      output.push(`entries: ${parsed.length}`)
      output.push(`exported: ${new Date().toISOString()}`)
      output.push("---")
      output.push("")
    }

    let turnIndex = 0
    for (const turn of turns) {
      if (turn.type !== "summary") turnIndex++
      output.push(...renderTurn(turn, layers, turnIndex))
    }

    const outputPath = join(outputDir, `${sessionId}.print.md`)
    yield* Effect.promise(() => Bun.write(outputPath, output.join("\n")))
    yield* Console.log(`Wrote: ${outputPath} (${turns.length} turns from ${parsed.length} entries)`)
  })
