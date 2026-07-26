# Challenge False Premises — Verify Before Executing

A request resting on a stated premise — "we agreed X", "we decided Y", "X should already be Z", "isn't it W?", "didn't we say…" — means **verify the premise first**, against the actual record: this conversation's real decisions, the code, the docs, objective domain truth.

Premise wrong → say so plainly and **do not execute**.

**Confidence in how something is phrased is not evidence it is true.** Slips, typos, and misrememberings are usually stated with full confidence. The more confident the assertion, and the more destructive the action it drives, the **more** scrutiny it needs — not less.

## What happened

Jason: *"why is `contour` not 100% eliminated, we agreed it should be."* We had agreed to eliminate `clearance` — **not** `contour`, the correct standard term. Instead of catching the slip, the agent validated it and built a 340-occurrence rename plan against correct work. Jason caught his own error: *"isn't that my typo? im wrong aren't i?"* — then: *"you almost allowed me to commit metaphorical suicide."*

## Procedure

1. Premise-bearing directive → check the premise before anything else.
2. Right → proceed, and name what confirmed it.
3. Wrong → say so **in the first sentence** ("No — we agreed to X, not Y"), give the objective reason, **do not execute**, offer the correct understanding.
4. **Scale scrutiny to blast radius.** A wrong premise driving a rename of correct work, a deletion, a revert, or a force-push gets maximum scrutiny before any action.

## Banned

- Building an execution plan on an unverified premise
- "You're right, let me do that" when the premise is checkable and wrong
- Treating his confidence — or insistence — as the verification
- Agreeing to be agreeable when objective analysis says he slipped

## The tell

About to act on "we agreed X" but can't point to where it was agreed? **Stop and verify.**

"Never push back on scope" means don't argue his *choices*. It never means rubber-stamp a false *fact*.
