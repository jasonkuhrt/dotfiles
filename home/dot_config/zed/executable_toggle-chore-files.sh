#!/usr/bin/env bash
# Toggle chore file visibility in Zed's project panel
# Works by swapping hide_gitignore setting (requires chore files in .gitignore)

SETTINGS="$HOME/.config/zed/settings.json"

# Check current state using grep (handles JSONC)
if grep -q '"hide_gitignore": true' "$SETTINGS"; then
    # Currently hidden -> show them
    sed -i '' 's/"hide_gitignore": true/"hide_gitignore": false/' "$SETTINGS"
    echo "✓ Chore files now VISIBLE"
elif grep -q '"hide_gitignore": false' "$SETTINGS"; then
    # Currently visible -> hide them
    sed -i '' 's/"hide_gitignore": false/"hide_gitignore": true/' "$SETTINGS"
    echo "✓ Chore files now HIDDEN"
else
    echo "⚠ No hide_gitignore setting found. Add to project_panel section in settings.json"
    exit 1
fi
