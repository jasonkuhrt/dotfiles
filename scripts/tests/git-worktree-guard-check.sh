#!/usr/bin/env bash
set -euo pipefail

repo_root="$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)"
hook="$repo_root/home/.claude/hooks/scripts/git-worktree-guard.sh"

fail() {
  printf 'FAIL: %s\n' "$1" >&2
  if [ -n "${2:-}" ] && [ -f "${2:-}" ]; then
    printf '\n--- Output (%s) ---\n' "$2" >&2
    sed -n '1,160p' "$2" >&2 || true
  fi
  exit 1
}

assert_eq() {
  local expected="$1"
  local actual="$2"
  local message="$3"

  if [ "$expected" != "$actual" ]; then
    fail "$message (expected $expected, got $actual)"
  fi
}

assert_contains() {
  local file="$1"
  local pattern="$2"
  local label="$3"

  if ! grep -Eq "$pattern" "$file"; then
    fail "$label did not contain expected pattern: $pattern" "$file"
  fi
}

bash -n "$hook"

workspace_root="$(mktemp -d "${TMPDIR:-/tmp}/git-worktree-guard.XXXXXX")"
cleanup() {
  rm -rf "$workspace_root"
}
trap cleanup EXIT

repo_dir="$workspace_root/repo"
mkdir -p "$repo_dir"
git -C "$repo_dir" init -b main >/dev/null
git -C "$repo_dir" config user.name "git-worktree-guard test"
git -C "$repo_dir" config user.email "git-worktree-guard@example.com"
printf 'seed\n' >"$repo_dir/seed.txt"
git -C "$repo_dir" add seed.txt
git -C "$repo_dir" commit -m init >/dev/null
git -C "$repo_dir" branch feature

run_hook() {
  local command_text="$1"
  local output_file="$2"
  local payload

  payload="$(python3 - "$command_text" "$repo_dir" <<'PY'
import json
import sys

command_text, cwd = sys.argv[1], sys.argv[2]
print(json.dumps({"tool_input": {"command": command_text}, "cwd": cwd}))
PY
)"

  set +e
  (
    cd "$repo_dir"
    printf '%s\n' "$payload" | "$hook"
  ) >"$output_file" 2>&1
  hook_rc=$?
  set -e
}

stash_list_output="$workspace_root/stash-list.out"
stash_show_output="$workspace_root/stash-show.out"
stash_push_output="$workspace_root/stash-push.out"
switch_output="$workspace_root/switch.out"
checkout_file_output="$workspace_root/checkout-file.out"
checkout_branch_output="$workspace_root/checkout-branch.out"

run_hook "git stash list" "$stash_list_output"
assert_eq "0" "$hook_rc" "git stash list was unexpectedly blocked"

run_hook "git stash show" "$stash_show_output"
assert_eq "0" "$hook_rc" "git stash show was unexpectedly blocked"

run_hook "git checkout -- seed.txt" "$checkout_file_output"
assert_eq "0" "$hook_rc" "file-targeted git checkout was unexpectedly blocked"

run_hook "git stash push -m test" "$stash_push_output"
assert_eq "2" "$hook_rc" "git stash push was unexpectedly allowed"
assert_contains "$stash_push_output" 'BLOCKED: git branch switch / stash is not allowed' "git stash push output"

run_hook "git switch feature" "$switch_output"
assert_eq "2" "$hook_rc" "git switch was unexpectedly allowed"
assert_contains "$switch_output" 'BLOCKED: git branch switch / stash is not allowed' "git switch output"

run_hook "git checkout feature" "$checkout_branch_output"
assert_eq "2" "$hook_rc" "branch-switching git checkout was unexpectedly allowed"
assert_contains "$checkout_branch_output" 'BLOCKED: git branch switch / stash is not allowed' "git checkout feature output"

printf 'PASS: git-worktree-guard-check\n'
