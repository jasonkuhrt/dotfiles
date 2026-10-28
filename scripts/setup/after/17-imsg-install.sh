#!/bin/bash
set -euo pipefail

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

if [[ "$OSTYPE" != darwin* ]]; then
    exit 0
fi

header "imsg (Messages CLI)"

if has_cmd imsg; then
    skip "imsg (Messages CLI)"
    exit 0
fi

if ! has_cmd brew; then
    warn "Homebrew is required to install imsg"
    exit 1
fi

info "Installing imsg through the steipete Homebrew tap"
brew install steipete/tap/imsg
task "imsg $(imsg --version) installed"
