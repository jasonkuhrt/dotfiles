#!/bin/bash
set -e

# dotctl:watch scripts/data/npm/global-packages.txt

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

header "npm Global Packages"

# Same precedence as a login shell: the npm in ~/.npm-global, then pnpm's node, then Homebrew.
# On a fresh machine ~/.npm-global is empty, so the first npm is Homebrew node's bundled one.
if [ -f "/opt/homebrew/bin/brew" ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
fi
PNPM_HOME="$HOME/Library/pnpm"
export PATH="$HOME/.npm-global/bin:$PNPM_HOME/bin:$PATH"

if ! has_cmd npm; then
    warn "npm not installed, skipping global packages"
    exit 0
fi

mkdir -p "$HOME/.npm-global/bin"

GLOBALS_FILE="$DOTFILES_ROOT/scripts/data/npm/global-packages.txt"

info "Installing global packages to ~/.npm-global..."
while IFS= read -r item || [ -n "$item" ]; do
    [[ "$item" =~ ^#.*$ || -z "$item" ]] && continue
    if npm list -g "$item" &>/dev/null; then
        skip "$item"
    else
        if npm install -g "$item" &>/dev/null; then
            task "$item"
        else
            warn "Failed to install $item"
        fi
    fi
done < "$GLOBALS_FILE"

info "Upgrading global packages to latest..."
if npm update -g &>/dev/null; then
    task "Global packages upgraded"
else
    warn "npm update -g failed"
fi
