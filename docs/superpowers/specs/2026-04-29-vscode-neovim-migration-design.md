# vscode-neovim Migration

**Status:** Ready for implementation plan
**Created:** 2026-04-29
**Last updated:** 2026-05-03
**Author:** Jason Kuhrt + Claude

## Goal

Replace the **VSCodeVim** plugin with **vscode-neovim** so VS Code uses the user's existing nvim `init.lua` as the single source of truth for the vim layer. The trigger is `which-key.nvim`: getting **vim-native, operator-pending-aware** chord discovery inside VS Code (e.g., pressing `d` shows valid motions). No VS Code extension delivers this without a real nvim engine — vscode-neovim is the only path.

In parallel, this migration adopts a coherent **5-prefix chord architecture** across all three editors (terminal nvim, VS Code, Zed), resolves long-standing chord divergences, and moves VS Code config from Settings Sync into the dotfiles repo.

## Non-goals

- Eliminating VS Code in favor of terminal nvim (keep both)
- Keeping VSCodeVim available as a fallback (clean cut, no parallel paths)
- Porting custom nvim UI plugins (`cmdux`, `snacks` UI, `blink-cmp`) into VS Code — gated off and replaced by VS Code-native equivalents

## Mental model

After migration:

- **nvim is the editor.** VS Code is a window over nvim's buffer. Cursor, modes, motions, registers, marks, macros, and `<leader>` chords all live in nvim's state.
- **VS Code owns chrome.** File tree, command palette, IntelliSense, LSP, debugger, source control panel, gutter, minimap, breadcrumbs, fold rendering.
- **One source of truth per concern.** Vim keys → `init.lua`. VS Code chrome keys → `keybindings.json`. They do not overlap because they govern different surfaces.
- **vscode-neovim is the bridge.** It boots nvim with `vim.g.vscode = true`, syncs buffer state, and exposes a `vscode.action()` Lua API for nvim keymaps to dispatch VS Code commands by name.

`keymap.yml` becomes the explicit, accurate, prefix-architecture-aware source of truth. The `nvim` column governs both terminal nvim and VS Code (because VS Code now executes the nvim config); the `vscode` column appears only where a chord dispatches a VS Code-specific command (PR review, GitHub-link, chrome ops).

## Decisions log

Twelve resolved decisions drive the chord architecture. Listed for traceability:

| # | Decision | Resolution |
|---|---|---|
| 1 | g-prefix git semantics in nvim | **Superseded by #14.** g-prefix returns to vim-convention (LSP/goto). |
| 2 | m-prefix usage | **2.c** — Helix-style match/surround. LSP returns to g-prefix. |
| 3 | w as match-bracket override | **D** — revert Zed's override; `mm` becomes match-bracket. |
| 4 | V smart-select override | **B** — revert Zed's override; V stays as visual-line. Enclosing-symbol via treesitter (`vif`/`vac`). |
| 5 | r as rename | **A** — adopt r → rename across all three. Lose vim's `r<char>` replace-char (use `cl<char>`). |
| 6 | Motion centering parity (J/K/G/n/N) | **A** — bring Zed up to nvim's centering via SendKeystrokes. |
| 7 | spc-p panel menu | **t-prefix unified.** Single-key `t*` replaces `<leader>p*` and `<leader>t*`. Adds 5 new nvim plugins. |
| 8 | keymap.yml drift | All 8 fixes applied + Zed `gk` typo fix + Zed `u` shadowing fix. |
| 11 | VS Code Settings Sync | **yes, ditch** — move config into dotfiles. |
| 13 | g-prefix sub-conflicts | **Superseded by #14.** Zed's git block is canonical (now on q-prefix). |
| 14 | q-prefix git chord set | All-tools chord set defined; 3 plugins added (diffview, octo, gitlinker); Zed gaps documented. |

**Five-prefix architecture (final):**

```
g    LSP/goto              vim convention; LazyVim defaults
q    git                   replaces vim's macro recording (unused)
m    match/surround        Helix-style; replaces vim's mark-set on most letters
t    toggle/panel          unifies <leader>p* and <leader>t*
,    config menu           Zed/VSCodeVim convention
```

## Current state inventory

### nvim config (`home/.config/nvim/`)

