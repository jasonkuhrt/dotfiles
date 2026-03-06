# Meta-Skill Design: D2-Driven Skill Authoring

## Summary

A meta-skill that reads D2 flow specs and produces (or updates) skill layouts optimized for Claude Code execution. Discovered through 3 manual iterations against real skills.

## Core Model

D2 captures **structural intent** — phases, steps, decisions, procedures, terminals. SKILL.md needs **execution-quality instructions** — exact commands, interaction tables, glossary, templates, schemas. The meta-skill bridges these by applying mechanical layout heuristics to D2 structure, then identifying and filling enrichment gaps.

```
D2 (structural intent) → Layout Heuristics → Skeleton SKILL.md → Enrichment → Complete SKILL.md
```

The gap between D2 and a complete skill is predictable and classifiable. D2 carries ~50% of the information; the rest follows discoverable patterns.

---

## Operations

### 1. Greenfield — Generate skill from D2 spec

**Input:** `.d2` file
**Output:** Complete skill directory (SKILL.md + support files)

**Process:**

1. PARSE D2 STRUCTURE ◆ Extract structural elements.
   - Top-level containers → phases/operations
   - Sequential nodes within containers → numbered steps
   - Diamond nodes → decision points
   - Container named "procedures" or sub-containers referenced from multiple places → Procedures section
   - HALT/END nodes → terminal states
   - Edges between top-level containers → operation modes or phase transitions

2. APPLY LAYOUT HEURISTICS ◆ Map structure to SKILL.md format.
   (See Layout Heuristics section below)

3. IDENTIFY ENRICHMENT NEEDS ◆ Flag what D2 can't express.
   (See Enrichment Gap Patterns below)

4. FILL ENRICHMENT ◆ Either derive from conventions or prompt for details.
   - Auto-derivable: step titles, section structure, decision table skeletons
   - Needs prompting: command details, glossary definitions, template contents, temporal behavior

5. ASSESS SUPPORT FILES ◆ Determine if schemas/scripts/templates are needed.
   (See Support File Heuristics below)

6. GENERATE ◆ Produce SKILL.md and support files.

### 2. Brownfield — Update skill after D2 changes

**Input:** Modified `.d2` file + existing skill directory
**Output:** Targeted edits to SKILL.md (or full regeneration if needed)

**Process:**

1. DIFF D2 ◆ Identify structural changes.
   - New containers → new steps/phases
   - New nodes in existing containers → new table rows or sub-steps
   - Removed nodes → removed steps/rows
   - Repointed edges → changed flow

2. CLASSIFY CHANGES ◆ Determine edit strategy.

   | Change type | Strategy | Automated? |
   | ----------- | -------- | ---------- |
   | Insert step in sequence | Targeted insert + renumber | ✅ Yes |
   | Add option to decision | Add table row | ✅ Yes |
   | Add new phase | Insert section | ✅ Yes |
   | Remove step | Remove + renumber | ⚠️ Check references |
   | Reorder steps | Full regeneration | ❌ No |
   | Restructure procedures | Full regeneration | ❌ No |
   | Change flow topology | Full regeneration | ❌ No |

   **Rule:** Structural edits (preserve linearization) → targeted. Topological edits (change linearization) → regenerate.

3. APPLY EDITS ◆ Execute targeted edits or trigger regeneration.

4. FILL ENRICHMENT ◆ Prompt for new enrichment needs (new commands, glossary terms, etc.)

### 3. Validation — Check skill ↔ D2 alignment

**Input:** `.d2` file + existing skill directory
**Output:** Drift report

**Process:**

1. EXTRACT STRUCTURE FROM SKILL.MD ◆ Parse numbered steps, decisions, procedures.
2. EXTRACT STRUCTURE FROM D2 ◆ Parse containers, nodes, edges.
3. COMPARE ◆ Identify:
   - Steps in SKILL.md not in D2 (skill-only additions)
   - Steps in D2 not in SKILL.md (drift — skill behind)
   - Decision mismatches (different options)
   - Procedure mismatches (different sub-steps)
