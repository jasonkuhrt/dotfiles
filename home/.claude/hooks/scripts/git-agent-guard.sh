#!/usr/bin/env bash
set -euo pipefail # cov-ignore

if [[ -n "${GIT_AGENT_COVERAGE_TRACE:-}" ]]; then # cov-ignore
  exec 9>>"$GIT_AGENT_COVERAGE_TRACE" # cov-ignore
  export PS4='+${BASH_SOURCE[0]:-$0}:${LINENO}: ' # cov-ignore
  if [[ "${BASH_VERSINFO[0]:-0}" -ge 4 ]]; then # cov-ignore
    export BASH_XTRACEFD=9 # cov-ignore
    set -x # cov-ignore
  else # cov-ignore
    set -o functrace # cov-ignore
    trap '[[ ${GIT_AGENT_COVERAGE_DEBUG_ACTIVE:-0} -eq 1 ]] || { GIT_AGENT_COVERAGE_DEBUG_ACTIVE=1; builtin printf "+%s:%s: %s\n" "${BASH_SOURCE[0]:-$0}" "$LINENO" "$BASH_COMMAND" >&9; GIT_AGENT_COVERAGE_DEBUG_ACTIVE=0; }' DEBUG # cov-ignore
  fi # cov-ignore
fi # cov-ignore

read_input() {
  if [[ -t 0 ]]; then
    printf '' # cov-ignore
    return 0 # cov-ignore
  fi

  cat
}

input="$(read_input)"

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

env_assignment_regex="[A-Za-z_][A-Za-z0-9_]*=([^;&|[:space:]]+|'[^']*'|\"[^\"]*\")"
env_command_regex="(([^;&|[:space:]]+/)?env)"
launcher_prefix_regex="((${env_command_regex}([[:space:]]+(${env_assignment_regex}|-i|--ignore-environment|--|-u[[:space:]]+[^;&|[:space:]]+|--unset(=([^;&|[:space:]]+|'[^']*'|\"[^\"]*\")|[[:space:]]+[^;&|[:space:]]+)))*[[:space:]]+)|(${env_assignment_regex}[[:space:]]+))*"

matches_git_subcommand() {
  local subcommand="$1"
  local option_prefix pattern

  option_prefix='([[:space:]]+((-C|-c)[[:space:]]+[^;&|[:space:]]+|(--git-dir|--work-tree|--namespace|--super-prefix|--config-env)(=([^;&|[:space:]]+)|[[:space:]]+[^;&|[:space:]]+)|--[^;&|[:space:]]+|-[^;&|[:space:]]+))*'
  pattern="(^|[;&|][;&|]?[[:space:]]*)${launcher_prefix_regex}([^;&|[:space:]]+/)?git${option_prefix}[[:space:]]+${subcommand}([[:space:]]|$)"
  printf '%s\n' "$command_text" | grep -Eq "$pattern"
}

matches_shell_wrapped_git_subcommand() {
  local subcommand="$1"
  local option_prefix prefix

  option_prefix='([[:space:]]+((-C|-c)[[:space:]]+[^;&|[:space:]]+|(--git-dir|--work-tree|--namespace|--super-prefix|--config-env)(=([^;&|[:space:]]+)|[[:space:]]+[^;&|[:space:]]+)|--[^;&|[:space:]]+|-[^;&|[:space:]]+))*'
  prefix="(^|[;&|][;&|]?[[:space:]]*)${launcher_prefix_regex}([^;&|[:space:]]+/)?(sh|bash|zsh|dash)([[:space:]]+-[[:alnum:]-]+)*[[:space:]]+"
  if printf '%s\n' "$command_text" | grep -Eq "${prefix}'[^']*git${option_prefix}[[:space:]]+${subcommand}([[:space:]]|'|$)"; then
    return 0
  fi

  printf '%s\n' "$command_text" | grep -Eq "${prefix}\"[^\"]*git${option_prefix}[[:space:]]+${subcommand}([[:space:]]|\"|$)"
}

