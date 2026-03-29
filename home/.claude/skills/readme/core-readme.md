# README-Specific Protocol

Rules specific to README.md files. Use alongside `~/.claude/skills/readme/core.md` (shared quality rules).

## G1: Required Sections in Fixed Order

Every README has these sections in this order. None may be omitted. Structure goes broadest to most specific — cognitive funneling.

| # | Section               | Purpose                                                                                     |
| - | --------------------- | ------------------------------------------------------------------------------------------- |
| 1 | __Title + One-liner__ | What is this, in one sentence. Comprehensible without reading further — no jargon.          |
| 2 | __Grounding__         | What domain is this in? 1-3 sentences using only concepts the reader already has.           |
| 3 | __Problem__           | What sucks without this. Concrete, not abstract.                                            |
| 4 | __Solution__          | How this solves it. Three paragraphs max. No undefined terms.                               |
| 5 | __Quickstart__        | Get running in <5 minutes. Copy-pasteable. Every step must succeed.                         |
| 6 | __Concepts__          | Mental model. Narrative prose, dependency-ordered. Not a concept-per-heading dump.           |
| 7 | __Usage__             | Common tasks solved with real, copy-pasteable examples.                                     |
| 8 | __API Overview__      | Brief surface area. Points to reference docs, not exhaustive inline.                        |
| 9 | __Glossary__          | Every domain term, alphabetical, one definition each.                                       |

__Monorepo root exception:__ Replace Quickstart with __Getting Started__ (workspace setup + choosing a package), replace API Overview with __Package Index__ (table of packages with one-line descriptions), and adapt Concepts to cover architecture and how packages relate. The other sections apply as-is.

## G2: Semantic Term Ordering

No domain term may appear in prose before it has been formally introduced — meaning: the term appears in a bold-lead definition or as the subject of a paragraph that explains what it is.

This extends to the domain itself. The Grounding section must establish what kind of thing the project is before the Problem section can describe what's wrong within that domain. A reader who doesn't know the domain cannot evaluate the problem.

__Before writing Concepts:__

1. List every domain term the README will use
2. Draw dependency edges (which terms reference which)
3. Topologically sort — this IS the introduction order
4. Write following that sort
5. Self-verify: each term's first substantive appearance must be its definition

Cycles: introduce both terms together in one paragraph, simpler concept leading.

Example dependency graph:

```
capability  → (none)
slot        → (none)
command     → capability, slot
module      → capability, command
scope-node  → module, command
resolution  → command, frontier, slot
```

Introduction order: capability, slot, command, module, scope node, resolution.

## G4: Term Linking

Domain terms in prose use backtick links to the glossary: `` [`term`](#term) ``.

Visually distinct from external links and plain code references. Use liberally after a term's first introduction. Glossary entries use `####` headings for anchor targets.

## Section Guidance

__Title + One-liner__: Generate 5 candidates. Pick the one naming something unique to THIS project. Two tests: (1) could this describe a different project? If yes, reject it. (2) Can a developer understand it without reading further? If it requires domain knowledge to parse, simplify. No jargon in the one-liner.

__Grounding__: 1-3 sentences establishing what domain this project operates in, using only concepts the reader already has. Name the real-world things the reader already knows (command palettes, toolbars, keyboard shortcuts) before introducing the project's perspective on them. No project-specific terms yet — those come in Concepts. This paragraph is the bridge between "here's a name" and "here's what sucks."

__Problem__: 2-4 sentences. No jargon. A developer who has never heard of this project should understand what sucks. Be concrete: name the specific pain, not a category of pain.

__Solution__: ≤3 paragraphs. Only terms already introduced or common knowledge. NOT a feature list. Describe the approach and the key insight, not the feature set.

__Quickstart__: Prerequisites → install → first meaningful use → what just happened. Copy-pasteable. Every step produces visible output. Under 5 minutes. Assume a completely fresh machine. Explain rationales beyond commands — not just "run this" but why.

__Concepts__: Narrative prose following topological sort. Bold-lead definitions woven into flowing paragraphs. [`term`](#term) links after first introduction. Reader builds complete mental model by reading linearly. This is the hardest section — it must teach, not list.

__Usage__: 3-7 examples for libraries, 1-3 for small tools. Each solves a real task. Code must be copy-pasteable or clearly marked illustrative. Each example has a one-sentence motivation ("When you need to X, use Y").

__API Overview__: Table of exports with one-line descriptions is the ceiling. Point to generated reference. Do not duplicate the full API inline.

__Glossary__: Every domain term introduced in the README. Alphabetical. `####` headings for anchor targets. One concise definition each. The glossary is reinforcement, not the place of first introduction.

## README Anti-Patterns

### Architecture Dump

```markdown
### Module
[3 sentences]
[code block]
### Capability
[3 sentences]
[code block]
```

An API index cosplaying as a README. Fix: narrative prose introducing concepts in dependency order within flowing paragraphs under fewer, meatier headings.

### Premature Detail

A README that exhaustively documents ranking formula coefficients and temporal decay models. This belongs in separate docs. The README mentions that the system exists, explains why it matters, shows one example of its effect, and links out.

### Forward References

"The [`scope tree`](#scope-tree) determines which [`commands`](#command) are visible." — but neither term has been introduced yet. Two undefined terms in one sentence.
