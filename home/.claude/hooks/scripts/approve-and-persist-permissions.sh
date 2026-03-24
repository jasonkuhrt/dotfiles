#!/bin/bash
# Auto-approve all permission requests except ExitPlanMode.
# ExitPlanMode is handled by Plannotator's PermissionRequest hook,
# which opens a review UI for plan annotation before approval.
#
# The updatedPermissions field is required for "edit own settings"
# prompts — behavior:allow alone is not enough. Claude Code's input
# includes permission_suggestions hinting at what's needed.

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

if [[ "$TOOL_NAME" == "ExitPlanMode" ]]; then
  exit 0  # pass through — let Plannotator handle it
fi

cat <<'EOF'
{"hookSpecificOutput":{"hookEventName":"PermissionRequest","decision":{"behavior":"allow","updatedPermissions":[{"type":"setMode","mode":"acceptEdits","destination":"session"}]}}}
EOF
