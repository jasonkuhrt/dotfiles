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
dependencies:
  - cmux
---

# Dispatch

Launch Claude Code sessions in new cmux workspaces. Each dispatch creates an
isolated workspace, starts claude with the prompt, and never steals focus from
the user's current terminal.

This skill depends on `cmux`. Turning `dispatch` on through shan should also
turn on `cmux`, because every real dispatch workflow uses the cmux CLI and its
workspace model.

## When to use

- You've prepared multiple independent prompts (e.g. "fix tests" + "push to CI")
- The user asks you to kick off parallel work
- You're acting as a coordinator and need to hand off tasks

## How it works

1. **Write the prompt** to a temp file (avoids all quoting/escaping issues)
2. **Write a launcher script** that:
   - `exec`s claude with `--session-id`, `--name`, and the prompt read from file
   - removes its temp prompt + launcher files after startup
3. **Pick a group color** — read the parent workspace's `dispatch-group` status
   color. If it has one, reuse it. If not, scan all workspaces for taken colors
   and pick the first unused color from the palette, then set it on the parent too.
4. **Create a cmux workspace** with `--name` + `--cwd`, then poll `cmux tree`
   for the first terminal surface
5. **Name the workspace** as `{parent} › {slug}` so children are instantly
   recognizable as belonging to the parent workspace
6. **Reorder adjacent** — move the new workspace immediately after the parent
   (or after the last sibling from this batch) so the dispatch group is
   contiguous in the sidebar
7. **Set group color + origin status** — color-code the group and add a
   `dispatch-origin` status line showing `↑ {parent}` on each child card
8. **Warm the PTY without stealing focus** — cmux lazy-spawns terminal
   processes on first focus, so a brand-new workspace's surface has no shell
   to receive input until something focuses it. Dispatch:
   - records the user's currently-selected workspace in the caller's window,
   - calls `cmux focus-pane` on the new pane to force the PTY to spawn,
   - polls `cmux read-screen` until fish's prompt is visible,
   - calls `cmux select-workspace` to put the user's view back,
   - then sends a single atomic `cmux send` containing `Ctrl-C` + the launcher
     command + `\n` (`\003bash /tmp/dispatch-.../launch.sh\n`). One socket
     round-trip — no race window between the vi-NORMAL reset and the body.

## Why each step is load-bearing (cmux 0.64.6 audit, 2026-05-14)

The four-step dance survived an empirical audit against every cmux primitive
that could plausibly subsume it. Each step is pinned to a concrete cmux
behavior that has no workaround. Do not strip a step without re-running the
matching test.

| Step | Why it exists | Audit evidence |
|------|---------------|----------------|
| `focus-pane` to warm the PTY | cmux 0.64.6 lazy-spawns terminal PTYs on first focus. `cmux send` succeeds (returns `OK`) but the bytes are queued into a surface that doesn't yet exist; `cmux read-screen` reports "Terminal surface not found" until something focuses the pane. | `new-workspace --command "echo X > /tmp/F"` against an unfocused workspace produces no file and no readable surface. |
| `read-screen` prompt-glyph poll | cmux emits `workspace.created` / `surface.created` / `surface.focused` events but **no `shell.ready` / `pty.spawned` event**. `surface-health.in_window` toggles with workspace visibility (it flips back to `false` after `select-workspace` restore), so it cannot be used as a readiness signal. The prompt-glyph regex is the only deterministic signal available without a fish shell-integration script (cmux ships bash + zsh integrations only). | `cmux events --no-heartbeat` during workspace creation shows the structural events but no readiness event; `surface-health.in_window` was `false` even after the prompt glyph appeared, because the user's view had been restored. |
| `select-workspace` to restore the user's view | `focus-pane --workspace W --pane P` selects workspace W in its window — not just the pane within it. Verified: caller workspace flipped from `workspace:5` → `workspace:55` after `focus-pane`. The dispatch contract is "user's focus never moves," so we must select back. | Test L in the audit. |
| Atomic `\003` + command + `\n` in one `cmux send` | Fresh fish sessions on this machine land in vi-NORMAL mode (the `❮` prompt glyph confirms this). Without the leading `Ctrl-C`, `e`, `c`, `h`, `o` of `echo …` are eaten as motions and the `o` opens a new INSERT line, producing "fish: Unknown command: o". The atomic single-send form (`$'\003'"…"$'\n'`) collapses what used to be two sends with a 100ms sleep between them. | Test D / E (vi-NORMAL trap reproduced visually); Test I (atomic send confirmed working). |

### Alternatives considered and ruled out

