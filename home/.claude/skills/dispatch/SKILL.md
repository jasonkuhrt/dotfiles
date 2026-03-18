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

```bash
# Palette for dispatch grouping — visually distinct, sidebar-friendly
DISPATCH_COLORS=(
  "#FF6B6B"  # red
  "#8B5CF6"  # purple
  "#F59E0B"  # amber
  "#10B981"  # emerald
  "#3B82F6"  # blue
  "#EC4899"  # pink
  "#14B8A6"  # teal
  "#F97316"  # orange
)

# Get the title of a workspace by its ref (e.g. "workspace:7" → "dotfiles")
get_workspace_title() {
  local ws_ref="$1"
  cmux list-workspaces 2>/dev/null \
    | grep "$ws_ref" \
    | sed -E 's/^[* ]+workspace:[0-9]+ +//' \
    | sed 's/ *\[selected\] *$//'
}

# Track the tail of the current dispatch batch for adjacency ordering.
# First dispatch goes after the parent; subsequent ones chain after siblings.
_DISPATCH_LAST_WS=""

# Pick a dispatch-group color not already used by any workspace
pick_group_color() {
  local taken=()
  while IFS= read -r ws; do
    local c
    c=$(cmux list-status --workspace "$ws" 2>/dev/null \
        | grep "^dispatch-group=" | grep -oE 'color=#[0-9A-Fa-f]+' | sed 's/color=//')
    [[ -n "$c" ]] && taken+=("$c")
  done < <(cmux list-workspaces 2>/dev/null | grep -oE 'workspace:[0-9]+')

  for color in "${DISPATCH_COLORS[@]}"; do
    local used=false
    for t in "${taken[@]}"; do
      [[ "$color" == "$t" ]] && used=true && break
    done
    $used || { echo "$color"; return; }
  done
  echo "${DISPATCH_COLORS[0]}"  # all taken — cycle
}

dispatch() {
  local slug="$1"
  local prompt_file="$2"
  local cwd="${3:-$(pwd)}"

  # Resolve claude's absolute path — the --command shell may lack full PATH
  local claude_bin
  claude_bin=$(command -v claude)

  # Pre-generate a session UUID so we can name the session externally
  local session_id
  session_id=$(uuidgen | tr '[:upper:]' '[:lower:]')

  # Derive the project dir where CC stores the session JSONL
  local project_dir
  project_dir=$(echo "$cwd" | tr '/' '-')
  local jsonl="$HOME/.claude/projects/${project_dir}/${session_id}.jsonl"

  # Write launcher script.
  # 1. Fork a background job that waits for the JSONL to appear, then appends
  #    the two rename entries (custom-title + agent-name). This mimics what
  #    /rename does internally, without needing cmux send.
  # 2. exec claude with --session-id and the prompt from file.
  local launcher="/tmp/dispatch-${slug}.sh"
  cat > "$launcher" << LAUNCHER
#!/usr/bin/env bash
cd $(printf '%q' "$cwd")

# Background: name the session once JSONL exists
(
  for i in \$(seq 1 60); do
    [[ -f $(printf '%q' "$jsonl") ]] && break
    sleep 0.5
  done
  if [[ -f $(printf '%q' "$jsonl") ]]; then
    printf '%s\n' '{"type":"custom-title","customTitle":"${slug}","sessionId":"${session_id}"}' >> $(printf '%q' "$jsonl")
    printf '%s\n' '{"type":"agent-name","agentName":"${slug}","sessionId":"${session_id}"}' >> $(printf '%q' "$jsonl")
  fi
) &

exec ${claude_bin} --session-id '${session_id}' -- "\$(cat $(printf '%q' "$prompt_file"))"
LAUNCHER
  chmod +x "$launcher"

  # --- Resolve parent workspace ---
  local caller_ws="${CMUX_WORKSPACE_ID:-}"
  local parent_title=""

  if [[ -n "$caller_ws" ]]; then
    parent_title=$(get_workspace_title "$caller_ws")
  fi

  # --- Workspace naming ---
  # Prefix with parent title so children are instantly recognizable
  local ws_title
  if [[ -n "$parent_title" ]]; then
    ws_title="${parent_title} › ${slug}"
  else
    ws_title="$slug"
  fi

  # --- Workspace grouping ---
  # Match parent's dispatch-group color, or pick a fresh one for both
  local group_color=""

  if [[ -n "$caller_ws" ]]; then
    group_color=$(cmux list-status --workspace "$caller_ws" 2>/dev/null \
                  | grep "^dispatch-group=" | grep -oE 'color=#[0-9A-Fa-f]+' | sed 's/color=//')
  fi

  if [[ -z "$group_color" ]]; then
    group_color=$(pick_group_color)
    # Parent has no color yet — set it
    if [[ -n "$caller_ws" ]]; then
      cmux set-status "dispatch-group" "●" --icon "circle.fill" --color "$group_color" --workspace "$caller_ws"
    fi
  fi

  # --- Create workspace ---
  local ws_id
  ws_id=$(cmux new-workspace --command "bash '${launcher}'" 2>&1 | awk '{print $2}')

  # --- Name + position + metadata ---
  cmux rename-workspace --workspace "$ws_id" "$ws_title"
  cmux set-status "dispatch-group" "●" --icon "circle.fill" --color "$group_color" --workspace "$ws_id"

  # Show parent origin on child sidebar card (visible even when name truncates)
  if [[ -n "$parent_title" ]]; then
    cmux set-status "dispatch-origin" "↑ ${parent_title}" --icon "arrow.up.circle" --color "$group_color" --workspace "$ws_id"
  fi

  # Reorder adjacent: place after parent (first dispatch) or after last sibling
  if [[ -n "$caller_ws" ]]; then
    local after_ws="${_DISPATCH_LAST_WS:-$caller_ws}"
    cmux reorder-workspace --workspace "$ws_id" --after "$after_ws"
    _DISPATCH_LAST_WS="$ws_id"
  fi

  echo "Dispatched: ${ws_title} (resume: claude --resume ${session_id})"
}
```

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
Run the importer e2e tests in ~/projects/heartbeat-chat/Heartbeat-subimp-ui.
Start by running npm run gen:persona, then
npm run test:e2e -- --project app -- grep "importer".
Fix any failures and commit.
PROMPT_EOF

dispatch "e2e-importer-fixes" "/tmp/dispatch-1.txt" \
  ~/projects/heartbeat-chat/Heartbeat-subimp-ui

# Task 2
cat > /tmp/dispatch-2.txt << 'PROMPT_EOF'
Push feat/hea-3849-subimp-ui and monitor CI checks on PR #822.
Fix any failures, commit, and re-push until green.
PROMPT_EOF

dispatch "ci-check-push" "/tmp/dispatch-2.txt" \
  ~/projects/heartbeat-chat/Heartbeat-subimp-ui

# Clean up temp files
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
- Clean up temp files after dispatch: `rm /tmp/dispatch-*.txt /tmp/dispatch-*.sh`
