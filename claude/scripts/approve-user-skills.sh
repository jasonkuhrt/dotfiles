#!/bin/bash
# Auto-approve skills from user-level or project-local skills directories

INPUT=$(cat)
SKILL_NAME=$(echo "$INPUT" | jq -r '.tool_input.skill // empty')
CWD=$(echo "$INPUT" | jq -r '.cwd // empty')

[[ -z "$SKILL_NAME" ]] && exit 0

# Plugin skills have colons (e.g., "plugin:skill") - pass through
[[ "$SKILL_NAME" == *":"* ]] && exit 0

APPROVE='{"hookSpecificOutput":{"hookEventName":"PermissionRequest","decision":{"behavior":"allow"}}}'

# Check user-level skills
[[ -d "$HOME/.claude/skills/$SKILL_NAME" ]] && echo "$APPROVE" && exit 0

# Check project-local skills
[[ -n "$CWD" && -d "$CWD/.claude/skills/$SKILL_NAME" ]] && echo "$APPROVE" && exit 0

exit 0
