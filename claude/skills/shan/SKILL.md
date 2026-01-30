---
name: shan
description: Dump a Claude Code session transcript as navigable Markdown, or inspect CC task lists outside of CC. Use when user wants to review, analyze, or export a session transcript, or dump/open task files.
allowed-tools: Bash(bun:*)
---

# Shan

Claude Code tooling CLI (named after Claude Shannon).

## Execute

Run the shan CLI with provided arguments:

```bash
bun ~/projects/jasonkuhrt/dotfiles/packages/shan/src/bin/shan.ts $ARGUMENTS
```

## Commands

### `transcript dump [session-id]`

Convert JSONL transcripts to navigable Markdown with columnar headings for editor outline navigation.

**Arguments:**

| Argument | Description |
|----------|-------------|
| `[session-id]` | Optional. Partial UUID prefix (e.g., `dc8ffe42`). Defaults to current session. |

**Output:** `.claude/transcripts/<session-id>.transcript.md` in project directory

**Examples:**
```
/shan transcript dump              # dump current session
/shan transcript dump dc8ffe42     # dump specific session
```

**Output Format:**

Headings use monospace columns with underscore padding for editor outline alignment:

```markdown
# `001` `01/25/2026 22:45` `file-history-snapshot` `snapshot______________________`
# `002` `01/25/2026 22:45` `progress_____________` `SessionStart:clear____________`
# `003` `01/25/2026 22:46` `user_________________` `sync__________________________`
```

### `task dump [target]`

Copy task JSON files from `~/.claude/tasks/` into the project's `.claude/tasks/` directory. Provides zero-cost task inspection without consuming CC context.

```bash
shan task dump test-schema          # Dump entire named list
shan task dump 21b0                 # Dump UUID-prefixed session list
shan task dump test-schema@3        # Dump single task
shan task dump "@Scaffold"          # Find task by subject substring
shan task dump --md test-schema     # Convert to Markdown instead of JSON
shan task dump --all                # Include all projects' task lists
shan task dump                      # Interactive picker (TTY required)
```

### `task open [target]`

Open task lists or individual tasks in `$EDITOR` (defaults to Zed).

```bash
shan task open test-schema          # Open list directory
shan task open test-schema@3        # Open single task file
shan task open --all                # Include all projects' lists in picker
shan task open                      # Interactive picker (TTY required)
```

### Task Target Syntax

| Form | Resolves to |
|------|-------------|
| `test-schema` | Named list (exact match) |
| `21b0` | UUID list (prefix match) |
| `test-schema@3` | Task #3 in named list |
| `@Scaffold` | First task with "Scaffold" in subject |
| _(omit)_ | Interactive picker |

### Task Project Scoping

By default, only task lists belonging to the current project are shown:
- **Named lists** -- always included
- **UUID lists** -- included only if the UUID matches a session from `~/.claude/projects/<project-dir>/`

Use `--all` to show all task lists regardless of project.
