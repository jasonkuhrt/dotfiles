---
name: git_sync
description: >-
  Sync the current branch with the main development branch using merge commits.
  Use this skill whenever the user says "sync", "sync with develop", "update branch",
  "merge develop", "resolve conflicts", "PR has conflicts", or /git:sync. Also trigger
  when the user mentions a PR needing updates, a branch being behind, or merge conflicts
  on a pull request. This skill handles worktree detection, fetching, merging, checks,
  and pushing — the full PR sync workflow. Never rebase; always merge.
---

# git:sync — Sync Branch with Main Development Branch

Sync the current feature branch with the repo's main development branch using a merge commit. Works across repos by detecting the main branch from the worktree layout.

## Algorithm

### Step 1: Detect worktree context

```bash
git worktree list
```

Parse the output. The **main worktree** is the first entry (the one without a worktree path suffix). Its checked-out branch is the main development branch for this repo.

Example output:

```
/Users/me/projects/Heartbeat                    2ae1bd4d6 [develop]
/Users/me/projects/Heartbeat-feature-x          af836b5b8 [feature/x]
```

Here, `develop` is the main branch (first entry's branch). The current worktree is wherever you're running from.

**If no worktrees exist** (single working copy), fall back to detecting the default branch:

```bash
git remote show origin | grep 'HEAD branch'
```

### Step 2: Validate state

Before proceeding, confirm:

1. You are NOT in the main worktree (syncing the main branch into itself is a no-op)
2. The working tree is clean (`git status --porcelain` is empty). If dirty, stop and tell the user to commit or stash first.

### Step 3: Fetch the main branch

```bash
git fetch origin <main-branch>
```

Where `<main-branch>` is what you detected in step 1 (e.g., `develop`).

### Step 4: Merge (never rebase)

```bash
git merge origin/<main-branch> --no-edit
```

Why merge, not rebase:

- Merge resolves all conflicts in ONE pass. Rebase replays every commit individually, cascading conflicts across each one.
- Merge allows a normal `git push`. Rebase requires `--force-with-lease` which risks overwriting collaborator commits.
- Merge preserves the original commit history on the feature branch.

If conflicts arise, resolve them. After resolution:

```bash
git add <resolved-files>
git merge --continue
```

### Step 5: Run checks

After a successful merge, run the project's check suite. Adapt to what's available:

**Check for npm scripts** (most Node projects):

```bash
# Read package.json to find available check scripts
# Common patterns:
npm run check:types      # TypeScript type checking
npm run check:lint       # Lint checking
```

**Lint changed files only** — don't lint the entire codebase. Find what files the merge changed:

```bash
git diff --name-only HEAD~1 --diff-filter=ACMR -- '*.ts' '*.tsx'
```

If the project has a scoped lint command, use it on just those files. If checks fail, fix the issues before pushing.

### Step 6: Push (if PR exists)

Check if a PR exists for the current branch:

```bash
gh pr view --json number,url 2>/dev/null
```

If a PR exists, push:

```bash
git push
```

No `--force` flags needed — merge commits push cleanly. If no PR exists, tell the user the merge is complete locally but there's no PR to push to.

## Important constraints

- **NEVER rebase.** Always `git merge`. This is non-negotiable.
- **NEVER target `master`** unless it's genuinely the main branch (detected from the main worktree). Most repos with both `master` and `develop` use `develop` for active development.
- **NEVER force-push.** Merge commits don't need it. If you find yourself needing `--force`, something went wrong — stop and reassess.
- **Always fetch before merging.** Merging a stale `origin/<branch>` ref defeats the purpose.

## Edge cases

- **Main worktree is detached HEAD**: Fall back to `git remote show origin | grep 'HEAD branch'` to detect the main branch.
- **Multiple remotes**: Default to `origin`. If ambiguous, ask the user.
- **Merge results in no changes**: This is fine — the branch was already up to date. Report it and skip checks/push.
- **CI is required before push**: If the project requires CI to pass, push anyway — CI runs on the remote after push. The local checks (typecheck, lint) are a fast pre-flight, not a substitute for CI.
