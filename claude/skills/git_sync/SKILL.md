---
name: git:sync
description: Use when syncing local git state with remote, updating worktrees, or cleaning up stale branches. Triggers on "sync branches", "update all worktrees", "clean up old branches", "pull and merge trunk", "sync tags".
---

# Git Sync

Sync local with remote: pull trunk, merge into feature branches, push, sync tags, cleanup merged PRs.

**Requires** `git`. Optional: `gh` (PR status; degrades gracefully).

## Glossary

- **Trunk** — main development branch (e.g., `develop`, `main`)
- **Main Worktree** — the original clone directory
- **Sync Branch** — branch needing trunk changes merged in
- **Complex Branch** — sync branch with conflicts requiring human judgment
- **Tag Conflict** — tag pointing to different commits locally vs remotely
- **Linked Branch** — branch checked out in its own worktree directory
- **Needs Rescue** — branch with local commits not pushed to remote

**Visual flow:** `reference/flow.d2` — render with `d2 flow.d2 flow.svg` or `d2 flow.d2 flow.txt` for ASCII.

Read this speclist flow using the `speclist` skill (Reading operation).

---

## Operations

| Mode         | Entry     | Behavior                             |
| ------------ | --------- | ------------------------------------ |
| Plan only    | _Plan_    | Creates plan, stops for review       |
| Full sync    | _Plan_    | Creates plan, continues to _Execute_ |
| Execute only | _Execute_ | Runs existing plan                   |

### Plan

1. CHECK TRUNK ◆ Ensure Trunk is clean before proceeding.
   - If Trunk has unpushed commits or is dirty:
     1. Show using _trunk-dirty_
     2. **HALT**
2. GATHER STATE ◆ Collect repository metadata including worktrees, branches, and tag conflicts.
   Run script `gather [trunk]` → `RepositoryState`
3. RESOLVE TAG CONFLICTS ◆ Let user decide how to handle each Tag Conflict.
   1. For each in _RepositoryState.tagConflicts_:
      1. Show using _tag-conflict_
      2. Ask single select "Tag resolution":

         | select      | description                | then                |
         | ----------- | -------------------------- | ------------------- |
         | Keep local  | push local tag to remote   | record push in plan |
         | Keep remote | delete local, fetch remote | record pull in plan |
         | Skip        | leave conflict unresolved  | next conflict       |

4. ASSIGN BRANCH ACTIONS ◆ Determine what to do with each branch based on its state.
   Apply priority order:

   | Condition                  | Action    | Set                       |
   | -------------------------- | --------- | ------------------------- |
   | midRebase or midMerge      | _skip_    | _skipReason_              |
   | prState = MERGED or CLOSED | _cleanup_ | _prStatus_, _needsRescue_ |
   | Otherwise                  | _sync_    | _complexity_              |

5. ANALYZE DIFF COMPLEXITY ◆ Determine merge difficulty for branches marked for sync.
   1. For each Sync Branch:
      1. Run `git merge-tree $(git merge-base <trunk> <branch>) <trunk> <branch>`
      2. Classify:

         | class   | heuristic                                                          |
         | ------- | ------------------------------------------------------------------ |
         | none    | no conflicts in merge output                                       |
         | simple  | few files with conflicts                                           |
         | complex | many files with conflicts, non trivial semantics on how to resolve |

6. RESOLVE COMPLEX BRANCHES ◆ Let user decide how to handle branches with complex merge conflicts.
   1. For each Complex Branch:
      1. Show conflicts to user
      2. Ask single select "Merge strategy":

         | select | description                 | then                                       |
         | ------ | --------------------------- | ------------------------------------------ |
         | Solve  | work through resolution now | record solution, set _complexity_ = simple |
         | Defer  | handle during execute       | keep _complexity_ = complex                |
         | Skip   | don't sync this branch      | set _action_ = skip                        |

7. SHOW PREVIEW ◆ Display planned actions for user confirmation.
   Show using _plan-preview_
8. WRITE PLAN ◆ Persist the plan for execution.
   1. Save to `.claude/git-sync-plan.json` in Main Worktree
   2. If full sync: Continue _Execute_
   3. **END**

### Execute

1. READ PLAN ◆ Load the plan if not already in memory.
   - If continued from _Plan_: skip (plan already in memory)
   - Else: Read from `<Main Worktree>/.claude/git-sync-plan.json`
