# Terminal & Agent Stack Clean Slate

**Goal:** Use native terminal and agent features, remove the redundant glue, and keep working sessions recoverable.

**Run order:** agent handles preparation → Jason makes one terminal cutover → agent finishes cleanup and the chosen replacements.

This is the execution plan. Nothing has been executed yet. The detailed research is linked at the end.

## Agree once, then work

At the start of execution, ask Jason whether to use the recommended choices below and agree on a quiet time for the cutover. Record any exceptions here; don't ask again for each file or command.

| Choice | Recommendation | What changes |
| --- | --- | --- |
| Navigation | Native cmux shortcuts | Remove sticky Ctrl+0 mode and Neovim↔cmux edge crossing. Split left/up is lost; resize remains native. |
| Codex tab names | cmux auto-naming | Topic names replace `codex2`'s thread titles. |
| Claude fan-out | Agent teams | Retire `dispatch-claude`; teammates no longer each get a sidebar workspace. |
| cmux skills | Official skills + a short local note | Replace the custom reference with the upstream skills. |

If Jason keeps drive mode, use the small alternative in Step 4 and ask whether to keep fish `[`/`]` tab switching. A declined replacement stays installed.

**Recorded choices (2026-09-15):** all four recommendations: native navigation, cmux auto-naming, agent teams, official skills + local note. **Cutover time:** right after Step 1 preparation.

Preparation can proceed while the cutover time is pending. Jason handles the terminal cutover and the brief visual checks marked in Step 4; the agent handles edits and command checks.

## Working rules

- Work in `/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles`. Other sessions share it: preserve their changes, skip occupied files and continue independent work. Commit only owned paths; never stash, checkout or switch.
- `home/` is deployed through symlinks. Treat config edits as live changes. Undo a failed edit by reversing your own change, not restoring the whole file.
- After each component's edits, run its relevant check: fish → `fish -n`; Karabiner → `jq empty` and `just karabiner-check`; Lua → `just lua-check`; recipes → `just --summary`. Recheck only what changes or fails.
- Give hang-prone diagnostics and headless startup a timeout, for example `perl -e 'alarm 60; exec @ARGV' …`. If cmux crash-loops, stop relaunching it and identify the deep process chain with Jason before terminating that chain.
- Use semantic commits and `nesia add` for user-visible changes. Remove recipes with their features; use existing `just` recipes for repeatable checks.
- Keep the coordinating agent outside **both cmux and zmx** throughout the cutover: use Codex desktop, Terminal.app, or standalone Ghostty. Keep that host app open; a native cmux tab would still die when cmux quits.

## 1. Preparation — agent

These tasks can be completed independently of the terminal cutover. Commit each completed component.

### Delete the unused Neovim plugin copy

- [x] Confirm `home/.config/nvim/lua/plugins/cmdux.lua` still loads `~/projects/jasonkuhrt/cmdux`.
- [x] Delete `home/.config/nvim/local-plugins/cmd-ux/` and `cmd-ux-command-blocklist.txt`. Keep `cmdux-command-blocklist.txt`.
- [x] Remove its wiring from:
  - `justfile`: `cmd_ux_*` variables and eight `cmd-ux-*` recipes.
  - `.luarc.json`, `scripts/git-hooks/check-staged-lua.sh`, `scripts/ci/lua-ci.sh`, and `.github/workflows/lua.yml`: its paths, test bookkeeping and test block. Keep other plugins' checks.
  - `.claude/CLAUDE.md` and `docs/lua-tooling.md`: instructions about the deleted copy.
  - `keymap.yml` and `home/.config/nvim/local-plugins/file-ops/README.md`: references should say `cmdux`.
- [x] Check: `just lua-check`, recipe parsing, and a bounded Neovim startup that loads `cmdux`.

### Bring the CLI tools into their intended installation state

