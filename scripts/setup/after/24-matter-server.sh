#!/bin/bash
set -euo pipefail

# dotctl:watch scripts/data/matter-server-version.txt

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

header "Matter Server"

version_file="$DOTFILES_ROOT/scripts/data/matter-server-version.txt"
version="$(tr -d '[:space:]' < "$version_file")"
if [ -z "$version" ]; then
    warn "Pinned matter-server version is empty"
    exit 1
fi

if ! has_cmd node || ! has_cmd npm; then
    warn "Node.js is missing; 04-node-toolchain.sh installs it."
    exit 1
fi

# The package publishes no bin entry, so neither `npx matter-server` nor a
# global install yields a command. Install it into its own directory and let
# home/.local/bin/matter-server run the entry file.
install_root="$HOME/.local/share/matter-server"
manifest="$install_root/node_modules/matter-server/package.json"

current_version=""
if [ -f "$manifest" ]; then
    current_version="$(node -p "require('$manifest').version")"
fi

if [ "$current_version" = "$version" ]; then
    skip "matter-server $version"
    exit 0
fi

mkdir -p "$install_root"
if [ ! -f "$install_root/package.json" ]; then
    printf '{\n  "private": true\n}\n' > "$install_root/package.json"
fi

info "Installing matter-server $version"
npm install --prefix "$install_root" --save-exact --no-fund --no-audit "matter-server@$version"

task "matter-server $version installed to $install_root"
