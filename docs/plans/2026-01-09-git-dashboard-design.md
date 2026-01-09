# Git Dashboard Design

A context-aware git status replacement that shows relevant information based on working directory state.

## Modes

### Dirty Mode

When there are uncommitted changes, show file changes first (unbounded content), then fixed summary at bottom.

```
Staged (2):
  M src/auth.ts
  + src/login.ts

Unstaged (2):
  M src/config.ts

3 modified, 1 new
main ──●──┐
          └──●──⋮──●──●
          │           └─ af3d2e1 "Add login" 2h
          └─────────────── feature/auth-flow ↑2 ↓1
```

**Components (top to bottom):**
1. File list grouped by status with counts in headers
2. Summary one-liner (total counts)
3. Railway graph with integrated info

### Clean Mode

When working directory is clean, show navigation/orientation info.

```
Recent: fix/login (2h) | main (1d)

main ──●──┐
          └──●──⋮──●──●
          │           └─ af3d2e1 "Add login" 2h
          └─────────────── feature/auth-flow ↑2
```

**Components (top to bottom):**
1. Recent active branches (by commit activity)
2. Railway graph with integrated info

### On Trunk

When on main/master, skip railway graph entirely. Show status + last commit + recent branches only.

## Railway Graph

Visual representation of branch relationship to trunk.

### Structure

```
main ──●──┐
          └──●──●──●
          │        └─ <hash> "<message>" <time>
          └────────── <branch-name> ↑<ahead> ↓<behind>
```

**Elements:**
- Main line on top with branch point
- Feature commits below
- HEAD commit details on pointer line below last commit
- Branch name with upstream status on bottom line, connecting back to branch point

### Truncation

When history is long, truncate middle commits to fit terminal width.

```
main ──●──┐
          └──●──⋮──●──●
          │           └─ af3d2e1 "Add login" 2h
          └─────────────── feature/auth-flow ↑2
```

**Rules:**
- Keep branch point visible (context)
- Keep last 3-5 commits visible (recent work)
- Use `⋮` to indicate truncated commits
- Reserve space for branch name + upstream on right

### Divergence

When trunk has moved since branching:

```
main ──●──┬──●──●
          └──●──⋮──●──●
          │           └─ af3d2e1 "Add login" 2h
          └─────────────── feature/auth-flow ↑2 ↓3
```

## File Status Display

### Grouping

Files grouped by git status:
- `Staged (N):` - files in index
- `Unstaged (N):` - modified tracked files
- `Untracked (N):` - new files (optional, may omit if noisy)

### Status Indicators

- `M` - modified
- `+` - added/new
- `-` - deleted
- `R` - renamed
- `C` - copied

### Example

```
Staged (2):
  M src/auth.ts
  + src/login.ts

Unstaged (3):
  M src/config.ts
  M tests/auth.test.ts
  - old-file.ts
```

## Upstream Status

Show ahead/behind counts relative to upstream tracking branch.

- `↑2` - 2 commits ahead
- `↓1` - 1 commit behind
- `↑2 ↓1` - diverged

## Recent Branches

Activity-based list of recently committed-to branches.

```
Recent: fix/login (2h) | main (1d) | feature/api (3d)
```

Shows branch name and time since last commit, sorted by activity.

## Implementation Notes

- Replace the `git` function in `fish/config.fish`
- Use fish scripting for git commands and formatting
- Query terminal width with `$COLUMNS`
- Use `git log`, `git status --porcelain`, `git branch` for data
- Consider `git merge-base` for finding branch point
