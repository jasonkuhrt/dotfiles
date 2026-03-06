#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
source "$SCRIPT_DIR/common.sh"

append_log() {
    printf '%s %s\n' "$(timestamp_utc)" "$*" >>"$DOTFILES_HEAL_LOG"
}

managed_file_entries() {
    python3 - <<'PY'
import json
import subprocess

raw = subprocess.check_output(
    [
        "chezmoi",
        "managed",
        "--mode",
        "file",
        "--include=files",
        "--path-style=all",
        "--format",
        "json",
    ],
    text=True,
)
entries = json.loads(raw)
for entry in entries.values():
    print(f"{entry['absolute']}\t{entry['sourceAbsolute']}")
PY
}

acquire_lock() {
    mkdir "$DOTFILES_HEAL_LOCK_DIR" 2>/dev/null || {
        local existing_pid=""
        if [[ -f "$DOTFILES_HEAL_LOCK_DIR/pid" ]]; then
            existing_pid=$(cat "$DOTFILES_HEAL_LOCK_DIR/pid" 2>/dev/null || true)
        fi

        if [[ -n "$existing_pid" ]] && kill -0 "$existing_pid" 2>/dev/null; then
            append_log "lock busy pid=$existing_pid"
            log_info "heal skipped, another run is active (pid=$existing_pid)"
            exit 0
        fi

        rm -rf "$DOTFILES_HEAL_LOCK_DIR"
        mkdir "$DOTFILES_HEAL_LOCK_DIR"
    }

    printf '%s\n' "$$" >"$DOTFILES_HEAL_LOCK_DIR/pid"
    trap 'rm -rf "$DOTFILES_HEAL_LOCK_DIR"' EXIT
}

main() {
    ensure_runtime_dirs
    acquire_lock

    local run_stamp
    run_stamp=$(timestamp_path)
    local run_backup="$DOTFILES_BACKUP_ROOT/heal-$run_stamp"
    local total=0
    local healed=0
    local skipped=0
    local item_errors=0

    while IFS=$'\t' read -r target source_path; do
        [[ -n "$target" ]] || continue

        if [[ -z "$source_path" ]]; then
            skipped=$((skipped + 1))
            continue
        fi

        local expected_link
        expected_link=$(run_chezmoi cat --mode symlink "$target" 2>/dev/null | head -n 1 || true)
        if [[ "$expected_link" != "$source_path" ]]; then
            skipped=$((skipped + 1))
            continue
        fi

        total=$((total + 1))

        local kind=""
        if [[ -e "$target" || -L "$target" ]]; then
            kind=$(stat -f '%HT' "$target" 2>/dev/null || true)
        fi

        if [[ "$kind" == "Symbolic Link" ]]; then
            continue
        fi

        append_log "repair start target=$target kind=${kind:-missing}"

        if [[ -e "$target" || -L "$target" ]]; then
            local live_backup="$run_backup/live$target"
            mkdir -p "$(dirname "$live_backup")"
            cp -a "$target" "$live_backup"
        fi

        local source_backup="$run_backup/source$target"
        mkdir -p "$(dirname "$source_backup")"
        cp -a "$source_path" "$source_backup"

        if [[ -e "$target" || -L "$target" ]]; then
            if ! cp -f "$target" "$source_path"; then
                item_errors=$((item_errors + 1))
                append_log "repair failed target=$target step=capture"
                continue
            fi
        fi

        if ! run_chezmoi apply --mode symlink --force --no-tty "$target" >/dev/null 2>&1; then
            item_errors=$((item_errors + 1))
            append_log "repair failed target=$target step=apply"
            continue
        fi

        healed=$((healed + 1))
        append_log "repair success target=$target"
    done < <(managed_file_entries)

    log_info "heal scanned=$total healed=$healed skipped=$skipped item_errors=$item_errors"
    append_log "run complete scanned=$total healed=$healed skipped=$skipped item_errors=$item_errors"
}

main "$@"
