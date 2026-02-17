---
name: shan
description: Dump a Claude Code session transcript as navigable Markdown, inspect CC task lists, or manage skill outfit and library (on/off/move/doctor). Use when user wants to review/analyze/export a session transcript, dump/open task files, or manage skills.
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

### `skills` (default: list)

Show the effective outfit across all layers.

```bash
shan skills                         # default: list
shan skills list                    # explicit
```

### `skills on <targets> [--scope user] [--strict]`

Turn on one or more skills or groups. Targets are comma-separated colon-syntax names.

```bash
shan skills on playwright                     # single skill
shan skills on ts                             # entire group
shan skills on ts:tooling,playwright,linear    # batch
shan skills on --scope user git               # user-level
```

### `skills off [targets] [--scope user] [--strict]`

Turn off skills. No targets = reset all pluggable skills.

```bash
shan skills off playwright                    # single skill
shan skills off ts                            # entire group
shan skills off                               # reset: off ALL pluggable
shan skills off --scope user                  # reset at user level
```

### `skills history [--scope user]`

Show the operation log for the current scope.

### `skills undo [N] [--scope user]`

Undo the last N operations (default 1). Restores outfit to pre-operation snapshot.

### `skills redo [N] [--scope user]`

Redo the last N undone operations (default 1).

### `skills move <axis> <direction> <targets> [--scope user] [--strict]`

Migrate skills between scopes or commitments. Targets are comma-separated colon-syntax names. Atomic batch: all-or-nothing validation.

**Axes:**
- `scope` — move between user and project library
- `commitment` — move between pluggable and core

**Directions:**
- `up` — scope: project→user, commitment: pluggable→core
- `down` — scope: user→project, commitment: core→pluggable

```bash
shan skills move scope down playwright         # user library → project library
shan skills move scope up playwright           # project library → user library
shan skills move commitment up playwright      # pluggable → core (copy to outfit)
shan skills move commitment down playwright    # core → pluggable (auto-install)
shan skills move scope down tips,linear        # batch move
```

Undo/redo fully supported for all move operations via composite history entries.

### `skills doctor [--no-fix]`

Run aspect-based health checks. Default: detect + auto-fix. Use `--no-fix` for report-only mode.

**13 aspects:** broken-symlink (with git rename detection), state-drift, new-leaf, stale-router, orphaned-router, orphaned-scope, stale-gitignore, frontmatter-mismatch, name-conflict, duplicate-name, shadow, stale-shadow, cross-scope-install.

```bash
shan skills doctor                             # detect + auto-fix
shan skills doctor --no-fix                    # report only
```

### `skills migrate [--execute]`

Migrate from flat `skill-inventory/` to hierarchical `skills-library/`. Dry-run by default.
