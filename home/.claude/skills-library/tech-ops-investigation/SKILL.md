---
name: tech-ops-investigation
description: Write technical operations investigation documents — root cause analysis for production failures, deploy incidents, infrastructure issues, or CI/CD gaps. Use when the user asks to write an investigation report, incident analysis, root cause analysis, production failure writeup, or any document that traces a technical failure to its causes and proposes fixes. Also trigger when the user says "write up what happened", "document this for the team", "make a report", "post-mortem", or is closing out an investigation session and needs to formalize findings.
---

# Tech Ops Investigation Document

Write investigation documents that a team can read cold — no context from the debugging session — and come away understanding exactly what happened, why, and what to do about it.

## Why this structure matters

Investigation documents serve two audiences simultaneously: busy readers who need the bottom line in 30 seconds, and reviewers who need to verify every claim. The progressive disclosure structure (TL;DR → Narrative → Recommendations → Appendices) serves both without forcing either to wade through the other's content.

The hardest part is not the writing — it's the discipline of separating what you found from what you can prove, and presenting claims only at the level of certainty you actually have.

## Document structure

### Header

Title that names the specific failure, not a vague category. Include key PR/issue links and date.

```markdown
# [Specific failure] — Analysis & Path Forward

**PR:** [#NNN](url) · **Revert PR:** [#NNN](url) · **Related:** [#NNN](url)
**Date:** YYYY-MM-DD · **Author:** Name
```

### TL;DR

Numbered list of independent gaps/causes that combined to produce the failure. Each item is a **bold assertion** followed by 2-3 sentences of supporting evidence. The TL;DR must be self-contained — a reader who stops here should understand what happened, why, and what to do.

End with:
- **Fix:** one-sentence summary of the recommended actions
- **Rollout plan:** numbered steps showing execution order

The TL;DR is the most important section. It will be read 10x more than anything below it. Every word matters.

### Narrative

Linear story of the investigation, told in sections with descriptive titles. Each section title should name what happened or what was found — not generic labels.

**Title patterns that work:**
- "Production deploy crash" — names the event
- "Why CI build passed despite the ESM incompatibility" — names the paradox
- "Why FlightControl preview's Node 20 did NOT throw" — names the surprise
- "Ruled out: recent dev/CI Node 20 → 22 upgrade (#872)" — names what was eliminated

**Title patterns that fail:**
- "The failure" — which failure?
- "The build" — which build?
- "Background" — says nothing
- "Investigation" — that's the whole document

The narrative should flow as a causal chain: what happened → why the obvious safety nets didn't catch it → what actually caused it → what we ruled out → how we reproduced it → what would have caught it.

Include a "What would have caught this" table — it forces honest reckoning about which existing checks were insufficient and which new checks actually help.

### Recommended Fixes

Numbered, ordered by priority. Each fix gets:
- What to do (specific, actionable)
- Risk assessment (separated by domain if multiple risk types exist — e.g., "Node runtime risk" vs "Nixpacks infrastructure risk")
- What exact outcome to expect (versions, behaviors — verify these, don't guess)

Future work items should be clearly marked "(future)" and linked to tracking issues rather than explained in detail.

### Appendices

Deep dives that support claims made in the narrative and recommendations. The narrative should reference appendices but never require them to make sense.

Good appendix topics:
- Third-party system internals (how Nixpacks version pinning works, how Docker tags resolve)
- Compatibility audits (dependency-by-dependency Node 22 safety check)
- Bug analysis (upstream bugs found during investigation, with source code and PRs)
- Affected service inventories (which production services are impacted)

### Links Index

Final appendix. One flat table with columns: Category | Link | Description. Every URL in the document appears here. Categories group by domain (project PRs, CI logs, vendor dashboards, upstream repos, tracking issues, release notes).

## Principles

### Every claim must be verified

Do not present speculation as fact. If you read source code, link to it. If you checked a version, show the version. If you ran a command, show the output or link to the CI job.

When you find a number (a Node version, a package version, a date), verify it against the primary source before writing it into the document. "The deploy log showed Node v20.14.0" is a verified claim. "Nixpacks probably gives 20.18.1" is not.

### Define terms on first use

The reader may not know what "externalizes" means in a webpack context, what `.nvmrc` is for, or how Nixpacks relates to Docker. Parenthetical definitions on first use are enough — don't over-explain, but don't assume domain knowledge.

### Ownership of files and configs must be clear

When a third-party tool reads a file from your repo, make explicit who owns what. "Nixpacks reads the repo's `.nvmrc` — a local dev tooling file for nvm/fnm — to select the archive" is clear. "The `.nvmrc` influences the archive" is ambiguous about who owns `.nvmrc` and whether that's intended.

### Separate narrative from deep dives

The narrative tells the story. Appendices prove the claims. If you find yourself writing 3 paragraphs about how Nixpacks version pinning works in the middle of explaining why production crashed, that's an appendix. The narrative should say "Nixpacks pins to frozen snapshots (see Appendix A)" and move on.

### Be precise about what you ruled out

If you investigated something and it wasn't a cause, say so explicitly in a "Ruled out" section. This is just as important as identifying causes — it shows the investigation was thorough and prevents future readers from re-investigating the same dead ends.

### Tone

- State facts directly. No hedging on things you verified. No "it seems" or "it appears" when you have evidence.
- Neutral toward people and teams. "The Node 20 archive has not been updated since" not "Nobody has updated the Node 20 archive since." "No releases since 2021" not "unmaintained since 2021."
- No blame attribution. Describe what happened and what was missed, not whose fault it was.
- No deployment advice slop ("deploy to preview first", "monitor post-deploy"). If a rollback path exists, state it once.
- Asides (using `>` blockquotes) are good for tangential but useful findings that would interrupt the narrative flow.

### Self-contained for cold readers

The document will be posted on a Linear issue, PR body, or shared doc. It cannot reference local files, conversation context, or "as we discussed." Every claim needs enough inline context or an appendix link to stand on its own.

### Verify all URLs

Before finalizing, extract every URL from the document and validate they resolve. Private repo links (GitHub) will 404 for unauthenticated requests — verify those with authenticated tools (`gh api`, `gh pr view`).

## Anti-patterns learned from experience

These are mistakes that had to be corrected during real investigation sessions:

1. **Generic section titles.** "The failure", "The build", "What happened" — replace with titles that name the specific thing.
2. **Brackets on recommendation titles.** "1. Bump to Node 22 (immediate fix)" — the bracket is noise. Only use brackets for "(future)" items.
3. **Mixing risk domains.** "Risk: very low" when there's both a Node runtime risk and an infrastructure risk. Separate them explicitly.
4. **Repeating the same explanation in narrative AND appendix without adding information.** The narrative should summarize; the appendix should prove. If they say the same thing, one is redundant.
5. **Hypothetical table rows.** "If `.nvmrc` is removed" scenarios that don't apply to current state. State the current state, not imagined futures.
6. **Linking to local disk files.** `.tmp/investigation.md` won't resolve when the doc is posted on Linear. Link to tracking issues, PRs, or inline the content.
7. **Attributing intent without evidence.** "Lily intended to upgrade everything" when the PR description says "across the board" but the diff shows only CI files. Describe what the change did, not what someone meant.
8. **"Open Questions" sections for resolved questions.** If you answered it during the investigation, it's not open — fold it into the narrative.
9. **Recommending monitoring/post-deploy steps as their own items.** These are noise unless there's a specific metric to watch. If rollback is trivial, say so once and move on.
10. **Using "probably" or "seems" for things you actually verified.** If you read the source code and confirmed the behavior, state it as fact.
