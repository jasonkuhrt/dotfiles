---
name: git
description: Use when performing git operations — syncing with remote, managing worktrees, committing changes, controlling commit mode, or running parallel commits. Covers sync workflows, worktree lifecycle, and commit conventions.
---

## Topics

### Sync
Sync local git state with remote: pull trunk, merge feature branches, push, sync tags, cleanup merged PRs.
- [Overview](reference/sync/overview.md)
- [Flow diagram](reference/sync/flow.d2)

### Worktree
Create isolated git worktrees with environment auto-detection, dependency install, and Claude Code pre-trust.
- [Overview](reference/worktree/overview.md)
- [Worktree vs branch comparison](reference/worktree/worktree-comparison.md)

### Commit
Thread-scoped git commits with permission checks. Only commit what YOU changed for THIS task.
- [Overview](reference/commit/overview.md)

### Mode Control
Gate git commit/push behind persistent or one-time permission modes.
- [Overview](reference/mode-control/overview.md)

### Parallel Commit
Safe concurrent git commits from parallel agents using `git commit -- <paths>`.
- [Overview](reference/parallel-commit/overview.md)

## Scripts

### Sync
- `scripts/sync-gather.sh` — Collect repository state for planning (orchestrator)
- `scripts/sync-gather-static.sh` — Gather static repo info (trunk, dirs, gh availability)
- `scripts/sync-gather-branches.sh` — Gather branches not in worktrees with PR status
- `scripts/sync-gather-worktrees.sh` — Gather worktree info with PR status
- `scripts/sync-gather-tags.sh` — Gather tag conflicts between local and remote

### Worktree
- `scripts/worktree-resolve-paths` — Resolve worktree-related paths (JSON output)
- `scripts/worktree-copy-env` — Auto-detect and copy common gitignored files to new worktree
- `scripts/worktree-pre-trust` — Pre-trust directory in Claude Code (~/.claude.json)

## Schemas
- `schemas/sync-plan.schema.json` — Plan written to .claude/git-sync-plan.json
- `schemas/sync-repository-state.schema.json` — Output from sync-gather.sh

## Templates
- `templates/sync-plan-preview.tpl.md` — Plan preview table (tags + branches)
- `templates/sync-rescue-warning.tpl.md` — Warning when rescue branch is created
- `templates/sync-results.tpl.md` — Execution results summary
- `templates/sync-tag-conflict.tpl.md` — Tag conflict display
- `templates/sync-trunk-dirty.tpl.md` — Trunk dirty/unpushed halt message
