---
name: technical-document
description: "Draft or review source-grounded HTML technical documents: proposals, architecture plans, ADRs, migration plans, and implementation plans where engineering decisions depend on the document being correct, justified, readable, and directly actionable."
---

# Technical Document

Produce a self-contained HTML technical document that a reviewer can trust and
an implementer can execute. Do not use this skill for chat answers, quick
analysis, status updates, or PR comments unless the user asks for a document
artifact.

Every technical document is load-bearing. Unsupported claims, unjustified
mechanisms, speculative fallback paths, vague future-proofing, format drift, and
non-linear argumentation are defects.

Table shapes in this skill define column contracts and ordering, not syntax.
The artifact realizes them as semantic HTML tables (`<thead>`, `th[scope]`).

## Start From First Principles

Consider first-principles solutions by default.

Do not discard a solution because it is large, increases a PR diff, requires a
deeper refactor, touches more files, changes an existing abstraction, or creates
coordination work. That is the user's decision.

Only apply a limiting constraint when the surrounding chat explicitly authorizes
that constraint. Put authorized constraints only in the `Constraints` row of the
Summary table.

## Write For Zero Session Context

Assume the reader has none of the chat context.

Rules:

- No "as discussed", "above", "previously", or "the earlier version".
- A revised document is fully standalone.
- Compare the document to source truth, not to prior drafts.
- Include every fact needed to understand the recommendation.

## Start From Evidence

Read source truth before drafting:

- local source, configs, workflows, package metadata, generated output, tests,
  logs, and runtime behavior when available
- installed package source or official docs for third-party semantics that
  materially affect the design
- current PR/review/CI state when the document is about landing or changing a PR

If evidence is expensive or unavailable, leave the claim out of the target
design or put it in Proof Gates.

## Start From The Template

Copy `references/template.html` first. Do not restyle per document.

The artifact is one standalone `.html` file:

- no external fonts, scripts, styles, or runtime network requests
- inline CSS and tiny inline JS only
- rendered diagrams as inline SVG
- Mermaid source retained in `<details>` next to each rendered diagram
- source links pinned to a forge blob URL at the document's pinned commit

Write the artifact in the session workspace unless the user names a location.

Use `references/exemplar.html` before substantial work. Use
`references/contrastive-pairs.md` when uncertain whether language is too soft,
unsourced, or non-linear.

## Choose A Profile

Use the matching profile. Sections listed for a profile are mandatory and
ordered. Do not add other top-level sections unless the user asks.

Shared spine for all profiles:

1. Summary
2. Ubiquitous Language
3. Personas
4. Current State
5. Problem
6. Diagrams
7. Proof
8. Proof Gates
9. Self Audit
10. Colophon

Proposal / implementation plan profile adds, after Problem:

1. Target Model
2. Separation Of Concerns
3. TypeScript Model
4. Proposed Changes
5. Options
6. Tradeoffs
7. Verification

ADR profile adds, after Problem:

1. Decision
2. Options
3. Tradeoffs
4. Verification

Migration plan profile adds, after Problem:

1. Target Model
2. Separation Of Concerns
3. TypeScript Model
4. Proposed Changes
5. Cutover
6. Rollback
7. Verification

Rules:

- Render only `h1` and `h2` headings.
- Every section has a stable id; every `h2` carries a self-anchor link to its
  section id.
- Use point form by default. Paragraphs are allowed only in Summary.
- Do not nest lists. Use semantic tables, cards, or `<dl>` groups.
- Keep repeated groups symmetrical.
- If a required section has no content, write `None.` inside the section.
- Delete table rows that exist only to satisfy shape.

## Write Metadata

The Summary table includes:

| Field | Value |
| --- | --- |
| Status | `draft | reviewed | accepted` |
| Doc Type | `<proposal | implementation plan | ADR | migration plan>` |
| Authored | `<YYYY-MM-DD>` |
| Commit | `<linked pinned commit>` |
| Recommendation | `<one sentence>` |
| Constraints | `<explicitly authorized constraints, or None>` |
| Proof | `<count and names, or None>` |
| Proof Gates | `<count and names, or None>` |
| Verification | `<required checks, or None>` |

