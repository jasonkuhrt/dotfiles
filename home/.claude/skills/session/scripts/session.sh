#!/bin/bash
# @describe Manage shared worktree sessions

set -euo pipefail

# --- Logging ---

log() { printf '%s\n' "[session] $*" >&2; }
warn() { printf '%s\n' "[session] warning: $*" >&2; }

# --- argc check ---

soft_bail_without_argc() {
  command_name="${1:-command}"
  warn "argc is not installed; skipping session ${command_name}. Install \`argc\` to enable this workflow."
  exit 0
}

if ! command -v argc >/dev/null 2>&1; then
  soft_bail_without_argc "${1:-command}"
fi

# --- Git helpers ---

repo_root() { git rev-parse --show-toplevel; }
main_worktree() { git worktree list --porcelain | sed -n 's/^worktree //p' | head -1; }
list_worktrees() { git worktree list --porcelain | sed -n 's/^worktree //p'; }
current_branch() { git symbolic-ref --quiet --short HEAD 2>/dev/null || true; }

script_path() {
  local script_source="${BASH_SOURCE[0]:-$0}"
  local script_dir
  script_dir="$(cd "$(dirname "$script_source")" && pwd)"
  printf '%s/%s\n' "$script_dir" "$(basename "$script_source")"
}

# --- Path helpers ---

slugify() {
  printf '%s' "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//; s/-+/-/g'
}

# Resolve a path to its canonical (physical) form, handling macOS /tmp -> /private/tmp.
canonical_path() {
  if [[ -d "$1" ]]; then
    (cd "$1" && pwd -P)
  elif [[ -e "$1" ]]; then
    local dir base
    dir="$(cd "$(dirname "$1")" && pwd -P)"
    base="$(basename "$1")"
    printf '%s/%s\n' "$dir" "$base"
  else
    printf '%s\n' "$1"
  fi
}

resolve_session_key() {
  local branch_name="$1"
  local issue_key
  issue_key=$(printf '%s\n' "$branch_name" | tr '[:lower:]' '[:upper:]' | grep -Eo 'HEA-[0-9]+' | head -1 || true)

  if [[ -n "$issue_key" ]]; then
    printf '%s\n' "$issue_key"
    return 0
  fi

  if [[ -z "$branch_name" ]]; then
    local detached_head
    detached_head=$(git rev-parse --short HEAD 2>/dev/null || printf 'detached')
    branch_name="detached-$detached_head"
  fi

  local slug
  slug=$(slugify "$branch_name")
  if [[ -n "$slug" ]]; then
    printf '%s\n' "$slug"
  else
    printf '%s\n' detached
  fi
}

# --- Session template ---

REQUIRED_SESSION_SECTIONS=("Mission" "Decisions" "Tasks")
REQUIRED_TASK_SECTIONS=("Active" "Todo" "Done")

session_template() {
  local session_key="$1"
  cat <<EOF
# $session_key

## Mission

## Decisions

## Tasks

### Current List

- \`main\`
EOF
}

task_list_template() {
  local list_name="$1"
  cat <<EOF
# Task List: $list_name

### Active

- [ ] Capture the current mission.

### Todo

### Done
EOF
}

extract_current_list_name() {
  local session_file="$1"

  awk '
    /^### Current List$/ { in_current_list = 1; next }
    /^### / && in_current_list { exit }
    in_current_list {
      if (match($0, /`([^`]+)`/)) {
        print substr($0, RSTART + 1, RLENGTH - 2)
        exit
      }
    }
  ' "$session_file"
}

# --- Reconciliation engine ---
#
# Single engine used by sync, doctor, and hook-sync. The _mode variable
# controls verbosity and error handling:
#   sync   — quiet, abort on first error
#   hook   — quiet, collect errors, exit non-zero on failure
#   doctor — verbose (OK/FIXED/ERROR per check), collect all errors

_mode=""
_ok_count=0
_fixed_count=0
_error_count=0

_report_ok() {
  _ok_count=$((_ok_count + 1))
  if [[ "$_mode" == "doctor" ]]; then
    printf '  OK    %s\n' "$1"
  fi
}

_report_fixed() {
  _fixed_count=$((_fixed_count + 1))
  case "$_mode" in
    doctor) printf '  FIXED %s\n' "$1" ;;
    *) log "$1" ;;
  esac
}

_report_error() {
  _error_count=$((_error_count + 1))
  case "$_mode" in
    doctor) printf '  ERROR %s\n' "$1" ;;
    *) warn "$1" ;;
  esac
}

_section() {
  if [[ "$_mode" == "doctor" ]]; then
    printf '\n%s\n' "$1"
  fi
}

_reconcile_excludes() {
  local info_exclude
  info_exclude="$(git rev-parse --git-path info/exclude)"
  mkdir -p "$(dirname "$info_exclude")"
  touch "$info_exclude"

  for pattern in ".session" ".sessions"; do
    if grep -Fxq "$pattern" "$info_exclude"; then
      _report_ok "$pattern in git excludes"
    else
      printf '%s\n' "$pattern" >>"$info_exclude"
      _report_fixed "added $pattern to git excludes"
    fi
  done
}

