#!/bin/bash
set -e

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

header "Node.js Toolchain"

# Ensure Homebrew is in PATH (Apple Silicon)
if [ -f "/opt/homebrew/bin/brew" ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
fi

# pnpm manages node versions; brew's node is just for bootstrapping pnpm
PNPM_HOME="$HOME/Library/pnpm"

if has_cmd pnpm; then
    if [ ! -d "$PNPM_HOME/nodejs" ]; then
        info "Installing Node.js LTS via pnpm..."
        if pnpm env use --global lts; then
            task "Node.js LTS installed"
        else
            warn "pnpm env failed"
        fi
    else
        skip "Node.js LTS (already managed by pnpm)"
    fi
    export PATH="$PNPM_HOME:$PATH"
else
    warn "pnpm not installed, skipping Node.js setup"
    exit 0
fi
