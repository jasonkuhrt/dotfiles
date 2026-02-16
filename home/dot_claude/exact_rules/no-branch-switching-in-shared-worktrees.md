# No Branch Switching in Shared Worktrees

**NEVER use `git checkout <branch>`, `git switch`, or `git stash` in a worktree where other agents may be running.** These operations change the entire working tree, destroying in-progress work for all sessions.

A PreToolUse hook (`git-worktree-guard.sh`) enforces this at runtime, but avoid even attempting these operations.

## What's Blocked

- `git checkout develop` — switches branch, rewrites all files
- `git switch main` — same as checkout
- `git stash` / `git stash push` / `git stash pop` — saves/restores working tree state

## What's Allowed

- `git checkout <branch> -- <file>` — extracts a single file, doesn't switch branches
- `git commit`, `git push`, `git pull` — normal ops on current branch
- `git merge`, `git rebase` — modify current branch history, don't switch

## Alternatives

When you need files from another branch:

```bash
# Extract specific files without switching
git show develop:path/to/file > /tmp/file-from-develop

# Or use git checkout with -- (file mode, not branch mode)
git checkout develop -- .github/workflows/pulse.yml
```

When you need to work on a different branch:

```bash
# Use a worktree — isolated directory, no interference
git worktree add /tmp/wt-develop develop
# ... work in /tmp/wt-develop ...
git worktree remove /tmp/wt-develop
```
