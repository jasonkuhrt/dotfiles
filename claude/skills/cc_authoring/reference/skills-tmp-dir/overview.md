# Claude Skills Tmp Dir

Standard location for skills writing local/temporary files.

## Convention

**In docs:** `<tmp>/filename`

**Resolves to:** `.clauding/<skill-name>/filename`

- Root: `.clauding/` (top-level, parallel to `.claude/`)
- Each skill uses subdirectory matching its skill directory name
- Gitignored, local only, never committed

## Example

Doc says: `<tmp>/dev.log`

For skill `dev-server`, resolves to: `.clauding/dev-server/dev.log`
