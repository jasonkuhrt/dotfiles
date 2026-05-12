# README-Specific Protocol

Rules specific to README.md files. Use alongside `~/.claude/skills/readme/core.md` (shared quality rules).

## Cardinal Rule: Public/Private Surface Separation

**HARD RULE. NO EXCEPTIONS WITHOUT EXPLICIT USER OVERRIDE.**

Every README emitted by this skill ships to OSS consumers who do NOT have the author's filesystem, sibling repositories, personal helpers, or local dev conventions. The following are PROHIBITED in every README under this skill's control:

1. __Local filesystem paths.__ No `~/projects/...`, no `/Users/...`, no absolute paths to the author's machine. `~/.config/<package-name>/` is allowed ONLY when documenting the package's own default config path — verify against the package's own code, not author convention.
2. __Relative paths to sibling repositories.__ No `[other-package](../other-package)`, no `[../sibling]` cross-repo links. Cross-references between OSS packages use NPM package names in backticks: `` `@scope/package` ``. URLs to canonical OSS locations (npm, GitHub) may be added only when the URL is known to be stable and public.
3. __Phrasings that assume the reader shares the author's filesystem layout.__ No "one of three sibling projects in `~/projects/<user>/`", no "in my dotfiles", no "next to the other repos", no "as you can see in the parent directory", no "the user's config", no "Jason's setup".
4. __Author-private helpers named as if canonical.__ If the author has a personal helper (e.g. a `vsmap()` lua helper in their nvim config), do NOT name it in OSS docs as though it were a documented upstream API. Either omit it or describe the behavior generically (what it does, not what the author calls it).
5. __Any sentence that requires author-local context to parse.__ __Litmus test:__ Would a stranger clone this package from npm into a fresh filesystem and understand this sentence? If no, it is a violation.

### Where private context properly lives

Agent memory, personal notes, CLAUDE.md, CLAUDE.local.md, internal dev docs that are NOT shipped with the package. The split between agent-private context and OSS-shipping surface is a hard boundary; the README is unambiguously on the public side.

### Mandatory verification (before declaring create or update done)

Run this grep against the resulting README — for each file written or modified:

```bash
grep -nE '(\.\./[a-zA-Z]|~/projects|/Users/|sibling project|in my dotfiles|in the user|in the author|next to the other|in the parent directory)' <readme-file>
```

Treat ANY match as a Cardinal Rule violation that must be resolved before completion. The ONLY acceptable matches are:

- `~/.config/<package-name>/` referencing the package's own documented default config path (verified against the package's source)
- `../` inside a fenced code block that is illustrating a consumer's own project layout (e.g., a test file importing `../src/extension.ts`) — must be unambiguous from surrounding context

When unsure whether a match is legitimate, strip it. The cost of removing a legitimate path is zero. The cost of leaking author-private context into a published OSS surface is real and durable.

## G1: Required Sections

Every README has these base sections in this order. None may be omitted. Structure goes broadest to most specific — cognitive funneling.

| # | Section               | Purpose                                                                                     |
| - | --------------------- | ------------------------------------------------------------------------------------------- |
| 1 | __Title + One-liner__ | What is this, in one sentence. Comprehensible without reading further — no jargon.          |
| 2 | __Grounding__         | What domain is this in? 1-3 sentences using only concepts the reader already has.           |
| 3 | __Problem__           | What sucks without this. Concrete, not abstract.                                            |
| 4 | __Solution__          | How this solves it. Three paragraphs max. No undefined terms.                               |
| 5 | __Quickstart__        | Get running in <5 minutes. Copy-pasteable. Every step must succeed.                         |
| 6 | __Concepts__          | Mental model. Narrative prose, dependency-ordered. Not a concept-per-heading dump.           |
| 7 | _(conditional sections — see G5)_ | |
| 8 | __Usage__             | Common tasks solved with real, copy-pasteable examples.                                     |
| 9 | __API Reference__     | Every public export: type signature, purpose, configuration. See G6.                        |
| 10 | __Glossary__         | Every domain term, alphabetical, one definition each.                                       |

