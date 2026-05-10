#!/usr/bin/env bash
set -euo pipefail

cleanup() {
  if [[ "${CLEAR_ON_EXIT:-0}" == "1" ]]; then
    printf '' | pbcopy
  fi
}
trap cleanup EXIT

service="${1:?usage: credential-cache-copy-password.sh <service>}"
keychain_service="agent-credential:${service}"

if ! security find-generic-password -s "$keychain_service" -w | pbcopy; then
  printf '' | pbcopy
  printf 'STATUS:missing\n'
  printf 'SERVICE:%s\n' "$keychain_service"
  exit 1
fi

printf 'STATUS:copied\n'
printf 'SERVICE:%s\n' "$keychain_service"
