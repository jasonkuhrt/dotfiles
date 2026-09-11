# linear Archive

## Why the linear skill was removed

The Linear plugin from the official marketplace (`linear@claude-plugins-official`)
now provides the same surface through MCP tools, so the hand-written skill and
its scripts were duplicating a maintained integration. The skill was already
disabled — `skillOverrides` carried `linear-managing-issues: off` — before the
files were removed.

## Migration date

2026-09-10

## Original locations moved into this archive

- `home/.claude/skills-library/linear/`

Two enabling symlinks were removed rather than archived, because a symlink into
a moved tree preserves nothing. They were:

- `home/.claude/skills/linear` → `~/.claude/skills-library/linear`
- `home/.claude/skills/linear-managing-issues` → `~/.claude/skills-library/linear/managing-issues`

The archive preserves original directory structure under `archive/linear/` to
keep provenance clear.

## Replacement

- `linear@claude-plugins-official` — MCP tools for issues, projects, comments,
  documents and search, enabled in `settings.json`.
