# Fish Shell Configuration

## Fisher Plugin Management

### How it Works

1. `fish_plugins` lists desired plugins (one per line)
2. `sync` copies this file to `~/.config/fish/fish_plugins` (not symlinked)
3. `fisher update` installs/removes plugins to match the list

### Why Copy Instead of Symlink?

Fisher rewrites `fish_plugins` when it encounters errors. With a symlink, this would corrupt the dotfiles source. The copy approach:

- Protects dotfiles from fisher corruption
- Detects drift (warns if local differs before overwriting)
- Dotfiles remains authoritative source

### Cross-Machine Behavior

Each machine has its own fisher "memory" of what it installed. This creates edge cases:

| Scenario | What Happens |
|----------|--------------|
| Add plugin on Machine A | Works fine, fisher tracks it |
| Sync to Machine B (fresh) | Works fine, fisher installs fresh |
| Sync to Machine B (has old files) | Conflict - fisher refuses to overwrite files it didn't install |

### Known Gap: Orphaned File Conflicts

If a machine has plugin files that fisher didn't install (from old installs, manual copies, etc.), `fisher update` fails with:

```
fisher: Cannot install "plugin/name": please remove or move conflicting files first:
        /Users/you/.config/fish/functions/_some_file.fish
```

**Manual fix when this happens:**

```sh
# Remove the conflicting files listed in the error
rm ~/.config/fish/functions/_some_file.fish

# Re-run sync or fisher update
fisher update
```

This is a fisher limitation - it has no "force" flag and doesn't track files persistently across reinstalls.

### Removing Plugins

1. Edit `dotfiles/fish/fish_plugins` - remove the line
2. Run `./sync` on each machine
3. `fisher update` removes the plugin and its files

**Exception**: Some plugins (e.g. tide) store config in fish universal variables (`~/.config/fish/fish_variables`). These persist after removal and need manual cleanup:

```sh
# Check for leftover variables
grep pluginname ~/.config/fish/fish_variables

# Remove them
grep -v pluginname ~/.config/fish/fish_variables > ~/.config/fish/fish_variables.new
mv ~/.config/fish/fish_variables.new ~/.config/fish/fish_variables
```

## Custom Functions

Custom functions live in `~/.config/fish/functions/` alongside plugin functions. These are NOT managed by dotfiles - they're local to each machine.

If you want a custom function synced, add it to this repo and update `sync` to symlink it.
