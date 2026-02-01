/**
 * shan transcript print — Render Claude Code transcripts as readable conversation logs.
 *
 * Default output is pure chat: user messages, Claude's prose, tool calls as one-liners.
 * Use --show to add layers: results, diffs, thinking, trace, all.
 */

import { Console, Effect } from "effect"
import type {
  AssistantEntry,
  UserEntry,
  ToolUseBlock,
  ToolResultBlock,
} from "../../lib/transcript-schema.js"
import {
  isKnownTool,
  decodeToolInput,
  type ReadInput,
  type WriteInput,
  type EditInput,
  type BashInput,
  type GrepInput,
  type GlobInput,
  type WebSearchInput,
  type WebFetchInput,
  type TaskInput,
  type LSPInput,
} from "../../lib/transcript-schema.js"
import { loadTranscript, ensureOutputDir, writeOutput } from "../../lib/transcript-io.js"
import { collapseIntoTurns, buildToolResultMap, type Turn } from "../../lib/transcript-turns.js"
import type { PickSessionOptions } from "../../lib/session-picker.js"

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
  if (!isKnownTool(tool.name)) return `**${tool.name}**`

  const input = decodeToolInput(tool)
  switch (tool.name) {
    case "Read":
      return `**Read** \`${(input as ReadInput).file_path}\``
    case "Write":
      return `**Wrote** \`${(input as WriteInput).file_path}\``
    case "Edit":
      return `**Edited** \`${(input as EditInput).file_path}\``
    case "Bash":
      return `**Ran** \`${truncate((input as BashInput).command, 80)}\``
    case "Grep":
      return `**Searched** for \`${truncate((input as GrepInput).pattern, 60)}\``
    case "Glob":
      return `**Searched** for \`${truncate((input as GlobInput).pattern, 60)}\``
    case "WebSearch":
      return `**Web search** \`${truncate((input as WebSearchInput).query, 60)}\``
    case "WebFetch":
      return `**Fetched** \`${truncate((input as WebFetchInput).url, 80)}\``
    case "Task":
      return `**Subagent** — ${truncate((input as TaskInput).description ?? "", 60)}`
    case "LSP": {
      const lsp = input as LSPInput
      return `**LSP** \`${lsp.operation}\` on \`${lsp.filePath}\``
    }
    case "Skill":
    case "NotebookEdit":
      return `**${tool.name}**`
  }
}

// -----------------------------------------------------------------------------
// Result extraction
// -----------------------------------------------------------------------------

const extractResultText = (content: string | readonly unknown[]): string | null => {
  if (typeof content === "string") return content
  for (const item of content) {
    if (typeof item === "object" && item !== null && "type" in item) {
      const typed = item as { type: string; text?: string }
      if (typed.type === "text" && typed.text) return typed.text
    }
  }
  return null
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
        lines.push(block.text)
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
      lines.push(block.text)
      lines.push("")
    } else if (block.type === "tool_use") {
      lines.push(`- ${summarizeToolCall(block)}`)

      // --show diffs: expand Edit calls
      if (layers.has("diffs") && block.name === "Edit") {
        const input = decodeToolInput(block) as EditInput
        if (input.old_string && input.new_string) {
          lines.push("  ```diff")
          for (const l of input.old_string.split("\n")) {
            lines.push(`  - ${l}`)
          }
          for (const l of input.new_string.split("\n")) {
            lines.push(`  + ${l}`)
          }
          lines.push("  ```")
        }
      }

      // --show results: tool result summaries
      if (layers.has("results")) {
        const result = toolResults.get(block.id)
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
      lines.push(`> *thinking:* ${truncate(block.thinking.replace(/\n/g, " "), 300)}`)
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
    const entry = turn.entries[0]!
    if (entry.type !== "user") return lines
    const heading = layers.has("trace") ? `## You [${String(index).padStart(3, "0")}]` : "## You"
    lines.push(heading, "")
    lines.push(...renderUserContent(entry))
    lines.push("")
  }

  if (turn.type === "claude") {
    const heading = layers.has("trace") ? `## Claude [${String(index).padStart(3, "0")}]` : "## Claude"
    lines.push(heading, "")

    const toolResults = buildToolResultMap(turn.entries)

    for (const entry of turn.entries) {
      if (entry.type === "assistant") {
        lines.push(...renderAssistantContent(entry, layers, toolResults))
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
    const { sessionId, entries } = yield* loadTranscript(input, options)
    const layers = parseShowFlags(options.show ?? [])
    const turns = collapseIntoTurns(entries)

    const output: string[] = []

    // Trace header
    if (layers.has("trace")) {
      output.push("---")
      output.push(`session: ${sessionId}`)
      output.push(`entries: ${entries.length}`)
      output.push(`exported: ${new Date().toISOString()}`)
      output.push("---")
      output.push("")
    }

    let turnIndex = 0
    for (const turn of turns) {
      if (turn.type !== "summary") turnIndex++
      output.push(...renderTurn(turn, layers, turnIndex))
    }

    const outputDir = yield* ensureOutputDir()
    const outputPath = yield* writeOutput(outputDir, `${sessionId}.print.md`, output.join("\n"))
    yield* Console.log(`Wrote: ${outputPath} (${turns.length} turns from ${entries.length} entries)`)
  })
