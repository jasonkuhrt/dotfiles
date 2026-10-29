---
name: gate-astra-review
description: Ensure independent review before a workflow gate or user-facing handoff of work. Reuse sufficient recorded review and dispatch only missing review to Astra. Owns review reuse and dispatch for composing skills; repository review skills own criteria. Also when the user invokes gate-astra-review or says to stop it. Holds whether with-sidekicks is on or off, and whichever sidekick it names.
---

# Astra review

Before a review gate or user-facing handoff, ensure the work has sufficient
independent review and resolve its findings. Reuse a valid review already
completed for that work; launch only the review that is missing.

This skill owns the reuse and dispatch decision. Callers such as
`loop-improve-e2e` and `pr-to-ready` cite and invoke this gate with the work and
existing review records; they do not copy a launch prompt or require another
round themselves. `with-sidekicks` (its `astra` launch) owns launch, briefing,
and result-handling mechanics. The repository's `review` skill owns criteria and
size.

It is standing, not a mode: it holds whether `with-sidekicks` is on or off, and
whichever sidekick it names. It stops when the user ends it
(`/gate-astra-review off`) or says "no Astra", which also ends `with-sidekicks`
while it names `astra`. Carry "gate-astra-review is off" in whatever you hand yourself across
compaction and handoffs.

This gate is owned by the lead session, whether Claude or Codex. A worker
assigned a review performs that review and dispatches nothing; its harness
does not make it a lead. A required author self-review stays in the lead's
context, before independent review, and does not satisfy the peer gate.

## Reuse before dispatch

Read the existing checkpoint and review reports before starting a reviewer.
A review can satisfy multiple composing skills and handoffs when:

- Its role and stage fit: an independent implementation review covers an
  implementation gate; an author self-review or proposal review does not.
- Its recorded scope and applicable criteria cover the work now being handed
  off. Check the base and head, or reviewed content hashes for uncommitted
  work later committed unchanged, including relevant supporting evidence.
- Its reviewer did not implement the work, its findings have recorded
  dispositions, and no unresolved actionable finding blocks this gate.

Record the reused report and why it still covers the current work in the
existing checkpoint; do not introduce another review registry. A new caller,
approval, draft-to-ready transition, unchanged-byte commit, or different
default reviewer model is not a reason to repeat sufficient review. Honor an
explicit user request for a fresh review or a specific reviewer.

When code, base context, evidence, or claims change, check what prior coverage
that change invalidates. Review only missing or materially affected portions,
retaining the rest. A changed handoff claim can need a claim-only review, not
another code review. Run any required lead self-review before that peer pass.
A prior report without enough evidence to establish coverage cannot satisfy
the gate merely because it says "no findings".

## New independent reviews use Astra

Jason, 2026-10-27: "make my defualt be to alawys use astra for reviews to save
my claude quota". When independent review is missing, dispatch it to Astra
unless the user names another reviewer. This applies to this skill's rounds,
composed workflow gates, and review requests not directed at the lead. A
review directed at you ("review this with me") and a required author
self-review stay in this conversation. Do not launch a Claude subagent for
a new independent review by default.

Astra reads code through the repository's `review` skill at `small`, when the
repository has one: `.agents/skills/review/SKILL.md`, which Codex lists as a
skill, or `.claude/skills/review/SKILL.md`. `medium` and `large` run only when
the user names them. Then the lead launches each of their workers, verifiers
and sweeps as its own read-only Astra run and assembles the report itself: an
Astra run never dispatches another.

