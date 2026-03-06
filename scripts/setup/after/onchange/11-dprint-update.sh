#!/bin/bash
set -e

# dotctl:watch symlink-roots/config/dprint/dprint.json

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

header "dprint"

# Ensure Homebrew is in PATH (Apple Silicon)
if [ -f "/opt/homebrew/bin/brew" ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
fi

if has_cmd dprint; then
    if dprint config update --config "$HOME/.config/dprint/dprint.json" 2>/dev/null; then
        task "dprint plugins updated"
    else
        warn "dprint config update failed"
    fi
else
    skip "dprint (not installed)"
fi
