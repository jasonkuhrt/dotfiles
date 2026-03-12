# CC Tasks — Details

Deep-dive reference for the CC task system. See `SKILL.md` for the 5-bullet summary.

## Typical Flow

1. You ask for something big: *"Add OAuth login with Google and GitHub providers"*
2. Claude creates a task list (you see it appear in your terminal)
3. You toggle `Ctrl+T` to watch progress as Claude works through each task
4. Claude finishes all tasks, session ends (task files remain on disk but aren't loaded by new sessions unless resumed or using a named task list ID)

No setup, no config. Most users never go beyond this.

## Why Tasks Exist

Tasks replaced the older TodoWrite system in v2.1.16. The motivation ([Anthropic announcement](https://x.com/trq212/status/2014480496013803643)): as Opus 4.5 became capable of running autonomously for longer, TodoWrite was no longer needed for small tasks — Claude already knew what to do. But longer projects spanning multiple sessions or subagents needed something TodoWrite couldn't provide: dependencies, coordination, and persistence.

## Cross-Session Persistence

```bash
export CLAUDE_CODE_TASK_LIST_ID=e2e-testing
claude   # tasks load immediately at session start
# ... work, exit
claude   # new session — same tasks still there
```

Tasks persist at `~/.claude/tasks/e2e-testing/`. Any session with the same ID shares the list — updates broadcast to all sessions on that list. Also works with `claude -p` and the AgentSDK.

When multiple agents share a list, Claude auto-claims tasks (via `owner` field) to avoid conflicts.

## Limitations

- Local-only — not Git-shareable or portable across machines. For team-level issue tracking with persistence and Git sync, tools like [beads](https://github.com/steveyegge/beads) fill a different niche.
- **No repo awareness** — `CLAUDE_CODE_TASK_LIST_ID` is just a directory name. Using the same ID across different repos causes cross-contamination (tasks from unrelated projects visible in both). Use repo-specific IDs.

## Opting Out

Set `CLAUDE_CODE_ENABLE_TASKS=false` to revert to the legacy TodoWrite system.

## Task Lifecycle

```
pending → in_progress → completed
            ↘ deleted (permanent removal)
```

All transitions are made by Claude. You can ask Claude to delete or clear tasks ("clear all tasks", "remove that one"), but there's no direct user control — Claude executes via its tools.

## Changelog

* [v2.1.16](https://github.com/anthropics/claude-code/releases/tag/v2.1.16) — Task system introduced (replaced TodoWrite)
* [v2.1.19](https://github.com/anthropics/claude-code/releases/tag/v2.1.19) — `CLAUDE_CODE_ENABLE_TASKS` env var for opt-out
* [v2.1.20](https://github.com/anthropics/claude-code/releases/tag/v2.1.20) — Task deletion, dynamic task list sizing

## Observed Behavior (may change between releases)

Discovered via filesystem inspection from within an active session (agent-side observation). Not sourced from CC source code or official docs unless noted. May be incomplete or misattributed.

### Storage

* Default task list ID = session UUID. Creating tasks produces `~/.claude/tasks/<session-uuid>/{1,2,3...}.json`
* `CLAUDE_CODE_TASK_LIST_ID=foo` → tasks go to `~/.claude/tasks/foo/` (env var value = directory name — confirmed by [official docs](https://code.claude.com/docs/en/interactive-mode#task-list))
* Deletion has two distinct code paths:
  * **Via `TaskUpdate`**: calling `TaskUpdate` with `status: "deleted"` removes the JSON file from disk immediately. No `"status": "deleted"` is ever written.
  * **Via manual edit**: manually writing `"status": "deleted"` into a task's JSON file causes `TaskList` to filter it out (task becomes invisible), but the file remains on disk as a zombie — CC does not clean it up on read.
* `completed` tasks stay on disk as JSON
* Named task lists (`CLAUDE_CODE_TASK_LIST_ID`) survive session close — verified by exiting a session, starting a new `claude`, and seeing the task list load immediately in the status bar before any input
* Default (UUID-keyed) task lists: **task JSON files persist on disk after session close.** Verified via automated test (`claude -p` with `CLAUDE_CODE_ENABLE_TASKS=true`): created tasks, let session exit, checked filesystem — files remained. No async cleanup observed after 10s. Empty task dirs are from sessions where all tasks were deleted (via `TaskUpdate` with `status: "deleted"`) or where no tasks were created.
* **`claude -p` requires `CLAUDE_CODE_ENABLE_TASKS=true`** — without it, `-p` mode falls back to TodoWrite and TaskCreate is unavailable.
* **`--resume` is project-scoped** — must be run from the same project directory as the original session. Running from a different project returns "No conversation found" even though the JSONL exists on disk.
* All observed default task list UUIDs correspond 1:1 with session IDs in `~/.claude/projects/`

### Task List ID vs Session Name

These are independent concepts:

* **Session name** (`/rename`) — human-friendly label stored as metadata in the session file. Used for `claude --resume "my-name"`. Does not affect the task list directory.
* **Task list ID** (`CLAUDE_CODE_TASK_LIST_ID`) — the directory name under `~/.claude/tasks/`. Defaults to session UUID. Only overridden by the env var.

`/rename` does not change the task list path. Setting a task list ID does not rename the session.

### JSON Schema (inferred — one file per task)

Schema inferred by reading task JSON files on disk. Not sourced from a JSON Schema definition in CC source code.

```json
{
  "id": "6",
  "subject": "Set up project scaffold",
  "description": "Create the initial directory structure and config files",
  "activeForm": "Setting up project scaffold",
  "status": "pending",
  "owner": "test-agent",
  "blocks": ["7"],
  "blockedBy": [],
  "metadata": {
    "priority": "high",
    "custom_field": "hello"
  }
}
```

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | Auto-incrementing integer as string |
| `subject` | string | Imperative form ("Set up X") |
| `description` | string | Full context for the task |
| `activeForm` | string | Present continuous ("Setting up X"), shown in spinner |
| `status` | string | `pending`, `in_progress`, `completed`. `deleted` exists in the tool API but is never written to disk by CC — the file is removed instead. However, manually setting `"deleted"` in a JSON file is respected: `TaskList` hides it, though the file persists as a zombie. |
| `owner` | string? | Agent name, absent until claimed |
| `blocks` | string[] | Task IDs that can't start until this completes |
| `blockedBy` | string[] | Task IDs that must complete before this starts |
| `metadata` | object? | Arbitrary key-value pairs, absent until set |

_Last verified: v2.1.20, January 2026._

## See Also

* [Anthropic announcement](https://x.com/trq212/status/2014480496013803643) — primary source, design rationale from CC staff
* [Official docs](https://code.claude.com/docs/en/interactive-mode#task-list) — minimal reference
* [Claude Code Releases](https://github.com/anthropics/claude-code/releases)
* [Reddit discussion](https://www.reddit.com/r/ClaudeAI/comments/1qkjznp/anthropic_replaced_claude_codes_old_todos_with) — community reception
* [claude-task-viewer](https://github.com/L1AD/claude-task-viewer) — third-party task viewer UI
* [Known issue: --fork-session doesn't inherit task list ID](https://github.com/anthropics/claude-code/issues/20664)
