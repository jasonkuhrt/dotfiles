#!/usr/bin/env bash
set -euo pipefail

log="${CMUX_ZMX_TEST_LOG:?}"
cmd="${1:-}"
shift || true

printf '%s %s\n' "$cmd" "$*" >> "$log"

case "$cmd" in
  attach|kill|list)
    exit 0
    ;;
  *)
    exit 0
    ;;
esac
