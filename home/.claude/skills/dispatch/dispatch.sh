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

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Error: missing required command: $1" >&2
    exit 1
  }
}

require_cmd cmux
require_cmd claude
require_cmd uuidgen

if [[ ! -f "$prompt_file" ]]; then
  echo "Error: prompt file not found: $prompt_file" >&2
  exit 1
fi

# Resolve claude binary
claude_bin=$(command -v claude)

# Pre-generate session UUID
session_id=$(uuidgen | tr '[:upper:]' '[:lower:]')

# Derive project dir for JSONL path
project_dir=$(echo "$cwd" | tr '/' '-')
jsonl="$HOME/.claude/projects/${project_dir}/${session_id}.jsonl"

# Write launcher script
launcher="$(mktemp "/tmp/dispatch-${slug}.XXXXXX.sh")"
cleanup() {
  rm -f "$launcher"
}
trap cleanup EXIT
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
    for t in "${taken[@]}"; do
      [[ "$color" == "$t" ]] && used=true && break
    done
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
# Parse workspace ref from output like "OK workspace:60"
ws_line=$(cmux new-workspace --command "bash '${launcher}'" 2>&1)
ws_id=$(echo "$ws_line" | grep -oE 'workspace:[0-9]+' | head -1)

if [[ -z "$ws_id" ]]; then
  echo "Error: failed to create workspace. Output: $ws_line" >&2
  exit 1
fi

# --- Name + position + metadata ---
cmux rename-workspace --workspace "$ws_id" "$ws_title"
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
