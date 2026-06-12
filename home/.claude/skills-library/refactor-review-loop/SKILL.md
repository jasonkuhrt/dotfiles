---
name: refactor-review-loop
description: Iteratively review, refactor, verify, and commit toward less code by sharing primitives and improving functional composition. Use when the user asks for a strict refactor review loop, "get a review strictly for refactoring to less code", "repeat review/fix/commit until empty", or similar wording.
---

# Refactor Review Loop

Use this skill when the user wants an iterative loop that repeatedly finds and lands small refactors. The review lens is deliberately narrow: less code, shared primitives, better composition, and lower duplication. Do not turn this into a general code review.

Target end state: one of the user-given stop conditions is reached, every acted finding is committed, verification has been run for the touched surface, and unrelated dirty work is preserved.

## Core Contract

Run this loop:

1. Get a strict refactor review.
2. Act on the review findings that actually reduce code or improve primitive sharing/composition.
3. Verify the touched surface.
4. Commit only your hunks.
5. Repeat until a stop condition is reached.

Default stop conditions, unless the user gives different ones:

- The review is empty.
- Three consecutive review passes yield less than 50% acted findings.
- The 10th commit in this loop lands.

If the user supplies explicit stop conditions, follow those exactly.

## Review Lens

Only count findings that satisfy this lens:

- Remove meaningful duplication.
- Move repeated mechanics into an existing or clearly owned primitive.
- Compose effects/functions/data transforms more directly.
- Reuse existing helpers instead of rebuilding local objects.
- Shrink callsites without hiding important sequencing or domain meaning.

Reject or ignore findings that are outside the lens:

- Bug fixes unrelated to refactor shape.
- Behavior changes.
- New feature requests.
- Broad redesigns.
- Style churn that does not reduce code or improve sharing.
- Abstractions that add ceremony without paying for themselves.

## Review Prompt

When reviewing locally, use this exact frame:

```text
Review strictly for refactoring to less code by using and sharing primitives and using functional composition better.

Return only actionable findings that reduce code, improve primitive sharing, or simplify composition. Do not include behavior bugs, naming/style preferences, tests, docs, performance, or broader architecture unless they directly support the refactor lens.

For each finding include:
- file and line/symbol
- the repeated or over-expanded shape
- the smaller/shared/composed replacement
- why it is worth acting on
```

If the user explicitly asks for a sub-agent review, use the same prompt and bound it to the current committed or staged slice. If delegation is not explicitly requested, perform the review locally.

## Acting Rules

For each review pass:

1. List the findings internally and count them.
2. Act only on findings that pass the lens.
3. Prefer existing local primitives before adding new ones.
4. Add a new primitive only when it removes real duplication or clarifies repeated mechanics.
5. Keep each edit small and scoped.
6. Preserve sequencing-heavy code when point-free composition would make dependencies harder to read.
7. Do not stage unrelated dirty files.
8. Track acted count divided by returned finding count for the stop rule.

Good signs:

- Repeated command execution/error handling moves into one command primitive.
- Repeated render options become one helper.
- Local object rebuilds disappear because the command object already has the needed shape.
- One manifest/result constructor owns its own serialization/rendering.
- Several callsites shrink after one low-level helper gains the right shape.

Bad signs:

- A "refactor" creates a generic abstraction used once.
- A helper hides domain decisions that were clearer inline.
- A review comment asks for a behavior change under a refactor label.
- A pass lands churn with no net simplification.

## Verification

Use the repo's own command contract and the smallest meaningful checks for the changed surface.

For each acted pass:

1. Format the touched files if the repo has a formatter command.
2. Run focused lint/type/test checks appropriate to the touched files.
3. Run operator-path smokes when the refactor touches command-line or workflow code.
4. Let commit hooks run; do not weaken lint warnings-as-errors contracts.

Do not run broad checks unless the user asked for them or the touched surface demands them.

## Commit Hygiene

Before each commit:

1. Inspect `git status --short`.
2. Stage only files/hunks from this pass.
3. Confirm the staged diff is scoped to the refactor.
4. Commit with a subject that names the primitive/composition move.

After each commit:

1. Record the commit SHA and subject.
2. Increment the loop commit count.
3. Start the next review pass unless a stop condition has been reached.

If unrelated files are dirty, leave them alone and mention them in the final report.

## Final Report

When stopping, report:

- Which stop condition was reached.
- The commits landed in this loop.
- The verification commands that passed.
- Any checks that were skipped or failed.
- Any unrelated dirty files left untouched.

Keep the final report concise. The useful artifact is the committed code; the report should make the loop auditable.
