---
name: research
description: Use when working with research files (~/.claude/research/ by default, .claude/research/ for project level) — creating, importing, formatting, pruning conversational artifacts, or flushing session learnings before context loss.
---

# Research

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

Manage research files — creation, naming, archival.

### CRITICAL

**NEVER write directly to the research directory.** All research file creation MUST go through this skill to ensure:

- Correct naming convention
- `writing-compact` formatting applied
- Proper integration with existing research

**Every write operation (create, import, move) MUST complete the full pipeline:**

1. **Script** — `research.sh` handles mechanical parts (move, rename, gh-links)
2. **Claude** — YOU handle Claude-only parts (`writing-compact`)

The script is NOT the complete solution. You are the orchestrator.

| Authorship    | Operations              | writing-compact            |
| ------------- | ----------------------- | -------------------------- |
| Claude writes | flush, save, create     | Apply inline (no preview)  |
| External      | import, move            | Preview-iterate-apply pass |

**Skipping `writing-compact` entirely is a failure.**

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

## Subcommands

- [Prune](./reference/pruning.md) — remove conversational artifacts, distill knowledge
- [Format](./reference/formatting.md) — enrich GH links, apply writing-compact
- [Flush CC Thread](./reference/flush.md) — extract learnings before context loss
