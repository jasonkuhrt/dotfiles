# No Branch Switching in Shared Worktrees

**NEVER use `git checkout <branch>`, `git switch`, or `git stash` in a worktree where other agents may be running.** A PreToolUse hook (`git-worktree-guard.sh`) enforces this.

Blocked: `git checkout develop`, `git switch main`, `git stash`/`pop`.
Allowed: `git checkout <branch> -- <file>` (file extraction), `git commit`, `git push`, `git pull`, `git merge`, `git rebase`.

For files from another branch: `git show develop:path/to/file > /tmp/file-from-develop`.
For working on another branch: `git worktree add /tmp/wt-develop develop`.

## Type Investigation

Never use git state changes to investigate type errors. Check CI first (`gh pr checks`). If CI passed, local errors are ours. Analyze error messages and read relevant source files directly.
