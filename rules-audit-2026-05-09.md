# Rules audit — 2026-05-09

## Summary

- **Total rule units audited:** 39
  - Layer 1 — `~/.claude/CLAUDE.md`: 12 sections
  - Layer 1 — `dotfiles/home/.claude/rules/*.md`: 17 files
  - Layer 2 — `/me/.claude/CLAUDE.md`: 9 sections
  - Layer 3 — `/me/CLAUDE.local.md`: 1 permission-gates table

- **KEEP:** 30
- **DELETE:** 2 (one rule file + a few weak bullets in CLAUDE.md)
- **MERGE:** 3 → 1 (the May 3 trio of scope/discovery rules)
- **RELOCATE:** 4 sections of `/me/.claude/CLAUDE.md` → README (architecture docs masquerading as rules)

> **Methodology note**: I went into this expecting the user's hypothesis ("majority to be deleted") to hold. It largely doesn't. Most of these rules are recent (≤2 months), specific, tool-tied, incident-driven, and override CC defaults in ways the agent wouldn't infer. The high-value targets are concentrated: a stale TypeScript rule, three overlapping discovery rules added in one commit, and the `/me/.claude/CLAUDE.md` file having drifted from "rules" into "architecture docs."

---

## Top-priority deletions / changes (most aggressive prune)

Ranked easy-wins-first.

1. **DELETE `dotfiles/home/.claude/rules/typescript.md`** — Says "Always use tsx" but `tsx` is not installed. Says "Prefer zx package for scripts" but `/me/.claude/CLAUDE.md` mandates Bun. The remaining `tsgo` line is the only correct content, and it's a one-liner that can fold into CLAUDE.md or a project-level rule. Path-conditional (`**/*.{ts,tsx}`), so it bloats every TS-touching session.

2. **MERGE the May 3 trio** into one rule file (suggested name: `scope-and-discovered-issues.md`):
   - `dotfiles/home/.claude/rules/debugging-quality-override.md`
   - `dotfiles/home/.claude/rules/scope-constraint-interpretation.md`
   - `dotfiles/home/.claude/rules/surface-discovered-issues.md`

   All three were created in the same commit (`b914590a`, May 3) and all three restate the same principle as CLAUDE.md's "Scope and Quality" section. They have distinct trigger contexts (debugging skill / task-prompt language / discovering bugs) but the core message is identical. One file with three subsections beats three files saying the same thing.

3. **TRIM weak bullets in `~/.claude/CLAUDE.md` "Communication"**: The first three bullets ("State what's best using objective analysis", "Challenge me with better system design", "Flag potential tech debt explicitly") are vague restatements of "be opinionated, not deferential" from Primary Directive. Generic, no incident behind them, and they aren't enforceable in any concrete sense. The concrete bullets in this section (yes/no first sentence, narrow-question rule, no repo-state inventories) are load-bearing — keep those.

4. **RELOCATE architecture docs out of `/me/.claude/CLAUDE.md`**: ~70% of the file is repo architecture (Quick Start, Architecture, Source-type details, Data Layout, Categorize/report/dashboard frozen, Tooling Conventions/Bun). These are *facts about the codebase*, not *rules for the agent*. They belong in a README that the agent can `@`-import, leaving CLAUDE.md focused on agent-workflow overrides + canonical fact-file imports + tool-direction guidance.

---

## Detailed audit

### Layer 1 — `~/.claude/CLAUDE.md` (symlinked into dotfiles → has git history)

Last meaningful edit: `2026-05-03 b914590a` — recent.

#### Primary Directive — **KEEP**
"Optimize toward agentic effectiveness. Be opinionated, not deferential." Two-line manifesto. Sets the tone for everything else. Specific because it explicitly calls out anti-deference.

#### Communication — **KEEP (TRIM weak bullets)**
Mixed bag.
- DELETE: First three bullets (objective analysis / challenge me / flag tech debt) — vague restatements of Primary Directive. No concrete trigger.
- KEEP: "Let me make commits unless explicitly asked", "Push code before posting PR/issue comments" (incident-driven), narrow-question rule, yes/no-first-sentence rule, "do not append repo-state inventories when the question is only about your completion state" (clearly incident-driven — agent was over-reporting).

#### Scope and Quality (System Prompt Override) — **KEEP**
Critical override. Without this, agents follow the system prompt's "don't fix things you find / don't add improvements / three similar lines beat an abstraction" defaults — which conflict with everything else in this file. Strong "why" (explicit override of stated CC defaults). Load-bearing.

