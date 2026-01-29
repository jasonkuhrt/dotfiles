# Epic Fanout

## Steps

### 1. Select epic

Check conversation context for an already-identified epic. If none, run `bd epic status` and present candidates to user with AskUserQuestion.

If user provides a loose set of beads instead of an epic, suggest creating an epic to group them first — epics give completion tracking (`bd epic status`) and close-eligibility (`bd epic close-eligible`) for free.

### 2. Inspect children

```bash
bd show <EPIC_ID> --children
```

List all open children. If two children might touch the same files, warn user and suggest running those sequentially.

### 3. Create task list

One TaskCreate per actionable child:

```
TaskCreate:
  subject: <child title>
  description: "Bead <CHILD_ID> (epic <EPIC_ID>). Run `bd show <CHILD_ID>` for full details."
  activeForm: "Working on <child title>"
```

If children have dependency relationships (`bd show` shows BLOCKS/BLOCKED BY), mirror those with `TaskUpdate` using `addBlockedBy`. CC's task system handles execution ordering — only spawn agents for tasks whose `blockedBy` are all completed.

### 4. Execute

Work through the task list, spawning parallel `Task(general-purpose, run_in_background: true)` agents for ready tasks (those whose `blockedBy` are all completed).

Prompt template per agent:

```
You are completing bead <CHILD_ID> (part of epic <EPIC_ID>) in <REPO_PATH>.

First, run `bd prime` to load beads workflow context.
Then run `bd show <CHILD_ID>` for the full issue, and do the work.

## Fanout overrides
These override the standard session close protocol from bd prime:

- **Commit** using parallel-safe pathspec mode (see git:parallel-commit skill):
  git add <new-files>  # only needed for untracked files
  git commit -m "<child title>: <summary>" -- <all changed files>
  If commit fails with index.lock error, sleep 1 and retry (up to 3 times).
- **Close** the bead with `bd close <CHILD_ID> --reason="..."`
- **Skip** the rest of the session close protocol (bd sync, git push) —
  the orchestrator handles that.

Only modify files relevant to this bead. Other agents are running concurrently on non-overlapping files.
```

### 5. Wrap up

After all tasks are completed:

1. Check epic completion: `bd epic status`
2. If all children are done: `bd epic close-eligible` (auto-closes the epic)
3. `bd sync`
4. Commit beads state: `git add .beads/issues.jsonl && git commit -m "chore(beads): sync"`

## Rules

* __Start from an epic.__ Fanout operates on an epic's children, not arbitrary loose beads. If the work isn't already grouped, create an epic first.
* __Non-overlapping files required.__ Parallel commits are safe only when agents touch disjoint file sets. If overlap is detected, fall back to sequential.
* __Agents self-commit.__ Each agent commits its own work via `git commit -- <paths>` which uses `--only` mode — atomic, no staging area cross-contamination.
* __Close reason captures context.__ The `--reason` preserves what happened for future sessions reading dependency chains.
* __Child deps → task deps.__ When children have dependency relationships, mirror them with `addBlockedBy` on CC tasks. CC's task list system handles the rest.
