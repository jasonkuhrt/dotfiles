---
name: diverge
description: Use when designing an abstraction (a library API, a data type, a config shape, a module or file layout, a protocol) and before picking among designs; when the user invokes diverge, asks to brainstorm, asks "what else could it be", "what are the options" or "what are the alternatives", or states a strong judgment about a design that should open the space rather than close it. Puts designs that differ in kind on the table, each written as the same example from the user's side, and holds every judgment until all of them are shown.
---

# Diverge

Design most often goes wrong before anything is judged: the first shape that
comes to mind becomes the only one weighed, and every later question is about
its details. Diverging is the step that prevents it. Designs that differ in kind
go on the table first, and judging starts only once they are all there.

Jason, 2026-11-03, after a cell design question went straight to a table of
three picks: "i seem to be missing a skill that would apply divergent
brainstorming during abstraction design".

- Bad: asked "files or large files, one cell value or not, spec apart from impl
  or not", replying with one pick per question and one design.
- Good: nine Event cells, each written its own way (the folder is the cell, one
  value, the row that guards its rules, no cell at all, everything a message,
  rules as declared constraints, …), side by side, before anything is picked.

## What a reply holds

1. **The job, in one sentence**, from the user's side: what someone writes and
   what they get. Every candidate is held to it.
2. **The axes**: the questions on which designs for this job can differ. Name
   them before generating, so the candidates spread across them instead of
   clustering. Common ones:
   - where the truth lives: data, code, a convention (a folder, a file name), a
     generator;
   - one value or many, and who composes them: the author, a framework, a build
     step;
   - declared or inferred;
   - granularity: one per item, one per group, one per system;
   - when it is decided: build time, start-up, call time;
   - who owns or decides what;
   - nothing: the abstraction deleted, and what users write instead.
3. **The candidates**, at least six, each a different point on at least one
   axis. Among them:
   - the obvious one, written at its best;
   - the smallest one, with the abstraction deleted;
   - each extreme of an axis, such as everything in one value, or everything by
     convention;
   - one borrowed from prior art outside the codebase, named by its source
     (another framework, language or field);
   - one inverted, where who owns or decides what is flipped;
   - one where a constraint everyone assumes is gone.
4. **Each candidate written as the same realistic example**, from the user's
   side, so they compare line by line. Pseudo code is fine: the shape is the
   point.
5. **What each buys**, in one line, only once every candidate is shown: what it
   makes easy that the others don't. Not a cost and not a verdict.
6. **Combinations**: two or three hybrids that take one idea from each of two
   candidates, when a pair suggests one.

The reply ends there, or with one question: which candidates to keep. Picking is
the next step, and the user starts it.

## Rules

- **Candidates differ in kind.** Two candidates that make the user write the
  same code are one candidate. A renamed key or a moved argument is not a new
  candidate.
- **Nothing is judged while generating.** No costs, no "but", no ranking and no
  recommendation until every candidate is shown. A candidate the agent would
  never pick still goes on the table, written as its best advocate would write
  it. A strawman fails.
- **Stay above the codebase.** Don't read code to see what exists or whether a
  candidate is feasible: feasibility belongs to converging. What exists today is
  one candidate at most, never the frame.
- **Wish, don't prove.** A candidate may assume a library feature or a language
  capability that may not exist. Name the wish once, under it.
- **The space, then the step.** When the user asks to converge, measure the
  kept candidates (for example by the questions each makes the system answer)
  and pick. Diverging again is always allowed: an axis the user names opens a
  new round.

## Showing them

- The candidates are one visual: code sketches side by side, or one block of
  designs compared, each under its own heading, all writing the same example.
- Keep every sketch short: the lines that show its shape, and nothing that is
  the same in every candidate.
