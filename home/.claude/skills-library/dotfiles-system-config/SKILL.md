---
name: dotfiles-system-config
description: Use when making system configuration changes that should persist across Macs. Decides whether config belongs in symlink-roots or home/, how to update dotctl lane metadata, and when just up is required.
---

# System Configuration

When making system configuration changes:

1. **Should this go in dotfiles?** Persist across machines → dotfiles, not direct system changes

2. **Choose the right lane**

   | Case | Location | Notes |
   |-------------|----------|----------|
   | Pure config directory (whole-dir symlink) | `home/<path>/` | Add to `trueDirs` in `dotctl.config.json` |
   | Mixed directory (config + runtime state) | `home/<path>/` with `.spread` marker | Add `.spread` file; dotctl creates per-file symlinks |
   | Single config file | `home/<path>` | File symlink created automatically by `just up` |
   | File needing merge with runtime state | `home/<path>` + `home/<path>.modify` | Sidecar script merges managed + live content |
   | Encrypted secret | `home/<path>.age` | Decrypted via age on deploy |
   | Data file that only drives lifecycle scripts | `home/Brewfile`, `home/npm/global-packages.txt`, `home/dock/apps.txt` | Ignored from deploy, hashed by scripts |

3. **Resolve the target path before editing**
   - `just explain <target>` to see lane, source path, and capture policy
   - `just edit <target>` to open the correct backing file

4. **Converge with the public command**
   - Use `just up` after adding new files, changing lifecycle inputs, or touching `special`-lane targets
   - Do not invent new sync wrappers; `just up` is the convergent interface

5. **Promote to `trueDir` only when all of these hold**
   - the target is a directory
   - the subtree is plain target-shaped (no metadata prefixes)
   - git is the intended source of truth
   - unmanaged runtime spill is acceptable or excluded
