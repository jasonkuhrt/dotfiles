#!/bin/bash
# Auto-approve all permission requests except ExitPlanMode and AskUserQuestion.
# ExitPlanMode is handled by Plannotator's PermissionRequest hook,
# which opens a review UI for plan annotation before approval.
# AskUserQuestion must pass through because emitting an "allow" decision
# causes Claude Code to substitute "Allowed by PermissionRequest hook"
# for the user's actual selections (AskUserQuestion triggers
# PermissionRequest per anthropics/claude-code#15400).
#
# The updatedPermissions field is required for "edit own settings"
# prompts — behavior:allow alone is not enough. Claude Code's input
# includes permission_suggestions hinting at what's needed.

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

if [[ "$TOOL_NAME" == "ExitPlanMode" || "$TOOL_NAME" == "AskUserQuestion" ]]; then
  exit 0  # pass through — Plannotator owns ExitPlanMode; AskUserQuestion answers must not be replaced
fi

cat <<'EOF'
{"hookSpecificOutput":{"hookEventName":"PermissionRequest","decision":{"behavior":"allow","updatedPermissions":[{"type":"setMode","mode":"acceptEdits","destination":"session"}]}}}
EOF
