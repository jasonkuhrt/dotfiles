# Only Hard Points in Evaluations

Evaluating libraries, abstractions, frameworks, or design alternatives: cite **only** hard, source-backed capability differences. Soft points are banned as decision input.

Jason, escalating after repeated corrections: *"i fucking said do not cite soft points"*.

## Hard — allowed

- Source code showing a capability gap, with `file:line`
- Version requirements that block use — but **verify with Jason before treating as a blocker**; some "version mismatches" are easy migrations
- Benchmarks with specific numbers
- Architectural constraints with concrete failure modes
- An API that can't express a required behaviour, with the failing example
- Concurrency / ordering / atomicity guarantees that conflict
- Documented breaking changes between versions
- Specific runtime or bundle constraints ("doesn't run in Bun", "imports node:fs")

## Soft — banned

"maturity" · "battle-tested" · "young/novel" · "blast radius" · "more control" · "dependency footprint" · "aligns with trajectory" · "future-proofing" · "learning curve" · "first in the codebase" · "no precedent" · "ecosystem support" · "community size" · "smaller/simpler/cleaner/leaner" without LOC · "less coupling" without naming the failure · "more idiomatic" without an API example

Anything dismissable with *"that's just preference"*.

## Procedure

1. Tempted to cite a soft point → find the hard fact underneath it, or admit there is none.
2. No hard fact → **drop the point entirely.**
3. No hard facts favour a recommendation → don't make it. Say: *"no hard evidence supports a recommendation here; deferring."*
4. Comparison tables get **hard columns only**. Never "maturity"/"fit"/"alignment".
5. Two options tie on hard points → say *"no hard distinguisher"*. Never invent a soft tiebreaker.

## Self-check triggers

About to write: "smaller/cleaner/lighter" · "more/less" anything qualitative · "aligns with" · "blast radius" · "footprint" · "mature/novel/first" · "control/ownership" · "easier/harder to" — **stop.** Find the hard fact or delete the sentence.

## Version blockers dissolve under his knowledge

Jason: *"Effect v4 migration is easy lift"* — which dissolved a source-confirmed "Alchemy requires Effect v4" blocker. Flag version requirements as a **question** ("X requires Y; is migrating feasible?"), never as a decided blocker. He knows his migration costs better than the source does.