Add a final Colophon after Self Audit with agent, session id when available,
generation date, and pinned commit.

## Use Stable Anchors

Every referenceable row or block gets a stable id:

- Current State rows: `cs-1`, `cs-2`
- Problem rows: `p-1`, `p-2`
- Options: `opt-a`, `opt-b`
- Proposed mechanisms: `mech-<slug>`
- Proof: `proof-<slug>`
- Proof Gates: `gate-<slug>`
- Diagrams: `diag-<slug>`

Cross-references are anchors, not prose:

```html
<a class="xref" href="#cs-1">CS-1</a>
```

## Use Source Links

Any claim about the codebase carries a source link in the same row, bullet, or
sentence.

For repo files, link to the forge blob pinned to the Summary `Commit`. Derive
the blob base from `git remote get-url origin` (GitHub shape shown; adapt to
the forge):

```html
Source:
<a class="source" href="https://github.com/<org>/<repo>/blob/<sha>/<path>#L<line>">
  <code><path>:<line></code>
</a>
(<code><symbol></code>) — <claim>.
```

Rules:

- Visible text stays repo-relative `path:line`.
- Pin `<sha>` to the Summary `Commit`; never link a branch name.
- Use a line number and symbol when one exists.
- Repeat `Source:` when multiple sources support one claim.
- Use absolute paths only for session-local proof scripts not in the repo.

## Write Ubiquitous Language

Use the table only when it has at least two rows:

| Term | Description |
| --- | --- |
| `<Canonical Term>` | `<One concise description>` |

Rules:

- Write `None.` if the table would have one row.
- Maximum 20 terms.
- Alphabetize terms.
- List terms this document coins, disambiguates, or narrows.
- Use one canonical term per concept, then never use a synonym for it.

## Write Personas

Use the table only when at least two personas differ in capability, authority,
responsibility, or lifecycle role:

| Persona | Description |
| --- | --- |
| `<Persona>` | `<Role in this document>` |

Write `None.` if the table would have one row.

## Write Current State

Current State is source-linked facts only.

| Fact | Source |
| --- | --- |
| `<Fact with no interpretation>` | `<pinned source link>` |

Rules:

- No problem framing.
- No solution language.
- No inferred intent.
- If a fact has no source, omit it or put it in Proof Gates.

## Write Problem

Problem contains falsifiable costs, failures, or capability gaps tied to Current
State facts.

| Problem | Current State Link | Impact |
| --- | --- | --- |
| `<Concrete failure or cost>` | `<a href="#cs-n">CS-n</a>` | `<hard fact, failure mode, or affected persona>` |

No "cleaner", "simpler", "nicer", or "more maintainable" without a hard source,
number, or failure mode.

## Write Target Model

Target Model describes the end state from scratch, as if designed today with
full domain knowledge.

Rules:

- No migration language.
- No "keep existing" phrasing.
- No references to current shape except in Before/After blocks.
- Describe ownership, lifecycle, APIs, data flow, and runtime behavior using
  canonical terms.

## Preserve Separation Of Concerns

Use the ownership table first:

| Unit | Owns | Must Not Know About | May Depend On |
| --- | --- | --- | --- |
| `<App/Lib/Tool/Package>` | `<Responsibilities>` | `<Forbidden knowledge>` | `<Allowed dependencies>` |

Then include one layer contract block group per layer:

- Layer: `<Canonical Layer Name>`
- Responsibility: `<What this layer owns>`
- Peers: `<Packages/apps/tools/workflows in this layer>`
- Direction: `<Allowed dependency direction>`
- Contract:

```ts
// <Peer name>: <new or existing surface>
// .d.ts-style declarations only. No implementation.
```

Rules:

- Treat app, library, tool, generated package, workflow, and infrastructure
  boundaries as real even when they live in one repository.
- A library must not know about a consuming app unless the app is explicitly the
  library's domain.
- Model non-TypeScript peers with TypeScript declaration types.
- Prefer plain `interface` and `type` declarations. Do not invent ambient
  namespace conventions unless the target repo already uses them.
