---
name: land-merged
description: Use after a GitHub pull request has already been merged to refresh the local develop worktree, remove the local git worktree that backed the merged PR, and delete the merged local branch. Trigger on requests like "land merged", "cleanup merged PR worktree", "sync develop and delete the PR worktree", or "PR is merged, clean up".
---

# Land Merged

Use this only after the PR is already merged.

Target end state: the base worktree is refreshed when safe, the merged PR worktree is removed, and the exact merged local branch is deleted.

Type role: post-merge segment. A human can run it after manually merging a PR; `land-complete` runs it automatically after its own remote merge succeeds.

## Workflow

1. Capture the invocation worktree path first with `git rev-parse --show-toplevel`.
2. Resolve the PR number or current branch PR with `gh pr view`.
3. Confirm the PR state is `MERGED` and note `headRefName`, `headRefOid`, and `baseRefName`.
4. Select the PR worktree to remove:
   - Exclude the repository's primary worktree before matching candidates.
   - Prefer a worktree whose branch exactly matches `refs/heads/<headRefName>`.
   - If none exists, use only a non-primary invocation worktree whose recorded PR identity, original branch, and preserved source head prove it backed this PR. The invocation path alone does not establish that identity.
   - Never pick a worktree only because its branch is `baseRefName`.
5. Sync a non-target worktree for the base branch when one is available:
   - Find it with `git worktree list --porcelain`.
   - Use a worktree whose branch exactly matches `refs/heads/<baseRefName>` and whose path is not the PR worktree selected for removal.
   - Do not pre-gate on a strictly clean worktree. Untracked files and unrelated uncommitted changes do not block a fast-forward, so attempt the sync and let git's own fast-forward check be the gate:
     - `git fetch origin <baseRefName>`
     - `git pull --ff-only origin <baseRefName>`
   - A successful fast-forward — including a no-op `Already up to date` — means the base is synced. `--ff-only` cannot produce a conflict: it either fast-forwards cleanly or refuses, so attempting it is always safe even when the worktree has untracked or unrelated dirty files.
   - Report base sync skipped only when the pull itself fails — the fast-forward would overwrite a local untracked/modified file, or the base is not a fast-forward — and surface git's reason. Never let a skipped or failed sync block removing the confirmed PR worktree.
6. Delete only the selected PR worktree.
   - Record its exact path, branch, and current head. Compare that head with the merged PR's `headRefOid`; later local commits are work to preserve, not evidence covered by the merge.
   - Before removal, preserve any later local commits, ignored `.session` contents, and useful or unknown ignored material under the [Git Cleanup preservation contract](../../../.codex/skills/git-cleanup/references/preservation.md). Apply that contract only to this target; do not invoke a full-repository cleanup sweep. Record and verify the recovery destinations.
   - Ensure tracked and nonignored untracked work is clean, and recheck the target's identity, head, and preserved contents immediately before removal. Changed evidence requires refreshed preservation.
   - Run `git worktree remove <path>` from another worktree.
   - Complete an interrupted removal with `git worktree remove --force <path>` only when its record proves this exact target and all recoverable contents were preserved before removal. Verify those original recovery destinations; do not checkpoint partial-removal deletions as new source work. Mass deletions alone are insufficient evidence.
7. Delete only the local branch whose name exactly matches the merged PR `headRefName`.
   - Verify no remaining worktree is using that branch.
   - Recheck its expected head and verified preservation before deletion; preserve any newer commits first.
   - If the branch exists, run `git branch -D <headRefName>`.
   - Use `-D` because squash-merged PR branches are not graph-merged into the base branch even though the PR is already merged.
8. Do not run project checks unless the user explicitly asks.

## Safety Notes

- If the PR is not merged, stop and report that cleanup was not run.
- If the PR worktree is dirty, stop and report the dirty files unless completing the exact interrupted removal from a verified preservation record.
- Never remove unrelated worktrees with similar names; use exact branch match or a recorded, preserved PR-worktree identity.
- Never select or remove the repository's primary worktree.
- Never delete unrelated local branches with similar names; match `headRefName` exactly.
- Never force-delete a local branch unless the PR state is confirmed `MERGED`, no worktree is using the branch, the branch name exactly matches `headRefName`, and its current commits and useful ignored worktree contents have verified recovery evidence.
- Do not use `gh pr merge --delete-branch` to create the state this skill cleans up. Merge remotely first, delete any remote PR branch separately, then run this cleanup.
