---
name: chezmoi
description: Use when editing chezmoi-managed dotfiles, applying chezmoi changes, resolving chezmoi conflicts, managing chezmoi scripts or state, debugging chezmoi issues, or working in a dotfiles repo managed by chezmoi. Also use when chezmoi apply fails with "has changed since chezmoi last wrote it" or TTY errors — the skill has the exact conflict resolution flow.
user_invocable: false
---

# Chezmoi

Dotfile manager that syncs a source-of-truth directory to the home directory. The source dir is a git repo; `chezmoi apply` writes source state to live paths.

## Hard Rules

- **NEVER use `--force`.** Not blind, not after checking, not ever.
- **All config changes go through the source dir**, not direct home-directory edits. `chezmoi apply` overwrites managed paths — direct edits are lost.
- **Find the source dir**: `chezmoi source-path`

## Path Mapping

chezmoi encodes file attributes in filenames:

| Source prefix/suffix | Meaning |
|---|---|
| `dot_` | `.` (hidden file) |
| `exact_` | Directory contents managed exactly (extra files deleted) |
| `private_` | `0600`/`0700` permissions |
| `executable_` | `0755` permissions |
| `symlink_` | Symlink |
| `.tmpl` suffix | Go template, rendered at apply time |
| `run_once_`, `run_onchange_` | Scripts, not dotfiles |

Example: `dot_config/fish/config.fish` → `~/.config/fish/config.fish`

## Auto-Apply After Editing

After editing any chezmoi source file, **immediately apply it**:

1. **Determine the target path** — use `chezmoi target-path <source_file>` or infer from the path mapping above
2. **Check for conflicts** via `chezmoi status <target>`:
   - Column 1 = ` ` (space) → no external edits → safe to apply (step 3)
   - Column 1 = `M` → conflict. Go to **Conflict Resolution**.
3. **Apply**: `chezmoi apply --no-tty <target>`

## Conflict Resolution

When `chezmoi status` column 1 = `M` (live file modified outside chezmoi):

1. **Show the diff**: `chezmoi diff <target>` — present to the user
2. **Wait for explicit approval** — do not proceed without it
3. **Reset chezmoi's state for that file** — makes chezmoi forget its last-written hash so the next apply won't try to prompt:
   ```
   chezmoi state delete --bucket=entryState --key=<absolute_target_path>
   ```
4. **Apply**: `chezmoi apply --no-tty <target>` — now succeeds without prompting
5. **Verify**: `chezmoi status <target>` — should show no output (in sync)

## Status Columns

`chezmoi status` output has two columns:
- **Column 1**: live file vs chezmoi's last-written state (external modification detection)
- **Column 2**: live file vs chezmoi's source state (what `apply` would change)

| Col 1 | Col 2 | Meaning |
|-------|-------|---------|
| ` ` | `M` | Source changed, live untouched → clean apply |
| `M` | `M` | Both changed → conflict, use resolution flow |
| `M` | ` ` | Live changed, source unchanged → external drift, no apply needed |
| ` ` | ` ` | In sync |

## Script Management

chezmoi scripts live in the source dir and run during `chezmoi apply`.

| Prefix | Runs when |
|---|---|
| `run_once_before_` | Once ever, before file apply (tracks content hash) |
| `run_once_after_` | Once ever, after file apply |
| `run_onchange_before_` | When script content changes, before file apply |
| `run_onchange_after_` | When script content changes, after file apply |

### Re-triggering scripts

**run_once**: Change the script content (even a comment), or reset its state:
```bash
# Reset a single script's state
chezmoi state delete --bucket=scriptState --key=<absolute_script_path>

# Nuclear: reset ALL run_once state (every script re-runs on next apply)
chezmoi state delete-bucket --bucket=scriptState
```

**run_onchange**: Change the content the script watches. The hash is computed from the rendered script content — if the template output changes, it re-runs.

## State Management

chezmoi tracks what it last wrote in a persistent state database. This is how it detects external modifications.

```bash
# View all state (large output)
chezmoi state dump

# View state for a specific file
chezmoi state get --bucket=entryState --key=/absolute/path/to/file

# Delete state for one file (used in conflict resolution)
chezmoi state delete --bucket=entryState --key=/absolute/path/to/file

# Delete state for one script (re-trigger run_once)
chezmoi state delete --bucket=scriptState --key=/absolute/path/to/script
```

**Buckets**:
- `entryState` — per-file hashes (for modification detection)
- `scriptState` — per-script hashes (for run_once tracking)
- `configState` — config template hash

## Debugging

All safe, read-only commands:

```bash
chezmoi doctor          # Check chezmoi configuration validity
chezmoi verify          # Verify all managed files match source state (exit 1 if not)
chezmoi diff            # Show what apply would change (all files)
chezmoi diff <target>   # Show what apply would change (one file)
chezmoi apply -n -v     # Dry-run: simulate apply with verbose output
chezmoi managed         # List all managed file paths
chezmoi unmanaged       # List files in home that chezmoi doesn't manage
chezmoi cat <target>    # Show what chezmoi would write to target (rendered)
chezmoi data            # Show all template data variables
```

## Common Operations

**Add a new file to chezmoi management:**
```bash
chezmoi add ~/.config/foo/bar.toml
# Creates source file, apply now manages it
```

**Add as template:**
```bash
chezmoi add --template ~/.config/foo/bar.toml
# Creates .tmpl source file with Go template markers
```

**Remove a file from management (keep live file):**
```bash
chezmoi forget ~/.config/foo/bar.toml
# Removes from source, live file untouched
```

**See where a managed file's source lives:**
```bash
chezmoi source-path ~/.config/foo/bar.toml
```
