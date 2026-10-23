# Post-PR-merge cleanup

The procedure for after a PR merged: its worktree is removed, and its branch is deleted locally and on the remote. Skills that need it (`pr-to-landed`, `can-end`) follow this file rather than restating it.

A repo can replace it with its own `.claude/procedures/post-pr-merge.md`; a skill looks there first and falls back to `~/.claude/procedures/post-pr-merge.md`.

## Steps

1. Capture the invocation worktree path first with `git rev-parse --show-toplevel`.
2. Resolve the PR number, or the current branch's PR, with `gh pr view`.
3. Confirm the PR state is `MERGED`, and note `headRefName`, `headRefOid` and `baseRefName`. A PR that isn't merged gets no cleanup: stop and report it.
4. Select the PR worktree:
   - Exclude the repository's primary worktree before matching candidates.
   - Prefer a worktree whose branch exactly matches `refs/heads/<headRefName>`.
   - If none exists, use only a non-primary invocation worktree whose recorded PR identity, original branch and preserved source head prove it backed this PR. The invocation path alone does not establish that identity.
   - Never pick a worktree only because its branch is `baseRefName`.
5. Sync a worktree on the base branch, when one exists other than the target:
   - Find it with `git worktree list --porcelain`: its branch exactly matches `refs/heads/<baseRefName>`.
   - Don't pre-gate on a clean tree; let git's fast-forward check be the gate: `git fetch origin <baseRefName>`, then `git pull --ff-only origin <baseRefName>`.
   - A fast-forward, a no-op included, means the base is synced. `--ff-only` either fast-forwards or refuses, so it is safe with untracked or unrelated dirty files.
   - Report the sync skipped only when the pull fails, with git's reason. A failed sync never blocks the removal.
6. Classify the worktree's dirt (see Dirt below). Delete the noise; work stops the cleanup of this worktree.
7. Remove the worktree:
   - Record its path, branch and head. Compare the head with `headRefOid`: later local commits are work to preserve, not covered by the merge.
   - Preserve later local commits and `.session` contents under the preservation contract (`~/.codex/skills/git-cleanup/references/preservation.md`), applied to this target only. Record and verify where they went.
   - Recheck identity, head and preserved contents right before removal; changed evidence needs fresh preservation.
   - Run `git worktree remove --force <path>` from another worktree, once the tracked and non-ignored paths are clean.
   - The worktree you run in goes last: do step 9 first, then remove it and delete its local branch from the primary checkout in one final command (`git -C <primary> worktree remove --force <path> && git -C <primary> branch -D <headRefName>`). Your working directory goes with it.
8. Delete the local branch named exactly `headRefName`:
   - Verify no remaining worktree uses it, and recheck its head and preservation.
   - Run `git branch -D <headRefName>`. A squash-merged branch is not graph-merged into the base, so `-d` refuses it.
9. Delete the remote branch named exactly `headRefName`:
   - Check the remote itself: `git ls-remote --heads origin <headRefName>`. Never infer from a repository's delete-on-merge setting that it is gone.
   - When it is at `headRefOid`, run `git push origin --delete <headRefName>`.
   - When it is at another commit, someone pushed after the merge: leave it, and report its head as work to preserve.
10. Run no project checks unless the user asks.

## Dirt

Only tracked and non-ignored paths count. Gitignored paths are not dirt: a local `.env`, caches, build output, installed dependencies, editor and tool state. Don't inspect, compare, preserve or report them, and don't let them keep a worktree on disk. The one exception is `.session`, preserved in step 7.

Classify each dirty path:

- **Noise:** your own debug or scratch files, artifacts a generator or build re-emits, a test's leftover temp files. Delete them, name them in the report, and go on.
- **Work:** an edit nobody committed, or a file you can't account for. The worktree stays on disk; report it with those paths.

## Never

- Remove the primary worktree, or a worktree picked by a similar name.
- Delete a branch whose name doesn't exactly match `headRefName`.
- Force-delete a local branch before the PR is confirmed `MERGED`, no worktree uses it, and its newer commits are preserved.
- Use `gh pr merge --delete-branch` to make this state: merge remotely first, then follow this procedure, which deletes the remote branch too.

## Report

- Base sync: done, or skipped with git's reason.
- Noise deleted, by path.
- Worktree removed, or kept with the work that kept it.
- Local and remote branch deleted, or kept with the reason.
