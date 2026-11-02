#!/usr/bin/env node
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Only gh and sleep are fixtures; run the real shell entrypoint and jq logic.
const watcher = process.argv[2] ?? fileURLToPath(new URL('./wait-ci.sh', import.meta.url));
const root = mkdtempSync(path.join(tmpdir(), 'gh-ci-verify-'));
const bin = path.join(root, 'bin');
mkdirSync(bin);
writeFileSync(path.join(bin, 'gh'), `#!/usr/bin/env bash
set -euo pipefail
step=$(cat "$GH_CI_FIXTURE/step")
case "$1 $2" in
  'repo view') printf 'fixture/repo\\n' ;;
  'pr view')
    if [[ "$*" == *statusCheckRollup* ]]; then
      input="$GH_CI_FIXTURE/$step-pr.json"
    else
      input="$GH_CI_FIXTURE/initial.json"
    fi
    # Match gh's field selection: state must actually be requested.
    jq --arg fields "\${!#}" '
      ($fields | split(",")) as $keys
      | with_entries(select(.key as $key | $keys | index($key)))
    ' "$input"
    ;;
  'api graphql') cat "$GH_CI_FIXTURE/threads.json" ;;
  'api repos/'*)
    case "$2" in
      *'/jobs?'*) printf '0\\n' ;;
      *'/actions/runs?head_sha=watched-head&per_page=100')
        cat "$GH_CI_FIXTURE/$step-runs.json" ;;
      *) echo "Unexpected API path: $2" >&2; exit 98 ;;
    esac
    ;;
  *) echo "Unexpected gh call: $*" >&2; exit 98 ;;
esac
`, { mode: 0o755 });
writeFileSync(path.join(bin, 'sleep'), `#!/usr/bin/env bash
set -euo pipefail
step=$(cat "$GH_CI_FIXTURE/step")
next=$((step + 1))
if [[ ! -f "$GH_CI_FIXTURE/$next-pr.json" ]]; then
  echo 'Watcher kept polling beyond the final fixture snapshot' >&2
  exit 97
fi
printf '%s' "$next" > "$GH_CI_FIXTURE/step"
`, { mode: 0o755 });

const initial = {
  state: 'OPEN', headRefName: 'fixture-branch', headRefOid: 'watched-head',
  mergeable: 'MERGEABLE', mergeStateStatus: 'CLEAN', statusCheckRollup: [],
};
const check = conclusion => ({
  __typename: 'CheckRun', name: 'test', status: 'COMPLETED', conclusion,
});
const run = (status, conclusion = null, event = 'pull_request') => ({
  id: 1, name: 'test', status, conclusion, event,
});
const snapshot = (state, checks = [], runs = [], fields = {}) => ({
  pr: { ...initial, state, statusCheckRollup: checks, ...fields },
  runs,
});
const mergedEmpty = snapshot('MERGED');
const green = snapshot('OPEN', [check('SUCCESS')], [run('completed', 'success')]);
let passed = 0;

function verify(name, snapshots, status, verdict, threads = []) {
  const fixture = path.join(root, name);
  mkdirSync(fixture);
  const json = (name, value) => writeFileSync(path.join(fixture, name), JSON.stringify(value));
  json('initial.json', initial);
  json('threads.json', { data: { repository: { pullRequest: { reviewThreads: { nodes: threads } } } } });
  writeFileSync(path.join(fixture, 'step'), '0');
  for (const [index, value] of snapshots.entries()) {
    json(`${index}-pr.json`, value.pr);
    json(`${index}-runs.json`, { workflow_runs: value.runs });
  }
  const result = spawnSync('bash', [watcher, '7'], {
    env: { ...process.env, PATH: `${bin}:${process.env.PATH}`, GH_CI_FIXTURE: fixture, GH_CI_VERBOSE: '0' },
    encoding: 'utf8', timeout: 5000,
  });
  const evidence = `${name}\n${result.stdout}${result.stderr}`;
  assert.ifError(result.error);
  assert.equal(result.status, status, evidence);
  assert.match(result.stdout, new RegExp(`^(=== ${verdict} ===|${verdict}:)`, 'm'), evidence);
  assert.equal(Number(readFileSync(path.join(fixture, 'step'), 'utf8')), snapshots.length - 1,
    `Watcher returned before the required transition: ${evidence}`);
  if (status !== 0) assert.doesNotMatch(result.stdout, /ALL GREEN/, evidence);
  console.log(`PASS: ${name}`);
  passed++;
}

try {
  verify('merged-empty', [mergedEmpty], 3, 'NOTHING RAN');
  verify('open-empty-until-merged', [snapshot('OPEN'), snapshot('OPEN'), mergedEmpty], 3, 'NOTHING RAN');
  verify('open-empty-until-checks', [snapshot('OPEN'), green], 0, 'ALL GREEN');
  verify('merged-queued-and-running', [
    snapshot('MERGED', [], [run('queued')]),
    snapshot('MERGED', [], [run('in_progress')]),
    { ...green, pr: { ...green.pr, state: 'MERGED' } },
  ], 0, 'ALL GREEN');
  verify('merged-workflow-awaiting-checks', [
    snapshot('MERGED', [], [run('completed', 'success')]), green,
  ], 0, 'ALL GREEN');
  verify('ignored-dashboard-run', [snapshot('MERGED', [], [
    run('completed', 'cancelled', 'pull_request_target'),
  ])], 3, 'NOTHING RAN');
  verify('all-skipped-precedes-pending-workflow', [
    snapshot('MERGED', [check('SKIPPED')], [run('queued')]),
  ], 3, 'NOTHING RAN');
  verify('failed-check', [snapshot('MERGED', [check('FAILURE')])], 1, 'FAILED');
  verify('failed-workflow-precedes-skips', [
    snapshot('MERGED', [check('SKIPPED')], [run('completed', 'failure')]),
  ], 1, 'FAILED');
  verify('stale-head-precedes-empty-verdict', [
    snapshot('MERGED', [], [], { headRefOid: 'different-head' }),
  ], 2, 'STALE HEAD');
  verify('conflict-precedes-empty-verdict', [
    snapshot('MERGED', [], [], { mergeable: 'CONFLICTING' }),
  ], 2, 'CONFLICT');
  verify('review-block-precedes-empty-verdict', [
    snapshot('MERGED', [], [], { mergeStateStatus: 'BLOCKED' }),
  ], 1, 'BLOCKED', [{ id: 'thread', isResolved: false, path: 'file', line: 1,
    comments: { nodes: [{ author: { login: 'reviewer' }, body: 'Fix this', url: 'https://example.test/thread' }] } }]);
  console.log(`PASS: ${passed} CI watcher scenarios`);
} finally {
  rmSync(root, { recursive: true, force: true });
}
