# Beads Architecture

## Storage Model

See [architecture.d2](architecture.d2) for the data flow diagram.

### `.beads/` file inventory

__Git-tracked__ (shared with team):

| File                 | Purpose                                              |
| -------------------- | ---------------------------------------------------- |
| `config.yaml`        | Project-level beads config                           |
| `README.md`          | Local project notes for beads                        |
| `.gitignore`         | Defines local-only beads artifacts                   |
| `issues.jsonl`       | Optional export snapshot for portability/audits      |
| `interactions.jsonl` | Optional audit/event export (if enabled)             |

__Git-ignored__ (local per machine):

| File / directory                    | Purpose                                  |
| ----------------------------------- | ---------------------------------------- |
| `dolt/`                             | Local Dolt database data                 |
| `dolt-server.*`, `dolt-monitor.pid` | Local Dolt server runtime                |
| `bd.sock`, `daemon.*`               | Runtime IPC/locks/logs                   |
| `export-state/`, `sync-state.json`  | Local sync bookkeeping                   |
| `*.lock`, `last-touched`            | Local process coordination and metadata  |

## Sync Model

Modern beads sync uses Dolt remotes directly:

* `bd dolt pull` to fetch latest issue state
* `bd dolt push` to publish local issue updates
* one-time remote setup per clone: `bd dolt remote add origin "$(git remote get-url origin)"`

`git pull` / `git push` remain code sync operations; bead issue state sync is handled by Dolt.

## Conflict Resolution

Dolt maintains its own commit graph for issue data. If push is rejected:

1. `bd dolt pull`
2. resolve any reported Dolt conflicts
3. `bd dolt push` again

## Closure Semantics

`bd close --reason="..."` writes the closure result into the issue record. This is how beads bridge sessions:

> When a future session reads a dependent bead and follows its `DEPENDS ON -> <closed-bead>` link, it can `bd show <closed-bead>` and see the full close reason — which might contain an entire aligned spec. The conclusion captures what changed from the original description, so future sessions do not need to re-derive design evolution.
>
> If the dependency is already satisfied (closed), the dependent bead is immediately workable — it shows `-> closed` in depends-on output.

__Example:__ A design bead proposes a standalone CLI. During review, the spec evolves to augment an existing CLI instead. The close reason captures the final aligned spec (not the stale original body). A follow-up execution bead depends on that design bead, reads the close reason, and implements the correct version.
