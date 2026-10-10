# Independent review brief template

Fill this template for the review at hand. The instantiated brief goes beside
the report, not in the skill directory.

---

# Independent review for Jason

Jason requested an independent review by <reviewer label> using <model> at
<effort> effort. You are the reviewer. Review it yourself; do not delegate or
switch models or effort.

## Input and intent

Repository: <absolute path>.
Immutable review input: <absolute path>.
Baseline: <branch, exact commit/base, relevant working-tree state>.
Working artifact, if different: <absolute path>.

Jason's request and subsequent constraints:

> <Verbatim relevant request and corrections.>

<Explain proposed decisions versus approved work, and what outcome is wanted.>

## Review

Independently challenge the proposal; agreement is not the objective. Read the
input, applicable repository rules including symlinked rules, relevant skills,
source, and real consumers. Use installed dependency source and documentation
for claims that depend on a particular version. Keep commands anchored to the
repository with absolute paths or an explicit working directory, and quote
search globs.

Review these consequential questions:

<A bounded task-specific list: architecture and ownership, native capability
reuse, consumer behavior and DX, contracts and errors, lifecycle and
concurrency, package and configuration changes, deletion claims,
implementation order, and proof.>

Distinguish verified facts, recommendations, and assumptions. Do not use a
compatibility compromise where Jason requested an ideal final design. Give each
finding its source evidence, consumer consequence, and a concrete correction.
Keep cost estimates separate from architectural judgment. Once the material
questions have evidence, write the review; avoid extending a census without a
specific unresolved question.

This is read-only except for the report below. Do not edit source or the
author's plan. Do not run tests, typechecks, lint, builds, generation,
installations, servers, database operations, commits, pushes, or external
communications. <Replace only the relevant prohibition if Jason explicitly
authorized a check.>

## Relay

Write the finished review to <absolute report path>. The coordinating Codex
chat will read this file; do not guess its cmux surface, send terminal
keystrokes, or launch another Codex session.

Include:

- Active model and effort if verifiable; distinguish them from requested
  settings.
- A short ready or revise verdict and reason.
- Consequential findings in priority order, with input section or change,
  verified file and line, consequence, and recommended correction.
- Decisions for Jason with a recommendation.
- Brief agreements and evidence or check limits.

Only after the report is finished, make its final nonempty line exactly:

INDEPENDENT_REVIEW_COMPLETE

Then print a short terminal completion message naming the report. Remain in
this Claude session for focused follow-up questions. If blocked, state the
blocking condition; do not add the completion marker to an unfinished review.
