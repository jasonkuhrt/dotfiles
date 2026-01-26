#!/bin/bash
# SessionStart hook - output session resume command

# Read hook input from stdin
HOOK_INPUT=$(cat)
SESSION_ID=$(echo "$HOOK_INPUT" | jq --raw-output '.session_id // empty')
CWD=$(echo "$HOOK_INPUT" | jq --raw-output '.cwd // empty')

if [[ -n "$SESSION_ID" ]]; then
  echo "Resume this session: claude --resume $SESSION_ID"

  # Persist session ID so skills/tools can access it
  # Namespace by cwd hash to support concurrent sessions in different directories
  if [[ -n "$CWD" ]]; then
    CWD_HASH=$(echo -n "$CWD" | md5 | cut -c1-8)
    echo "$SESSION_ID" > "/tmp/claude-session-id-${CWD_HASH}"
  fi
  # Also write to generic file for simple single-session use
  echo "$SESSION_ID" > /tmp/claude-session-id
fi
