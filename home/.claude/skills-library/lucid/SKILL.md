---
name: lucid
description: >
  Generate a complete, publication-ready documentation package for a project.
  Agents explore the codebase, extract source truth, generate all content types
  (concepts, reference, guides, marketing, changelog), verify mechanically and
  via cross-context review, and produce deployable output. No human drafting or
  editing. Use when told to "document this project", "generate docs", "make this
  legible", "lucid", or /lucid. Accepts an optional project path or defaults to cwd.
argument-hint: "[project path]"
allowed-tools:
  - Read
  - Bash(*)
  - Glob
  - Grep
  - Write
  - Edit
  - Agent
  - WebFetch
  - WebSearch
---

# Lucid — Documentation-as-Product

You produce and maintain publication-ready documentation. You operate end-to-end with no human drafting, editing, or review. If you can't do something, that's a system bug — log it in the report and continue.

## Operating Principles

- **You do everything**: explore, extract, generate, verify, iterate, output
- **Human's role**: strategic only (skill fixes, system design). NOT content review
- **Every claim must trace to source code, tests, CLI output, or git history**
- **If source truth is missing**: mark with `<!-- LUCID:GAP: description -->` and continue
- **React to context, don't blindly execute a pipeline**: read what exists first

## How to Decide What to Do

Before doing anything, assess the project's current state:

1. Read `$PROJECT/docs/_lucid-plan.md` if it exists — check what's been done
2. Check `$PROJECT/content/docs/` for existing generated content
3. Check for `$PROJECT/source.config.ts` (Fumadocs setup)
4. Check what the user asked for — they may want a specific phase, not the full pipeline

**Then do only what's needed:**

| State | Action |
|-------|--------|
| No plan file, no content, no framework | Full run: explore → generate → verify → setup Fumadocs |
| Plan file with completed phases, content exists, no framework | Set up Fumadocs, verify content is current |
| Plan file, content, framework all exist | Check freshness — regenerate only stale content |
| User asks for something specific ("add CLI reference", "set up the site") | Do that specific thing |
| Deferred review exists (`_lucid-review-request.md`) | Run the review |

The phases below are reference material for HOW to do each kind of work, not a script to execute top-to-bottom.

---

## Phase 0: Setup

The skill argument (if provided) is the project path. `$ARGUMENTS` is set by the skill runner:

```bash
PROJECT="$(cd "${ARGUMENTS:-$(pwd)}" && pwd)"
```

If `$ARGUMENTS` is empty or unset, this defaults to your current working directory. Store `$PROJECT` as an absolute path and use it in ALL subsequent commands.

### Existing content check

- If `$PROJECT/docs/` exists with non-Lucid content (no `lucid_generated` frontmatter), back it up: `cp -r "$PROJECT/docs" "$PROJECT/docs/_pre-lucid-backup"`
- If `$PROJECT/README.md` exists and is substantial (>30 lines), read it first — preserve its voice, badges, contributing guidelines, and any content not derivable from source code. Enhance it, don't replace from scratch.

### Create working memory

```bash
mkdir -p "$PROJECT/docs"
```

Write `$PROJECT/docs/_lucid-plan.md`:

```markdown
# Lucid Generation Plan
## Archetype: (fill after classification)
## Voice: (fill after extraction)
## One-liner: (fill after generation)
## Content Plan
- [ ] Phase 1: Autosearch
- [ ] Phase 2.1: One-liner
- [ ] Phase 2.2: How-to guides
- [ ] Phase 2.3: Reference docs
- [ ] Phase 2.4: Conceptual overview
- [ ] Phase 2.5: Quickstart
- [ ] Phase 2.6: README
- [ ] Phase 2.7: Optional content
- [ ] Phase 2.8: Landing page
- [ ] Phase 3: Verify + Review
- [ ] Phase 4: Output
## Findings
(discoveries during exploration)
## Exemplars
(high-quality docs found in this project or siblings)
## Quality Scores
(mechanical metrics after generation)
```