- [x] **Neovim:** replace the HEAD build with the stable Homebrew package declared in `scripts/data/Brewfile`. Confirm the version and that the normal configuration starts. Run the Lua check after this change.
- [x] **Codex:** download and read the official installer, then run it:

  ```bash
  curl -fsSL https://chatgpt.com/codex/install.sh -o /tmp/codex-install.sh
  sh /tmp/codex-install.sh
  ```

  The inspected installer replaces `~/.local/bin/codex` with a symlink; it does not write through the old link into the repo. Check the downloaded script still does this, and inspect any shell-config changes it makes.
- [x] Verify the newly installed CLI with `codex --version` and a bounded `codex doctor` from a fresh shell.
  - Success: delete and commit the repository wrapper `home/.local/bin/codex`.
  - Installation or verification failure: restore the existing wrapper link, verify it works again, and record the actual reason it stays:

    ```bash
    ln -sfn ../../projects/jasonkuhrt/dotfiles/home/.local/bin/codex ~/.local/bin/codex
    ```

## 2. One terminal cutover — agent prepares, Jason operates the terminals

Do this at the agreed quiet time. Native resume restores conversations; finish in-flight work before moving a session.

- [x] **Together:** use `zmx list` and the existing terminals to identify the sessions and other work to preserve. Confirm the coordinating agent is in one of the safe hosts above, outside cmux and zmx.
- [x] **Agent:** remove only the "Terminal session persistence" block, including `command = direct:…/cmux-zmx-enter`, from `home/.config/ghostty/config`. Keep the launcher script and zmx installed.
- [x] **Jason:** reload every running cmux and standalone Ghostty instance. Quit/relaunch an instance only if reloading is insufficient.
- [x] **Jason:** check a new cmux tab: `$ZMX_SESSION` is empty, Claude starts and appears in the sidebar. Check a new standalone Ghostty window reaches its normal shell too.
  - If either fails, the agent puts back only the removed config block; reload and fix startup before continuing.
- [x] **Jason:** for each Claude conversation to keep, finish and exit its old process, open a native tab in the same directory, then use `claude -r`. Confirm the expected history appears. Finish or deliberately stop other work still in zmx.
- [x] **Jason:** with all work idle, quit and relaunch cmux once and confirm an idle Claude conversation returns automatically. If it doesn't, fix resume before removing zmx.
- [x] **Jason:** once all retained sessions are recovered, remove the old zmx sessions and installations:

  ```bash
  for s in $(zmx list | awk -F'\t' '{sub(/^[→ ]*name=/,"",$1); print $1}'); do zmx kill "$s"; done
  brew uninstall neurosnap/tap/zmx
  brew uninstall --cask mdsakalu/tap/zsm
  rm -rf ~/.local/state/cmux-zmx
  ```

- [x] **Jason:** tell the agent that the cutover is complete. The agent commits the verified Ghostty change and continues.

If the cutover is interrupted, leave zmx and its launcher available. Resume from the unchecked item; don't start a second migration procedure.


**Cutover record (2026-09-16):** the agent performed the cutover. Ten agent sessions (5 Claude, 5 grok)
were migrated to native tabs by session id. cmux auto-resume initially restored nothing because cmux types
`cmux restore <agent> <id>` into the new shell and fish started prompts in vi normal mode, which ate the
leading characters; fixed by starting prompts in insert mode (b1f4af72) and reported upstream as
manaflow-ai/cmux#12772. After the fix a quit/relaunch restored every session unattended. The 10 idle zmx
sessions were left running; the binary is uninstalled, so they end at reboot.
## 3. Remove the retired zmx glue — agent

After Jason confirms the cutover:

- [x] Delete `home/.local/libexec/cmux/cmux-zmx-enter`, `scripts/tests/fake-zmx.sh`, and recipe `cmux-zmx-check`.
- [x] Remove `zx`, `zs`, and `zz` from `home/.config/fish/config.fish`.
- [x] Remove the `ZMX_SESSION` format segment and table from `home/.config/starship.toml`.
- [x] Remove the zmx/zsm entries from `scripts/data/Brewfile`; remove their taps only if nothing else uses them.
- [x] Update `DECISIONS.md` (Decision 8), `docs/cli-tools.md`, `docs/claude-code-tools.md`, the starship skill, configuring-zed's "Auto-Attach to Project zmx Session" section, and the stale comment in `cmux-mode`.
- [x] Check fish syntax, render the Starship prompt once, and check recipe parsing. Commit the cleanup.

