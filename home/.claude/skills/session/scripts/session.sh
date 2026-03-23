#!/bin/bash
# @describe Manage shared worktree sessions

set -euo pipefail

log() {
  printf '%s\n' "[session] $*" >&2
}

warn() {
  printf '%s\n' "[session] warning: $*" >&2
}

soft_bail_without_argc() {
  command_name="${1:-command}"
  warn "argc is not installed; skipping session ${command_name}. Install \`argc\` to enable this workflow."
  exit 0
}

if ! command -v argc >/dev/null 2>&1; then
  soft_bail_without_argc "${1:-command}"
fi

repo_root() {
  git rev-parse --show-toplevel
}

main_worktree() {
  git worktree list --porcelain | sed -n 's/^worktree //p' | head -1
}

list_worktrees() {
  git worktree list --porcelain | sed -n 's/^worktree //p'
}

current_branch() {
  git symbolic-ref --quiet --short HEAD 2>/dev/null || true
}

script_path() {
  local script_source="${BASH_SOURCE[0]:-$0}"
  local script_dir
  script_dir="$(cd "$(dirname "$script_source")" && pwd)"
  printf '%s/%s\n' "$script_dir" "$(basename "$script_source")"
}

slugify() {
  printf '%s' "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//; s/-+/-/g'
}

resolve_session_key() {
  branch_name="$1"
  issue_key=$(printf '%s\n' "$branch_name" | tr '[:lower:]' '[:upper:]' | grep -Eo 'HEA-[0-9]+' | head -1 || true)

  if [[ -n "$issue_key" ]]; then
    printf '%s\n' "$issue_key"
    return 0
  fi

  if [[ -z "$branch_name" ]]; then
    detached_head=$(git rev-parse --short HEAD 2>/dev/null || printf 'detached')
    branch_name="detached-$detached_head"
  fi

  slug=$(slugify "$branch_name")
  if [[ -n "$slug" ]]; then
    printf '%s\n' "$slug"
  else
    printf '%s\n' detached
  fi
}

ensure_session_template() {
  session_key="$1"
  session_file="$2"

  if [[ -e "$session_file" ]]; then
    return 0
  fi

  mkdir -p "$(dirname "$session_file")"
  cat >"$session_file" <<EOF
# $session_key

## Mission

## Decisions

## Tasks

- [ ] Capture the current mission.
EOF
  log "created $session_file"
}

ensure_local_excludes() {
  info_exclude="$(git rev-parse --git-path info/exclude)"
  mkdir -p "$(dirname "$info_exclude")"
  touch "$info_exclude"

  for pattern in ".session" ".sessions" "node_modules"; do
    if ! grep -Fxq "$pattern" "$info_exclude"; then
      printf '%s\n' "$pattern" >>"$info_exclude"
      log "added $pattern to $info_exclude"
    fi
  done
}

ensure_shared_sessions_root() {
  repo_root_path="$1"
  main_root="$2"
  shared_root="$main_root/.sessions"

  if [[ "$repo_root_path" == "$main_root" ]]; then
    if [[ -L "$shared_root" ]]; then
      warn "expected $shared_root to be a real directory, found a symlink"
      return 1
    fi
    mkdir -p "$shared_root"
    return 0
  fi

  if [[ ! -d "$shared_root" ]]; then
    mkdir -p "$shared_root"
    log "created $shared_root"
  fi

  local_root="$repo_root_path/.sessions"
  if [[ -e "$local_root" && ! -L "$local_root" ]]; then
    warn "skipping .sessions sync because $local_root exists and is not a symlink"
    return 1
  fi

  current_target=$(readlink "$local_root" 2>/dev/null || printf '')
  if [[ "$current_target" != "$shared_root" ]]; then
    ln -sfn "$shared_root" "$local_root"
    log "linked $local_root -> $shared_root"
  fi

  return 0
}

ensure_active_session_symlink() {
  repo_root_path="$1"
  session_key="$2"
  local_link="$repo_root_path/.session"
  target=".sessions/$session_key"

  if [[ -e "$local_link" && ! -L "$local_link" ]]; then
    warn "skipping .session sync because $local_link exists and is not a symlink"
    return 1
  fi

  current_target=$(readlink "$local_link" 2>/dev/null || printf '')
  if [[ "$current_target" != "$target" ]]; then
    ln -sfn "$target" "$local_link"
    log "linked $local_link -> $target"
  fi

  return 0
}

sync_impl() {
  repo_root_path=$(repo_root)
  main_root=$(main_worktree)
  branch_name=$(current_branch)
  session_key=$(resolve_session_key "$branch_name")
  shared_root="$main_root/.sessions"
  session_dir="$shared_root/$session_key"

  ensure_local_excludes
  ensure_shared_sessions_root "$repo_root_path" "$main_root"

  mkdir -p "$session_dir/plans" "$session_dir/reviews"
  ensure_session_template "$session_key" "$session_dir/SESSION.md"
  ensure_active_session_symlink "$repo_root_path" "$session_key"
}

sync_all_impl() {
  local cli_path
  local failure_count

  cli_path="$(script_path)"
  failure_count=0

  while IFS= read -r worktree_root; do
    if [[ -z "$worktree_root" ]]; then
      continue
    fi

    if (cd "$worktree_root" && "$cli_path" sync >/dev/null); then
      log "synced $worktree_root"
    else
      warn "failed to sync $worktree_root"
      failure_count=$((failure_count + 1))
    fi
  done < <(list_worktrees)

  [[ "$failure_count" -eq 0 ]]
}

# @cmd Show current session wiring for this checkout
status() {
  repo_root_path=$(repo_root)
  main_root=$(main_worktree)
  branch_name=$(current_branch)
  session_key=$(resolve_session_key "$branch_name")

  echo "repo_root=$repo_root_path"
  echo "main_worktree=$main_root"
  echo "branch=${branch_name:-DETACHED}"
  echo "session_key=$session_key"
  echo "shared_sessions_root=$main_root/.sessions"
  echo "session_dir=$main_root/.sessions/$session_key"
  echo "local_sessions_path=$repo_root_path/.sessions"
  echo "local_session_path=$repo_root_path/.session"
}

# @cmd Sync the current checkout's session wiring
sync() {
  sync_impl
}

# @cmd Sync session wiring for every current git worktree
sync_all() {
  sync_all_impl
}

# @cmd Sync session wiring for git-hook automation
hook_sync() {
  if ! sync_impl; then
    warn "hook sync skipped due to an existing local path conflict"
  fi
}

eval "$(argc --argc-eval "$0" "$@")"