_reconcile_shared_sessions_root() {
  local repo_root_path="$1" main_root="$2" shared_root="$3"

  if [[ "$repo_root_path" == "$main_root" ]]; then
    # Main worktree: .sessions must be a real directory
    if [[ -L "$shared_root" ]]; then
      _report_error ".sessions/ is a symlink in the main worktree (expected real directory)"
      return 0
    fi
    if [[ -f "$shared_root" ]]; then
      _report_error ".sessions/ is a regular file in the main worktree (expected directory; remove it manually)"
      return 0
    fi
    if [[ -d "$shared_root" ]]; then
      _report_ok ".sessions/ is a real directory"
    else
      mkdir -p "$shared_root"
      _report_fixed "created .sessions/ directory"
    fi
    return 0
  fi

  # Linked worktree: ensure main's .sessions exists and is a directory
  if [[ -f "$shared_root" ]]; then
    _report_error "$shared_root is a regular file in the main worktree (expected directory; remove it manually)"
    return 0
  fi
  if [[ -L "$shared_root" ]]; then
    _report_error "$shared_root is a symlink in the main worktree (expected real directory)"
    return 0
  fi
  if [[ ! -d "$shared_root" ]]; then
    mkdir -p "$shared_root"
    _report_fixed "created $shared_root in main worktree"
  fi

  # .sessions in linked worktree should be a symlink to main's .sessions
  local local_sessions="$repo_root_path/.sessions"
  if [[ -L "$local_sessions" ]]; then
    local actual_dest expected_dest
    # Canonicalize both sides to avoid false rewrites (/tmp vs /private/tmp)
    if [[ -e "$local_sessions" ]]; then
      actual_dest=$(canonical_path "$local_sessions")
    else
      actual_dest=$(readlink "$local_sessions")
    fi
    expected_dest=$(canonical_path "$shared_root")
    if [[ "$actual_dest" == "$expected_dest" ]]; then
      _report_ok ".sessions/ symlink points to main worktree"
    else
      ln -sfn "$shared_root" "$local_sessions"
      _report_fixed ".sessions/ symlink repointed to $shared_root"
    fi
  elif [[ -e "$local_sessions" ]]; then
    _report_error ".sessions/ exists but is not a symlink (expected symlink to $shared_root)"
  else
    ln -sfn "$shared_root" "$local_sessions"
    _report_fixed "created .sessions/ symlink -> $shared_root"
  fi
}

_reconcile_session_directory() {
  local session_dir="$1" session_key="$2"

  if [[ -d "$session_dir/plans" ]]; then
    _report_ok "plans/ exists"
  else
    mkdir -p "$session_dir/plans"
    _report_fixed "created plans/"
  fi

  if [[ -d "$session_dir/reviews" ]]; then
    _report_ok "reviews/ exists"
  else
    mkdir -p "$session_dir/reviews"
    _report_fixed "created reviews/"
  fi

  if [[ -d "$session_dir/tasks" ]]; then
    _report_ok "tasks/ exists"
  else
    mkdir -p "$session_dir/tasks"
    _report_fixed "created tasks/"
  fi

  local session_file="$session_dir/SESSION.md"
  if [[ -f "$session_file" ]]; then
    _report_ok "SESSION.md exists"
  else
    mkdir -p "$session_dir"
    session_template "$session_key" >"$session_file"
    _report_fixed "created SESSION.md from template"
  fi

  local current_list
  current_list="$(extract_current_list_name "$session_file")"
  if [[ -n "$current_list" ]]; then
    local task_file="$session_dir/tasks/$current_list.md"
    if [[ -f "$task_file" ]]; then
      _report_ok "tasks/$current_list.md exists"
    else
      task_list_template "$current_list" >"$task_file"
      _report_fixed "created tasks/$current_list.md from template"
    fi
  fi
}

_reconcile_active_symlink() {
  local repo_root_path="$1" session_key="$2"
  local local_link="$repo_root_path/.session"
  local expected_target=".sessions/$session_key"

  if [[ -e "$local_link" && ! -L "$local_link" ]]; then
    _report_error ".session exists but is not a symlink (cannot autofix — remove manually)"
    return 0
  fi

  if [[ -L "$local_link" ]]; then
    local current_target
    current_target=$(readlink "$local_link")
    if [[ "$current_target" == "$expected_target" ]]; then
      _report_ok ".session -> $expected_target"
    else
      ln -sfn "$expected_target" "$local_link"
      _report_fixed ".session repointed: $current_target -> $expected_target"
    fi
  else
    ln -sfn "$expected_target" "$local_link"
    _report_fixed "created .session -> $expected_target"
  fi
}

