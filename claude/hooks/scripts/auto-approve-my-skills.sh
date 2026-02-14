#!/bin/bash
# Auto-approve any skill that exists on this machine:
# - Enabled plugins
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

# 1. Check if from an enabled plugin
if [[ -n "$plugin_name" ]]; then
  settings_file="$HOME/.claude/settings.json"
  if [[ -f "$settings_file" ]]; then
    is_enabled=$(jq -r --arg p "$plugin_name" '
      .enabledPlugins | to_entries | map(select(.key | startswith($p + "@")) | .value) | any
    ' "$settings_file")
    if [[ "$is_enabled" == "true" ]]; then
      approve "Enabled plugin: $plugin_name"
    fi
  fi
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

exit 0
