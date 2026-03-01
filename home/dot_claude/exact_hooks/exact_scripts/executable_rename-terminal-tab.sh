#!/bin/bash
# Auto-name CC sessions and update terminal tab title
#
# UserPromptSubmit hook:
# 1. /rename <name> → manual rename (set tab + state + sessions-index)
# 2. First prompt of new session → auto-generate name from prompt text
# 3. Subsequent prompts → no-op (already named)

# --- Per-terminal state file (unique per tty, fallback to global) ---
STATE_DIR="$HOME/.claude/.session-names"
mkdir -p "$STATE_DIR" 2>/dev/null
tty_key=$(stat -f '%d_%i' /dev/tty 2>/dev/null) || tty_key="global"
STATE_FILE="$STATE_DIR/${tty_key}.json"

# --- Parse hook input ---
input=$(cat)
prompt=$(echo "$input" | jq -r '.prompt // empty' 2>/dev/null)
session_id=$(echo "$input" | jq -r '.session_id // empty' 2>/dev/null)
transcript_path=$(echo "$input" | jq -r '.transcript_path // empty' 2>/dev/null)

# --- Helpers ---

set_tab() {
  printf '\033]0;%s\007' "$1" > /dev/tty 2>/dev/null
  printf '\033]2;%s\007' "$1" > /dev/tty 2>/dev/null
}

save_state() {
  printf '{"name":"%s","generation":%d,"session_id":"%s"}\n' "$1" "$2" "$3" > "$STATE_FILE"
}

save_title() {
  local sid="$1" title="$2" idx_file
  [[ -n "$transcript_path" ]] || return 0
  idx_file="$(dirname "$transcript_path")/sessions-index.json"
  [[ -f "$idx_file" ]] || return 0
  python3 -c "
import json, sys
p = sys.argv[3]
with open(p) as f:
    d = json.load(f)
for e in d.get('entries', []):
    if e['sessionId'] == sys.argv[1]:
        e['customTitle'] = sys.argv[2]
        break
with open(p, 'w') as f:
    json.dump(d, f)
" "$sid" "$title" "$idx_file" 2>/dev/null
}

slugify() {
  echo "$1" \
    | sed 's|^/[a-zA-Z_:!?-]* *||' \
    | tr '[:upper:]' '[:lower:]' \
    | sed 's/[^a-z0-9 ]/ /g' \
    | tr -s ' ' \
    | sed 's/^ //; s/ $//' \
    | tr ' ' '\n' \
    | grep -vxE '(.|(i|a|an|the|to|in|it|my|is|of|and|or|for|on|at|by|do|so|if|me|we|up|be|as|no|am|was|has|had|not|but|its|can|how|get|set|our|all|now|when|want|this|that|with|from|them|then|than|also|just|like|would|could|should|have|been|into|some|here|there|what|your|you|make))' \
    | head -4 \
    | tr '\n' '-' \
    | sed 's/-$//' \
    | head -c 30 \
    | sed 's/-$//'
}

# --- Case 1: Manual /rename ---
if [[ "$prompt" == /rename* ]]; then
  name="${prompt#/rename}"
  name="${name# }"
  if [[ -n "$name" ]]; then
    set_tab "$name"
    save_state "$name" 1 "$session_id"
    save_title "$session_id" "$name"
  fi
  exit 0
fi

# --- Case 2: Already named this session → skip ---
if [[ -f "$STATE_FILE" ]]; then
  existing_sid=$(jq -r '.session_id // empty' "$STATE_FILE" 2>/dev/null)
  [[ "$existing_sid" == "$session_id" ]] && exit 0
fi

# --- Case 3: First prompt of new session → auto-name ---
if [[ -n "$prompt" && -n "$session_id" ]]; then
  name=$(slugify "$prompt")
  if [[ -n "$name" && ${#name} -ge 2 ]]; then
    set_tab "$name"
    save_state "$name" 1 "$session_id"
    save_title "$session_id" "$name"
  fi
fi
