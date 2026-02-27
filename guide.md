# The Chezmoi Mental Model

A practical guide for working with chezmoi in this dotfiles repo.
Written for someone who already uses chezmoi but hasn't fully internalized its
model — and who works with AI agents that edit system config on their behalf.

---

## 1. The Three States

Chezmoi operates on three copies of every managed file. Understanding these
is the single most important thing.

```
SOURCE STATE          TARGET STATE          DESTINATION STATE
(the repo)            (computed)            (your home dir)
~/projects/.../       chezmoi builds        ~/.config/fish/
  dotfiles/home/        this in memory        config.fish
  dot_config/fish/      from source +
  config.fish           templates
```

- **Source state** — the files in this repo (`~/projects/jasonkuhrt/dotfiles/home/`).
  This is what you commit to git. Filenames use chezmoi prefixes (`dot_`, `private_`,
  `exact_`, etc.) to encode metadata.

- **Target state** — what chezmoi *computes* your home directory should look like.
  For plain files, this is identical to the source. For templates (`.tmpl` files),
  chezmoi renders them with your data (`name`, `email`, etc.) to produce the target.

- **Destination state** — what actually exists in `~/`. This is the live system.

`chezmoi apply` overwrites the destination with the target. That's the entire
operation. It doesn't merge. It doesn't diff-and-patch. It replaces.


## 2. What Happens If You Edit Home Files Directly

**They get overwritten on the next `chezmoi apply`.**

This is the most common source of confusion. If you edit `~/.config/fish/config.fish`
directly, that edit lives only in the destination state. The next time you run
`chezmoi apply` (or an agent runs it), chezmoi computes the target from the source
and writes it over your destination. Your direct edit is gone.

Chezmoi does have a safety net: if it detects the destination has changed since
the last apply, it pauses and shows you a diff. You get three choices:

- **overwrite** — replace destination with target (your direct edit is lost)
- **skip** — leave destination alone (your source change isn't applied)
- **quit** — abort entirely

But there is **no "merge" option in that interactive prompt.** This is the friction
you've been hitting. The prompt is a gate, not a merge tool. See §6 for the
actual merge workflow.


## 3. The Symlink Alternative

Chezmoi does not have a built-in symlink mode for individual files. It's a
copy-based tool by design. But there are two patterns that get close:

### 3a. Reverse the ownership: make the repo the live location

For directories where you want zero-friction editing (like `~/.claude/`), you
can make the repo directory the canonical location and symlink *from* home:

```bash
# Home points to the repo
ln -sf ~/projects/jasonkuhrt/dotfiles/home/dot_claude ~/.claude
```

**But chezmoi will fight you.** On the next apply, chezmoi replaces the symlink
with a real directory containing copies of the files. To make this work, you'd
need to add the path to `.chezmoiignore` so chezmoi leaves it alone — but then
chezmoi no longer manages it at all.

### 3b. Use `create_` prefix for files you want chezmoi to seed but not manage

Files with the `create_` prefix are only written if they don't already exist.
After initial creation, you can edit the destination freely — chezmoi won't
touch it again. This is useful for files that get modified by applications at
runtime (like settings files that apps rewrite on quit).

### 3c. The practical answer

Chezmoi's model is fundamentally copy-based. If you need true symlink-based
dotfile management, tools like GNU Stow or bare git repos do that. Chezmoi's
strengths — templating, encryption, cross-machine config, run scripts — come
from the copy model. You're using templates and age encryption in this repo,
so you're getting real value from chezmoi's approach.

The way to make it feel lightweight is not symlinks — it's muscle memory around
the edit→apply loop. See §5.


## 4. The Correct Edit Workflow

When you want to change a config file:

```bash
# Option A: edit the source directly (you know the path)
$EDITOR ~/projects/jasonkuhrt/dotfiles/home/dot_config/fish/config.fish
chezmoi apply

# Option B: let chezmoi open the right source file for you
chezmoi edit ~/.config/fish/config.fish
chezmoi apply

# Option C: edit and apply in one step
chezmoi edit --apply ~/.config/fish/config.fish
```

Option B is the sweet spot. You think in terms of home paths (`~/.config/fish/config.fish`),
chezmoi translates to the source path and opens your editor. `--apply` makes it
atomic.

### The naming convention

| Source prefix      | Meaning                                    |
| ------------------ | ------------------------------------------ |
| `dot_`             | Leading `.` in filename                    |
| `private_`         | `0600` permissions                         |
| `exact_`           | Delete files in dir not in source          |
| `empty_`           | Create empty file                          |
| `encrypted_`       | Encrypted with age                         |
| `run_once_before_` | Script that runs once, before file apply   |
| `run_onchange_`    | Script that re-runs when its content changes |

These compose: `private_dot_ssh` → `~/.ssh` with `0700` permissions.


## 5. Making It Feel Lightweight

The goal: editing system config should feel as natural as editing any file. Here
are the techniques that collapse the workflow to near-zero friction:

### 5a. `chezmoi edit --apply`

One command. Opens the source file in your editor. Applies on save-and-quit.
Feels exactly like editing the home file, except it goes through the right path.

```fish
# Fish abbreviation to make it muscle memory
abbr -a ce 'chezmoi edit --apply'

# Now editing config is:
ce ~/.config/fish/config.fish
```

### 5b. `chezmoi add` for capturing direct edits

If you *did* edit a home file directly (or an application changed its own config),
pull those changes back into the source:

```bash
# Pull one file's destination changes into source
chezmoi add ~/.config/zed/settings.json

# Pull ALL modified destinations back to source
chezmoi re-add
```

`chezmoi re-add` is the "reverse apply." It overwrites source files with the
current destination state. It won't touch templates (since it can't
reverse-render them), and it respects encryption attributes.

