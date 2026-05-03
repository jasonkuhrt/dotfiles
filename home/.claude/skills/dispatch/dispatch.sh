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
ready_sleep_secs="${DISPATCH_READY_SLEEP_SECS:-0.35}"
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

# --- Resolve parent workspace ---
caller_ws="${CMUX_WORKSPACE_ID:-}"
parent_title=""

get_workspace_title() {
  local ws_ref="$1"
  cmux list-workspaces 2>/dev/null \
    | grep -E "^[* ]+${ws_ref}( |$)" \
    | sed -E 's/^[* ]+workspace:[0-9]+ +//' \
    | sed 's/ *\[selected\] *$//' \
    || true
}

if [[ -n "$caller_ws" ]]; then
  parent_title=$(get_workspace_title "$caller_ws")
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

# --- Resolve caller's window ---
# new-workspace creates in the macOS-focused window, which may not be the
# caller's window. Resolve the caller's window from CMUX_WORKSPACE_ID so we
# can move the workspace to the right place after creation.
caller_window=""
if [[ -n "$caller_ws" ]]; then
  # Use the window UUID, not window:index — indices shift when workspaces move.
  # First try selected_workspace_id (fast path — works when caller is the active tab).
  caller_window=$(cmux --json list-windows 2>/dev/null \
    | jq -r --arg ws "$caller_ws" '.[] | select(.selected_workspace_id == $ws) | .id' 2>/dev/null || true)
  # If that missed (caller tab not selected), search all windows via tree.
  if [[ -z "$caller_window" ]]; then
    for win_id in $(cmux --json list-windows 2>/dev/null | jq -r '.[].id' 2>/dev/null); do
      if cmux --json tree --window "$win_id" 2>/dev/null | jq -e --arg ws "$caller_ws" '.. | objects | select(.id? == $ws)' >/dev/null 2>&1; then
        caller_window="$win_id"
        break
      fi
    done
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
for _ in $(seq 1 "$tree_retries"); do
  tree_json="$(cmux --json --id-format both tree --workspace "$ws_id" 2>/dev/null || true)"
  surface_ref="$(printf '%s\n' "$tree_json" | jq -r 'first(.. | objects | select(.type? == "terminal") | (.ref? // .surface_ref? // .id? // .surface_id?)) // empty' 2>/dev/null || true)"
  if [[ -n "$surface_ref" ]]; then
    break
  fi
  sleep "$tree_retry_sleep_secs"
done

if [[ -z "$surface_ref" ]]; then
  echo "Error: workspace $ws_id never exposed a terminal surface" >&2
  exit 1
fi

sleep "$ready_sleep_secs"
cmux send --workspace "$ws_id" --surface "$surface_ref" $'\003'
sleep 0.05
cmux send --workspace "$ws_id" --surface "$surface_ref" "bash $(printf '%q' "$launcher")"
cmux send-key --workspace "$ws_id" --surface "$surface_ref" enter
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
