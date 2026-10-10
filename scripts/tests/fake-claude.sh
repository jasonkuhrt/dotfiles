#!/usr/bin/env bash
set -euo pipefail

# Stands in for the claude binary in `just claude-account-check`. It edits the user-scope MCP
# servers where the real one does: .claude.json in CLAUDE_CONFIG_DIR, or in HOME without one.
config="${CLAUDE_CONFIG_DIR:-$HOME}/.claude.json"

edit() {
    local tmp
    tmp="$(mktemp)"
    jq "$@" "$config" > "$tmp"
    mv "$tmp" "$config"
}

case "${1:-} ${2:-}" in
    "mcp add")
        edit --arg name "$3" --arg command "$4" '.mcpServers[$name] = {type: "stdio", command: $command}'
        ;;
    "mcp remove")
        edit --arg name "$3" 'del(.mcpServers[$name])'
        ;;
    "identify "*)
        edit --arg id "$2" '.userID = $id'
        ;;
    "where ")
        printf '%s\n' "${CLAUDE_CONFIG_DIR:-$HOME}"
        ;;
    "exit "*)
        exit "$2"
        ;;
esac
