## Architecture Output Preference

For architecture and design brainstorming:

- Show only **ideal, first-principles options** optimized for **type safety** and **best possible developer experience (DX)**.
- Do **not** include compromise, transitional, legacy, or backward-compat options unless explicitly requested.
- Keep output focused and high-signal; anything outside the ideal option set is noise.

## Workflow Rules

- For coding work, balance result quality, elapsed time, and subscription quota consumed through a completed result. Subscription quota is Jason's cost metric.
- When delegating, prefer a small pool of workers reused for related assignments so useful context carries forward.
- Do not use multiselect or request-user-input tools with this user. Ask direct plain-text questions instead.
- FOR NARROW QUESTIONS, ANSWER THE ASKED DIMENSION DIRECTLY. DO NOT PAD WITH ADJACENT NEGATIVES, NON-GOALS, EXCLUSIONS, OR SCOPE BOUNDARIES UNLESS THAT CONTRAST IS NECESSARY TO ANSWER THE QUESTION OR THE USER ASKS FOR IT.
- The user is the decision-maker for management, planning, scope, and relevance. Do not present yourself as the arbiter of what is in scope, out of scope, relevant, or unrelated unless the user explicitly asks for that judgment.
- When the user asks for opinions, feedback, or technical evaluation, assume the asked-about thing is relevant because the user has the planning context. Focus on the technical answer, tradeoffs, and execution details rather than scope policing.
- Never send or submit an external communication to a human—email, contact form, direct message, comment, ticket, or post—without Jason's explicit approval for that exact send. Creating drafts is allowed without approval.
- Automated system interactions with non-human bots—such as replying to and resolving Greptile review threads—do not require approval and should proceed autonomously when part of the authorized workflow.
- When debugging hook behavior in Codex, treat `~/.codex` as the canonical hook/config surface first: inspect `~/.codex/config.toml`, `~/.codex/hooks.json`, and `~/.codex/hooks/*` before looking at `~/.claude`. Only inspect `~/.claude` hooks if the Codex hook config explicitly delegates there.
- Never skip symlinks during config/rules/file discovery. When inspecting for local rules or config surfaces, include symlink entries and resolve their targets before concluding a file is absent.
- Use Codex's current Chrome integration and bundled instructions. Diagnose and report integration failures and their available fix before any necessary fallback. Proceed without repeated permission requests for routine browser opening, recovery, or fallback within authorized work.
- For calendar work, "my calendar", "calendar", and scheduling requests mean Apple Calendar/iCloud Calendar through the configured `che-ical` MCP or its signed `CheICalMCP` CLI. Apple Reminders remain on `remindctl`. Do not use Google Calendar, Outlook, Fantastical, Calendar.app GUI automation, or cross-platform calendar connectors unless the user explicitly names that platform.
- Codex-only skills must live under `~/.codex/skills`. Do not place Codex-only skills in `~/.claude/skills`, because that makes them visible to Claude Code too. Shared skills can be linked into `~/.codex/skills` intentionally.
- For third-party library or platform semantics that materially affect architecture, build a stable local evidence base first: official source repos in `~/repo-references/`, official docs source or downloaded docs, and the exact installed SDK/version in use. Do this before making semantic claims or proposing adapter state.
- For Effect research, respect the local v3/v4 reference split. For current Effect v4 work, use `~/repo-references/effect-v4-references/effect-smol` first and only use other `~/repo-references/effect-v4-references/*` repos when the task specifically needs them. Use `~/repo-references/effect-v3-references/*` only for explicit v3 work. Do not create or rely on an unsuffixed `~/repo-references/effect` checkout for current work.
- Any repeatable repo workflow should be driven through the root `justfile`.
- If a workflow matters and no `just` recipe exists yet, add one instead of leaving the procedure as raw shell commands in docs only.
- Exception: do not add `justfile`s to JavaScript, TypeScript, Bun, Node.js, or general web projects. In those projects, use the existing package-manager/task-runner workflow instead of introducing `just`.
- For Codex or Claude hook scripts, default to Bun rather than Python. Only use Python when Bun is unavailable or the hook truly depends on Python-specific libraries.
- Never rename named imports with `import { X as Y }`. Prefer namespace imports or canonical named imports; put local context in the consuming expression rather than in an import alias.
- Only mock through the Effect services pattern. Do not use module-level mocking frameworks or monkeypatching approaches.
- Treat Effect service usage as binary: app code either uses Effect services correctly or it is wrong. Do not use direct globals or ad hoc substitutes for runtime dependencies such as time, randomness, process, filesystem, network, or environment access when an Effect service boundary should exist.
- For Lua or Neovim Lua changes, run `just lua-check` before closing the task.
- Use `just lua-fmt` to normalize Lua formatting.
- The local staged-only Lua pre-commit hook is installed via `just hooks-install`.
