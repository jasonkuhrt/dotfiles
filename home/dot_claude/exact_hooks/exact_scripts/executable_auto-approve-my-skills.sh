#!/bin/bash
# Auto-approve any skill that exists on this machine:
# - Enabled plugins (project or user settings)
# - Project-local skills (.claude/skills/)
# - User-level skills (~/.claude/skills/)

input=$(cat)
tool_name=$(echo "$input" | jq -r '.tool_name // empty')

# Only process Skill tool calls
if [[ "$tool_name" != "Skill" ]]; then
  exit 0
fi

skill=$(echo "$input" | jq -r '.tool_input.skill // empty')
if [[ -z "$skill" ]]; then
  exit 0
fi

approve() {
  local reason="$1"
  cat <<EOF
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow",
    "permissionDecisionReason": "$reason"
  }
}
EOF
  exit 0
}

# Extract plugin name and skill name
if [[ "$skill" == *":"* ]]; then
  plugin_name="${skill%%:*}"
  skill_name="${skill#*:}"
else
  plugin_name=""
  skill_name="$skill"
fi

# 1. Check if from an enabled plugin (project or user settings)
# If skill has a prefix (e.g., "superpowers:capture-spark"), check that specific plugin.
# If no prefix, we'll check for enabled plugins after local skill checks fail.
if [[ -n "$plugin_name" ]]; then
  for settings_file in "$CLAUDE_PROJECT_DIR/.claude/settings.json" "$HOME/.claude/settings.json"; do
    if [[ -f "$settings_file" ]]; then
      is_enabled=$(jq -r --arg p "$plugin_name" '
        .enabledPlugins | to_entries | map(select(.key | startswith($p + "@")) | .value) | any
      ' "$settings_file" 2>/dev/null)
      if [[ "$is_enabled" == "true" ]]; then
        approve "Enabled plugin: $plugin_name"
      fi
    fi
  done
fi

# 2. Check project-local skills
if [[ -n "$CLAUDE_PROJECT_DIR" ]]; then
  project_skills="$CLAUDE_PROJECT_DIR/.claude/skills"
  if [[ -d "$project_skills/$skill_name" ]] || [[ -f "$project_skills/$skill_name.md" ]]; then
    approve "Project-local skill: $skill_name"
  fi
fi

# 3. Check user-level skills
user_skills="$HOME/.claude/skills"
if [[ -d "$user_skills/$skill_name" ]] || [[ -f "$user_skills/$skill_name.md" ]]; then
  approve "User skill: $skill_name"
fi

# 4. Fallback: if no prefix and not found locally, check if ANY plugin is enabled
# Trust that CC will reject invalid skill names - this handles plugin skills invoked without prefix
if [[ -z "$plugin_name" ]]; then
  for settings_file in "$CLAUDE_PROJECT_DIR/.claude/settings.json" "$HOME/.claude/settings.json"; do
    if [[ -f "$settings_file" ]]; then
      has_plugins=$(jq -r '.enabledPlugins | to_entries | map(select(.value == true)) | length > 0' "$settings_file" 2>/dev/null)
      if [[ "$has_plugins" == "true" ]]; then
        approve "Enabled plugin skill (unqualified): $skill_name"
      fi
    fi
  done
fi

exit 0