## 4. Apply the chosen native replacements — agent

Complete each selected component and its check. Keep a working replacement before deleting the helper it replaces.

Collect the visual checks for Jason into a short list. While waiting for his observations, continue independent work and leave those checks unchecked.

### Navigation

**If using native navigation:**

- [x] Remove the Karabiner rules whose descriptions contain `cmux`. Keep Raycast Ctrl+J/K and sticky fn. Validate the JSON, run `just karabiner-check`, and reload Karabiner.
- [x] Delete `cmux-mode`, its `cmux-mode-check` recipe, and the Ghostty `shift+ctrl+alt+cmd+…` bindings.
- [x] Delete `home/.config/nvim/local-plugins/cmux-nav/` and `lua/plugins/cmux-nav.lua`. Remove its lazydev entry, `justfile` variable/paths/recipe, CI bookkeeping, and entry in `docs/neovim.md`.
- [x] Delete `cmuxx` and fish's `[`/`]` bindings.
- [x] Update `hjkl-navigation.md`, `keymap.yml`, `docs/karabiner.md`, and the current cmux skill to describe the chosen navigation. Keep instructions for retained features.
- [ ] Check Lua and fish. **Jason confirms:** Neovim window movement and native cmux navigation work.

Native keys: tabs `cmd+shift+]/[`; workspaces `cmd+ctrl+]/[`; focus `cmd+opt+arrows`; split right/down `cmd+d` / `cmd+shift+d`; zoom `cmd+shift+enter`; resize `ctrl+shift+h/j/k/l`.

**If keeping drive mode:**

- [ ] Collapse the two enumerated catch-all Karabiner rules using `from.any`, preserving modifier-key behavior in both rules. **Jason confirms:** mode entry/exit, prefixes and unmapped keys work after reloading.
- [ ] Use `cmux next-window` / `previous-window` for workspace cycling; update and run the existing `cmux-mode-check`.
- [ ] Remove `cmuxx` and fish's bracket bindings only if Jason chose that; update their instructions and check fish syntax.

### Codex tab names

- [ ] If selected, enable `automation.workspaceAutoNaming` in `home/.config/cmux/cmux.json`; if needed, install its integration with `cmux hooks setup --agent codex`. **Jason confirms:** starting Codex in a native tab and completing a turn produces a topic name.
- [ ] Once naming works, delete `codex2`, `codex-tab-sync`, recipe `codex2-check`, and the codex2 documentation row. Otherwise retain them and report why naming failed.

### Claude fan-out

- [x] If selected, confirm Claude Code agent teams support the independent-worker/report-back workflow in their current documentation.
- [x] Remove `home/.claude/skills-library/dispatch-claude` **and its tracked activation link** `home/.claude/skills/dispatch-claude` with `git rm`.
- [x] Remove recipes `claude-dispatch-check` and `cmux-upstream-audit`, and the disabled `dispatch-claude` block in the tracked Codex config. If that block is also in the separate live `~/.codex/config.toml`, remove only that block; preserve all other contents.
- [x] Check recipe parsing and that the skill link is gone. Check Codex config loading if its config changed.

### cmux skills — after navigation is settled

