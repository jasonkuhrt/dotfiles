---
name: skills:list
description: >-
  Show current skill outfit (core + pluggable status), token costs, and operation history.
  Use when user asks "what skills are on", "show my skills", "skill cost", "skill history".
allowed-tools:
  - Bash(bun:*)
---

# /skills:list — View Skill Outfit

Read-only views of the skill system state.

## Commands

### Show outfit (default)
```bash
bun /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/shan/src/bin/shan.ts skills list
```
Shows:
- Core skills (user + project)
- Pluggable on skills with scope and token cost
- Pluggable off skills (available in library)
- Total budget usage

### Show history
```bash
bun /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/shan/src/bin/shan.ts skills history [--scope user]
```
Shows the operation log: what was turned on/off and when.

## Output Interpretation

- **Core (user/project)**: Real directories that shan never touches. Always active.
- **Pluggable (on)**: Symlinks from outfit → library. Managed by shan.
  - `[user]` = in `~/.claude/skills/`
  - `[project]` = in `.claude/skills/`
- **Pluggable (off)**: In the library but not currently equipped.
- **Budget**: Approximate token cost of all model-visible skills.
