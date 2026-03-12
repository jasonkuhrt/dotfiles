#!/usr/bin/env bash
set -euo pipefail

code_home="${CODEX2_CODEX_HOME:-${CODEX_HOME:-$HOME/.codex}}"
mode="${CODEX2_TEST_MODE:-new}"
session_id="${CODEX2_TEST_SESSION_ID:-019cfeed-0000-7000-8000-000000000001}"
cwd_value="${CODEX2_TEST_CWD:-$PWD}"
initial_title="${CODEX2_TEST_INITIAL_TITLE:-Initial title}"
renamed_title="${CODEX2_TEST_RENAMED_TITLE:-Renamed title}"
argv_log="${CODEX2_TEST_ARGV_LOG:-}"

session_file="$code_home/sessions/2026/03/09/test-$session_id.jsonl"
snapshot_file="$code_home/shell_snapshots/$session_id.sh"
session_index="$code_home/session_index.jsonl"
tui_log="$code_home/log/codex-tui.log"

mkdir -p "$(dirname "$session_file")" "$(dirname "$snapshot_file")" "$(dirname "$tui_log")"
touch "$session_index" "$tui_log"

if [ -n "$argv_log" ]; then
    printf '%s\n' "$@" > "$argv_log"
fi

append_index() {
    local title="$1"
    printf '{"id":"%s","thread_name":"%s","updated_at":"2026-03-09T20:30:00Z"}\n' "$session_id" "$title" >> "$session_index"
}

ensure_session_file() {
    if [ ! -f "$session_file" ]; then
        printf '{"timestamp":"2026-03-09T20:30:00Z","type":"session_meta","payload":{"id":"%s","cwd":"%s"}}\n' "$session_id" "$cwd_value" > "$session_file"
    fi
}

case "$mode" in
    new|fork)
        ensure_session_file
        touch "$snapshot_file"
        printf '2026-03-09T20:30:00.000000Z INFO session_init:shell_snapshot{thread_id=%s}: ok\n' "$session_id" >> "$tui_log"
        append_index "$initial_title"
        sleep 0.8
        append_index "$renamed_title"
        ;;
    resume)
        ensure_session_file
        touch "$snapshot_file"
        sleep 0.8
        append_index "$renamed_title"
        ;;
    *)
        printf 'fake-codex: unknown mode %s\n' "$mode" >&2
        exit 64
        ;;
esac

sleep 0.3
