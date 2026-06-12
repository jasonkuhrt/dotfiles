# /readme — Help

The `/readme` skill writes, updates, and reviews README.md and CONTRIBUTING.md files, enforcing structural guarantees and semantic term ordering. It works across libraries, CLI tools, monorepos, apps, and utilities.

## Quick Start

```
/readme                                    # Smart dispatch — figures out what to do
/readme rewrite from scratch               # Full create regardless of existing README
/readme update the concepts section        # Targeted update
/readme add the new auth feature           # Add coverage for specific work
/readme review the quickstart              # Check a section for accuracy
/readme help                               # This guide
/readme update all in this project         # Every package, queued
/readme update all affected by this pr     # PR-scoped
/readme review the packages I touched      # Git-scoped by recent work
/readme update the contributing guide      # CONTRIBUTING.md only
```

## Operations

**create** — No README exists yet, or you want a full rewrite. The skill reads your project's source code, design docs, package manifest, and tests, classifies the project archetype, builds a term dependency graph, writes a complete README, and validates with a review (four reader personas testing comprehension in parallel).

**update** — A README exists and needs changes. The skill identifies which sections are affected and rewrites them while preserving everything else. It then verifies that semantic term ordering still holds across the full document.

**review** — Assess quality without modifying. The skill loads the actual project source truth first (expensive but required to catch omissions), then runs quality checks, and spawns four reader personas in parallel — new user, evaluator, practitioner, returning maintainer — each with three comprehension questions. Findings are triangulated: if multiple personas struggle with the same area, the issue is escalated.

You can override auto-detection by passing a natural language instruction. "rewrite from scratch" forces create. "review the glossary" runs a targeted review.

## Files

The skill manages two companion files as a pair:

- **README.md** — onboards users (always included)
- **CONTRIBUTING.md** — onboards contributors, including future-you after a week away (included when relevant)

When creating a README, the skill also creates CONTRIBUTING.md if the project has contributors. When reviewing, it checks both files for drift.

## Guarantees

Every README satisfies four hard rules:

**G1: Required Sections in Fixed Order.** Title + One-liner, Problem, Solution, Quickstart, Concepts, Usage, API Overview, Glossary. Broadest to most specific (cognitive funneling).

**G2: Semantic Term Ordering.** No domain term appears before it has been formally introduced. Topological sort of the concept dependency graph.

**G3: Heading Density.** Every heading has at least 100 words of prose beneath it. Thin headings get merged into narrative sections.

**G4: Term Linking.** Domain terms link to the glossary using `` [`term`](#term) `` backtick links, visually distinct from external links.

## Anti-Slop

Banned words ("powerful", "flexible", "seamless", "robust", "elegant", "groundbreaking"), banned phrases ("Let's dive in", "under the hood", "In order to" → just "To"), and banned structures (sections that open by describing what they cover, paragraphs restating type signatures in prose, synonym cycling).

## Design Rationale and Sources

See `~/.claude/skills/readme/references.md` for the research that informed this skill's design.
