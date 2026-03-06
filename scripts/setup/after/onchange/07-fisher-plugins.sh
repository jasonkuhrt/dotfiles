#!/bin/bash
set -e

# dotctl:watch home/dot_config/fish/fish_plugins

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

header "Fisher Plugins"

# Ensure Homebrew is in PATH (Apple Silicon)
if [ -f "/opt/homebrew/bin/brew" ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
fi

if ! has_cmd fish; then
    warn "Fish not installed, skipping Fisher plugins"
    exit 0
fi

if [ ! -f "$HOME/.config/fish/functions/fisher.fish" ]; then
    warn "Fisher not installed, skipping plugin sync"
    exit 0
fi

info "Syncing Fisher plugins..."
if fish -c "fisher update"; then
    task "Fisher plugins synced"
else
    warn "Fisher update failed"
fi
