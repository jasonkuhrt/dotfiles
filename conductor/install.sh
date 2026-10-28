#!/usr/bin/env bash
set -euo pipefail

# @describe Install this repository's cloud-ready user skills and agent
# instructions without replacing another installation's files.

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
exclude_file="$repo_root/conductor/skills-exclude.txt"
shopt -s nullglob dotglob

warn() {
  printf 'Warning: %s\n' "$1" >&2
}

link_owned() {
  local source="$1" target="$2"
  if [[ -L "$target" && "$(readlink "$target")" == "$source" ]]; then
    rm "$target"
  elif [[ -e "$target" || -L "$target" ]]; then
    warn "leaving existing $target"
    return 1
  fi
  ln -s "$source" "$target"
}

link_skills() {
  local source_dir="$1" target_dir="$2" source name
  linked=0
  mkdir -p "$target_dir"
  for source in "$source_dir"/*; do
    [[ -d "$source" || -L "$source" ]] || continue
    name="${source##*/}"
    if grep -Fxq "$name" "$exclude_file"; then
      continue
    fi
    if [[ ! -f "$source/SKILL.md" ]]; then
      warn "skipping $name: SKILL.md does not resolve"
      continue
    fi
    if link_owned "$source" "$target_dir/$name"; then
      linked=$((linked + 1))
    fi
  done
}

link_skills "$repo_root/home/.claude/skills" "$HOME/.claude/skills"
claude_count="$linked"

mkdir -p "$HOME/.agents"
if [[ ! -e "$HOME/.agents/skills" && ! -L "$HOME/.agents/skills" ]]; then
  ln -s "$HOME/.claude/skills" "$HOME/.agents/skills"
elif [[ -L "$HOME/.agents/skills" && "$(readlink "$HOME/.agents/skills")" == "$HOME/.claude/skills" ]]; then
  :
elif [[ -d "$HOME/.agents/skills" ]]; then
  link_skills "$repo_root/home/.claude/skills" "$HOME/.agents/skills"
else
  warn "leaving existing $HOME/.agents/skills"
fi

link_skills "$repo_root/home/.codex/skills" "$HOME/.codex/skills"
codex_count="$linked"

instructions=""
for instruction in .claude/CLAUDE.md .codex/AGENTS.md; do
  if link_owned "$repo_root/home/$instruction" "$HOME/$instruction"; then
    instructions="${instructions}${instructions:+, }$instruction"
  fi
done

printf 'Agent home: linked %s Claude skills, %s Codex skills; instructions: %s\n' \
  "$claude_count" "$codex_count" "${instructions:-none}"
