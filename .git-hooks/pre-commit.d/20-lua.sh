#!/usr/bin/env bash
# The git-hooks runtime (core.hooksPath) runs executable *.sh plugins from this directory.
# .git/hooks/ is never consulted, which is why the old install script's hook never ran.
exec "$(git rev-parse --show-toplevel)/scripts/git-hooks/check-staged-lua.sh"
