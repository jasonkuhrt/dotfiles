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

if brew bundle check --file="$BREWFILE" &>/dev/null; then
    skip "Homebrew packages (all installed)"
else
    # Install formulae first (no sudo needed)
    info "Installing formulae..."
    if HOMEBREW_BUNDLE_CASK_SKIP=1 HOMEBREW_BUNDLE_MAS_SKIP=1 brew bundle --file="$BREWFILE"; then
        task "Formulae installed"
    else
        warn "Some formulae may have failed"
    fi

    # Install casks (may need sudo for system locations)
    info "Installing casks (may prompt for password)..."
    grep -E "^cask " "$BREWFILE" | sed 's/cask "//;s/".*//' | while read -r cask; do
        if ! brew list --cask "$cask" &>/dev/null; then
            printf "    ${DIM}Installing %s...${RESET}\n" "$cask"
            if brew install --cask "$cask" 2>&1; then
                task "$cask"
            else
                warn "Failed to install $cask"
            fi
        fi
    done

    # Install Mac App Store apps
    if grep -qE "^mas " "$BREWFILE"; then
        info "Installing Mac App Store apps..."
        if HOMEBREW_BUNDLE_BREW_SKIP=1 HOMEBREW_BUNDLE_CASK_SKIP=1 brew bundle --file="$BREWFILE"; then
            task "Mac App Store apps installed"
        else
            warn "Some MAS apps may have failed"
        fi
    fi
fi
