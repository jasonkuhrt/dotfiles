#!/usr/bin/env bash

set -euo pipefail

DOTFILES_REPO_ROOT="${DOTFILES_REPO_ROOT:-$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)}"

run_dotctl() {
    exec bun "$DOTFILES_REPO_ROOT/packages/dotctl/src/bin/dotctl.ts" "$@"
}
