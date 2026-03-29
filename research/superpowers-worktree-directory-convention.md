# Superpowers Plugin: `.worktrees/` Directory Convention

Investigate whether the `superpowers:using-git-worktrees` skill's default of `.worktrees/` inside the project is the right convention, or if worktrees should live elsewhere.

## Status

Backlog — needs deeper investigation.

## Context

The `superpowers` plugin (v5.0.6) has a `using-git-worktrees` skill that auto-selects `.worktrees/` as the worktree directory when it already exists and is gitignored. This is deeply baked into the superpowers workflow:

- `executing-plans` marks it as REQUIRED
- `brainstorming` chains through `writing-plans` -> `executing-plans` -> worktree creation
- `subagent-driven-development` also requires it
- The saved memory `feedback_main_worktree_convention` reinforces "always use worktree add"

The skill's directory selection priority:
1. Check if `.worktrees/` or `worktrees/` already exists (`.worktrees/` wins)
2. Check CLAUDE.md for a preference
3. Ask the user

Once `.worktrees/` exists and is in `.gitignore`, it self-reinforces — the skill never asks again.

## Questions to Investigate

- Should worktrees live inside the project at all? The alternative is `~/.config/superpowers/worktrees/<project>/`
- Does `.worktrees/` inside the project cause issues with tooling (IDE indexing, file watchers, disk usage)?
- Is the CLAUDE.md override sufficient to change behavior, or does the "existing directory wins" heuristic override it?
- Should the memory feedback be updated to specify a different location?
- Is there a way to configure this globally across all projects?

## Source Files

- Skill: `~/.claude/plugins/cache/claude-plugins-official/superpowers/5.0.6/skills/using-git-worktrees/SKILL.md`
- Memory: `~/.claude/projects/-Users-jasonkuhrt-projects-heartbeat-chat-Heartbeat/memory/feedback_main_worktree_convention.md`
- Heartbeat `.gitignore` lines 11 and 120: `.worktrees/`
