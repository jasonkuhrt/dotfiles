---
name: gh-ci
description: Poll, diagnose, and report on a GitHub PR's CI. Use this skill whenever you're about to watch a PR's CI to a terminal state — after pushing commits to a PR, after /git_sync, when the user says "is CI green", "wait for CI", "check the PR's checks", "monitor CI", "did CI pass", "watch the workflow", "fix CI failures", or any phrasing that asks whether a PR is ready to merge based on its checks. ALSO use proactively whenever you push a commit to a branch that has an open PR — never spin up an ad-hoc `gh pr checks --watch` or count-based poll. This skill is the only authority for PR CI status; ignore any older guidance suggesting otherwise.
---

# gh-ci — The Only Way To Watch a GitHub PR's CI

Every prior attempt to "just check CI" has failed for the same reason: each layer of the GitHub Actions surface answers a different question, and reading the wrong layer produces phantom signals. This skill is the single source of truth. If you find yourself reaching for `gh pr checks --watch --fail-fast`, polling workflow names as authoritative, counting checks, or assuming a dashboard/plan job represents the matrix behind it — stop and use the canonical script below.

## The authoritative layers

A PR's "done?" question must be anchored to the current PR head SHA and answered from the PR's own check rollup. Skipping either piece is where everything has gone wrong before.

| # | Layer | API | What it tells you |
|---|---|---|---|
| 1 | **PR identity and mergeability** | `gh pr view --json headRefOid,headRefName,mergeable,mergeStateStatus` | Which SHA you are waiting for, and whether conflicts make CI meaningless. |
| 2 | **PR check rollup** | `gh pr view --json statusCheckRollup` | Every current check run/status context GitHub attaches to that PR head, including delayed matrix fanout. |
| 3 | **Failed job logs** | `gh run view <run-id> --log-failed --job <job-id>` | The exact failing step/log excerpt, read only after the rollup is red. |

## The canonical poll

Run via `Monitor`. The script bakes in every lesson learned the hard way. Never inline this logic again.

```bash
Monitor:
  bash ~/.claude/skills/gh-ci/scripts/wait-ci.sh <PR_NUMBER>
```

The script:

- Calls `gh pr view` first and anchors to the initial `headRefOid`.
- Exits `2` if the PR head moves while polling; rerun for the new SHA.
- Exits `2` if `mergeable == CONFLICTING`.
- Polls `statusCheckRollup` directly, not workflow-run names.
- Handles both `CheckRun` and legacy `StatusContext` field shapes.
- Groups duplicate matrix checks in compact status lines.
- Exits `1` immediately on terminal red conclusions.
- Exits `0` only after all visible checks are green and the rollup has stayed stable for the grace window, catching delayed fanout.

Tunables via env:

- `GH_CI_GRACE` — seconds the all-green rollup must stay stable before exit (default 90).
- `GH_CI_POLL` — poll interval (default 30s).

## Banned patterns

| Pattern | Failure mode |
|---|---|
| `gh pr checks <N> --watch --fail-fast` | Exits as soon as the *visible* checks settle. Heavy workflows that queue 30–90s after push are missed entirely. **Blocked by the `block-gh-pr-checks-watch` hook.** |
| Counting check-runs (`if count >= N`, `gh pr checks <N> \| wc -l`, etc.) | Different PRs have different workflow shapes. There's no robust threshold. **Blocked by the `block-gh-pr-checks-watch` hook.** |
| Treating workflow names (`PR`, `PR Dashboard`, etc.) as authoritative | Plan/dashboard jobs can complete or cancel while later matrix jobs are still queued or not yet created. |
| `while true; do ...; sleep 30; done` in plain Bash | Blocked by the `block-sleep-poll-loops` hook. Use Monitor (this skill's script already runs under Monitor). |
| Treating dashboard/comment checks as authoritative | They are UX surfaces, not the current head's complete check state. |
| Polling check-runs without first checking mergeable | A CONFLICTING PR will never run the heavy workflow, so the poll spins until timeout. |

## When CI fails

Don't paste raw logs. The script reports failed workflow URLs; from there:

```bash
gh run view <run-id> --log-failed --job <job-id>
```

Surface to the user:
- The exact error line (TS error / test failure / build error)
- File + line if available
- One-sentence root cause
- The direct URL

## When the PR has conflicts (script exits 2)

You are not done with CI — you have a different job:

1. `cd` into the PR's worktree (per `git_sync`).
2. `git fetch origin <baseRefName>`.
3. `git merge origin/<baseRefName>` and resolve conflicts.
4. Commit, push.
5. Re-invoke this skill.

## After this skill exits 0

CI is green. Tell the user. Don't ask "want me to do X?" — pick the next obvious action (e.g. report status, address review comments).

## What this skill replaces

Delete on sight: any rule file, memory entry, or ad-hoc `gh pr checks --watch` invocation that competes with this skill. The single-source rule was the whole point.
