# Review: README.md

Assess README quality against the actual project. Read `~/.claude/skills/readme/core.md` and `~/.claude/skills/readme/core-readme.md` for the quality protocols.

Two kinds of errors exist and the review must catch both:

- __Mentioned but wrong__ — the README describes something inaccurately
- __Not mentioned at all__ — the README omits a concept, feature, or capability that exists in the source

## Steps

### 1. Load source truth (expensive, required)

Read the project to build a mental model of what SHOULD be documented. Concrete file list:

1. CLAUDE.md / .claude/rules/ — design intent, conventions, architecture notes
2. package.json — name, description, exports, dependencies
3. Barrel exports (__.ts, index.ts, or main entry) — public API surface
4. 3-5 representative test files — usage patterns, expected behavior
5. `git log --oneline -20` — recent features and trajectory

From this, build a checklist of every domain term, public export, and design concept. This is the ground truth the README will be graded against.

### 2. Read the README

Read the existing README.md fully.

### 3. Coverage comparison

Compare the source truth checklist against what the README covers:

- __Missing concepts__ — domain terms or capabilities in the source that the README never mentions
- __Missing features__ — recent git log entries with no README coverage
- __Stale content__ — README describes things that no longer exist in the source
- __Proportion__ — is the README's depth proportional to the project's complexity?

### 4. Quality checks

Run checks from `~/.claude/skills/readme/core.md` and `~/.claude/skills/readme/core-readme.md` (respects Focus — whole README, or scoped to named sections):

- G1 section order (base sections)
- G2 semantic term ordering
- G3 heading density (from core.md)
- G4 term linking
- G5 conditional sections — run trigger detection against the source code. If a trigger is met but the corresponding section is missing, that is a G5 violation (same severity as missing Quickstart). Specifically check:
  - Does the source import from 2+ runtime systems? → Architecture required
  - Does the source use `Effect.withSpan`, `tracer.startActiveSpan`, or `@opentelemetry/*`? → Observability required
  - Does the source export 3+ `Data.TaggedError` or custom Error classes? → Error Reference required
- G6 API Reference depth — is there an external docs site? If not, the README must be the full reference.
- Anti-slop scan (from core.md)
- Contextual links (from core.md)

### 5. Reader test (4 parallel readers)

Spawn four subagents in parallel, each with ONLY the README content. Run all four concurrently.

__Reader A — New user (never seen this project)__
1. What does this project do?
2. How do I install and get it running?
3. What problem does it solve that I can't solve with alternatives?

__Reader B — Evaluator (deciding whether to adopt)__
1. What are the core concepts and how do they relate?
2. What's the API surface — how big is this thing?
3. What are the limitations or things it doesn't do?

__Reader C — Practitioner (already decided to use it)__
1. How do I accomplish [specific real task relevant to this project]?
2. Where do I look up [specific API detail]?
3. What does [domain term] mean exactly?

__Reader D — Returning maintainer (built this, away 6 months, back now)__
1. What were the core design decisions and why were they made?
2. Can I find a link to the changelog, contributing guide, or architecture docs?
3. Does the glossary still match how I remember the domain terms being used?

__Triangulation:__ After all four return, compare their answers:
- If 3-4 struggle with the same area → high severity, clear blind spot
- If 2 struggle → medium severity, likely a clarity issue
- If only 1 struggles → low severity, persona-specific gap

### 6. Report

Present findings in three categories, with severity from triangulation:

- __Coverage gaps__ — what the project has that the README doesn't mention
- __Quality violations__ — G1-G4, anti-slop, structural issues
- __Accuracy issues__ — reader test findings with severity

Do not write unless the user explicitly instructs you to fix what you found.
