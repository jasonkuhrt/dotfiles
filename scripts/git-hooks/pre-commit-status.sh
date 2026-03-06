#!/usr/bin/env bash
set -euo pipefail

repo_root=$(git rev-parse --show-toplevel)
hook_path="$repo_root/.git/hooks/pre-commit"

if [ ! -f "$hook_path" ]; then
  printf 'pre-commit hook: missing\n'
  exit 1
fi

if grep -q '^# --- BEGIN DOTFILES LUA PRE-COMMIT ---$' "$hook_path"; then
  printf 'pre-commit hook: dotfiles Lua hook installed\n'
  exit 0
fi

printf 'pre-commit hook: dotfiles Lua hook not installed\n'
exit 1