matches_shell_wrapped_stash_read_only() {
  local option_prefix prefix

  option_prefix='([[:space:]]+((-C|-c)[[:space:]]+[^;&|[:space:]]+|(--git-dir|--work-tree|--namespace|--super-prefix|--config-env)(=([^;&|[:space:]]+)|[[:space:]]+[^;&|[:space:]]+)|--[^;&|[:space:]]+|-[^;&|[:space:]]+))*'
  prefix="(^|[;&|][;&|]?[[:space:]]*)${launcher_prefix_regex}([^;&|[:space:]]+/)?(sh|bash|zsh|dash)([[:space:]]+-[[:alnum:]-]+)*[[:space:]]+"
  if printf '%s\n' "$command_text" | grep -Eq "${prefix}'[^']*git${option_prefix}[[:space:]]+stash([[:space:]]+(list|show))([[:space:]]|'|$)"; then
    return 0
  fi

  printf '%s\n' "$command_text" | grep -Eq "${prefix}\"[^\"]*git${option_prefix}[[:space:]]+stash([[:space:]]+(list|show))([[:space:]]|\"|$)"
}

matches_gh_pr_subcommand() {
  local subcommand="$1"
  local option_prefix pattern

  option_prefix='([[:space:]]+(((-R|--repo)[[:space:]]+[^;&|[:space:]]+)|--repo=([^;&|[:space:]]+)|--[^;&|[:space:]]+|-[^;&|[:space:]]+))*'
  pattern="(^|[;&|][;&|]?[[:space:]]*)${launcher_prefix_regex}([^;&|[:space:]]+/)?gh${option_prefix}[[:space:]]+pr[[:space:]]+${subcommand}([[:space:]]|$)"
  printf '%s\n' "$command_text" | grep -Eq "$pattern"
}

matches_shell_wrapped_gh_pr_subcommand() {
  local subcommand="$1"
  local option_prefix prefix

  option_prefix='([[:space:]]+(((-R|--repo)[[:space:]]+[^;&|[:space:]]+)|--repo=([^;&|[:space:]]+)|--[^;&|[:space:]]+|-[^;&|[:space:]]+))*'
  prefix="(^|[;&|][;&|]?[[:space:]]*)${launcher_prefix_regex}([^;&|[:space:]]+/)?(sh|bash|zsh|dash)([[:space:]]+-[[:alnum:]-]+)*[[:space:]]+"
  if printf '%s\n' "$command_text" | grep -Eq "${prefix}'[^']*gh${option_prefix}[[:space:]]+pr[[:space:]]+${subcommand}([[:space:]]|'|$)"; then
    return 0
  fi

  printf '%s\n' "$command_text" | grep -Eq "${prefix}\"[^\"]*gh${option_prefix}[[:space:]]+pr[[:space:]]+${subcommand}([[:space:]]|\"|$)"
}