| Alternative | Why rejected |
|-------------|--------------|
| `new-workspace --command "…"` | Same lazy-PTY trap — the command is sent before the PTY exists. With `--focus true` to force the spawn, it both steals focus AND still races vi-NORMAL. |
| `new-workspace --layout '{"pane":{"surfaces":[{"type":"terminal","command":"…"}]}}'` | Layout-embedded commands race the same lazy-PTY + vi-NORMAL window; no file produced in the test. |
| `cmux paste-buffer` after `cmux set-buffer` | Does not use bracketed paste in a way that fish vi-mode honors as a literal block. First chars still get consumed as motions. No improvement over `cmux send`. |
| `cmux respawn-pane --command "…"` | Identical to `cmux send` semantics for our case. Needs focus-pane first (same lazy-PTY trap) and still races vi-NORMAL. |
| `cmux events --name <shell-ready-event>` | No such event is emitted. Only structural lifecycle events (`workspace.created`, `surface.created`, `surface.focused`, `surface.selected`, `pane.focused`) exist. |
| `cmux surface-health.in_window` as a readiness gate | Means "is this surface currently visible in its window's selected workspace" — flips back to `false` once we restore the user's view, so it's the wrong semantic. |
| `cmux set-hook <event> <command>` | tmux-compat hook event names are not the cmux structural events; no documented hook for "PTY spawned" or "shell prompt printed." |

### When to re-audit

Re-run the audit if any of the following ship upstream:

- A `shell.ready`, `pty.spawned`, or `surface.alive` event on `cmux events`.
- A `--wait-for-ready` / `--wait-shell` flag on `cmux send` or `cmux new-workspace`.
- A fish shell-integration script in `/Applications/cmux.app/Contents/Resources/shell-integration/` (currently bash and zsh only).
- A `new-workspace --no-focus-warm` or similar primitive that spawns the PTY eagerly without focusing.

The workspace gets its own terminal process running Claude, and the session is
named for `claude --resume <slug>` via Claude's native `--name` flag.

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

## Workspace naming

Keep names short (2-4 words), title case, action-oriented:

- `E2E Importer Fixes` not "Run the e2e test suite for the importer"
- `CI Check Push` not "Push and fix CI failures"
- `Lint Step3 Cleanup` not "Fix lint warnings in Step3OfferMapping.tsx"

Names must be unique across active workspaces. Avoid names that are substrings of
other workspace names — `find-window` uses substring matching, so `Fix Tests` would
ambiguously match both itself and `Fix Tests E2E`.

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

~/.claude/skills/dispatch/dispatch.sh "E2E Importer Fixes" /tmp/dispatch-1.txt ~/projects/myapp

# Task 2
cat > /tmp/dispatch-2.txt << 'PROMPT_EOF'
Push and monitor CI checks on PR #822. Fix failures and re-push until green.
PROMPT_EOF

~/.claude/skills/dispatch/dispatch.sh "CI Check Push" /tmp/dispatch-2.txt ~/projects/myapp

# Clean up
rm /tmp/dispatch-1.txt /tmp/dispatch-2.txt
```

Both sessions launch instantly in parallel workspaces. The user stays in their
current terminal the entire time. If the parent workspace is named `Subimp UI`,
the sidebar shows:

```
  Subimp UI                      ← parent
  Subimp UI › E2E Importer Fixes    ← child 1 (adjacent)
  Subimp UI › CI Check Push         ← child 2 (adjacent)
```

Each child also has a `↑ Subimp UI` status line on its sidebar card.

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

## Communicating with dispatched workspaces

After dispatching, you may need to send follow-up messages to a running workspace
(e.g., adding requirements, relaying a bug found by a sibling). Use the cross-workspace
send pattern from the cmux skill:

```bash
# Resolve the workspace name to a ref
ws_ref=$(cmux --json find-window "E2E Importer Fixes" | jq -r '.matches[0].ref')

# Send the message
cmux send --workspace "$ws_ref" "Also fix the timezone handling in parse_date"
cmux send-key --workspace "$ws_ref" enter
```

**Never** use `cmux send "workspace-name" "message"` — this sends both strings as text
to your own workspace. The `--workspace` flag requires a ref (`workspace:N`), not a name.
Use `find-window` to resolve names to refs.

If `find-window` returns no matches or multiple ambiguous matches, **do not send to any
workspace**. Tell the user what you searched for, what was found (or not), and that you
cannot reliably identify the target. Let the user resolve it.

For reading a workspace's terminal output:

```bash
ws_ref=$(cmux --json find-window "E2E Importer Fixes" | jq -r '.matches[0].ref')
cmux read-screen --workspace "$ws_ref" --scrollback --lines 50
```

## Important notes

- Each dispatched session is fully independent — include all necessary context
  in the prompt (directory path, branch name, file paths, what was already done).
- Sessions are **automatically named** via Claude's native `--name` flag. The
  slug appears in both the cmux sidebar and `claude --resume` history.
- To follow a dispatched task: switch to its workspace in the cmux sidebar.
- To resume after disconnect: `claude --resume <slug>` or `claude -c` in the
  task's directory.
- Dispatches are instant and parallel — no sequential boot waiting.
- Clean up temp prompt files after dispatch: `rm /tmp/dispatch-*.txt`
- The launcher script is temporary and removed automatically by `dispatch.sh`
- To open a markdown file for viewing, use `cmux markdown open <path>` — not
  `cmux open <path>` (which only works for directories). The markdown viewer
  renders formatted content with live reload.
- For CI check workflows, dispatched agents can follow the `gh/pr` checks skill
  which provides a complete analyze-fix-push-watch loop.
- Dispatched agents that need to poll (CI status, deploy health, etc.) can use
  `/loop` for recurring checks rather than implementing manual polling.
