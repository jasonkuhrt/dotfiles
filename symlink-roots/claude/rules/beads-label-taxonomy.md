# Beads Label Taxonomy

**Every bead gets ≥1 label.** The canonical label set lives in `.beads/labels.yml` — that file is the single source of truth.

## Organizing Principle

Labels have two tiers:
1. **Directory-mapped** — label derives from a repo directory name (e.g., `skill` → `claude/skills`)
2. **Cross-cutting** — label for work that doesn't map to a directory (e.g., `workflow`, `learning`)

## Conventions

- **Prefer `--labels` at creation time**: `bd create --labels "skill,ghostty" ...`
- **Check before inventing**: run `bd label list-all` or read `.beads/labels.yml` before adding new labels
- **Add new labels** by editing `.beads/labels.yml` — the enforcement hook reads from it

## Cross-Path Work

- **Single bead touching multiple paths** → label with its primary semantic (e.g., a Linear feature that also tweaks rules → `linear`)
- **Large cross-cutting work** → epic with primary semantic label (e.g., `workflow`) + sub-beads with their respective directory labels (e.g., `skill`, `fish`, `hook`)
