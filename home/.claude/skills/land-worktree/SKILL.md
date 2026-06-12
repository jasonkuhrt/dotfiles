---
name: land-worktree
description: Prepare the current git worktree and branch for landing by resolving task context, creating a task branch from a detached base worktree when needed, committing intended dirty work when needed, and pushing the branch upstream. Use before land-pr when the worktree may be detached, unnamed, dirty, missing an upstream, or otherwise not ready for PR creation.
---

# Land Worktree

## Contract

This skill prepares the current git worktree to be a real pushed task branch. It does not create, edit, ready, review, check, or merge a PR.

Target end state: the current worktree is on a named branch, intended dirty work is committed, and the branch has been pushed upstream or any blocker is explicitly reported.

Type role: prefix segment. `land-pr` composes this skill before GitHub PR work. `land-complete` reaches this segment only by composing `land-pr`.

## Workflow

### 1. Resolve Task Context

Before branch naming or commit messages, resolve the current task context.

If the user provides a PR URL/number, issue ID, branch name, title, or other explicit target in the same message as this skill invocation, use that explicit target.

If the skill invocation is bare, such as "prepare the worktree", use the current chat context as the primary source of truth:

- Prefer the most recent issue, subissue, PR, or branch that the user and agent explicitly agreed represents the current scope.
- Prefer a later narrowed subissue over an older parent issue when the chat says the subissue exists so the branch can honestly match the work.
- Treat parent issues mentioned for background as related context, not as the branch's primary issue, when a narrower child issue has been selected.
- Use branch names and commit subjects only as fallbacks after checking the chat context.
- If chat context, branch name, and commit history disagree, do not silently pick the branch or commit heuristic. Use the chat context when it is unambiguous; ask the user when it is not.

When a Linear issue is resolved from chat context:

- Use that issue identifier/title for detached-worktree branch naming when a new branch is needed.
- Include parent issues only as related context.

### 2. Inspect Worktree

Use local git plus GitHub CLI:

```bash
gh auth status
git status --short
git branch --show-current
git status -sb
```

If `git branch --show-current` is empty, handle detached `HEAD` before continuing:

1. Inspect the detached state:

   ```bash
   git rev-parse HEAD
   git branch --contains HEAD
   git worktree list --porcelain
   ```

2. Resolve the detached-head base dynamically instead of using hardcoded trunk names:

   - Prefer an explicit base from the task or PR context when present.
   - Otherwise prefer the repository's remote default branch:

     ```bash
     git symbolic-ref --quiet --short refs/remotes/origin/HEAD
     ```

   - If the remote default branch is unavailable, use the remote branch that the detached `HEAD` is clearly based on. Check containing remote branches with:

     ```bash
     git for-each-ref --format='%(refname:short)' --contains HEAD refs/remotes/origin
     ```

   - If multiple plausible bases remain and the task context does not disambiguate them, ask instead of guessing.

3. If detached `HEAD` is already equal to the resolved base, continue. If detached `HEAD` is an ancestor of the resolved base and the worktree is clean, fast-forward the detached worktree to the resolved base before creating the task branch:

   ```bash
   git merge-base --is-ancestor HEAD <base-ref>
   git merge --ff-only <base-ref>
   ```

   If the worktree is dirty, do not fast-forward underneath dirty changes. Attach the task branch at the current detached `HEAD`, preserve the dirty work, and report that the branch started from an older base.

4. Infer the branch name from the resolved task context when possible. For a Linear issue, prefer `<lowercase-issue-id>-<short-title-slug>`, for example `hea-4554-page-editor-target-overlays`. If no Linear issue is available, use `<short-title-slug>` with no agent prefix. If the task does not provide enough naming signal, ask for a branch name.

5. Before creating the branch, check for collisions:

   ```bash
   git show-ref --verify --quiet refs/heads/<branch>
   git ls-remote --exit-code --heads origin <branch>
   ```

   If the branch already exists, resolve that branch or its worktree instead of creating a duplicate.

6. Attach the detached worktree to the new branch without using `git checkout` or `git switch`:

   ```bash
   git branch <branch> HEAD
   git symbolic-ref HEAD refs/heads/<branch>
   git status -sb
   ```

   This preserves any dirty work in the detached worktree while giving `gh pr view`, `git push -u origin HEAD`, and `gh pr create` a real branch to operate on.

7. If detached `HEAD` is not at or behind the resolved base and no matching branch or PR can be confidently resolved, stop and report the ambiguity instead of inventing a branch.

### 3. Commit Intended Dirty Work

If there are dirty changes that are part of the current land request, commit them before creating or updating a PR:

```bash
git diff --stat
git diff
git add <relevant-files>
git commit -m "<concrete message>"
```

Do not leave intended work uncommitted just because no PR exists yet. Do not silently commit ambiguous or unrelated user changes; if the dirty state contains changes that cannot be confidently tied to the land request, ask before staging those files.

### 4. Push Branch

If the branch has an upstream, inspect unpushed commits:

```bash
git log --oneline @{u}..HEAD
```

If the branch has no upstream or has unpushed commits, push it:

```bash
git push -u origin HEAD
```

## Output

Keep the closeout short:

- Branch name and worktree path.
- Whether a detached worktree was attached to a branch.
- Whether the detached worktree was fast-forwarded to its resolved base first.
- Whether dirty work was committed.
- Whether the branch was pushed and whether an upstream exists.
- Any ambiguity or blocker that prevents PR creation from safely continuing.