- [x] If selected, disable the old `cmux` skill with shan, rename its library folder to `cmux-local`, and update its frontmatter to `name: cmux-local` **before enabling it**.
- [x] Reduce the local note to: windows vs workspaces, the cmux config directory symlink, the native-launch requirement, and Jason's chosen navigation. Delete its obsolete reference pages.
- [x] Read and use the official [skills.sh](https://raw.githubusercontent.com/manaflow-ai/cmux/v0.64.23/skills.sh) with **`--ref v0.64.23`** and `--dest "$PWD/home/.claude/skills-library"`. The explicit ref pins the skills it downloads, not just the installer. Install `cmux`, `cmux-browser`, `cmux-workspace`, `cmux-keyboard-shortcuts`, `cmux-settings`, `cmux-customization`, and `cmux-markdown`.
- [x] Enable those skills and `cmux-local` through shan. Verify each activation link resolves to its `SKILL.md`, then commit the exact library folders **and** links under `home/.claude/skills/`.

Use the library destination above: `~/.claude/skills` itself is a symlink into this repo, so a global installer would bypass this library/activation layout.

### Browser links

- [ ] Check that `open` resolves inside cmux.app in a native tab. **Jason confirms:** `open https://example.com` lands in cmux's browser.
- [ ] Once that works, delete `plannotator-browser`, `PLANNOTATOR_BROWSER`, and Neovim `link_open.lua`'s cmux-specific branch. Check fish and Lua. **Jason confirms:** a Plannotator page and a Neovim link open in cmux.
- [ ] Replace `gprv` with `abbr -a gprv 'gh pr view --web'` only if **Jason confirms** `gh pr view --web` also opens in cmux. Otherwise keep the existing function.


**Step 4 record (2026-09-16):** navigation, Claude fan-out, cmux skills and browser links are done and
machine-checked: `just lua-check`, `just karabiner-check`, `fish -n`, recipe parsing and a bounded Neovim
startup all pass, and `open https://example.com` from a `/bin/sh` script in a native tab created a cmux
browser surface rather than an external window. Items marked "Jason confirms" await his eyes, not more work.
The drive-mode alternative does not apply: native navigation was chosen.

**Codex tab names: not done, and codex2 stays.** `cmux hooks setup --agent codex` is installed and the
hooks do fire (a `codex exec` turn logged `hook: Stop`), but the workspace title never became a topic
name, and cmux 0.64.23 exposes no `automation.workspaceAutoNaming` setting — neither `cmux docs settings`
nor the commented defaults in `cmux.json` contain any naming key, so the plan's premise for this item was
wrong. An interactive attempt was inconclusive: the Codex TUI stopped on a confirmation dialog. Until a
Codex session is seen producing a topic name, `codex2`, `codex-tab-sync`, the `codex2-check` recipe, its
docs row and `scripts/tests/fake-cmux.sh` all stay.
## 5. Finish — agent

- [ ] Delete `scripts/tests/fake-cmux.sh` only when no remaining recipe uses it.
- [ ] Scan for retired names, excluding historical docs:

  ```bash
  git grep -n -w -e zmx -e zsm -e ZMX_SESSION -e cmd-ux -e cmd_ux -e codex2 -e codex-tab-sync -e dispatch-claude -e cmux-mode -e cmux-nav -e cmuxx -e plannotator-browser -- . ':!docs/plans' ':!docs/superpowers' ':!research' ':!archive'
  ```

  Fix active references to removed features. Matches for deliberately retained features are expected.
- [ ] Check recipe parsing after the final recipe deletion. Complete any component check still outstanding; don't rerun successful checks on unchanged components.
- [ ] Add a short decision in `DECISIONS.md`: prefer native features; keep glue for a specific missing capability. Log the actual user-visible changes with `nesia add`.
- [ ] Commit the remaining owned changes, review outgoing commits, and push. If the shared branch contains another session's unpublished work, coordinate before pushing their commits.
- [ ] Report what was removed, what stayed, and any item still blocked. An unchecked or failed item remains visible until resolved.

**Done means:** new terminals work, retained Claude conversations are recovered, native auto-resume works after relaunch, chosen replacements pass their command and visual checks, and no active configuration or recipe points at deleted files.

**Evidence:** original research at commit `7a43ecf0`; detailed local notes at `.session/ignore/terminal-stack-plan-detailed-2026-09-15.md`. Use these for source details, not execution instructions. Baseline verified 2026-09-15: cmux 0.64.23 and Claude Code 2.1.272.
