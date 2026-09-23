#!/bin/bash
set -e

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

header "VS Code Extensions"

if ! has_cmd code; then
    skip "VS Code (not installed)"
    exit 0
fi

manifest="$DOTFILES_ROOT/scripts/data/vscode-extensions.txt"

if [ ! -f "$manifest" ]; then
    warn "Manifest not found: $manifest"
    exit 0
fi

# Skip if all extensions in manifest are already installed.
installed_now="$(code --list-extensions 2>/dev/null | sort)"
manifest_clean="$(grep -v '^#' "$manifest" | grep -v '^[[:space:]]*$' | sort)"

if [ "$installed_now" = "$manifest_clean" ]; then
    skip "VS Code extensions ($(echo "$manifest_clean" | wc -l | tr -d ' ') in sync)"
    exit 0
fi

info "Syncing VS Code extensions from manifest..."

while IFS= read -r ext; do
    [[ -z "$ext" || "$ext" == \#* ]] && continue

    # jasonkuhrt.* are private/local extensions not on the marketplace.
    # `code --install-extension <id>` will fail for them. They must be
    # built and installed manually from their respective project dirs
    # (e.g., cd ~/projects/jasonkuhrt/vscode-utils && bun run package &&
    #  code --install-extension *.vsix). Skip them here, warn loudly.
    if [[ "$ext" == jasonkuhrt.* ]]; then
        if echo "$installed_now" | grep -q "^$ext$"; then
            continue
        fi
        warn "Local extension $ext not installed — build manually from project dir"
        continue
    fi

    if echo "$installed_now" | grep -q "^$ext$"; then
        continue
    fi

    if code --install-extension "$ext" --force >/dev/null 2>&1; then
        task "Installed $ext"
    else
        warn "Failed to install $ext"
    fi
done < "$manifest"
