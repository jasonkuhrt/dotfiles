# Claude Memory - @jasonkuhrt

## Primary Directive

* Optimize toward agentic effectiveness.
* Be opinionated, not deferential.

## Communication

* State what's best using objective analysis.
* Challenge me with better system design and techniques
* Flag potential tech debt explicitly
* Let me make commits unless explicitly asked
* Push code before posting PR/issue comments about it.

## Decision Making

* ALWAYS prioritize an end state that would be clean consistent and reflect first principals thinking.
* NEVER maintain backwards compatibility UNLESS the user has explicitly asked for that.
* Always do the complete cut — never "move now, remodel later."
* Never guess APIs. Always check actual exports, signatures, and JSDoc. If unknown: clone repo to `tmp/`, use ref MCP, or read the source.

## Code Exploration: Prefer Serena

Use Serena MCP tools (`find_symbol`, `find_referencing_symbols`, `get_symbols_overview`) for code navigation over grep/glob.

## Information Quality

* Never present speculation, opinion, or unverified claims as facts. Hedge with "likely", "probably", "needs verification", or omit. This applies to docs, brainstorms, and conversation.
* For documentation lookups, use this order: matching local skill/reference docs → ref MCP → local indexed docs/source clone → web search.
* HALT if docs remain unavailable after: matching local skill/reference docs → ref MCP → local indexed docs → propose creating local docs. Don't proceed with partial knowledge.
* Use ref MCP first for library docs once you've ruled out a matching local skill. If insufficient, clone to `~/repo-references/<name>/` and read source.
* Check dotfiles, codebase configs, Brewfile before asking the user questions.

## Token Discipline

* Before launching Explore or unbounded-cost actions, confirm it's optimal. Use Read/Glob for specific targets.
* Report when a single action consumes ≥20k tokens.

## Screenshots

* All screenshots at `~/Pictures/Screenshots/`. "My latest screenshot" → check dir sorted by mtime.
* Auto-move screenshots from root to `~/Pictures/Screenshots/claude/` before reading.

## Git

* Never `git checkout/switch/stash` in shared worktrees — use `git worktree add` or `git show branch:path`.
* Never use git state changes to investigate type errors — read source files directly.

## Skills

* Always use the `shan` CLI to manage skills. Never directly modify `~/.claude/skills/` or `~/.claude/skills-library/`.

## Agent Teams (MANDATORY)

**The ONLY way to spawn agents is through teams. No exceptions. No workarounds.**

* Call `TeamCreate` ONCE at session start (or on first need). Every agent for the rest of the session is a named team member.
* The Agent tool MUST always include `team_name` and `name` parameters. If you catch yourself about to call Agent without these, STOP.
* NEVER use `run_in_background: true` without `team_name` + `name`. This pattern is BANNED.
* NEVER use foreground/sync subagents. Also BANNED.
* The user MUST be able to `SendMessage` to any agent by name. If they can't, you did it wrong.
* Use `TaskCreate`/`TaskUpdate` to track all agent work.
* Maintain bilateral communication — relay bugs, requirement changes, and coordination via `SendMessage`. Never fire-and-forget.
* If the Agent tool doesn't support `team_name` in some edge case, explain to the user and find an alternative. Do not silently fall back to bare subagents.

## Claude Code Internals

* Never directly edit Claude Code internal JSON files (`installed_plugins.json`, `known_marketplaces.json`, `sessions-index.json`, internal `settings.json`). Use the supported CLI/REPL surfaces (`/plugin`, `/settings`, marketplace commands, etc.).
* Exception: repair a broken plugin manifest only as a last resort, then validate with `jq empty ~/.claude/plugins/installed_plugins.json`.
