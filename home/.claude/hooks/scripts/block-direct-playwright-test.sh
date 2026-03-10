#!/usr/bin/env bash
# block-direct-playwright-test: Require package scripts for Playwright test runs.
# Allow direct Playwright CLI only for browser/runtime management commands such as
# `playwright install` and `playwright install-deps`.

set -euo pipefail

input=$(cat)
command=$(echo "$input" | python3 -c "import sys,json; print(json.load(sys.stdin).get('tool_input',{}).get('command',''))" 2>/dev/null)

if [[ -z "$command" ]]; then
  echo '{}'
  exit 0
fi

# Block direct Playwright test execution through common launchers:
#   playwright test
#   npx playwright test
#   npm exec playwright test
#   pnpm exec playwright test
#   bunx playwright test
direct_playwright_test_pattern='(^|[;&|][;&|]?[[:space:]]*)((npx|bunx)[[:space:]]+|npm[[:space:]]+exec[[:space:]]+|pnpm[[:space:]]+exec[[:space:]]+)?playwright[[:space:]]+test([[:space:]]|$)'

if ! [[ "$command" =~ $direct_playwright_test_pattern ]]; then
  echo '{}'
  exit 0
fi

# Only enforce when the current repo actually exposes package scripts for Playwright.
repo_root=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
package_json="$repo_root/package.json"

if [[ ! -f "$package_json" ]]; then
  echo '{}'
  exit 0
fi

if ! grep -qE '"(test:e2e|test:e2e:headless|test:e2e:headed|test:e2e:ui|test:e2e:list|persona:test:e2e)"[[:space:]]*:' "$package_json"; then
  echo '{}'
  exit 0
fi

cat <<'EOF'
{"decision": "block", "reason": "**[block-direct-playwright-test]**\n\nDo not run Playwright tests via the raw CLI in repos that already provide package scripts.\n\nUse the repo scripts instead:\n- `npm run test:e2e`\n- `npm run test:e2e:headed`\n- `npm run test:e2e:ui`\n- `npm run test:e2e:list`\n- `npm run persona:test:e2e`\n\nDirect Playwright CLI is still fine for browser/runtime management commands such as:\n- `npx playwright install`\n- `npx playwright install-deps`\n- `npx playwright show-report`"}
EOF
