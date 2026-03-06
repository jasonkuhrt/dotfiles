#!/usr/bin/env bash

set -euo pipefail

DOTFILES_REPO_ROOT="${DOTFILES_REPO_ROOT:-$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)}"
DOTFILES_STATE_DIR="${DOTFILES_STATE_DIR:-$HOME/.local/state/dotfiles-symlink}"
DOTFILES_BACKUP_ROOT="$DOTFILES_STATE_DIR/backups"
DOTFILES_LOG_DIR="$DOTFILES_STATE_DIR/logs"
DOTFILES_CUTOVER_MARKER="$DOTFILES_STATE_DIR/cutover-v1.json"
DOTFILES_HEAL_LABEL="com.jasonkuhrt.chezmoi-symlink-heal"
DOTFILES_HEAL_PLIST="$HOME/Library/LaunchAgents/${DOTFILES_HEAL_LABEL}.plist"
DOTFILES_HEAL_LOG="$DOTFILES_LOG_DIR/heal.log"
DOTFILES_HEAL_LOCK_DIR="$DOTFILES_STATE_DIR/heal.lock"
DOTFILES_CHEZMOI_CONFIG="$HOME/.config/chezmoi/chezmoi.toml"
DOTFILES_CHEZMOI_TEMPLATE="$DOTFILES_REPO_ROOT/home/.chezmoi.toml.tmpl"

ensure_runtime_dirs() {
    mkdir -p "$DOTFILES_STATE_DIR" "$DOTFILES_BACKUP_ROOT" "$DOTFILES_LOG_DIR"
}

timestamp_utc() {
    date -u +"%Y-%m-%dT%H:%M:%SZ"
}

timestamp_path() {
    date -u +"%Y%m%dT%H%M%SZ"
}

log_info() {
    printf '[dotfiles] %s\n' "$*"
}

log_warn() {
    printf '[dotfiles] WARN: %s\n' "$*" >&2
}

log_error() {
    printf '[dotfiles] ERROR: %s\n' "$*" >&2
}

die() {
    log_error "$*"
    exit 1
}

sync_chezmoi_config() {
    [[ -f "$DOTFILES_CHEZMOI_TEMPLATE" ]] || return 0

    local rendered
    local template_sha
    rendered=$(
        cd "$DOTFILES_REPO_ROOT"
        chezmoi execute-template <"$DOTFILES_CHEZMOI_TEMPLATE"
    )
    template_sha=$(shasum -a 256 "$DOTFILES_CHEZMOI_TEMPLATE" | awk '{print $1}')

    mkdir -p "$(dirname "$DOTFILES_CHEZMOI_CONFIG")"
    if [[ -f "$DOTFILES_CHEZMOI_CONFIG" ]] &&
        diff -q <(printf '%s\n' "$rendered") "$DOTFILES_CHEZMOI_CONFIG" >/dev/null 2>&1; then
        :
    else
        printf '%s\n' "$rendered" >"$DOTFILES_CHEZMOI_CONFIG"
    fi

    chezmoi state set \
        --bucket=configState \
        --key=configState \
        --value="{\"configTemplateContentsSHA256\":\"$template_sha\"}" \
        >/dev/null 2>&1 || true
}

run_chezmoi() {
    (
        cd "$DOTFILES_REPO_ROOT"
        sync_chezmoi_config
        chezmoi "$@"
    )
}

expand_target_path() {
    local target="$1"

    case "$target" in
        "~")
            printf '%s\n' "$HOME"
            ;;
        "~/"*)
            printf '%s\n' "$HOME/${target#~/}"
            ;;
        /*)
            printf '%s\n' "$target"
            ;;
        *)
            local parent
            parent=$(cd "$(dirname "$target")" && pwd)
            printf '%s/%s\n' "$parent" "$(basename "$target")"
            ;;
    esac
}

path_is_within() {
    local path="$1"
    local root="$2"

    case "$path" in
        "$root"|"$root"/*)
            return 0
            ;;
        *)
            return 1
            ;;
    esac
}

true_dir_entries() {
    cat <<'EOF'
.config/bat	symlink-roots/config/bat
.config/direnv	symlink-roots/config/direnv
.config/ghostty	symlink-roots/config/ghostty
.config/git	symlink-roots/config/git
.config/lazygit	symlink-roots/config/lazygit
.config/libra	symlink-roots/config/libra
.config/lsd	symlink-roots/config/lsd
.config/perles	symlink-roots/config/perles
.config/ripgrep	symlink-roots/config/ripgrep
.claude/checks	symlink-roots/claude/checks
.claude/commands	symlink-roots/claude/commands
.claude/rules	symlink-roots/claude/rules
.claude/schemas	symlink-roots/claude/schemas
EOF
}

resolve_true_dir_repo_path() {
    local target_abs
    target_abs=$(expand_target_path "$1")

    while IFS=$'\t' read -r target_rel repo_rel; do
        local target_root="$HOME/$target_rel"
        if path_is_within "$target_abs" "$target_root"; then
            local suffix="${target_abs#$target_root}"
            printf '%s/%s%s\n' "$DOTFILES_REPO_ROOT" "$repo_rel" "$suffix"
            return 0
        fi
    done < <(true_dir_entries)

    return 1
}

write_json_file() {
    local path="$1"
    local content="$2"

    mkdir -p "$(dirname "$path")"
    printf '%s\n' "$content" >"$path"
}

launchctl_available() {
    command -v launchctl >/dev/null 2>&1
}
