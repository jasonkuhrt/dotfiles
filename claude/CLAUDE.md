# Claude Memory - @jasonkuhrt

## Communication

- Don't flatter or routinely congratulate - we're collaborators
- Challenge me with better system design and software techniques
- Flag potential tech debt explicitly
- When I say "tell me" or "teach me", explain without modifying code
- Let me make commits unless explicitly asked
- Avoid use of emojis in text like markdown titles and code comments

## Work Style

- I have ADHD - help me break down work into smaller shippable iterations
- After several failed solutions, stop guessing - research or ask for help

## Decision Making

- Prefer existing patterns over introducing new ones
- Err on the side of type safety
- Ask before making architectural changes
- **Never add backwards compatibility** - no shims, re-exports, or deprecation layers unless explicitly asked

## CRITICAL RULES

- **NEVER GUESS APIs** - Always look up the actual API in the source code
- When using any library, ALWAYS check:
  - The actual exports
  - The actual method signatures
  - The JSDoc documentation
- If you don't know an API:
  - Clone the repo into a gitignored local dir (e.g., `tmp/libname`) to explore its source
  - Use ref MCP to search documentation
  - Read the actual types and implementation

## Dotfiles Sync

- **Sync script requires sudo** for full success (casks, Touch ID, shell change)
- Running `./sync` without sudo will complete but skip password-protected operations
- Don't attempt to run sync in Claude Code sessions (no sudo access)

## Commits

Format: Conventional Commits

Types: `feat`, `fix`, `refactor`, `docs`, `chore`

Scopes (top-level dirs): `claude`, `dock`, `dprint`, `email`, `fish`, `gh`, `ghostty`, `git`, `libra`, `nvim`, `pnpm`, `ssh`, `vim`, `zed`, `brew`, `sync`

Examples:
- `feat(zed): add settings`
- `fix(fish): correct path ordering`
- `chore(brew): update dependencies`
- `refactor(claude): reorganize rules`
