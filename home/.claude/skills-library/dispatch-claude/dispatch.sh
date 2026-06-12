#!/usr/bin/env bash
# dispatch.sh — Launch a Claude Code session in a new cmux workspace.
# Usage: dispatch.sh <slug> <prompt-file> [cwd]
#
# Example:
#   dispatch.sh "fix-tests" /tmp/prompt.txt ~/projects/myapp

set -euo pipefail

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

slug="${1:?Usage: dispatch.sh <slug> <prompt-file> [cwd]}"
prompt_file="${2:?Usage: dispatch.sh <slug> <prompt-file> [cwd]}"
cwd="${3:-$(pwd)}"
tree_retries="${DISPATCH_TREE_RETRIES:-80}"
tree_retry_sleep_secs="${DISPATCH_TREE_RETRY_SLEEP_SECS:-0.10}"
launch_started=0
launcher_dir=""

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Error: missing required command: $1" >&2
    exit 1
  }
}

require_cmd cmux
require_cmd claude
require_cmd jq
require_cmd uuidgen

if [[ ! -f "$prompt_file" ]]; then
  echo "Error: prompt file not found: $prompt_file" >&2
  exit 1
fi

if [[ ! -d "$cwd" ]]; then
  echo "Error: cwd does not exist: $cwd" >&2
  exit 1
fi

cleanup_launcher() {
  if [[ "$launch_started" -eq 0 && -n "$launcher_dir" && -d "$launcher_dir" ]]; then
    rm -rf "$launcher_dir"
  fi
}
trap cleanup_launcher EXIT

claude_bin="$(command -v claude)"
session_id="$(uuidgen | tr '[:upper:]' '[:lower:]')"
launcher_dir="$(mktemp -d "${TMPDIR:-/tmp}/dispatch-${slug}.XXXXXX")"
launcher="$launcher_dir/launch.sh"
launch_prompt="$launcher_dir/prompt.txt"
cp "$prompt_file" "$launch_prompt"

cat > "$launcher" <<EOF
#!/usr/bin/env bash
set -euo pipefail

cd $(printf '%q' "$cwd")
prompt_file=$(printf '%q' "$launch_prompt")
prompt="\$(cat "\$prompt_file")"
rm -f "\$prompt_file" "\$0"
rmdir $(printf '%q' "$launcher_dir") 2>/dev/null || true
exec $(printf '%q' "$claude_bin") --session-id $(printf '%q' "$session_id") --name $(printf '%q' "$slug") --effort max -- "\$prompt"
EOF
chmod +x "$launcher"

# --- Resolve caller context from a single tree snapshot ---
# CMUX_WORKSPACE_ID is a UUID inside cmux terminals (verified via `cmux
# identify`: workspace_id is a UUID, workspace_ref is `workspace:N`). A single
# `cmux tree --all --json` snapshot exposes every workspace's UUID, ref, and
# title plus each window's selected workspace, so one call resolves all three
# caller facts we need:
#   parent_title     — caller workspace's title, for `{parent} › {slug}` naming
#   caller_window    — the window containing the caller, for placement (new
#                      workspaces land in the macOS-focused window, which may
#                      differ from the caller's window)
#   user_selected_ws — that window's currently-selected workspace, captured
#                      BEFORE creation so we can restore the user's view after
#                      the PTY warm-up focus
# Keying on the workspace UUID (`.id`) is required: list-workspaces prints
# refs, so grepping it for a UUID caller never matches.
caller_ws="${CMUX_WORKSPACE_ID:-}"
parent_title=""
caller_window=""
user_selected_ws=""

if [[ -n "$caller_ws" ]]; then
  tree_all_json="$(cmux --json --id-format both tree --all 2>/dev/null || true)"
  if [[ -n "$tree_all_json" ]]; then
    parent_title=$(printf '%s\n' "$tree_all_json" \
      | jq -r --arg ws "$caller_ws" '.windows[].workspaces[] | select(.id == $ws) | (.title // empty)' 2>/dev/null \
      | head -1 || true)
    caller_window=$(printf '%s\n' "$tree_all_json" \
      | jq -r --arg ws "$caller_ws" '.windows[] | select(.workspaces[].id == $ws) | .id' 2>/dev/null \
      | head -1 || true)
    user_selected_ws=$(printf '%s\n' "$tree_all_json" \
      | jq -r --arg ws "$caller_ws" '.windows[] | select(.workspaces[].id == $ws) | .selected_workspace_ref' 2>/dev/null \
      | head -1 || true)
  fi
fi

# --- Workspace naming ---
ws_title="$slug"
if [[ -n "$parent_title" ]]; then
  ws_title="${parent_title} › ${slug}"
fi

