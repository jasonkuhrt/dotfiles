---
name: vitest-browser-visual-oracle-ratchet
description: >-
  Run the visual-oracle-ratchet workflow specifically for Vitest Browser
  screenshot tests using toMatchScreenshot. Use when Vitest Browser screenshot
  tests fail, when updating Vitest screenshot baselines, when reviewing Vitest
  actual/diff artifacts, or before running Vitest with -u for screenshots.
---

# Vitest Browser Visual Oracle Ratchet

Use `visual-oracle-ratchet` as core algorithm. This skill only adapts Vitest Browser details.

## Vitest Meanings

1. Oracle file: blessed screenshot from `toMatchScreenshot`.
2. Actual file: fresh render from failed comparison.
3. Diff file: visual delta from failed comparison.
4. Update mode: Vitest snapshot update, usually `-u`.
5. Green: focused Vitest Browser screenshot assertion passed only.

## Required Config Shape

Prefer peer artifacts beside oracle:

```txt
fixture.png
fixture.failure.actual.png
fixture.failure.diff.png
fixture.failure.review.md
```

Required ignore rules:

```gitignore
**/*.failure.actual.png
**/*.failure.diff.png
**/*.failure.review.md
```

If repo uses different names, inspect Vitest config and adapt. Do not guess paths.

## Workflow

1. Find focused Vitest Browser command from package scripts, repo docs, or prior user command.
2. At the start of a testing session, delete existing `*.failure.actual.png`, `*.failure.diff.png`, and `*.failure.review.md` files unless you personally have current-session memory of the test run that emitted them.
3. Run focused command without `-u`.
4. If green, return to caller:
   - `artifact_ratchet: false`
   - `update_needed: false`
   - `verification_scope: focused Vitest Browser screenshot only`
   - `code_complete: unknown`
   - Do not inspect baselines, probe geometry, open screenshots, or continue the visual-oracle flow.
   - A green focused run means this oracle task is done; resume the caller's prior implementation/debugging task.
5. If red, read Vitest failure output for reference/actual/diff paths.
6. If paths absent, inspect `browser.expect.toMatchScreenshot` config:
   - `resolveScreenshotPath`
   - `resolveDiffPath`
   - `screenshotDirectory`
   - `attachmentsDir`
7. Derive the HARD ORACLE for each failed fixture from the NON-pixel artifact — the
   path `d` coordinates, vertex counts, segment angles, bounds — and from it state a
   FALSIFIABLE PREDICTION of what the visual artifact must show ("the diff highlights
   only the lower-right band; the top two lines are byte-identical"). This is the
   agent's required work (see Reason From The Oracle, Then Predict). Then open the
   fixtures for the DEVELOPER (see Developer Review Affordance). Do NOT read the
   rendered images yourself to form a verdict (see Why The Agent Does Not Review Pixels).
8. The developer confirms or falsifies your prediction per fixture. A falsified
   prediction means your oracle reasoning is wrong — fix the analysis or the code,
   never re-predict by eye.
9. If the developer reports a code bug (not an acceptable baseline change), fix the code and loop from step 3.
10. Only after the developer explicitly approves a fixture's new render, run focused command with `-u`.
11. Re-run focused command without `-u`.
12. Verify `*.failure.actual.png`, `*.failure.diff.png`, and `*.failure.review.md` are not staged.
13. Report:
    - `artifact_ratchet`
    - `approved_oracles`
    - `verification_scope: focused Vitest Browser screenshot only`
    - `code_complete: unknown`

## Why The Agent Does Not Review Pixels

What's banned is pixel-PLAUSIBILITY review: validating a render by whether it LOOKS
like the expected change ("a small smoothing — looks fine") instead of by the
domain's HARD INVARIANTS ("an orthogonal contour never contains a diagonal"). A
render that violates an invariant but looks like a plausible edit passes that review
and wastes tokens loading the image. So never load the rendered image to form a
verdict.

What's REQUIRED is the opposite of staying silent. Reason from the HARD ORACLE — the
path `d` coordinates, vertex counts, segment angles, bounds — which carry the
invariants in checkable numeric form, no pixels needed. "Open the image and say
nothing" is the other failure mode: it routes a raw picture with no claim and makes
the developer hunt unaided. The agent does the invariant reasoning the developer
shouldn't have to, then hands over a falsifiable claim; the developer's glance checks
it. A bare routed image is delegation, not leverage.

## Reason From The Oracle, Then Predict

Two kinds of visual change, handled differently:

- INVARIANT-CHECKABLE (orthogonality, outward-only, single-loop, containment,
  monotonic widths…): a hard oracle exists. Extract it from the path data and PREDICT
  what the artifact must show, specifically and falsifiably — "the diff highlights
  only the strip right of line 3; the top two lines are byte-identical." The
  developer's glance then confirms or falsifies one claim in ~1 second, and a mismatch
  instantly localizes a wrong analysis or a real code bug. For this case the agent is
  near-self-sufficient; the developer is the final gate, not the primary detector.
- PURE TASTE ("does this curve feel elegant", weight/spacing aesthetics): no oracle to
  predict from. The developer's eye is genuinely irreplaceable. Say plainly it's a
  taste call and route without a prediction.

Never collapse the two into "don't look." Producing the prediction for the
invariant-checkable case is the whole point of the agent's involvement.

## Developer Review Affordance

Open the failed fixtures in a VS Code window the developer reviews directly so they
can confirm/falsify the prediction: the `__screenshots__` folder in the explorer, and
per fixture a `--diff` of baseline ↔ actual (VS Code's image diff — side-by-side /
swipe / onion-skin) plus the precomputed diff image.

```bash
DIR="<absolute path to the test's __screenshots__/<testfile> dir>"
code -n "$DIR"
for f in <failed-fixture-base-names>; do
  code --diff "$DIR/$f.png" "$DIR/$f.failure.actual.png"   # baseline ↔ actual
  code "$DIR/$f.failure.diff.png"                          # highlighted delta
done
```

Adapt `code` to the developer's editor CLI if different (`cursor`, `code-insiders`).

## Hard Stops

1. No `-u` before explicit developer approval of that fixture.
2. No broad screenshot update.
3. No pixel-plausibility self-review. Reason from the path/coordinate oracle, state a falsifiable prediction, THEN route the pixels to the developer to confirm/falsify.
4. No claim beyond visual oracle ratchet.
5. No commit if failure artifacts are staged.
6. No extra investigation after a green focused run. Green terminates this skill.
