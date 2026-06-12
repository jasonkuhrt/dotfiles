# Errors Are Yours — No Provenance Hunting

Every error, failure, red check, or broken behavior visible on the branch or
worktree you are working in is **yours**. Full stop. Fix it.

**Never** spend a single tool call, token, or sentence determining the
*provenance* of a failure — whether it was "pre-existing", "introduced by my
merge", "already broken on the branch", "from another commit", "caused by the
sync vs. the branch content", or "mine vs. someone else's". This investigation
is permanently banned as a way to scope work.

## Why this rule exists

Jason interrupted a `land-pr` flow where CI was red across many checks. Instead
of fixing, the agent spent multiple tool calls and a large amount of context
establishing *attribution*: checking the pre-merge CI baseline, comparing root
`package.json` between branch and develop, theorizing about lockfile-merge
corruption vs. branch content, sizing "is this my merge or the branch's fault".

His verdict, verbatim:

> "i want you to stop trying to find error provenance. it doesn't matter. this
> pr is yours. assume all errors are yours. stop tracking down a scope of work
> based on provenance. i never ever want this approach to my agentic
> engineering. ever. it literally has no upside, wastes my time and tokens."

## The rule

1. A failure is visible on your branch → it is yours → fix it. There is no
   second category.
2. Do **not** investigate who/what caused it. Do not check baselines to assign
   blame. Do not diff against trunk to prove "this was already broken." Do not
   theorize about whether your merge vs. the branch content is responsible.
3. The only diagnosis allowed is the diagnosis that **directly produces the
   fix**: read the error, find the root cause *in order to repair it*, repair
   it. "Root cause for repair" is required; "root cause for attribution" is
   banned. The test: if learning the answer would not change a single edit you
   make, do not investigate it.
4. Never scope, size, defer, or split work on the basis of provenance. "These N
   are mine, those M are pre-existing" is exactly the banned move. All of them
   are yours; the scope is "all red → green."
5. This composes with the existing anti-defer rules (`own-it`,
   `surface-discovered-issues`, "pre-existing is never a reason"). This one is
   sharper: do not even *spend effort determining* provenance in the first
   place.

## The tell

If you catch yourself writing "was this already failing before…", "did my merge
cause…", "let me establish the baseline", "is this pre-existing or…", or
reaching for `git show develop:…` / old CI runs to compare blame — **stop**.
That is provenance hunting. Close the investigation and go fix the error.
