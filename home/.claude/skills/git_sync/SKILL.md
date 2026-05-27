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

Sync the current feature branch with the repo's main development branch using a merge commit.

## Hard stop guard

Before `git fetch`, `git merge`, or `git push`, prove the sync target identity:

1. If a PR was mentioned, `gh pr view` must identify the PR `headRefName` and
   `baseRefName`.
2. The command workdir must be the worktree whose branch is exactly
   `refs/heads/<headRefName>`.
3. The current branch in that worktree must equal `<headRefName>`.

If any item fails, stop. Do not recover by merging from the current directory.

Dirty worktrees are not a hard stop. If the target worktree is dirty after the
identity guard passes, wind the work down into a reasonable checkpoint first:
inspect the changes, make semantic commits that preserve the work, and then
continue the sync from the now-clean worktree.

## Algorithm

### Step 1: Resolve the intended sync target

First identify the branch/PR that is supposed to be synced. Do this before
fetching or merging anything.

If the user mentioned a PR number or URL, resolve it directly:

```bash
gh pr view <pr-number-or-url> --json number,url,headRefName,baseRefName
```

The PR `headRefName` is the only valid sync branch. The PR `baseRefName` is the
main development branch to fetch and merge.

If the user did not mention a PR, resolve the PR for the current branch:

```bash
git branch --show-current
gh pr view --json number,url,headRefName,baseRefName 2>/dev/null
```

If there is no PR, treat the current branch as the intended sync branch only
after validating that it is not the repo's main/base worktree branch.

### Step 2: Locate and enter the correct worktree

List worktrees in machine-readable form:

```bash
git worktree list --porcelain
```

Find the worktree whose `branch` line is exactly:

```
branch refs/heads/<headRefName>
```

Run every subsequent command from that worktree path. If the current shell is in
a different worktree, change the command `workdir` to the matching path before
continuing. Do not keep operating from the wrong path.

Example output:

```text
worktree /Users/me/projects/Heartbeat
HEAD 2ae1bd4d6
branch refs/heads/develop

worktree /Users/me/projects/Heartbeat-feature-x
HEAD af836b5b8
branch refs/heads/feature/x
```

If the intended branch does not have a worktree, stop and report that clearly.
Do not use `git checkout`, `git switch`, or `git stash` to mutate another
worktree into the target branch unless the user explicitly asked for that.

For non-PR branches, the **main worktree** is usually the first entry in
`git worktree list`; its checked-out branch is the repo's development branch.
For PR branches, prefer the PR's `baseRefName` over inference.

**If no worktrees exist** (single working copy), fall back to detecting the default branch:

```bash
git remote show origin | grep 'HEAD branch'
```

### Step 3: Validate target identity

Before proceeding, confirm all of the following from the target worktree:

1. The current branch is the intended branch:

   ```bash
   git branch --show-current
   ```

   This must equal the PR `headRefName` when syncing a PR.

2. You are not in the repo's main/base worktree.

   Syncing `develop` into `develop`, or syncing the PR base branch into itself,
   means you are in the wrong worktree. Stop and locate the PR worktree instead.

This validation is mandatory. If it fails, do not fetch, merge, or push.

### Step 4: Checkpoint dirty work

Inspect the target worktree:

```bash
git status --porcelain
```

If the worktree is dirty, do not stop just to report that fact. A user asking
for `git sync` has given enough signal to make the branch syncable. Your job is
to wind down the current work toward a reasonable checkpoint, including work you
did not personally create.

Use this protocol:

1. Inventory the dirty work:

   ```bash
   git status --porcelain
   git diff --name-status
   git diff --stat
   ```

2. Read enough of the touched files and diffs to understand coherent change
   groups. Do not treat unfamiliar edits as untouchable merely because another
   agent or the user made them.

3. Preserve the work with semantic commits. Prefer multiple commits when the
   dirty tree clearly contains multiple concerns; use one checkpoint commit when
   the changes are tightly coupled or too interleaved to split safely.

   Examples:

   ```bash
   git add <feature-files>
   git commit -m "feat: update page editor target overlays"

   git add docker-compose.yml
   git commit -m "fix: keep prisma studio pnpm runtime dependencies available"
   ```

4. Include generated files when they are the expected result of the repo's hooks
   or generators. If a hook regenerated files while you were checkpointing, audit
   the new diff and commit it with the related source change when appropriate.

5. Never use `git stash` as the default dirty-tree escape hatch. Never discard,
   reset, or revert user/agent work to make the tree clean.

6. Ask the user before committing only when there is a concrete risk you cannot
   responsibly resolve yourself, such as suspected secrets, obviously unrelated
   personal files, generated garbage that should be deleted but you are not sure,
   or a diff so incoherent that any commit boundary would be misleading.

After committing, verify the worktree is clean:

```bash
git status --porcelain
```

Only proceed to fetch/merge once the target worktree is clean.

### Step 5: Fetch the main branch

```bash
git fetch origin <main-branch>
```

Where `<main-branch>` is the PR `baseRefName` when available, otherwise the
detected main development branch (e.g. `develop`).

### Step 6: Merge (never rebase)

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

### Step 7: Run checks

After a successful merge, follow the repo/user instructions for checks. If local
resource constraints forbid broad checks, do not run them. Prefer the narrowest
safe verification available, such as staged hooks from the commit flow,
`git diff --check`, or CI after push.

When checks are allowed, adapt to what's available:

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

### Step 8: Push (if PR exists)

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

- **Never sync from an unverified worktree.** If the user referenced a PR, the
  current branch must equal the PR `headRefName`. If not, locate the matching
  worktree and run the workflow there.
- **Never merge while sitting in the main/base worktree.** This is the exact
  footgun the preflight exists to prevent.
- **Dirty target worktrees must be checkpointed, not bounced back by default.**
  Once the target identity is proven, inspect and semantically commit current
  work until the tree is clean, then continue the sync.
- **NEVER rebase.** Always `git merge`. This is non-negotiable.
- **Do not use `git checkout`, `git switch`, or implicit `git stash` as a
  shortcut for worktree selection or dirty-tree cleanup.** Pick the correct
  worktree path, then checkpoint dirty work with commits.
- **NEVER target `master`** unless it's genuinely the main branch (detected from the main worktree). Most repos with both `master` and `develop` use `develop` for active development.
- **NEVER force-push.** Merge commits don't need it. If you find yourself needing `--force`, something went wrong — stop and reassess.
- **Always fetch before merging.** Merging a stale `origin/<branch>` ref defeats the purpose.

## Edge cases

- **Main worktree is detached HEAD**: Fall back to `git remote show origin | grep 'HEAD branch'` to detect the main branch.
- **Multiple remotes**: Default to `origin`. If ambiguous, ask the user.
- **Merge results in no changes**: This is fine — the branch was already up to date. Report it and skip checks/push.
- **CI is required before push**: If the project requires CI to pass, push anyway — CI runs on the remote after push. The local checks (typecheck, lint) are a fast pre-flight, not a substitute for CI.
