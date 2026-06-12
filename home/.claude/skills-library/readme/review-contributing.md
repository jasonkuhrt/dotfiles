# Review: CONTRIBUTING.md

Assess CONTRIBUTING.md quality against the actual project. Read `~/.claude/skills/readme/core.md` and `~/.claude/skills/readme/core-contributing.md` for the quality protocols.

## Steps

### 1. Load source truth (expensive, required)

Read the project to understand the actual development workflow:

1. `hooks/` directory — what do pre-commit/pre-push hooks run?
2. `.github/workflows/` — what does CI check?
3. package.json scripts — what's available (but remember: workflow over inventory)
4. CLAUDE.md / .claude/rules/ — are there agent-specific conventions?
5. Git log — has the build/test/lint tooling changed recently?

From this, build a checklist of:
- The actual development workflow (what happens when you commit, push, PR)
- Prerequisites that must be installed
- Architecture: where things live, how packages relate
- Conventions: commit format, PR process, branch naming

### 2. Read the CONTRIBUTING.md

Read the existing CONTRIBUTING.md fully.

### 3. Coverage comparison

- __Missing workflow steps__ — the actual development flow includes steps the guide doesn't mention
- __Stale automation references__ — guide mentions hooks or CI steps that no longer exist
- __Missing architecture__ — packages or directories exist that the architecture section doesn't cover
- __Missing conventions__ — commit hooks enforce rules the guide doesn't explain

### 4. Quality checks

Run checks from `~/.claude/skills/readme/core.md` and `~/.claude/skills/readme/core-contributing.md`:

- Section order (from core-contributing.md)
- Heading density (from core.md)
- Anti-slop scan (from core.md)
- Workflow over inventory (from core-contributing.md) — is it describing the workflow or listing scripts?
- Cross-links — does it link to README.md glossary via [`term`](README.md#term), not duplicate definitions?

### 5. Returning maintainer test

Spawn two subagents in parallel, each with ONLY the CONTRIBUTING.md content (and a note that README.md exists at the same level).

__Reader E — Returning maintainer (built this, away 1 week)__
1. How do I get a working dev environment from a fresh clone?
2. What happens when I commit — do I need to run anything manually?
3. What are the internal boundaries — which modules know about which?

__Reader F — New contributor (first time, has read the README)__
1. Where do I find the code for [specific feature mentioned in README]?
2. How do I run the tests for just one package?
3. How do I add a new module or extend the system?

__Triangulation:__ Both struggle with the same area → high severity. One struggles → medium.

### 6. Cross-file consistency

Check that README.md and CONTRIBUTING.md are not drifting:

- Domain terms in CONTRIBUTING link to README glossary, not redefined inline
- README's contextual links section points to CONTRIBUTING.md if it exists
- Architecture described in CONTRIBUTING matches the project structure the README implies

### 7. Report

Present findings in three categories:

- __Coverage gaps__ — workflow steps, architecture, conventions the guide doesn't mention
- __Quality violations__ — section order, anti-slop, script-inventory smell
- __Accuracy issues__ — reader test findings + cross-file drift

Do not write unless the user explicitly instructs you to fix what you found.