4. REPORT ◆ Show drift with actionable fix suggestions.

---

## Layout Heuristics

These heuristics map D2 structural elements to SKILL.md layout choices. All were discovered empirically across 3 iterations.

### Structure → Section Mapping

| D2 Element | SKILL.md Section | Condition |
| ---------- | ---------------- | --------- |
| Top-level containers | `### Operation` headings | Always |
| Container named "procedures" | `## Procedures` section | When present |
| Sub-containers referenced from multiple containers | Extracted to Procedures | Cross-container edges |
| Sequential nodes in container | Numbered steps under operation | Always |
| Diamond nodes | Decision points within steps | Always |
| HALT/END nodes | **HALT** / **END** markers | Always |

### Decision Point Rendering

| D2 Pattern | SKILL.md Rendering |
| ---------- | ------------------ |
| Diamond with 2 edges (yes/no) | Inline conditional: `- If X: ... / - Else: ...` |
| Diamond with 3+ edges | AskUserQuestion select table (select/description/then columns) |
| Diamond with 3+ edges but no user interaction | Priority table (condition/action/set columns) |

**Distinguishing user-facing vs. internal decisions:** If the D2 uses verbs like "Ask", "Choose", "Resolve" in the diamond label, it's user-facing → select table. If the label is a condition check ("Is X?", "Has Y?"), it's internal → priority table or inline conditional.

### Phase vs. Mode Detection

| D2 Pattern | SKILL.md Layout |
| ---------- | --------------- |
| Unidirectional edges between top-level containers | Sequential phases (no mode table) |
| Bidirectional or optional edges (edge labels like "plan only") | Operation modes → mode table |
| Single top-level container | Single operation (no mode/phase distinction) |

### Procedure Extraction

| D2 Pattern | SKILL.md Layout |
| ---------- | --------------- |
| Sub-container referenced from 1 place | Inline within the calling step |
| Sub-container referenced from 2+ places | Extract to Procedures section |
| Container explicitly named "procedures" | All children become Procedure definitions |

---

## Enrichment Gap Patterns

These are information types that D2 cannot express but SKILL.md always needs. The meta-skill must detect and fill them.

### Always Required (every skill)

| Gap | Detection | Resolution |
| --- | --------- | ---------- |
| **Frontmatter** (name, description) | Always missing from D2 | Prompt: "Skill name? Triggering conditions?" |
| **Requirements** (tools needed) | D2 mentions commands but not requirements | Derive: extract unique CLI tools from node labels |
| **Command details** | D2 labels are terse | Prompt for each "Run X" / "Check X" node |

### Conditionally Required

| Gap | Detection | Resolution |
| --- | --------- | ---------- |
| **Glossary** | Count unique domain terms in D2 labels | If 3+ non-standard terms → prompt for definitions |
| **Interaction tables** | Diamonds with 3+ edges and user-facing verbs | Auto-skeleton from edge labels, prompt for description/then |
| **Template references** | Nodes with "Show" in label | Prompt: "What template?" or auto-name |
| **Temporal behavior** | Back-edges (loops) in D2 | Prompt: "Poll interval? Timeout? Max retries?" |
| **Default path** | Multi-option diamonds | Prompt: "Which option is default?" or convention: first edge |

### Support File Needs

| Support File | Detection Heuristic |
| ------------ | ------------------- |
| **Schemas** | Flow produces structured data persisted across phases (e.g., Plan → Execute) |
| **Scripts** | Any step requiring >3 shell commands or data aggregation |
| **Templates** | 2+ "Show X" nodes with structured/tabular output |
| **Reference files** | D2 file itself → always `reference/flow.d2` |

---

## Conventions

### D2 Authoring Conventions (for skill specs)

These conventions make D2 specs maximally parseable by the meta-skill:

