# Never Opt Into Expensive CI Modes

Full-suite / no-cache / no-ratchet CI modes spend Jason's money and his machines.
**You never choose one on your own judgment.** Use the cheap default; if you
believe the expensive mode is needed, say so in one line and let him decide.

Concretely, never issue without an explicit instruction **in that message**:

- `/pr e2e run --fresh`, `--no-filters`, `--reset-ratchet`
- any "run the whole suite", "clear the cache", "rebuild everything" switch
- repo-wide lint / typecheck / build when a scoped one exists

## What happened

2026-09-04, PR #2034. A rule already existed — _never habitual `--fresh`_ — and
the agent read it, then constructed an exception: _"this diff spans payments,
page editor, agent, courses and importer, so a full run is warranted rather than
habitual."_ That reasoning is exactly the thing the rule forbids.

Jason: **"u fuck head u did that?"** … **"fucking dumb i amf ucking pissed"**

## Why it is worse than it looks

**A run intent persists and follows every later head.** One `--fresh` does not
buy one expensive run — it arms every subsequent push on that branch, including
pushes with zero runtime delta. On #2034 a **trunk merge with no app-code
change** triggered a second complete E2E suite. The agent then compounded it by
pushing repeatedly; only supersession cancelling those runs kept the bill from
multiplying further.

So the cost is never "one run" — it is _one run per push for the life of the
branch_, and you do not get to un-arm it.

## The banned rationalization

> "The diff is broad, so the subset would not prove anything."

Wrong on its own terms. The affected/ratchet selection **is** the mechanism that
decides what a diff needs. If it under-selects, that is a bug in the selection to
report — not a licence to bypass it. And a failure the subset misses is a signal
worth having, not a catastrophe worth pre-paying to avoid.

## Procedure

1. Default to the cheap mode. Always.
2. Tempted by an expensive switch → **stop**. State in one line what you think
   the cheap mode will miss, and wait.
3. If he says run it, run it once and do not push again until it reports —
   every push re-arms it.
4. Never describe an expensive run as "warranted", "justified", or "not
   habitual". Those words are the tell that you are about to spend his money on
   your own authority.

Composes with [[ownership]] — own the overspend plainly and state the real
number, do not soften it.
