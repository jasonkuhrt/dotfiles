#!/usr/bin/env bash
# block-gh-pr-checks-watch: Route PR CI polling through the gh-ci skill.
#
# `gh pr checks --watch [--fail-fast]` is the foot-gun the gh-ci skill exists
# to replace. It exits as soon as the *visible* checks settle, so heavy
# workflows that queue 30-90s after push are missed entirely; the agent then
# reports the PR as "green" when it isn't. Counting check-runs has the same
# class of bug — different PRs have different workflow shapes.
#
# The canonical poll is `bash ~/.claude/skills/gh-ci/scripts/wait-ci.sh
# <PR_NUMBER>` (run under the Monitor tool). It anchors to the PR head SHA,
# reads `statusCheckRollup`, and only exits green after the all-green rollup
# stays stable long enough to catch delayed matrix/fanout checks.

set -euo pipefail

input=$(cat)
command=$(printf '%s' "$input" | python3 -c "import json,sys; print(json.load(sys.stdin).get('tool_input',{}).get('command',''))" 2>/dev/null || true)

if [[ -z "$command" ]]; then
  echo '{}'
  exit 0
fi

# Match `gh pr checks` (or `gh pr checks <N>`) followed (anywhere) by
# `--watch` or `--fail-fast`. Also catches `gh pr checks ... | wc -l` style
# counting heuristics.
banned_watch_pattern='gh[[:space:]]+pr[[:space:]]+checks([[:space:]]+[^|;&]*)*[[:space:]](--watch|--fail-fast)'
banned_count_pattern='gh[[:space:]]+pr[[:space:]]+checks[^|]*\|[[:space:]]*(wc[[:space:]]|grep[[:space:]]+-c|awk[[:space:]]+.+(count|uniq[[:space:]]*-c))'

if [[ ! "$command" =~ $banned_watch_pattern ]] && [[ ! "$command" =~ $banned_count_pattern ]]; then
  echo '{}'
  exit 0
fi

read -r -d '' MSG <<'EOF' || true
**[block-gh-pr-checks-watch]**

`gh pr checks --watch` / `--fail-fast` and count-based polls of `gh pr checks` are banned. They exit as soon as the *visible* checks settle, so heavy workflows that queue 30-90s after push are missed entirely — the agent reports the PR green when it isn't. Different PRs have different workflow shapes, so counting check-runs has no robust threshold either.

Use the canonical poll instead, under the Monitor tool:

  Monitor: bash ~/.claude/skills/gh-ci/scripts/wait-ci.sh <PR_NUMBER>

For a one-shot authoritative status without polling, use:

  gh pr view <PR_NUMBER> --json headRefOid,mergeStateStatus,statusCheckRollup

The full skill is at `~/.claude/skills/gh-ci/SKILL.md`.
EOF

export MSG
python3 -c 'import json,os; print(json.dumps({"decision":"block","reason":os.environ["MSG"]}))'