> Related: this section is the *headline* for the principle that the May 3 trio (`debugging-quality-override`, `scope-constraint-interpretation`, `surface-discovered-issues`) elaborates on. Even after merging that trio, this section stays — it overrides the *system prompt*, not a *skill*.

#### Decision Making — **KEEP**
"Always do the complete cut", "NEVER use PR size as a reason to defer", "Never guess APIs". Each is an incident-driven anti-pattern with a concrete instruction. These show up in the user's expressed style throughout CLAUDE.md.

#### Information Quality — **KEEP**
Hedging requirements + doc-lookup-order + HALT rule. Concrete and prescriptive. The HALT rule is unusual (most agents would proceed with partial knowledge) — needs to be stated.

> Note: the bullet "For third-party library or platform semantics that materially affect architecture, first assemble a local evidence base from official source, official docs source or downloaded docs..." is verbose. Could tighten without losing meaning, but content is right.

#### Token Discipline — **KEEP**
Concrete 20k-token threshold for self-reporting. Prevents runaway costs. One-paragraph, no fat.

#### Screenshots — **KEEP** (low-confidence)
Two-bullet rule about `~/Pictures/Screenshots/`. Useful only if Jason references screenshots regularly. **Open question**: does he? If he hasn't asked the agent to look at a screenshot in months, this can go.

#### Git — **KEEP**
Four bullets:
- worktree restriction (real risk: silent loss of work in shared worktrees)
- "never use git state changes to investigate type errors" (incident-driven — agent must have done this)
- "never describe changes as 'unrelated'" (incident-driven, ties to the dotfiles `surface-discovered-issues` rule and project CLAUDE.md "Pre-existing is not a reason")
- "never use `git revert`" (concrete)

All load-bearing.

#### Session Routing — **KEEP**
Six bullets disambiguating `.session/` vs `.sessions/`. Dense and specific — clearly an incident where the agent kept switching repos based on session-file paths. Without this, an agent confronting a session handoff would do the wrong thing.

> Note: The user has `.session/` and `.sessions/` directories that are very close in name and the rule's existence implies these collisions actually happened. KEEP, but the section is long — could be tightened to ~3 bullets without losing specificity.

#### Skills — **KEEP**
One line: use the `shan` CLI; don't directly modify skill dirs. `shan` is installed (`/Users/jasonkuhrt/.bun/bin/shan`). Direct edits to skill dirs would silently break the shan-managed library — concrete enforcement.

#### Agent Teams (MANDATORY) — **KEEP**
Strong, repeated language ("ONLY way", "BANNED", "If you catch yourself..."). Without this, agents default to bare `Agent({...})` calls without `team_name`, breaking the user's expectation that they can `SendMessage` to any agent by name. The repetition is intentional — it's an enforcement section.

> Note: this rule binds the agent's hands in some edge cases (e.g., the `team_name` parameter availability is implementation-dependent). The "explain to user and find an alternative" escape hatch in the last bullet handles that. KEEP as-is.

#### Claude Code Internals — **KEEP**
Lists specific JSON files not to edit + the `/plugin` etc. CLI surfaces. The exception clause is well-formed (`jq empty` validation). Concrete and necessary.

---

### Layer 1 — `dotfiles/home/.claude/rules/`

For each rule: last touched, recommendation, rationale.

#### ci-polling-interval.md — **KEEP**
Last touched: 2026-05-03 (1 week ago). Says "use 1m for CI polling, never 5m." 4 lines total. Concrete and current. Without it, agent defaults to longer intervals.

#### cli.md — **KEEP (consider trim)**
Last touched: 2026-03-07 (2 months). Documents argc-based bash CLI conventions + annotation table. `argc` is installed and in Brewfile. The annotation reference table is mid-density — useful for *writing* CLIs but most session-context is *running* them where `<cli> --help` (already in the rule) suffices. Could be trimmed to first two sections; the annotation table belongs in argc's own docs.

#### debugging-hooks.md — **KEEP**
Last touched: 2026-03-07 (2 months). Counter-file pattern for verifying hook execution — clearly incident-driven (the "hook success" reminder only confirms exit 0). Hook system is active (`settings.json` configures multiple PreToolUse hooks). When debugging hooks, this pattern is exactly right.

