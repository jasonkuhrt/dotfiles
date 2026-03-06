#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
source "$SCRIPT_DIR/common.sh"

cutover_done() {
    [[ -f "$DOTFILES_CUTOVER_MARKER" ]]
}

write_cutover_marker() {
    local backup_dir="$1"
    write_json_file "$DOTFILES_CUTOVER_MARKER" "$(cat <<EOF
{
  \"version\": 1,
  \"completedAt\": \"$(timestamp_utc)\",
  \"backupDir\": \"$backup_dir\"
}
EOF
)"
}

run_preflight() {
    local failed=0

    while IFS=$'\t' read -r target_rel repo_rel; do
        local target_root="$HOME/$target_rel"
        local repo_root="$DOTFILES_REPO_ROOT/$repo_rel"

        if [[ ! -d "$repo_root" ]]; then
            log_error "preflight missing repo root $repo_root"
            failed=1
        fi

        if [[ ! -d "$target_root" ]]; then
            continue
        fi

        local live_listing
        local repo_listing
        live_listing=$(mktemp)
        repo_listing=$(mktemp)

        (
            cd "$target_root"
            find . -mindepth 1 \( -type f -o -type l \) | sort
        ) >"$live_listing"
        (
            cd "$repo_root"
            find . -mindepth 1 \( -type f -o -type l \) | sort
        ) >"$repo_listing"

        while IFS= read -r relative_path; do
            [[ -n "$relative_path" ]] || continue
            if ! grep -Fxq "$relative_path" "$repo_listing"; then
                log_error "preflight extra path under $target_root: ${target_root}/${relative_path#./}"
                failed=1
            fi
        done <"$live_listing"

        rm -f "$live_listing" "$repo_listing"
    done < <(true_dir_entries)

    [[ "$failed" -eq 0 ]]
}

backup_true_dir_roots() {
    local backup_dir="$1"

    while IFS=$'\t' read -r target_rel _repo_rel; do
        local target_root="$HOME/$target_rel"
        if [[ -e "$target_root" || -L "$target_root" ]]; then
            local backup_path="$backup_dir/live$target_root"
            mkdir -p "$(dirname "$backup_path")"
            cp -a "$target_root" "$backup_path"
        fi
    done < <(true_dir_entries)
}

ensure_healer_loaded() {
    if ! launchctl_available; then
        log_warn "launchctl not available, skipping healer bootstrap"
        return 0
    fi

    local stray_plist="$HOME/.Library/LaunchAgents/${DOTFILES_HEAL_LABEL}.plist"
    if [[ -f "$stray_plist" ]]; then
        rm -f "$stray_plist"
        rmdir "$HOME/.Library/LaunchAgents" >/dev/null 2>&1 || true
        rmdir "$HOME/.Library" >/dev/null 2>&1 || true
    fi

    [[ -f "$DOTFILES_HEAL_PLIST" ]] || die "missing launchd plist: $DOTFILES_HEAL_PLIST"

    launchctl unload "$DOTFILES_HEAL_PLIST" >/dev/null 2>&1 || true
    launchctl load -w "$DOTFILES_HEAL_PLIST"
}

run_true_dir_audit() {
    local output
    output=$(git -C "$DOTFILES_REPO_ROOT" status --short --untracked-files=all -- symlink-roots 2>/dev/null || true)
    if [[ -n "$output" ]]; then
        log_warn "repo-backed symlink roots are dirty:"
        printf '%s\n' "$output"
    fi
}

main() {
    ensure_runtime_dirs

    local first_run=0
    local backup_dir=""

    if ! cutover_done; then
        log_info "first run: checking cutover preflight"
        run_preflight || die "cutover preflight failed"

        first_run=1
        backup_dir="$DOTFILES_BACKUP_ROOT/cutover-$(timestamp_path)"
        mkdir -p "$backup_dir"
        backup_true_dir_roots "$backup_dir"
        log_info "cutover backup saved to $backup_dir"
    fi

    log_info "applying chezmoi in symlink mode"
    run_chezmoi apply --mode symlink --no-tty

    log_info "ensuring healer launch agent is loaded"
    ensure_healer_loaded

    log_info "running one-shot heal pass"
    "$SCRIPT_DIR/heal.sh"

    log_info "re-applying chezmoi after heal"
    run_chezmoi apply --mode symlink --no-tty

    log_info "running repo-backed symlink audit"
    run_true_dir_audit

    if [[ "$first_run" -eq 1 ]]; then
        write_cutover_marker "$backup_dir"
        log_info "cutover marker written to $DOTFILES_CUTOVER_MARKER"
    fi

    log_info "up complete"
}

main "$@"
