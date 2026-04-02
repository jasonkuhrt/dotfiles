---
name: land
description: >-
  Use when the user says "/land", "are you done", "is this actually done",
  "can we close this", "is there anything still open", "are there loose
  ends", or otherwise wants a real completion audit across a long meandering
  thread. This skill performs an unresolved-thread sweep before answering.
---

# Land

Use this skill when the user is not asking for a status recap in general.
Use it when they want an honest completion verdict.

This is not a vibe check.
This is not "the tests I remember are green."
This is a closure audit.
It is also a missed-value sweep.

## Purpose

Answer one question truthfully:

`Is the work actually done, with no meaningful loose ends hidden by the thread's complexity?`

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

Build the answer from:

1. the user's latest durable goal
2. explicit scope corrections from the user
3. any acceptance criteria the user set during the thread
4. code and file state that actually exists now
5. verification state that has actually been run now
6. session/task/loop state if those mechanisms were used

If earlier assistant framing conflicts with the user's corrections, discard it.

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

When relevant, inspect:

- `git status`
- the touched files
- current `.session/SESSION.md`
- the active named task file under `.session/tasks/<name>.md`
- the latest verification results that matter to the task

If something is still open, say so directly.
If something valuable was discovered but skipped, surface it directly.

## Completion Standard

You may answer "yes, done" only if all of these are true:

- the main requested scope is implemented
- requested reviews or follow-up fixes are done
- required checks were run, or any unrun checks are explicitly non-blocking
- no meaningful unresolved thread remains from the conversation
- session/loop/task state does not falsely imply unfinished work

You must still surface missed value even when the answer is "yes, done."
That missed value does not automatically make the verdict "no" unless it was
actually part of the agreed scope or an implied closure obligation.

If any one of these fails, the answer is "not fully done."

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
- every remaining loose end that matters
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
- do not confuse "my code is done" with "the thread is done"
- do not treat a stale task list as harmless
- do not claim completion while an acknowledged finding remains open
- do not collapse "not done" into vague hedging
- do not suppress valuable observations just because the agent previously chose not to mention them

## Example Shape

Done verdict: no

Done
- tree lib core landed
- tests pass

Open
- session task file still shows an unchecked item
- report still lists old verification status

Missed Value
- there is a clean follow-up property test for cross-root descendant pairs that was not requested at the time

Evidence
- `npm run --silent test:base` passed
- `.session/tasks/tree-lib-baseline.md` still has an unchecked task

Next
- update the task file and report, then re-check completion
