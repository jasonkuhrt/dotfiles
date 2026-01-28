---
name: cc:tasks
description: Use when confused about Claude Code's task system, unsure how TaskCreate/TaskUpdate/TaskList/TaskGet work, or when the user asks about tasks, cross-session persistence, or task management.
---

# CC Tasks

* **Claude decides** when to create tasks — no user command triggers them. Complex, multi-step work → task list appears. Simple requests → no tasks.
* **Tools**: `TaskCreate`, `TaskUpdate`, `TaskList`, `TaskGet` (no permission required). Note: `Task` (subagent launcher) and `TaskOutput` (background bash output) are unrelated features.
* **Dependencies**: Tasks support `blocks` and `blockedBy` relationships. Use `TaskUpdate` with `addBlocks: ["id"]` or `addBlockedBy: ["id"]` to wire up DAGs. `TaskList` shows `blockedBy` for each task — tasks with unresolved blockers should not be started.
* **Session-scoped by default** — task list ID = session UUID. Files persist on disk after close but aren't loaded by new sessions. `claude --resume` restores them (same UUID = same task dir).
* **Cross-session** via `export CLAUDE_CODE_TASK_LIST_ID=<name>` — tasks persist at `~/.claude/tasks/<name>/`, load immediately on startup, broadcast updates across sessions sharing the list.
* **User observes** via `Ctrl+T` (overlay toggle). All state transitions are Claude's — user can ask ("clear tasks") but can't directly mutate.

## Operations

### Deep Dive

Read `details.md` for: lifecycle, deletion semantics, JSON schema, filesystem behavior, persistence mechanics, changelog, links.