2. SETUP ◆ Prepare the Main Worktree and sync Trunk with remote.
   1. `cd <Plan.mainWorktree>`
   2. If not on Trunk:
      1. Goto _preserve_dirty_state_
      2. `git checkout <trunk>`
   3. `git pull --rebase origin <trunk>`
3. PROCESS TAG TASKS ◆ Execute tag sync decisions from the plan.
   For each in _Plan.tagTasks_: when _tagTask.action_

   | is   | then                                             |
   | ---- | ------------------------------------------------ |
   | push | `git push origin <tag> --force`                  |
   | pull | `git tag -d <tag> && git fetch origin tag <tag>` |
   | skip | no-op                                            |

4. PROCESS BRANCH TASKS ◆ Execute branch sync/cleanup decisions from the plan.
   For each in _Plan.branchTasks_: when _branchTask.action_

   | is      | then                        |
   | ------- | --------------------------- |
   | skip    | no-op, record result        |
   | sync    | Goto _execute_sync_task_    |
   | cleanup | Goto _execute_cleanup_task_ |

5. FINALIZE ◆ Push tags and restore original working state.
   1. `git push --tags`
   2. If _Plan.startingDir_ exists:
      1. `cd <Plan.startingDir>`
      2. Goto _restore_dirty_state_
   3. Else:
      1. `cd <Plan.mainWorktree>`
      2. If _Plan.originalBranch_ exists:
         1. `git checkout <Plan.originalBranch>`
         2. Goto _restore_dirty_state_
      3. Else: `git checkout <trunk>`
6. SHOW RESULTS ◆ Display summary of what was synced, skipped, or cleaned up.
   1. Show using _results_
   2. **END**

---

## Procedures

- **preserve_dirty_state**
  1. CHECK STATUS ◆ Detect uncommitted changes.
     `git status --porcelain`
  2. STASH CHANGES ◆ Temporarily commit if dirty.
     - If clean: no-op
     - Else (dirty):
       1. `git add -A && git commit -m 'WIP'`
       2. Record _hadTempCommit_ = true
- **restore_dirty_state**
  1. UNSTASH CHANGES ◆ Undo temporary commit if one was made.
     If _hadTempCommit_: `git reset HEAD~1`
- **move_to_branch**
  1. NAVIGATE TO BRANCH ◆ Switch to the branch's worktree or check it out.
     - If Linked Branch: `cd <worktree>`
     - Else: `cd <Main Worktree> && git checkout <branch>`
- **execute_sync_task**
  1. MOVE TO BRANCH ◆ Navigate to the branch's location.
     Goto _move_to_branch_
  2. PRESERVE STATE ◆ Stash any uncommitted work.
     Goto _preserve_dirty_state_
  3. MERGE TRUNK ◆ Incorporate Trunk changes based on complexity.
     - When _BranchTask.complexity_ is _none_
       1. `git merge <trunk>`
     - When _BranchTask.complexity_ is _simple_
       1. Apply pre-recorded solution or auto-resolve
       2. `git merge <trunk>`
     - When _BranchTask.complexity_ is _complex_
       1. Create merge plan collaboratively with user
       2. Ask single select "Merge approval":

          | select  | description         | then                 |
          | ------- | ------------------- | -------------------- |
          | Approve | apply the plan      | apply plan, continue |
          | Discuss | iterate on approach | revise plan, re-ask  |
          | Abort   | skip this branch    | **END**: aborted     |

  4. RESTORE STATE ◆ Unstash any previously stashed work.
     Goto _restore_dirty_state_
  5. PUSH CHANGES ◆ Sync with remote if tracking branch exists.
     If has remote: `git push`
  6. RECORD RESULT ◆ Mark task as complete.
     **END**: synced

- **execute_cleanup_task**
  1. RESCUE UNPUSHED WORK ◆ Create backup branch if there are unpushed commits.
     - If _BranchTask.needsRescue_:
       1. `git branch rescue/<branch> <branch>`
       2. Show warning using _rescue-warning_
  2. DELETE BRANCH ◆ Remove worktree if Linked Branch, then delete.
     - When _BranchTask.type_ is _linked_: `git worktree remove <path> && git branch -D <branch>`
     - When _BranchTask.type_ is _main_: `git branch -D <branch>`
  3. RECORD RESULT ◆ Mark task as complete.
     **END**: deleted