classify_agent_writes() {
  if command -v python3 >/dev/null 2>&1; then
    python3 - "$command_text" <<'PY'
import os
import re
import shlex
import sys

command_text = sys.argv[1]
segment_breaks = {";", "&&", "||", "|", "&"}
git_options_with_values = {
    "-C",
    "-c",
    "--git-dir",
    "--work-tree",
    "--namespace",
    "--super-prefix",
    "--config-env",
}
gh_options_with_values = {
    "-R",
    "--repo",
}
read_only_stash_actions = {"list", "show"}
needs = []
assignment_pattern = re.compile(r"[A-Za-z_][A-Za-z0-9_]*=.*")
shell_wrappers = {"sh", "bash", "zsh", "dash"}


def add_gate(name: str) -> None:
    if name not in needs:
        needs.append(name)


def split_segments(text: str):
    lexer = shlex.shlex(text, posix=True, punctuation_chars="|&;")
    lexer.whitespace_split = True
    tokens = list(lexer)
    segment = []
    for token in tokens:
        if token in segment_breaks:
            if segment:
                yield segment
                segment = []
            continue
        segment.append(token)
    if segment:
        yield segment


def strip_env_prefix(tokens):
    tokens = list(tokens)
    while True:
        while tokens and assignment_pattern.fullmatch(tokens[0]):
            tokens = tokens[1:]
        if not tokens or os.path.basename(tokens[0]) != "env":
            return tokens
        tokens = tokens[1:]
        while tokens:
            token = tokens[0]
            if token == "--":
                tokens = tokens[1:]
                break
            if (
                token in {"-i", "--ignore-environment"}
                or assignment_pattern.fullmatch(token)
                or token.startswith("--unset=")
            ):
                tokens = tokens[1:]
                continue
            if token in {"-u", "--unset"}:
                tokens = tokens[2:]
                continue
            break


def shell_command_argument(tokens):
    for index, token in enumerate(tokens):
        if token in {"-c", "--command"} or (token.startswith("-") and "c" in token[1:]):
            return tokens[index + 1] if index + 1 < len(tokens) else None
        if not token.startswith("-") or token == "-":
            return None
    return None


def git_subcommand(tokens):
    index = 0
    while index < len(tokens):
        token = tokens[index]
        if token in git_options_with_values:
            index += 2
            continue
        if token.startswith("--git-dir=") or token.startswith("--work-tree="):
            index += 1
            continue
        if token.startswith("--namespace=") or token.startswith("--super-prefix="):
            index += 1
            continue
        if token.startswith("--config-env="):
            index += 1
            continue
        if token.startswith("-"):
            index += 1
            continue
        return token, tokens[index + 1 :]
    return None, []


def first_non_option(tokens):
    for token in tokens:
        if token.startswith("-"):
            continue
        return token
    return None


def gh_pr_subcommand(tokens):
    index = 1
    while index < len(tokens):
        token = tokens[index]
        if token in gh_options_with_values:
            index += 2
            continue
        if token.startswith("--repo="):
            index += 1
            continue
        if token.startswith("-"):
            index += 1
            continue
        if token != "pr":
            return None
        if index + 1 >= len(tokens):
            return None
        return tokens[index + 1]
    return None


def classify_tokens(tokens):
    tokens = strip_env_prefix(tokens)
    if not tokens:
        return

    program = os.path.basename(tokens[0])
    if program in shell_wrappers:
        nested_command = shell_command_argument(tokens[1:])
        if nested_command:
            classify_text(nested_command)
        return

    if program == "gh":
        pr_subcommand = gh_pr_subcommand(tokens)
        if pr_subcommand == "create":
            add_gate("pr-create")
        elif pr_subcommand in {"close", "merge"}:
            add_gate("pr-destroy")
        elif pr_subcommand == "comment":
            add_gate("pr-comment")
        return

    if program == "git":
        git_index = 0
    elif "git" in tokens:
        git_index = tokens.index("git")
    else:
        return

    subcommand, remainder = git_subcommand(tokens[git_index + 1 :])
    if subcommand == "commit":
        add_gate("commit")
    elif subcommand == "push":
        add_gate("push")
    elif subcommand in {"checkout", "switch"}:
        add_gate("checkout")
    elif subcommand == "stash":
        action = first_non_option(remainder)
        if action not in read_only_stash_actions:
            add_gate("stash")


def classify_text(text: str) -> None:
    for segment in split_segments(text):
        classify_tokens(segment)


classify_text(command_text)

for gate in needs:
    print(gate)
PY
    return 0
  fi

  if matches_git_subcommand commit || matches_shell_wrapped_git_subcommand commit; then
    printf 'commit\n'
  fi
  if matches_git_subcommand push || matches_shell_wrapped_git_subcommand push; then
    printf 'push\n'
  fi
  if matches_git_subcommand checkout || matches_git_subcommand switch || matches_shell_wrapped_git_subcommand checkout || matches_shell_wrapped_git_subcommand switch; then
    printf 'checkout\n'
  fi
  if matches_git_subcommand stash || matches_shell_wrapped_git_subcommand stash; then
    if ! printf '%s\n' "$command_text" | grep -Eq "(^|[;&|][;&|]?[[:space:]]*)${launcher_prefix_regex}([^;&|[:space:]]+/)?git([[:space:]]+((-C|-c)[[:space:]]+[^;&|[:space:]]+|(--git-dir|--work-tree|--namespace|--super-prefix|--config-env)(=([^;&|[:space:]]+)|[[:space:]]+[^;&|[:space:]]+)|--[^;&|[:space:]]+|-[^;&|[:space:]]+))*[[:space:]]+stash([[:space:]]+(list|show))([[:space:]]|$)" && ! matches_shell_wrapped_stash_read_only; then
      printf 'stash\n'
    fi
  fi
  if matches_gh_pr_subcommand create || matches_shell_wrapped_gh_pr_subcommand create; then
    printf 'pr-create\n'
  fi
  if matches_gh_pr_subcommand close || matches_shell_wrapped_gh_pr_subcommand close || matches_gh_pr_subcommand merge || matches_shell_wrapped_gh_pr_subcommand merge; then
    printf 'pr-destroy\n'
  fi
  if matches_gh_pr_subcommand comment || matches_shell_wrapped_gh_pr_subcommand comment; then
    printf 'pr-comment\n'
  fi
}

