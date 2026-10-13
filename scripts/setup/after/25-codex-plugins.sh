#!/bin/bash
set -euo pipefail

# dotctl:watch scripts/data/codex-plugins.txt

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

header "Codex Plugins"

if ! has_cmd codex; then
    warn "Codex CLI not installed, skipping plugins"
    exit 0
fi

plugins_file="$DOTFILES_ROOT/scripts/data/codex-plugins.txt"
if [ ! -f "$plugins_file" ]; then
    warn "Codex plugins manifest missing: $plugins_file"
    exit 0
fi

# Codex records an install in ~/.codex/config.toml, which also holds machine
# state, so the manifest is the source of truth and the CLI applies it.
while read -r plugin source || [ -n "$plugin" ]; do
    [[ "$plugin" =~ ^#.*$ || -z "$plugin" ]] && continue

    marketplace="${plugin##*@}"

    if codex plugin list --marketplace "$marketplace" 2>/dev/null |
        awk -v plugin="$plugin" '$1 == plugin && $2 ~ /^installed/ { found = 1 } END { exit !found }'; then
        skip "$plugin"
        continue
    fi

    info "Installing $plugin..."
    if ! codex plugin marketplace list |
        awk -v marketplace="$marketplace" '$1 == marketplace { found = 1 } END { exit !found }'; then
        codex plugin marketplace add "$source"
    fi
    codex plugin add "$plugin"
    task "$plugin"
done < "$plugins_file"
