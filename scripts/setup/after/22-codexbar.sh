#!/bin/bash
set -euo pipefail

# dotctl:watch scripts/data/codexbar-local.json
# dotctl:watch scripts/setup/codexbar.py

[[ "$OSTYPE" == darwin* ]] || exit 0

# Homebrew's setup phase owns the app and uv. Keep the installed helper version
# on existing machines; use the verified version when bootstrapping a new Mac.
export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"
command -v codexbar >/dev/null || { echo "Install CodexBar from the Brewfile first." >&2; exit 1; }
if ! command -v cswap >/dev/null; then
    uv tool install 'claude-swap==0.26.0'
fi

exec /usr/bin/python3 "$DOTFILES_ROOT/scripts/setup/codexbar.py"