### Budget awareness

Target completion in one session. **Check budget at two gates:**

**Gate 1 (after Phase 1)**: If Phase 1 required more than 20 tool calls, reduce to the minimum docs package for this archetype and skip optional content (2.7).

**Gate 2 (after Phase 2)**: If you've generated 6+ documents, skip cross-context review (3.3) — write a `_lucid-review-request.md` for deferred review instead (see Phase 3.3).

Priority when cutting: reference docs > how-to guides > conceptual overview > quickstart > README > optional.

---

## Phase 1: Autosearch — Explore the Project

**CHECKPOINT**: Read `_lucid-plan.md`, update status.

### 1.1 Gather source material

Check ALL of these (skip gracefully if missing):

| Source | What to extract | Priority |
|--------|----------------|----------|
| `CLAUDE.md` / `AGENTS.md` | Architecture, conventions, design intent | **Highest** |
| `.claude/rules/` | Project constraints, patterns | **Highest** |
| `.claude/plans/` | Design decisions, past/future work | **Highest** |
| `README.md` | Existing positioning, voice, install | High |
| `package.json` / `pyproject.toml` / `Cargo.toml` | Name, description, deps, bin | High |
| Type-level API surface | Domain vocabulary, public exports | High |
| CLI `--help` output (or source if unbuilt) | Command structure, flags | High |
| Git log + PR descriptions | Motivation, trajectory | Medium |
| Test files | Usage examples, expected behavior, edge cases | Medium |
| `justfile` / `Makefile` | Available workflows | Medium |
| Raw source code | Implementation (shows WHAT, rarely WHY) | Lower |

**When design-intent artifacts are absent** (no CLAUDE.md, no .claude/): infer intent from README positioning → package.json description + keywords → git commit messages with "why" language → issue/PR titles. Mark inferences with `<!-- LUCID:INFERRED: basis -->`.

Write key findings to `_lucid-plan.md` under `## Findings`.

**Stop condition**: Move on when you can classify the project, articulate its core abstraction, and list its public surface. Maximum 15 source files.

### 1.2 Establish voice

Extract the project's existing voice from README and CLAUDE.md. If no clear voice exists, use: second person "you", present tense, short sentences, technical precision without formality, no exclamation points, no emoji.

Record in `_lucid-plan.md`.

### 1.3 Find exemplars

Check at most 2 sibling projects for high-quality docs. Note any exemplars in `_lucid-plan.md`. When generating, compare your output against these.

### 1.4 Classify the project

| Archetype | Signals | Min docs package |
|-----------|---------|-----------------|
| **CLI tool** | `bin` field, argc annotations, --help | Overview, install, CLI reference, quickstart |
| **Library** | Exports, types, no bin | Overview, install, API reference, conceptual guide, quickstart |
| **Monorepo/workspace** | Multiple packages, workspace config | Overview, install, package index, top 3 packages' reference, architecture |
| **App/system** | Multiple services, entry points | Overview, architecture, getting started, guides |
| **Template** | `template` in name | Overview, usage, customization guide |
| **Config/infra** | Dotfiles, CI configs, scripts | Overview, structure guide, conventions |

**Scale**:
- <5 source files: min docs package only, each doc under 100 lines.
- 5-100 files: full flow.
- 100+ files: public API surface only. Monorepos: top 3 packages.
- Never produce more documentation than source code.

Record archetype in `_lucid-plan.md`.

---

## Phase 2: Generate Content

**CHECKPOINT**: Read `_lucid-plan.md`. Verify Phase 1 complete. Check Gate 1 budget.

How-to guides discover the project's real vocabulary — every function, type, flag, and concept you reference becomes a phantom link that reference docs must define. Reference docs lock down accurate signatures. Conceptual overview builds on that vocabulary. Quickstart can only be verified after reference exists. README assembles from everything.

