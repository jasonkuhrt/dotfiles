---
name: dispatch
description: >-
  Dispatch work to parallel Claude Code sessions via cmux terminal surfaces.
  Use this skill whenever you need to hand off one or more independent tasks
  to separate Claude instances — for example, when acting as a dispatcher and
  the user asks you to "run these prompts", "fan out", "spawn sessions",
  "dispatch these tasks", or when you've prepared prompts that should each
  run in their own Claude session. This is agent-invokeable only — the agent
  uses it to launch work, not the user directly. Always prefer this over
  asking the user to copy-paste prompts into new terminals.
---

# Dispatch

Launch one or more Claude Code sessions in new cmux terminal surfaces, each
with its own prompt and a named session. This lets you act as a dispatcher —
prepare prompts and fan them out to parallel sessions without the user
copy-pasting anything.

## When to use

- You've prepared multiple independent prompts (e.g. "fix tests" + "push to CI")
- The user asks you to kick off parallel work
- You're acting as a coordinator and need to hand off tasks

## How it works

For each prompt you want to dispatch:

1. **Pick a slug name** — a short 2-4 word kebab-case label that captures the
   task's intent (e.g. `e2e-importer-fixes`, `ci-check-push`). This slug is
   reused for both the cmux tab name and the Claude Code session name, so the
   user sees the same label everywhere — in their cmux tabs and in
   `claude --resume` history.
2. **Create a new cmux terminal surface**
3. **Rename the tab** to the slug
4. **Wait for the shell prompt** — new surfaces need time to initialize; sending
   input too early drops characters
5. **Launch `claude` in interactive mode** using vi-mode-safe send (Escape+i prefix)
6. **Wait for the Claude Code prompt** — poll `cmux read-screen` for the `tokens`
   status bar indicator plus the `❯` input prompt
7. **Send `/rename <slug>`** to name the Claude Code session (before the task
   prompt — the task has unbounded turn time)
8. **Wait for the Claude Code prompt** again
9. **Send the task prompt**

## Fallback: headless dispatch

Use this only when:

- the normal `cmux` interactive flow is unavailable or failing, and
- the user is explicitly okay with a headless dispatch

Do not silently substitute this for the main workflow.

Headless dispatch means launching independent `claude -p` processes instead of
interactive Claude Code sessions. This is acceptable only for prompts that are
self-contained and do not require clarifying questions, interactive follow-up,
or approval-gated tool use.

Prefer this for:

- second-opinion review passes
- architecture critique
- narrow textual analysis

Avoid this for:

- implementation work that may need clarification
- tasks that rely on approvals or interactive tool use
- long-running tasks where you expect back-and-forth with the spawned agent

Recommended invocation pattern for review-only fallback:

```bash
claude -p \
  --tools "" \
  --no-session-persistence \
  --permission-mode dontAsk \
  "$PROMPT"
```

Notes:

- `--tools ""` keeps the run truly headless and avoids tool/MCP variance.
- The prompt must include all required context because the spawned process
  cannot ask useful follow-up questions.
- Treat each headless run as a one-shot review worker; poll the process and
  collect stdout when it completes.
- This is a fallback, not a replacement for the main `cmux` dispatch flow.

## Slug naming

Keep slugs short (2-4 words), kebab-case, action-oriented:

- `e2e-importer-fixes` not "Run the e2e test suite for the importer"
- `ci-check-push` not "Push and fix CI failures"
- `lint-step3-cleanup` not "Fix lint warnings in Step3OfferMapping.tsx"

The slug derives from the sense of the task you're dispatching. Since you wrote
the prompt, you understand the task — pick a name that will help the user
identify the session at a glance.

## Implementation

Use this bash script pattern for each dispatch. The `wait_for_*` functions
poll `cmux read-screen` until the expected prompt appears, making the sequence
reliable without arbitrary sleeps.

