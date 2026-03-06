#!/bin/bash
set -e

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

header "Xcode CLI Tools"

if xcode-select -p &>/dev/null; then
    skip "Xcode CLI tools"
else
    info "Installing Xcode CLI tools..."
    xcode-select --install
    until xcode-select -p &>/dev/null; do
        sleep 5
    done
    task "Xcode CLI tools installed"
fi
