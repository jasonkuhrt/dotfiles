#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
source "$SCRIPT_DIR/common.sh"

run_editor() {
    local path="$1"
    local editor="${VISUAL:-${EDITOR:-vi}}"

    EDITOR_CMD="$editor" TARGET_PATH="$path" exec bash -lc 'eval "exec $EDITOR_CMD \"\$TARGET_PATH\""'  # EDITOR is trusted local config.
}

main() {
    [[ $# -eq 1 ]] || die "usage: edit.sh <target>"

    local target="$1"

    if repo_path=$(resolve_true_dir_repo_path "$target"); then
        mkdir -p "$(dirname "$repo_path")"
        log_info "opening repo-backed path $repo_path"
        run_editor "$repo_path"
    fi

    local target_abs
    target_abs=$(expand_target_path "$target")
    log_info "opening chezmoi-managed target $target_abs"
    cd "$DOTFILES_REPO_ROOT"
    exec chezmoi edit "$target_abs"
}

main "$@"