__Monorepo root exception:__ Replace Quickstart with __Getting Started__ (workspace setup + choosing a package), replace API Reference with __Package Index__ (table of packages with one-line descriptions), and adapt Concepts to cover architecture and how packages relate. The other sections apply as-is.

## G5: Conditional Sections

These sections are **required** when their trigger condition is met. They are not optional extras — they are demanded by what the library does. Detect triggers during source truth extraction (step 2 of create/update). Conditional sections appear between Concepts and Usage, in this order when multiple apply.

| Section | Trigger | Content |
|---|---|---|
| __Architecture__ | Library bridges two or more systems, creates runtime artifacts (functions, processes, connections), or has non-obvious execution lifecycle | What the library creates at runtime and why. How concepts in system A map to system B. Lifecycle diagrams showing control flow. Mapping tables are mandatory for bridge libraries — the mapping IS the library's value. |
| __Observability__ | Library emits OTel spans, metrics, structured logs, or other telemetry | Exhaustive span/metric reference tables (name, source, kind, attributes, when present). Trace tree diagrams showing parent-child relationships. Configuration guidance for collectors. Correlation guidance across trace boundaries. |
| __Error Reference__ | Library exports 3+ typed error classes, or errors are a primary debugging/recovery interface | Every error: when it fires, what it means, retryable vs terminal, recovery path. Table format. Not just names and one-liners — full operational semantics. |

### Trigger detection

During source truth extraction, actively check for these signals:

**Architecture triggers:**
- Imports from 2+ distinct runtime systems (e.g., `effect` + `inngest`, `effect` + `stripe`)
- Creates runtime artifacts: background functions, event listeners, database connections, subscriptions, scheduled tasks
- Has an execution lifecycle that involves multiple phases (setup → run → teardown, or request → suspend → resume)
- Internal callbacks or engine interfaces that map between systems

**Observability triggers:**
- Uses `Effect.withSpan`, `tracer.startActiveSpan`, or any OTel span creation API
- Imports from `@opentelemetry/*` or `@effect/opentelemetry`
- Has span attributes defined in code
- Emits structured logs with correlation IDs

**Error Reference triggers:**
- Exports `Data.TaggedError` classes, custom Error subclasses, or error unions
- Errors surface as the primary debugging interface (defects, typed channels, or catch patterns)
- Error recovery requires caller knowledge (which are retryable, which are terminal, what to inspect)

When a trigger is detected, the corresponding section is **required** — not suggested, not optional. Omitting it is a G5 violation equivalent to omitting Quickstart.

## G6: API Reference Depth

The API Reference section scales to the documentation surface:

- **When an external docs site exists** (generated typedoc, doc site URL in package.json): table of exports with one-line descriptions. Link to the full reference. The README is a signpost.
- **When the README is the sole documentation** (no docs site, no generated reference): full inline reference. Every public export with type signatures, every configuration option with type/default/description, every type alias with purpose. The README IS the reference — there is nowhere else to look.

Detect which mode applies during source truth extraction. Check for `docs` scripts in package.json, `typedoc.json`, doc site URLs in `homepage` field, or `docs/` directories with generated content. Absence of all of these means the README is the sole surface.

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

__Solution__: ≤3 paragraphs. Only terms already introduced or common knowledge. NOT a feature list. Describe the approach and the key insight, not the feature set. Each paragraph should answer a specific pain from the Problem section — if Problem names four pains, Solution should address all four. A Solution that doesn't map back to the Problem is disconnected. Solution explains WHY the approach works; Concepts explains HOW it's structured. Implementation architecture (subsystem names, internal decomposition) belongs in Concepts, not Solution.

__Quickstart__: Prerequisites → install → first meaningful use → what just happened. Copy-pasteable. Every step produces visible output. Under 5 minutes. Assume a completely fresh machine. Explain rationales beyond commands — not just "run this" but why.

