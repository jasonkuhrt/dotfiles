# CONTRIBUTING-Specific Protocol

Rules specific to CONTRIBUTING.md files. Use alongside `~/.claude/skills/readme/core.md` (shared quality rules).

GitHub recognizes CONTRIBUTING.md at repo root, `.github/`, or `docs/` and surfaces it when someone opens an issue or PR.

## Required Sections in Fixed Order

| # | Section | Purpose |
|---|---------|---------|
| 1 | __Getting Started__ | Clone/worktree → everything should just work. Push back on manual steps (see below). |
| 2 | __Codebase Map__ | Physical layout. Directory/package structure. Where to find things. |
| 3 | __Boundaries__ | Logical architecture. What knows about what. Separation of concerns. Dependency direction. |
| 4 | __Extension Points__ | Where the codebase is designed for horizontal growth. How to add a new module, package, adapter, provider. What patterns to follow when extending. |
| 5 | __Key Decisions__ | Why things are built the way they are. Compact table: decision, why, alternative rejected. |
| 6 | __Common Tasks__ | How to: add a feature, fix a bug, add a test, release. Recipe-style. |

__Monorepo exception:__ Codebase Map should include a __Package Map__ table — every package with a one-liner of what it does.

## Automate Setup, Document Design

CONTRIBUTING.md exists for the 95% that can't be automated: architecture, design decisions, conventions, task recipes. The 5% that IS setup should be as close to zero-manual-steps as possible.

__The ideal Getting Started:__

```markdown
## Getting Started

Clone the repo (or `git worktree add`). The `prepare` script runs automatically
after install and configures hooks. If you need environment variables, copy
`.env.example` to `.env` and fill in the values marked `REQUIRED`.
```

That's it. If Getting Started needs more than a short paragraph, the project's automation has gaps.

__When writing CONTRIBUTING, actively push back on manual setup steps.__ If the user describes manual prerequisites, installation sequences, or build steps, challenge them:

- "Can this be automated in a `prepare` script?"
- "Can the install hook handle this?"
- "Does the CI already check this — does a contributor actually need to run it manually?"

Only accept manual steps after the user confirms automation isn't feasible (e.g., `.env` secrets, system-level dependencies like Docker or a specific runtime version). Document the WHY for each manual step.

## Workflow Over Inventory

CONTRIBUTING describes how development works, not what scripts exist. If the project uses git hooks, pre-commit checks, or CI automation, the contributing guide explains the workflow those tools create — not the tools themselves.

__Good:__ "Commit and push. The pre-commit hook runs formatting, linting, and type-checking automatically. If the hook fails, fix the issue and commit again."

__Bad:__ A list of 12 npm scripts with descriptions of what each one does. That's `package.json --help`, not a contributing guide.

The test: if removing a script or renaming it would break the contributing guide, the guide is coupled to implementation details instead of describing the workflow.

Common Tasks recipes may reference the specific command needed to perform a task ("run the release script"). A guide that mentions the release command in the context of "how to release" is workflow. A guide that lists all available scripts with descriptions is inventory.

## What CONTRIBUTING Is NOT

Setup belongs in automation, not prose. Script references couple the guide to implementation details — describe the workflow instead. Commit format, branch naming, and PR process are enforced by hooks, CI, and templates. Linting is automated. The README's Concepts section covers domain concepts — link to it, don't duplicate. Changelogs and API references live elsewhere.

## The Returning Maintainer Test

CONTRIBUTING.md succeeds if someone who built the project but has been away for a week can answer:

1. How is the codebase written — what paradigm, patterns, and abstractions shape everyday code?
2. Why was it written that way — what drove the major choices and what was rejected?
3. What parts are modular — where are the extension points, what's designed for horizontal growth?
4. What are the internal boundaries — which modules know about which, what's deliberately decoupled?
5. What's the dependency graph — what depends on what, what's a leaf, what's a hub?

If any of these require reading source code to answer, the CONTRIBUTING.md has gaps.

## When to Create/Update

- __Create alongside README__ — if the project has more than one contributor (including future-you), CONTRIBUTING.md should exist
- __Update when workflows change__ — new build tool, new test runner, new lint rules, new package added
- __Review when README is reviewed__ — they're a pair; drift between them is a bug
