#!/bin/bash
# Preserve session name across context compaction
#
# SessionStart hook: when source=compact, reads previous name from
# per-terminal state, increments generation counter, sets name to
# <base>-<N> (gen 1 = no suffix, gen 2+ = explicit suffix)
#
# Naming scheme:
#   Original session:     "my-feature"
#   After 1st compaction: "my-feature-2"
#   After 2nd compaction: "my-feature-3"

# --- Per-terminal state file ---
STATE_DIR="$HOME/.claude/.session-names"
tty_key=$(stat -f '%d_%i' /dev/tty 2>/dev/null) || tty_key="global"
STATE_FILE="$STATE_DIR/${tty_key}.json"

# --- Parse hook input ---
input=$(cat)
source_type=$(echo "$input" | jq -r '.source // empty' 2>/dev/null)
session_id=$(echo "$input" | jq -r '.session_id // empty' 2>/dev/null)
transcript_path=$(echo "$input" | jq -r '.transcript_path // empty' 2>/dev/null)

# Only act on compaction
[[ "$source_type" == "compact" ]] || exit 0
[[ -f "$STATE_FILE" ]] || exit 0

prev_name=$(jq -r '.name // empty' "$STATE_FILE" 2>/dev/null)
prev_gen=$(jq -r '.generation // 1' "$STATE_FILE" 2>/dev/null)
[[ -n "$prev_name" ]] || exit 0

# Strip existing -N suffix to get base name
base_name=$(echo "$prev_name" | sed 's/-[0-9][0-9]*$//')
new_gen=$((prev_gen + 1))

# Build new name
if [[ $new_gen -le 1 ]]; then
  new_name="$base_name"
else
  new_name="${base_name}-${new_gen}"
fi

# Update terminal tab
printf '\033]0;%s\007' "$new_name" > /dev/tty 2>/dev/null
printf '\033]2;%s\007' "$new_name" > /dev/tty 2>/dev/null

# Update state
printf '{"name":"%s","generation":%d,"session_id":"%s"}\n' "$new_name" "$new_gen" "$session_id" > "$STATE_FILE"

# Update sessions-index.json
if [[ -n "$transcript_path" ]]; then
  idx_file="$(dirname "$transcript_path")/sessions-index.json"
  if [[ -f "$idx_file" ]]; then
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
" "$session_id" "$new_name" "$idx_file" 2>/dev/null || true
  fi
fi
