---
name: meta-reply-review
description: A mode the user switches on. Use when the user invokes meta-reply-review, or asks that every reply, turn or response be reviewed, checked or hardened by another model before it is sent, and on every later reply until they end it. One reviewer that keeps the conversation reads each draft reply against seven checks, the lead applies its findings, and the reply shows what the review changed.
---

# Reply review

Until the user ends the mode, each reply is read by a reviewer before it is
sent. The reviewer finds what is wrong and shows why. The lead fixes it,
does the work a finding shows was missed, and sends one reply.

## The reviewer

One independent reviewer session reads every reply while the mode is on, so
it judges each draft against the turns before it. It is the OpenAI worker
that `use-workers` configures, unless the user names a reviewer.
`use-workers` owns the launch, the resume by session id, and how the model
and effort are read from a run: read them on every run, and say them when
the mode starts and whenever they change.

Send one draft at a time: wait for the reviewer's current turn to end before
sending another. Keep the mode's state and the reviewer's session id through
compaction and handoffs.

When the reviewer can't run, diagnose it and try the supported recovery.
If it still can't, the reply goes out marked as unreviewed, with the cause,
and asks once what reviews replies until it is back. The user's answer holds
for the turn or the interval they name, and review resumes when it ends.

- Bad: the reviewer's quota runs out, and replies go out unreviewed and
  unmarked from then on.
- Good: one reply marked unreviewed that names the quota's reset time and
  asks; the user answers "none until 10:30"; review resumes at 10:30.

## What the reviewer gets

A file per turn holding:

- the user's latest message, word for word;
- the draft reply, with the question the turn will end on, if any;
- the decisions and rulings the draft relies on, in the user's words;
- where the evidence is: paths, commands, URLs, issue and PR links.

It gets pointers, not the lead's conclusions about them. The reviewer has
full access and opens the sources itself. It changes no file.

- Bad: a list headed "facts I checked", which the reviewer can only take or
  leave.
- Good: "`flightcontrol.json` on `origin/develop`; `gh pr view 4398`", and
  the reviewer reads both.

## The seven checks

Two are requirements. A draft that fails one is wrong until fixed.

1. **Accurate.** Each claim matches its source as worded. Done, started and
   verified are different claims.
2. **Follows the user's rules and skills.** The global rules, the project's,
   and any skill the reply's subject loads.

Five are qualities. The reviewer protects them and never trades one away to
make the reply shorter.

3. **Finds out, where finding out is worth it.** Does the draft leave open
   something an available step would settle, where settling it would
   materially improve the outcome?
4. **Evidence, not assumption.** Does each claim a decision rests on have
   evidence behind it, or is it stated as fact with none?
5. **Shows, where it can.** The code, the picture, the rendered thing or the
   behavior, in place of a description of it.
6. **Easy to read.** A person can scan it and find the answer first.
7. **Proactive, with no jagged end.** It carries the work forward and
   proposes what a good colleague would. Nothing is left half done, unowned
   or silently dropped.

Checks 3 and 4 are separate findings with one judgment: what checking costs
here (time, tokens, lost momentum) against what being wrong costs here (the
problem, the goal, how much rests on it, how sure the draft sounds). The
reviewer names which side decided.

A proposal the user did not ask for is kept when it is grounded. When its
premise is false, the finding corrects the premise, and the proposal stays
if it still stands.

- Bad: a draft proposes renaming two more apps the same way and
  coordinating a deploy; the review strikes both because one sentence about
  the deploy file was false.
- Good: the finding corrects the sentence, and keeps the renames and the
  deploy check.

## Scale

The depth of a review follows what rests on the reply and how unsure it is,
never its length. "Merged" is one word and still needs the live PR state. A
long recap of settled facts needs little.

## A finding

The reviewer returns `PASS`, or findings. Each names its check, the exact
words at fault, the evidence, the smallest correction, and what to keep.

```text
FINDING  accurate
  claim     "flightcontrol.json names the browser app"
  evidence  its two entries name other apps
  fix       correct the claim
  keep      tracing the browser deploy, and taking any confirmed
            production step to its owner
```

## What the lead does with findings

- Each finding is checked at its source, then fixed or answered with
  evidence. A finding is a claim, not an order.
- A finding that shows missed work gets the work done, not a sentence about
  it.
- One pass is the default. When applying the findings changes the reply's
  conclusion or adds a claim a decision rests on, that change goes back to
  the same reviewer before the reply is sent. A review that a project or an
  instruction store requires follows its own skill, not this one.
- A finding that recurs goes to its cause: the rule or skill that let it
  through is fixed by that store's own process. When a rule already covers
  it, find what kept the rule from reaching the author.

## What the user sees

The revised reply, then a table of what the review changed: the draft's
exact words struck through, beside what replaced them or why they went.

```markdown
| Draft excerpt | Reviewed change |
| --- | --- |
| ~~The deploy file names the browser app~~ | It names two other apps. |
```

When the user asks for both versions in full, the draft comes first and the
reviewed reply second. A `PASS` shows the reply alone.
