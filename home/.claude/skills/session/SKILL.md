---
name: session
description: Manage the repo's worktree sessions. Use when the user asks to sync `.session` or `.sessions`, inspect the active session, create or repair session links, or migrate the repo to the shared-session workflow.
---

# Session

Use the skill-local CLI for all agent-driven session operations:

```bash
.claude/skills/session/scripts/session.sh <command>
```

Commands:

- `status` — show the current checkout, branch, session key, and active paths
- `sync` — ensure the shared `.sessions/` store, current session directory, and local `.session` symlink exist for the current checkout
- `sync-all` — run `sync` across every current git worktree in the repo
- `hook-sync` — same behavior as `sync`, intended for git hook automation

The CLI lives at `.claude/skills/session/scripts/session.sh` and is implemented with `argc`.

## Missing `argc`

If `argc` is not installed, the CLI prints a warning and exits without changing anything. This is intentional so hook automation degrades safely on systems that do not have the binary.

## Conventions

- Shared store: `.sessions/<session-key>/`
- Canonical file: `.sessions/<session-key>/SESSION.md`
- Accumulating support material:
  - `.sessions/<session-key>/plans/`
  - `.sessions/<session-key>/reviews/`
- Active selector: `.session -> .sessions/<session-key>`

`<session-key>` resolution:

1. Use `HEA-\d+` from the current branch name when present.
2. Otherwise slugify the full branch name.

`SESSION.md` must contain exactly:

- `Mission`
- `Decisions`
- `Tasks`

`Tasks` uses markdown checkboxes.
