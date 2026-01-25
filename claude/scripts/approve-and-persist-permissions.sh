#!/bin/bash
# Auto-approve and persist permissions for:
# - Skills: user-level, project-local, and official marketplace
# - MCP: all MCP server tools
#
# On approval, adds permission to ~/.claude/settings.json so future
# sessions don't need hook approval (requires CC restart to take effect).

set -euo pipefail

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
CWD=$(echo "$INPUT" | jq -r '.cwd // empty')

[[ -z "$TOOL_NAME" ]] && exit 0

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
    echo "Persisted permission: $permission" >&2
  fi
}

# Approve and persist
approve() {
  local permission="$1"
  persist_permission "$permission"
  echo "$APPROVE"
  exit 0
}

# ─────────────────────────────────────────────────────────────────────────────
# MCP Tools (mcp__<server>__<tool>)
# ─────────────────────────────────────────────────────────────────────────────
if [[ "$TOOL_NAME" =~ ^mcp__ ]]; then
  # Extract server name: mcp__<server>__<tool> -> mcp__<server>
  # Delimiter is __ (double underscore), server names can contain single underscores
  server_permission=$(echo "$TOOL_NAME" | awk -F'__' '{print $1 "__" $2}')
  approve "$server_permission"
fi

# ─────────────────────────────────────────────────────────────────────────────
# Skills
# ─────────────────────────────────────────────────────────────────────────────
if [[ "$TOOL_NAME" == "Skill" ]]; then
  SKILL_NAME=$(echo "$INPUT" | jq -r '.tool_input.skill // empty')
  [[ -z "$SKILL_NAME" ]] && exit 0

  # Plugin skills have colons (e.g., "plugin:skill")
  if [[ "$SKILL_NAME" == *":"* ]]; then
    PLUGIN_NAME="${SKILL_NAME%%:*}"

    # Check if plugin name exists in claude-plugins-official
    # CAVEAT: This checks if the plugin NAME is registered from official marketplace,
    # not that THIS invocation is from there. A same-named plugin from another
    # marketplace would also be approved. Acceptable tradeoff for simplicity.
    if grep -q "\"${PLUGIN_NAME}@claude-plugins-official\"" "$SETTINGS_FILE" 2>/dev/null; then
      approve "Skill(${PLUGIN_NAME}:*)"
    fi

    # Not from official marketplace - pass through to normal permission flow
    exit 0
  fi

  # Local skills (no colon) - check user-level skills
  if [[ -d "$HOME/.claude/skills/$SKILL_NAME" ]]; then
    approve "Skill(${SKILL_NAME})"
  fi

  # Check project-local skills
  if [[ -n "$CWD" && -d "$CWD/.claude/skills/$SKILL_NAME" ]]; then
    approve "Skill(${SKILL_NAME})"
  fi
fi

exit 0
