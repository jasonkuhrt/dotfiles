---
name: meta-can-end
description: Recommend whether it makes sense to continue the current session when the user asks "can I end?", "done here?", whether to close or archive, or invokes meta-can-end. Weigh unfinished work, useful next actions, unresolved decisions and justified deferral. The question is advisory and authorizes no shutdown or deferral.
---

# Can end

The user is asking whether continuing this session is worthwhile. Give a recommendation about the work and decisions still available, backed by current evidence. Safe storage and a clean checkout alone do not answer that question.

Do not optimize the audit to produce "yes." Consider useful work discovered during the chat, including things never explicitly discussed with the user. Equally, do not invent more work just to keep a session alive.

## Assess what remains

Reread the user's requests, accepted decisions and compaction summary. Refresh the evidence that could change the recommendation with tools this turn; prior reports and ticket status alone are not enough.

| Consider                   | Establish                                                                                                                                                                                                                                           |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requested work and WIP     | What remains to implement, verify, review, land or resolve? What did the user actually agree to defer?                                                                                                                                              |
| Useful next work           | For each finding, follow-up or abandoned candidate, what concrete consumer benefit can this session deliver next, and at what effort or cost? Inspect existing tickets as work candidates, not proof that the work belongs later.                   |
| Unresolved decisions       | What design, behavior, priority or tradeoff has not been discussed with the user? Bring checked facts and a recommendation rather than silently turning it into backlog.                                                                            |
| Delivery state             | Check owned PRs, current CI/reviews, Git diff, unpushed commits and stashes. Establish ownership and relevance before deciding whether a leftover needs delivery, preservation or retirement.                                                       |
| Running work and ownership | Check owned workers, linked sessions, shell tasks and scheduled wakeups. Establish whether useful work still depends on this chat, or has a verified independent owner and delivery path.                                                           |
| Context and resources      | What would closing lose: pending findings, a needed decision, coordination, useful runtime state or an unrecorded next action? Inspect the relevant worktrees and processes, and check the relevant Linear issues for useful context still missing. |

Use the host's current tools. A detached top-level session belongs to the user and does not depend on this one.

