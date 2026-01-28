---
name: beads:fanout
description: Orchestrate parallel subagents to work on multiple ready beads concurrently. Use when multiple unblocked beads can be worked on independently, or when the user asks to fan out, parallelize, or batch-process beads.
---

# Beads Fanout

Parallel bead completion where each agent commits independently.

## Steps

### 1. Select beads

Check conversation context for already-identified beads. If none, run `bd ready` and present candidates to user with AskUserQuestion (multi-select).

If two beads might touch the same files, warn user and suggest running those sequentially.

### 2. Create task list

One TaskCreate per selected bead:

```
TaskCreate:
  subject: <bead title>
  description: "Bead <ID>. Run `bd show <ID>` for full details."
  activeForm: "Working on <bead title>"
```

### 3. Spawn subagents

Launch all agents in a **single message** (parallel) using `Task(<agent_type>, run_in_background: true)`. Choose the agent type that best fits each bead's work (e.g. `general-purpose` for implementation, `Explore` for research, `Bash` for script-heavy tasks).

Prompt template per agent:

```
You are completing bead <ID> in <REPO_PATH>.

First, run `bd prime` to load beads workflow context.
Then run `bd show <ID>` for the full issue, and do the work.

## Fanout overrides
These override the standard session close protocol from bd prime:

- **Commit** using parallel-safe pathspec mode (see git:parallel-commit skill):
  git add <new-files>  # only needed for untracked files
  git commit -m "<bead title>: <summary>" -- <all changed files>
  If commit fails with index.lock error, sleep 1 and retry (up to 3 times).
- **Close** the bead with `bd close <ID> --reason="..."`
- **Skip** the rest of the session close protocol (bd sync, git push) —
  the orchestrator handles that.

Only modify files relevant to this bead. Other agents are running concurrently on non-overlapping files.
```

### 4. Wrap up

As each agent completes, TaskUpdate the corresponding task to `completed`.

After all agents finish:

1. `bd sync`
2. Commit the beads state: `git add .beads/issues.jsonl && git commit -m "chore(beads): sync"`

## Rules

- **Non-overlapping files required.** Parallel commits are safe only when agents touch disjoint file sets. If overlap is detected, fall back to sequential.
- **Agents self-commit.** Each agent commits its own work via `git commit -- <paths>` which uses `--only` mode — atomic, no staging area cross-contamination. See `git:parallel-commit` skill.
- **Close reason captures context.** The `--reason` preserves what happened for future sessions reading dependency chains.
