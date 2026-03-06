#!/usr/bin/env bash
set -euo pipefail

repo_root=$(git rev-parse --show-toplevel)
cd "$repo_root"

files=()
while IFS= read -r -d '' file; do
  case "$file" in
    home/dot_config/nvim/lua/*.lua | home/dot_config/nvim/local-plugins/cmd-ux/lua/*.lua)
      files+=("$file")
      ;;
  esac
done < <(git diff --cached --name-only --diff-filter=ACMR -z)

if [ ${#files[@]} -eq 0 ]; then
  exit 0
fi

tmpdir=$(mktemp -d)
cleanup() {
  rm -rf "$tmpdir"
}
trap cleanup EXIT

mkdir -p "$tmpdir/home/dot_config/nvim"
cp .luarc.json "$tmpdir/.luarc.json"
cp selene.toml "$tmpdir/selene.toml"
cp selene.nvim.yml "$tmpdir/selene.nvim.yml"
cp home/dot_config/nvim/stylua.toml "$tmpdir/home/dot_config/nvim/stylua.toml"

for file in "${files[@]}"; do
  mkdir -p "$tmpdir/$(dirname "$file")"
  git show ":$file" > "$tmpdir/$file"
done

printf 'Lua pre-commit: checking staged files\n'
for file in "${files[@]}"; do
  printf '  %s\n' "$file"
done

failed=0

printf '\n[selene]\n'
if ! (
  cd "$tmpdir"
  selene "${files[@]}"
); then
  failed=1
fi

printf '\n[lua-language-server]\n'
for file in "${files[@]}"; do
  if ! (
    cd "$tmpdir"
    lua-language-server --check "$file" --configpath .luarc.json --checklevel=Warning
  ); then
    failed=1
  fi
done

printf '\n[stylua --check]\n'
if ! (
  cd "$tmpdir"
  stylua --check --config-path home/dot_config/nvim/stylua.toml "${files[@]}"
); then
  failed=1
fi

exit "$failed"
