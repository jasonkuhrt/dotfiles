#!/usr/bin/env bash
# Block a push whose outgoing commits contain secrets. This repo is public, and gitleaks
# reads .gitleaks.toml from the repo root for the vendored-docs allowlist.
set -euo pipefail

command -v gitleaks >/dev/null 2>&1 || {
  echo "pre-push: gitleaks is not installed (declared in scripts/data/Brewfile)" >&2
  exit 1
}

remote="$1"
status=0

while read -r _local_ref local_sha _remote_ref _remote_sha; do
  # All-zero sha means a branch deletion: nothing is being sent.
  if [[ "$local_sha" =~ ^0+$ ]]; then
    continue
  fi
  gitleaks git --no-banner --redact --log-level warn \
    --log-opts="$local_sha --not --remotes=$remote" . || status=1
done

exit "$status"
