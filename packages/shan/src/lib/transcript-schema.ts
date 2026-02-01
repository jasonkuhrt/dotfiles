/**
 * Effect Schema definitions for Claude Code transcript JSONL format.
 *
 * Sources:
 * - https://github.com/neilberkman/ccrider/blob/main/research/schema.md
 * - https://github.com/simonw/claude-code-transcripts
 *
 * Note: Schemas are intentionally lenient with optional/unknown fields to
 * handle schema evolution and undocumented fields in production transcripts.
 */

import { Schema } from "effect"

// -----------------------------------------------------------------------------
// Tool Input Schemas (typed inputs for known CC tools)
// -----------------------------------------------------------------------------

export const ReadInput = Schema.Struct({
  file_path: Schema.String,
  offset: Schema.optional(Schema.Number),
  limit: Schema.optional(Schema.Number),
})
export type ReadInput = typeof ReadInput.Type

export const WriteInput = Schema.Struct({
  file_path: Schema.String,
  content: Schema.String,
})
export type WriteInput = typeof WriteInput.Type

export const EditInput = Schema.Struct({
  file_path: Schema.String,
  old_string: Schema.String,
  new_string: Schema.String,
  replace_all: Schema.optional(Schema.Boolean),
})
export type EditInput = typeof EditInput.Type

export const BashInput = Schema.Struct({
  command: Schema.String,
  description: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.Number),
})
export type BashInput = typeof BashInput.Type

export const GrepInput = Schema.Struct({
  pattern: Schema.String,
  path: Schema.optional(Schema.String),
  glob: Schema.optional(Schema.String),
})
export type GrepInput = typeof GrepInput.Type

export const GlobInput = Schema.Struct({
  pattern: Schema.String,
  path: Schema.optional(Schema.String),
})
export type GlobInput = typeof GlobInput.Type

export const WebSearchInput = Schema.Struct({
  query: Schema.String,
})
export type WebSearchInput = typeof WebSearchInput.Type

export const WebFetchInput = Schema.Struct({
  url: Schema.String,
  prompt: Schema.optional(Schema.String),
})
export type WebFetchInput = typeof WebFetchInput.Type

export const TaskInput = Schema.Struct({
  description: Schema.optional(Schema.String),
  prompt: Schema.optional(Schema.String),
  subagent_type: Schema.optional(Schema.String),
})
export type TaskInput = typeof TaskInput.Type

export const LSPInput = Schema.Struct({
  operation: Schema.String,
  filePath: Schema.String,
  line: Schema.optional(Schema.Number),
  character: Schema.optional(Schema.Number),
})
export type LSPInput = typeof LSPInput.Type

export const SkillInput = Schema.Struct({
  skill: Schema.String,
  args: Schema.optional(Schema.String),
})
export type SkillInput = typeof SkillInput.Type

export const NotebookEditInput = Schema.Struct({
  notebook_path: Schema.String,
  new_source: Schema.String,
  cell_type: Schema.optional(Schema.String),
  edit_mode: Schema.optional(Schema.String),
})
export type NotebookEditInput = typeof NotebookEditInput.Type

// Lookup table mapping tool name → input schema (for consumers)
export const ToolInputSchemas = {
  Read: ReadInput,
  Write: WriteInput,
  Edit: EditInput,
  Bash: BashInput,
  Grep: GrepInput,
  Glob: GlobInput,
  WebSearch: WebSearchInput,
  WebFetch: WebFetchInput,
  Task: TaskInput,
  LSP: LSPInput,
  Skill: SkillInput,
  NotebookEdit: NotebookEditInput,
} as const

export type KnownToolName = keyof typeof ToolInputSchemas

export const isKnownTool = (name: string): name is KnownToolName =>
  name in ToolInputSchemas

// -----------------------------------------------------------------------------
// Content Blocks (nested inside message.content)
// -----------------------------------------------------------------------------

export const TextBlock = Schema.Struct({
  type: Schema.Literal("text"),
  text: Schema.String,
})
export type TextBlock = typeof TextBlock.Type

export const ThinkingBlock = Schema.Struct({
  type: Schema.Literal("thinking"),
  thinking: Schema.String,
  signature: Schema.optional(Schema.String),
})
export type ThinkingBlock = typeof ThinkingBlock.Type

export const ToolUseBlock = Schema.Struct({
  type: Schema.Literal("tool_use"),
  id: Schema.String,
  name: Schema.String,
  input: Schema.Unknown,
})
export type ToolUseBlock = typeof ToolUseBlock.Type

export const ToolResultBlock = Schema.Struct({
  type: Schema.Literal("tool_result"),
  tool_use_id: Schema.String,
  content: Schema.Union(Schema.String, Schema.Array(Schema.Unknown)),
  is_error: Schema.optional(Schema.Boolean),
})
export type ToolResultBlock = typeof ToolResultBlock.Type

export const ImageBlock = Schema.Struct({
  type: Schema.Literal("image"),
  source: Schema.Struct({
    media_type: Schema.String,
    data: Schema.String,
  }),
})
export type ImageBlock = typeof ImageBlock.Type