__Concepts__: Narrative prose following topological sort. Bold-lead definitions woven into flowing paragraphs. [`term`](#term) links after first introduction. Reader builds complete mental model by reading linearly. This is the hardest section — it must teach, not list. For libraries, each concept should lead with a code block showing creation or usage before the prose explanation — the code IS the introduction, the prose adds understanding. Introduce each concept exactly once; do not briefly introduce a concept in one section and then fully define it later. If the Concepts code blocks are sufficient, Usage can be reduced or omitted — do not duplicate code across sections.

__Usage__: 3-7 examples for libraries, 1-3 for small tools. Each solves a real task. Code must be copy-pasteable or clearly marked illustrative. Each example has a one-sentence motivation ("When you need to X, use Y").

__Architecture__ (conditional, see G5): Opens with what the library creates at runtime — concrete artifacts like functions, connections, or background processes. Then maps concepts between the bridged systems using tables or diagrams. Includes lifecycle diagrams showing control flow for non-obvious execution paths (suspend/resume, multi-phase, signal-based coordination). The mapping table is mandatory for bridge libraries: left column is system A concept, right column is system B mechanism. ASCII diagrams are preferred over prose for flow descriptions.

__Observability__ (conditional, see G5): Opens with the trace architecture — how many trace trees, why they're separate (if they are), what nests inside what. Then an exhaustive span reference: table of every span with name, source (which layer creates it), kind, root status, attributes, and when each attribute is present vs absent. Then OTel configuration guidance (how to register a provider, what the library does by default). Then correlation guidance (how to connect related traces across boundaries). Example queries for common debugging tasks are a bonus.

__Error Reference__ (conditional, see G5): Table format with columns: error name, when it fires, what it means, recovery path. "When it fires" must name the API operations that can raise this error. "Recovery path" must distinguish retryable (transient) from terminal (configuration/logic error). Not just type names and descriptions — full operational semantics.

__API Reference__: Scales per G6. When the README is the sole documentation surface, this is the full reference: every public function with signature and purpose, every configuration type with option/type/default/description columns, every exported type with purpose. When an external docs site exists, this is a signpost table.

__Glossary__: Every domain term introduced in the README. Alphabetical. `####` headings for anchor targets. One concise definition each. The glossary is reinforcement, not the place of first introduction. The glossary is not limited to API exports — it covers the full domain vocabulary, including system terms that have no direct API representation (e.g., "scope" as a runtime concept, "namespace" as an emergent structural property). If a reader needs to understand a term to use the system, it belongs in the glossary regardless of whether it maps to a constructor or type.

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

### Duplicate Introduction

A concept briefly introduced in one section ("Module Tree" as a structural overview) and then fully defined later ("Module" as a concept). The reader encounters the concept twice with overlapping information and must mentally merge them. Introduce each concept exactly once, where it belongs in the topological sort.

### User-Action Language in Library Docs

"When the user types a character, the frontier narrows." The library doesn't know about users — it knows about its API inputs. Describe behavior in terms of API calls: "when `input(char)` is called, the frontier refilters." User-facing descriptions belong in surface/UI docs, not library internals.

### Dismissive Scale Assumptions

"The frontier is usually <100 items, so performance doesn't matter." This dismisses the library's generality. State scale and audience as design context instead: "Designed for command vocabularies of 10-10,000 commands." Clarify intended use cases and scale ranges — they're part of a library's design tradeoffs. But don't use them to wave away concerns.

### Private Surface Leakage

Cross-references to sibling repos via `[../sibling-name]` markdown links, "sibling project in `~/projects/<user>/`" framing, "in my dotfiles" / "in the user's config" phrasing, or naming author-private helpers (a personal `vsmap()` lua helper, etc.) as if they were canonical upstream APIs. The README is OSS-bound; consumers don't have the author's filesystem or private helpers. Use NPM package names for cross-references (`` `@scope/package` ``). Describe behavior generically rather than naming personal helpers. See Cardinal Rule at the top of this file — and run the mandatory grep before declaring done.
