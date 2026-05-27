#!/bin/bash
set -euo pipefail

# dotctl:watch scripts/data/gh-extensions.txt

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

header "GitHub CLI Extensions"

if ! has_cmd gh; then
    warn "GitHub CLI not installed, skipping extensions"
    exit 0
fi

extensions_file="$DOTFILES_ROOT/scripts/data/gh-extensions.txt"
if [ ! -f "$extensions_file" ]; then
    warn "GitHub CLI extensions manifest missing: $extensions_file"
    exit 0
fi

while IFS= read -r line || [ -n "$line" ]; do
    extension="$(printf '%s' "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
    [[ "$extension" =~ ^#.*$ || -z "$extension" ]] && continue

    repo_name="${extension##*/}"
    command_name="${repo_name#gh-}"

    if gh extension list | grep -F "$extension" >/dev/null 2>&1 || gh "$command_name" --help >/dev/null 2>&1; then
        skip "$extension"
        continue
    fi

    info "Installing $extension..."
    gh extension install "$extension"
    task "$extension"
done < "$extensions_file"
