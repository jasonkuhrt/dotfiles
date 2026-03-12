#!/bin/bash
set -e

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

header "Git Maintenance"

if ! has_cmd git; then
    skip "Git maintenance (git not installed)"
    exit 0
fi

repo_root=$(git -C "$DOTFILES_ROOT" rev-parse --show-toplevel 2>/dev/null || true)
if [ -z "$repo_root" ]; then
    skip "Git maintenance (dotfiles repo unavailable)"
    exit 0
fi

local_config="$HOME/.config/git/local.gitconfig"
mkdir -p "$(dirname "$local_config")"
touch "$local_config"

if git config --file "$local_config" --get-all maintenance.repo | grep -Fxq "$repo_root"; then
    skip "Git maintenance scheduler"
    exit 0
fi

info "Registering dotfiles repo for background Git maintenance..."
if GIT_CONFIG_GLOBAL="$local_config" git -C "$repo_root" maintenance start >/dev/null 2>&1; then
    task "Git maintenance scheduler"
else
    warn "Git maintenance setup failed"
fi
