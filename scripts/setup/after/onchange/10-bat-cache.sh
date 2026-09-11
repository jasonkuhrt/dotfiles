#!/bin/bash
set -e

# dotctl:watch home/.config/bat/themes

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

header "bat theme cache"

if ! has_cmd bat; then
    skip "bat (not installed)"
    exit 0
fi

# delta reads bat's theme cache, so syntax-theme = tokyonight_night in .gitconfig
# only resolves once this has run.
bat cache --build >/dev/null
task "bat theme cache built (delta syntax-theme tokyonight_night)"
