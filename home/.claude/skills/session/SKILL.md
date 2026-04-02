---
name: session
description: Manage the repo's worktree sessions. Use when the user asks to sync `.session` or `.sessions`, inspect the active session, create or repair session links, or migrate the repo to the shared-session workflow.
---

# Session

Use the session CLI for all agent-driven session operations:

```bash
~/.claude/skills/session/scripts/session.sh <command>
```

## Routing Invariant

For normal task execution sourced from session files:

- `.session/` in the current checkout is the only authoritative session entrypoint.
- Treat the current checkout/worktree as the execution target by default.
- Do not use `.sessions/` backing-store paths, symlink targets, or storage location to decide which repo/worktree to edit.
- Do not switch repos because a session file contains absolute paths or source-context references. Those are reference material unless the user explicitly says otherwise.
- Use `.sessions/` only when the task is specifically about session plumbing: sync, doctor, repair, migration, or debugging the session system itself.

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

Sessions are **issue-scoped**, not worktree-scoped. All branches containing the same issue key (e.g. `HEA-1234`) share a single session directory. This is intentional: multiple worktrees for the same issue converge on the same mission, decisions, and named task-list files.

For branches without an issue key, the session key is the slugified branch name.

## Conventions

- Shared store: `.sessions/<session-key>/`
- Canonical file: `.sessions/<session-key>/SESSION.md`
- Named task files: `.sessions/<session-key>/tasks/<name>.md`
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

`## Tasks` selects the current named task file:

```md
## Tasks

### Current List

- `tree-lib-baseline`
```

The corresponding task file lives at:

```text
.session/tasks/tree-lib-baseline.md
```

Each task file must contain:

- `### Active`
- `### Todo`
- `### Done`

The `doctor` command validates that `SESSION.md` has the required sections, that `### Current List` resolves to a task-list name, and that the selected task file exists with the required task-file sections.

## Execution Preflight

Before doing substantial work from a session handoff:

1. Read `.session/SESSION.md` from the current checkout.
2. Read the current named task file from `.session/tasks/<name>.md`, where `<name>` comes from `### Current List` in `.session/SESSION.md`.
3. Treat `.session/plans/` and `.session/reviews/` in the current checkout as the relevant supporting material.
4. Keep the current checkout as the execution target unless the user explicitly instructs a repo switch.
