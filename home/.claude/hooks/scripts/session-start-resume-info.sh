#!/bin/bash
# SessionStart hook - output session resume command

# Read hook input from stdin
HOOK_INPUT=$(cat)
SESSION_ID=$(echo "$HOOK_INPUT" | jq --raw-output '.session_id // empty')

CMUX_INITIAL_WORKSPACE_ID="${CMUX_WORKSPACE_ID:-}"

if [[ -n "$SESSION_ID" ]]; then
  echo "Resume this session: claude --resume $SESSION_ID"
fi

if [[ -n "$CMUX_INITIAL_WORKSPACE_ID" ]]; then
  echo "CMUX_INITIAL_WORKSPACE_ID: $CMUX_INITIAL_WORKSPACE_ID"
  echo "  Send text to this workspace: cmux send --workspace $CMUX_INITIAL_WORKSPACE_ID \"message\""
  echo "  Send key to this workspace:  cmux send-key --workspace $CMUX_INITIAL_WORKSPACE_ID enter"
  echo "  Notify this workspace:       cmux notify --workspace $CMUX_INITIAL_WORKSPACE_ID --title \"title\" --body \"body\""
fi
