## Architecture Output Preference

For architecture and design brainstorming:

- Show only **ideal, first-principles options** optimized for **type safety** and **best possible developer experience (DX)**.
- Do **not** include compromise, transitional, legacy, or backward-compat options unless explicitly requested.
- Keep output focused and high-signal; anything outside the ideal option set is noise.

## Workflow Rules

- Do not use multiselect or request-user-input tools with this user. Ask direct plain-text questions instead.
- The user is the decision-maker for management, planning, scope, and relevance. Do not present yourself as the arbiter of what is in scope, out of scope, relevant, or unrelated unless the user explicitly asks for that judgment.
- When the user asks for opinions, feedback, or technical evaluation, assume the asked-about thing is relevant because the user has the planning context. Focus on the technical answer, tradeoffs, and execution details rather than scope policing.
- When debugging hook behavior in Codex, treat `~/.codex` as the canonical hook/config surface first: inspect `~/.codex/config.toml`, `~/.codex/hooks.json`, and `~/.codex/hooks/*` before looking at `~/.claude`. Only inspect `~/.claude` hooks if the Codex hook config explicitly delegates there.
- Never skip symlinks during config/rules/file discovery. When inspecting for local rules or config surfaces, include symlink entries and resolve their targets before concluding a file is absent.
- For Codex browser work, use the Chrome plugin (`[@Chrome](plugin://chrome@openai-bundled)`) by default. Do not use `dev-browser`, Browser/browser-use, Computer Use, raw Chrome CDP, `chrome-debug`, macOS GUI browser control, or other browser-control paths unless there is a task-specific reason and the user has explicitly approved that fallback.
- Codex-only skills must live under `~/.codex/skills`. Do not place Codex-only skills in `~/.claude/skills`, because that makes them visible to Claude Code too. Shared skills can be linked into `~/.codex/skills` intentionally.
- For third-party library or platform semantics that materially affect architecture, build a stable local evidence base first: official source repos in `~/repo-references/`, official docs source or downloaded docs, and the exact installed SDK/version in use. Do this before making semantic claims or proposing adapter state.
- Any repeatable repo workflow should be driven through the root `justfile`.
- If a workflow matters and no `just` recipe exists yet, add one instead of leaving the procedure as raw shell commands in docs only.
- Exception: do not add `justfile`s to JavaScript, TypeScript, Bun, Node.js, or general web projects. In those projects, use the existing package-manager/task-runner workflow instead of introducing `just`.
- For Codex or Claude hook scripts, default to Bun rather than Python. Only use Python when Bun is unavailable or the hook truly depends on Python-specific libraries.
- Never run `tsc`. Avoid direct `tsc` invocations and any workflow that shells out to `tsc`.
- Only mock through the Effect services pattern. Do not use module-level mocking frameworks or monkeypatching approaches.
- Treat Effect service usage as binary: app code either uses Effect services correctly or it is wrong. Do not use direct globals or ad hoc substitutes for runtime dependencies such as time, randomness, process, filesystem, network, or environment access when an Effect service boundary should exist.
- For Lua or Neovim Lua changes, run `just lua-check` before closing the task.
- Use `just lua-fmt` to normalize Lua formatting.
- The local staged-only Lua pre-commit hook is installed via `just hooks-install`.
