---
name: research
description: Use when working with .claude/research files — creating, importing, formatting, pruning conversational artifacts, or flushing session learnings before context loss. Covers research file lifecycle.
---

## Write

Manage research files in `.claude/research/` — creation, naming, sorting, archival.

### CRITICAL

#### ALWAYS Use This Skill

**NEVER write directly to `.claude/research/`.** All research file creation MUST go through this skill to ensure:

- Correct naming convention
- `writing-compact` formatting applied
- Proper integration with existing research

**Every write operation (create, import, move) MUST complete the full pipeline:**

1. **Script** — `research.sh` handles mechanical parts (move, rename, gh-links)
2. **Claude** — YOU handle Claude-only parts (`writing-compact`)

The script is NOT the complete solution. You are the orchestrator.

**After ANY import/create/move:**

1. Run the appropriate `research.sh` command
2. Invoke the Format section below → apply `writing-compact` to the file

**Skipping step 2 is a failure.** The script automates what it can. You do the rest.

### Operations

- **Create new file**

  ```bash
  ~/.claude/scripts/research.sh new <topic>
  ```

  Then: apply `writing-compact` if adding content

- **Import existing file**

  ```bash
  ~/.claude/scripts/research.sh import <file> [topic]
  ```

  Script auto-enriches GH links. Then: apply `writing-compact`

- **Sort/renumber**

  ```bash
  ~/.claude/scripts/research.sh sort
  ```

- **Archive old files**

  ```bash
  ~/.claude/scripts/research.sh cleanup
  ```

- **List files**

  ```bash
  ~/.claude/scripts/research.sh list
  ```

- **Enrich GitHub links**

  ```bash
  ~/.claude/scripts/research.sh format-gh-links <target>
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
| "prune research"          | All recent (`.claude/research/*.md`) |
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
   ~/.claude/scripts/research.sh format-gh-links <target>
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
