---
name: can-end
description: Use when the user asks whether they can end, close, leave or archive the session, or says they are about to ("can I end?", "ok to close?", "done here?", "I will close this session now"), or invokes can-end. The question asks for a verdict; it never stops, cuts or defers work.
---

# Can end

The user wants to know whether closing the session now loses anything. Answer with a verdict backed by an audit you run this turn, then do the end steps the verdict allows.

## What the question never means

The question is never an instruction to stop. Everything the user asked for, accepted, or that the chat scheduled keeps its full scope:

- A running worker, subagent, side session, sidekick or background task runs to the end of its brief. Never stop, shorten, revert or "wrap up early" anything to make the verdict yes.
- An ask the user made that is not done is a blocker. It never becomes a backlog issue unless the user says to defer it.
- "Not yet" never ends the work: whatever is yours to do next, you keep doing, in this turn.

## The audit

Check every row with a tool this turn. Memory of what happened earlier in the chat is not a check.

| Row | Blocks the end when | Check with |
| --- | --- | --- |
| Asks | an ask from the user is neither done nor deferred by the user | reread the user's messages since the session began (and the compaction summary, if there is one) |
| Running work | a subagent, side session, Astra or codex run, background shell task, monitor, cron or wakeup is still going | `ListAgents`, linked sessions (`list_sessions` with `linked: true`), `pgrep -fl codex`, task notifications not yet received, `CronList` |
| PRs | a PR this session owns is open, and landing it needs this session (no auto-merge, or a failure Auto-fix would wake this session to fix) | `gh pr view <n> --json state,autoMergeRequest,mergeStateStatus`, `get_status` |
| Git | a worktree this session touched has uncommitted, unpushed or stashed work of its own, beyond noise (see End steps) | `git status --short`, `git log @{u}..`, `git stash list` in each |
| Worktrees | a worktree this session created or runs in is still on disk, or its local or remote branch still exists, after its PR merged | `git worktree list`, `git branch --list`, `git ls-remote --heads origin`, `gh pr view` of each branch |
| Processes | a dev server, engine or port this session started is still running | `lsof -nP -iTCP -sTCP:LISTEN`, the process list |
| Loose ends | a finding, bug or follow-up raised in the chat is neither done nor filed | reread the chat; search the tracker for it |
| Record | the session's notes or record file lacks the final state | read the file |

Only the first four rows can block the end. Worktrees, processes, loose ends and the record are end steps: you do them.

## End steps

When no row blocks, do these, then report:

1. **File loose ends** in the project's tracker, following its issue rules. Only findings and follow-ups nobody asked to have done now go here, never an undone ask.
2. **Stop processes** this session started that nothing else uses.
3. **Write the final state** into the session's record, if it has one.
4. **Clean worktrees and branches.** A yes that leaves the user a worktree or a branch to delete fails. For each worktree this session created, and the one it runs in, whose PR merged and whose tree holds nothing unpreserved:
   - remove the worktree and delete its local branch, through the repo's cleanup skill (`land-merged`) when there is one; a squash-merged branch needs `git branch -D`;
   - check the remote for the branch itself (`git ls-remote --heads origin <branch>`), never a repo's delete-on-merge setting, and delete it when it is there (`git push origin --delete <branch>`);
   - do the worktree this session runs in last, from the primary checkout (`git -C <primary> worktree remove <path>`, then the branch), as the turn's last command: the session's working directory goes with it.

   Gitignored paths are not dirt: a local `.env`, caches, build output, installed dependencies, editor and tool state. Don't inspect, compare, preserve or report them, and don't let them keep a worktree on disk; remove it with `--force` once its tracked and non-ignored paths are clean. The session's own record (`.session` or its equivalent) is the Record row's, written before removal, not this step's.

   A dirty worktree is not yet a blocker. Classify each dirty path first (tracked and non-ignored paths only):
   - **Noise:** your own debug or scratch files, artifacts a generator or build re-emits, a test's leftover temp files. Delete them, say which, and clean the worktree up.
   - **Work:** an edit nobody committed, or a file you can't account for. The worktree stays on disk, and you report it under the Git row with those paths.

   An unmerged worktree stays on disk: report it under the Git row with its PR.

When a row blocks, do every end step that doesn't depend on the blocker, and keep working on what is yours.

## The reply

1. **Verdict, first sentence:** "Yes, you can close it." or "Not yet: <the blockers, in plain words>."
2. **Not yet:** what closing now would lose, for each blocker, and what happens next (who acts, and the signal that ends it).
3. **The audit** as a table: row, state, how it was checked.
4. **What the end steps did:** issues filed, processes stopped, worktrees removed, branches deleted (local and remote). List issues as a table with at least the id (linked) and the title. A bare run of keys ("Filed: HEA-1, HEA-2") fails.

Closing the session is the user's act. Never archive, stop or close this session yourself.

## Common mistakes

| Thought | Reality |
| --- | --- |
| "They're leaving, so I'll stop the workers at a clean point." | The question doesn't stop anything. Workers finish their whole brief. |
| "It's almost done; I'll call it yes." | Anything still running makes the verdict "not yet". |
| "I'll file the unfinished ask as a backlog issue so they can go." | Only the user defers an ask. Filing is for findings and follow-ups. |
| "Nothing is running as far as I remember." | Check with the tools this turn. Background tasks and side sessions outlive your memory of them. |
| "Auto-merge is on, so the PR is fine." | Only if nothing else needs this session: a failing check that Auto-fix would wake this session for still needs it. |
| "I'll ask whether to clean up the merged worktree." | A merged, clean worktree this session created is an end step: clean it. |
| "The worktree is merged, so the user can delete it whenever." | Then the session wasn't endable. Remove the worktree and its branches before saying yes. |
| "I can't remove the worktree I'm running in." | Remove it last, from the primary checkout. |
| "The worktree still has a `.env`; let me check it matches the main checkout's before I remove it." | Gitignored files aren't the end's concern. Remove the worktree; never raise them. |