needed_gates="$(classify_agent_writes)"
if [[ -z "$needed_gates" ]]; then
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
  local value

  value="$(awk -F= -v gate="$gate" '$1 == gate { print $2; found=1; exit }' "$state_file")"
  if [[ -n "$value" ]]; then
    printf '%s\n' "$value"
    return 0
  fi

  case "$gate" in
    commit) printf 'off\n' ;;
    push|checkout|stash|pr-create|pr-destroy|pr-comment) printf 'off\n' ;;
    *) printf 'off\n' ;; # cov-ignore
  esac
}

gate_label() {
  case "$1" in
    commit) printf 'git commit' ;;
    push) printf 'git push' ;;
    checkout) printf 'git checkout / git switch' ;;
    stash) printf 'git stash' ;;
    pr-create) printf 'gh pr create' ;;
    pr-destroy) printf 'gh pr close / gh pr merge' ;;
    pr-comment) printf 'gh pr comment' ;;
    *) printf '%s' "$1" ;; # cov-ignore
  esac
}

print_current_state() {
  local gate

  for gate in commit push checkout stash pr-create pr-destroy pr-comment; do
    printf '  %-12s %s\n' "${gate}:" "$(read_gate "$gate")"
  done
}

print_missing_state() {
  local gate

  for gate in commit push checkout stash pr-create pr-destroy pr-comment; do
    printf '  %-12s missing\n' "${gate}:"
  done
}

block_with_message() {
  local gate="$1"

  cat >&2 <<EOF
BLOCKED: $(gate_label "$gate") is disabled by git-agent.

Claude Code Bash git and gh writes are denied until your human collaborator opens the gate.

Current state:
$(print_current_state)

Human commands:
  git agent on ${gate}
  git agent on
EOF
  exit 2
}

if [[ ! -f "$state_file" ]]; then
  cat >&2 <<EOF
BLOCKED: git-agent state is missing for this repository.

Claude Code Bash git and gh writes default to denied until git-agent state exists.

Current state:
$(print_missing_state)

Human commands:
  git agent install
  git agent on
EOF
  exit 2
fi

printf '%s\n' "$needed_gates" | while IFS= read -r gate; do
  [[ -z "$gate" ]] && continue
  if [[ "$(read_gate "$gate")" != "on" ]]; then
    block_with_message "$gate"
  fi
done

exit 0
