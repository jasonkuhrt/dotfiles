# Git Worktree

Create isolated git worktrees with environment auto-detection. Handles path resolution, branch creation, dependency install, common tool file copying, and Claude Code pre-trust.

## Create Worktree

Callers provide `BRANCH_NAME` and optionally `BASE_REF`.

### Step 1: Detect Base Ref

If caller provided `BASE_REF`, skip to Step 2.

```bash
PATHS=$(bash scripts/worktree-resolve-paths "$BRANCH_NAME")
```

If `isWorktree` is `true`, check for uncommitted changes (`git status --porcelain`) and ask:

| Selection             | Action                                             |
| --------------------- | -------------------------------------------------- |
| Branch from here      | `BASE_REF` = current branch                        |
| Branch + commit first | Run commit flow, `BASE_REF` = current branch       |
| Branch from trunk     | `cd` to `mainRepo`, `git pull`, `BASE_REF` = trunk |

If not in a worktree: `BASE_REF` = trunk (develop/main).

### Step 2: Create + Install

```bash
PATHS=$(bash scripts/worktree-resolve-paths "$BRANCH_NAME")
MAIN_REPO=$(echo "$PATHS" | jq -r '.mainRepo')
WORKTREE_DIR=$(echo "$PATHS" | jq -r '.worktreeDir')

cd "$MAIN_REPO"
git worktree add "$WORKTREE_DIR" -b "$BRANCH_NAME" "$BASE_REF"
```

Auto-detect and run project setup:

| Marker           | Command           |
| ---------------- | ----------------- |
| `package.json`   | `npm install`     |
| `Cargo.toml`     | `cargo build`     |
| `go.mod`         | `go mod download` |
| `pyproject.toml` | `poetry install`  |

### Step 3: Copy Environment

```bash
bash scripts/worktree-copy-env "$CURRENT_DIR" "$WORKTREE_DIR"
```

Auto-detects and copies common tool files. Run `scripts/worktree-copy-env --help` for the list. For project-specific files beyond what the script handles, copy them manually after the script runs.

### Step 4: Pre-Trust in Claude Code

```bash
bash scripts/worktree-pre-trust "$WORKTREE_DIR"
```

### Step 5: Report

Output the worktree path and suggest the user open it in their editor. If direnv is present, note that a **fresh Claude Code session is required** (direnv env vars are inherited at shell startup, not hot-reloaded into running sessions).