1. **Top-level containers = operations/phases** — name them with the operation name
2. **Diamond shape = decision** — always `shape: diamond` on decision nodes
3. **Edge labels = outcome names** — keep terse, these become table column values
4. **"For each" prefix = iteration** — `For each tag conflict` signals a loop over a collection
5. **HALT/END in label = terminal** — use consistently
6. **"Show" prefix = user output** — signals a template or display step
7. **"Run" prefix = script/command** — signals an executable step
8. **"Ask" prefix = user interaction** — signals AskUserQuestion
9. **Container nesting = call hierarchy** — nested containers are sub-procedures
10. **Comments = context not in flow** — `#` comments carry metadata hints

### D2 Default Edge Convention

Mark default/preferred path with `(default)` suffix in edge label:
```d2
strategy -> squash: squash (default)
strategy -> rebase: rebase
```

### D2 Temporal Annotation Convention

For retry/poll loops, annotate the back-edge:
```d2
wait_ci -> check_ci: retry (30s interval, 10min max)
```

---

## Open Questions

### Q1: Should D2 block strings carry enrichment?

D2 supports `|md ... |` block strings. These could embed command details, glossary terms, or interaction tables directly in the D2 file.

**Recommendation:** Don't. Keep D2 clean as structural intent. Enrichment lives in SKILL.md. The meta-skill bridges them. Mixing makes D2 noisy and defeats the purpose of a clean visual diagram.

### Q2: How to handle skill complexity tiers?

Observation from 78 skills: complexity ranges from 1 file (minimal) to 38 files (ultra-complex). The meta-skill needs to detect which tier a D2 spec implies.

**Don't use node counts.** Use semantic signals instead:
- **Scripts needed?** → "Run X" nodes that require multi-command logic
- **Schemas needed?** → Data persists across phases
- **Templates needed?** → 2+ structured output nodes
- **Procedures section?** → Reused sub-procedures

This is semantically driven, not shape-driven. The node count correlation exists but is a symptom, not a cause.

### Q3: Validation depth

How deep should validation go?
- **Structural only:** Check that steps/decisions/procedures match between D2 and SKILL.md
- **Content-aware:** Also check that command details in SKILL.md align with D2 node labels
- **Semantic:** Check that the intent expressed in D2 is preserved in SKILL.md's execution flow

Recommendation: Start with structural. Content-aware is valuable but harder. Semantic is research territory.

---

## Iteration Evidence

### Iteration 1: Greenfield from existing D2 (git-sync)
- **Input:** flow.d2 (248 lines)
- **Output:** Generated SKILL.md (~95 lines) vs. actual (~194 lines)
- **Key finding:** D2 carries ~50% of skill information; enrichment gaps are predictable by node type
- **Heuristics discovered:** Diamond rendering rules, procedure extraction rules

### Iteration 2: D2-first design (pr-ship)
- **Input:** New D2 spec designed from scratch
- **Output:** Generated SKILL.md + D2 spec
- **Key finding:** D2-first is the healthier workflow; cleanly separates intent from execution; meta-skill is "read intent → apply heuristics → fill enrichment"
- **New gaps found:** Temporal behavior, default edges, phase-vs-mode distinction

### Iteration 3: Brownfield sync (git-sync + stale branch check)
- **Input:** Modified flow.d2 + existing SKILL.md
- **Output:** Targeted edits to SKILL.md
- **Key finding:** Structural edits (insert/add) are safely targeted; topological edits (reorder/restructure) need full regeneration
- **New heuristics:** Edit classification table, support file impact analysis

---

## Next Steps (Follow-up Bead)

1. **Encode as SKILL.md** — turn this design doc into the actual meta-skill
2. **TDD the skill** — per writing-skills methodology, baseline test → write skill → verify
3. **Build D2 conventions document** — formalize the authoring conventions (section above) as a reference file
4. **Test against 3+ real skills** — validate heuristics hold across skill complexity tiers
