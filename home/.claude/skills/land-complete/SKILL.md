---
name: land-complete
description: Orchestrate land-pr, gh-ci, and land-merged into one end-to-end landing pipeline. Use when the user asks to land complete, land and merge, merge on green, finish a PR end to end, or land without another confirmation loop.
---

# Land Complete

## Contract

Use this when the target end state is an end-to-end landed PR: ready, merged, and locally cleaned up.

Target end state: a merged PR, with post-merge local worktree and branch cleanup completed or explicitly blocked.

Pipeline:

1. `land-pr`
2. `gh-ci`, then remote merge on green
3. `land-merged`

First, read the respective skills so you understand the pipeline.
Then determine your actual current position in that pipeline.
Then jump to the respective skill that encompasses that position and carry it out faithfully.

Do not duplicate the operational knowledge already encoded in `land-pr`, `gh-ci`, or `land-merged`. This skill only routes between them and performs the merge step between ready PR and merged PR.

Invoking this skill is explicit merge intent. Do not ask for another merge confirmation unless the repository state is ambiguous or the PR cannot be resolved.

## Workflow

### 1. Load The Pipeline Skills

Read these before acting:

- `land-pr`
- `gh-ci`
- `land-merged`

### 2. Capture Context

Capture the invocation worktree before any merge or cleanup:

```bash
git rev-parse --show-toplevel
```

Do not require a PR to exist yet. The starting flow is the same as `land-pr`: it may commit intended dirty work, push the branch, and create the PR when missing.

### 3. Find Your Pipeline Position

Inspect enough git/GitHub state to choose exactly one position:

- If the current worktree/branch is not yet a ready PR, run `land-pr` from this context and follow it faithfully.
- If there is an open, ready PR, run `gh-ci`; when it is green for the current head SHA, merge it remotely.
- If the PR is already merged, run `land-merged` from the original invocation worktree context and follow it faithfully.
- If the PR is closed but not merged, or the position is ambiguous, stop and report the blocker.

### 4. Merge On Green

Before merging, re-read the current PR head and merge state:

```bash
gh pr view <number> --json number,url,isDraft,headRefName,headRefOid,baseRefName,mergeStateStatus,mergeable,state
```

Run `gh-ci` for the PR. Merge only when:

- The PR state is `OPEN`.
- The PR is not draft.
- `gh-ci` reports green for the current `headRefOid`, including `E2E Local Sign Off` when required.
- `mergeStateStatus` is clean/mergeable enough for the repo's branch protection.
- The head SHA still matches the SHA that was checked.

Use a remote merge command that does not perform local branch cleanup:

```bash
gh pr merge <number> --squash --match-head-commit <headRefOid>
```

Important multi-worktree rule:

- Never use `gh pr merge --delete-branch` in a repo with linked worktrees.
- `--delete-branch` is not remote-only; it can try to switch the current worktree and delete a local branch.
- In a PR worktree, that can fail after the remote merge because Git cannot delete the checked-out branch or check out a base branch already used by another worktree.

If the user wants the remote PR branch deleted, delete only the remote ref separately:

```bash
git push origin --delete <headRefName>
```

Do local worktree and local branch cleanup separately with `land-merged`; do not bundle it into the merge command.

### 5. Verify Merge

After the merge command succeeds, verify the remote PR state:

```bash
gh pr view <number> --json state,mergedAt,mergeCommit,url,headRefName,baseRefName
```

Proceed only when `state` is `MERGED`.

### 6. Clean Up With Land Merged

Run cleanup from the original invocation worktree context captured in step 2. Follow `land-merged` exactly as written; do not inline its cleanup rules here.

## Stop Conditions

Stop and report clearly if:

- the PR cannot be resolved
- the PR is already closed but not merged
- Greptile has unresolved actionable feedback
- any required check is red
- E2E Local Sign Off is required but fails
- the PR head SHA changes after checks were observed green
- the selected cleanup worktree is dirty

## Output

Keep the closeout short:

- PR URL and branch.
- Greptile outcome.
- Remote check and E2E sign-off outcome.
- Merge commit.
- Whether base sync, PR worktree removal, and local branch deletion completed.
