# Shared Quality Protocol

Rules that apply to ALL files this skill produces (README.md, CONTRIBUTING.md). File-specific rules live in `~/.claude/skills/readme/core-readme.md` and `~/.claude/skills/readme/core-contributing.md`.

## G3: Heading Density

If prose under a heading (excluding code blocks) is under 100 words, that concept does not deserve its own heading. Instead: weave into parent narrative, merge with siblings, or use bold-lead inline definition. G3 governs narrative sections (a README's Solution, Concepts, Usage; a concept file's body). It does not apply to the fixed sections of the doc-set templates in `docset.md` (Types, Rules, Questions, Known gaps, Long form) or to a section that is annotated code.

A cascade of `### Concept` / 3 sentences / code block / `### Next` / 3 sentences / code block is heading slop.

## Readability

These rules hold for every file. A failure is a blocker in review, never polish.

- **An opening is at most three sentences.** It says what the thing is and the one thing that matters most. Everything else goes to its own section. In a README, the opening is the one-liner plus Grounding, at most three sentences in all.
- **One idea per paragraph.** A paragraph holds one idea, in at most six sentences. Split a paragraph that holds two ideas, even when it is short.
- **Define before use.** A term is defined, or linked to its definition, before its first use (G2 in `core-readme.md`).
- **Code before prose.** When code and prose say the same thing, show the code first. The prose adds only what the code cannot show.
- **A mechanical list is annotated code.** A list of refusals, arguments, outputs or cases is one code block, annotated inline. It is never a run of prose sentences beside a code block.
- **Nothing twice.** A fact has one home. Every other mention links to it (`docset.md`).
- **Tables hold short cells.** A cell that needs a sentence belongs in a rule or a paragraph.
- **Code blocks are whole, valid code.** A formatter rewrites fenced code, and a fragment can turn into different code (`yield* x` becomes `yield * x`). Write whole statements that parse in the block's language. Every identifier a block uses is declared or imported in it, named in the file's opening, or declared in the README Quickstart. Run the formatter, then re-read every block. Mark a block that cannot be whole with a comment that says so. A generated region is exempt: it is never edited by hand. When its fence names the wrong language, report that to the generator's owner.

## Sentences

These rules come from ASD-STE100 Simplified Technical English. They apply its writing rules, not its controlled dictionary. Technical names and code identifiers are exempt.

- A sentence that describes is at most 25 words. A sentence that instructs is at most 20 words and gives one instruction.
- Use the active voice. Use the passive only to describe, and only when the actor does not matter.
- Use the imperative for an instruction: "Run the generator."
- One word has one meaning. One thing has one word. Do not cycle synonyms. Quoted output (an error message, a log line) keeps its own words; only the prose uses the one word. The inverse of a relation ("the node above it" for "stands under") is the same word seen from the other end, and is allowed.
- Use articles ("a", "an", "the") where they fit.
- Stack at most three nouns together.
- Use simple tenses: present, past and future.
- No em dashes. No slash between words, except "and/or".
- Never change technical content to obey a sentence rule. If a rule and accuracy conflict, keep accuracy and keep the sentence plain.

## Knowledge Delta Rule

Every sentence must earn its space. If a developer can learn it by reading the type signature, the `--help` output, or the source code, it does not belong. Document what the reader CANNOT infer. This means: motivation before mechanism, trade-offs over description, "why this way" over "what this does."

A paragraph that merely restates an API in prose is negative value — it wastes time without adding understanding.

## Source Truth Priority

1. CLAUDE.md / AGENTS.md / .claude/rules/ — design intent (highest)
2. Design specs, brainstorm decisions, memory files — when code doesn't exist yet (README-driven development)
3. README.md / CONTRIBUTING.md (existing) — preserve voice, badges, contributing
4. package.json / manifest — name, description, deps
5. Public API surface — exports, types, domain vocabulary
6. Test files — usage examples, expected behavior
7. Git log — motivation, trajectory

When source code doesn't exist yet (new package, pre-implementation), the source truth is the design spec — brainstorm decisions, spec files, reference implementations, or memory files. The README is the first artifact, not derived from code. This is README-driven development: write the README to the shape you want, then implement to match it.

Every claim must trace to a source. No evidence → no claim.

## Archetype Classification

| Archetype      | Signals                             | Emphasis                                      |
| -------------- | ----------------------------------- | --------------------------------------------- |
| __Library__    | Exports, types, no bin              | Concepts + API surface + quickstart           |
| __Bridge__     | Imports from 2+ runtime systems, maps concepts between them, creates runtime artifacts | Architecture (mapping tables, lifecycle diagrams) + Observability (if instrumented) + Error Reference (if typed errors) + Concepts + API surface. The mapping documentation IS the library's value — without it the library is a black box. |
| __CLI tool__   | `bin` field, argc/commander, --help | Quickstart + usage tasks + command reference  |
| __Monorepo__   | Multiple packages, workspace config | Orientation + package taxonomy + architecture |
| __App/system__ | Services, entry points, infra       | Architecture + setup + guides                 |
| __Utility__    | Small scope, <5 source files        | Lean docs, every section short                |

