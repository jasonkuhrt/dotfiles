#!/usr/bin/env bash
# block-direct-vitest: Require package scripts for Vitest test runs.
# Direct vitest CLI loses config paths, project settings, and root overrides.
# Repos should provide npm/pnpm scripts like test:unit, test:base, etc.

set -euo pipefail

command="$1"

# Pattern: vitest run, vitest watch, vitest bench, npx vitest run, etc.
direct_vitest_pattern='(^|[;&|][;&|]?[[:space:]]*)((npx|bunx)[[:space:]]+|npm[[:space:]]+exec[[:space:]]+|pnpm[[:space:]]+exec[[:space:]]+)?vitest[[:space:]]+(run|watch|bench|list)([[:space:]]|$)'

if ! [[ "$command" =~ $direct_vitest_pattern ]]; then
  echo '{"decision": "allow"}'
  exit 0
fi

cat << 'BLOCK'
{"decision": "block", "reason": "**[block-direct-vitest]**\n\nDo not run Vitest directly in repos that provide package scripts.\n\nUse the repo's npm/pnpm test scripts instead (e.g. `npm run test:unit`, `npm run test:base`). Check `package.json` for available test scripts.\n\nDirect Vitest CLI is still fine for:\n- `npx vitest --version`\n- `npx vitest init`"}
BLOCK
