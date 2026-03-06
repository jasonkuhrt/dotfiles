---
name: chezmoi
description: Use when working in this symlink-first chezmoi repo: editing managed files, deciding between trueDir/fileSymlink/special lanes, using just up and just edit, handling encrypted files or scripts, or doing surgical raw chezmoi repair when low-level conflicts appear.
user_invocable: false
---

# Chezmoi

This repo is not apply-heavy anymore. `chezmoi` is still the substrate, but `dotctl` plus `just` are the operational interface.

## Default Interface

- `just edit <target>`: open the correct backing file by live target path
- `just up`: the only convergent mutation command
- `just status`: one-screen machine health
- `just doctor`: deeper checks
- `just explain <target>`: lane, source path, expected shape, capture policy

Prefer those before raw `chezmoi`.

## Lane Model

| Lane | Typical targets | What normal edits need |
|---|---|---|
| `trueDir` | `~/.config/ghostty`, `~/.config/git`, `~/.claude/rules` | Existing files and new files are live immediately on both sides. No apply needed for content or child-path changes. |
| `fileSymlink` | `~/.gitconfig`, `~/.npmrc`, `~/.config/starship.toml`, `~/.config/vim/.vimrc` | Existing file content edits are live immediately. New files, renames, and shape repair go through `just up`. |
| `special` | `encrypted_`, `modify_`, scripts, `exact_`/`executable_` metadata-heavy trees | Still apply-driven. Use `chezmoi edit` or `just up` depending on the target. |

## Hard Rules

- **NEVER use `chezmoi apply --force` or `-f`.**
- **Do not assume direct home-directory edits are lost.** For most ordinary config files in this repo, the live path is the source because it is a symlink.
- **Do not replace a live symlink with `mv tmp "$LIVE_PATH"` unless you are writing to the resolved backing file.** That breaks symlink shape.
- **Use `chezmoi edit` for encrypted or modify targets.** Those remain special-lane operations.

## Editing Rules

1. **Existing config file**
   - Start with `just edit <target>`.
   - For `trueDir` and `fileSymlink` lanes, normal content edits are live immediately.

2. **Need to know the lane or backing path first**
   ```bash
   just explain <target>
   chezmoi source-path <target>
   ```

3. **New file under a `trueDir` root**
   - Create it either under the live path or under `symlink-roots/`.
   - Both sides are the same tree; no apply needed.

4. **New file under `fileSymlink` or `special`**
   - Create it in source with `chezmoi add ...` or by editing the source tree directly.
   - Then run `just up`.

5. **Encrypted file**
   ```bash
   chezmoi edit <target>
   just up
   ```

## Raw Chezmoi: When It Still Matters

Use raw `chezmoi` directly for:

- encrypted files: `chezmoi edit <target>`
- path inspection: `chezmoi source-path <target>`
- surgical diff/status: `chezmoi diff <target>`, `chezmoi status <target>`
- lifecycle script state: `chezmoi state get ...`, `chezmoi state delete ...`
- adding/removing managed targets: `chezmoi add`, `chezmoi forget`

## Conflict Resolution

Use manual per-target repair only when `just up` is not enough and the target is in the `special` lane, or when a file-symlink target needs immediate surgical handling.

1. **Explain the target first**
   ```bash
   just explain <target>
   ```

2. **Inspect low-level drift**
   ```bash
   chezmoi status <target>
   chezmoi diff <target>
   ```

3. **Wait for explicit approval** before preserving or discarding live bytes.

4. **Keep live bytes** for a broken file-symlink target:
   ```bash
   chezmoi re-add <target>
   chezmoi apply --mode symlink --no-tty <target>
   ```

5. **Keep source bytes** on an apply-driven target after approval:
   ```bash
   chezmoi state delete --bucket=entryState --key=<absolute_target_path>
   chezmoi apply --mode symlink --no-tty <target>
   ```

6. **Verify**
   ```bash
   chezmoi status <target>
   ```

## Lifecycle Scripts

Lifecycle scripts still run via the underlying `chezmoi apply`, but the public trigger is `just up`.

Use `just up` after changing:

- `home/Brewfile`
- `home/npm/global-packages.txt`
- `home/dock/apps.txt`
- any `run_once_*` / `run_onchange_*` script
- any special-lane target that still needs apply

Low-level script reset remains surgical:

```bash
chezmoi state delete --bucket=scriptState --key=<absolute_script_path>
```

## Safe Read-Only Diagnostics

```bash
just status
just doctor
just explain <target>
chezmoi doctor
chezmoi diff
chezmoi managed
chezmoi unmanaged
chezmoi cat <target>
chezmoi data
```
