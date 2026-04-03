---
name: session:thread:land
description: >-
  Use when the user says "/session:thread:land", "are you done", "is this
  actually done", "can we close this", "is there anything still open", "are
  there loose ends", or otherwise wants a real completion audit for the
  thread-scoped task and, when appropriate, a real landing pass through
  commit, push, and CI.
---

# Session Thread Land

Use this skill when the user is not asking for a status recap in general.
Use it when they want an honest completion verdict.

This skill is thread-scoped by default.
It answers whether the work requested in this conversation is done, not whether
the entire branch, issue, or session mission is done, unless the user explicitly
asks for branch-level or issue-level closure.

This is not a vibe check.
This is not "the tests I remember are green."
This is a closure audit.
It is also a missed-value sweep.
It is also a landing workflow.

## Purpose

Answer one question truthfully:

`Is the work actually done, with no meaningful loose ends hidden by the thread's complexity?`

And if the user's intent is to actually land the work, carry it through the real
finish line:

- commit your work
- push it
- let CI run
- deal with commit-time or CI-time rejections instead of pretending the thread ended cleanly

The point is to catch unresolved threads that often survive long chats:

- side quests that quietly became requirements
- promised follow-ups that were never done
- review findings acknowledged but not addressed
- checks that were discussed but never rerun
- session/task state left stale
- "done for this pass" wording that hides remaining work
- code changes that landed without updating docs, tests, or reports that were part of the agreed scope
- useful insights or leverage the agent silently skipped because it judged them off-topic, too small, too big, deferrable, or not worth interrupting over

## Source Of Truth

Do not answer from the latest assistant message alone.
Do not answer from the latest cluster of events alone.

Scope precedence is strict:

1. the user's scope in this thread
2. explicit scope corrections from the user
3. the broader branch, issue, or `.session` mission

If the thread scope is narrower than the active `.session` mission, the thread
scope wins.

Build the answer from:

1. the user's latest durable goal
2. explicit scope corrections from the user
3. any acceptance criteria the user set during the thread
4. code and file state that actually exists now
5. verification state that has actually been run now
6. session/task/loop state if those mechanisms were used

If earlier assistant framing conflicts with the user's corrections, discard it.
If broader `.session` state conflicts with a narrower thread-scoped ask, do not
let the broader state veto the thread verdict.

## Long Transcript Protocol

When the thread is long, meandering, or has changed direction multiple times,
you must reconstruct the thread before giving a verdict.

This is mandatory. Do not skip it just because the most recent repo state looks
clean.

Build a compact internal map of:

1. the original ask
2. each major scope correction from the user
3. every durable acceptance criterion the user added later
4. every promised follow-up or "I will do X next" commitment made by the agent
5. every review finding, concern, or objection that changed the bar
6. every side thread that might have become part of the real expected closeout

Then decide the verdict from that reconstructed thread, not from recency.

If the recent repo state is clean but the reconstructed thread still contains
unresolved obligations, the verdict is not done.

## Recentness Bias Guard

Recent activity is evidence, not scope.

Never let these override the larger thread by default:

- the latest commit
- the latest push
- the latest file touched
- the latest user sub-question
- the latest assistant recap

Before saying `Done verdict: yes`, explicitly sanity-check:

- "What earlier promises or findings would be invisible if I looked only at the last 10 turns?"
- "What did the user care about 50 turns ago that still matters now?"
- "What value or obligation got buried by later execution chatter?"

## Required Sweep

Before answering, perform a deliberate unresolved-thread sweep.

Check for:

- promised work that was never completed
- tests requested but not added
- review findings accepted but still open
- failing or unrun checks that matter to completion
- files mentioned as updated but not actually updated
- reports/docs/task files that are now stale relative to the code
- loop/session state that still implies unfinished work
- hidden adoption work that the user explicitly deferred
- useful insights, cleanup, leverage, or follow-on opportunities discovered during the work but never surfaced because the agent self-filtered them away
- earlier commitments or concerns that disappeared from the recent conversation but were never explicitly resolved or dropped

When relevant, inspect:

- `git status`
- the touched files
- current `.session/SESSION.md`
- the active named task file under `.session/tasks/<name>.md`
- the latest verification results that matter to the task

Use `.session` as corroborating evidence, not as an automatic scope expander.
Inspect the task file that matches the thread-scoped work when one exists.
Do not escalate to broader closeout tasks unless the user explicitly asks to
land the whole branch or issue.

If something is still open, say so directly.
If something valuable was discovered but skipped, surface it directly.
If something was buried by thread length, resurrect it explicitly.

## Landing Includes

When the user is asking to actually land the work, landing means:

