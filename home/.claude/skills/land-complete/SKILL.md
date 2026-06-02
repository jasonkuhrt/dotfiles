---
name: land-complete
description: Orchestrate land-pr, gh-ci, and land-merged into one end-to-end landing pipeline. Use when the user asks to land complete, land and merge, merge on green, finish a PR end to end, or land without another confirmation loop.
---

# Land Complete

## Contract

This skill orchestrates other skills into one landing pipeline:

1. `land-pr`
2. `gh-ci`, then remote merge on green
3. `land-merged`

First, read the respective skills so you understand the pipeline.
Then determine your actual current position in that pipeline.
Then jump to the respective skill that encompasses that position and carry it out faithfully.

Do not duplicate the operational knowledge already encoded in `land-pr`, `gh-ci`, or `land-merged`. This skill only routes between them and performs the merge step between ready PR and merged PR.

## Workflow

### 1. Load The Pipeline Skills

Read these before acting:

- `land-pr`
- `gh-ci`
- `land-merged`

### 2. Find Your Pipeline Position

Capture the invocation worktree:

```bash
git rev-parse --show-toplevel
```

Then inspect enough git/GitHub state to choose exactly one position:

- If the current worktree/branch is not yet a ready PR, run `land-pr` from this context and follow it faithfully.
- If there is an open, ready PR, run `gh-ci`; when it is green for the current head SHA, merge it remotely.
- If the PR is already merged, run `land-merged` from the original invocation worktree context and follow it faithfully.
- If the PR is closed but not merged, or the position is ambiguous, stop and report the blocker.

Do not use `gh pr merge --delete-branch`; cleanup belongs to `land-merged`.

Keep the final report short: PR, branch, merge result, and cleanup result.
