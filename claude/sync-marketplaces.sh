#!/bin/bash
# Sync Claude Code plugin marketplaces

set -e

# Bootstrap JSON if missing (CLI expects it to exist)
JSON="$HOME/.claude/plugins/known_marketplaces.json"
mkdir -p "$HOME/.claude/plugins"
[ -f "$JSON" ] || echo '{}' > "$JSON"

installed=$(claude plugin marketplace list 2>&1)

add_if_missing() {
    local source="$1"
    if ! echo "$installed" | grep -qF "$source"; then
        claude plugin marketplace add "$source"
    fi
}

add_if_missing jasonkuhrt/claude-marketplace
add_if_missing anthropics/claude-plugins-official
add_if_missing obra/superpowers-marketplace

# Force autoUpdate on all
if command -v jq &>/dev/null; then
    jq 'to_entries | map(.value.autoUpdate = true) | from_entries' "$JSON" > "$JSON.tmp" && mv "$JSON.tmp" "$JSON"
fi
