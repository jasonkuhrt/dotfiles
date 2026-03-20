#!/bin/bash
# Auto-approve all permission requests except ExitPlanMode.
# ExitPlanMode is handled by Plannotator's PermissionRequest hook,
# which opens a review UI for plan annotation before approval.

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

if [[ "$TOOL_NAME" == "ExitPlanMode" ]]; then
  exit 0  # pass through — let Plannotator handle it
fi

if [[ "$TOOL_NAME" == "AskUserQuestion" ]]; then
  exit 0  # pass through — user must see and answer the question
fi

cat <<'EOF'
{"hookSpecificOutput":{"hookEventName":"PermissionRequest","decision":{"behavior":"allow"}}}
EOF