- Do not move code across a boundary because it reduces diff size.

## Scout The TypeScript Model

TypeScript Model is mandatory for TypeScript-facing proposal, implementation
plan, and migration plan profiles. Write `None.` only when the document does not
touch TypeScript.

| Surface | Inference Strategy | Runtime Source | Escape Hatches |
| --- | --- | --- | --- |
| `<API/config/helper/etc.>` | `<How types are inferred>` | `<Value/schema/source that drives inference>` | `<None, or justified escape hatch>` |

Rules:

- Inference-first, airtight type safety is the default.
- Prefer inference from values, schemas, discriminants, constructors, function
  signatures, and service/DI layers (e.g. Effect services).
- Prefer `satisfies` when checking a value against a type without widening it.
- Avoid annotations unless inference fails or the annotation documents an
  intentional public contract.
- Each escape hatch names the exact case, why inference cannot express it, and
  what guards keep it safe.
- Include at least one working or near-working TypeScript slice when the
  document changes APIs, config loading, generated output, package exports,
  helpers, or cross-package contracts.

## Write Proposed Changes

Proposed Changes is the delta from Current State to Target Model.

Every change uses:

- Mechanism: `<Canonical Term>`
- Problem: `<a href="#p-n">P-n</a>`
- Evidence: `<pinned source link or proof link>`
- Change: `<Exact behavior, state transition, interface, or data flow changed>`
- Baseline: `<Existing repo/native/tooling behavior and why it is insufficient>`
- Omission: `<What gets worse if omitted>`

If any field cannot be filled, remove the mechanism or move it to Proof Gates.

## Use Exact Option Shapes

Use Options only when comparing alternatives. Otherwise write `None.`

Options are viable target choices, not contrast theater. When the user presents
a problem, accept "solve the problem" as the premise and compare solutions only.
Do not create an option row for "do nothing", "status quo", "keep current
state", "leave as-is", "defer", or any row that solves no Problem.

If source evidence appears to falsify the user's stated problem, stop and report
that mismatch before drafting. Do not encode the mismatch as a no-change option.

Mutually exclusive options:

| Option | Description | Solves | Cost | Recommendation |
| --- | --- | --- | --- | --- |
| `A` | `<What it is>` | `<Problem solved>` | `<Hard fact only>` | `<Yes/No>` |
| `B` | `<What it is>` | `<Problem solved>` | `<Hard fact only>` | `<Yes/No>` |

Composable options:

| Option | Description | Requires | Compatible With | Recommendation |
| --- | --- | --- | --- | --- |
| `<Name>` | `<What it is>` | `<Dependencies>` | `<Other option names>` | `<Adopt/Reject/Proof Gate>` |

Rules:

- Exactly one mutually exclusive option has `Recommendation` = `Yes`.
- Every option row must solve at least one linked Problem or be deleted.
- Put current state in Current State, Baseline, or Tradeoffs; never pad Options
  with a no-change row.
- Use an ADR no-change Decision only when the user explicitly asks whether to
  change and the evidence supports no change. Never use it in response to a
  user-stated problem.
- Do not include compromise options unless the user authorized a compromise
  constraint.
- Cells cite hard, checkable facts only: source refs, version requirements,
  benchmarks, concrete failure modes, LOC, file counts, or dependency counts.
- If no hard fact distinguishes two options, write `No hard distinguisher`.

## Use The Tradeoffs Matrix

Use Tradeoffs when options exist or when the recommendation has meaningful cost.
Otherwise write `None.`

| Dimension | Current State | Proposed State | Tradeoff | Evidence |
| --- | --- | --- | --- | --- |
| `<Dimension>` | `<Fact>` | `<Change>` | `<Hard cost/benefit>` | `<Source or Proof>` |

No qualitative adjectives without a number, source, or concrete failure mode.
No duration estimates; use files, LOC, steps, checks, and dependency edges.

## Write Verification

Verification is the check plan for proving the implemented change is correct.
It is distinct from Proof, which is evidence gathered while writing the
document.

| Check | Command Or CI Job | Pass Criteria |
| --- | --- | --- |
| `<Name>` | `<Exact command or job name>` | `<Observable pass condition>` |