- the completion audit passes
- your hunks are committed
- the branch is pushed so CI can run
- CI is checked
- any commit hook rejection or CI rejection caused by your landing attempt is handled instead of ignored

Do not treat "I made a commit" as equivalent to landing.

## Completion Standard

You may answer "yes, done" only if all of these are true:

- the main requested scope is implemented
- requested reviews or follow-up fixes are done
- required checks were run, or any unrun checks are explicitly non-blocking
- no meaningful unresolved thread remains from the conversation
- session/loop/task state does not falsely imply unfinished work for the
  thread-scoped task

You must still surface missed value even when the answer is "yes, done."
That missed value does not automatically make the verdict "no" unless it was
actually part of the agreed scope or an implied closure obligation.

If any one of these fails, the answer is "not fully done."

## Multi-Agent Commit Rule

Other agents may be changing the repo around you constantly.

Your commit responsibility is:

- commit all of your hunks
- ignore changes that are not yours

Default behavior:

- prefer normal file-level staging when the touched files are cleanly yours
- use hunk-level staging only when needed to avoid swallowing someone else's work

Hunk-level staging is acceptable, but not the norm.

If the repo is a PR/worktree with active parallel changes and untangling is more
than a few seconds of work:

- do not get fancy
- do not sink time into perfect separation
- it is acceptable to let a few extra hunks into the commit
- when that happens, tell the user exactly what you know about the over-commit so they can relay it or coordinate with another agent

Do not waste landing time on heroic staging surgery in a repo that is still moving.

## Rejection Handling

If the commit step rejects:

- fix the rejection when it is reasonably attributable to the landing attempt
- rerun the step
- do not report "landed" while the commit is still blocked

If CI rejects after push:

- treat that as not landed yet
- fix or clearly surface the failure
- rerun or wait for the relevant CI proof before claiming completion

The point of `/session:thread:land` is to finish the work, not to stop at the first gate.

## Landing Announcement

When a landed notification, chime, or voice announcement is used, do not use a
generic label like:

- `landed`
- `done`
- `branch landed`

Instead, synthesize a short semantic title from the actual thread scope, for
example:

- `tree library landed`
- `page template timeline landed`
- `session task workflow landed`

Rules:

- derive it from the user's durable thread goal, not from the latest sub-question
- keep it short and concrete
- prefer the feature or system name plus `landed` or `complete`
- if the thread title is ambiguous, fall back to the clearest current workstream, not a generic phrase

If voice is used, the spoken phrase should use that semantic title too.

## Output Contract

Start with exactly one line:

`Done verdict: yes`

or

`Done verdict: no`

Then use exactly these sections:

- `Done`
- `Open`
- `Missed Value`
- `Evidence`
- `Next`

### Section rules

`Done`
- only completed, real things

`Open`
- every remaining loose end that matters to the requested thread scope
- if none, write `- none`

`Missed Value`
- useful things the agent learned, noticed, or almost did, but did not act on
- include things skipped because they seemed off-topic, too small, too large, deferrable, or not worth interrupting over
- if none, write `- none`
- keep this distinct from `Open`
- items here are not blockers unless they actually belonged in scope

`Evidence`
- concrete verification and state checks
- name checks that passed
- name checks that still fail or were not run
- if a commit or push happened, include the commit and CI state
- if an over-commit happened, say what extra hunks were likely included
- include at least one note showing that the verdict considered earlier thread commitments, not just recent landing events

`Next`
- if done, say the thread can close
- if not done, give the single highest-priority next move

## Style

- be blunt and calm
- do not soften unresolved work into "optional follow-up" unless it truly is optional
- do not hide behind "out of scope" if the thread made it part of the accepted work
- do not hide useful insights just because they were non-blocking
- distinguish clearly between:
  - done
  - discussed
  - deferred on purpose
  - forgotten
  - surfaced late but still useful

## Never Do This

- do not answer only from memory
- do not answer only from tests
- do not answer mainly from the latest part of a long transcript
- do not confuse "my code is done" with "the thread is done"
- do not treat a stale task list as harmless
- do not let broader branch or `.session` tasks override an explicit narrower
  thread scope
- do not claim completion while an acknowledged finding remains open
- do not collapse "not done" into vague hedging
- do not suppress valuable observations just because the agent previously chose not to mention them
- do not pretend a local commit is the end of landing
- do not spend excessive time surgically untangling a hot multi-agent worktree when a few extra hunks plus a clear disclosure is the better trade

## Example Shape

Done verdict: no

Done
- tree lib core landed
- tests pass

Open
- session task file still shows an unchecked item
- report still lists old verification status

Evidence
- `npm run --silent test:base` passed
- `.session/tasks/tree-lib-baseline.md` still has an unchecked task

Next
- update the task file and report, then re-check completion
