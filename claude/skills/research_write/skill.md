---
name: research:write
description: Use when creating, importing, sorting, archiving, or listing research files in .claude/research. Also use when moving files into the research directory.
---

# Research Write

Manage research files in `.claude/research/` — creation, naming, sorting, archival.

## CRITICAL

### ALWAYS Use This Skill

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
2. Invoke `research:format` skill → apply `writing-compact` to the file

**Skipping step 2 is a failure.** The script automates what it can. You do the rest.

## Operations

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

## File Format

```
<YYYY-MM-DD>-<HHMM>-<topic>.md
```

- Date/time — UTC
- Topic — kebab-case

## Notes

- All timestamps UTC (`date -u`)
- 30-day auto-archive keeps recent files manageable
