#!/usr/bin/env bash
set -euo pipefail

service="${1:?usage: credential-cache-status.sh <service>}"
keychain_service="agent-credential:${service}"

if ! item="$(security find-generic-password -s "$keychain_service" 2>/dev/null)"; then
  printf 'STATUS:missing\n'
  printf 'SERVICE:%s\n' "$keychain_service"
  exit 0
fi

username="$(printf '%s\n' "$item" | sed -n 's/.*"acct"<blob>="\(.*\)"/\1/p' | head -n 1)"

printf 'STATUS:found\n'
printf 'SERVICE:%s\n' "$keychain_service"
printf 'USERNAME:%s\n' "$username"
