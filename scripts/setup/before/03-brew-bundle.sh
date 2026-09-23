#!/bin/bash
set -e

# dotctl:watch scripts/data/Brewfile

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

header "Homebrew Packages"

# Ensure Homebrew is in PATH (Apple Silicon)
if [ -f "/opt/homebrew/bin/brew" ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
fi

if ! has_cmd brew; then
    warn "Homebrew not installed, skipping"
    exit 0
fi

BREWFILE="$DOTFILES_ROOT/scripts/data/Brewfile"

# --no-upgrade: without it, self-updating casks (loom, 1password, notion) always read as
# outdated, so the check can never pass. HOMEBREW_BUNDLE_*_SKIP take space-separated entry
# names rather than booleans, so the old staged install ran the whole bundle anyway, and the
# cask loop that followed dropped entry options such as `trusted:`.
if brew bundle check --no-upgrade --file="$BREWFILE" &>/dev/null; then
    skip "Homebrew packages (all installed)"
else
    info "Converging Homebrew packages (casks may prompt for a password)..."
    if brew bundle --file="$BREWFILE"; then
        task "Homebrew packages converged"
    else
        warn "Some Homebrew entries failed"
    fi
fi
