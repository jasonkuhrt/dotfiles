---
name: research
description: Use when working with research files (~/.claude/research/ by default, .claude/research/ for project level) — creating, importing, formatting, pruning conversational artifacts, or flushing session learnings before context loss. Covers research file lifecycle.
---

## Level

Research files live in one of two locations:

| Level   | Path                  | When                                      |
| ------- | --------------------- | ----------------------------------------- |
| user    | `~/.claude/research/` | **Default** — general learnings, cross-project |
| project | `.claude/research/`   | Only when user explicitly says "project level" |

**Default is user level.** Use `--project` flag to override:

```bash
# User level (default)
~/.claude/skills/research/research.sh new <topic>

# Project level (only when explicitly requested)
~/.claude/skills/research/research.sh --project new <topic>
```

**Trigger phrases for project level:** "project level", "project research", "in this project's research"
— anything else defaults to user level.

## Write

Manage research files — creation, naming, sorting, archival.

### CRITICAL

#### ALWAYS Use This Skill

**NEVER write directly to the research directory.** All research file creation MUST go through this skill to ensure:

- Correct naming convention
- `writing-compact` formatting applied
- Proper integration with existing research

**Every write operation (create, import, move) MUST complete the full pipeline:**

1. **Script** — `research.sh` handles mechanical parts (move, rename, gh-links)
2. **Claude** — YOU handle Claude-only parts (`writing-compact`)

The script is NOT the complete solution. You are the orchestrator.

**Two authorship paths — pick the right one:**

- **Claude is the author** (flush, save, create-and-write) — write content in `writing-compact` format from the start. No separate formatting pass. No preview-iterate-apply. You're the author, so author it correctly the first time.
- **Importing external content** (import, move) — run `writing-compact` as a separate formatting pass with preview-iterate-apply, because you're reformatting someone else's writing.

**Skipping `writing-compact` entirely is a failure.** But invoking it as a separate preview-iterate step on your own freshly written content is also wrong — there's no delta to review.

### Operations

- **Create new file**

  ```bash
  ~/.claude/skills/research/research.sh new <topic>
  ```

  Then: write content in `writing-compact` format directly (you're the author)

- **Import existing file**

  ```bash
  ~/.claude/skills/research/research.sh import <file> [topic]
  ```

  Script auto-enriches GH links. Then: invoke `writing-compact` with preview-iterate-apply (external content)

- **Sort/renumber**

  ```bash
  ~/.claude/skills/research/research.sh sort
  ```

- **Archive old files**

  ```bash
  ~/.claude/skills/research/research.sh cleanup
  ```

- **List files**

  ```bash
  ~/.claude/skills/research/research.sh list
  ```

- **Enrich GitHub links**

  ```bash
  ~/.claude/skills/research/research.sh format-gh-links <target>
  # Targets: current, all, diff, all-including-old, <file>...
  ```

### File Format

```
<YYYY-MM-DD>-<HHMM>-<topic>.md
```

- Date/time — UTC
- Topic — kebab-case

### Notes

- All timestamps UTC (`date -u`)
- 30-day auto-archive keeps recent files manageable

## Prune

Remove non-factual content from research files. Intentionally lossy — removes conversational artifacts to distill knowledge.

### Use Cases

- After importing PR comments or conversation excerpts
- When research files contain Q&A formatting
- To distill knowledge from discussion threads

Triggers: "prune research", "clean up research", "remove conversational bits"

### Scope

| Request                   | Target                               |
| ------------------------- | ------------------------------------ |
| "prune research"          | All recent (`<research-dir>/*.md`)   |
| "prune current/latest"    | Most recent (`01-*.md`)              |
| "prune dirty/changed"     | Git dirty files                      |
| "prune these docs" + list | Specified files                      |
| "prune all including old" | Include `older-than-30/`             |

**Default: recent only** — avoids accidentally processing large archives.

### Conversational Heuristics

| Pattern             | Example                                  | Action                         |
| ------------------- | ---------------------------------------- | ------------------------------ |
| Greetings           | "Hey @person, here's the lowdown..."     | Remove                         |
| Quoted Q&A          | `> Question` + response                  | Extract fact, remove framing   |
| Agreement           | "Right!", "Yes.", "Correct."             | Remove                         |
| Opinion framing     | "I'd push back on this"                  | Keep fact, remove framing      |
| Hedging             | "maybe", "I think", "IIUC"               | Remove or convert to fact      |
| PR negotiation      | "Fine to do it in this PR"               | Remove                         |
| Questions to reader | "But I don't think we're doing X?"       | Convert to statement           |
| Personal refs       | "like I've done with X, Y, Z"            | Remove                         |
| Future intentions   | "I'll look into...", "TODO for tomorrow" | Remove or track in Linear      |
| Status updates      | "no more major changes"                  | Delete file if no facts remain |

### Process

1. **Read file**
2. **Present removals** — table with line numbers and suggestions
3. **Wait for confirmation** — user approves or adjusts
4. **Apply edits** — only after approval

## Format

Apply formatting to research files. Never lossy — only restructures and enriches.

### Use Cases

- Standardizing research file formatting
- Enriching GitHub issue references with dates
- Applying writing-compact style

Triggers: "format research", "enrich research links"

### Scope

| Request                    | CLI Target          |
| -------------------------- | ------------------- |
| "format research"          | `all`               |
| "format current/latest"    | `current`           |
| "format dirty/changed"     | `diff`              |
| "format these docs" + list | `<file>...`         |
| "format all including old" | `all-including-old` |

**Default: `all` (recent only)** — avoids accidentally processing large archives.

### Steps

1. **Enrich GitHub links** (issues, PRs, discussions)

   ```bash
   ~/.claude/skills/research/research.sh format-gh-links <target>
   # Targets: current, all, diff, all-including-old, <file>...
   ```

   **Output formats:**
   - Issues/PRs open: `[org/repo#N (2025-03-05)](url)`
   - Issues/PRs closed: `[org/repo#N (2025-03-05 → 09)](url)` — smart abbreviation
   - Discussions: `[org/repo#dN (date)](url)` — `#d` prefix (separate namespace)

2. **Apply `writing-compact` skill** for structure/layout

## Flush CC Thread

Extract and preserve learnings from current Claude Code conversation before context window exhaustion or session end.

### Use Cases

- **Context preservation** — session ending, need to capture discoveries
- **Failed experiments** — document what didn't work and why
- **Non-obvious behavior** — capture gotchas for future reference
- **Decision rationale** — record alternatives considered

Triggers: "flush research", "save this to research", "preserve this thread", "capture these learnings"

### Steps

1. **Identify knowledge worth preserving**
   - technical findings, blockers, workarounds
   - decisions and alternatives considered
   - gotchas and non-obvious behavior
   - links to issues, PRs, documentation

2. **Use the Write section above** to create file and write content
   - follow its pipeline for format
   - include session source at end of file:
     ```
     ---
     Source: claude -r ${CLAUDE_SESSION_ID}
     ```
