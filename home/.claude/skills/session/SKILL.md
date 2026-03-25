---
name: session
description: Manage the repo's worktree sessions. Use when the user asks to sync `.session` or `.sessions`, inspect the active session, create or repair session links, or migrate the repo to the shared-session workflow.
---

# Session

Use the session CLI for all agent-driven session operations:

```bash
~/.claude/skills/session/scripts/session.sh <command>
```

Commands:

- `status` — show the current checkout, branch, session key, and active paths
- `sync` — ensure the shared `.sessions/` store, current session directory, and local `.session` symlink exist for the current checkout
- `sync-all` — run `sync` across every current git worktree in the repo
- `hook-sync` — sync for git hook automation (exits non-zero on failure, unlike older versions)
- `doctor` — diagnose and autofix all session wiring issues; validates SESSION.md content

The CLI is implemented with `argc`.

## Missing `argc`

If `argc` is not installed, the CLI prints a warning and exits without changing anything. This is intentional so hook automation degrades safely on systems that do not have the binary.

## Session Scoping

Sessions are **issue-scoped**, not worktree-scoped. All branches containing the same issue key (e.g. `HEA-1234`) share a single session directory. This is intentional: multiple worktrees for the same issue converge on the same mission, decisions, and task list.

For branches without an issue key, the session key is the slugified branch name.

## Conventions

- Shared store: `.sessions/<session-key>/`
- Canonical file: `.sessions/<session-key>/SESSION.md`
- Accumulating support material:
  - `.sessions/<session-key>/plans/`
  - `.sessions/<session-key>/reviews/`
- Active selector: `.session -> .sessions/<session-key>`

`<session-key>` resolution:

1. Extract `HEA-\d+` from the current branch name when present (issue-scoped).
2. Otherwise slugify the full branch name.

`SESSION.md` must contain these sections:

- `## Mission`
- `## Decisions`
- `## Tasks`

`Tasks` uses markdown checkboxes. The `doctor` command validates that all required sections are present.
