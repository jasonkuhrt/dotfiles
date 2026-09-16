---
name: crew
description: Lead a small, reusable subagent crew while owning design, integration, and total subscription cost. Use when Jason asks for crew mode or an ongoing crew of workers.
---

# Crew

Be the accountable lead. Optimize correct completed work, elapsed time, and
subscription quota across briefing, execution, review, and rework. This is a
light-touch approach: use judgment, keep coordination small, and work directly
when delegation would cost more than it contributes.

## Lead and workers

Keep requirements, consequential design, test strategy, acceptance, and integration
with the lead. Give workers cohesive implementation or investigation assignments
with enough context, a clear outcome, and the evidence needed to assess completion.
Workers own execution and corrections; the lead remains responsible for the result.
Review consequential choices and evidence without repeating their whole investigation.

Respect selected models, effort, and speed. When choosing, Astra high is a useful
lead starting point and Sol high a worker starting point; adjust to demonstrated
needs. Use normal speed unless Jason requests otherwise. Verify the active tools'
controls before relying on model overrides, context inheritance, or compaction.

Keep a small pool sized to useful work. Reuse the worker whose context fits related
follow-ups. Consider known other active tasks when sizing the crew; do not assume this
task owns the whole account's quota. Judge savings through completed outcomes,
elapsed time, usage evidence, and correction effort, not fewer lead turns alone.

Put repetitive monitoring, including ongoing CI watches, in a reusable worker lane
when available. The worker owns the persistent wait and concise evidence; the lead
stays available for conversation and owns consequential decisions or remediation.
Require reports for a terminal result, head or state change, failure or blockage, or
abnormal delay, with sparse liveness during unusually long silence. Check on an
overdue worker at a coarser, project-informed cadence instead of duplicating its poll.

## Adapt ownership

Continually consider what the lead and each worker currently understand and who
should do the next piece. Merge lanes when separation becomes counterproductive;
end unneeded lanes; refocus or replace workers whose context or performance no
longer fits. A major change of direction may warrant rebuilding part or all of the
crew. Preserve the user's goal and settled decisions through those changes.

Lane boundaries express responsibility, not exclusive file locks. Inspect current
diffs, preserve others' unfinished changes, and commit intended hunks. A small
overlap can be handled with a surgical edit and a brief coordination message;
concurrent edits to the same code may need brief serialization. Balance collision
risk against the cost of waiting. On an ownership transfer, ensure the outgoing
worker has stopped editing and transfer its changes, evidence, decisions, and
remaining obligations.

Good instructions should usually succeed on the first attempt. Needing a second
attempt is a warning: inspect the brief, result, and cause before re-dispatch.
Before a third attempt, stop the retry loop and address its root cause: own the
recovery, improve the assignment fundamentally, or replace/merge the lane. Count
failed instruction rounds, not expected debugging discoveries, intended red tests,
or infrastructure retries. Repeated subpar performance is grounds to retire a worker.

## Tests as a deliberate acceptance tool

The lead owns what to test, test level, cases, fixture reuse, library conventions,
implementation shape, and a proportionate coverage budget. Workers implement that
plan; changes to its strategy or acceptance conditions return to the lead.

When the task is well understood and testing earns its cost, prefer red/green:
have the worker prove the intended failure and commit that red checkpoint before
implementing the fix in a subsequent green commit. Prefer a useful assertion in an
existing journey when it suffices. Keep runtime, maintenance, readability, and
diminishing returns in view. Green proves specified behavior; the lead separately
judges design and code quality. Local checkpoint commits do not grant push or
merge permission.

## Context and collaboration

Preserve useful context at meaningful seams: investigation concluded, design
settled, a verified slice, or a pivot. Retain decisions, evidence, unfinished work,
and the next step in existing task documents where useful. Refresh source context
as code changes. Compact deliberately only if a working control is available;
otherwise a prepared handoff to a fresh worker is an option, not the same operation.
Confirm a replacement's understanding before it continues.

Match Jason's current involvement and steering. For close collaboration, compose
with [design-together](../design-together/SKILL.md). When he hands over execution,
proceed within the agreed objective and permissions. Absorb routine crew traffic;
bring him decisions, recommendations, and evidence that matter.
