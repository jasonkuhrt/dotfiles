#!/bin/bash
# SessionStart hook - output session resume command

# Read hook input from stdin
HOOK_INPUT=$(cat)
SESSION_ID=$(echo "$HOOK_INPUT" | jq --raw-output '.session_id // empty')

if [[ -n "$SESSION_ID" ]]; then
  echo "Resume this session: claude --resume $SESSION_ID"
fi
