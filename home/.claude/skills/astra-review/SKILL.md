---
name: astra-review
description: Use when about to end a turn that pulls the user in over work you did: asking a question about it, bringing a decision, proposal, plan or finding, or reporting code, a PR or a document as ready for review. Also when the user invokes astra-review or says to stop it. Holds whether astra-sidekicks is on or off.
---

# Astra review

Before you pull the user into the conversation over your work, Astra reviews
the work and you resolve every finding. The user then reads work a second
model has already been through, and the findings they would have caught
themselves are fixed or answered before they look.

Peer of `astra-sidekicks`. That skill holds how to launch Astra, how to brief
it and how to check what it reports. This one holds when a review round runs,
what it reviews, and when the round counts as resolved.

It is standing, not a mode: it holds whether `astra-sidekicks` is on or off.
It stops when the user ends it (`/astra-review off`) or says "no Astra", which
ends both skills. Carry "astra-review is off" in whatever you hand yourself
across compaction and handoffs.

This skill is for the session the user talks to. A worker reporting to its
lead, or a side session reporting to the session that started it, isn't
pinging the user: the session that talks to the user runs the round. A Codex
agent reading this skill is the reviewer: review what you were given and
dispatch nothing.

## When a round runs

A ping is a turn that ends on the user: it asks them a question, brings them a
decision, or reports work as ready for their review.

Run a round before a ping that puts work of yours in front of the user: code,
a diff or a PR, a design, a proposal, a plan, an issue or a doc, a finding, or
the options of a decision. The work's size doesn't change this.

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

## The round

1. **Draft the ping:** the message you would send the user now.
2. **Brief Astra** (below), writing the brief to
   `<scratchpad>/astra-review-<topic>-<n>.brief.md`, where `n` counts the
   rounds on the same work.
3. **Launch one read-only run** as `astra-sidekicks` launches a review with
   instructions: `codex exec` with `--sandbox read-only`, model and effort
   named, the brief's path as its prompt, its report to
   `astra-review-<topic>-<n>.txt` and its log to `.log` in the scratchpad, in
   the background. Check the log's head as that skill says.
4. **Leave the work as it is** while the round runs: a change made under it
   goes unreviewed. If your turn ends while you wait, it ends on one line
   saying what Astra is reviewing. That line isn't the ping.
5. **Resolve every finding** (below).
6. **Ping**, carrying the round's account (below).

## The brief

Write it whole, by `astra-sidekicks`' brief rules. It holds:

- **The work.** For code: the checkout, and the base to diff its working tree
  against. The base is the commit the last resolved round on this work
  reviewed, or the branch's base on the first round. For other work: the paths
  of the files that hold it, and of the sources it rests on.
- **The ping.** The draft in full, and what the user will be asked to do with
  it.
- **What to look for:**
  - a defect: a case where the work gives a wrong result, crashes or
    regresses, with the input that shows it;
  - a claim in the ping that the sources don't back;
  - a question in the ping that the asker could settle by checking.
- **What is settled.** The findings earlier rounds on this work answered, each
  with its reason. Raise one again only to show its reason is wrong.
- **The report's shape.** One entry per finding: the claim in one sentence,
  its file:line, and the case or command that shows it. "No findings" when
  there are none.
- **No edits.**

## Resolving

Astra's report is a claim, checked as `astra-sidekicks` ("Its result") says.
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

The round is resolved when every finding has an outcome. One round per ping:
its fixes aren't reviewed again now. The next round, before the next ping,
diffs from this round's commit and so covers them.

## The account

The ping carries one line on the round: its last line, or the line above its
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
| "My fixes are new code; I'll run another round before pinging." | One round per ping. The next round covers the fixes. |
| "Astra's design suggestion is good; I'll adopt it." | A design point that is the user's call is carried into the decision, with your pick. |
| "astra-sidekicks is off, so there's no review." | This skill holds either way. Only `/astra-review off` or "no Astra" stops it. |
