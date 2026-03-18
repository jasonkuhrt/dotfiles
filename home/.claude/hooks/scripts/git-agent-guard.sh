#!/usr/bin/env bash
# git-agent-guard: block Claude Bash git writes when git-agent says they are off.

set -euo pipefail

input="$(cat)"

json_value() {
  local filter="$1"

  if [[ -z "$input" ]]; then
    printf ''
    return 0
  fi

  printf '%s\n' "$input" | jq -r "$filter // empty" 2>/dev/null || true
}

read_json_blob() {
  local blob="$1"
  local filter="$2"

  if [[ -z "$blob" ]]; then
    printf ''
    return 0
  fi

  printf '%s\n' "$blob" | jq -r "$filter // empty" 2>/dev/null || true
}

command_text="$(json_value '.tool_input.command')"
if [[ -z "$command_text" ]]; then
  command_text="$(read_json_blob "${CLAUDE_TOOL_INPUT:-}" '.command // .tool_input.command')"
fi
if [[ -z "$command_text" ]]; then
  command_text="$(read_json_blob "${TOOL_INPUT:-}" '.command // .tool_input.command')"
fi

if [[ -z "$command_text" ]]; then
  exit 0
fi

matches_git_subcommand() {
  local subcommand="$1"
  local pattern

  pattern="(^|[;&|][;&|]?[[:space:]]*)git([[:space:]][^;&|]+)*[[:space:]]${subcommand}([[:space:]]|$)"
  printf '%s\n' "$command_text" | grep -Eq "$pattern"
}

needs_commit_guard=false
needs_push_guard=false

if matches_git_subcommand commit; then
  needs_commit_guard=true
fi
if matches_git_subcommand push; then
  needs_push_guard=true
fi

if [[ "$needs_commit_guard" = false && "$needs_push_guard" = false ]]; then
  exit 0
fi

cwd="$(json_value '.cwd')"
if [[ -z "$cwd" ]]; then
  cwd="$PWD"
fi

git_dir="$(git -C "$cwd" rev-parse --absolute-git-dir 2>/dev/null || true)"
if [[ -z "$git_dir" ]]; then
  git_dir="$(git -C "$cwd" rev-parse --git-dir 2>/dev/null || true)"
fi
if [[ -z "$git_dir" ]]; then
  exit 0
fi
if [[ "$git_dir" != /* ]]; then
  git_dir="$cwd/$git_dir"
fi

state_file="$git_dir/agent-state"

read_gate() {
  local gate="$1"

  awk -F= -v gate="$gate" '
    $1 == gate { print $2; found=1; exit }
    END { if (!found) print "off" }
  ' "$state_file"
}

block_with_message() {
  local gate="$1"
  local commit_state="$2"
  local push_state="$3"

  cat >&2 <<EOF
BLOCKED: git ${gate} is disabled by git-agent.

Claude Code Bash git writes are denied until your human collaborator opens the gate.

Current state:
  commit: ${commit_state}
  push:   ${push_state}

Human commands:
  git agent on ${gate}
  git agent on
EOF
  exit 2
}

if [[ ! -f "$state_file" ]]; then
  cat >&2 <<EOF
BLOCKED: git-agent state is missing for this repository.

Claude Code Bash git writes default to denied until git-agent state exists.

Current state:
  commit: missing
  push:   missing

Human commands:
  git agent install
  git agent on
EOF
  exit 2
fi

commit_state="$(read_gate commit)"
push_state="$(read_gate push)"

if [[ "$needs_commit_guard" = true && "$commit_state" != "on" ]]; then
  block_with_message "commit" "$commit_state" "$push_state"
fi

if [[ "$needs_push_guard" = true && "$push_state" != "on" ]]; then
  block_with_message "push" "$commit_state" "$push_state"
fi

exit 0
