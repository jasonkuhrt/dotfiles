---
name: meta-status
description: 'Use for meta-status or a current-session status request. Also use for the former meta-can-end question, including "can I end?", "done here?", "anything left?", and "can I archive this session?". Report done, in flight and pending, and assess from current evidence whether useful work remains. The question is advisory and authorizes no shutdown or deferral. Explicit archive requests belong to meta-archive-self.'
---

# Status

The user wants to know where this session's work stands, and whether any of it still needs this session. Answer from evidence checked this turn.

**The question asks for an assessment.** Invoking this skill says nothing about which answer the user wants. Apply the same evidence standard to either answer. State what remains and why it does or does not need this session. The user decides whether to end. Existing authorization governs any work that continues. Never shorten, wrap up or reframe work so that ending looks right, and never invent work to keep a session alive.

- **Bad.** "Stop: nothing this session owns is unfinished."
- **Good.** After verifying that the rerun has an independent owner through merge: "The work this session owns is complete, and the ARM rerun has a confirmed owner through merge."

## Gather the evidence

Reread the user's requests, accepted decisions and compaction summary. Refresh with tools this turn every state that could change the report; prior reports and ticket status alone are not enough. Mark any state you could not verify.

| Consider                   | Establish                                                                                                                                                                                                                                           |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requested work and WIP     | What remains to implement, verify, review, land or resolve? What did the user actually agree to defer?                                                                                                                                              |
| Useful next work           | For each finding, follow-up or abandoned candidate, what concrete consumer benefit can this session deliver next, and at what effort or cost? Inspect existing tickets as work candidates, not proof that the work belongs later.                   |
| Unresolved decisions       | What design, behavior, priority or tradeoff has not been discussed with the user? Bring checked facts and a recommendation rather than silently turning it into backlog.                                                                            |
| Delivery state             | Check owned PRs, current CI/reviews, Git diff, unpushed commits and stashes. Establish ownership and relevance before deciding whether a leftover needs delivery, preservation or retirement.                                                       |
| Running work and ownership | Check owned workers, linked sessions, shell tasks and scheduled wakeups. Establish whether useful work still depends on this chat, or has a verified independent owner and delivery path.                                                           |
| Context and resources      | What would closing lose: pending findings, a needed decision, coordination, useful runtime state or an unrecorded next action? Inspect the relevant worktrees and processes, and check the project's task and context records for useful information still missing. |

Use the host's current tools.

Do not call uncommitted or stashed work a blocker without reading its actual diff and history. Resolve routine ownership and preservation questions yourself within existing authorization; do not hand the user an unexplored "finish or discard" choice.

## What counts as this session's work

Report work this session owns and decisions it needs. If owned work depends on an external action or reply, list the owned item as pending and name what lets it resume. Treat work as independently deliverable only after verifying its owner, its delivery path, and who handles failures. Something only the user or another tool can do, with no owned work waiting on it, gets no item: this session does nothing about it either way.

- Bad: a first row "November rent | Still unpaid… You do this step in Codex", in a reply that says more is worth doing, from a session that can't sign in to the bank.
- Bad: a row "Have Claude hand sign-ins to Codex (`codex exec`) … needs a real Codex sign-in test, which is a decision for you", from a session whose rules bar it from starting another agent to sign in. The session would have to refuse an instruction to proceed.
- Good: the reply holds only the digest-skill fix and the rippling port, the work this session would do.

An upstream PR or issue waiting on its maintainers' feedback is generally no reason to keep the session open. Until a maintainer writes, nothing is owed. Their review reaches the user, who is the post's author, through the forge's notifications, and any later session can make the fixes from the PR's branch. What still counts is work owed now: a review comment not yet answered, a failing check, or a fix the session promised. Context needed to answer a future review goes on the PR or in the owning project's canonical context record, not into keeping the chat open. A pure upstream wait, where this session owes no action, gets no item.

- Bad: "Continue: alchemy-run/alchemy#2771 and #3082 still await maintainer review", for two green upstream PRs with no comment from a maintainer.
- Good: "Nothing more is worth doing here. The upstream PRs are green and owe nothing; a maintainer's review reaches you on GitHub, and any session can answer it from the PR's branch."

## Weigh each unresolved item

Decide by the actual next action, not by whether an issue exists:

| Disposition  | Explain                                                                                                                                                                                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Continue now | The consumer benefit, the smallest useful next action, and why this session is well placed to finish or land it now. Include unfinished asks, active WIP and valuable follow-ups that are feasible now. Continue already-authorized work.                                                                                |
| Discuss now  | The consequential choice or newly proposed work the user has not agreed to. Present the checked facts from the consumer's side, recommend an option, and ask the specific decision needed. Keep independent authorized work moving.                                                                                      |
| Defer        | Why continuing now is worse: an external prerequisite, missing decision-bearing evidence, a better delivery owner, or a concrete effort/cost tradeoff. Name what would make the work actionable and identify existing tracking. Propose a new task when preserving a trigger, owner or next action adds concrete value. |

A ticket is a record, not a decision to defer. "It is filed," "the PR merged," "the tree is clean," and "nothing is running" do not establish that continuing has no value. Conversely, an open issue or upstream wait does not by itself establish useful work to do now.

