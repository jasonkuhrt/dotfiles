#!/bin/bash
set -e

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

header "Skills Sync (codex)"

# Mirror selected shared ~/.claude/skills plus Codex-only library skills to
# ~/.codex/skills via per-skill symlinks. Preserves .system and unmanaged
# Codex-only real directories.
#
# Note: ~/.agents/skills is a whole-directory symlink to ~/.claude/skills,
# so it doesn't need mirroring.

SKILLS_SRC="$HOME/.claude/skills"
SKILLS_LIBRARY="$HOME/.claude/skills-library"
target_dir="$HOME/.codex/skills"

if [ -L "$target_dir" ]; then
    rm "$target_dir"
fi
mkdir -p "$target_dir"

shared_skills=(
    gh-ci
    hunk-review
    land-complete
    land-merged
    land-pr
    land-worktree
    session-refresh
)

codex_only_skills=(
    agent-comment-chat
    ci-e2e-off
    code-system-map
    develop-chrome-extensions
    dispatch-codex
    dispatch-codex-sub
    heartbeat-dep-gardener
    loop
    meet
    passwords
    return
    rq-login
    start
)

is_managed_skill() {
    local name="$1"
    local skill

    for skill in "${shared_skills[@]}" "${codex_only_skills[@]}"; do
        [ "$name" = "$skill" ] && return 0
    done

    return 1
}

is_claude_skill_link() {
    local link="$1"
    local target

    target=$(readlink "$link")
    case "$target" in
        ../../.claude/skills/* | ../../.claude/skills-library/* | "$HOME"/.claude/skills/* | "$HOME"/.claude/skills-library/*)
            return 0
            ;;
        *)
            return 1
            ;;
    esac
}

link_skill() {
    local name="$1"
    local source_dir="$2"
    local rel_target="$3"
    local skill_dir="$source_dir/$name"
    local dest="$target_dir/$name"

    [ -d "$skill_dir" ] || return 0

    if [ -L "$dest" ] && [ "$(readlink "$dest")" = "$rel_target" ]; then
        return 0
    fi

    if [ -e "$dest" ] && [ ! -L "$dest" ]; then
        info "Preserved codex/skills/$name real directory"
        return 0
    fi

    rm -rf "$dest"
    ln -s "$rel_target" "$dest"
}

# Remove stale Claude/library symlinks only. Never remove Codex-only real directories
# or arbitrary user-owned symlinks.
for link in "$target_dir"/*; do
    [ -e "$link" ] || [ -L "$link" ] || continue
    name=$(basename "$link")
    [ "$name" = ".system" ] && continue
    if [ -L "$link" ] && ! is_managed_skill "$name" && is_claude_skill_link "$link"; then
        rm -rf "$link"
        info "Removed stale codex/skills/$name"
    fi
done

# Create/update symlinks for intentionally shared skills.
for name in "${shared_skills[@]}"; do
    link_skill "$name" "$SKILLS_SRC" "../../.claude/skills/$name"
done

# Create/update symlinks for Codex-only skills that should not appear in Claude.
for name in "${codex_only_skills[@]}"; do
    link_skill "$name" "$SKILLS_LIBRARY" "../../.claude/skills-library/$name"
done

task "codex/skills synced"