#### debugging-quality-override.md — **MERGE**
Last touched: 2026-05-03. Overrides the `superpowers:systematic-debugging` skill's "no while-I'm-here improvements" instruction. Same principle as `surface-discovered-issues.md` and the CLAUDE.md "Scope and Quality" section, scoped to the debugging skill specifically. The table comparing "correctness" vs "preference/architecture/cleanup" findings is good content — preserve in the merged file.

#### dev-browser.md — **KEEP**
Last touched: 2026-03-29. dev-browser is installed (`/Users/jasonkuhrt/.bun/bin/dev-browser`). Daemon connection caching, named pages, sandbox limitations — each section is incident-driven (Cloudflare Turnstile, "Allow remote debugging" dialogs, QuickJS sandbox blocks). Specific operational knowledge that the agent cannot infer.

> Tightening: "Never do these" is a bit long. Each "never" item has a real failure mode behind it though, so I'd leave them.

#### git-commits.md — **KEEP**
Last touched: 2026-03-18. One trailer (`Session-Id: <id>`). Concrete, present in every commit on `git log` (e.g., `19bcf7b9`, `db962499`). Without it, traceability is lost. 8 lines total — minimal cost.

#### github-workflow-dispatch.md — **KEEP**
Last touched: 2026-03-22. "Use `gh api -X POST .../dispatches` directly, not `gh workflow run`." Incident-driven — `gh workflow run` looks up workflows from default branch and fails for unmerged workflow files. The "Never tell user they need to merge first" line is the load-bearing override (without this, agent will incorrectly tell user to merge a workflow registration PR).

#### keychain-totp.md — **KEEP**
Last touched: 2026-03-29. `oathtool` is installed (`/opt/homebrew/bin/oathtool`). The critical detail is "TOTP secret in `secret` parameter, NOT Recovery Setup Key" — without this, agent will read the wrong field from the Passwords app and generate wrong codes. This is exactly the kind of thing that's hard to discover and easy to forget — strong KEEP candidate.

> Usage cadence: low (TOTP automation is rare), but when needed, content is irreplaceable.

#### library-semantic-boundaries.md — **KEEP**
Last touched: 2026-03-19. About a specific anti-pattern: dismissing API concerns based on "we control the only consumer in this repo." This is a real recurring failure mode — agents will use file proximity / monorepo coupling to justify skipping work. The "consumer knowledge you shouldn't have" framing is pointed and concrete. Has a concrete why (decoupled-by-design contract for library code).

#### naming.md — **KEEP**
Last touched: 2026-03-18. Two strong sections: "Verbosity Is Never A Criterion" and "Domain Terms Are Dogma." Anti-shortening + anti-synonym rules with all-caps emphasis suggesting the user got burned multiple times by agents auto-shortening domain terms. The example ("tier" instead of "product option") is concrete. KEEP — without this rule, agents will absolutely abbreviate.

#### no-time-estimates.md — **KEEP**
Last touched: 2026-05-03. Explicit list of banned phrasings + alternatives. Recent. Agents emit time estimates by default ("this will take ~2 days") — this rule prevents that. Specific and current.

#### nvim-workflows.md — **KEEP**
Last touched: 2026-03-07. The `nvim --headless +'lua...'` verification pattern + "read installed plugin source at `~/.local/share/nvim/lazy/<plugin>/`, not web docs." nvim config is actively edited (recent commits to `keymaps.lua`). The plugin-source-vs-web-docs guidance is incident-driven and specific.

