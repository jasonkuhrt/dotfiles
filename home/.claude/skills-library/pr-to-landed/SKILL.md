---
name: pr-to-landed
description: Use when the user wants a PR merged and cleaned up end to end, says "pr to landed", "land it", "land and merge", "merge on green", "finish a PR end to end", or "land without another confirmation loop"; or, after a PR merged, "PR is merged, clean up" or "clean up the merged PR's worktree". On an open PR, invoking it is merge intent.
---

# PR To Landed

## Contract

Takes the work to a landed PR: ready, merged, and cleaned up locally and on the remote.

Target end state: a merged PR, with its worktree removed and its branch deleted locally and on the remote, or a blocker reported.

Pipeline:

1. `pr-to-ready`
2. `gh-ci`, then remote merge on green
3. the post-PR-merge procedure: the repo's `.claude/procedures/post-pr-merge.md` when it exists, else `~/.claude/procedures/post-pr-merge.md`

First, read the pipeline's skills and the procedure so you understand the pipeline.
Then determine your actual current position in that pipeline.
Then jump to the step that encompasses that position and carry it out faithfully.

Do not duplicate the operational knowledge already encoded in `pr-to-ready`, `gh-ci`, or the procedure. This skill only routes between them and performs the merge step between ready PR and merged PR.

Invoking this skill on an open PR is explicit merge intent. Do not ask for another merge confirmation unless the repository state is ambiguous or the PR cannot be resolved.

## Workflow

### 1. Load The Pipeline

Read these before acting:

- `pr-to-ready`
- `gh-ci`
- the post-PR-merge procedure

### 2. Capture Context

Capture the invocation worktree before any merge or cleanup:

```bash
git rev-parse --show-toplevel
```

Do not require a PR to exist yet. The starting flow is `pr-to-ready`'s: it may commit intended work, push the branch, and create the PR when missing.

### 3. Find Your Pipeline Position

Inspect enough git/GitHub state to choose exactly one position:

- If the current worktree/branch is not yet a ready PR, run `pr-to-ready` from this context and follow it faithfully.
- If there is an open, ready PR, run `gh-ci`; when it is green for the current head SHA, merge it remotely.
- If the PR is already merged, follow the post-PR-merge procedure (the repo's `.claude/procedures/post-pr-merge.md` when it exists, else `~/.claude/procedures/post-pr-merge.md`) from the original invocation worktree context.
- If the PR is closed but not merged, or the position is ambiguous, stop and report the blocker.

### 4. Merge On Green

Before merging, re-read the current PR head and merge state:

```bash
gh pr view <number> --json number,url,isDraft,headRefName,headRefOid,baseRefName,mergeStateStatus,mergeable,state
```

Run `gh-ci` for the PR. Merge only when:

- The PR state is `OPEN`.
- The PR is not draft.
- `gh-ci` reports green for the current `headRefOid`, including any required PR-control E2E checks.
- `mergeStateStatus` is clean/mergeable enough for the repo's branch protection.
- The head SHA still matches the SHA that was checked.

Use a remote merge command that does not perform local branch cleanup:

```bash
gh pr merge <number> --squash --match-head-commit <headRefOid>
```

If GitHub refuses with `the base branch policy prohibits the merge`, diagnose
the policy blocker before taking any corrective action. Do not guess that the
branch is stale, and do not guess that it is conflicting:

1. Re-read PR merge/review state:

   ```bash
   gh pr view <number> --json mergeStateStatus,mergeable,reviewDecision,statusCheckRollup
   ```

2. Query unresolved review threads, including Greptile comments:

   ```bash
   gh api graphql -f owner=<owner> -f name=<repo> -F number=<number> -f query='
   query($owner:String!, $name:String!, $number:Int!) {
     repository(owner:$owner, name:$name) {
       pullRequest(number:$number) {
         reviewThreads(first:100) {
           nodes {
             id
             isResolved
             isOutdated
             path
             line
             comments(first:20) {
               nodes { author { login } body url }
             }
           }
         }
       }
     }
   }'
   ```

3. If unresolved actionable review feedback exists, return to the `pr-to-ready`
   feedback-handling step: implement the fix or document why it is not
   actionable. Reply to and resolve bot threads within the authorized workflow.
   Draft replies to human reviewers and obtain Jason's approval for the exact send
   before posting. Resolve addressed threads after verification, then push and
   re-run `gh-ci`.
4. If `mergeable` is `CONFLICTING`, switch to conflict resolution for the PR
   branch. If branch protection requires the branch to be up to date, sync the
   PR branch with the base only after unresolved conversations and required
   checks have been ruled out as the blocker.

Never use `gh pr merge --auto` or `gh pr merge --admin` as an automatic fallback.
Use `--auto` only when the repository allows auto-merge and the desired end
state may be queued. Use `--admin` only when the user explicitly asks to bypass
branch protection.

Important multi-worktree rule:

- Never use `gh pr merge --delete-branch` in a repo with linked worktrees.
- `--delete-branch` is not remote-only; it can try to switch the current worktree and delete a local branch.
- In a PR worktree, that can fail after the remote merge because Git cannot delete the checked-out branch or check out a base branch already used by another worktree.

Leave every branch deletion to the post-PR-merge procedure, which removes the PR worktree and deletes the branch locally and on the remote; do not bundle any of it into the merge command.

### 5. Verify Merge

After the merge command succeeds, verify the remote PR state:

```bash
gh pr view <number> --json state,mergedAt,mergeCommit,url,headRefName,baseRefName
```

Proceed only when `state` is `MERGED`.

### 6. Clean Up After The Merge

Follow the post-PR-merge procedure (the repo's `.claude/procedures/post-pr-merge.md` when it exists, else `~/.claude/procedures/post-pr-merge.md`) from the original invocation worktree context captured in step 2, exactly as written; do not inline its rules here.

## Stop Conditions

Stop and report clearly if:

- the PR cannot be resolved
- the PR is already closed but not merged
- Greptile has unresolved actionable feedback
- any required check is red
- required PR-control E2E checks fail
- the PR head SHA changes after checks were observed green
- the cleanup worktree holds work, not just noise, as the post-PR-merge procedure classifies it

## Output

Keep the closeout short:

- PR URL and branch.
- Greptile outcome.
- Remote check and PR-control E2E outcome.
- Merge commit.
- The post-PR-merge procedure's report: base sync, noise deleted, worktree removal, and local and remote branch deletion.