Do not file a follow-up and use that filing to justify saying nothing is left. Explain the proposed deferral and why it is preferable to continuing. The question itself grants no permission to create tasks. Existing permission to file tasks under the project's standards remains valid, but never substitutes for this assessment or authorizes deferring an unfinished user ask. When filing is not already authorized, propose it and wait for acceptance.

More is worth doing here when unfinished requested work or useful WIP still needs this session, or a concrete valuable fix can reasonably land now. Surface important unresolved decisions and assess whether discussing them now is worthwhile. An immature optional idea is not an automatic blocker; weigh its benefit and cost instead of requiring a decision about every possibility.

Nothing more is worth doing here when no useful obligation or decision still needs this session and the remaining items have defensible reasons to wait. Distinguish completed work, user-approved deferrals, and work verified to continue independently. Pending work is not thereby completed or deferred by the user. Name the strongest remaining candidate and why it is better deferred; if there is none, say so plainly.

For a material tradeoff the user must decide, present the options and your recommendation. Do not silently decide that newly discovered work is irrelevant or belongs in backlog. Do not start a new campaign merely because it is possible; distinguish recommending additional work from having authorization to do it.

Keep working on existing authorized asks while assessing them. Never stop, shorten or prematurely wrap up a worker to change the answer. If work can continue independently, verify its ownership and how its result will be delivered; do not infer a handoff from a running process or auto-merge setting. Include who handles review or failures without this chat.

## The question changes no lifecycle state

This invocation does not authorize ending the chat, archiving a workspace, stopping processes, deleting worktrees or branches, creating tasks, or declaring work deferred. No end steps follow any answer.

Continue delivery and cleanup already required by separate user instructions or the repository's normal landing protocol under that existing authority. Preserve other sessions' work, protected primary checkouts and upstream review worktrees. Any recommendation to retire a candidate must account for useful changes before removal.

If the user separately chooses to end or requests cleanup or archiving, follow the appropriate host/repository lifecycle skill. Never treat the question itself as that choice. Do not mark the session closed or record proposed deferrals as accepted decisions.

## Follow the project's task and handoff standards

Resolve the owning project from the work, then read its applicable `AGENTS.md` and task-management and handoff guidance before reading or updating its records. Use its chosen task manager and canonical locations for durable context; these may be different stores. Follow its templates, hierarchy, required fields, ownership and creation/update rules. Available tools do not determine which system a project uses.

Preserve useful findings, decisions, measurements, design context and relevant review conclusions through that existing workflow. Check relevant task and context records first, add only useful information that is missing, and link evidence already held at its owner. If nothing useful is missing, create no extra record to satisfy a checklist.

When a separately authorized closing or cleanup workflow requires final-state context, record it where the project's standards require. A separate session-handoff, closeout or final-state file is used only when those standards require one. A missing task or unavailable tracker is not a reason to invent a fallback store: apply the task-creation authorization rules above or report the access gap.

This governs end-of-session records, not necessary transient working files or actual repository source and artifacts.

## Reply

Open with one factual line: what remains, and whether it needs this session, with the reason. It states what the evidence shows, in the indicative. It is never an imperative ("Stop", "Continue", "End it") and never a verdict on what the user should do. If a material fact is unverified, the line says how that affects it. A request for status and a question about ending get the same reply.

Then the status, in these groups, in order. Omit empty groups. Give each item one line and a link or identifier.

1. **Done.** What finished and where to find the result.
2. **In flight.** What is underway, who or what is handling it, and what signals completion.
3. **Pending.** What is waiting to start or resume, who owns the next action, and what it depends on. Apply the global rules before listing anything as waiting on the user.

When several unresolved items bear on that line, add this table after the status:

| Work                        | Why continue now                                       | Why defer                                                               |
| --------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------- |
| Fix reproduced bug          | **Confirmed user failure; small, understood fix**      | —                                                                       |
| Resolve API choice          | **Your decision determines the behavior we implement** | Current API works; changing it isn't urgent                             |
| Benchmark unreleased driver | —                                                      | **No released version to measure; results now wouldn't guide adoption** |

These rows illustrate the format; use the session's actual remaining work. Keep each reason succinct and bold the reason supporting your view. A user discussion is work that can justify continuing now. Use an em dash where no concrete argument exists; do not invent one to fill the table. Omit routine housekeeping rows.

Propose new tasks with their purpose and deferral rationale; link existing ones without treating their existence as the rationale.

For work to do now, say what you are continuing, and continue it. For a user decision, ask it directly with the checked alternatives. For deferral, explain why, the trigger or owner for resuming, and whether tracking is proposed or already authorized.

Do not force a binary safety verdict, a table of every passed housekeeping check, or a shutdown report.

## Examples

- A PR merged and a newly reproduced bug has a small fix plus focused proof available: the status lists the fix as pending, the line says more is worth doing, and the session fixes and lands it, even if a ticket already exists. A clean checkout does not outweigh that useful next action.
- Requested work is complete, but a new public API proposal has never been discussed: surface the consumer-facing choice and recommend whether to decide it now. Do not silently file the design and call the session finished.
- An upstream correction is needed and no local action remains: say that the work waits for that release, explain what it enables, and propose a release-watch task if tracking is not already authorized. Do not keep the chat open merely to wait for maintainers.