#### plan-mode.md — **KEEP**
Last touched: 2026-03-22. "Don't auto-call ExitPlanMode after writing a plan file." Has a clear "why" (`defaultMode: bypassPermissions` auto-approves all tools, skipping user's review loop in Plannotator). Without this, plan-mode is broken for the user's workflow.

#### plugin-management.md — **KEEP**
Last touched: 2026-05-03. "Use `claude plugin` CLI; not REPL." Recent. Claude Code is installed at `/Users/jasonkuhrt/.local/libexec/claude/bin/claude` and the CLI surface is real. Tiny rule, tiny cost.

#### scope-constraint-interpretation.md — **MERGE**
Last touched: 2026-05-03. Same principle as `surface-discovered-issues.md` and `debugging-quality-override.md`. The "Constraint → Means / Does NOT mean" table is good content — preserve in merged file. Distinct trigger context (parsing user's task language).

#### surface-discovered-issues.md — **MERGE**
Last touched: 2026-05-03. The "What counts as discovering" enumeration is the most concrete content of the trio. Distinct trigger context (finding bugs while working). Merge target is the consolidated file.

#### typescript.md — **DELETE**
Last touched: 2026-03-08. Path-conditional (`**/*.{ts,tsx}`).

Issues:
- "Always use tsx to execute TypeScript files" — `tsx` is **not installed**. The instruction is wrong on this machine.
- "Always use `tsgo` for TypeScript build and typecheck workflows" — `tsgo` IS installed. This is the only valid line, and it can fold into CLAUDE.md "Decision Making" or a project-level rule.
- "Always use `tsconfig.json` when running `tsgo`" — generic best practice, restates `tsgo`'s default behavior.
- "Never use child process exec to execute a script when you could ESM import it instead" — generic best practice, not Jason-specific.
- "Never use ESM dynamic import when you could ESM statically import it instead" — same.
- "Prefer zx package for scripts over bash" — conflicts with `/me/.claude/CLAUDE.md` Bun mandate (`Bun.$\`ls\`` etc.).

Net: this rule is stale, partially wrong, partially generic, and in conflict with another active rule. Delete. If `tsgo` guidance is actually load-bearing, fold one line into CLAUDE.md or a per-project rule.

---

### Layer 2 — `/me/.claude/CLAUDE.md`

Last meaningful edit: 2026-05-03 (`restructure: groups→splitwise, consolidate CLAUDE.md, dedupe facts/entities`). The user already did one consolidation pass.

> **Headline finding**: ~70% of this file is repo architecture documentation, not agent rules. Architecture changes will silently invalidate this content. Recommend splitting: keep the agent-workflow section + tool-direction guidance, move architecture to README that's `@`-imported (so it shows up but lives where it belongs).

#### "Personal Finance & Tax Project" header + intro — **KEEP**
Two lines establishing context (personal project, scope, household, bank). Frame for everything else.

#### Agent Workflow — **KEEP**
Six bullets explicitly overriding superpowers skills (`brainstorming` HARD-GATE, `writing-plans`/`executing-plans`, "v1/v2" framing, "build don't gate", "brainstorm freely document sparingly", no project-root agent context files). Concrete overrides; without these, agents will produce specs and v1/v2 plans for trivial work. The closing principle ("the chat IS the design doc; the git history IS the changelog") is the load-bearing why. Strong KEEP.

#### Canonical fact files (auto-imported) — **KEEP**
Documents the four `@`-imports (entities.yml, home.md, facts.md, matters/alimony-withholding/FACTS.md) and the "fact-track once, never re-ask" principle. Necessary infrastructure. Don't touch.

#### Quick Start — **RELOCATE → README**
Bash recipes for `bun install`, `td-statements/syncer.ts`, etc. This is README content; agent doesn't need to know quick-start commands as a "rule." Move to README.md (or docs/setup.md) and `@`-import if needed.

#### Architecture — **RELOCATE → README**
Source-type convention, directory layout, schema.ts conventions, two-source-types table. Pure architecture documentation. Belongs in a README or `docs/architecture.md`.

#### Source-type details — **RELOCATE → README**
Per-source-type auth, entities, operator CLI. Reference material; not behavioral rules.

#### Data Layout — **RELOCATE → README**
Directory tree + Source File Naming table. Same — README content.

#### Categorize / report / dashboard — frozen, awaiting redesign — **KEEP-LITE**
This is closer to a rule because it tells the agent "this surface is frozen, don't modify pointers piecemeal." Could be reduced to a 2-line rule ("dashboard/categorize/report consume frozen `data/derived/td-statements.json`; redesign deferred — see `docs/plans/effect-followups.md`") rather than the full prose explanation. But the gist is load-bearing.

#### Email archive (msgvault) — **KEEP**
Tells the agent to use the `msgvault` MCP for email evidence searches rather than asking. `msgvault` is installed (`/Users/jasonkuhrt/.local/bin/msgvault`) and registered as MCP. This is direction-giving (which tool to choose), not architecture documentation. Strong KEEP.

> Tightening: the section is long. The load-bearing parts are: "msgvault is the canonical search index for email evidence" + "search via Claude Code MCP" + path to db. The recipes/daemon details could go to `docs/msgvault-setup.md`.

#### Tooling Conventions / Bun — **RELOCATE → bun-conventions.md or README**
Substantial Bun reference: bun-vs-npm equivalents, Bun built-in APIs, testing pattern, browser automation, frontend. This is generic Bun guidance applied to /me. Could either:
- Move to a global rule (`dotfiles/home/.claude/rules/bun.md`) since most of it isn't /me-specific, OR
- Move to a README and rely on Bun's own docs

The "for `dev-browser`, prefer the CLI directly and read its built-in LLM guide via `dev-browser --help`. Do not install a `dev-browser` plugin or skill for agent usage" — this IS /me-specific (or at least project-specific) and belongs as a small rule. The generic Bun stuff doesn't.

---

### Layer 3 — `/me/CLAUDE.local.md`

The file is 18 lines, generated by a `git agent` CLI (note the `<!-- git-agent:start -->` markers). The user's CLAUDE.md says: "You do NOT have permission to run any `git agent` commands. Only the human controls these settings."

#### Permission Gates table — **KEEP (don't touch)**
Difference from dotfiles' `CLAUDE.local.md`: `/me` blocks `git push` (probably because /me contains personal financial data and pushing to a remote could leak private info). All other gates match. This file is auto-managed and load-bearing. Do not touch.

---

## Proposed merge consolidation

Merge these three files into one new file `dotfiles/home/.claude/rules/scope-and-discovered-issues.md`:

- `debugging-quality-override.md`
- `scope-constraint-interpretation.md`
- `surface-discovered-issues.md`

Suggested structure of the merged file:

```markdown
# Scope and Discovered Issues

[Headline: scope/skill constraints don't excuse silence about problems you discover.]

## Parsing Task Language (was: scope-constraint-interpretation.md)

| Constraint | Means | Does NOT mean |
| ... |

## What Counts As Discovering (was: surface-discovered-issues.md)

- A test you ran has a wrong assertion ...
- ...

## Overriding the Debugging Skill (was: debugging-quality-override.md)

The systematic-debugging skill says "no while-I'm-here improvements" — that's
right for refactoring/cleanup, wrong for correctness:

| Found during debugging | Action |
| ... |

## Invalid Reasons to Stay Silent

- "Pre-existing"
- "Out of scope"
- "Not from this PR"
- "Acceptable for now"
- "Separate PR"
```

Net effect: 3 files → 1 file. Same content, less rule sprawl, single canonical location. Cross-reference from CLAUDE.md "Scope and Quality" section.

---

## Proposed relocations

### Move out of `/me/.claude/CLAUDE.md` into a README/docs

These sections are architectural documentation, not agent rules:
- Quick Start
- Architecture
- Source-type details
- Data Layout
- Tooling Conventions / Bun (mostly — keep `dev-browser` line as a rule)

Suggested structure post-relocation:

`/me/README.md` (new or expanded):
- Quick Start
- Architecture (with source-type convention)
- Source-type details
- Data Layout
- Bun conventions

`/me/.claude/CLAUDE.md` (slimmed):
- Personal Finance & Tax Project intro
- Agent Workflow (skill overrides)
- Canonical fact files (`@`-imports)
- Frozen surfaces (categorize/report/dashboard) — 2 lines
- Email archive (msgvault) — load-bearing tool direction
- dev-browser line (don't install plugin/skill — use CLI directly)

This drops `/me/.claude/CLAUDE.md` from ~11 KB to maybe ~3 KB while preserving every rule that's actually directing agent behavior.

### Optional: hoist `dev-browser` Bun guidance to a global rule

If the "use CLI, not plugin/skill" guidance applies to any project that might pull in dev-browser (not just /me), it belongs in `dotfiles/home/.claude/rules/dev-browser.md` rather than /me CLAUDE.md.

---

## Open questions for Jason

1. **typescript.md — confirm tsx is dead?** The rule says "Always use tsx" but `tsx` isn't installed. Has `tsx` been replaced by Bun for script execution everywhere, or is this a machine-state quirk? If Bun has fully replaced tsx, the rule needs at minimum a rewrite (`tsx` → `bun`) and probably deletion once `tsgo` guidance is folded elsewhere.

2. **Three-way merge — really preferable as one file?** The May 3 trio has distinct trigger contexts (debugging skill / parsing task language / discovering bugs). Three separate filenames give three separate "hooks" the agent might lock onto. Merging is what bias-toward-deletion implies, but there's an argument that three reinforcement points beats one. Your call.

3. **Screenshots — still useful?** When was the last time you asked the agent to look at a screenshot? If it's been a couple weeks, this rule is dead weight in every session.

4. **Communication section — drop the first three weak bullets?** "State what's best", "Challenge me with better system design", "Flag tech debt" are vague restatements of Primary Directive. Concrete bullets stay (yes/no first sentence, no repo-state inventories, etc.).

5. **/me CLAUDE.md — move architecture to README?** You did a consolidation pass on May 3. The file is now ~70% architecture documentation. README + `@`-import (or just README without import — agent can read it on demand) would shrink the always-loaded context substantially without losing anything the agent needs.

6. **Session Routing section — has this incident reoccurred since the rule was added?** It's dense and specific. If `.session/` vs `.sessions/` confusion is a one-time fix from March 22, the rule could be tightened. If it's still happening, leave as-is.

7. **library-semantic-boundaries.md vs CLAUDE.md "Decision Making"** — these don't actually overlap (one is about library API contracts, the other about complete cuts/no-backwards-compat), but they're adjacent. Confirm both still feel necessary.

8. **cli.md — keep the argc annotation table?** The "run `<cli> --help`" rule is the load-bearing part. The `# @flag`, `# @option` reference table bloats context but is rarely needed in a session that isn't *writing* a new bash CLI.

---

## Bash commands to execute the prune

If approved:

### Step 1 — delete typescript.md

```bash
cd /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles
rm home/.claude/rules/typescript.md
git add home/.claude/rules/typescript.md
```

If `tsgo` is still load-bearing, fold this single line into the CLAUDE.md "Decision Making" section before deleting:

> Use `tsgo` for TypeScript build and typecheck workflows.

### Step 2 — merge the May 3 trio

This needs hand-editing rather than `sed`/`cat` to preserve voice and structure. Suggested process:

1. Read all three:
   ```bash
   cd /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.claude/rules
   cat debugging-quality-override.md
   cat scope-constraint-interpretation.md
   cat surface-discovered-issues.md
   ```

2. Create `scope-and-discovered-issues.md` with the structure shown in "Proposed merge consolidation" above.

3. Delete the originals:
   ```bash
   rm debugging-quality-override.md
   rm scope-constraint-interpretation.md
   rm surface-discovered-issues.md
   ```

4. (Optional) Cross-reference the new file from CLAUDE.md "Scope and Quality" section.

### Step 3 — trim weak Communication bullets

Use the Edit tool on `/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.claude/CLAUDE.md` — open the file and remove (manual diff because markdown):

```diff
 ## Communication

 * State what's best using objective analysis.
 * Challenge me with better system design and techniques
 * Flag potential tech debt explicitly
 * Let me make commits unless explicitly asked
```

becomes:

```diff
 ## Communication

 * Let me make commits unless explicitly asked
```

(Keep the rest of the section.)

### Step 4 — Screenshots section, if dead

```diff
-## Screenshots
-
-* All screenshots at `~/Pictures/Screenshots/`. "My latest screenshot" → check dir sorted by mtime.
-* Auto-move screenshots from root to `~/Pictures/Screenshots/claude/` before reading.
-
```

Pending answer to Open Question #3.

### Step 5 — /me CLAUDE.md relocation

This is a structural change requiring:
1. Create or expand `/Users/jasonkuhrt/me/README.md` with the architecture sections (or split into `/me/docs/architecture.md`).
2. Edit `/Users/jasonkuhrt/me/.claude/CLAUDE.md` to remove the relocated sections, keeping only: header, Agent Workflow, Canonical fact files, Frozen-surfaces (slimmed), Email archive (slimmed), dev-browser line.
3. Optionally `@`-import the README from CLAUDE.md so its content remains in agent context.

I'd recommend doing this as a separate session — it's not a mechanical edit.

### Step 6 — commit

```bash
cd /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles
git add -p home/.claude/rules/ home/.claude/CLAUDE.md
git commit -m "$(cat <<'EOF'
prune agent rules — typescript stale, scope trio merged

Removes:
- home/.claude/rules/typescript.md (referenced uninstalled tsx, conflicted with /me Bun mandate)
- weak first bullets of CLAUDE.md "Communication" section (restated Primary Directive)

Consolidates:
- debugging-quality-override.md + scope-constraint-interpretation.md +
  surface-discovered-issues.md → scope-and-discovered-issues.md

Audit notes: dotfiles/rules-audit-2026-05-09.md

Session-Id: a427588f-4d63-4998-9d73-d69a96e0cdb1
EOF
)"
```

(Adjust commit message based on what you actually action.)
