#!/bin/bash
set -euo pipefail

# dotctl:watch scripts/data/velja.json
# dotctl:watch scripts/setup/velja.py

[[ "$OSTYPE" == darwin* ]] || exit 0

exec /usr/bin/python3 "$DOTFILES_ROOT/scripts/setup/velja.py"
