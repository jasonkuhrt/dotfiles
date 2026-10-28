---
name: meta-can-end
description: Use when the user asks whether they can end, close, leave or archive the session, or says they are about to ("can I end?", "ok to close?", "done here?", "I will close this session now"), or invokes meta-can-end. The question asks for a verdict; it never stops, cuts or defers work.
---

# Can end

The user wants to know whether closing the session now loses anything. Answer with a verdict backed by an audit you run this turn. On a yes, do the end steps and report them. On a not yet, name the blockers and keep working: the session isn't ending, so nothing in the reply reads as if it were.

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
| Git | a worktree this session touched has uncommitted, unpushed or stashed work of its own, beyond what the repo's `post-pr-merge` skill classifies as noise | `git status --short`, `git log @{u}..`, `git stash list` in each |
| Worktrees | a worktree this session created or runs in is still on disk, or its local or remote branch still exists, after its PR merged | `git worktree list`, `git branch --list`, `git ls-remote --heads origin`, `gh pr view` of each branch |
| Processes | a dev server, engine or port this session started is still running | `lsof -nP -iTCP -sTCP:LISTEN`, the process list |
| Loose ends | a finding, bug or follow-up raised in the chat is neither done nor filed | reread the chat; search the tracker for it |
| Record | the session's notes or record file lacks the final state | read the file |

Only the first four rows can block the end. Worktrees, processes, loose ends and the record are end steps: you do them on a yes.

## End steps

When no row blocks, do these, then report them:

1. **File loose ends** in the project's tracker, following its issue rules. Only findings and follow-ups nobody asked to have done now go here, never an undone ask.
2. **Stop processes** this session started that nothing else uses.
3. **Write the final state** into the session's record, if it has one.
4. **Clean worktrees and branches.** A yes that leaves the user a worktree or a branch to delete fails. For each worktree this session created or runs in whose PR merged, follow the protocol the repo's `post-pr-merge` skill gives the current developer. Do the worktree you run in last. A worktree it keeps, for work in it or an unmerged PR, goes under the Git row; a repo without the skill leaves its worktrees for the Git row too, with that reason.

When a row blocks, skip the end steps: they belong to the end, and this isn't it. Keep working on what is yours. The next meta-can-end, once nothing blocks, does them.

## The reply

The verdict decides the reply's shape. There are two, and nothing else is valid.

**Not yet:**

1. First sentence: "Not yet: <the blockers, in plain words>."
2. For each blocker, one or two lines: what closing now would lose, and what happens next (who acts, and the signal that ends it).

That is the whole reply. No audit table, no rows that passed, no end steps, no cleanup report: those describe an end, and the session isn't ending. Jason, 2026-10-26: "then u can't end, don't report all this shit as if u ended or could end".

- Bad: "Not yet: HEA-6610 isn't finished.", then an eight-row audit table and a list of the end steps done.
- Good: "Not yet: HEA-6610 isn't built or merged. Its worker stopped when the app restarted; I resumed it, and when it reports I review, push, open the PR and merge on green."

**Yes:**

1. First sentence: "Yes, you can close it."
2. **The audit** as a table: row, state, how it was checked.
3. **What the end steps did:** issues filed, processes stopped, worktrees removed, branches deleted (local and remote). List issues as a table with at least the id (linked) and the title. A bare run of keys ("Filed: HEA-1, HEA-2") fails.

Closing the session is the user's act. Never archive, stop or close this session yourself.

## Common mistakes

| Thought | Reality |
| --- | --- |
| "They're leaving, so I'll stop the workers at a clean point." | The question doesn't stop anything. Workers finish their whole brief. |
| "It's almost done; I'll call it yes." | Anything still running makes the verdict "not yet". |
| "Not yet, but I'll show the audit and the cleanup so they see where things stand." | A not-yet reply is the blockers and what happens next. The audit table and the end steps belong to a yes. |
| "Not yet, but I'll clean the merged worktrees now while I'm here." | End steps wait for the end. Keep working on the blockers. |
| "I'll file the unfinished ask as a backlog issue so they can go." | Only the user defers an ask. Filing is for findings and follow-ups. |
| "Nothing is running as far as I remember." | Check with the tools this turn. Background tasks and side sessions outlive your memory of them. |
| "Auto-merge is on, so the PR is fine." | Only if nothing else needs this session: a failing check that Auto-fix would wake this session for still needs it. |
| "I'll ask whether to clean up the merged worktree." | A merged, clean worktree this session created is an end step: clean it. |
| "The worktree is merged, so the user can delete it whenever." | Then the session wasn't endable. Remove the worktree and its branches before saying yes. |
| "The worktree still has a `.env`; let me check it matches the main checkout's before I remove it." | Gitignored files aren't the end's concern. Remove the worktree; never raise them. |