Scale to project size. 3-file utility → 50-line README. Flagship library → 300+. Never more docs than source.

## Cross-File Glossary

The glossary lives in README.md. CONTRIBUTING.md does not duplicate term definitions — it links to them:

```markdown
The [`scope tree`](README.md#scope-tree) determines command visibility.
```

This keeps one source of truth for domain vocabulary. When reviewing both files, check that CONTRIBUTING's term references resolve to actual glossary entries in the README.

## Contextual Links

During source truth extraction, scan for these artifacts. If present, weave a reference into the appropriate section — not as a standalone "Links" dumping ground, but integrated where the reader would naturally want them.

| Artifact | How to detect | Where |
|----------|---------------|-------|
| CHANGELOG.md | File exists | Title area or after Quickstart |
| GitHub Releases | `gh release list` returns results | Title area: link or badge |
| CONTRIBUTING.md | File exists | After Usage: "See [contributing guide](CONTRIBUTING.md)" |
| LICENSE / LICENSE.md | File exists | Closing line: "Licensed under [X](LICENSE)" |
| docs/ or doc site | Directory exists, or homepage in package.json | API Overview: "Full reference at [docs site](url)" |
| examples/ | Directory exists | Usage: "More examples in [examples/](examples/)" |
| GitHub Actions | .github/workflows/ exists | Title area: CI badge |
| GitHub Discussions | Check repo settings or presence | Closing: "Questions? See [discussions](url)" |
| Related packages | workspace siblings, or explicit in package.json | Solution or API Overview: mention the ecosystem |

Rules:
- Only link what actually exists. Do not create placeholder links.
- Prefer inline references over a link list.
- Title area badges: use sparingly. CI status and npm version are useful. Vanity metrics are not.
- If the project has a doc site, API Overview should be a signpost to it, not a competitor.

## Honest Positioning

When the project combines known approaches rather than inventing something new, say so. "Not a novel algorithm — the best existing approaches, packaged cleanly" is better than overclaiming novelty. State what's new (the combination, the packaging, the integration) and what's adopted (the algorithm, the scoring constants, the protocol). The Knowledge Delta Rule catches factual overreach; this catches tonal overreach.

Similarly, be honest about what the consumer builds vs what's automatic. If the consumer defines three things and the engine provides four things, say that. Don't imply magic where there's configuration.

## Anti-Slop Scan

__Banned words__ — search and remove every instance:

"powerful", "flexible", "seamless", "robust", "elegant", "intuitive", "comprehensive", "streamlined", "cutting-edge", "leverage", "pivotal", "crucial", "vital", "groundbreaking", "vibrant", "nestled", "profound", "breathtaking", "delve", "multifaceted", "foster", "realm", "tapestry", "showcase", "underscore", "landscape" (abstract use), "interplay"

__Banned phrases__ — search and rewrite:

| Kill                            | Replace with                     |
| ------------------------------- | -------------------------------- |
| "This library provides..."      | Name the specific thing it does  |
| "Say goodbye to..."             | Cut entirely                     |
| "Let's dive in" / "dive deeper" | Cut entirely                     |
| "under the hood"                | Name the actual mechanism        |
| "It's worth noting"             | Just state the fact              |
| "In order to"                   | "To"                             |
| "Due to the fact that"          | "Because"                        |
| "Has the ability to"            | "Can"                            |
| "serves as" / "stands as"       | "is"                             |
| "is a testament to"             | Cut entirely                     |
| "Not only...but also"           | Rewrite as two direct statements |
| "It's not just...it's..."       | Rewrite as direct statement      |
| "The future looks bright"       | Cut entirely                     |
| "Exciting times lie ahead"      | Cut entirely                     |

__Banned structures__:

- Sections that open by describing what they will cover
- Sections that close by summarizing what was said
- Sentences starting with "It is" or "There are"
- Using "various" or "multiple" instead of naming the actual things
- Paragraphs restating type signatures or API in prose without adding understanding
- Forcing ideas into groups of three for artificial comprehensiveness
- Excessive synonym cycling to avoid repetition (use the same word if it's the right word)
- Em dash overuse (more than 2 per section signals AI writing)
- Bolding every other phrase
- Bullet lists where every item starts with the same part of speech

## Anti-Patterns

### Illustrative-Only Code

```typescript
const config = Module.make({
  name: 'Config',
  capabilities: {/* ... */},
})
```

The `/* ... */` makes this uncopyable. Either show real code or mark it explicitly: `// Conceptual — see Usage for runnable examples`.

### Promotional Voice

"@kitz/cmx is a powerful, flexible command engine that seamlessly integrates with your application." Every word after "is" is filler. Replace with what it actually does: "@kitz/cmx turns command entry into a semantic system with adaptive ranking and safety invariants."
