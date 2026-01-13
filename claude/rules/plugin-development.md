# Plugin Development

See also: `claude-code:managing-marketplaces` skill for comprehensive marketplace/plugin docs.

## CRITICAL: Never Edit Cache Files

When working on jasonkuhrt marketplace plugins:

* __NEVER__ modify files in `~/.claude/plugins/cache/`
* __ALWAYS__ modify source files in `/Users/jasonkuhrt/projects/jasonkuhrt/claude-marketplace/plugins/`

## Plugin Source Location

All plugins: `~/projects/jasonkuhrt/claude-marketplace/plugins/<plugin-name>/`

## Development Workflow (ccd CLI)

The marketplace includes a CLI for managing symlinks:

```bash
cd ~/projects/jasonkuhrt/claude-marketplace
pnpm ccd link activate    # Symlink all cache entries to source
pnpm ccd link review      # Check current status
pnpm ccd link deactivate  # Remove symlinks
pnpm ccd --help           # Full docs with path diagrams
```

**Workflow:**
1. Edit source files
2. Restart CC to see changes (no reinstall needed)
3. Run `pnpm ccd link activate` after any `claude plugin install` (overwrites symlinks)
