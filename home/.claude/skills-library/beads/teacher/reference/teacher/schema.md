# Bead Schema

Every bead has core fields and optional extended fields. Understanding what each field _means_ — its semantic role in the workflow — matters more than knowing it exists.

## Content Fields

These carry the intellectual substance of the bead.

| Field          | CLI Flag            | Semantic Role                                        | When to Use                                                                      |
| -------------- | ------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------- |
| `title`        | `--title`           | Identity — what this work is, in a phrase            | Always. Keep short, imperative.                                                  |
| `description`  | `--description`     | Work spec — what needs to be done                    | Always. The bead's body. Full scope statement.                                   |
| `acceptance`   | `--acceptance`      | Definition of done — verifiable criteria             | When "done" isn't obvious from description. Testable assertions.                 |
| `design`       | `--design`          | How to do it — architecture, pointers to design docs | When the bead needs technical context. On epics, points to issue directory.      |
| `notes`        | `--notes`           | Static context — constraints, conventions, gotchas   | When there are things an agent should know that aren't part of the spec itself.  |
| `close_reason` | `bd close --reason` | What was actually built — the real outcome           | Always on close. May differ from description. See `beads-close-discipline` rule. |

### Content Fields: Semantic Relationships

```
description    = "what should be done"     (intent, written before work starts)
acceptance     = "how to verify done"      (criteria, written before work starts)
design         = "how to do it"            (approach, may evolve during work)
notes          = "what to watch out for"   (context, may accumulate during work)
close_reason   = "what was actually done"  (outcome, written after work completes)
```

The gap between `description` and `close_reason` is the most important signal in the system — it reveals plan drift.

## Comments

Comments are a **separate entity**, not a field. They form a thread attached to the bead.

```bash
bd comments <id>              # List all comments
bd comments add <id> "text"   # Add a comment
bd comments add <id> -f file  # Add from file
```

**Semantic role:** Session journal — learnings, decisions, discoveries accumulated across work sessions. Unlike `notes` (which is a single static value that gets overwritten), comments are append-only and chronological.

**On epics:** Comments are the primary cross-session communication channel. Each agent session should add a comment summarizing what it learned or decided. Future agents read epic comments to absorb accumulated wisdom.

## Metadata Fields

| Field          | CLI Flag         | Purpose                                                                                                                                 |
| -------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `status`       | `--status`       | Lifecycle: `open` → `in_progress` → `closed`                                                                                            |
| `priority`     | `--priority`     | 0-4 (P0=critical, P4=backlog). NOT "high"/"medium"/"low".                                                                               |
| `issue_type`   | `--type`         | `task`, `bug`, `feature`, `epic`, `chore` (common); also `merge-request`, `molecule`, `gate`, `agent`, `role`, `rig`, `convoy`, `event` |
| `owner`        | `--assignee`     | Who's responsible. Set on claim.                                                                                                        |
| `external_ref` | `--external-ref` | Cross-reference to external tracker (e.g., `HEA-3849` for Linear, `gh-42` for GitHub)                                                   |
| `labels`       | `--labels`       | Tags for categorization                                                                                                                 |
| `estimate`     | `--estimate`     | Time estimate in minutes                                                                                                                |
| `due`          | `--due`          | Deadline. Formats: `+6h`, `+1d`, `tomorrow`, `2025-01-15`                                                                               |
| `defer`        | `--defer`        | Hidden from `bd ready` until this date                                                                                                  |

## Relationship Fields

| Relationship              | CLI                  | Meaning                                                    |
| ------------------------- | -------------------- | ---------------------------------------------------------- |
| `parent`                  | `--parent <id>`      | Hierarchical: child belongs to parent (e.g., task in epic) |
| `depends_on` (blocks)     | `bd dep add <A> <B>` | A depends on B — A is blocked until B closes               |
| `dependents` (blocked-by) | Inverse of above     | B blocks A — closing B unblocks A                          |

## Reading Fields

`bd show <id>` displays all populated fields in text format. `bd show <id> --json` returns them as JSON (omits fields with no value).

For chain tracing, the fields of interest per bead type:

| Bead Type                        | Always Read                   | Read if Present         |
| -------------------------------- | ----------------------------- | ----------------------- |
| **Epic**                         | description, design, comments | notes, acceptance       |
| **Predecessor (closed)**         | close_reason                  | comments, design, notes |
| **Your task (current)**          | description, acceptance       | design, notes           |
| **Downstream (integrity check)** | description, acceptance       | design                  |