Every row in the reply is work this session would do, or a decision this session needs from the user. Something only the user or another tool can do (a payment made in another agent, a sign-in this session can't make) or a reply someone else owes gets no row and no mention. It is neither a reason to continue nor something to defer, because this session does nothing about it either way.

- Bad: a first row "November rent | Still unpaid… You do this step in Codex", in a reply that recommends continuing, from a session that can't sign in to the bank. Jason, 2026-11-07: "how can u propose keeping this session open when u literally won't fucking do this … u literally have no right putting this row here".
- Bad: a row "Have Claude hand sign-ins to Codex (`codex exec`) … needs a real Codex sign-in test, which is a decision for you", from a session whose rules bar it from starting another agent to sign in. Jason said "fine do it", and the session had to refuse.
- Good: the table holds only the digest-skill fix and the rippling port, the work this session would do.

An upstream PR or issue waiting on its maintainers' feedback is generally no reason to keep the session open. Until a maintainer writes, nothing is owed. Their review reaches the user, who is the post's author, through the forge's notifications, and any later session can make the fixes from the PR's branch. What still counts is work owed now: a review comment not yet answered, a failing check, or a fix the session promised. Context needed to answer a future review goes on the PR or the relevant Linear issue, not into keeping the chat open. A wait with nothing owed gets no row in the reply's table.

- Bad: "Continue: alchemy-run/alchemy#2771 and #3082 still await maintainer review", for two green upstream PRs with no comment from a maintainer.
- Good: "Stop. The upstream PRs are green and owe nothing; a maintainer's review reaches you on GitHub, and any session can answer it from the PR's branch."

Do not call uncommitted or stashed work a blocker without reading its actual diff and history. Resolve routine ownership and preservation questions yourself within existing authorization; do not hand the user an unexplored "finish or discard" choice.

## Evaluate each unresolved item

Recommend a disposition based on the actual next action, not whether an issue exists:

| Recommendation | Explain                                                                                                                                                                                                                                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Continue now   | The consumer benefit, the smallest useful next action, and why this session is well placed to finish or land it now. Include unfinished asks, active WIP and valuable follow-ups that are feasible now. Continue already-authorized work.                                                                                |
| Discuss now    | The consequential choice or newly proposed work the user has not agreed to. Present the checked facts from the consumer's side, recommend an option, and ask the specific decision needed. Keep independent authorized work moving.                                                                                      |
| Defer          | Why continuing now is worse: an external prerequisite, missing decision-bearing evidence, a better delivery owner, or a concrete effort/cost tradeoff. Name what would make the work actionable and identify existing tracking. Propose a new issue when preserving a trigger, owner or next action adds concrete value. |

A ticket is a record, not a decision to defer. "It is filed," "the PR merged," "the tree is clean," and "nothing is running" do not establish that continuing has no value. Conversely, an open issue or upstream wait does not by itself establish useful work to do now.

Do not file a follow-up and use that filing to justify stopping. Explain the proposed deferral and why it is preferable to continuing. The question itself grants no permission to create issues. Existing explicit permission to file issues remains valid, but never substitutes for this assessment or authorizes deferring an unfinished user ask. When filing is not already authorized, propose it and wait for acceptance.

## Form the recommendation

Recommend continuing when unfinished requested work or useful WIP still needs this session, or a concrete valuable fix can reasonably land now. Surface important unresolved decisions and assess whether discussing them now is worthwhile. An immature optional idea is not an automatic blocker; weigh its benefit and cost instead of requiring a decision about every possibility.

Recommend stopping when no useful obligation or decision still needs this session and the remaining items have defensible reasons to wait. Distinguish completed work, user-approved deferrals, and work verified to continue independently. Pending work is not thereby completed or deferred by the user. Explain the strongest remaining candidate and why it is better deferred; if there is none, say so plainly.

For a material tradeoff the user must decide, present the options and your recommendation. Do not silently decide that newly discovered work is irrelevant or belongs in backlog. Do not start a new campaign merely because it is possible; distinguish recommending additional work from having authorization to do it.

Keep working on existing authorized asks while assessing them. Never stop, shorten or prematurely wrap up a worker to make the recommendation "stop." If work can continue independently, verify its ownership and how its result will be delivered; do not infer a handoff from a running process or auto-merge setting. Include who handles review or failures without this chat.

## The question changes no lifecycle state

This invocation does not authorize ending the chat, archiving a workspace, stopping processes, deleting worktrees or branches, filing issues, or declaring work deferred. There are no automatic end steps after a favorable recommendation.

Continue delivery and cleanup already required by separate user instructions or the repository's normal landing protocol under that existing authority. Preserve other sessions' work, protected primary checkouts and upstream review worktrees. Any recommendation to retire a candidate must account for useful changes before removal.

If the user separately chooses to end or requests cleanup or archiving, follow the appropriate host/repository lifecycle skill. Never treat the recommendation question itself as that choice. Do not mark the session closed or record proposed deferrals as accepted decisions.

## Preserve useful context in Linear

Never create local session-handoff, closeout, final-state or similar end-of-session record files. Preserve useful findings, decisions, measurements, design context and relevant review conclusions in the relevant Linear issues, following the team's existing template and issue conventions.

Check those issues and update only useful context that is missing. If nothing useful is missing, create no extra record to satisfy a checklist. When a separately authorized closing or cleanup workflow requires recording final state, update the relevant Linear issues instead of writing a local record. If no relevant issue exists, apply the issue-creation authorization rules above; do not create a local handoff as a fallback.

This applies to end-of-session records, not necessary transient working files or actual repository source and artifacts.

## Reply

Lead with a plain recommendation to continue, stop, or decide a named question first, and give the reason.

Include only findings that bear on that recommendation. When several remain, use these separate timing columns:

| Work                        | Why continue now                                       | Why defer                                                               |
| --------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------- |
| Fix reproduced bug          | **Confirmed user failure; small, understood fix**      | —                                                                       |
| Resolve API choice          | **Your decision determines the behavior we implement** | Current API works; changing it isn't urgent                             |
| Benchmark unreleased driver | —                                                      | **No released version to measure; results now wouldn't guide adoption** |

These rows illustrate the format; use the session's actual remaining work. Keep each reason succinct and bold the reason supporting your recommendation. A user discussion is work that can justify continuing now. Use an em dash where no concrete argument exists; do not invent one to fill the table. Omit routine housekeeping rows and a separate action-only recommendation column. If nothing worthwhile remains, skip the table and give a short recommendation with the reason.

Propose issues with their purpose and deferral rationale; link existing ones without treating their existence as the rationale.

For work to do now, say what you are continuing. For a user decision, ask it directly with the checked alternatives. For deferral, explain why, the trigger or owner for resuming, and whether tracking is proposed or already authorized.

Do not force a binary safety verdict, a table of every passed housekeeping check, or a shutdown report. A recommendation to stop is advice; the user still decides.

## Examples

- A PR merged and a newly reproduced bug has a small fix plus focused proof available: recommend continuing to fix and land it, even if a ticket already exists. A clean checkout does not outweigh that useful next action.
- Requested work is complete, but a new public API proposal has never been discussed: surface the consumer-facing choice and recommend whether to decide it now. Do not silently file the design and declare the session finished.
- An upstream correction is needed and no local action remains: recommend waiting for that release, explain what it enables, and propose a release-watch issue if tracking is not already authorized. Do not keep the chat open merely to wait for maintainers.
