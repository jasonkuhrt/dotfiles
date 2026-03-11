---
name: adversarial-review
description: >
  Generate and dispatch an adversarial staff-level code review prompt.
  Analyzes recent changes (commits on branch, dirty files, or user-specified
  scope), reads the actual code, and produces a detailed, context-specific
  review prompt — then dispatches it to a separate Claude session. Use
  whenever the user asks for an adversarial review, critical review,
  staff-level audit, code roast, or says "tear this apart", "find what's
  wrong", "red team this code", "what did I miss", "poke holes in this",
  "break this", "stress test this design". Also trigger on "hard review",
  "honest review", "brutal review", "no-mercy review", or /adversarial-review.
  Optionally accepts a focus description or commit range.
argument-hint: "[focus area or commit range]"
---

# Adversarial Review — Prompt Generator

You are generating a review prompt, not performing the review yourself. Your job is to analyze the current state of the codebase changes, understand what was done and why, and produce a sharp, context-specific adversarial review prompt that a separate Claude agent can execute independently.

The dispatched agent has no shared context with this session. The prompt you generate must be fully self-contained — it should include everything the reviewer needs to do the job: commit references, file paths, domain context, specific questions, verification commands, and output expectations.

## Step 1: Establish Review Scope

Determine what to review.

### If `$ARGUMENTS` specifies a focus

Parse for:
- **Commit range** — e.g. `abc123..def456`, `HEAD~3`
- **File paths** — specific files or directories
- **Description** — natural language ("the new auth middleware", "recent refactor")

Use this to narrow scope. If a description is given, identify the relevant commits and files.

### If no arguments: auto-detect

1. **Branch diff** — find commits on current branch vs trunk:
   ```bash
   BASE=$(git merge-base HEAD main 2>/dev/null || git merge-base HEAD develop 2>/dev/null || git merge-base HEAD master 2>/dev/null)
   git log --oneline "$BASE"..HEAD
   git diff --stat "$BASE"..HEAD
   ```

2. **If no branch diff** — use dirty (uncommitted) changes:
   ```bash
   git diff --stat HEAD
   git diff --stat --cached
   ```

3. **If nothing** — tell the user there's nothing to review and stop.

## Step 2: Read and Understand the Changes

You need to understand the changes deeply enough to ask the right questions. The dispatched reviewer will re-read the code, but you need to have read it to know *what to ask about*.

1. **Get the diff** to see what changed.
2. **Read changed files** with substantial modifications (not just renames/formatting).
3. **Read adjacent code** — callers, interfaces, types that interact with the changes. The diff alone hides coupling.
4. **Identify the domain** — backend API? Frontend component? Build tooling? Infra? Lint rules? Data pipeline? CLI? The review questions must adapt to the domain.
5. **Identify verification commands** — check `package.json`, `justfile`, `Makefile`, `.github/workflows/`, `CLAUDE.md` for the project's standard check commands.

## Step 3: Generate the Review Prompt

This is the core of the skill. Build a prompt with these sections:

### 3a. Role and Posture

Open with a clear mandate: the reviewer is a skeptical staff engineer performing an adversarial audit. Not a summary. Not a compliment sandwich. The value is in finding what a competent author misses.

### 3b. Scope Declaration

Include concrete references the reviewer can use:
- Commit SHAs with their one-line messages
- The full list of changed files, organized by area
- The base branch / merge-base SHA for comparison
- Working directory path if relevant (worktrees)

### 3c. Design-Level Assessment (Forest)

Before generating detail-level questions, the prompt must ask the reviewer to assess the overall design. This comes first because detail findings are meaningless if the design itself is wrong — fixing bugs in a bad architecture just makes bad architecture harder to replace.

Instruct the reviewer to answer these before diving into files:

- **Separation of concerns**: Does each module/layer/function own exactly one responsibility? Or are concerns tangled — business logic mixed with I/O, parsing mixed with validation, policy mixed with mechanism? Name the specific concerns and whether they're properly separated.
- **Composability**: Can the pieces be recombined, extended, or used independently? Or are they welded together — shared mutable state, implicit ordering dependencies, components that only work in one specific arrangement?
- **Gradual complexity**: Can a reader understand the system layer by layer, or must they load the whole thing into their head at once? Is there a clear path from "what does this do" to "how does this work" to "why was it designed this way"?
- **Cohesion**: Do the things grouped together actually belong together? Or is the grouping by convenience (same file, same sprint, same author) rather than by concept?
- **Overall judgment**: Considering the above — is this design fundamentally sound, or are the detail-level changes polishing something that needs restructuring? Say this plainly before proceeding to findings.

### 3d. Context-Specific Review Questions (Trees)

