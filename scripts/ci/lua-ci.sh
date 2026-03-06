#!/usr/bin/env bash
set -euo pipefail

repo_root=$(git rev-parse --show-toplevel)
cd "$repo_root"

declare -a changed_files=()

append_changed_files() {
  local file
  while IFS= read -r file; do
    if [ -n "$file" ]; then
      changed_files+=("$file")
    fi
  done
}

default_base_ref() {
  if git symbolic-ref --quiet --short refs/remotes/origin/HEAD >/dev/null 2>&1; then
    git symbolic-ref --quiet --short refs/remotes/origin/HEAD
    return
  fi

  if git rev-parse --verify --quiet origin/main >/dev/null; then
    printf 'origin/main\n'
    return
  fi

  if git rev-parse --verify --quiet origin/master >/dev/null; then
    printf 'origin/master\n'
  fi
}

collect_changed_files() {
  local base_ref base_sha diff_range

  diff_range=${LUA_CI_DIFF_RANGE:-}
  base_sha=${LUA_CI_BASE_SHA:-}
  base_ref=${LUA_CI_BASE_REF:-}

  if [ -n "$diff_range" ]; then
    local diff_output
    if diff_output=$(git diff --name-only --diff-filter=ACMR "$diff_range" 2>/dev/null); then
      append_changed_files <<<"$diff_output"
      return
    fi

    printf 'WARN: ignoring invalid LUA_CI_DIFF_RANGE=%s\n' "$diff_range" >&2
  else
    if [ -z "$base_ref" ] && [ -n "$base_sha" ]; then
      base_ref=$base_sha
    fi

    if [ -z "$base_ref" ]; then
      base_ref=$(default_base_ref || true)
    fi

    if [ -n "$base_ref" ] && git rev-parse --verify --quiet "$base_ref" >/dev/null; then
      local merge_base
      merge_base=$(git merge-base HEAD "$base_ref")
      append_changed_files < <(git diff --name-only --diff-filter=ACMR "$merge_base...HEAD")
    fi
  fi

  append_changed_files < <(git diff --name-only --diff-filter=ACMR)
  append_changed_files < <(git diff --cached --name-only --diff-filter=ACMR)
  append_changed_files < <(git ls-files --others --exclude-standard)
}

matches_regex() {
  local file=$1
  local pattern=$2
  printf '%s\n' "$file" | grep -Eq "$pattern"
}

is_lua_relevant_path() {
  local file=$1

  matches_regex "$file" \
    '^(\.github/workflows/lua\.yml|home/\.config/nvim/(lua|local-plugins/cmd-ux)/.*\.lua|\.luarc\.json|selene\.toml|selene\.nvim\.yml|home/\.config/nvim/stylua\.toml|justfile|scripts/ci/lua-ci\.sh|scripts/git-hooks/check-staged-lua\.sh)$'
}

is_cmd_ux_test_path() {
  local file=$1

  matches_regex "$file" \
    '^(home/\.config/nvim/local-plugins/cmd-ux/.*|home/\.config/nvim/lua/plugins/cmd-ux\.lua)$'
}

collect_changed_files

if [ ${#changed_files[@]} -eq 0 ]; then
  printf 'SKIP: no changed files detected for Lua CI\n'
  exit 0
fi

declare -a unique_files=()

contains_file() {
  local needle=$1
  local item
  for item in "${unique_files[@]}"; do
    if [ "$item" = "$needle" ]; then
      return 0
    fi
  done

  return 1
}

for file in "${changed_files[@]}"; do
  if ! contains_file "$file"; then
    unique_files+=("$file")
  fi
done

declare -a lua_relevant_files=()
declare -a cmd_ux_test_files=()

for file in "${unique_files[@]}"; do
  if is_lua_relevant_path "$file"; then
    lua_relevant_files+=("$file")
  fi

  if is_cmd_ux_test_path "$file"; then
    cmd_ux_test_files+=("$file")
  fi
done

if [ ${#lua_relevant_files[@]} -eq 0 ]; then
  printf 'SKIP: no Lua or Lua-tooling changes detected\n'
  exit 0
fi

printf 'Lua CI: relevant changes detected\n'
for file in "${lua_relevant_files[@]}"; do
  printf '  %s\n' "$file"
done

printf '\n[just lua-check]\n'
just lua-check

if [ ${#cmd_ux_test_files[@]} -eq 0 ]; then
  printf '\nSKIP: cmd-ux tests not needed for this change set\n'
  exit 0
fi

printf '\n[just cmd-ux-test]\n'
just cmd-ux-test
