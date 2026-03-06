#!/usr/bin/env bash
set -euo pipefail

repo_root=$(git rev-parse --show-toplevel)
hook_path="$repo_root/.git/hooks/pre-commit"
tmpfile=$(mktemp)

cleanup() {
  rm -f "$tmpfile"
}
trap cleanup EXIT

if [ -f "$hook_path" ]; then
  awk '
    BEGIN { skip = 0 }
    /^# --- BEGIN DOTFILES LUA PRE-COMMIT ---$/ { skip = 1; next }
    /^# --- END DOTFILES LUA PRE-COMMIT ---$/ { skip = 0; next }
    skip == 0 { print }
  ' "$hook_path" > "$tmpfile"
else
  printf '#!/usr/bin/env sh\n' > "$tmpfile"
fi

cat <<'EOF' >> "$tmpfile"
# --- BEGIN DOTFILES LUA PRE-COMMIT ---
repo_root=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
if [ -x "$repo_root/scripts/git-hooks/check-staged-lua.sh" ]; then
  "$repo_root/scripts/git-hooks/check-staged-lua.sh" "$@"
  _dotfiles_lua_exit=$?
  if [ "$_dotfiles_lua_exit" -ne 0 ]; then
    exit "$_dotfiles_lua_exit"
  fi
fi
# --- END DOTFILES LUA PRE-COMMIT ---
EOF

chmod +x "$tmpfile"
mv "$tmpfile" "$hook_path"

printf 'Installed dotfiles Lua pre-commit hook into %s\n' "$hook_path"
