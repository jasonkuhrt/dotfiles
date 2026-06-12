---
name: readme
description: >-
  Use when the user says "/readme", "write a readme", "improve the readme",
  "update the readme", "readme for this project", "contributing guide",
  "write contributing", or when a new package needs its README. Also triggered
  by natural language like "document the new feature in the readme", "refresh
  the readme", or "update the contributing guide".
argument-hint: "[instruction]"
---

# /readme

Interpret the user's instruction, determine the operation, target, focus, and files, then announce the plan and execute.

## Files

This skill manages two companion files:

* __README.md__ — onboards users (default, always included)
* __CONTRIBUTING.md__ — onboards contributors (included when relevant)

When the instruction mentions contributing, development setup, or contributor onboarding, include CONTRIBUTING.md. When creating a README from scratch, also create CONTRIBUTING.md if the project has more than one potential contributor. When reviewing, check both files for drift.

For CONTRIBUTING.md protocol, read `~/.claude/skills/readme/core-contributing.md`.

## Operations

### help

Explain how this skill works. Read and present `help.md` from this skill's directory.

### create

Write a README from scratch. Use when no README exists, or the user explicitly wants a full rewrite. Destructive — overwrites any existing README.

### update

Modify an existing README. Use when a README exists and needs changes — new features to document, stale sections to fix, targeted edits. Preserves what works, rewrites what doesn't.

### review

Assess README quality without modifying it. Use when the user wants to know what's wrong, what's missing, or whether recent work is documented. Reports findings. Does not write unless the user asks.

## Target

Which README(s) to operate on. Orthogonal to the operation.

* __Single__ — one README for the current project (default)
* __Batch__ — multiple READMEs, e.g. every package in a monorepo
* __Git-scoped__ — packages affected by a branch, PR, commit range, or time period

Interpret from the user's natural language. "That branch", "the packages I touched this week", "everything under packages/", "affected by this PR" are all valid. For git-scoped, resolve the reference (`git log`, `git diff`, branch comparison) to determine which packages are affected.

For batch or git-scoped: read `batch.md` from this skill's directory for the queue protocol.

## Focus

Which parts of each README to touch. Orthogonal to both operation and target.

* __Whole__ — the entire README, all sections (default for create)
* __Affected__ — only sections implicated by specific changes (a PR, a branch, recent commits)
* __Named__ — user-specified sections ("just the concepts", "the quickstart and usage")

These combine freely with target:

* all READMEs × only parts affected by this PR
* one README × the whole thing from scratch
* all READMEs × full rewrite from source
* one README × just the concepts section

## Announce, Don't Block

After determining operation, target, focus, and files, announce the plan and execute immediately. Don't wait for confirmation — the announcement is for transparency, not gating.

```
README: UPDATE × packages/cmx × CONTRIBUTING.md × development workflow section
```

```
README: CREATE × packages/cmx × README.md + CONTRIBUTING.md × whole
```

```
README: REVIEW × 5 packages affected by PR #42 × README.md × affected sections
```

If you cannot confidently determine any dimension, ask. Do not guess.

## Inference

When the user's instruction doesn't name an operation explicitly, infer from context:

* User asks about the skill itself ("help", "how does this work", "what can you do") → __help__ (takes precedence)
* No README exists → __create__
* README exists + conversation has recent implementation work → __update__
* README exists + git working tree is dirty → __update__
* README exists + no recent context + clean git → __review__
* User says "rewrite", "from scratch", "start over" → __create__
* User says "refresh", "add", "fix", "change" → __update__
* User says "review", "check", "audit", "how does it look" → __review__

## File Sequencing

When both README.md and CONTRIBUTING.md are in scope, process README.md first. It defines the glossary that CONTRIBUTING.md links to. Each file runs its own pipeline — do not merge protocols.

## Execution

After confirmation, read the operation's file from `~/.claude/skills/readme/`:

| Operation | README.md | CONTRIBUTING.md |
|-----------|-----------|-----------------|
| create | `create.md` + `core.md` + `core-readme.md` | `create.md` + `core.md` + `core-contributing.md` |
| update | `update.md` + `core.md` + `core-readme.md` | `update.md` + `core.md` + `core-contributing.md` |
| review | `review-readme.md` + `core.md` + `core-readme.md` | `review-contributing.md` + `core.md` + `core-contributing.md` |

Only the files needed for the determined operation + file combination are loaded.
