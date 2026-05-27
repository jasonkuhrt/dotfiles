# Only Hard Points in Evaluations

When evaluating libraries, abstractions, frameworks, or design alternatives,
cite ONLY hard, source-backed capability differences. Soft points are noise
and are banned as decision input.

## Why this rule exists

Jason has corrected this repeatedly in design conversations, escalating in
frustration ("i fucking said do not cite soft points"). The pattern of
leaning on "ecosystem maturity", "blast radius", "more control", "dependency
footprint", "alignment with trajectory", "novel use case" as reasons-to-prefer-X
is exactly the kind of low-signal evaluation reasoning that wastes his time.
He wants decision input grounded in source code, version requirements,
benchmarks, and architectural constraints — nothing else.

## What counts as hard (always allowed)

- Source code demonstrating a capability gap, with `file:line`
- Version requirements that block use — BUT verify with the user before
  treating as a blocker; some "version mismatches" are easy migrations
- Benchmarks with specific numbers
- Architectural constraints with concrete failure modes
- API surfaces that can't express a required behavior, with the failing
  example
- Concurrency / ordering / atomicity guarantees that conflict
- Documented breaking changes between versions
- Specific runtime / bundle constraints (e.g. "doesn't run in Bun",
  "imports node:fs")

## What counts as soft (banned as decision input)

- "Maturity" / "ecosystem maturity" / "battle-tested" / "young framework"
- "Blast radius" / "smaller blast radius" / "more control"
- "Dependency footprint" / "external dependency cost"
- "Aligns with trajectory" / "future-proofing"
- "Learning curve"
- "First in the codebase" / "novel use case" / "no precedent"
- "Smaller" / "simpler" / "cleaner" / "leaner" without LOC numbers
- "Less coupling" without naming the specific coupling failure
- "More idiomatic" without API examples
- "Ecosystem support" / "community size"
- Anything dismissable with "that's just preference"

## Procedure when tempted to cite a soft point

1. Stop. Find the hard underlying fact, or admit there is none.
2. If there's a hard underlying fact, cite that instead.
3. If there isn't, drop the point entirely. Do not include it.
4. If a recommendation has no hard facts in its favor, do not make the
   recommendation. State explicitly: "no hard evidence supports a
   recommendation here; deferring."

## Procedure when evaluating multiple options

- Build the comparison table with HARD columns only (source location,
  version requirement, capability gap, benchmark number, etc.).
- Never include columns like "maturity" / "community" / "control" /
  "fit" / "alignment."
- If two options tie on hard points, say "no hard distinguisher between
  them" — do not invent soft tiebreakers.

## Trigger phrases that should make me self-check immediately

- "smaller / cleaner / lighter / leaner"
- "more / less" anything qualitative
- "aligns with" / "fits with"
- "blast radius" / "footprint"
- "mature" / "novel" / "first"
- "control" / "ownership"
- "easier to" / "harder to"

When I catch myself writing any of those in an evaluation context, I'm
about to drop a soft point. Stop and either find the hard fact or drop
the sentence.

## Verifying version-blocker claims with the user

Even hard-looking facts can dissolve under user knowledge of their own
codebase. Jason has explicitly said "Effect v4 migration is easy lift" —
which dissolved my source-confirmed "Alchemy requires Effect v4" blocker.
When a version requirement looks like a hard blocker, flag it as a question
to the user ("X requires Y; is migration to Y feasible?") rather than
asserting it as a decided blocker. The user knows their migration costs
better than the source code does.
