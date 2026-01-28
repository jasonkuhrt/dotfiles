/**
 * Effect Schema definitions for Claude Code task JSON format.
 *
 * Tasks live in ~/.claude/tasks/<list-id>/<n>.json where list-id is either
 * a UUID (session-scoped) or a named string (user-created).
 */

import { Schema } from "effect"

// -----------------------------------------------------------------------------
// Schema
// -----------------------------------------------------------------------------

export const TaskStatus = Schema.Literal(
  "pending",
  "in_progress",
  "completed",
  "deleted",
)
export type TaskStatus = typeof TaskStatus.Type

export const Task = Schema.Struct({
  id: Schema.String,
  subject: Schema.String,
  description: Schema.String,
  activeForm: Schema.String,
  status: TaskStatus,
  blocks: Schema.Array(Schema.String),
  blockedBy: Schema.Array(Schema.String),
  owner: Schema.optional(Schema.String),
  metadata: Schema.optional(
    Schema.Record({ key: Schema.String, value: Schema.Unknown }),
  ),
})
export type Task = typeof Task.Type
