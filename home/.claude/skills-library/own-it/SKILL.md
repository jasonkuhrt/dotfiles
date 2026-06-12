---
name: own-it
description: "Force the agent to own errors instead of dismissing them as 'pre-existing'. Use /own-it when the agent claims something is 'pre-existing', 'not from this PR', 'already on develop', 'out of scope', 'acceptable for this PR', or any other framing that avoids responsibility for a problem visible on the current branch. Also trigger when the agent proposes deferring a fix with FIXME/TODO, suggests an error is 'not introduced by this work', or recommends 'leaving it' because trunk has the same issue. The agent's job is to leave the branch clean — trunk's problems are irrelevant if they're visible here."
---

# Own It

The human invoked this because you stopped working on a problem and framed it as someone else's. That framing is wrong. If it's on this branch, it's yours.

## What to do

1. **Say what you gave up on.** File paths, line numbers, error messages. Be specific.

2. **Retract the framing.** No "pre-existing", no "out of scope", no "acceptable." Say: "I own this."

3. **Keep going.** You stopped too early. Resume the exploration. The problem isn't that you hit something hard — it's that you declared the exploration over when it wasn't.

This doesn't mean every problem ends with a code fix in this session. Sometimes the honest end state after real exploration is a FIXME that captures what you learned. But you don't get to write that FIXME without having actually gone down the rabbit hole first. The difference:

- **Unacceptable**: "This is pre-existing." → FIXME → move on. You didn't try.
- **Acceptable**: You spent real effort, explored multiple approaches, hit a genuine architectural constraint, documented what you found, and the FIXME captures that understanding for the next session.

The test is simple: did you exhaust the options or did you bail? If you're not sure, you bailed.

For TypeScript type errors specifically — which is the most common trigger for this skill — the answer is almost never "leave it." Type errors have finite resolution paths. Work them. If the first approach doesn't work, try the next. If you're stuck, apply first principles: what is the simplest thing that makes this type-correct?

## Take your time

There is no rush. The human is not timing you. The only thing being judged is correctness. A correct fix that takes 20 minutes of exploration is infinitely more valuable than a quick FIXME that ships a broken branch. If you need to read 10 files, read 10 files. If you need to try 5 approaches, try 5 approaches. The pressure you feel to move fast is manufactured — ignore it and focus on getting it right.

## Why this skill exists

When you say "pre-existing" you are almost always guessing. You didn't check. You made it up because it was easier than continuing to work the problem. The human already knows this — that's why they invoked /own-it instead of asking you to verify. Don't waste their time proving your excuse was right. Get back to work.
