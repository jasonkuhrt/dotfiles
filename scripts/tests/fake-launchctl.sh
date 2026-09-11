#!/usr/bin/env bash
# Stand-in for launchctl, so a check can run `git maintenance start` without
# reaching the real user domain. Records the call and succeeds for every
# subcommand.
set -euo pipefail

log="${LAUNCHCTL_TEST_LOG:?}"
printf '%s\n' "$*" >> "$log"

exit 0
