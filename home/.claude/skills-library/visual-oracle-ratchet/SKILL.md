---
name: visual-oracle-ratchet
description: >-
  Run the framework-agnostic visual oracle ratchet algorithm for screenshot,
  golden image, and other image regression tests. Use when deciding whether a
  visual oracle can ratchet forward, reviewing visual diffs, handling image
  baseline failures, or designing adapter skills for Vitest, Playwright, or
  similar tools. Enforces human approval before any baseline overwrite.
---

# Visual Oracle Ratchet

Purpose: ratchet visual oracle artifacts only. This skill never proves code complete.

## Core Rule

Do not run update mode, snapshot update, or baseline overwrite until human explicitly approves that update.

Green in this loop means one thing: focused visual oracle matches current render. It does not mean implementation is done, other tests passed, or code is safe to commit.

## Workflow

1. Identify focused visual test command and exact oracle files.
2. Run focused visual test without update mode.
3. If green, end this subroutine and return:
   - `artifact_ratchet: false`
   - `update_needed: false`
   - `verification_scope: focused visual oracle only`
   - `code_complete: unknown`
4. If red, locate generated artifacts:
   - current/blessed oracle
   - fresh actual render
   - diff image
5. Open/review oracle, actual, and diff before editing code or asking approval.
6. If failure cause is clearly a general code bug and user already asked to iterate, fix code and loop from step 2.
7. If visual result is acceptable or needs taste judgment, write review md next to failure images.
8. Stop before update mode and ask human approval.
9. After explicit approval, run focused visual test with update mode.
10. Re-run focused visual test without update mode.
11. Verify failure artifacts and review md are ignored/untracked or removed.
12. Return:
    - `artifact_ratchet: true`
    - `approved_oracles: [...]`
    - `verification_scope: focused visual oracle only`
    - `code_complete: unknown`

## Review MD

Create one review md per failing fixture, beside failure images.

Name:

```txt
<fixture>.failure.review.md
```

Required format:

```md
# what changed

1. ...

# why it is ok

1. ...

# remarks

1. ...
```

Rules:

1. Use exactly these H1 headings: `# what changed`, `# why it is ok`, optional `# remarks`.
2. Use numbered list items only under each heading.
3. Use caveman language: terse fragments, no filler, no hedging.
4. Mention actual/diff/oracle paths in numbered items when helpful.
5. No prose outside headings and numbered items.
6. Do not include code fences unless user asks.

Example:

```md
# what changed

1. Right shelf gone.
2. Bottom padding more even.
3. Glow noise only at edge.

# why it is ok

1. Shape still hugs target.
2. Padding rule stronger.
3. No center dot.

# remarks

1. Human call: corner taste.
```

## Anti-Churn

1. Do not treat oracle approval as code approval.
2. Do not update all screenshots blindly.
3. Do not review only final updated images; review diff before update.
4. Do not use external diff tools when test framework already emitted actual/diff artifacts.
5. Use external image diff only for recovery, e.g. baseline already overwritten.
6. If artifact location/naming is unclear, inspect test framework config/source before guessing.
7. If generated failure artifacts could be committed, add/verify ignore rules before approval flow completes.

## Parent Workflow Contract

This skill returns evidence to caller. Caller decides next verification.

Never claim:

1. Feature complete.
2. No regressions.
3. Broad test safety.
4. Ready to merge.

Allowed claim:

1. Focused visual oracle passed.
2. Human approved oracle update.
3. Oracle files ratcheted.

## Adapter Skill Contract

Framework-specific skills should layer on this algorithm and define:

1. How to run focused test without update mode.
2. How to run focused test with update mode.
3. Where oracle files live.
4. Where actual/diff artifacts emit.
5. How to name review md files.
6. How to verify failure artifacts cannot be committed.
7. What "green" means for that framework.