# --- Pick group color ---
pick_group_color() {
  local taken=()
  while IFS= read -r ws; do
    local c
    c=$(cmux list-status --workspace "$ws" 2>/dev/null \
        | grep "^dispatch-group=" | grep -oE 'color=#[0-9A-Fa-f]+' | sed 's/color=//' || true)
    [[ -n "$c" ]] && taken+=("$c")
  done < <(cmux list-workspaces 2>/dev/null | grep -oE 'workspace:[0-9]+' || true)

  for color in "${DISPATCH_COLORS[@]}"; do
    local used=false
    if (( ${#taken[@]} > 0 )); then
      for t in "${taken[@]}"; do
        [[ "$color" == "$t" ]] && used=true && break
      done
    fi
    $used || { echo "$color"; return; }
  done
  echo "${DISPATCH_COLORS[0]}"
}

group_color=""
if [[ -n "$caller_ws" ]]; then
  group_color=$(cmux list-status --workspace "$caller_ws" 2>/dev/null \
                | grep "^dispatch-group=" | grep -oE 'color=#[0-9A-Fa-f]+' | sed 's/color=//' || true)
fi

if [[ -z "$group_color" ]]; then
  group_color=$(pick_group_color)
  if [[ -n "$caller_ws" ]]; then
    cmux set-status "dispatch-group" "●" --icon "circle.fill" --color "$group_color" --workspace "$caller_ws"
  fi
fi

# --- Create workspace ---
ws_line="$(cmux new-workspace --name "$ws_title" --cwd "$cwd" 2>&1)"
ws_id="$(printf '%s\n' "$ws_line" | grep -oE 'workspace:[0-9]+' | head -1)"

if [[ -z "$ws_id" ]]; then
  echo "Error: failed to create workspace. Output: $ws_line" >&2
  exit 1
fi

# Move to caller's window if it was created in the wrong one
if [[ -n "$caller_window" ]]; then
  cmux move-workspace-to-window --workspace "$ws_id" --window "$caller_window" 2>/dev/null || true
fi

surface_ref=""
pane_ref=""
for _ in $(seq 1 "$tree_retries"); do
  tree_json="$(cmux --json --id-format both tree --workspace "$ws_id" 2>/dev/null || true)"
  surface_ref="$(printf '%s\n' "$tree_json" | jq -r 'first(.. | objects | select(.type? == "terminal") | (.ref? // .surface_ref? // .id? // .surface_id?)) // empty' 2>/dev/null || true)"
  pane_ref="$(printf '%s\n' "$tree_json" | jq -r 'first(.. | objects | select(.type? == "terminal") | (.pane_ref? // .pane_id?)) // empty' 2>/dev/null || true)"
  if [[ -n "$surface_ref" && -n "$pane_ref" ]]; then
    break
  fi
  sleep "$tree_retry_sleep_secs"
done

if [[ -z "$surface_ref" || -z "$pane_ref" ]]; then
  echo "Error: workspace $ws_id never exposed a terminal surface" >&2
  exit 1
fi

# --- Warm the PTY, restore focus, then atomic-send the launcher ---
# cmux 0.64.6 lazy-spawns terminal PTYs on first focus. Until then, `cmux send`
# and `cmux send-key` succeed (queued) but never reach a shell. There is NO
# `shell.ready` / `pty.spawned` event on `cmux events` and no flag on
# `new-workspace` that bypasses this. Audited alternatives (`--command`,
# `--layout` with embedded command, `paste-buffer`, `respawn-pane --command`)
# all hit either the lazy-PTY race or the vi-NORMAL trap below — none of them
# can replace the four-step dance: focus → restore → reset-mode → send.
#
# Step 1: focus-pane spawns the PTY. `surface-health.in_window` flips true
# while focused, but reverts to false on the restore step, so it cannot be
# used as a readiness signal — we still need the prompt-glyph poll.
cmux focus-pane --workspace "$ws_id" --pane "$pane_ref" >/dev/null 2>&1 || true

# Step 2: poll read-screen for fish's prompt glyph. Fresh fish typically
# converges in 1-2 polls (~100-200ms). `❮` and `❯` are fish's vi-mode prompt
# glyphs; `$ ` / `% ` are bash/zsh fallbacks for non-fish users.
fish_ready_retries="${DISPATCH_FISH_READY_RETRIES:-50}"
fish_ready_sleep="${DISPATCH_FISH_READY_SLEEP_SECS:-0.10}"
for _ in $(seq 1 "$fish_ready_retries"); do
  screen="$(cmux read-screen --workspace "$ws_id" --surface "$surface_ref" --lines 5 2>/dev/null || true)"
  if [[ "$screen" == *"❮"* || "$screen" == *"❯"* || "$screen" == *"\$ "* || "$screen" == *"% "* ]]; then
    break
  fi
  sleep "$fish_ready_sleep"
done

# Step 3: restore the user's view. `focus-pane` selects the new workspace
# inside the user's window — verified empirically. select-workspace puts the
# view back before we send anything, so the user's focus never moves.
if [[ -n "$user_selected_ws" && "$user_selected_ws" != "$ws_id" ]]; then
  cmux select-workspace --workspace "$user_selected_ws" >/dev/null 2>&1 || true
fi

# Step 4: ATOMIC send — `\003` (Ctrl-C) resets fish out of vi-NORMAL into
# INSERT (fresh fish sessions land in NORMAL when vi-mode is enabled; first
# letters of `echo …` would otherwise be consumed as motions), the launcher
# command body follows, and the trailing `\n` fires Enter. One socket
# round-trip; no race window between the mode reset and the command body.
# (`cmux send --help`: "Escape sequences: \n and \r send Enter".)
cmux send --workspace "$ws_id" --surface "$surface_ref" \
  $'\003'"bash $(printf '%q' "$launcher")"$'\n' >/dev/null 2>&1 || true
launch_started=1

# --- Position + metadata ---
cmux set-status "dispatch-group" "●" --icon "circle.fill" --color "$group_color" --workspace "$ws_id"

if [[ -n "$parent_title" ]]; then
  cmux set-status "dispatch-origin" "↑ ${parent_title}" --icon "arrow.up.circle" --color "$group_color" --workspace "$ws_id"
fi

# Reorder adjacent to parent
if [[ -n "$caller_ws" ]]; then
  # Use DISPATCH_LAST_WS env var for chaining multiple dispatches
  after_ws="${DISPATCH_LAST_WS:-$caller_ws}"
  cmux reorder-workspace --workspace "$ws_id" --after "$after_ws" 2>/dev/null || true
  # Export for subsequent dispatches in the same shell
  export DISPATCH_LAST_WS="$ws_id"
fi

echo "Dispatched: ${ws_title} (resume: claude --resume ${session_id})"
