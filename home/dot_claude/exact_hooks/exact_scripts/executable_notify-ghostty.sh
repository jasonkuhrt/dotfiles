#!/bin/bash
#
# Claude Code Notification Hook
#
# Modes (set in ~/.claude/notification-mode, default: sound):
#   sound        — play a system sound, no visual notification
#   notification — macOS notification banner via yo or osascript
#
# FOCUS MODE BYPASS (notification mode only):
#   System Settings → Focus → [Mode] → Allowed Apps → Add "yo"
#
# Input JSON: session_id, message, title, notification_type, cwd
#

set -euo pipefail

# Read mode from config, default to sound
MODE_FILE="$HOME/.claude/notification-mode"
MODE="sound"
if [[ -f "$MODE_FILE" ]]; then
  MODE=$(head -1 "$MODE_FILE" | tr -d '[:space:]')
fi

# Sound-only mode: play audio cue and exit
if [[ "$MODE" == "sound" ]]; then
  afplay /System/Library/Sounds/Ping.aiff &
  exit 0
fi

# --- notification mode ---

# Read hook input
INPUT=$(cat)

# Extract fields
TITLE=$(echo "$INPUT" | jq -r '.title // "Claude Code"')
MESSAGE=$(echo "$INPUT" | jq -r '.message // "Needs attention"')
CWD=$(echo "$INPUT" | jq -r '.cwd // ""')
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // ""')

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

# Send notification via yo or osascript
YO_BIN="$HOME/Applications/yo.app/Contents/MacOS/yo"
if [[ -x "$YO_BIN" ]]; then
  "$YO_BIN" -t "$FULL_TITLE" -s "$MESSAGE" -n "$INFO" -d &
else
  osascript -e "display notification \"$MESSAGE\" with title \"$FULL_TITLE\" subtitle \"$INFO\" sound name \"Glass\"" &
fi

exit 0