### 5c. Diff before apply

```bash
chezmoi diff                     # see what apply would change
chezmoi diff ~/.config/fish/     # scoped to a path
```

### 5d. For AI agents, the rule is already in your CLAUDE.md

Your dotfiles-system-config rule tells agents to edit source files in the repo,
not home files. The key addition: agents should also run `chezmoi apply` after
editing. This is the reliable integration point — agents edit source state,
then apply.


## 6. The Missing "Merge" — How to Integrate Destination Changes

When `chezmoi apply` warns that the destination has changed, you've been stuck
because the interactive prompt doesn't offer a merge option. But chezmoi *does*
have a merge workflow — it's just a separate command:

```bash
chezmoi merge ~/.config/zed/settings.json
```

This launches a three-way merge between:
1. The **destination** (what's in `~/` right now, with your direct edits)
2. The **source** (what's in the repo)
3. The **target** (what chezmoi computes from the source)

For non-template files, source and target are identical, so it's effectively a
two-way merge. The default merge tool is `vimdiff`, but you can configure it:

```toml
# In chezmoi.toml
[merge]
    command = "code"
    args = ["--wait", "--merge", "{{ .Destination }}", "{{ .Source }}", "{{ .Target }}", "{{ .Destination }}"]
```

Or for all conflicting files at once:

```bash
chezmoi merge-all
```

### The complete conflict resolution workflow

When you've edited a home file directly *and* the source has also changed:

```bash
# 1. See what's different
chezmoi diff ~/.config/zed/settings.json

# 2. If you want to KEEP the destination version (discard source changes):
chezmoi re-add ~/.config/zed/settings.json

# 3. If you want to KEEP the source version (discard destination edits):
chezmoi apply --force ~/.config/zed/settings.json

# 4. If you want BOTH — merge them:
chezmoi merge ~/.config/zed/settings.json
# Then apply the merged result:
chezmoi apply
```

Most of the time, `re-add` (option 2) is what you want — the destination is
the "truth" because it's what you or an app actually changed, and you want to
capture that back into the repo.


## 7. AI Agent Integration

When Claude, Codex, or any agent edits your system config, the reliable pattern
is:

```
Agent edits SOURCE files in ~/projects/jasonkuhrt/dotfiles/home/
  → chezmoi apply deploys to ~/
  → git commit captures the change
```

Your existing CLAUDE.md rule enforces the first step. The remaining gaps:

### What agents should do

1. **Edit source state**, not destination. Source path = replace `~/` with the
   repo path, and `dot_` replaces leading `.`:
   - `~/.config/fish/config.fish` → `dotfiles/home/dot_config/fish/config.fish`
   - `~/.gitconfig` → `dotfiles/home/dot_gitconfig`

2. **Run `chezmoi apply`** after editing to deploy changes.

3. **Never edit `~/` directly** for managed files. If they do, run `chezmoi re-add`
   to pull changes back to source before the next apply overwrites them.

### What can go wrong

- Agent edits `~/.config/fish/config.fish` directly → lost on next apply
- Agent runs `chezmoi apply` when destination has diverged → the interactive
  prompt blocks (non-interactive agents can't answer it)
- Agent edits a `.tmpl` file without understanding Go template syntax → broken
  config

### Making it bulletproof

Add to your chezmoi config to auto-apply without the interactive prompt in
specific scenarios:

```toml
# In chezmoi.toml — auto-overwrite destinations that have changed
# Only do this if you trust that source state is always authoritative
[apply]
    force = false   # Set to true to skip the "destination changed" prompt
```

Or train agents to run `chezmoi re-add` first when they know the destination
might have drifted, then apply.


## 8. Your Current Drift

Right now, `chezmoi status` shows:

```
MM .claude/skills/flo_next/scripts/compact-recovery.sh
MM .config/zed/settings.json
```

`MM` means both the source and destination have been modified since the last
apply. For Zed settings specifically, the destination has changes (extensions
you enabled in-app) that aren't in the source. To resolve:

```bash
# If the Zed changes are what you want (likely — you made them in the app):
chezmoi re-add ~/.config/zed/settings.json

# Or merge both sets of changes:
chezmoi merge ~/.config/zed/settings.json

# Then apply to get everything in sync:
chezmoi apply
```


## Quick Reference

| I want to...                              | Command                                |
| ----------------------------------------- | -------------------------------------- |
| Edit a config file correctly              | `chezmoi edit --apply ~/.config/x`     |
| See what apply would change               | `chezmoi diff`                         |
| Apply source → home                       | `chezmoi apply`                        |
| Pull home changes → source                | `chezmoi re-add`                       |
| Pull one file's changes → source          | `chezmoi add ~/.config/x`              |
| Merge conflicting changes                 | `chezmoi merge ~/.config/x`            |
| Merge all conflicts                       | `chezmoi merge-all`                    |
| Add a new file to chezmoi                 | `chezmoi add ~/.config/new/file`       |
| Check what's managed                      | `chezmoi managed`                      |
| Check what's out of sync                  | `chezmoi status`                       |
| See source path for a home file           | `chezmoi source-path ~/.config/x`      |
| Force apply (skip destination check)      | `chezmoi apply --force`                |
