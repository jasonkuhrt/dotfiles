# Beads Architecture

## Storage Model

See [architecture.d2](architecture.d2) for the data flow diagram.

### `.beads/` file inventory

__Git-tracked__ (shared with team):

| File                 | Purpose                  |
| -------------------- | ------------------------ |
| `issues.jsonl`       | Portable issue database  |
| `interactions.jsonl` | Audit log                |
| `config.yaml`        | Project config           |
| `README.md`          | Project readme           |
| `.gitignore`         | Tracks what's local-only |

__Git-ignored__ (local per machine):

| File                                                        | Purpose                    |
| ----------------------------------------------------------- | -------------------------- |
| `beads.db`, `*.db-wal`, `*.db-shm`                          | SQLite runtime store       |
| `daemon.lock`, `daemon.pid`, `daemon.log`                   | Daemon runtime             |
| `bd.sock`                                                   | Unix socket for daemon IPC |
| `export-state/`, `sync-state.json`                          | Sync bookkeeping           |
| `beads.base.jsonl`, `beads.left.jsonl`, `beads.right.jsonl` | 3-way merge artifacts      |

## Conflict Resolution

When both sides change beads between syncs, `bd sync` performs a __3-way merge__:

* `beads.base.jsonl` — last common synced state
* `beads.left.jsonl` — your local changes
* `beads.right.jsonl` — their remote changes

Conflict strategy is configurable (default: `newest` wins). Check with `bd sync --status`.

## Closure Semantics

`bd close --reason="..."` writes the reason into the JSONL record. This is how beads bridge sessions:

> When a future session reads a dependent bead and follows its `DEPENDS ON → <closed-bead>` link, it can `bd show <closed-bead>` and see the full close reason — which might contain an entire aligned spec. The conclusion captures _what changed_ from the original description, so future CC doesn't have to re-derive the design evolution.
>
> If the dependency is already satisfied (closed), the dependent bead is immediately workable — it shows `→ ✓ <closed-bead>` in its depends-on section.

__Example:__ A design bead proposes a standalone CLI. During review, the spec evolves to augment an existing CLI instead. The close reason captures the _final_ aligned spec — not the original description. A follow-up execution bead depends on the design bead and says "read its conclusion for the complete aligned design." Future CC follows the link, gets the evolved spec, and builds the right thing.