Every command anywhere in the document must be runnable verbatim from the repo
root.

## Use Rendered Diagrams

Every document includes at least one exact diagram.

Rules:

- Pre-render Mermaid diagrams to inline SVG at authoring time
  (`npx -y @mermaid-js/mermaid-cli -i <in>.mmd -o <out>.svg`), or hand-author
  simple SVG directly as `references/template.html` demonstrates.
- Wrap each diagram in `<figure>`.
- Add a `<figcaption>` stating the diagram's claim.
- Keep the Mermaid source in adjacent `<details>`.
- Use a sequence diagram when the document changes or depends on temporal,
  interactive, lifecycle, cleanup, retry, migration, request, or cross-system
  behavior.
- Use a dependency graph for proposal, implementation plan, and migration plan
  profiles. It visually restates Separation Of Concerns at the layer and peer
  level.
- Do not show Mermaid source as the diagram.
- Do not use diagrams as decoration.

## Present Proof Reproducibly

Proof contains evidence generated during document preparation.

Each proof item uses:

- Proof: `<Canonical proof name>`
- Purpose: `<Claim this proof supports>`
- Script: `<repo-relative path:line>` or `<absolute session-local path:line>` or
  `Inline command`
- Command: exact command in a code block
- Output: captured output in a code block
- Interpretation: what the output proves and does not prove
- Reproduce: required env vars, credentials, cwd, fixtures, and whether the
  script is committed, session-local, or included inline

Rules:

- Include exact command and captured output.
- Say when output is trimmed; do not silently reshape output.
- Do not call a claim proved unless output directly establishes it.
- The artifact is one HTML file. A session-local proof script is either
  included inline inside the proof item or committed to the repo and linked by
  pinned blob URL.

## Separate Design From Proof Gates

Proof Gates are unproven ideas or missing evidence. They are not part of the
proposal.

| Gate | Needed Proof | How To Prove | Decision If Proven |
| --- | --- | --- | --- |
| `<Name>` | `<Missing evidence>` | `<Concrete check/repro/source read>` | `<Design change>` |

Do not write prose that makes a proof-gated idea sound recommended.

## Keep The Document DRY

DRY is law.

Rules:

- Introduce each concept once.
- Use the canonical term thereafter.
- Do not restate the same argument in multiple sections.
- Link back to the canonical term, mechanism, option, source, or proof instead
  of repeating the explanation.
- Delete repeated prose even when it sounds helpful.
- Do not use a concept before introducing it.
- Do not write non-linear prose that requires the reader to jump backward.

## Run The Self Audit

The self-audit is mandatory and visible inside the HTML artifact. The delivery
message may duplicate it; it may not replace it.

Use one row per required check. No omissions.

| Check | Result | Evidence |
| --- | --- | --- |
| `<Audit check>` | `<Pass/Fail>` | `<Section, source, or proof>` |

Required checks:

- Standalone document, zero session context.
- Selected profile sections present, ordered, and non-decorative.
- Ubiquitous Language and Personas either `None.` or at least two rows.
- Header includes status, doc type, date, and pinned commit.
- Colophon includes agent, session id when available, date, and pinned commit.
- Every codebase claim has a pinned source link.
- Cross-references use real anchors.
- Current State contains facts only.
- Problem rows tie to Current State rows.
- Proposed Changes use the mechanism shape.
- Separation Of Concerns includes ownership, dependency direction, `.d.ts`
  contract blocks, and a matching dependency graph when required.
- TypeScript Model includes inference strategy and justified escape hatches when
  TypeScript is touched.
- Options and Tradeoffs contain hard facts only.
- Options honor the user-stated problem premise and contain only viable target
  choices; no no-change or solves-nothing rows remain.
- Diagrams render as inline SVG and carry captions.
- Proof items include script/command, captured output, interpretation, and
  reproduction details.
- Proof Gates are not presented as proposed work.
- No nested lists, repeated arguments, unauthorized constraints, duration
  estimates, or qualitative soft claims remain.

Before delivery, ask: "What can be removed without changing a reviewer or
implementer's decision?" Remove it.
