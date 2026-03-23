---
name: dispatch
description: >-
  Dispatch work to parallel Claude Code sessions via cmux workspaces.
  Use this skill whenever you need to hand off one or more independent tasks
  to separate Claude instances — for example, when acting as a dispatcher and
  the user asks you to "run these prompts", "fan out", "spawn sessions",
  "dispatch these tasks", or when you've prepared prompts that should each
  run in their own Claude session. This is agent-invokeable only — the agent
  uses it to launch work, not the user directly. Always prefer this over
  asking the user to copy-paste prompts into new terminals.
---

# Dispatch

Launch Claude Code sessions in new cmux workspaces. Each dispatch creates an
isolated workspace, starts claude with the prompt, and never steals focus from
the user's current terminal.

## When to use

- You've prepared multiple independent prompts (e.g. "fix tests" + "push to CI")
- The user asks you to kick off parallel work
- You're acting as a coordinator and need to hand off tasks

## How it works

1. **Write the prompt** to a temp file (avoids all quoting/escaping issues)
2. **Write a launcher script** that:
   - Forks a background job to name the session by appending `custom-title` +
     `agent-name` entries to the JSONL (same thing `/rename` does internally)
   - `exec`s claude with `--session-id` and the prompt read from file
3. **Pick a group color** — read the parent workspace's `dispatch-group` status
   color. If it has one, reuse it. If not, scan all workspaces for taken colors
   and pick the first unused color from the palette, then set it on the parent too.
4. **Create a cmux workspace** with `--command` — runs the launcher immediately,
   never steals focus, requires no polling and no `cmux send`
5. **Name the workspace** as `{parent} › {slug}` so children are instantly
   recognizable as belonging to the parent workspace
6. **Reorder adjacent** — move the new workspace immediately after the parent
   (or after the last sibling from this batch) so the dispatch group is
   contiguous in the sidebar
7. **Set group color + origin status** — color-code the group and add a
   `dispatch-origin` status line showing `↑ {parent}` on each child card

No shell prompt polling. No `cmux send`. No `cmux read-screen`. No focus change.
The workspace gets its own terminal process running claude from the start, and
the session is named for `claude --resume <slug>` without any terminal interaction.

## Timing and Patience

Do not assume a Claude review, audit, or large analysis is hung just because it
is quiet.

Rules:

- For large reviews, audits, or corpus-scale analysis, be willing to wait up to
  10 minutes before declaring the run stuck.
- Prefer patient polling over killing and restarting. Restart churn wastes more
  time than a quiet long-running review.
- Only declare a run stuck early if there is hard evidence of failure: the
  process exited non-zero, auth failed, the session never started, or the
  command is clearly wedged without a Claude process behind it.
- If the user is waiting on a review result, tell them the expected turnaround
  up front instead of improvising impatience mid-run.
- When you need captured findings rather than pure fire-and-forget dispatch, a
  headless `claude -p` review is valid, and the same 10-minute patience rule
  applies for large prompts or large diffs.

## Why workspaces, not surfaces (tabs)

Surfaces (tabs) steal keyboard focus when created — the new tab grabs input and
the user's keystrokes bleed into it. Workspaces don't auto-focus. They appear in
the sidebar but the user stays where they are.

Each workspace also gets its own sidebar status via the claude hook integration,
so the user sees per-task progress indicators (working/ready/blocked).

## Slug naming

Keep slugs short (2-4 words), kebab-case, action-oriented:

- `e2e-importer-fixes` not "Run the e2e test suite for the importer"
- `ci-check-push` not "Push and fix CI failures"
- `lint-step3-cleanup` not "Fix lint warnings in Step3OfferMapping.tsx"

## Implementation

The dispatch script lives at `~/.claude/skills/dispatch/dispatch.sh`.

```bash
# Usage:
~/.claude/skills/dispatch/dispatch.sh <slug> <prompt-file> [cwd]
```

For multiple dispatches in sequence, the script exports `DISPATCH_LAST_WS` so
subsequent calls chain adjacently in the sidebar.

### Writing prompt files

Write each prompt to a temp file. Use heredocs with single-quoted delimiters
to avoid shell expansion:

```bash
cat > /tmp/dispatch-1.txt << 'PROMPT_EOF'
Your multi-line prompt here.
It can contain "quotes", 'apostrophes', $variables, and **markdown** safely.
PROMPT_EOF
```

## Example: dispatching two tasks

```bash
# Task 1
cat > /tmp/dispatch-1.txt << 'PROMPT_EOF'
Run the importer e2e tests. Fix any failures and commit.
PROMPT_EOF

~/.claude/skills/dispatch/dispatch.sh "e2e-importer-fixes" /tmp/dispatch-1.txt ~/projects/myapp

# Task 2
cat > /tmp/dispatch-2.txt << 'PROMPT_EOF'
Push and monitor CI checks on PR #822. Fix failures and re-push until green.
PROMPT_EOF

~/.claude/skills/dispatch/dispatch.sh "ci-check-push" /tmp/dispatch-2.txt ~/projects/myapp

# Clean up
rm /tmp/dispatch-1.txt /tmp/dispatch-2.txt
```

Both sessions launch instantly in parallel workspaces. The user stays in their
current terminal the entire time. If the parent workspace is named `subimp-ui`,
the sidebar shows:

```
  subimp-ui                    ← parent
  subimp-ui › e2e-importer-fixes  ← child 1 (adjacent)
  subimp-ui › ci-check-push       ← child 2 (adjacent)
```

Each child also has a `↑ subimp-ui` status line on its sidebar card.

## Fallback: headless dispatch

Use only when:

- cmux is unavailable or failing, and
- the user explicitly approves headless mode

Do not silently substitute this for the main workflow.

Headless dispatch launches `claude -p` processes instead of interactive sessions.
Only for prompts that are self-contained and need no clarifying questions.

Prefer this for:

- second-opinion review passes
- architecture critique
- narrow textual analysis

Avoid this for:

- implementation work that may need clarification
- tasks that rely on approvals or interactive tool use
- long-running tasks where you expect back-and-forth

```bash
claude -p \
  --tools "" \
  --no-session-persistence \
  --permission-mode dontAsk \
  "$PROMPT"
```

## Important notes

- Each dispatched session is fully independent — include all necessary context
  in the prompt (directory path, branch name, file paths, what was already done).
- Sessions are **automatically named** via external JSONL append (mimics
  `/rename` without needing `cmux send`). The slug appears in both the cmux
  sidebar and `claude --resume` history.
- To follow a dispatched task: switch to its workspace in the cmux sidebar.
- To resume after disconnect: `claude --resume <slug>` or `claude -c` in the
  task's directory.
- Dispatches are instant and parallel — no sequential boot waiting.
- Clean up temp prompt files after dispatch: `rm /tmp/dispatch-*.txt`
- The launcher script is temporary and removed automatically by `dispatch.sh`
- To open a markdown file for viewing, use `cmux markdown open <path>` — not
  `cmux open <path>` (which only works for directories). The markdown viewer
  renders formatted content with live reload.