| File | Role | Disposition |
|---|---|---|
| `lua/config/lazy.lua` | Lazy bootstrap + plugin imports | **Add** `{ import = "lazyvim.plugins.extras.vscode" }`. |
| `lua/config/keymaps.lua` | Vim keymaps | **Append** chord scheme: g-prefix LSP, q-prefix git, m-prefix match/surround, t-prefix toggle. **Append** `if vim.g.vscode then require("config.vscode_keymaps") end`. **Branch** `vim.lsp.buf.*` calls on `vim.g.vscode` to dispatch VS Code commands. |
| `lua/config/options.lua` | Editor options | **No change**. |
| `lua/config/autocmds.lua` | Autocmds | **Branch** TermOpen autocmd on `vim.g.vscode`. |
| `lua/config/vscode_keymaps.lua` | _(new)_ VS Code-mode-only chords | **Create** — see "VS Code-only keymap" below. |
| `lua/plugins/cmdux.lua` | Custom command palette | **Gate**: `if vim.g.vscode then return {} end`. |
| `lua/plugins/cmux-nav.lua` | Pane nav into cmux | **Gate** off in VS Code. |
| `lua/plugins/link-open.lua` | `<C-o>` link-or-jump | **Gate** off; replicate in `vscode_keymaps.lua`. |
| `lua/plugins/file-ops.lua` | File operations | **Gate** off. |
| `lua/plugins/unnest.lua` | Wrap nvim-from-terminal | **Gate** off. |
| `lua/plugins/zen-mode.lua` | folke/zen-mode | Auto-disabled by extras whitelist; **add** `<leader>z` in `vscode_keymaps.lua`. |
| `lua/plugins/snacks.lua` | snacks.nvim with custom opts | **Wrap** custom opts in `if not vim.g.vscode then ... end`. |
| `lua/plugins/blink-cmp.lua` | Completion | **No change** (auto-disabled — not in whitelist). |
| `lua/plugins/editor.lua` | Disables telescope/lualine, enables mini.statusline | **No change** (auto-disabled). |
| `lua/plugins/colorscheme.lua` | tokyonight | **No change** (extras disables LazyVim's colorscheme call). |
| `lua/plugins/lang.lua` | LSP server configs | **No change** (auto-disabled). |
| `lua/plugins/lsp.lua` | Disable K → hover global | **No change** (auto-disabled). |
| `lua/plugins/lua.lua` | lazydev + selene + lua mason | **No change** (auto-disabled). |
| `lua/plugins/kit.lua` | Lua utility lib | **No change** (Lua-only). |

### nvim plugins to add (gated `if not vim.g.vscode then`)

| Plugin | Purpose | Chord(s) |
|---|---|---|
| `aerial.nvim` | Outline panel | `to` |
| `folke/trouble.nvim` | Diagnostics panel | `td` |
| `sindrets/diffview.nvim` | Git history/graph + side-by-side diff | `qd`, `ql` |
| `pwntester/octo.nvim` | GitHub PR/issue review | `qr`, `qn`, `qN` |
| `linrongbin16/gitlinker.nvim` | Copy/open GitHub URLs | `qy`, `qY` |

`mini.surround` is already loaded via LazyVim's whitelist; **reconfigure** to use m-prefix (`ms`/`md`/`mr`) instead of vim's default `s`/`d`/`c` surround chords.

### VS Code config (`~/Library/Application Support/Code/User/`)

| File | Disposition |
|---|---|
| `settings.json` | **Delete** all `vim.*` keys (lines ~68–263, ~200 lines of VSCodeVim config). All other settings remain. **Move file** into dotfiles repo (Decision #11). |
| `keybindings.json` | **Reframe** `vim.mode == 'Visual'` → `neovim.mode == 'visual'` on cmd+j/cmd+k duplicate-line entries. **Validate** the welcome-screen leader chord block — gate on `!neovim.connected` if vscode-neovim doesn't fire on welcome. **Move file** into dotfiles repo. |
| `snippets/` | **Move directory** into dotfiles repo. |

### Zed config (`home/.config/zed/keymap.json`)

Zed needs **substantial edits** to align with resolved decisions. Net change is large but mechanical:

| Change | Lines (approx) | Action |
|---|---|---|
| Remove old `g`-prefix git block | 327–351 | Delete entire git context block; redirect chords to q-prefix |
| Add new `q`-prefix git block | new | qj/qk/qb/qw/qd/qo/qO/qa/qA/qu/qU/qc/qp/qP/qB |
| Restore `g`-prefix to LSP | new | gd/gr/gI/gy/gD/gh — match LazyVim defaults |
| Revert `w` → match-bracket | wherever | Drop binding; `w` stays as default vim word |
| Revert `V` → SelectEnclosingSymbol | 502 | Drop binding; `V` stays as visual-line |
| Add `r` → rename | new | editor::Rename |
| Add `mm` → match-bracket (Helix-style) | new | vim::Matching |
| Add `mi*`/`ma*`/`ms*`/`md*`/`mr*` chord menus | new | If Zed supports vim-style text-object chord menus; otherwise document gap |
| Add J/K/G centering via SendKeystrokes | wherever J/K live | Mirror existing n/N pattern |
| Replace `<spc>p*` and `<spc>t*` with `t*` | wherever | Single-key toggle prefix |
| Fix `gk` typo | 334 | `fn-_gj1` → `fn-_qk1` (also rename helpers to q-prefix scheme) |
| Fix `u` shadowing bug | 428 (or 510) | Remove `vim::MoveToPrevious` line; keep `vim::Undo` |
| Add `[b`/`]b` buffer prev/next | new | If Zed supports |

### Extensions

| Extension | Action |
|---|---|
| `vscodevim.vim` | **Disable** (phase 2), **uninstall** (phase 12) |
| `asvetliakov.vscode-neovim` | **Install** (phase 2) |
| All others (50 extensions) | **Keep** unchanged |

### Dotfiles repo

| Concern | Action |
|---|---|
| `home/Library/Application Support/Code/User/settings.json` | **Create** (move from VS Code dir) |
| `home/Library/Application Support/Code/User/keybindings.json` | **Create** (move) |
| `home/Library/Application Support/Code/User/snippets/` | **Create** (move) |
| `home/Library/Application Support/Code/User/.gitignore` | **Create** with: `globalStorage/`, `workspaceStorage/`, `History/`, `sync/`, `chatLanguageModels.json`, `*.workbench-cycler-backup-*` |
| `scripts/data/Brewfile` | **Add** `cask "visual-studio-code"` |
| `scripts/data/vscode-extensions.txt` | **Create** — sorted list of extension IDs (`asvetliakov.vscode-neovim` included; `vscodevim.vim` excluded) |
| `scripts/setup/after/install-vscode-extensions` | **Create** — argc-based installer that loops over the manifest |
| `justfile` | **Add** `vscode-extensions-sync` and `vscode-extensions-export` recipes |
| `keymap.yml` | **Already updated** — reflects the 5-prefix architecture |
| `docs/keymap.md` (or `hjkl-navigation.md`) | **Update** to document the 5-prefix architecture |

## Migration phases

| # | Phase | Steps | Reversible? |
|---|---|---|---|
| 0 | Snapshot | `git status` clean; commit a "pre vscode-neovim migration" baseline. | n/a |
| 1 | Move VS Code config to dotfiles | (a) Disable Settings Sync (keep local). (b) `mv` settings.json/keybindings.json/snippets into `home/Library/Application Support/Code/User/`. (c) Create `.gitignore`. (d) Symlink via dotfile install. (e) Verify VS Code loads them. | Recoverable from phase-0 commit; can re-enable Settings Sync. |
| 2 | Activate vscode-neovim | (a) `code --install-extension asvetliakov.vscode-neovim`. (b) Disable `vscodevim.vim` (don't uninstall). (c) Add `{ import = "lazyvim.plugins.extras.vscode" }` to `lazy.lua`. (d) Reload window. | Reversible: re-enable VSCodeVim, remove import line. |
| 3 | Sweep — automatic gating | LazyVim's vscode extras whitelist takes effect. Verify `:Lazy` shows blink-cmp, lualine, mini.statusline, lspconfig, conform, mason, lazydev as `cond=false`. snacks loaded with UI surfaces off. tokyonight loaded but colorscheme call no-op'd. | Reversible by removing the import. |
| 4 | Sweep — manual plugin gating | Add `if vim.g.vscode then return {} end` to top of `cmdux.lua`, `cmux-nav.lua`, `link-open.lua`, `file-ops.lua`, `unnest.lua`. Wrap snacks custom opts. Gate TermOpen autocmd. | Per-file `git restore`. |
| 5 | Add new nvim plugins | Create `lua/plugins/aerial.lua`, `trouble.lua`, `diffview.lua`, `octo.lua`, `gitlinker.lua` — each gated `if vim.g.vscode then return {} end`. | Delete files. |
| 6 | Reconfigure mini.surround for m-prefix | Update mini.surround opts: change `mappings` to use `m`-prefix (`ms` add, `md` delete, `mr` replace). | Revert opts. |
| 7 | Keymap migration — terminal nvim | Update `keymaps.lua` with: g-prefix LSP overrides (or rely on LazyVim defaults), q-prefix git chord set (gitsigns + lazygit + diffview + octo + gitlinker bindings), m-prefix match (`mm`), t-prefix toggle/panel chord set, `r` for rename. Verify `<leader>cr` rename alias still works. | Per-block diff revert. |
| 8 | Keymap migration — VS Code mode | Create `lua/config/vscode_keymaps.lua` with all VS Code-mode-only mappings (PR review chords, GitHub-link chords, panel toggles via vscode.action(), zen mode, etc.). Append `if vim.g.vscode then require("config.vscode_keymaps") end` to `keymaps.lua`. | Delete file + require line. |
| 9 | Zed config migration | Edit `home/.config/zed/keymap.json` per the changes table above: remove old g-prefix git, add q-prefix git, restore g-prefix LSP, revert w/V overrides, add r/mm/centering/[b/]b/t-prefix, fix gk and u bugs. | Recoverable from phase-0 commit. |
| 10 | settings.json cleanup | Delete all `vim.*` keys from `settings.json` (the `// ───────── Vim` block, ~200 lines). | Recoverable from phase-0 commit. |
| 11 | keybindings.json cleanup | Reframe `vim.mode == 'Visual'` → `neovim.mode == 'visual'`. Decide on welcome-screen leader block based on phase-3 testing. Update header comment. | Recoverable from phase-0 commit. |
| 12 | Final cleanup | (a) Uninstall `vscodevim.vim`. (b) Add `cask "visual-studio-code"` to Brewfile. (c) Create `vscode-extensions.txt` and install script. (d) Update `keymap.yml` header comment to note completion. (e) Update `docs/hjkl-navigation.md` for the post-migration architecture. (f) Run `just lua-check`. (g) `nesia add editor "VS Code now uses vscode-neovim — vim keys live in nvim init.lua"`. (h) Commit. | Final state. |

## Keymap migration tables

### Terminal nvim — chord additions/changes

Helper used in `keymaps.lua` for q-prefix git chord set:

```lua
local map = vim.keymap.set
local gs = require("gitsigns")
```

#### LSP (g-prefix) — mostly LazyVim defaults; restored from VSCodeVim's `m`-prefix override

| Chord | Action | Mechanism |
|---|---|---|
| `gd` | Go to definition | LazyVim default (`vim.lsp.buf.definition`) |
| `gD` | Go to declaration | LazyVim default |
| `gr` | Find references | LazyVim default |
| `gI` | Go to implementation | LazyVim default |
| `gy` | Go to type definition | LazyVim default |
| `gh` | Hover docs | Custom (existing in `keymaps.lua:26`) — branch on `vim.g.vscode` to dispatch `editor.action.showHover` |
| `gK` | Signature help | LazyVim default |
| `gJ` | Real join lines (displaced from J) | Custom (existing) |
| `]d` / `[d` | Next / prev diagnostic | LazyVim default |
| `<leader>cr` | Rename (alias) | LazyVim default |
| `<leader>ca` | Code action (alias) | LazyVim default |

#### Git (q-prefix) — new chord set

| Chord | Action | Mechanism |
|---|---|---|
| `qj` / `qk` | Next / prev hunk | gitsigns next_hunk / prev_hunk |
| `qb` | Branch picker | `Snacks.lazygit({args = {"branch"}})` or similar |
| `qw` | Git panel / lazygit float | `Snacks.lazygit()` |
| `qd` | Show diff (file or hunk) | `:DiffviewOpen` (diffview.nvim) |
| `qo` / `qO` | Toggle / expand inline hunks | gitsigns preview_hunk_inline / toggle_signs |
| `qa` / `qA` | Stage range / all | gitsigns stage_hunk + lazygit |
| `qu` / `qU` | Restore range / file | gitsigns reset_hunk + lazygit |
| `qc` | Commit | lazygit |
| `qp` / `qP` | Push / force push | lazygit |
| `qB` | Toggle blame for line | gitsigns toggle_current_line_blame |
| `ql` | Git history / graph | `:DiffviewFileHistory` (diffview.nvim) |
| `qr` | Open / review PR | `:Octo pr list` (octo.nvim) |
| `qn` / `qN` | Next / prev PR diff | `:Octo pr changes next/prev` (octo.nvim) |
| `qy` | Copy GitHub link | `:GitLink` (gitlinker.nvim) |
| `qY` | Open in GitHub web | `:GitLink!` (gitlinker.nvim browse) |

#### Match / surround (m-prefix) — Helix-style

| Chord | Action |
|---|---|
| `mm` | Go to matching bracket (vim's `%`) |
| `mi <obj>` | Select inside text object (uses vim's built-in `i<obj>` under the hood; `<obj>` ∈ `(`, `{`, `[`, `"`, `'`, `p`, `w`, `s`, `f` (treesitter), `c` (treesitter), `a` (treesitter argument)) |
| `ma <obj>` | Select around text object |
| `ms <pair>` | Add surrounding pair (mini.surround) |
| `md <pair>` | Delete surrounding pair (mini.surround) |
| `mr <old> <new>` | Replace surrounding pair (mini.surround) |

#### Toggle / panel (t-prefix)

| Chord | Action | Mechanism |
|---|---|---|
| `te` | File explorer | `Snacks.explorer()` |
| `tg` | Git panel / lazygit | `Snacks.lazygit()` (alias to qw) |
| `tt` | Terminal panel | `Snacks.terminal()` |
| `to` | Outline | `:AerialToggle` (aerial.nvim) |
| `td` | Diagnostics panel | `:Trouble diagnostics toggle` (trouble.nvim) |
| `th` | Inlay hints | `vim.lsp.inlay_hint.enable()` toggle |
| `tc` | Code lens | `vim.lsp.codelens.refresh()` toggle |
| `tw` | Word wrap | `:set wrap!` |
| `tb` | Inline blame | gitsigns toggle_current_line_blame (alias to qB) |
| `tP` | Close all panels | Various close commands |

#### Other

- `r` → `vim.lsp.buf.rename` (replaces vim's `r<char>`; use `cl<char>` for replace-char)
- `V` → vim default (visual-line; was overridden in VSCodeVim/Zed)
- `w` → vim default (word motion; preserved)
- `H` / `L` → `^` / `$` (existing; line ends)
- `J` / `K` / `G` → centered (existing; `<C-d>zz` / `<C-u>zz` / `Gzz`)
- `n` / `N` → centered (existing; `nzz` / `Nzz`)
- `[b` / `]b` → buffer prev / next (LazyVim default)

### VS Code-only chords (`lua/config/vscode_keymaps.lua`)

These dispatch VS Code commands via `vscode.action()`. They have no terminal-nvim equivalent (or differ from terminal-nvim's plugin-backed version).

```lua
-- Helper
local vscode = require("vscode")
local function vsmap(modes, lhs, command, desc)
  vim.keymap.set(modes, lhs, function() vscode.action(command) end, { desc = desc })
end
```

#### Cmdline / palette

- `:` → `workbench.action.showCommands` (overrides terminal nvim's cmdux picker)
- `;` → `:` (ex command — same as terminal nvim)

#### Search (override centered n/N to use VS Code's find widget)

- `/` → `actions.find`
- `?` → `workbench.action.findInFiles`
- `n` → `editor.action.nextMatchFindAction` (overrides centered nzz)
- `N` → `editor.action.previousMatchFindAction`

#### Folding

- `zo`/`za` → `editor.toggleFold`
- `zc` → `editor.fold`
- `zM` → `editor.foldAll`
- `zR` → `editor.unfoldAll`
- `zj`/`zk` → `editor.gotoNextFold`/`editor.gotoPreviousFold`

#### Navigation history

- `[` → `workbench.action.navigateBack`
- `]` → `workbench.action.navigateForward`

#### Refactor

- `<leader>.` → `editor.action.quickFix`

#### Leader: top-level shortcuts

- `<leader>k` → `workbench.action.quickOpen`
- `<leader>l` → `workbench.action.gotoSymbol`
- `<leader>L` → `workbench.action.showAllSymbols`
- `<leader>j` → `workbench.action.tasks.runTask`
- `<leader>o` → `workbench.action.openRecent`
- `<leader>O` → `projectManager.listProjects`
- `<leader>z` → `workbench.action.toggleZenMode`

#### Leader: quickfix (`<leader>q`)

- `<leader>qq` → `editor.action.quickFix`
- `<leader>qi` → addMissingImports + saveAll
- `<leader>qo` → organizeImports + saveAll
- `<leader>qu` → removeUnusedImports + saveAll
- `<leader>qf` → fixAll + saveAll
- `<leader>qr` → `editor.action.refactor`

#### Leader: debug (`<leader>d`)

- `<leader>dd` → `workbench.action.debug.start`
- `<leader>db` → `editor.debug.action.toggleBreakpoint`
- `<leader>dl` → `editor.debug.action.toggleLogpoint`
- `<leader>dc` → `workbench.action.debug.continue`
- `<leader>ds` → `workbench.action.debug.stepOver`
- `<leader>di` → `workbench.action.debug.stepInto`
- `<leader>do` → `workbench.action.debug.stepOut`
- `<leader>dt` → `workbench.action.debug.stop`
- `<leader>dr` → `workbench.action.debug.restart`

#### Leader: search (`<leader>s`)

- `<leader>s` (n) → `workbench.action.findInFiles`
- `<leader>s` (v) → `workbench.action.findInFilesWithSelectedText`
- `<leader>S` → `search.action.openNewEditor`
- `<leader>*` → addSelectionToNextFindMatch + findInFiles
- `<leader>sr` → `workbench.action.replaceInFiles`

#### Visual scroll (J/K with selection)

- `J` (v) → `editorScroll halfPage down select=true`
- `K` (v) → `editorScroll halfPage up select=true`

#### Git (q-prefix VS Code-only — extension-driven, terminal nvim has plugin-backed equivalents)

- `qf` → `git.fetch` *(no terminal nvim chord; reachable via lazygit)*
- `qs` → `git.stash` *(no terminal nvim chord; reachable via lazygit)*
- `qS` → `git.stashPop`
- `ql` → `git-graph.view` *(terminal nvim uses diffview.nvim for same intent)*
- `qy` → `extension.copyGitHubLinkToClipboard` *(terminal nvim uses gitlinker.nvim)*
- `qY` → `extension.openInGitHub`
- `qr` → `extension.openPrGitProvider` *(terminal nvim uses octo.nvim)*
- `qn` → `pr.goToNextDiffInPr`
- `qN` → `pr.goToPreviousDiffInPr`

#### Toggle/panel (t-prefix VS Code-only — chrome dispatches)

- `te` → `workbench.files.action.focusFilesExplorer`
- `tg` → `workbench.view.scm`
- `tt` → `workbench.action.terminal.focus`
- `to` → `outline.focus`
- `td` → `workbench.panel.markers.view.focus`
- `tP` → `workbench.action.closePanel`
- `th` → `editor.action.toggleInlayHints`
- `tc` → `jason.toggleCodeLens`
- `tw` → `editor.action.toggleWordWrap`

#### Config (`,`-prefix)

- `,,` → `workbench.action.openSettings`
- `,k` → `workbench.action.openGlobalKeybindings`
- `,K` → `workbench.action.openDefaultKeybindingsFile`
- `,s` → `workbench.action.openSnippets`
- `,t` → `workbench.action.tasks.openUserTasks`
- `,space` → `editor.action.toggleWordWrap`
- `,R` → `workbench.action.reloadWindow`
- `,r` → `typescript.restartTsServer`

### Zed config edits — summary

See full chord state in `keymap.yml`. Mechanical edits to `home/.config/zed/keymap.json`:

1. **Delete** the entire git context block (currently lines ~327–351 with `g`-prefix bindings).
2. **Insert** new q-prefix git block with: `qj`/`qk` (hunks via SendKeystrokes with helper renames), `qb` (git::Switch), `qw` (git_panel::ToggleFocus), `qd` (git::Diff), `qo`/`qO` (hunk visibility), `qa`/`qA` (stage), `qu`/`qU` (restore), `qc` (commit), `qp`/`qP` (push). `qB` blame if Zed supports.
3. **Restore** g-prefix LSP bindings: `gd` (editor::GoToDefinition), `gr` (editor::FindAllReferences), `gI` (editor::GoToImplementation), `gy` (editor::GoToTypeDefinition), `gD` (editor::GoToDeclaration), `gh` (editor::Hover) — verify each Zed action name.
4. **Remove** Zed's `w` → match-bracket binding. `w` reverts to default vim word motion.
5. **Remove** Zed's `V` → SelectEnclosingSymbol binding. `V` reverts to default visual-line.
6. **Add** `r` → editor::Rename binding.
7. **Add** `mm` → vim::Matching binding (Helix-style match-bracket).
8. **Add** `t*` toggle/panel chord set: `te`, `tg`, `tt`, `to`, `td`, `th`, `tc`, `tw`, `tb`, `tP`. Each maps to the existing `<spc>p*`/`<spc>t*` Zed action.
9. **Remove** `<spc>p*` panel chord block (replaced by `t*`).
10. **Remove** `<spc>t*` toggle chord block (replaced by `t*`).
11. **Add** centering via SendKeystrokes on `J`/`K`/`G` (mirror existing `n`/`N` pattern).
12. **Fix** typo at line 334: `g k` dispatches `fn-_gj1 g Z`; should dispatch `fn-_qk1 q Z` (after q-prefix migration).
13. **Fix** shadowing bug: line 428 binds `u` → `vim::MoveToPrevious`; line 510 shadows with `u` → `vim::Undo`. Remove line 428 binding (Undo is intended).
14. **Add** `[b` / `]b` for buffer prev/next if Zed supports (else document gap).

## Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| vscode-neovim's nvim binary discovery fails on this Mac | Low | High (extension won't load) | Set `vscode-neovim.neovimExecutablePaths.darwin = "/opt/homebrew/bin/nvim"` explicitly in `settings.json`. |
| which-key float window renders poorly inside VS Code | Medium | Low (functional, looks bolted on) | Acceptable as-is; can theme via `which-key` opts after migration. |
| Welcome-screen leader chords stop firing | Medium | Medium (lose welcome quick-open) | Phase-3 validation; if broken, keep `!editorIsOpen` block in `keybindings.json`. |
| LSP keymaps no-op silently because lspconfig is auto-disabled | High | Low (caught immediately) | Branch all `vim.lsp.buf.*` calls in `keymaps.lua` to dispatch VS Code commands. |
| Multi-cursor (alt+click) leaves nvim and VS Code out of sync | Low | Low | vscode-neovim has known multi-cursor bridging via `gb`/`<C-n>` (note: `gb` collides with q-prefix branch picker — verify). |
| New plugins (aerial/trouble/diffview/octo/gitlinker) introduce conflicts | Low | Medium | Each gated `if not vim.g.vscode then`; conflict surface is terminal-nvim only. |
| octo.nvim requires `gh` CLI auth | Medium | Medium (PR chords no-op without auth) | Document as setup prerequisite; chord still safe (just shows error). |
| mini.surround reconfiguration breaks existing surround muscle memory (`ys`/`ds`/`cs`) | High | Medium (daily ops change chord) | Document; provide fallback by leaving vim's default surround mappings as aliases for first weeks. |
| Zed config edits introduce typos breaking other keybindings | Medium | Medium | Validate after edit by manually testing each major chord family. |
| `q` binding for git breaks anyone (including Claude in agent mode) trying to record macros | Low | Low | User confirmed no macro use; document as removed feature. |
| Settings Sync remnants on other machines pull old config back | Medium | Medium | Disable Sync everywhere (must be done per-machine) before merging dotfiles updates. |

## Validation criteria

After phase 12, all of these must pass:

### Editor mode keystrokes (vim primitives)

1. Open any file. Confirm: `j/k/h/l` move; `dw` deletes word (not match-bracket — Decision #3); `yip` yanks paragraph; `<C-r>` and `U` redo; `kj` exits insert; macros (`qa…q` then `@a`) — *intentionally broken* per Decision #14 (q is git prefix; user does not record macros).
2. Visual primitives: `V` enters visual-line (Decision #4); `vif` selects function body via treesitter; `vi(`/`va{` work via vim built-in.
3. Replace-char: `r<char>` *intentionally broken* per Decision #5 — `r` opens rename. Use `cl<char>` for replace-char.

### which-key (the headline feature)

4. Press `<space>` and wait 250ms. Popup shows `j`, `k`, `l`, `o`, `q`, `d`, `s`, `,`, `.`, `z`, etc. with descriptions.
5. Press `g` and wait. Popup shows `d` (definition), `r` (references), `I` (implementation), `y` (type), `D` (declaration), `h` (hover), `J` (join).
6. Press `q` and wait. Popup shows `j`, `k`, `b`, `w`, `d`, `o`, `O`, `a`, `A`, `u`, `U`, `c`, `p`, `P`, `B`, `l`, `r`, `n`, `N`, `y`, `Y`.
7. Press `m` and wait. Popup shows `m` (match), `i` (inside text-object), `a` (around text-object), `s`/`d`/`r` (surround).
8. Press `t` and wait. Popup shows `e`, `g`, `t`, `o`, `d`, `h`, `c`, `w`, `b`, `P`.
9. Press `d` (operator). Popup shows valid motions (`w`, `$`, `iw`, `ap`, etc.). **This is the unique value the migration delivers.**

### VS Code chrome

10. File tree j/k navigation, ctrl+hjkl pane focus, cmd+h/j panel toggles, terminal exit via ctrl+', explorer dig-in/out via Enter — all unchanged.

### LSP integration

11. `gh` shows VS Code hover panel. `gd` jumps to definition. `gr` shows references panel. `<leader>cr` opens rename input (or `r` directly per Decision #5). Saving formats (dprint runs).

### Git workflow

12. `qj`/`qk` navigate hunks. `qa` stages selected range. `qp` pushes. `qw` opens lazygit / SCM panel. `qd` opens diff. `ql` opens history (terminal nvim: diffview; VS Code: git-graph ext).

### Toggle/panel

13. `te` toggles file explorer. `td` opens diagnostics panel. `to` opens outline. `tw` toggles word wrap.

### Terminal nvim unchanged in essence

14. Open terminal. Run `nvim`. Confirm full LazyVim experience: snacks dashboard, blink-cmp completion, mini.statusline, all custom keymaps, cmdux on `:`. Plus new plugins: aerial, trouble, diffview, octo, gitlinker all functional.

### Zed parity

15. Press `g d` in Zed → goto definition. Press `q p` in Zed → push. Press `t e` in Zed → file explorer. Press `m m` in Zed → matching bracket.
16. `J`/`K`/`G` in Zed center the cursor (via SendKeystrokes).
17. `g k` in Zed correctly goes to **previous** hunk (typo fix).
18. `u` in Zed undoes (no longer shadowed by MoveToPrevious).

### Toolchain

19. `just lua-check` passes: lua-lint, lua-lsp-check, lua-fmt-check all green.
20. `code --list-extensions` includes `asvetliakov.vscode-neovim` and excludes `vscodevim.vim`.
21. Brewfile includes `cask "visual-studio-code"`.
22. `scripts/data/vscode-extensions.txt` exists and is sorted.

## Rollback plan

| Phase to roll back to | How |
|---|---|
| Phase 7-9 keymap problems | `git restore lua/config/keymaps.lua lua/config/vscode_keymaps.lua home/.config/zed/keymap.json` |
| Phase 5 plugin add problems | Delete the new plugin spec files; `:Lazy clean`. |
| Phase 4 plugin gating problems | `git restore lua/plugins/<file>.lua` |
| Phase 3 import problems | Remove `{ import = "lazyvim.plugins.extras.vscode" }` from `lazy.lua`. |
| Phase 2 extension problems | Re-enable `vscodevim.vim` in VS Code, disable `asvetliakov.vscode-neovim`. |
| Phase 1 Settings Sync problems | Re-enable Settings Sync; restore VS Code dir from backup. |
| Total rollback to pre-migration | `git restore` everything + revert Settings Sync to phase-0 state. |

The phase-0 commit is the canonical recovery point.

## Implementation notes

- **Extension manifest:** `scripts/data/vscode-extensions.txt` is the canonical source. Output of `code --list-extensions | sort` post-migration populates it.
- **Installer script:** `scripts/setup/after/install-vscode-extensions` reads the manifest and runs `code --install-extension <id> --force` per line. Uses argc per `home/.claude/rules/cli.md`.
- **Justfile recipes:** `vscode-extensions-sync` runs the installer; `vscode-extensions-export` runs `code --list-extensions | sort > scripts/data/vscode-extensions.txt`.
- **Brewfile entry:** `cask "visual-studio-code"` next to `cask "zed"`.
- **`nesia add editor "VS Code now uses vscode-neovim — vim keys live in nvim init.lua. Chord architecture: g LSP, q git, m match/surround, t toggle, , config"`** — log capability change per project rules.
- **Helix lens:** Many chord decisions were validated by reference to Helix's design (g for goto/LSP, m for match/surround, w preserved as word motion). The 5-prefix architecture is roughly Helix-aligned for the editor-vim layer.
- **Zed config bug fixes:** Two pre-existing bugs found during audit are folded into this migration (gk typo, u shadowing). Not strictly migration scope but cheaper to fix in the same pass than separately.
