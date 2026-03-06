# Iteration 1: Decision Log — Generating SKILL.md from git-sync's flow.d2

## Experiment

**Input:** Only `reference/flow.d2` (248 lines of D2)
**Output:** A generated SKILL.md
**Then:** Compare against actual SKILL.md to identify gaps

---

## Decisions Made During Generation

### Decision 1: Format — speclist vs. markdown lists
**Chose:** Numbered markdown lists with conditionals
**Why:** The D2 shows sequential steps within containers, with diamonds for decisions. This maps naturally to numbered lists with conditional branches.
**Was it right?** Yes — the actual SKILL.md uses numbered lists with the same ◆ step title pattern. The D2 graph structure (linear chains with diamond branches) directly implies sequential numbered steps with inline conditionals.
**Heuristic candidate:** Linear chains in D2 → numbered lists. Diamonds → inline conditionals or decision tables.

### Decision 2: Operations structure — Plan/Execute split
**Chose:** Two top-level sections matching D2's two main containers
**Why:** D2 has `plan:` and `execute:` as top-level containers, connected by edges. This directly implies two named operations.
**Was it right?** Yes — actual has same split. Also added an Operations table showing entry modes.
**Gap found:** The D2 shows `plan -> execute: full sync` and `plan -> end_plan: plan only` — these ARE the operation modes. But D2 doesn't say "there are three modes" or provide a summary table. I had to infer the mode table from the edge labels. The actual SKILL.md has a richer table with Mode/Entry/Behavior columns.
**Heuristic candidate:** Top-level containers with edges between them → operations. Edge labels between containers → mode table entries.

### Decision 3: Procedures extraction
**Chose:** Flat list under a "Procedures" heading
**Why:** D2 has a `procedures:` container with 5 sub-containers — clearly reusable subroutines.
**Was it right?** Yes — actual uses same structure with `- **name**` bullets containing numbered substeps.
**Heuristic candidate:** D2 container named "procedures" with sub-containers → extracted Procedures section with reusable definitions.

### Decision 4: Step granularity — how much detail per step
**Chose:** Compact — one line per node, conditionals as sub-bullets
**Why:** D2 node labels are terse (e.g., "git add -A && commit WIP"). I preserved that terseness.
**Was it right?** Partially. The actual SKILL.md adds MORE detail than D2 has:
- Step titles with ◆ markers and descriptive labels
- Richer conditional tables (select/description/then columns)
- Explicit `git merge-tree` command in step 5 not in D2
- Template references (e.g., "Show using _trunk-dirty_")
**Gap found:** D2 captures the FLOW but not the RICHNESS. Node labels are too terse for execution-quality instructions.

### Decision 5: Frontmatter / description
**Chose:** Generic description based on what the flow does
**Why:** D2 doesn't encode metadata — no frontmatter in the diagram.
**Was it right?** The actual has a richer description with trigger words. D2 fundamentally cannot provide CSO (Claude Search Optimization) data.
**Gap found:** Description/triggers are ALWAYS external to D2.

### Decision 6: Glossary
**Chose:** Did not include one
**Why:** D2 uses terms like "trunk", "linked", "rescue" without definitions. I recognized them as domain terms but D2 doesn't mark them as glossary entries.
**Was it right?** The actual SKILL.md has a full Glossary section with 7 defined terms.
**Gap found:** Domain vocabulary is invisible in D2. There's no D2 mechanism to say "this term needs a definition."

---

## What D2 Successfully Expressed

1. **Flow structure** — sequential steps within phases (Plan, Execute)
2. **Decision points** — diamonds clearly mark conditionals
3. **Branch outcomes** — edge labels show what happens for each choice
4. **Procedure reuse** — container nesting shows call relationships
5. **Phase transitions** — edges between top-level containers show modes
6. **Loop semantics** — "For each" in container names implies iteration
7. **Terminal states** — HALT, END nodes mark stopping points

## What D2 Could NOT Express

### Missing entirely from D2 → required external knowledge