### 2.1 One-liner and elevator pitch

Generate 10 one-liners. Rank by specificity — the winner must fail the "could describe a different project" test. Record in `_lucid-plan.md`.

**Good**: "CLI for managing Claude Code skills, transcripts, and task files" — names specific things unique to this project.
**Bad**: "A tool for streamlining your AI development workflow" — could describe anything.

### 2.2 How-to guides (FIRST — they discover reference needs)

One guide per major user workflow. Count: 3-7 medium project, 1-3 small CLI.

For each:
1. Write: "How to [accomplish task] with [project]"
2. Note every concept, function, type, or flag referenced — these are phantom links
3. Phantom links become the spec for reference docs

**Diataxis: task-oriented.** NOT tutorials, NOT reference, NOT explanation.

**Good**: Steps that solve a specific real task, each referencing an actual command or API call.
**Bad**: Steps that restate the API documentation without solving a concrete task.

### 2.3 Reference docs

Generate from phantom links plus full public surface.

**CLIs**: Every command, subcommand, flag, argument from `--help` output. If project isn't built, read source/argc annotations directly. One section per command, flags table, contextual examples.

**Libraries**: Every public export, type, function from source code and type signatures.

**Non-TypeScript**: Adapt to the language's doc convention.

**Diataxis: information-oriented.** Dry, accurate, complete, structured for lookup.

**The "beyond the signature" rule**: Every paragraph in reference docs must teach something a developer cannot learn by reading the type signature or `--help` output alone. If a paragraph merely restates the signature in prose, delete it.

### 2.4 Conceptual overview

What is this? (concrete) → Why does it exist? (problem) → How does it think? (mental model) → What are its boundaries? (what it does NOT do)

Source from design-intent artifacts. If absent, use fallback chain from 1.1. Every claim must connect to a real problem or design decision, not just describe APIs.

**Diataxis: understanding-oriented.** Motivation before mechanism.

**The "teaches beyond source" rule**: Every paragraph must teach something a developer cannot learn by reading the source code alone. If a paragraph restates what code does in English without adding understanding of WHY, rewrite it or cut it.

### 2.5 Getting started / Quickstart

Prerequisites → Install → First use → What just happened. Copy-pasteable. Under 5 minutes. Verify the project builds first.

**Diataxis: learning-oriented.** Every step must succeed.

### 2.6 README.md

Assemble from above, then **revise for narrative coherence**. If an existing README was preserved, enhance it: keep badges, contributing, license. Replace description, install, usage with generated versions.

### 2.7 Optional content (generate if source material exists)

- **Changelog**: "What can users do now that they couldn't before?" Last 3 months if no releases/tags.
- **Glossary**: Domain vocabulary, one sentence per term.
- **Goals / Non-goals**: From design-intent artifacts.

### 2.8 Landing page (index.md)

One-liner + elevator pitch, docs structure map, quick links. Navigation surface, NOT duplicate of conceptual overview.

---

## Anti-Slop Rules

Apply to ALL generated content.

**Banned words**: "powerful", "flexible", "seamless", "robust", "elegant", "intuitive", "comprehensive", "streamlined", "cutting-edge", "leverage"

**Banned phrases**: "This library provides...", "Say goodbye to...", "Supercharge your...", "The ultimate...", "In this guide, we will...", "Let's dive in", "dive deeper", "As we've seen", "It's worth noting", "under the hood", "In conclusion", "To summarize", "This section covers"

**Banned structures**:
- Opening a document by describing what it will cover
- Closing a section by summarizing what was said
- Bullet lists where every item starts with the same part of speech
- Sentences starting with "It is" or "There are"
- Using "various" or "multiple" instead of naming the actual things
- Restating a type signature or `--help` output in prose without adding understanding

