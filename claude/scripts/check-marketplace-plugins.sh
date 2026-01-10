#!/bin/bash
# Check if all jasonkuhrt marketplace plugins are in settings (enabled or disabled)
# Only warns about plugins completely missing from settings.json
# Used by SessionStart hook

# Read hook input from stdin (contains session_id)
HOOK_INPUT=$(cat)
SESSION_ID=$(echo "$HOOK_INPUT" | jq --raw-output '.session_id // empty')

# Always output resume command for context
if [[ -n "$SESSION_ID" ]]; then
  echo "Resume this session: claude --resume $SESSION_ID"
fi

MARKETPLACE_DIR="$HOME/.claude/plugins/marketplaces/jasonkuhrt/plugins"
SETTINGS_FILE="$HOME/.claude/settings.json"
EXCLUDES_FILE="$HOME/.claude/marketplace-excludes.txt"

# Get available plugins
available=$(ls -d "$MARKETPLACE_DIR"/*/ 2>/dev/null | xargs -I{} basename {} | sort)

# Get all plugins in settings (both true and false - user has made a choice)
in_settings=$(jq --raw-output '.enabledPlugins | keys[]' "$SETTINGS_FILE" 2>/dev/null | grep '@jasonkuhrt$' | sed 's/@jasonkuhrt$//' | sort)

# Get excludes (if file exists)
excludes=""
if [[ -f "$EXCLUDES_FILE" ]]; then
  excludes=$(grep -v '^#' "$EXCLUDES_FILE" | grep -v '^$' | sort)
fi

# Find missing (available but not in settings at all, minus excludes)
missing=""
for plugin in $available; do
  if ! echo "$in_settings" | grep -q "^${plugin}$"; then
    if [[ -z "$excludes" ]] || ! echo "$excludes" | grep -q "^${plugin}$"; then
      missing="$missing $plugin"
    fi
  fi
done

# Report
if [[ -n "$missing" ]]; then
  echo "New marketplace plugins not in settings:$missing"
  echo "Add with: /plugin install <name>@jasonkuhrt"
fi
