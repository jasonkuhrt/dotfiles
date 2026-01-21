#!/bin/bash
# Auto-approve skills from:
# - User-level skills directory (~/.claude/skills/)
# - Project-local skills directory (.claude/skills/)
# - Official Anthropic marketplace (claude-plugins-official)

INPUT=$(cat)
SKILL_NAME=$(echo "$INPUT" | jq -r '.tool_input.skill // empty')
CWD=$(echo "$INPUT" | jq -r '.cwd // empty')

[[ -z "$SKILL_NAME" ]] && exit 0

APPROVE='{"hookSpecificOutput":{"hookEventName":"PermissionRequest","decision":{"behavior":"allow"}}}'

# Plugin skills have colons (e.g., "plugin:skill")
if [[ "$SKILL_NAME" == *":"* ]]; then
  PLUGIN_NAME="${SKILL_NAME%%:*}"

  # Check if plugin is from claude-plugins-official
  if grep -q "\"${PLUGIN_NAME}@claude-plugins-official\"" ~/.claude/settings.json 2>/dev/null; then
    echo "$APPROVE"
    exit 0
  fi

  # Not from official marketplace - pass through
  exit 0
fi

# Check user-level skills
[[ -d "$HOME/.claude/skills/$SKILL_NAME" ]] && echo "$APPROVE" && exit 0

# Check project-local skills
[[ -n "$CWD" && -d "$CWD/.claude/skills/$SKILL_NAME" ]] && echo "$APPROVE" && exit 0

exit 0