```bash
#!/usr/bin/env bash

# Wait for a shell prompt on a new surface. New surfaces need time for
# the shell to initialize — sending input before the prompt appears
# causes characters to be dropped.
wait_for_shell() {
  local surface="$1"
  local max_wait="${2:-15}"
  local elapsed=0
  while (( elapsed < max_wait )); do
    local screen
    screen=$(cmux read-screen --surface "$surface" --lines 3 2>/dev/null)
    # Match fish vi-mode prompts (❮ normal, ❯ insert) and common shells (> $ %)
    if echo "$screen" | grep -qE '[❯❮>$%] *$'; then
      return 0
    fi
    sleep 0.5
    (( elapsed++ ))
  done
  echo "Timed out waiting for shell on $surface" >&2
  return 1
}

# Wait for Claude Code's ❯ prompt on a surface. Distinguishes Claude
# from a plain shell by requiring "tokens" in the status bar.
wait_for_claude() {
  local surface="$1"
  local max_wait="${2:-45}"
  local elapsed=0
  while (( elapsed < max_wait )); do
    local screen
    screen=$(cmux read-screen --surface "$surface" --lines 8 2>/dev/null)
    # "tokens" appears in Claude Code's status bar, never in a plain shell
    if echo "$screen" | grep -q 'tokens'; then
      # Claude is running — check for input prompt (❯ at line start)
      if echo "$screen" | grep -qE '^❯'; then
        return 0
      fi
    fi
    sleep 1
    (( elapsed++ ))
  done
  echo "Timed out waiting for Claude prompt on $surface" >&2
  return 1
}

# Send text to a surface, handling fish vi-mode.
# Prefixes with Escape (ensure normal mode) + i (enter insert mode)
# so keystrokes aren't consumed as vi commands.
send_to_shell() {
  local surface="$1"
  local text="$2"
  cmux send --surface "$surface" -- $'\x1b'"i${text}"$'\n'
}

dispatch() {
  local slug="$1"
  local prompt_file="$2"

  # 1. Create surface and name the tab
  local output
  output=$(cmux new-surface 2>&1)
  local surface_ref
  surface_ref=$(echo "$output" | grep -oE 'surface:[0-9]+')
  cmux rename-tab --surface "$surface_ref" "$slug"

  # 2. Wait for the shell to be ready
  wait_for_shell "$surface_ref" || return 1

  # 3. Launch claude in interactive mode (vi-mode-safe send)
  send_to_shell "$surface_ref" "claude"

  # 4. Wait for Claude Code to be ready
  wait_for_claude "$surface_ref" || return 1

  # 5. Rename the session (before the task — task has unbounded turn time)
  cmux send --surface "$surface_ref" -- "/rename $slug"$'\n'

  # 6. Wait for prompt again
  wait_for_claude "$surface_ref" || return 1

  # 7. Send the task prompt (read from file to handle escaping)
  cmux send --surface "$surface_ref" -- "$(cat "$prompt_file")"$'\n'
}
```

### Writing prompt files

Write each prompt to a temp file to avoid shell escaping issues inside
`cmux send`. Use heredocs with single-quoted delimiters:

```bash
cat > /tmp/dispatch-1.txt << 'PROMPT_EOF'
Your multi-line prompt here.
It can contain "quotes" and 'apostrophes' and $variables safely.
PROMPT_EOF
```

## Example: dispatching two tasks

```bash
# Define the wait_for_shell, wait_for_claude, send_to_shell, and dispatch
# functions (from above), then:

# Task 1
cat > /tmp/dispatch-1.txt << 'PROMPT_EOF'
Run the importer e2e tests in ~/projects/heartbeat-chat/Heartbeat-subimp-ui.
Start by running npm run gen:persona, then
npm run test:e2e -- --project app --grep "importer".
Fix any failures and commit.
PROMPT_EOF

dispatch "e2e-importer-fixes" "/tmp/dispatch-1.txt"

# Task 2
cat > /tmp/dispatch-2.txt << 'PROMPT_EOF'
Push feat/hea-3849-subimp-ui and monitor CI checks on PR #822.
Fix any failures, commit, and re-push until green.
PROMPT_EOF

dispatch "ci-check-push" "/tmp/dispatch-2.txt"

# Clean up
rm /tmp/dispatch-1.txt /tmp/dispatch-2.txt
```

## Important notes

- Each dispatched session is fully independent — it has no shared context
  with the current conversation. Include all necessary context in the prompt
  (branch name, worktree path, file paths, what was already done).
- If you fall back to headless dispatch, confirm that the user is okay with a
  non-interactive worker before launching it.
- The slug appears in both the cmux tab and `claude --resume` history.
- Sessions are interactive (not `-p` mode), so they can ask clarifying
  questions or use tools that require user approval.
- The `wait_for_claude` poll has a 45-second timeout. If Claude Code takes
  longer to start (e.g. first launch, slow network), increase `max_wait`.
- Clean up temp files after dispatch: `rm /tmp/dispatch-*.txt`
- Dispatches are sequential (each waits for its Claude to boot before moving
  to the next). For many dispatches this adds up — but the actual task
  execution is parallel once all sessions are launched.