_validate_task_list_md() {
  local task_file="$1" list_name="$2"

  if [[ ! -f "$task_file" ]]; then
    _report_error "current task file missing: tasks/$list_name.md"
    return 0
  fi

  local missing=()
  for section in "${REQUIRED_TASK_SECTIONS[@]}"; do
    if ! grep -qE "^### ${section}$" "$task_file"; then
      missing+=("$section")
    fi
  done

  if [[ ${#missing[@]} -eq 0 ]]; then
    _report_ok "tasks/$list_name.md has all required sections"
  else
    _report_error "tasks/$list_name.md missing sections: ${missing[*]}"
  fi
}

_validate_session_md() {
  local session_file="$1" session_key="$2" session_dir="$3"

  if [[ ! -f "$session_file" ]]; then
    return 0
  fi

  local missing=()
  for section in "${REQUIRED_SESSION_SECTIONS[@]}"; do
    if ! grep -qE "^## ${section}" "$session_file"; then
      missing+=("$section")
    fi
  done

  if [[ ${#missing[@]} -eq 0 ]]; then
    _report_ok "SESSION.md has all required sections"
  else
    _report_error "SESSION.md missing sections: ${missing[*]} (regenerate with: rm SESSION.md && session sync)"
  fi

  if ! grep -qE '^### Current List$' "$session_file"; then
    _report_error "SESSION.md missing \`### Current List\` under \`## Tasks\`"
    return 0
  fi

  local current_list
  current_list="$(extract_current_list_name "$session_file")"
  if [[ -z "$current_list" ]]; then
    _report_error "SESSION.md has \`### Current List\` but no selected task-list name"
    return 0
  fi

  _report_ok "SESSION.md selects current task list: $current_list"
  _validate_task_list_md "$session_dir/tasks/$current_list.md" "$current_list"
}

reconcile() {
  local repo_root_path main_root branch_name session_key shared_root session_dir

  repo_root_path=$(repo_root)
  main_root=$(main_worktree)
  branch_name=$(current_branch)
  session_key=$(resolve_session_key "$branch_name")
  shared_root="$main_root/.sessions"
  session_dir="$shared_root/$session_key"

  _ok_count=0
  _fixed_count=0
  _error_count=0

  if [[ "$_mode" == "doctor" ]]; then
    printf 'Session doctor for %s\n' "$repo_root_path"
    printf '  branch:       %s\n' "${branch_name:-DETACHED}"
    printf '  session_key:  %s\n' "$session_key"
    printf '  main_worktree: %s\n' "$main_root"
  fi

  _section "Checking git excludes..."
  _reconcile_excludes

  _section "Checking .sessions/ store..."
  _reconcile_shared_sessions_root "$repo_root_path" "$main_root" "$shared_root"
  if [[ "$_mode" != "doctor" && "$_error_count" -gt 0 ]]; then
    return 1
  fi

  _section "Checking session directory contents..."
  _reconcile_session_directory "$session_dir" "$session_key"
  if [[ "$_mode" != "doctor" && "$_error_count" -gt 0 ]]; then
    return 1
  fi

  _section "Checking .session symlink..."
  _reconcile_active_symlink "$repo_root_path" "$session_key"
  if [[ "$_mode" != "doctor" && "$_error_count" -gt 0 ]]; then
    return 1
  fi

  if [[ "$_mode" == "doctor" ]]; then
    _section "Validating SESSION.md content..."
    _validate_session_md "$session_dir/SESSION.md" "$session_key" "$session_dir"

    printf '\n--- Summary ---\n'
    printf '  OK: %d  FIXED: %d  ERROR: %d\n' "$_ok_count" "$_fixed_count" "$_error_count"
  fi

  [[ "$_error_count" -eq 0 ]]
}

# --- Commands ---

# @cmd Show current session wiring for this checkout
status() {
  local repo_root_path main_root branch_name session_key session_dir session_file current_list
  repo_root_path=$(repo_root)
  main_root=$(main_worktree)
  branch_name=$(current_branch)
  session_key=$(resolve_session_key "$branch_name")
  session_dir="$main_root/.sessions/$session_key"
  session_file="$session_dir/SESSION.md"
  current_list=""
  if [[ -f "$session_file" ]]; then
    current_list="$(extract_current_list_name "$session_file")"
  fi

  echo "repo_root=$repo_root_path"
  echo "main_worktree=$main_root"
  echo "branch=${branch_name:-DETACHED}"
  echo "session_key=$session_key"
  echo "shared_sessions_root=$main_root/.sessions"
  echo "session_dir=$session_dir"
  echo "local_sessions_path=$repo_root_path/.sessions"
  echo "local_session_path=$repo_root_path/.session"
  echo "current_task_list=${current_list:-}"
  echo "current_task_file=${current_list:+$session_dir/tasks/$current_list.md}"
}

# @cmd Sync the current checkout's session wiring
sync() {
  _mode="sync"
  reconcile
}

# @cmd Sync session wiring for every current git worktree
sync_all() {
  local cli_path failure_count

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

# @cmd Sync session wiring for git-hook automation (exits non-zero on failure)
hook_sync() {
  _mode="hook"
  if ! reconcile; then
    warn "hook sync failed — run 'session doctor' to diagnose"
    return 1
  fi
}

# @cmd Diagnose and autofix session wiring issues
doctor() {
  _mode="doctor"
  reconcile
}

eval "$(argc --argc-eval "$0" "$@")"