**Required**:
- Every paragraph references a specific function, type, command, or config
- Every conceptual paragraph connects to a real problem, not just an API
- Every paragraph teaches something not learnable from source code alone
- The one-liner contains at least one term unique to THIS project
- Every claim is verifiable against source
- Explanations start with WHY before HOW

---

## Phase 3: Verify

**CHECKPOINT**: Read `_lucid-plan.md`. Check off Phase 2. Check Gate 2 budget.

### 3.1 Mechanical verification

**Code examples**: Fallback chain:
1. TypeScript: `npx tsx snippet.ts`. If deps missing: `npx tsc --noEmit`
2. If imports require unbuilt project: verify symbols exist via Grep
3. CLI: run the actual commands
4. Cannot verify: mark `<!-- LUCID:UNVERIFIED: reason -->`

Never silently skip. Every example: verified OR marked.

**References**: Grep codebase to confirm every function/type/command exists and signature matches.

**Links**: Every internal link resolves to an actual file.

**Banned content scan**: Grep generated docs for banned words/phrases. Fix violations.

### 3.2 Quality score

Record in `_lucid-plan.md`:
- Code examples verified: pass / total
- Referenced exports exist: matched / total
- Internal links valid: valid / total
- Banned phrases found: count (target: 0)
- Public API coverage: documented / total exports

### 3.3 Cross-context review

Self-review misses errors due to anchoring bias. Spawn a **fresh** Agent subagent with this prompt (fill in the project path):

```
You are a documentation reviewer for the project at [PROJECT PATH].

Read every .md file in [PROJECT PATH]/docs/ (skip files starting with _).
For each document, verify against source code using Read, Grep, and Glob.

## What this project is
Read [PROJECT PATH]/docs/_lucid-plan.md — the Archetype and Findings sections
tell you what kind of project this is and what its public surface looks like.
Ignore the checkboxes and scores — they are the generator's bookkeeping.

## Quality principles — check ALL 8:
1. Every sentence does conceptual work — no filler
2. Motivation before mechanism — WHY before HOW
3. Specific over generic — names actual functions, types, commands
4. One claim, one source — traces to code, tests, or runtime
5. No jargon without definition
6. Progressive disclosure — overview first, details on demand
7. Honest limitations — what the project does NOT do
8. Project's voice — no AI voice

## Semantic quality — the hardest check:
For each paragraph, ask: does this teach something a developer cannot learn
by reading the source code or --help output alone? Flag paragraphs that
merely restate signatures in prose. Flag "why" explanations that are
tautological (restating WHAT as WHY).

## Anti-slop — flag any:
"powerful", "flexible", "seamless", "robust", "elegant", "intuitive",
"comprehensive", "streamlined", "cutting-edge", "leverage",
"This library provides", "Let's dive in", "dive deeper",
"It's worth noting", "under the hood"
Flag: docs that open by describing what they cover, or close by summarizing.

## LUCID markers:
If you see <!-- LUCID:GAP --> or <!-- LUCID:INFERRED -->, do NOT flag these
as errors. They are the generator acknowledging uncertainty. Only flag if
the surrounding content contradicts the marker or if the gap should have
been fillable from available source.

## Verification:
For each factual claim, grep source to verify. Check function names exist,
signatures match, behavior matches test expectations.

## Output — for each finding:
SEVERITY: CRITICAL | HIGH | MEDIUM | LOW
FILE: <filename>
ISSUE: <description>
EVIDENCE: <what source shows>

If a document has no findings, say so. Keep the review focused — prioritize
CRITICAL and HIGH over exhaustive LOW findings.
```

**Do NOT pass** your generation context, reasoning, or plan to the reviewer.

**If budget is tight or subagent fails**: Write `$PROJECT/docs/_lucid-review-request.md` containing the review prompt above (with paths filled in) and a list of generated files. Note in the report: "Cross-context review deferred. Run the review prompt in a fresh session." This preserves fresh-context review for a separate invocation instead of degrading to same-session self-review.

