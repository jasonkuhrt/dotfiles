---
name: brainstorm-iterate
description: >
  Run a structured proposal/review/iterate loop on any design topic.
  Produces N iterations (default 5) where each iteration's proposal
  addresses the previous iteration's adversarial review. Use this skill
  whenever the user wants to brainstorm, iterate on a design, run a
  proposal/review cycle, stress-test an idea through multiple rounds, or
  says /brainstorm-iterate. Also trigger on "iterate on this design",
  "proposal loop", "refine this idea", "brainstorm N rounds", "evolve
  this design", "run it through review cycles". Works for any topic:
  API design, architecture, data modeling, naming, protocols, processes.
argument-hint: "[topic/prompt and optional iteration count, e.g. 'API design for tagged unions, 7 iterations']"
---

# Brainstorm-Iterate — Proposal/Review/Iterate Workflow

You are orchestrating a structured iteration loop that progressively refines a
proposal through adversarial review. Each iteration builds on the previous
review's findings to produce a stronger design.

## Step 1: Parse Input

Extract from `$ARGUMENTS`:

- **Topic/prompt** — the design question, problem statement, or initial idea
- **Iteration count** — look for patterns like "N iterations", "N rounds", "N
  cycles". Default: 5

If `$ARGUMENTS` is empty, ask the user for a topic before proceeding.

## Step 2: Create Directory Structure

Create the output directory in the current working directory:

```
/brainstorm/
  iteration-1/
    proposal.md
    review.md
  iteration-2/
    changes.md
    proposal.md
    review.md
  ...
  iteration-N/
    changes.md
    proposal.md
    summary.md
```

Note: `iteration-1` has no `changes.md` (nothing to compare against). The final
iteration has no `review.md` (it is the converged output) and adds `summary.md`.

Create the `/brainstorm/` directory up front. Create each `iteration-{n}/`
subdirectory as you enter that iteration.

## Step 3: Run Iteration Loop

For each iteration 1 through N, dispatch a **sub-agent** to produce the
iteration's artifacts. Using a sub-agent for each iteration is critical — it
provides fresh perspective and prevents anchoring to earlier reasoning.

### Sub-agent prompt template

Each sub-agent receives a self-contained prompt. Build it from these pieces:

#### For iteration 1:

```
You are producing iteration 1 of a design brainstorm.

## Topic

{topic/prompt from the user}

## Your task

Write a proposal addressing this topic. Be concrete and specific — not a
survey of options, but a committed design with clear choices and rationale.

Write the proposal to: {absolute path}/brainstorm/iteration-1/proposal.md

Then write an adversarial review to: {absolute path}/brainstorm/iteration-1/review.md

The review should be a tough, skeptical critique. Find:
- Logical gaps or unstated assumptions
- Edge cases and failure modes the proposal ignores
- Simpler alternatives that weren't considered
- Internal contradictions or hand-waving
- Scalability, maintainability, or composability concerns
- Anything that "sounds good" but doesn't survive scrutiny

Be specific. Reference exact sections of the proposal. Propose concrete
alternatives where you identify weaknesses, not just "this could be better."

Rate the proposal's overall strength: Strong / Moderate / Weak, with a
one-sentence justification.
```

#### For iterations 2 through N-1:

```
You are producing iteration {n} of a design brainstorm.

## Topic

{topic/prompt from the user}

## Previous proposal (iteration {n-1})

{contents of iteration-{n-1}/proposal.md}

## Review of previous proposal

{contents of iteration-{n-1}/review.md}

## Your task

1. Write a changes summary to: {absolute path}/brainstorm/iteration-{n}/changes.md

   Describe what changed between the previous proposal and this one. Be specific:
   which parts were kept, which were revised, which were replaced entirely, and why.

2. Write a revised proposal to: {absolute path}/brainstorm/iteration-{n}/proposal.md

   Address the review's findings. This is not a patch — write the complete
   proposal fresh, incorporating improvements. You may:
   - Accept and fix issues the review identified
   - Reject review points with explicit justification
   - Restructure the proposal if the review revealed structural problems
   - Introduce new ideas that the review's critique inspired

   The proposal should be strictly better than the previous iteration. Do not
   regress on strengths the review acknowledged.

3. Write an adversarial review to: {absolute path}/brainstorm/iteration-{n}/review.md

   Same standards as before: tough, specific, constructive. The review bar
   should stay high even as the proposal improves — find new angles, deeper
   issues, and subtler problems. Do not repeat review points that were already
   addressed. Push harder on:
   - Whether fixes actually resolve the underlying issue or just patch symptoms
   - New problems introduced by the changes
   - Whether the overall coherence improved or degraded
   - Diminishing returns — is the design converging or thrashing?

   Rate the proposal: Strong / Moderate / Weak, with a one-sentence justification.
```

#### For iteration N (final):

Same as iterations 2 through N-1, except:

1. **Do not write a review.md.** The final iteration is the converged output.

2. **Write a summary.md** to: `{absolute path}/brainstorm/iteration-{N}/summary.md`

   The summary provides a high-level narrative of how the design evolved. For
   each iteration, write 2-4 sentences covering:
   - The key idea or stance of that iteration's proposal
   - What the review found (severity, core objection)
   - How it influenced the next iteration

   End with a convergence assessment: when did the design stabilize, what was
   the key oscillation/breakthrough, and the rating trajectory across iterations.

### Dispatching sub-agents

Use the **Agent tool** (subagent / tool_use) to run each iteration. Pass the
full self-contained prompt. Wait for each iteration to complete before starting
the next — each iteration depends on the previous one's output.

After each sub-agent completes, read back the files it wrote to confirm they
exist and are non-empty before proceeding to the next iteration.

## Step 4: Summary

After all iterations complete, present a brief summary to the user:

1. **Convergence assessment** — Did the proposal stabilize, or was it still
   changing significantly in the final iterations?
2. **Key evolution** — The 2-3 most significant changes across all iterations
3. **Final proposal location** — Path to the final `proposal.md`
4. **Review trajectory** — How the review ratings changed across iterations
   (e.g., "Weak -> Moderate -> Moderate -> Strong")

## Principles

- **Fresh eyes each iteration.** Sub-agents prevent anchoring. Each iteration
  re-evaluates from scratch given the prior proposal and review.
- **Complete proposals, not diffs.** Each `proposal.md` is the full design, not
  a patch. A reader should be able to pick up any single `proposal.md` and
  understand the complete proposal.
- **Honest reviews.** The review must genuinely challenge the proposal. A review
  that rubber-stamps a mediocre design wastes an iteration. The review bar stays
  high throughout — as proposals improve, reviews should find deeper issues.
- **Convergence over thrashing.** If reviews keep finding fundamental problems
  after several iterations, the design may need a different starting point, not
  more patches. Note this in the summary if it happens.
- **Generic by design.** This workflow applies to any topic: API design,
  architecture decisions, naming conventions, process design, data models,
  protocol specifications, user experience flows, organizational structures.
  The topic determines the content; the iteration structure is always the same.
