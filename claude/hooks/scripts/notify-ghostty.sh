#!/bin/bash
#
# Claude Code Notification Hook → macOS Persistent Notification
#
# Uses the notify skill for persistent notifications with Claude icon.
# Notification text varies based on notification_type from Claude Code.
#
# See ~/.claude/skills/notify/notify.md for full notification API.
#
# FOCUS MODE BYPASS:
#   System Settings → Focus → [Mode] → Allowed Apps → Add "yo"
#
# Input JSON: session_id, message, title, notification_type, cwd
#

set -euo pipefail

NOTIFY_SCRIPT="$HOME/.claude/skills/notify/scripts/send.sh"

# Read hook input
INPUT=$(cat)

# Extract fields
TITLE=$(echo "$INPUT" | jq -r '.title // "Claude Code"')
MESSAGE=$(echo "$INPUT" | jq -r '.message // "Needs attention"')
CWD=$(echo "$INPUT" | jq -r '.cwd // ""')
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // ""')
NOTIFICATION_TYPE=$(echo "$INPUT" | jq -r '.notification_type // "unknown"')

# Extract project name from cwd
PROJECT=""
if [[ -n "$CWD" ]]; then
  PROJECT=$(basename "$CWD")
fi

# Build title with project context
if [[ -n "$PROJECT" ]]; then
  FULL_TITLE="[$PROJECT] $TITLE"
else
  FULL_TITLE="$TITLE"
fi

# Build info with session ID
INFO=""
if [[ -n "$SESSION_ID" ]]; then
  SHORT_ID="${SESSION_ID:0:7}"
  INFO="Session: $SHORT_ID"
fi

# Use notify skill if available, otherwise fallback to yo directly
if [[ -x "$NOTIFY_SCRIPT" ]]; then
  "$NOTIFY_SCRIPT" \
    --title "$FULL_TITLE" \
    --subtitle "$MESSAGE" \
    --info "$INFO" \
    --icon claude \
    --bypass-focus
else
  # Fallback: use yo directly
  YO_BIN="$HOME/Applications/yo.app/Contents/MacOS/yo"
  if [[ -x "$YO_BIN" ]]; then
    "$YO_BIN" -t "$FULL_TITLE" -s "$MESSAGE" -n "$INFO" -d &
  else
    # Final fallback: osascript
    osascript -e "display notification \"$MESSAGE\" with title \"$FULL_TITLE\" subtitle \"$INFO\" sound name \"Glass\"" &
  fi
fi

exit 0
