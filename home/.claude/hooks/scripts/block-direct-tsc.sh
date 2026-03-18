#!/usr/bin/env bash
# block-direct-tsc: Block tsc binary. Suggest the exact alternative command.

set -euo pipefail

input=$(cat)
command=$(echo "$input" | python3 -c "import sys,json; print(json.load(sys.stdin).get('tool_input',{}).get('command',''))" 2>/dev/null)

if [[ -z "$command" ]]; then
  echo '{}'
  exit 0
fi

tsc_pattern='(^|[;&|][;&|]?[[:space:]]*)((bunx|npx)[[:space:]]+|(pnpm|npm)[[:space:]]+exec[[:space:]]+|\.?/?node_modules/\.bin/)?tsc([[:space:]]|$)'

if ! [[ "$command" =~ $tsc_pattern ]]; then
  echo '{}'
  exit 0
fi

# --- tsc detected — gather context and let python3 build the response ---

repo_root=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
cwd=$(pwd)

python3 -c "
import json, re, os

repo_root = '$repo_root'
cwd = '$cwd'

# Detect package manager
for lock, name in [('bun.lock', 'bun'), ('bun.lockb', 'bun'), ('pnpm-lock.yaml', 'pnpm'), ('yarn.lock', 'yarn')]:
    if os.path.isfile(os.path.join(repo_root, lock)):
        pm = name
        break
else:
    pm = 'npm'

# Detect current package name if in monorepo subdir
pkg_name = ''
pkg_json_cwd = os.path.join(cwd, 'package.json')
if os.path.isfile(pkg_json_cwd) and cwd != repo_root:
    try: pkg_name = json.load(open(pkg_json_cwd)).get('name', '')
    except: pass

# Find type-check scripts from root package.json
scripts = []
root_pkg = os.path.join(repo_root, 'package.json')
if os.path.isfile(root_pkg):
    try:
        s = json.load(open(root_pkg)).get('scripts', {})
        scripts = sorted(k for k in s if re.search(r'(?=.*type)(?=.*check)', k, re.I) and 'lint' not in k.lower())
    except: pass

# Check if cwd package has its own check:types
has_local = False
if pkg_name and os.path.isfile(pkg_json_cwd):
    try: has_local = 'check:types' in json.load(open(pkg_json_cwd)).get('scripts', {})
    except: pass

# Check tsgo
has_tsgo = (
    os.path.isfile(os.path.join(repo_root, 'node_modules', '.bin', 'tsgo'))
    or os.popen('command -v tsgo 2>/dev/null').read().strip() != ''
)

# Build recommendation
lines = ['**[block-direct-tsc]**', '', 'Do not use the \`tsc\` binary.', '']

if scripts:
    if pkg_name and has_local:
        best = f'{pm} run --cwd {cwd} check:types'
    elif pkg_name and 'check:types' in scripts:
        best = f'{pm} run --filter {pkg_name} check:types'
    elif 'check:types' in scripts:
        best = f'{pm} run check:types'
    else:
        best = f'{pm} run {scripts[0]}'

    lines.append(f'Run instead: \`{best}\`')

    if len(scripts) > 1:
        lines.append('')
        lines.append('All type-check scripts:')
        for s in scripts:
            lines.append(f'- \`{pm} run {s}\`')

elif has_tsgo:
    lines.append('No type-check scripts found. Use \`tsgo\` instead.')
else:
    lines.append('Use \`bunx tsgo\` instead.')

reason = '\n'.join(lines)
print(json.dumps({'decision': 'block', 'reason': reason}))
"
