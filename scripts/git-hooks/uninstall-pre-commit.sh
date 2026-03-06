#!/usr/bin/env bash
set -euo pipefail

repo_root=$(git rev-parse --show-toplevel)
hook_path="$repo_root/.git/hooks/pre-commit"

if [ ! -f "$hook_path" ]; then
  printf 'No pre-commit hook found at %s\n' "$hook_path"
  exit 0
fi

tmpfile=$(mktemp)
cleanup() {
  rm -f "$tmpfile"
}
trap cleanup EXIT

awk '
  BEGIN { skip = 0 }
  /^# --- BEGIN DOTFILES LUA PRE-COMMIT ---$/ { skip = 1; next }
  /^# --- END DOTFILES LUA PRE-COMMIT ---$/ { skip = 0; next }
  skip == 0 { print }
' "$hook_path" > "$tmpfile"

chmod +x "$tmpfile"
mv "$tmpfile" "$hook_path"

printf 'Removed dotfiles Lua pre-commit hook from %s\n' "$hook_path"