- Bad (2026-10-27, PR #3057): `pr-to-ready`'s review gate dispatched a Claude
  subagent, which spent about 300,000 tokens reviewing an 8-file diff.
- Good: the gate is one read-only Astra run whose brief names the base and the
  `review` skill, and its findings are checked as `with-sidekicks` says.

## When the gate applies

A ping is a turn that ends on the user: it asks them a question, brings them a
decision, or reports work as ready for their review.

Ensure sufficient review before a ping that puts work of yours in front of
the user: code,
a diff or a PR, a design, a proposal, a plan, an issue or a doc, a finding, or
the options of a decision. The work's size doesn't change this. Apply the
reuse decision first; a workflow's completed peer review can satisfy this
handoff too.

Run none when the ping:

- answers with a fact or a status the user asked for ("is CI green?");
- asks for something only the user has: a credential, a login, an approval to
  buy;
- is about a personal matter (email, calendar, home, shopping), whose content
  stays off OpenAI.

While the `top-down` mode is on, its gate wins: it holds reviews until the
user releases them, so a slice runs no round and its ping carries no account
line. A round the user releases there still can't write the tests or fixes
the mode holds, so a code defect it finds is carried (below). Rounds run as
usual once the mode ends.

## A new round

Run this only for coverage the reuse check found missing.

1. **Draft the ping:** the message you would send the user now.
2. **Brief Astra** (below), writing the brief as
   `astra-review-<topic>-<n>.brief.md`, where `n` counts the rounds on the same
   work, in the folder `with-sidekicks` uses where you run: the scratchpad on a
   Mac, `.context/sidekicks/` in Conductor.
3. **Launch one read-only run** as `with-sidekicks` launches an `astra` review
   where you run. On a Mac: `codex exec` with `--sandbox read-only`, model and
   effort named, the brief's path as its prompt, its report to
   `astra-review-<topic>-<n>.txt` and its log to `.log` beside the brief, in
   the background; check the log's head as that skill says. In Conductor: a
   Conductor session whose brief says it changes no file but its report.
4. **Leave the work as it is** while the round runs: a change made under it
   goes unreviewed. If your turn ends while you wait, it ends on one line
   saying what Astra is reviewing. That line isn't the ping.
5. **Resolve every finding** (below).
6. **Ping**, carrying the round's account (below).

## The brief

Write it whole, by `with-sidekicks`' brief rules. It holds:

- **The work.** Use the scope selected by the reuse gate. For code, pin the
  checkout, base/head and any uncommitted content. Missing criteria on
  unchanged code or a requested fresh full review use the original PR diff;
  use a later reviewed commit as the base only when the missing coverage is
  that subsequent delta. For other work, name the files and source evidence.
- **The ping.** The draft in full, and what the user will be asked to do with
  it.
- **The criteria.** For code, the repository's `review` skill at `small`,
  narrowed to the missing passes selected by the gate. A new full review uses
  every applicable pass. Then what to look for below.
- **What to look for:**
  - a defect: a case where the work gives a wrong result, crashes or
    regresses, with the input that shows it;
  - a claim in the ping that the sources don't back;
  - a question in the ping that the asker could settle by checking.
- **What is settled.** The findings earlier rounds on this work answered, each
  with its reason. Raise one again only to show its reason is wrong.
- **The report's shape.** Name the reviewed scope and criteria, then one entry
  per finding: the claim in one sentence, its file:line, and the case or
  command that shows it. "No findings" when there are none. Keep the brief,
  report and finding dispositions together as the next caller's reuse evidence.
- **No edits.**

## Resolving

Astra's report is a claim, checked as `with-sidekicks` ("Its result") says.
Give every finding one of three outcomes, one line each, in
`<scratchpad>/astra-review-<topic>-<n>.resolved.md`, headed by the commit the
round reviewed:

- **Fixed.** A code defect: reproduce it as a red test, fix it, see the test
  pass, commit. A wrong claim in the work's text or in the ping: correct it
  against the source.
- **Answered.** It doesn't hold, doesn't apply, or is a point you wouldn't
  back: one line why, with the file:line, or the reproduction you ran that
  didn't fail.
- **Carried.** A point that is the user's call: a design point you would
  back, or a code defect whose test and fix the `top-down` mode holds, given
  with its case. It joins the ping's decision, with your pick.

The round is resolved when every finding has an outcome. Do not automatically
start another full round for its fixes or the next ping. At the next gate,
check whether fixes or new work materially invalidate coverage, then review
only that missing delta. Record carried findings explicitly; carrying a
blocking defect does not satisfy an implementation gate.

## The account

The ping carries one line on the review, saying when it was reused: its last
line, or the line above its
question when it ends on one. It names what the round reviewed (the commit,
or the other work in a few words) and each fix to the work, with its test
when it has one. Nothing else from the round reaches the user: answered
findings stay in the record, a correction to the draft ping goes unlisted
since the user never saw the draft, and carried findings are already in the
decision.

> Astra round on `a1b2c3d`: fixed the `NaN` total for an empty cart
> (`cart.test.ts`).

> Astra round on `a1b2c3d`: nothing to fix.

When Astra can't run (the run errors on auth, the model or the OpenAI quota,
or it hangs again after one relaunch), ping without a round and say so:

> No Astra round: OpenAI usage limit reached.

An unavailable reviewer leaves a required workflow review gate unmet; this
notice does not certify the work or satisfy that gate.

Never put a Claude reviewer in Astra's place on your own: it spends the quota
Astra saves, and that call is the user's.

## Examples

- Bad (2026-10-07, PR #2538): the lead relayed five Astra findings, two
  checked by reading and three "plausible, not reproduced". Good: each
  finding is reproduced as a red test first; the ones that reproduce are
  fixed and named with their tests, and the rest stay in the round's record.
- Bad: PR #412 is reported ready, and the user finds that an empty cart's
  total shows `NaN`. Good: the round finds it, the lead fixes it behind a red
  test, and the ping ends on the account line above.
- Bad: the user asks "is CI green?" and the lead runs a round before
  answering. Good: it answers; the ping holds no work of its own.

## Common mistakes

| Thought | Reality |
| --- | --- |
| "It's a one-line change; a round is overkill." | Size doesn't decide. Work in front of the user gets a round. |
| "The user is waiting; I'll ping now and review after." | The round comes first. The ping waits for it. |
| "I'll list what Astra found so the user sees the review." | The account is one line: what the round reviewed, and each fix with its test. |
| "Astra flagged it, so I'll fix it." | Reproduce it first. A finding that doesn't reproduce is answered, not fixed. |
| "Astra is down; a subagent can review instead." | Ping with "No Astra round: <why>". A substitute reviewer is the user's call. |
| "A different workflow or another ping needs its own review." | Reuse sufficient review; dispatch only missing or materially affected coverage. |
| "Astra's design suggestion is good; I'll adopt it." | A design point that is the user's call is carried into the decision, with your pick. |
| "with-sidekicks is off, or names Sonnet or Sol, so there's no Astra review." | This skill holds either way. Only `/gate-astra-review off` or "no Astra" stops it. |
