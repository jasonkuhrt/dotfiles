# Screenshots

All screenshots are saved to `~/Pictures/Screenshots/`.

## Sources

- **CleanShot X** — primary screenshot tool. Files named `CleanShot YYYY-MM-DD at HH.MM.SS@2x.{png,mp4}`
- **macOS native** — `com.apple.screencapture` location set via dotfiles sync

## Working with Screenshots

- When a user shares a screenshot path, it will be under `~/Pictures/Screenshots/`
- When a user says "my latest screenshot", check `~/Pictures/Screenshots/` sorted by modification time
- CleanShot also stores to its cloud (CleanShot Cloud) — those have URLs, not local paths
- Screen recordings (`.mp4`) are in the same directory

## Auto-Organize

When the user provides a screenshot and its path is in the `~/Pictures/Screenshots/` root (not already in a subdirectory), move it to `~/Pictures/Screenshots/claude/` before reading it. This keeps screenshots the user has shared with Claude separate from the general pool.

```bash
# Example: user gives you ~/Pictures/Screenshots/CleanShot 2026-02-15 at 10.18.41@2x.png
mkdir -p ~/Pictures/Screenshots/claude
mv ~/Pictures/Screenshots/CleanShot\ 2026-02-15\ at\ 10.18.41@2x.png ~/Pictures/Screenshots/claude/
```

Do not move files that are already in a subdirectory.
