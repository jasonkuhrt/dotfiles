#!/bin/bash
set -e

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

header "Skills Sync (codex)"

# Mirror selected shared ~/.claude/skills to ~/.codex/skills via per-skill symlinks.
# Preserves .system and Codex-only real directories.
#
# Note: ~/.agents/skills is a whole-directory symlink to ~/.claude/skills,
# so it doesn't need mirroring.

SKILLS_SRC="$HOME/.claude/skills"
target_dir="$HOME/.codex/skills"
mkdir -p "$target_dir"

shared_skills=(
    gh-ci
    land-complete
    land-merged
    land-pr
    land-worktree
)

# Remove stale shared symlinks only. Never remove Codex-only real directories.
for link in "$target_dir"/*; do
    [ -e "$link" ] || [ -L "$link" ] || continue
    name=$(basename "$link")
    [ "$name" = ".system" ] && continue
    if [ -L "$link" ] && [ ! -d "$SKILLS_SRC/$name" ]; then
        rm -rf "$link"
        info "Removed stale codex/skills/$name"
    fi
done

# Create/update symlinks for intentionally shared skills.
for name in "${shared_skills[@]}"; do
    skill_dir="$SKILLS_SRC/$name"
    [ -d "$skill_dir" ] || continue

    dest="$target_dir/$name"
    rel_target="../../.claude/skills/$name"

    if [ -L "$dest" ] && [ "$(readlink "$dest")" = "$rel_target" ]; then
        continue  # Already correct
    fi

    if [ -e "$dest" ] || [ -L "$dest" ]; then
        rm -rf "$dest"
    fi
    ln -s "$rel_target" "$dest"
done

task "codex/skills synced"
