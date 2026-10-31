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
| Running work | a subagent, a side session still under this one, an Astra or codex run, a background shell task, monitor, cron or wakeup is still going | `ListAgents`, linked sessions (`list_sessions` with `linked: true`), `pgrep -fl codex`, task notifications not yet received, `CronList` |
| PRs | a PR this session owns is open in the user's own repo, and landing it needs this session (no auto-merge, or a failure Auto-fix would wake this session to fix) | `gh pr view <n> --json state,autoMergeRequest,mergeStateStatus`, `get_status` |
| Git | useful work still needs this session to deliver or preserve it, after the analysis below and reasonable attempts to resolve it | `git status --short`, `git log @{u}..`, `git stash list`, the actual diff and its callers in each |
| Worktrees | a worktree this session created or runs in is still on disk, or its local or remote branch still exists, after its PR merged | `git worktree list`, `git branch --list`, `git ls-remote --heads origin`, `gh pr view` of each branch |
| Processes | a dev server, engine or port this session started is still running | `lsof -nP -iTCP -sTCP:LISTEN`, the process list |
| Loose ends | a finding, bug or follow-up raised in the chat is neither done nor filed | reread the chat; search the tracker for it |
| Record | the session's notes or record file lacks the final state | read the file |

A side session the user moved to top level is theirs, not this session's. `get_session` shows it `detached: true`, and `list_sessions` with `linked: true` leaves it out. It never blocks the end, and nothing waits on its report. Jason, 2026-10-28: "that session is turned top level, its not under you, can't you see that? my can end skill should never block ending on sessions i made top level!"

- Bad: "Not yet: the remote-sandboxes session is still working", about a session Jason had detached, found through the unlinked `list_sessions` listing.
- Good: the linked listing comes back empty, so the Running work row passes.

An upstream PR, one to a project outside the user's own repos, is its maintainers' to merge on their schedule. It never blocks the end, and its worktree (under `~/repo-references/`) stays for the review rounds to come: no end step removes it or reports it as left to delete. Jason, 2026-10-28: "treat upstream prs different, they aren't expected to get merged and closing their wts is not expected either".

- Bad: "Not yet: CodeRabbit hasn't reviewed the fix I pushed to MapleTechLabs/maple#1943", then a Git row that kept its worktree "because #1943 hasn't merged".
- Good: the PRs row reads "MapleTechLabs/maple#1943, upstream: its maintainers merge it", and the end steps leave its worktree alone without listing it.

### Analyze Git leftovers before calling them blockers

Uncommitted, unpushed or stashed state is something to investigate, not an automatic blocker or a reason to ask Jason to choose "finish or discard". Inspect the actual diff, its ownership, whether it is still needed, and why the work was started or set aside. Compare it with the user's current instructions and what already landed.

Make reasonable efforts to settle the disposition yourself within existing authorization. Finish an outstanding user ask. For an agent-originated candidate left behind by a change of direction, weigh its current value against the effort to complete it; use the project's preservation and cleanup conventions to retain a useful exact patch or commit with its context, file a follow-up when appropriate, and retire the candidate without making Jason manage it. Verify preservation before removing local state. Do not start an expensive verification campaign merely because an abandoned candidate exists.

Ask only when a material decision remains that the checked evidence and existing authorization cannot settle. Explain that decision and the resolution attempts already made. This does not authorize discarding another person's work or filing an unfinished user ask as backlog.

Only unresolved items in the first four rows can block the end. Worktrees, processes, loose ends and the record are end steps: you do them on a yes.

## End steps

When no row blocks, do these, then report them:

1. **File loose ends** in the project's tracker, following its issue rules. Only findings and follow-ups nobody asked to have done now go here, never an undone ask.
2. **Stop processes** this session started that nothing else uses.
3. **Write the final state** into the session's record, if it has one.
4. **Clean worktrees and branches.** A yes that leaves the user a worktree or a branch to delete fails. For each worktree this session created or runs in whose PR merged, follow the protocol the repo's `post-pr-merge` skill gives the current developer. For a retired agent-originated candidate, verify its preservation and clean up its exact owned checkout and branch through the host's supported lifecycle. A worktree kept for unresolved work or an unmerged PR goes under the Git analysis above, not automatically to Jason for a decision. An upstream PR's worktree stays and goes unlisted (see the audit).

   In Codex, inspect `list_artifacts` for an owned managed worktree. Its `archive_worktree` operation saves a recoverable snapshot of local changes and unpushed commits, removes the checkout, and keeps the chat open. Preserve any needed material outside that operation's contract first, then verify the returned snapshot, original work identity and checkout removal before deleting the exact local branch. This archives the worktree, never the current chat.

   A host-protected primary checkout stays. Resolve and verify preservation of its session-owned work, leave it in an appropriate clean state, and report why it was retained; its mere existence is not unfinished cleanup or a new decision for Jason.

   Do the worktree you run in last. Without a supported operation that preserves the work and keeps the session reachable, remove it only once the session has left it. In Claude Desktop, call `mcp__ccd_directory__change_directory` alone, in a message of its own, and read its result before any removal. Claude Desktop refuses the move for a session in a worktree the app made ("can't be moved"). Such a worktree goes when the session is archived (`archive_session` cleans up its worktree), so the session never removes it, and it doesn't fail the yes: the report says it goes with the archive. Its local branch stays checked out there, so `post-pr-merge` can't delete it; the report names it, with the `git branch -D` that deletes it once the session is archived. These two are the only leftovers a yes may report.

   - Bad (2026-10-28, HEA-6611): `change_directory` and `git worktree remove` of the session's own worktree sent in one batch, for a worktree with no PR at all. The move was refused, the removal ran anyway, and the session's folder was gone until it was recreated with `git worktree add`.
   - Good: `change_directory` alone; on its refusal, the worktree stays and the report says archiving removes it.

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
| "There's an old unpushed candidate, so Jason must choose whether to finish or discard it." | Analyze its ownership, relevance and cost; attempt an authorized completion or verified preservation and cleanup before raising a real unresolved decision. |
| "Nothing is running as far as I remember." | Check with the tools this turn. Background tasks and side sessions outlive your memory of them. |
| "Auto-merge is on, so the PR is fine." | Only if nothing else needs this session: a failing check that Auto-fix would wake this session for still needs it. |
| "I'll ask whether to clean up the merged worktree." | A merged, clean worktree this session created is an end step: clean it. |
| "The worktree is merged, so the user can delete it whenever." | Then the session wasn't endable. Remove the worktree and its branches before saying yes. |
| "The worktree still has a `.env`; let me check it matches the main checkout's before I remove it." | Gitignored files aren't the end's concern. Remove the worktree; never raise them. |
| "The upstream PR is still open, so it's not yet." | An upstream PR is its maintainers' to merge. It never blocks, and its worktree stays. |
| "I'll manually remove the worktree this chat still runs in." | Use a supported managed-worktree archive that keeps the chat reachable, or wait for the relocation result before manual removal. A refused move means the worktree goes with the chat's later archive. |
