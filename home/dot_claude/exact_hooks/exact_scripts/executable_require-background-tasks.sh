#!/bin/bash
# PreToolUse hook: Require run_in_background for long-running processes
#
# Catches attempts to start dev servers, watchers, or builds without
# using Claude Code's background task feature.

set -euo pipefail

INPUT=$(cat)

# Only check Bash tool
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')
[[ "$TOOL" != "Bash" ]] && exit 0

COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
RUN_IN_BG=$(echo "$INPUT" | jq -r '.tool_input.run_in_background // false')

# Patterns that indicate long-running processes
LONG_RUNNING_PATTERNS=(
  "npm run dev"
  "npm start"
  "nx serve"
  "nx run.*:serve"
  "inngest-cli"
  "webpack.*watch"
  "vite"
  "next dev"
  "concurrently"
)

# Check if command matches any long-running pattern
for pattern in "${LONG_RUNNING_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qiE "$pattern"; then
    if [[ "$RUN_IN_BG" != "true" ]]; then
      echo '{"decision": "block", "reason": "Long-running process detected. Use run_in_background: true to prevent orphaned processes. See .claude/rules/background-tasks.md"}'
      exit 0
    fi
  fi
done

# Allow the command
exit 0
