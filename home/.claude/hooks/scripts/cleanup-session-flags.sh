#!/usr/bin/env bash
set -euo pipefail

# Clean up session-scoped flag files when a session ends.

read_input() {
  if [[ -t 0 ]]; then
    printf ''
    return 0
  fi
  cat
}

input="$(read_input)"
session_id="$(printf '%s\n' "$input" | jq -r '.session_id // empty' 2>/dev/null || true)"

if [[ -n "$session_id" ]]; then
  rm -f "$HOME/.claude/flags/allow-bare-subagents-${session_id}" 2>/dev/null
fi

exit 0
