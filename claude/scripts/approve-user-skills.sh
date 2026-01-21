#!/bin/bash
# Auto-approve and persist skills from:
# - User-level skills directory (~/.claude/skills/)
# - Project-local skills directory (.claude/skills/)
# - Official Anthropic marketplace (claude-plugins-official)
#
# On approval, also adds permission to ~/.claude/settings.json to prevent
# UI flash on future sessions (requires CC restart to take effect).

INPUT=$(cat)
SKILL_NAME=$(echo "$INPUT" | jq -r '.tool_input.skill // empty')
CWD=$(echo "$INPUT" | jq -r '.cwd // empty')

[[ -z "$SKILL_NAME" ]] && exit 0

APPROVE='{"hookSpecificOutput":{"hookEventName":"PermissionRequest","decision":{"behavior":"allow"}}}'
SETTINGS_FILE="$HOME/.claude/settings.json"

# Persist permission to settings.json (for future sessions)
persist_permission() {
  local permission="$1"

  # Skip if already present
  if jq -e --arg p "$permission" '.permissions.allow | index($p)' "$SETTINGS_FILE" >/dev/null 2>&1; then
    return 0
  fi

  # Atomic write: tmp file + mv
  if jq --arg p "$permission" '.permissions.allow += [$p]' "$SETTINGS_FILE" > "$SETTINGS_FILE.tmp" 2>/dev/null; then
    mv "$SETTINGS_FILE.tmp" "$SETTINGS_FILE"
  fi
}

# Approve and persist
approve_skill() {
  local permission="$1"
  persist_permission "$permission"
  echo "$APPROVE"
  exit 0
}

# Plugin skills have colons (e.g., "plugin:skill")
if [[ "$SKILL_NAME" == *":"* ]]; then
  PLUGIN_NAME="${SKILL_NAME%%:*}"

  # Check if plugin name exists in claude-plugins-official
  # CAVEAT: This checks if the plugin NAME is registered from official marketplace,
  # not that THIS invocation is from there. A same-named plugin from another
  # marketplace would also be approved. Acceptable tradeoff for simplicity.
  if grep -q "\"${PLUGIN_NAME}@claude-plugins-official\"" "$SETTINGS_FILE" 2>/dev/null; then
    approve_skill "Skill(${PLUGIN_NAME}:*)"
  fi

  # Not from official marketplace - pass through
  exit 0
fi

# Check user-level skills (local skills have no colon)
if [[ -d "$HOME/.claude/skills/$SKILL_NAME" ]]; then
  approve_skill "Skill(${SKILL_NAME})"
fi

# Check project-local skills
if [[ -n "$CWD" && -d "$CWD/.claude/skills/$SKILL_NAME" ]]; then
  approve_skill "Skill(${SKILL_NAME})"
fi

exit 0
