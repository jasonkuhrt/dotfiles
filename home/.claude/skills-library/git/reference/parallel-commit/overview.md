# Parallel Commit

Use `git commit -- <paths>` which defaults to `--only` mode:

```bash
git commit -m "message" -- file1.ts file2.ts dir/
```

This commits **only the specified paths** from the working tree, ignoring whatever else is staged. The entire stage-commit-update sequence runs under `index.lock`, making it atomic.

For new (untracked) files, `git add` first:

```bash
git add newfile.ts && git commit -m "message" -- newfile.ts existing.ts
```

## Lock Contention

Two agents can't hold `index.lock` simultaneously. If one is mid-commit, the other gets:

```
fatal: Unable to create '.git/index.lock': File exists.
```

Commits take milliseconds -- collisions are rare. Retry handles it:

```bash
for i in 1 2 3; do
  git add <new-files> 2>/dev/null
  git commit -m "..." -- <files> && break
  sleep 1
done
```

## Prerequisites

- Agents must operate on **non-overlapping files**
- Each agent must track which files it changed
- Shared working tree -- agents must not modify each other's files

## Advanced: `GIT_INDEX_FILE`

For use cases needing fully parallel staging (not just commits), git supports per-process index files:

```bash
GIT_INDEX_FILE=/tmp/my.index git add <files>
GIT_INDEX_FILE=/tmp/my.index git diff --cached --name-only
```

This avoids lock contention on `git add` entirely. Useful for building index state in parallel before sequential commits. See [Git Environment Variables](https://git-scm.com/book/en/v2/Git-Internals-Environment-Variables).