export const ContentBlock = Schema.Union(
  TextBlock,
  ThinkingBlock,
  ToolUseBlock,
  ToolResultBlock,
  ImageBlock,
)
export type ContentBlock = typeof ContentBlock.Type

// -----------------------------------------------------------------------------
// Message structures
// -----------------------------------------------------------------------------

export const Usage = Schema.Struct({
  input_tokens: Schema.Number,
  output_tokens: Schema.Number,
  cache_creation_input_tokens: Schema.optional(Schema.Number),
  cache_read_input_tokens: Schema.optional(Schema.Number),
  // Additional fields in production
  cache_creation: Schema.optional(Schema.Unknown),
  service_tier: Schema.optional(Schema.String),
})
export type Usage = typeof Usage.Type

export const UserMessage = Schema.Struct({
  role: Schema.Literal("user"),
  content: Schema.Union(Schema.String, Schema.Array(ContentBlock)),
})
export type UserMessage = typeof UserMessage.Type

export const AssistantMessage = Schema.Struct({
  role: Schema.optional(Schema.Literal("assistant")),
  content: Schema.Array(ContentBlock),
  model: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  stop_reason: Schema.optional(Schema.NullOr(Schema.String)),
  usage: Schema.optional(Usage),
  // Additional fields in production
  type: Schema.optional(Schema.String), // "message"
  stop_sequence: Schema.optional(Schema.NullOr(Schema.String)),
})
export type AssistantMessage = typeof AssistantMessage.Type

// -----------------------------------------------------------------------------
// Entry Types (top-level JSONL discrimination)
// -----------------------------------------------------------------------------

const BaseEntryFields = {
  uuid: Schema.String,
  timestamp: Schema.String,
  parentUuid: Schema.optional(Schema.NullOr(Schema.String)),
  sessionId: Schema.optional(Schema.String),
  cwd: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  // Additional fields in production
  isSidechain: Schema.optional(Schema.Boolean),
  userType: Schema.optional(Schema.String),
  gitBranch: Schema.optional(Schema.String),
}

export const UserEntry = Schema.Struct({
  type: Schema.Literal("user"),
  message: UserMessage,
  ...BaseEntryFields,
})
export type UserEntry = typeof UserEntry.Type

export const AssistantEntry = Schema.Struct({
  type: Schema.Literal("assistant"),
  message: AssistantMessage,
  requestId: Schema.optional(Schema.String),
  ...BaseEntryFields,
})
export type AssistantEntry = typeof AssistantEntry.Type

export const SummaryEntry = Schema.Struct({
  type: Schema.Literal("summary"),
  summary: Schema.String,
  leafUuid: Schema.optional(Schema.NullOr(Schema.String)),
  timestamp: Schema.optional(Schema.String),
})
export type SummaryEntry = typeof SummaryEntry.Type

export const SystemEntry = Schema.Struct({
  type: Schema.Literal("system"),
  subtype: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  level: Schema.optional(Schema.String),
  isMeta: Schema.optional(Schema.Boolean),
  ...BaseEntryFields,
})
export type SystemEntry = typeof SystemEntry.Type

export const ProgressEntry = Schema.Struct({
  type: Schema.Literal("progress"),
  data: Schema.Struct({
    type: Schema.String,
    hookName: Schema.optional(Schema.String),
  }),
  timestamp: Schema.optional(Schema.String),
  uuid: Schema.optional(Schema.String),
})
export type ProgressEntry = typeof ProgressEntry.Type

export const FileHistoryEntry = Schema.Struct({
  type: Schema.Literal("file-history-snapshot"),
  messageId: Schema.optional(Schema.String),
  isSnapshotUpdate: Schema.optional(Schema.Boolean),
  snapshot: Schema.optional(Schema.Unknown),
  timestamp: Schema.optional(Schema.String),
})
export type FileHistoryEntry = typeof FileHistoryEntry.Type

export const QueueOperationEntry = Schema.Struct({
  type: Schema.Literal("queue-operation"),
  operation: Schema.String, // "enqueue", "dequeue", etc.
  timestamp: Schema.String,
  sessionId: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
})
export type QueueOperationEntry = typeof QueueOperationEntry.Type

export const TranscriptEntry = Schema.Union(
  UserEntry,
  AssistantEntry,
  SummaryEntry,
  SystemEntry,
  ProgressEntry,
  FileHistoryEntry,
  QueueOperationEntry,
).annotations({ identifier: "TranscriptEntry" })
export type TranscriptEntry = typeof TranscriptEntry.Type

// -----------------------------------------------------------------------------
// Typed tool input decoder
// -----------------------------------------------------------------------------

/**
 * Decode a ToolUseBlock's `input` field using the known tool input schema.
 * Returns the decoded typed input for known tools, or the raw unknown for others.
 */
export const decodeToolInput = (block: ToolUseBlock): unknown => {
  if (!isKnownTool(block.name)) return block.input
  // Each schema is Schema<A, I, R> with different A — use Schema.Unknown as the common decode target
  // since we return `unknown` anyway. The individual schemas validate the shape.
  const schema = ToolInputSchemas[block.name] as Schema.Schema<unknown>
  return Schema.decodeUnknownSync(schema)(block.input)
}
