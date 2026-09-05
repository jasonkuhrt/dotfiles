---
name: git-sync
description: >-
  Synchronize a GitHub pull-request branch or stacked pull-request chain with its
  trunk while preserving concurrent agent work. Use for sync, sync with develop,
  update branch, merge develop, PR conflicts, branch behind, stacked PR sync, or
  /git-sync. Stacks use direction-aware isolated synchronization; standalone PRs
  use a merge commit and ordinary push.
---

# Git sync

Keep the invoking agent moving while preserving every other agent's live
worktree.

## Core contract

Resolve the target PR and GitHub stack membership before any mutation.

- A stacked PR's `baseRefName` is its parent layer, not necessarily the trunk.
- Never run the standalone merge procedure for a PR that remote or local metadata
  identifies as stacked.
- Never switch, detach, commit, stash, reset, rebase, or otherwise mutate another
  agent's worktree.
- Perform stack history rewriting in a separate temporary clone. Use explicit
  remote leases so concurrent pushes cause a safe retry, never lost work.
- Synchronize the largest safe prefix of the stack. Active descendants remain on
  unchanged refs and keep working; they are cascaded later.

Only the native `gh stack` rebase machinery may calculate a stack cascade. Do not
reimplement commit selection with hand-written Git rebases.

## Resolve the target

If the user named a PR:

```bash
gh pr view <pr-number-or-url> --json number,url,headRefName,baseRefName
```

Otherwise resolve the current branch and its PR:

```bash
git branch --show-current
gh pr view --json number,url,headRefName,baseRefName
```

When operating on the current checkout, confirm it owns the PR head exactly:

```bash
git worktree list --porcelain
git branch --show-current
```

Do not repurpose another worktree when the target branch is absent. Stack
synchronization can still use the PR URL from an isolated clone; live checkout
reconciliation is performed only when this task owns the target worktree.

## Detect and describe the stack

Inspect authoritative remote membership:

```bash
gh api repos/{owner}/{repo}/pulls/<pr-number> --jq '.stack // empty'
```

When `.stack` is non-empty, fetch the ordered chain and true trunk:

```bash
gh api repos/{owner}/{repo}/stacks/<stack-number> \
  --jq '{trunk: .base.ref, branches: [.pull_requests[] | {number, branch: .head.ref, base: .base.ref}]}'
```

Also inspect local metadata when available:

```bash
gh stack view --json
```

Use the union of remote and local branch names for diagnostics, but use the
remote stack order for a stack that already exists on GitHub. An API failure is
unknown state, not proof that the PR is standalone.

Fresh-read each layer's PR state. Merged layers remain structural history but do
not count as active owners. Treat merge-queued layers as protected: never rewrite
or push them while queued.

Confirm the required extension is available before choosing a stack workflow:

```bash
gh stack --version
```

## Find the safe synchronization frontier

Stack order runs from the bottom branch nearest the trunk to the top branch.
For a requested branch, its **downstack prefix** is trunk → ancestors → requested
branch; its **upstack suffix** is every descendant above it.

Inventory local worktrees read-only:

```bash
git worktree list --porcelain
git -C <worktree-path> status --porcelain
git -C <worktree-path> rev-list --left-right --count \
  origin/<branch>...<branch>
```

Use available agent/task coordination state to determine which worktrees have
running owners. Do not infer that a clean worktree is idle when a task registry
can answer directly. Without reliable ownership state, treat dirty, locally
ahead, or recently changing stack worktrees as active; treat uncertainty as
active rather than modifying them.

Choose the frontier:

1. The invoking task owns its current target branch and may synchronize it.
2. Any active descendant above the target is protected. Set the frontier to the
   target and leave the entire active suffix untouched.
3. If another active branch lies inside the target's downstack prefix, rewriting
   through the target would rewrite that agent's branch. Move the frontier to the
   branch immediately below the first such active layer. Make that partial
   progress, but report that the requested branch remains pending.
4. If no stack branch is active or uncertain, the frontier is the stack top and
   a full native sync is safe.

If the first protected layer is the bottom branch, there is no safe PR prefix to
rewrite. Report the exact active owner and wait; do not manufacture a trunk-only
operation or disturb the owner.

Changing an ancestor makes protected descendants temporarily need rebase, but
their branch refs do not move. Their agents can continue committing and pushing
normally. Do not merge a protected descendant until its later cascade completes.

## Publish work owned by the invoking task

When this task owns the target checkout, checkpoint only that worktree before
including its branch in the synchronization frontier:

```bash
git status --porcelain
git diff --name-status
git diff --stat
```