Generate pointed questions **specific to these actual changes**. Do not use a generic checklist. Each question should reference actual code you read — function names, module boundaries, patterns you noticed.

Draw from these lenses, selecting only what's relevant to the domain:

**Architecture & Boundaries**
- Are the abstraction boundaries in the right place, or drawn where it was convenient?
- Does "clean-looking" code have clean semantics, or is it surface tidiness hiding coupling?
- Is one layer quietly doing another layer's job?
- If there's a plugin/resolver/strategy pattern, are repo-specific assumptions truly isolated?

**Correctness**
- What inputs would break this? What states weren't considered?
- Race conditions, ordering dependencies, implicit execution context assumptions?
- Is type narrowing/inference sound or coincidental?
- For parsing/AST/pattern matching: what valid inputs are silently mishandled?
- Where code assumes "this can't happen" — can it?

**Simplicity & Cognitive Load**
- Does the code minimize what the reader must hold in their head to understand it? Simplicity is about cognitive load, not line count or verbosity. A dense type-level encoding that makes illegal states unrepresentable is simpler than sprawling runtime validation — even if it looks more complex on the surface.
- Are there redundant abstractions — indirection that doesn't carry its weight in clarity or safety?
- Are there places where complexity moved from one layer (types, compiler, structure) into the reader's head (implicit invariants, convention-dependent correctness, "just know" rules)?
- Is complexity in the right place? Complexity in types/schemas/contracts that the toolchain enforces is cheaper than complexity in runtime logic that humans must verify mentally.
- Are there code reuse opportunities being missed — similar patterns repeated across files that should be a shared abstraction?
- Is the code consistent with the project's established patterns and idioms?

**Signal vs. Noise** (for rules, validators, checks, linters)
- Will this produce false positives at scale? Under what conditions?
- False negatives? What valid violations slip through?
- Is `indeterminate`/`unknown` used where appropriate, or does code emit definitive answers when it should hedge?

**Scaling & Evolution**
- What happens at 10x the current scale?
- What's the first change someone will need to make — will this design accommodate or fight it?
- Implicit constraints that will surprise the next person?

**Testing & Verification**
- Are tests testing interesting behavior or just the happy path?
- Do fixtures/examples actually demonstrate edge cases, or just make coverage look complete?
- Is anything tested by coincidence (passes now but for the wrong reason)?

### 3e. Focus Files

List the specific files the reviewer should examine, ordered by importance. Mark which files are the "core" of the change vs. supporting/peripheral.

### 3f. Verification Instructions

Tell the reviewer what to run:
- The project's standard check commands (types, lint, tests — whatever you found)
- Targeted checks relevant to the specific changes
- Base branch comparison: `git show <BASE>:<file>` for files where regression vs. debt distinction matters

### 3g. Output Expectations

Specify the format the reviewer should use:

```
Expectations for the review:
- Start with a design-level verdict: separation of concerns, composability, gradual complexity, cohesion. Is the overall design sound, or are detail-level fixes polishing a structure that needs rethinking? State this before any file-level findings.
- Then findings, ordered by severity (Critical > High > Medium > Low)
- Every finding includes precise file:line references
- Consequences over opinions ("this will throw on null input" not "null handling could be improved")
- Distinguish regressions from pre-existing debt
- Flag misplaced complexity (invariants enforced by convention instead of structure, indirection that doesn't pay for itself, repeated patterns that should be shared) with the same severity as bugs — they compound
- If the architecture is genuinely clean, say that in one sentence. If it only looks clean, explain where the illusion breaks
- If no findings, say that explicitly, then list residual risks and testing gaps
- Do not optimize for politeness. Optimize for correct, concrete, and useful.
```

## Step 4: Present and Dispatch

1. Show the generated prompt to the user in a code block so they can see what's being sent.
2. Ask: "Dispatch this review, or adjust anything first?"
3. On confirmation, use the `/dispatch` skill to launch it in a new Claude session.

If the user prefers to run it themselves or in the current session, just present the prompt.

## Principles

- **The prompt is the product.** Your job is done when the prompt is sharp. The reviewer does the actual review.
- **Specificity over coverage.** Five pointed questions about real code beat twenty generic ones. Every question should reference something you actually saw in the diff.
- **Self-contained.** The dispatched agent has zero context from this session. Include everything: paths, SHAs, commands, domain context.
- **Proportional depth.** A 3-file config change gets a focused prompt. A new subsystem gets a thorough one with many review angles. Match the prompt's depth to the risk of the changes.
- **Simplicity is a first-class concern.** Complexity in the wrong place — invariants in the reader's head instead of the type system, indirection that adds cost without adding clarity, convention-dependent correctness that could be structural — these are bugs that manifest slower. The reviewer should hunt for misplaced complexity as aggressively as correctness issues.
