# tmux Skill Design

## Man Pages: Why Local Copy?

- **Grep-able**: `grep -ri mouse 2-config/` vs scrolling 4000 lines
- **Focused**: Open just `hooks.txt` when you need hooks
- **Editor-friendly**: Jump to files, use editor search
- **Categorized**: Directory structure tells you where to look

## Man Pages: Structure Rationale

**Directory numbers** encode progression: concepts -> config -> commands

**File numbers** (where present) encode reading order within a directory.

Unnumbered files are peers -- pick what you need.