### 3.4 Revise from findings

Verify each CRITICAL/HIGH finding against source before acting — the reviewer can hallucinate too. Address confirmed findings. Re-run mechanical checks. **Regenerate README.md** after revision. Maximum 2 rounds — stop when findings are zero or only LOW.

Update `_lucid-plan.md` with final scores.

---

## Phase 4: Output

**CHECKPOINT**: Read `_lucid-plan.md`. Verify Phase 3 complete.

### 4.1 Content directory

Write generated docs as `.mdx` files in `content/docs/`:

```
<project>/
  content/docs/
    index.mdx              # Landing / navigation
    getting-started.mdx     # Quickstart
    concepts/
      overview.mdx          # What, why, mental model, boundaries
      glossary.mdx          # If generated
    guides/                 # How-to guides (kebab-case)
      <task-name>.mdx
    reference/              # API / CLI reference (kebab-case)
      <section>.mdx
    changelog.mdx           # If generated
  docs/
    _lucid-plan.md          # Working memory (keep)
    _lucid-report.md        # Generation report
    _lucid-review-request.md  # If review was deferred
  README.md                 # Updated / enhanced
```

Every `.mdx` file needs frontmatter:
```yaml
---
title: Page Title
description: One-line description
lucid_generated: true
generated_at: "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
source_files: [files this doc was derived from]
---
```

### 4.2 Fumadocs site setup

If the project does NOT already have Fumadocs configured (no `source.config.ts`), set it up:

**Install dependencies:**
```bash
cd "$PROJECT"
pnpm add fumadocs-core fumadocs-mdx fumadocs-ui next react react-dom
pnpm add -D @tailwindcss/postcss @types/mdx @types/react @types/react-dom postcss tailwindcss typescript
```

**Create `source.config.ts`:**
```ts
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

export const docs = defineDocs({
  dir: 'content/docs',
});

export default defineConfig();
```

**Create `next.config.mjs`:**
```js
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

export default withMDX(config);
```

**Create `lib/source.ts`:**
```ts
import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});
```

**Create `lib/layout.shared.tsx`:**
```tsx
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: '$$PROJECT_NAME$$', // fill from package.json name
    },
  };
}
```

**Create `components/mdx.tsx`:**
```tsx
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
```

**Create `app/layout.tsx`:**
```tsx
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import './global.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
```

**Create `app/global.css`:**
```css
@import 'tailwindcss';
@import 'fumadocs-ui/css/neutral.css';
@import 'fumadocs-ui/css/preset.css';
```

**Create `app/docs/layout.tsx`:**
```tsx
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
```

**Create `app/docs/[[...slug]]/page.tsx`:**
```tsx
import { source } from '@/lib/source';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
```

**Create `app/api/search/route.ts`:**
```ts
import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET } = createFromSource(source, {
  language: 'english',
});
```

**Create `postcss.config.mjs`:**
```js
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
```

**Add tsconfig paths** (merge into existing or create):
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "collections/*": [".source/*"]
    }
  }
}
```

**Add scripts to `package.json`:**
```json
{
  "scripts": {
    "docs:dev": "next dev",
    "docs:build": "next build"
  }
}
```

**Add to `.gitignore`:**
```
.source/
.next/
```

**Verify it works:**
```bash
cd "$PROJECT" && pnpm docs:dev
```

Check that `http://localhost:3000/docs` loads and shows your generated content.

### 4.3 Generation report

Write `docs/_lucid-report.md`:
- Content generated and source material per artifact
- Mechanical verification results (pass/fail per check)
- Cross-context review: findings + resolutions, or "deferred"
- Quality scores
- All `LUCID:GAP` and `LUCID:INFERRED` markers with reasons
- System issues for skill maintainer

### 4.4 Re-run handling

If `content/docs/` already contains files with `lucid_generated: true` frontmatter, overwrite them in place. Only back up non-Lucid content (Phase 0).
