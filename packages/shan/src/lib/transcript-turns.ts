/**
 * Turn collapsing — groups sequential transcript entries into conversation turns.
 *
 * A "turn" is a logical unit in a conversation:
 * - **user turn**: A user message (excluding synthetic tool_result-only entries)
 * - **claude turn**: One or more assistant entries + their interleaved tool_result entries
 * - **summary turn**: A compaction/summary entry
 *
 * The key insight: Claude Code inserts synthetic "user" entries that contain only
 * `tool_result` blocks (the results of tool calls). These are protocol artifacts,
 * not real user messages, so they're grouped into the surrounding Claude turn.
 */

import type { TranscriptEntry, ToolResultBlock } from "./transcript-schema.js"

export interface Turn {
  type: "user" | "claude" | "summary"
  entries: TranscriptEntry[]
}

/**
 * Collapse a flat list of transcript entries into logical conversation turns.
 */
export const collapseIntoTurns = (entries: TranscriptEntry[]): Turn[] => {
  const turns: Turn[] = []
  let current: Turn | null = null

  for (const entry of entries) {
    // Skip non-conversation entries
    if (entry.type !== "user" && entry.type !== "assistant" && entry.type !== "summary") continue

    if (entry.type === "summary") {
      if (current) turns.push(current)
      turns.push({ type: "summary", entries: [entry] })
      current = null
      continue
    }

    if (entry.type === "user") {
      // User entries with only tool_result content are part of the assistant turn
      const content = entry.message.content
      const isToolResultOnly =
        typeof content !== "string" &&
        content.length > 0 &&
        content.every((b) => b.type === "tool_result")

      if (isToolResultOnly && current?.type === "claude") {
        current.entries.push(entry)
        continue
      }

      // Real user message
      if (current) turns.push(current)
      current = { type: "user", entries: [entry] }
      continue
    }

    if (entry.type === "assistant") {
      if (current?.type === "claude") {
        current.entries.push(entry)
      } else {
        if (current) turns.push(current)
        current = { type: "claude", entries: [entry] }
      }
      continue
    }
  }

  if (current) turns.push(current)
  return turns
}

/**
 * Build a map of tool_use_id → ToolResultBlock from user entries in a turn.
 * Used to correlate tool calls with their results for rendering.
 */
export const buildToolResultMap = (turnEntries: TranscriptEntry[]): Map<string, ToolResultBlock> => {
  const map = new Map<string, ToolResultBlock>()
  for (const entry of turnEntries) {
    if (entry.type !== "user") continue
    const content = entry.message.content
    if (typeof content === "string") continue
    for (const block of content) {
      if (block.type === "tool_result") {
        map.set(block.tool_use_id, block)
      }
    }
  }
  return map
}
