---
name: top-down-make-types-pass
description: Companion to top-down. Use when the user invokes top-down-make-types-pass, or says to make the types pass while working top down. Raises the bar from "the top is written" to "the program type-checks", with every implementation still omitted.
---

# Top down: make the types pass

The user's decision, inside top-down mode, to raise the bar on types. It
releases one thing the mode gates: the type check, and the work of making it
pass. The mode stays on, and nothing that needs a running program starts.

Its argument is what to bring to passing: a package or a path. With none, it is
everything the top-down work has touched.

## What you do

1. **Run the type check the project provides, the way the project allows.**
   Where a project restricts where a compiler may run, that restriction stands:
   say what the check then needs, such as a push and a CI run, and let the user
   decide.
2. **Fix each error with types.** A signature completed, a generic given its
   constraint, a missing declaration written, an import corrected. A body stays
   a placeholder: change one only so that it satisfies its signature.
3. **Never reach passing by weakening the top.** No `any`, no cast and no
   suppression on anything a consumer sees. A cast belongs only inside a
   placeholder body.
4. **Stop at an error that questions the top.** When an error says the top
   cannot be typed as it is written, that is a question about the shape, and the
   shape is the user's. Show the error and the few lines of top it is about, and
   change nothing there.
5. **Go on until the check passes for the scope,** or until only questions of
   that kind are left.

## What it does not release

Implementations, tests, lint, builds, reviews and workers stay gated by the
mode. Making the types pass never means making the code run.

## When it ends

Say one of two things, and return to the mode:

- The types pass for the scope, with every body still omitted.
- These errors are left, and each is a question about the top.

Level 3 of the mode, running, opens only once the types pass for all of the
work, and only at the user's word.