| Gap | What's missing | In actual SKILL.md? | Severity |
|-----|---------------|---------------------|----------|
| **Glossary** | Domain term definitions | Yes — 7 terms | High |
| **Frontmatter** | name, description, CSO triggers | Yes — YAML block | High |
| **Command details** | Exact git commands beyond node label | Yes — e.g., `git merge-tree $(git merge-base...)` | High |
| **Template references** | Which template to use for output | Yes — _trunk-dirty_, _plan-preview_, etc. | Medium |
| **User interaction details** | AskUserQuestion format, select tables | Yes — detailed select/description/then tables | High |
| **Schema references** | JSON schema for RepositoryState, Plan | Yes — referenced by name | Medium |
| **Script references** | gather.sh usage, arguments | Yes — `gather [trunk]` | Medium |
| **Requirements** | `git` required, `gh` optional | Yes — one-liner | Low |
| **Visual flow reference** | "See flow.d2" pointer | Yes — render instructions | Low |
| **Speclist reading instruction** | "Read using speclist skill" | Yes | Low |

### Partially expressed in D2 → needed enrichment

| Gap | D2 has | Actual has | Delta |
|-----|--------|------------|-------|
| **Step labels** | Terse node text | ◆ title + description | D2 label = title, but description is external |
| **Decision tables** | Diamond + edges | Full select/description/then tables | Edge labels are abbreviated; tables are richer |
| **Condition priority** | Listed as nodes | Explicit "priority order" table | Ordering semantics not in D2 structure |
| **Complexity heuristics** | "few conflicts" / "many conflicts" | Same text, but more context | D2 captures the buckets, not the judgment criteria |

---

## Structural Comparison: Generated vs. Actual

| Aspect | Generated (from D2 only) | Actual SKILL.md |
|--------|-------------------------|-----------------|
| **Lines** | ~95 | ~194 |
| **Sections** | 3 (Operations, Plan/Execute, Procedures) | 4 (+ Glossary, + Operations mode table) |
| **Steps per operation** | Correct count | Same |
| **Detail per step** | Terse (1-2 lines) | Rich (3-8 lines with tables) |
| **Decision rendering** | Bullet sub-lists | Select tables with 3 columns |
| **Templates** | Not referenced | 5 named templates |
| **Scripts** | Mentioned once | Referenced with usage syntax |
| **Schemas** | Not mentioned | Referenced as RepositoryState → schema |

---

## Key Findings

### Finding 1: D2 captures ~50% of a skill's information
The flow structure is faithfully represented, but execution-quality instructions need ~2x the content. The gap is in **richness annotations**: detailed commands, interaction formats, template names, glossary terms.

### Finding 2: The gap is predictable by node type
- **Diamond nodes** → always need expansion into decision tables
- **"Show" nodes** → always need a template reference
- **"Run" nodes** → always need exact command syntax
- **"For each" containers** → adequate as-is (iteration is structural)
- **HALT/END terminals** → adequate as-is

### Finding 3: D2 comments could carry some missing info
D2 supports `# comments` — these could encode glossary terms, template references, script details. But this would make D2 a dual-purpose format (visual + metadata), which may be overloading it.

### Finding 4: The meta-skill needs a "richness layer"
D2 alone → skeletal skill. D2 + annotations → complete skill. The meta-skill must either:
(a) Accept D2 + a separate enrichment source (glossary, templates, scripts manifest)
(b) Use D2 block strings (`|md ... |`) to embed enrichment inline
(c) Prompt the generator to ask for missing details interactively

### Finding 5: Layout decisions were mechanical, not creative
Given the D2 structure, I didn't face ambiguous layout choices:
- Top containers → sections
- Sequential nodes → numbered steps
- Diamonds → decision tables or conditionals
- Procedure containers → extracted definitions
- The only creative decisions were about WHAT FORMAT to use for decision tables (bullets vs. tables) — and the actual SKILL.md always chose tables for user-facing decisions.

**Heuristic:** User-facing decisions (diamonds with 3+ edges) → select tables. Internal decisions (diamonds with 2 edges, yes/no) → inline conditionals.