Understand dirty changes and preserve them in coherent semantic commits. Include
expected generated output with its source change. Never harvest or commit another
worktree's changes.

Publish target commits with an ordinary fast-forward push before creating the
isolated snapshot:

```bash
git push
```

If the push is not fast-forward, refresh the remote state and recompute the
frontier. Never force-push from a live worktree. Record the published target SHA;
it is the boundary used to reconcile this checkout after the isolated rewrite.

## Run the isolated stack transaction

Create a fresh temporary clone from the GitHub remote, never a linked worktree or
local clone that shares refs with live checkouts:

```bash
stack_sync_dir=$(mktemp -d "${TMPDIR:-/tmp}/git-sync-stack.XXXXXX")
git clone --filter=blob:none --no-local <github-remote-url> "$stack_sync_dir"
```

Run every following command in that clone. Import the remote stack using the
target PR URL and verify its order:

```bash
gh stack checkout <pr-url>
gh stack view --json
```

Capture the current remote SHA of every branch at or below the chosen frontier.
Those exact SHAs are the push leases.

### Full stack free

When the frontier is the top and no layer is active or uncertain:

```bash
gh stack sync
```

This is the native full transaction: fetch, reconcile, cascade-rebase, atomic
lease-checked push, and PR-stack synchronization.

Do not trust the summary line alone. The installed extension can continue into
PR-state synchronization after reporting a push warning. Compare every intended
remote ref with the isolated result before calling the full sync successful.

### Active suffix or earlier frontier

When any higher layer must remain untouched, cascade only from trunk through the
frontier:

```bash
gh stack rebase <frontier-branch> --downstack
```

Resolve any conflict entirely inside the temporary clone:

```bash
git add <resolved-files>
gh stack rebase --continue
```

Push only rewritten, open, non-queued prefix branches in one atomic operation.
Supply one explicit lease and one fully qualified refspec per pushed branch:

```bash
git push --atomic origin \
  --force-with-lease=refs/heads/<branch-1>:<captured-old-sha-1> \
  --force-with-lease=refs/heads/<branch-2>:<captured-old-sha-2> \
  refs/heads/<branch-1>:refs/heads/<branch-1> \
  refs/heads/<branch-2>:refs/heads/<branch-2>
```

Do not use `gh stack push`; it pushes every active stack branch and would cross
the protected frontier. Branch names and counts in the example are illustrative;
construct the argument list from the actual prefix.

If a lease fails, another actor published new work. Discard the temporary clone,
refresh stack and task state, recompute the frontier, and retry from a fresh
snapshot. After three consecutive lease collisions, report the contended branch
and leave every remote ref unchanged rather than overriding an active agent.

Never prune branches during synchronization unless the user explicitly asked.
Remove only the exact temporary clone created for this attempt after success or
abort; never clean any live worktree.

## Reconcile the invoking checkout

If the requested target was included in the pushed prefix and this task owns its
worktree, update that checkout without touching siblings.

First fetch and confirm the worktree has no new uncommitted changes. Then replay
only commits created after the recorded published boundary onto the rewritten
remote target:

```bash
git fetch origin <target-branch>
git rebase --onto origin/<target-branch> <published-target-sha> <target-branch>
```

With no newer local commits this simply moves the checkout to the synchronized
tip. With newer commits it preserves and replays them. If new uncommitted work
appeared during the isolated operation, checkpoint it before reconciliation.
Finish any replayed local commits with an ordinary push.

Do not update sibling worktrees. Their owners reconcile their branches when they
reach their own synchronization point.

## Verify and report

Fresh-read the remote stack and each pushed PR. Confirm:

- Every pushed prefix ref equals the isolated transaction result.
- The stack's PR order and base branch names are unchanged.
- No protected suffix ref appeared in the transaction's push refspec. A suffix
  ref that advanced concurrently is useful agent progress: preserve it, record
  its new SHA, and include it in the next frontier calculation.
- The invoking checkout is clean and based on its updated remote branch when it
  was included.

Report the synchronized frontier and the exact protected suffix still needing a
later cascade. A partial prefix sync is successful progress; do not describe the
whole stack as synchronized until the suffix is also current.

## Standalone workflow

For a PR with no local or remote stack membership, merge its verified
`baseRefName` in the exact target worktree:

```bash
git fetch origin <base-branch>
git merge origin/<base-branch> --no-edit
```

Resolve conflicts once in the merge, then continue:

```bash
git add <resolved-files>
git merge --continue
```

Standalone sync never rebases or force-pushes. Follow repository and user
instructions for checks, then use an ordinary `git push` when the branch has a
PR. Respect explicit limits on local checks and report any not run.
