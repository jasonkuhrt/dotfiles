# vscode-neovim Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace VSCodeVim with vscode-neovim, adopt a 5-prefix chord architecture (g/q/m/t/,) across nvim+VS Code+Zed, and move VS Code config from Settings Sync into the dotfiles repo.

**Architecture:** vscode-neovim embeds a real nvim binary in VS Code, executing the user's nvim init.lua with `vim.g.vscode = true` set. Terminal nvim, VS Code (post-migration), and Zed are aligned on the same chord scheme via three coordinated config sources: nvim's `keymaps.lua` + new `vscode_keymaps.lua` + Zed's `keymap.json`. The chord architecture: g=LSP, q=git, m=match/surround (Helix-style), t=toggle/panel, ,=config.

**Tech Stack:** Neovim + LazyVim, vscode-neovim extension, Zed, snacks.nvim, gitsigns, mini.surround, plus 5 new plugins (aerial.nvim, trouble.nvim, diffview.nvim, octo.nvim, gitlinker.nvim).

**Reference docs:**
- Spec: `docs/superpowers/specs/2026-04-29-vscode-neovim-migration-design.md`
- Canonical chord set: `keymap.yml` (repo root)
- User git rules: `home/.claude/rules/git-commits.md` (commits include `Session-Id` trailer)
- Project rules: `.claude/CLAUDE.md` (workflows via `justfile`, run `just lua-check` for Lua changes, `nesia add` for user-facing capability changes)
- Permission gates: `CLAUDE.local.md` (git checkout/switch/stash blocked; commits and pushes allowed)

**Commit style:** Plain conventional commits (no `feat:`/`fix:` prefixes per user memory). Include `Session-Id: <id>` trailer where `<id>` is the current Claude Code session ID (visible in `claude --resume` URL).

---

## Task 1: Baseline snapshot

**Files:**
- No file changes; this task creates a known recovery point.

- [ ] **Step 1: Verify working tree is clean**

Run:
```bash
git -C /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles status
```
Expected: any uncommitted state must be either committed or stashed *before* this plan runs. If unclean, halt and surface to user — do not proceed without a clean baseline.

- [ ] **Step 2: Note current Claude session ID**

Run:
```bash
echo "Current session ID for commit trailers: <insert from claude --resume URL>"
```
Capture the ID and use it in every commit's `Session-Id:` trailer throughout this plan.

- [ ] **Step 3: Commit a baseline marker**

Run:
```bash
git -C /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles commit --allow-empty -m "$(cat <<'EOF'
chore: baseline before vscode-neovim migration

Snapshot point for the migration described in
docs/superpowers/specs/2026-04-29-vscode-neovim-migration-design.md.
Rollback target if any phase fails.

Session-Id: <session-id>
EOF
)"
```
Expected: commit created on current branch.

---

## Task 2: Move VS Code config from Settings Sync to dotfiles

**Files:**
- Create: `home/Library/Application Support/Code/User/.gitignore`
- Move (existing → dotfiles): `~/Library/Application Support/Code/User/{settings.json,keybindings.json,snippets/}` → `home/Library/Application Support/Code/User/...`
- Symlink back to live VS Code dir.

- [ ] **Step 1: Disable VS Code Settings Sync (manual)**

In VS Code: Cmd+Shift+P → "Settings Sync: Turn Off" → choose **Keep local data**.

Expected: status bar no longer shows sync icon. **Do this on every machine that syncs this account before merging the migration commit, otherwise a different machine will push the old config back.**

- [ ] **Step 2: Create destination directory in dotfiles**

Run:
```bash
mkdir -p "/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/Library/Application Support/Code/User"
```
Expected: directory exists.

- [ ] **Step 3: Create .gitignore for runtime state**

Create `/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/Library/Application Support/Code/User/.gitignore`:
```
/globalStorage/
/workspaceStorage/
/History/
/sync/
/chatLanguageModels.json
/mcp.json
*.workbench-cycler-backup-*
```

- [ ] **Step 4: Move files from VS Code dir into dotfiles**

Run:
```bash
mv "/Users/jasonkuhrt/Library/Application Support/Code/User/settings.json" \
   "/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/Library/Application Support/Code/User/settings.json"

mv "/Users/jasonkuhrt/Library/Application Support/Code/User/keybindings.json" \
   "/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/Library/Application Support/Code/User/keybindings.json"

mv "/Users/jasonkuhrt/Library/Application Support/Code/User/snippets" \
   "/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/Library/Application Support/Code/User/snippets"
```
Expected: files no longer in VS Code dir.

- [ ] **Step 5: Symlink files back to VS Code dir**

Run:
```bash
ln -s "/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/Library/Application Support/Code/User/settings.json" \
      "/Users/jasonkuhrt/Library/Application Support/Code/User/settings.json"

ln -s "/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/Library/Application Support/Code/User/keybindings.json" \
      "/Users/jasonkuhrt/Library/Application Support/Code/User/keybindings.json"

ln -s "/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/Library/Application Support/Code/User/snippets" \
      "/Users/jasonkuhrt/Library/Application Support/Code/User/snippets"
```
Expected: symlinks resolve to dotfiles paths.

- [ ] **Step 6: Verify VS Code loads from symlinks**

Open VS Code. Cmd+, opens settings UI; cmd+K cmd+S opens keybindings. Both should show existing content unchanged.

Expected: VS Code reads the files transparently through the symlinks.

- [ ] **Step 7: Stage and commit**

```bash
cd /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles
git add "home/Library/Application Support/Code/User"
git commit -m "$(cat <<'EOF'
move VS Code config from Settings Sync to dotfiles

Disabled VS Code Settings Sync. Tracked settings.json,
keybindings.json, and snippets/ in dotfiles via symlinks.
.gitignore excludes runtime state (globalStorage, History, sync, etc.).

Session-Id: <session-id>
EOF
)"
```

---

## Task 3: Activate vscode-neovim

**Files:**
- Modify: `/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/nvim/lua/config/lazy.lua`

- [ ] **Step 1: Install vscode-neovim extension**

Run:
```bash
code --install-extension asvetliakov.vscode-neovim
```
Expected: "Extension 'asvetliakov.vscode-neovim' v<X> was successfully installed."

- [ ] **Step 2: Disable VSCodeVim (manual, via VS Code UI)**

VS Code → Extensions → search "Vim" (vscodevim.vim) → click gear → **Disable**. Do NOT uninstall yet (Task 13 handles uninstall after validation).

Expected: Extensions list shows VSCodeVim as disabled.

- [ ] **Step 3: Add LazyVim vscode extras import to lazy.lua**

Read current `lazy.lua`:
```bash
cat /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/nvim/lua/config/lazy.lua
```

Find the `spec = { ... }` table (LazyVim's plugin spec list), and add as the first import line:
```lua
{ import = "lazyvim.plugins.extras.vscode" },
```

Expected: the line appears in the spec list. Verify with:
```bash
grep -n "extras.vscode" /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/nvim/lua/config/lazy.lua
```

- [ ] **Step 4: Set explicit nvim binary path in VS Code settings**

Open `/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/Library/Application Support/Code/User/settings.json` and add (anywhere in the top-level object):
```json
"vscode-neovim.neovimExecutablePaths.darwin": "/opt/homebrew/bin/nvim",
```

Expected: setting saved; vscode-neovim will use the homebrew nvim.

- [ ] **Step 5: Reload VS Code window**

In VS Code: Cmd+Shift+P → "Developer: Reload Window".

Expected: nvim binary loads. Status bar shows nvim mode indicator (NORMAL/INSERT/etc).

- [ ] **Step 6: Verify vscode-neovim is active**

Open any text file in VS Code. Type `i` to enter insert mode, type some text, press `kj` to escape, type `dd` to delete the line.

Expected: vim modes work correctly. The line is deleted.

- [ ] **Step 7: Commit**

```bash
cd /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles
git add home/.config/nvim/lua/config/lazy.lua "home/Library/Application Support/Code/User/settings.json"
git commit -m "$(cat <<'EOF'
activate vscode-neovim, disable VSCodeVim

Added LazyVim's vscode extras import which whitelists the
plugin set that should run inside VS Code (LazyVim core,
mini.*, leap, flash, snacks core, treesitter, yanky, dial).
Set explicit nvim binary path. VSCodeVim is disabled (not
yet uninstalled — that happens after validation).

Session-Id: <session-id>
EOF
)"
```

---

## Task 4: Verify automatic plugin gating

**Files:** No edits — verification only.

- [ ] **Step 1: In VS Code, run :Lazy**

Press `:` (which now opens the command palette in VS Code mode) — *actually*, since the new chord scheme isn't yet wired in, press `:` and use the cmdline. Type `Lazy` and Enter.

Expected: lazy.nvim UI opens.

- [ ] **Step 2: Verify these plugins show as disabled (cond=false) in :Lazy**

Inspect each entry — disabled plugins are dimmed:
- `blink.cmp`
- `lualine.nvim` (if present)
- `mini.statusline`
- `nvim-lspconfig`
- `conform.nvim`
- `mason.nvim`
- `mason-lspconfig.nvim`
- `lazydev.nvim`
- `nvim-treesitter` (treesitter ITSELF is whitelisted, but its highlighting/parsers may be disabled)

Expected: all listed are dimmed/disabled.

- [ ] **Step 3: Verify these plugins ARE loaded**

- `LazyVim` (core)
- `dial.nvim`
- `flash.nvim`
- `flit.nvim`
- `leap.nvim`
- `mini.ai`, `mini.comment`, `mini.move`, `mini.pairs`, `mini.surround`
- `nvim-treesitter` (parser engine, highlighting may be off)
- `snacks.nvim`
- `ts-comments.nvim`
- `vim-repeat`
- `yanky.nvim`

Expected: all listed are active (not dimmed).

- [ ] **Step 4: No commit**

Verification only. If any plugin is in the wrong state, halt and investigate before continuing.

---

## Task 5: Manual plugin gating

**Files:**
- Modify: `home/.config/nvim/lua/plugins/cmdux.lua`
- Modify: `home/.config/nvim/lua/plugins/cmux-nav.lua`
- Modify: `home/.config/nvim/lua/plugins/link-open.lua`
- Modify: `home/.config/nvim/lua/plugins/file-ops.lua`
- Modify: `home/.config/nvim/lua/plugins/unnest.lua`
- Modify: `home/.config/nvim/lua/plugins/snacks.lua`
- Modify: `home/.config/nvim/lua/config/autocmds.lua`

- [ ] **Step 1: Gate cmdux.lua**

Read `home/.config/nvim/lua/plugins/cmdux.lua`. Add as the **first line of the returned table function** (after any local declarations):

```lua
if vim.g.vscode then return {} end
```

Place it so it short-circuits the spec return when running under VS Code. Verify the plugin's `return { ... }` still executes in terminal nvim.

- [ ] **Step 2: Gate cmux-nav.lua**

Same pattern as Step 1, applied to `home/.config/nvim/lua/plugins/cmux-nav.lua`.

- [ ] **Step 3: Gate link-open.lua**

Same pattern, applied to `home/.config/nvim/lua/plugins/link-open.lua`.

- [ ] **Step 4: Gate file-ops.lua**

Same pattern, applied to `home/.config/nvim/lua/plugins/file-ops.lua`.

- [ ] **Step 5: Gate unnest.lua**

Same pattern, applied to `home/.config/nvim/lua/plugins/unnest.lua`.

- [ ] **Step 6: Wrap snacks.lua custom opts**

Read `home/.config/nvim/lua/plugins/snacks.lua`. Find the `opts = { ... }` block (custom dashboard/picker config). Wrap the entire `opts` field so that under VS Code, snacks loads with LazyVim defaults instead of custom opts:

Before:
```lua
return {
  "folke/snacks.nvim",
  opts = {
    -- custom dashboard, picker, etc.
  },
}
```

After:
```lua
return {
  "folke/snacks.nvim",
  opts = vim.g.vscode and {} or {
    -- custom dashboard, picker, etc. (unchanged content)
  },
}
```

Expected: snacks loads in both terminal nvim (with custom opts) and VS Code (with empty/default opts).

- [ ] **Step 7: Gate TermOpen autocmd**

Read `home/.config/nvim/lua/config/autocmds.lua`. Find the `TermOpen` autocmd block. Wrap it:

```lua
if not vim.g.vscode then
  vim.api.nvim_create_autocmd("TermOpen", {
    -- existing pattern, callback, etc.
  })
end
```

Expected: TermOpen only registers in terminal nvim.

- [ ] **Step 8: Reload VS Code and verify gated plugins are inactive**

In VS Code: Cmd+Shift+P → "Developer: Reload Window". Then `:Lazy`.

Expected: the gated plugins (cmdux, cmux-nav, link-open, file-ops, unnest) show no spec — `:Lazy` shouldn't list them, since their spec returned `{}`.

- [ ] **Step 9: Verify terminal nvim still loads them**

Open a terminal pane outside VS Code. Run `nvim`. In nvim, run `:Lazy`. The gated plugins should be present and active.

Expected: terminal nvim experience is unchanged.

- [ ] **Step 10: Run lua-check**

```bash
cd /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles
just lua-check
```
Expected: green.

- [ ] **Step 11: Commit**

```bash
git add home/.config/nvim/lua/plugins/cmdux.lua \
        home/.config/nvim/lua/plugins/cmux-nav.lua \
        home/.config/nvim/lua/plugins/link-open.lua \
        home/.config/nvim/lua/plugins/file-ops.lua \
        home/.config/nvim/lua/plugins/unnest.lua \
        home/.config/nvim/lua/plugins/snacks.lua \
        home/.config/nvim/lua/config/autocmds.lua

git commit -m "$(cat <<'EOF'
gate custom plugins for VS Code mode

Plugins not in LazyVim's vscode extras whitelist need explicit
gating. cmdux/cmux-nav/link-open/file-ops/unnest return empty
specs under vim.g.vscode. snacks loads with default opts in
VS Code. TermOpen autocmd only registers in terminal nvim.

Session-Id: <session-id>
EOF
)"
```

---

## Task 6: Add new nvim plugins (aerial, trouble, diffview, octo, gitlinker)

**Files:**
- Create: `home/.config/nvim/lua/plugins/aerial.lua`
- Create: `home/.config/nvim/lua/plugins/trouble.lua`
- Create: `home/.config/nvim/lua/plugins/diffview.lua`
- Create: `home/.config/nvim/lua/plugins/octo.lua`
- Create: `home/.config/nvim/lua/plugins/gitlinker.lua`

- [ ] **Step 1: Create aerial.lua**

Create `home/.config/nvim/lua/plugins/aerial.lua`:
```lua
if vim.g.vscode then return {} end

return {
  "stevearc/aerial.nvim",
  opts = {},
  dependencies = {
    "nvim-treesitter/nvim-treesitter",
    "nvim-tree/nvim-web-devicons",
  },
  cmd = { "AerialToggle", "AerialOpen", "AerialClose" },
  -- Chord wired in keymaps.lua at task 8 (`to`).
}
```

- [ ] **Step 2: Create trouble.lua**

Create `home/.config/nvim/lua/plugins/trouble.lua`:
```lua
if vim.g.vscode then return {} end

return {
  "folke/trouble.nvim",
  opts = {},
  cmd = "Trouble",
  -- Chord wired in keymaps.lua at task 8 (`td`).
}
```

- [ ] **Step 3: Create diffview.lua**

Create `home/.config/nvim/lua/plugins/diffview.lua`:
```lua
if vim.g.vscode then return {} end

return {
  "sindrets/diffview.nvim",
  cmd = { "DiffviewOpen", "DiffviewClose", "DiffviewFileHistory", "DiffviewFocusFiles" },
  -- Chords wired in keymaps.lua at task 8 (`qd` open, `ql` history).
}
```

- [ ] **Step 4: Create octo.lua**

Create `home/.config/nvim/lua/plugins/octo.lua`:
```lua
if vim.g.vscode then return {} end

return {
  "pwntester/octo.nvim",
  dependencies = {
    "nvim-lua/plenary.nvim",
    "nvim-telescope/telescope.nvim",
    "nvim-tree/nvim-web-devicons",
  },
  config = function()
    require("octo").setup()
  end,
  cmd = "Octo",
  -- Chords wired in keymaps.lua at task 8 (`qr`, `qn`, `qN`).
  -- Requires `gh` CLI authenticated (gh auth login).
}
```

- [ ] **Step 5: Create gitlinker.lua**

Create `home/.config/nvim/lua/plugins/gitlinker.lua`:
```lua
if vim.g.vscode then return {} end

return {
  "linrongbin16/gitlinker.nvim",
  cmd = "GitLink",
  config = function()
    require("gitlinker").setup()
  end,
  -- Chords wired in keymaps.lua at task 8 (`qy` copy, `qY` browse).
}
```

- [ ] **Step 6: Sync lazy.nvim**

In terminal nvim:
```vim
:Lazy sync
```
Expected: all 5 new plugins install successfully. `:Lazy` shows them as loaded.

- [ ] **Step 7: Smoke-test each plugin**

In terminal nvim with a real file open:
- `:AerialToggle` — outline panel opens.
- `:Trouble diagnostics toggle` — diagnostics panel opens.
- `:DiffviewOpen` — diff view opens (in a git repo).
- `:Octo pr list` — requires `gh auth login`; if unauthed, returns clear error (acceptable).
- `:GitLink` — copies a GitHub link to clipboard (in a git repo with remote).

Expected: each command runs without error (octo may need gh auth — surface that as a setup step, not a failure).

- [ ] **Step 8: Verify VS Code does not load them**

In VS Code: `:Lazy`. None of aerial/trouble/diffview/octo/gitlinker should be listed (their specs returned `{}`).

Expected: only LazyVim whitelisted plugins active.

- [ ] **Step 9: Run lua-check**

```bash
cd /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles
just lua-check
```
Expected: green.

- [ ] **Step 10: Commit**

```bash
git add home/.config/nvim/lua/plugins/aerial.lua \
        home/.config/nvim/lua/plugins/trouble.lua \
        home/.config/nvim/lua/plugins/diffview.lua \
        home/.config/nvim/lua/plugins/octo.lua \
        home/.config/nvim/lua/plugins/gitlinker.lua \
        home/.config/nvim/lazy-lock.json

git commit -m "$(cat <<'EOF'
add aerial/trouble/diffview/octo/gitlinker plugins

Five plugins added to terminal nvim, all gated `if vim.g.vscode
then return {} end` so VS Code uses native panels instead.
Wires for the new t-prefix toggle/panel chord set (te/tg/tt/to/td)
and q-prefix git extensions (qd/ql/qr/qn/qN/qy/qY) in next task.

octo.nvim requires authenticated gh CLI (gh auth login).

Session-Id: <session-id>
EOF
)"
```

---

## Task 7: Reconfigure mini.surround for m-prefix

**Files:**
- Modify or create: `home/.config/nvim/lua/plugins/mini-surround.lua` (LazyVim ships mini.surround as part of mini.* whitelist; check if already configured locally)

- [ ] **Step 1: Locate mini.surround config**

```bash
grep -rn "mini.surround" /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/nvim/lua/ 2>/dev/null
```

If a local override file already exists, modify it. If not, create `home/.config/nvim/lua/plugins/mini-surround.lua`.

- [ ] **Step 2: Write/update mini.surround config to use m-prefix**

Either modify the existing override or create:
```lua
return {
  "echasnovski/mini.surround",
  opts = {
    mappings = {
      add = "ms",          -- Add surrounding (was: sa)
      delete = "md",       -- Delete surrounding (was: sd)
      find = "mf",         -- Find surrounding (right) (was: sf)
      find_left = "mF",    -- Find surrounding (left) (was: sF)
      highlight = "mh",    -- Highlight surrounding (was: sh)
      replace = "mr",      -- Replace surrounding (was: sr)
      update_n_lines = "mn", -- Update `n_lines` (was: sn)
    },
  },
}
```

- [ ] **Step 3: Reload nvim and test**

In terminal nvim, on a line with `"hello"`:
- Position cursor on `hello`. Press `md"` — quotes removed.
- Press `ms"` then visual-select `hello`, confirm — quotes added.
- Press `mr"'` — quotes replaced with single quotes.

Expected: each chord works. (m-prefix collides with vim's mark-set, which is acceptable per Decision #2 — user does not use marks.)

- [ ] **Step 4: Run lua-check**

```bash
cd /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles
just lua-check
```
Expected: green.

- [ ] **Step 5: Commit**

```bash
git add home/.config/nvim/lua/plugins/mini-surround.lua
git commit -m "$(cat <<'EOF'
reconfigure mini.surround for m-prefix

Helix-style m-prefix for surround operations:
ms add, md delete, mr replace, mf/mF find, mh highlight.
Aligns with the new prefix architecture (g LSP, q git,
m match/surround, t toggle, , config).

Session-Id: <session-id>
EOF
)"
```

---

## Task 8: Keymap migration — terminal nvim

**Files:**
- Modify: `home/.config/nvim/lua/config/keymaps.lua`

This is the largest single edit. Adds the q-prefix git chord set, m-prefix `mm`, t-prefix toggle/panel chord set, and `r` rename. Branches LSP-related calls on `vim.g.vscode`.

- [ ] **Step 1: Read current keymaps.lua**

```bash
cat /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/nvim/lua/config/keymaps.lua
```
Note current contents — every existing chord stays unless explicitly changed.

- [ ] **Step 2: Add q-prefix git chord set**

Append to `keymaps.lua` (before the terminal-mode block at the bottom):

```lua
-- ──────────────────────────────────────────────────────────────────────────
-- GIT (q-prefix) — replaces vim's macro recording on q (user does not record)
-- ──────────────────────────────────────────────────────────────────────────

local function gitsigns_action(action)
  return function() require("gitsigns")[action]() end
end

local function snacks_lazygit(args)
  return function() require("snacks").lazygit(args or {}) end
end

-- Hunk navigation
map("n", "qj", gitsigns_action("next_hunk"), { desc = "Next git hunk" })
map("n", "qk", gitsigns_action("prev_hunk"), { desc = "Prev git hunk" })

-- Git panel / lazygit
map("n", "qw", snacks_lazygit(), { desc = "Git panel (lazygit)" })

-- Diff and history
map("n", "qd", "<cmd>DiffviewOpen<cr>", { desc = "Git diff" })
map("n", "ql", "<cmd>DiffviewFileHistory %<cr>", { desc = "Git history (file)" })

-- Hunk visibility
map("n", "qo", gitsigns_action("preview_hunk_inline"), { desc = "Toggle inline hunk" })
map("n", "qO", gitsigns_action("toggle_signs"), { desc = "Toggle git signs" })

-- Stage / restore
map({ "n", "v" }, "qa", gitsigns_action("stage_hunk"), { desc = "Stage hunk" })
map({ "n", "v" }, "qu", gitsigns_action("reset_hunk"), { desc = "Restore hunk" })
map("n", "qA", snacks_lazygit(), { desc = "Stage all (via lazygit)" })
map("n", "qU", snacks_lazygit(), { desc = "Restore file (via lazygit)" })

-- Branch / commit / push (via lazygit)
map("n", "qb", snacks_lazygit(), { desc = "Branch picker (lazygit)" })
map("n", "qc", snacks_lazygit(), { desc = "Commit (lazygit)" })
map("n", "qp", snacks_lazygit(), { desc = "Push (lazygit)" })
map("n", "qP", snacks_lazygit(), { desc = "Force push (lazygit)" })

-- Blame
map("n", "qB", gitsigns_action("toggle_current_line_blame"), { desc = "Toggle line blame" })

-- PR review (octo)
map("n", "qr", "<cmd>Octo pr list<cr>", { desc = "Open PR list" })
map("n", "qn", "<cmd>Octo pr changes next<cr>", { desc = "Next PR diff" })
map("n", "qN", "<cmd>Octo pr changes prev<cr>", { desc = "Prev PR diff" })

-- GitHub links
map({ "n", "v" }, "qy", "<cmd>GitLink<cr>", { desc = "Copy GitHub link" })
map({ "n", "v" }, "qY", "<cmd>GitLink!<cr>", { desc = "Open in GitHub web" })
```

- [ ] **Step 3: Add m-prefix match chord (mm for match-bracket)**

Append to `keymaps.lua`:

```lua
-- ──────────────────────────────────────────────────────────────────────────
-- MATCH (m-prefix) — Helix-style; surround on m-prefix via mini.surround
-- ──────────────────────────────────────────────────────────────────────────

map({ "n", "v" }, "mm", "%", { desc = "Match bracket" })
```

(Note: `mi<obj>`/`ma<obj>` chord menus rely on vim's built-in `i<obj>`/`a<obj>` text objects. They work without explicit binding because `m` is a chord prefix in which-key once `mm`, `ms*`, `md*`, `mr*` are defined. mini.surround handles `ms`/`md`/`mr`. The `mi`/`ma` chord menu is implicit.)

- [ ] **Step 4: Add t-prefix toggle/panel chord set**

Append to `keymaps.lua`:

```lua
-- ──────────────────────────────────────────────────────────────────────────
-- TOGGLE / PANELS (t-prefix) — replaces <leader>p* and <leader>t*
-- ──────────────────────────────────────────────────────────────────────────

map("n", "te", function() require("snacks").explorer() end, { desc = "Toggle file explorer" })
map("n", "tg", snacks_lazygit(), { desc = "Toggle git panel (lazygit)" })
map("n", "tt", function() require("snacks").terminal() end, { desc = "Toggle terminal" })
map("n", "to", "<cmd>AerialToggle<cr>", { desc = "Toggle outline" })
map("n", "td", "<cmd>Trouble diagnostics toggle<cr>", { desc = "Toggle diagnostics" })

map("n", "th", function()
  vim.lsp.inlay_hint.enable(not vim.lsp.inlay_hint.is_enabled())
end, { desc = "Toggle inlay hints" })

map("n", "tc", function() vim.lsp.codelens.refresh() end, { desc = "Refresh code lens" })

map("n", "tw", function()
  vim.opt.wrap = not vim.opt.wrap:get()
end, { desc = "Toggle word wrap" })

map("n", "tb", gitsigns_action("toggle_current_line_blame"), { desc = "Toggle line blame" })

map("n", "tP", "<cmd>TroubleClose<cr><cmd>AerialClose<cr>", { desc = "Close panels" })
```

- [ ] **Step 5: Add r → rename (with VS Code branching)**

Append to `keymaps.lua`:

```lua
-- ──────────────────────────────────────────────────────────────────────────
-- RENAME — r replaces vim's r<char> primitive (use cl<char> for replace-char)
-- ──────────────────────────────────────────────────────────────────────────

map("n", "r", function()
  if vim.g.vscode then
    require("vscode").action("editor.action.rename")
  else
    vim.lsp.buf.rename()
  end
end, { desc = "Rename symbol" })
```

- [ ] **Step 6: Branch existing gh hover binding for VS Code**

Find the existing line `map("n", "gh", vim.lsp.buf.hover, { desc = "Hover docs" })` and replace with:

```lua
map("n", "gh", function()
  if vim.g.vscode then
    require("vscode").action("editor.action.showHover")
  else
    vim.lsp.buf.hover()
  end
end, { desc = "Hover docs" })
```

- [ ] **Step 7: Run lua-check**

```bash
cd /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles
just lua-fmt
just lua-check
```
Expected: green.

- [ ] **Step 8: Reload terminal nvim and test each chord family**

Open terminal nvim, press each prefix and wait for which-key:
- `q` → expect q-prefix git menu (jkbwdoOaAuUcpPBlrnNyY)
- `m` → expect mm + ms/md/mr (surround) + implicit text objects
- `t` → expect te/tg/tt/to/td/th/tc/tw/tb/tP
- `g` → expect LazyVim defaults (gd/gr/gI/gy/gD/gh/gK + gJ join + ga increment)

Expected: which-key shows each chord with its desc.

- [ ] **Step 9: Smoke-test high-value chords**

In a TS file:
- `gd` → goto definition.
- `gr` → references.
- `qj` → next hunk (in a dirty file).
- `qw` → lazygit float.
- `te` → file explorer.
- `mm` on a brace → jumps to matching brace.
- `r` on a symbol → opens rename input.

Expected: all work.

- [ ] **Step 10: Commit**

```bash
git add home/.config/nvim/lua/config/keymaps.lua
git commit -m "$(cat <<'EOF'
add q-prefix git, m-prefix match, t-prefix toggle, r rename

Implements the new chord architecture in terminal nvim:
- q* git: hunks, branch, panel, diff, stage, restore, commit,
  push, blame, log graph, PR review, GitHub links
- mm match-bracket (Helix-style)
- t* toggle/panel: explorer, git, terminal, outline, diagnostics,
  hints, codelens, wrap, blame, close
- r → LSP rename (replaces vim's r<char> primitive)
- gh hover branched on vim.g.vscode for VS Code dispatch

Session-Id: <session-id>
EOF
)"
```

---

## Task 9: Keymap migration — VS Code mode (`vscode_keymaps.lua`)

**Files:**
- Create: `home/.config/nvim/lua/config/vscode_keymaps.lua`
- Modify: `home/.config/nvim/lua/config/keymaps.lua` (add require)

- [ ] **Step 1: Create vscode_keymaps.lua skeleton**

Create `home/.config/nvim/lua/config/vscode_keymaps.lua`:
```lua
-- VS Code-mode-only keymaps. Loaded by keymaps.lua when vim.g.vscode is true.
-- These dispatch VS Code commands via vscode.action() instead of running
-- nvim-native plugins/functions.

local vscode = require("vscode")
local map = vim.keymap.set

local function vsmap(modes, lhs, command, desc)
  vim.keymap.set(modes, lhs, function() vscode.action(command) end, { desc = desc })
end

local function vsmaps(modes, lhs, commands, desc)
  vim.keymap.set(modes, lhs, function()
    for _, c in ipairs(commands) do vscode.action(c) end
  end, { desc = desc })
end
```

- [ ] **Step 2: Add cmdline / palette overrides**

Append:
```lua
-- ──────────────────────────────────────────────────────────────────────────
-- CMDLINE / PALETTE
-- ──────────────────────────────────────────────────────────────────────────

vsmap("n", ":", "workbench.action.showCommands", "Command palette")
map("n", ";", ":", { desc = "Ex command" })
```

- [ ] **Step 3: Add search find-widget overrides**

Append:
```lua
-- ──────────────────────────────────────────────────────────────────────────
-- SEARCH (override centered n/N to use VS Code's find widget)
-- ──────────────────────────────────────────────────────────────────────────

vsmap("n", "/", "actions.find", "Find in file")
vsmap("n", "?", "workbench.action.findInFiles", "Find in files")
vsmap("n", "n", "editor.action.nextMatchFindAction", "Next match")
vsmap("n", "N", "editor.action.previousMatchFindAction", "Prev match")
```

- [ ] **Step 4: Add folding overrides**

Append:
```lua
-- ──────────────────────────────────────────────────────────────────────────
-- FOLDING
-- ──────────────────────────────────────────────────────────────────────────

vsmap("n", "zo", "editor.toggleFold", "Toggle fold")
vsmap("n", "za", "editor.toggleFold", "Toggle fold")
vsmap("n", "zc", "editor.fold", "Close fold")
vsmap("n", "zM", "editor.foldAll", "Fold all")
vsmap("n", "zR", "editor.unfoldAll", "Unfold all")
vsmap("n", "zj", "editor.gotoNextFold", "Next fold")
vsmap("n", "zk", "editor.gotoPreviousFold", "Prev fold")
```

- [ ] **Step 5: Add navigation history**

Append:
```lua
-- ──────────────────────────────────────────────────────────────────────────
-- NAVIGATION HISTORY
-- ──────────────────────────────────────────────────────────────────────────

vsmap("n", "[", "workbench.action.navigateBack", "Navigate back")
vsmap("n", "]", "workbench.action.navigateForward", "Navigate forward")
```

- [ ] **Step 6: Add leader top-level shortcuts**

Append:
```lua
-- ──────────────────────────────────────────────────────────────────────────
-- LEADER TOP-LEVEL
-- ──────────────────────────────────────────────────────────────────────────

vsmap("n", "<leader>k", "workbench.action.quickOpen", "Quick open")
vsmap("n", "<leader>l", "workbench.action.gotoSymbol", "Go to symbol")
vsmap("n", "<leader>L", "workbench.action.showAllSymbols", "Workspace symbols")
vsmap("n", "<leader>j", "workbench.action.tasks.runTask", "Run task")
vsmap("n", "<leader>o", "workbench.action.openRecent", "Open recent")
vsmap("n", "<leader>O", "projectManager.listProjects", "Project manager")
vsmap("n", "<leader>z", "workbench.action.toggleZenMode", "Zen mode")
vsmap("n", "<leader>.", "editor.action.quickFix", "Quick fix")
```

- [ ] **Step 7: Add leader quickfix submenu**

Append:
```lua
-- ──────────────────────────────────────────────────────────────────────────
-- LEADER: QUICKFIX
-- ──────────────────────────────────────────────────────────────────────────

vsmap("n", "<leader>qq", "editor.action.quickFix", "Quick fix")
vsmaps("n", "<leader>qi", {
  "typescript.addMissingImports",
  "workbench.action.files.saveAll",
}, "Add missing imports")
vsmaps("n", "<leader>qo", {
  "typescript.organizeImports",
  "workbench.action.files.saveAll",
}, "Organize imports")
vsmaps("n", "<leader>qu", {
  "typescript.removeUnusedImports",
  "workbench.action.files.saveAll",
}, "Remove unused imports")
vsmaps("n", "<leader>qf", {
  "typescript.fixAll",
  "workbench.action.files.saveAll",
}, "Fix all")
vsmap("n", "<leader>qr", "editor.action.refactor", "Refactor")
```

- [ ] **Step 8: Add leader debug submenu**

Append:
```lua
-- ──────────────────────────────────────────────────────────────────────────
-- LEADER: DEBUG
-- ──────────────────────────────────────────────────────────────────────────

vsmap("n", "<leader>dd", "workbench.action.debug.start", "Start debug")
vsmap("n", "<leader>db", "editor.debug.action.toggleBreakpoint", "Toggle breakpoint")
vsmap("n", "<leader>dl", "editor.debug.action.toggleLogpoint", "Toggle logpoint")
vsmap("n", "<leader>dc", "workbench.action.debug.continue", "Continue")
vsmap("n", "<leader>ds", "workbench.action.debug.stepOver", "Step over")
vsmap("n", "<leader>di", "workbench.action.debug.stepInto", "Step into")
vsmap("n", "<leader>do", "workbench.action.debug.stepOut", "Step out")
vsmap("n", "<leader>dt", "workbench.action.debug.stop", "Stop")
vsmap("n", "<leader>dr", "workbench.action.debug.restart", "Restart")
```

- [ ] **Step 9: Add leader search submenu**

Append:
```lua
-- ──────────────────────────────────────────────────────────────────────────
-- LEADER: SEARCH
-- ──────────────────────────────────────────────────────────────────────────

vsmap("n", "<leader>s", "workbench.action.findInFiles", "Find in files")
vsmap("v", "<leader>s", "workbench.action.findInFilesWithSelectedText", "Find selection")
vsmap("n", "<leader>S", "search.action.openNewEditor", "Search editor")
vsmaps("n", "<leader>*", {
  "editor.action.addSelectionToNextFindMatch",
  "workbench.action.findInFiles",
}, "Find word in files")
vsmap("n", "<leader>sr", "workbench.action.replaceInFiles", "Replace in files")
```

- [ ] **Step 10: Add visual J/K**

Append:
```lua
-- ──────────────────────────────────────────────────────────────────────────
-- VISUAL J/K — explicit editorScroll to keep selection
-- ──────────────────────────────────────────────────────────────────────────

vim.keymap.set("v", "J", function()
  vscode.action("editorScroll", { args = { to = "down", by = "halfPage", select = true } })
end, { desc = "Half-page down (visual)" })

vim.keymap.set("v", "K", function()
  vscode.action("editorScroll", { args = { to = "up", by = "halfPage", select = true } })
end, { desc = "Half-page up (visual)" })
```

- [ ] **Step 11: Add VS Code-only git chords (q-prefix extensions)**

Append:
```lua
-- ──────────────────────────────────────────────────────────────────────────
-- GIT (q-prefix VS Code-only — extension-driven)
-- ──────────────────────────────────────────────────────────────────────────

vsmap("n", "qf", "git.fetch", "Git fetch")
vsmap("n", "qs", "git.stash", "Git stash")
vsmap("n", "qS", "git.stashPop", "Git stash pop")
vsmap("n", "ql", "git-graph.view", "Git graph")
vsmap("n", "qB", "editor.action.toggleBlame", "Toggle blame")
vsmap({ "n", "v" }, "qy", "extension.copyGitHubLinkToClipboard", "Copy GitHub link")
vsmap({ "n", "v" }, "qY", "extension.openInGitHub", "Open in GitHub")
vsmap("n", "qr", "extension.openPrGitProvider", "Open PR")
vsmap("n", "qn", "pr.goToNextDiffInPr", "Next PR diff")
vsmap("n", "qN", "pr.goToPreviousDiffInPr", "Prev PR diff")

-- Note: q-prefix all-tools chords (qj/qk/qw/qd/qo/qO/qa/qA/qu/qU/qc/qp/qP)
-- already work via terminal-nvim bindings dispatching VS Code commands
-- through vscode-neovim's command bridge.
```

- [ ] **Step 12: Add VS Code-only toggle/panel chords**

Append:
```lua
-- ──────────────────────────────────────────────────────────────────────────
-- TOGGLE / PANELS (t-prefix VS Code-only — chrome dispatches)
-- ──────────────────────────────────────────────────────────────────────────

vsmap("n", "te", "workbench.files.action.focusFilesExplorer", "File explorer")
vsmap("n", "tg", "workbench.view.scm", "SCM panel")
vsmap("n", "tt", "workbench.action.terminal.focus", "Terminal")
vsmap("n", "to", "outline.focus", "Outline")
vsmap("n", "td", "workbench.panel.markers.view.focus", "Diagnostics")
vsmap("n", "tP", "workbench.action.closePanel", "Close panel")
vsmap("n", "th", "editor.action.toggleInlayHints", "Toggle inlay hints")
vsmap("n", "tc", "jason.toggleCodeLens", "Toggle code lens")
vsmap("n", "tw", "editor.action.toggleWordWrap", "Toggle word wrap")
```

- [ ] **Step 13: Add config (,) prefix**

Append:
```lua
-- ──────────────────────────────────────────────────────────────────────────
-- CONFIG (, prefix)
-- ──────────────────────────────────────────────────────────────────────────

vsmap("n", ",,", "workbench.action.openSettings", "Settings")
vsmap("n", ",k", "workbench.action.openGlobalKeybindings", "Keybindings")
vsmap("n", ",K", "workbench.action.openDefaultKeybindingsFile", "Default keybindings")
vsmap("n", ",s", "workbench.action.openSnippets", "Snippets")
vsmap("n", ",t", "workbench.action.tasks.openUserTasks", "User tasks")
vsmap("n", ",<space>", "editor.action.toggleWordWrap", "Toggle word wrap")
vsmap("n", ",R", "workbench.action.reloadWindow", "Reload window")
vsmap("n", ",r", "typescript.restartTsServer", "Restart TS server")
```

- [ ] **Step 14: Wire vscode_keymaps.lua into keymaps.lua**

Edit `home/.config/nvim/lua/config/keymaps.lua`. At the bottom, append:
```lua
-- VS Code-mode keymaps (only loaded under vscode-neovim)
if vim.g.vscode then
  require("config.vscode_keymaps")
end
```

- [ ] **Step 15: Reload VS Code and test each chord family**

In VS Code: Cmd+Shift+P → "Developer: Reload Window".

Press each prefix and wait for which-key:
- `q` → q-prefix git menu (with VS Code extensions if present).
- `t` → t-prefix toggle/panel menu.
- `<leader>` → leader menu.
- `,` → config menu.
- `m` → m-prefix match menu.
- `g` → LSP-prefix menu (LazyVim defaults dispatched via vscode-neovim).

Expected: each menu shows.

- [ ] **Step 16: Smoke-test cross-mode chords**

In VS Code:
- `gd` → VS Code peeks/jumps to definition (vscode-neovim bridges `vim.lsp.buf.definition` to VS Code's command).
- `te` → file explorer focuses.
- `qw` → lazygit equivalent — actually, since lazygit isn't loaded in VS Code, `qw` should fall back to `git.fetch` or similar. Verify behavior; if undefined, document gap.
- `<leader>k` → quickOpen.
- `mm` → matching bracket.

Expected: most chords work; document any gaps.

- [ ] **Step 17: Run lua-check**

```bash
cd /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles
just lua-fmt
just lua-check
```
Expected: green.

- [ ] **Step 18: Commit**

```bash
git add home/.config/nvim/lua/config/vscode_keymaps.lua \
        home/.config/nvim/lua/config/keymaps.lua

git commit -m "$(cat <<'EOF'
add vscode_keymaps.lua for VS Code-only chord overrides

Wires VS Code commands via vscode.action() for chords that need
chrome dispatch instead of nvim plugin calls: cmdline palette,
find widget, folding, navigation history, leader top-level,
quickfix/debug/search submenus, visual J/K, t-prefix panels,
q-prefix VS Code-only git extensions (qf/qs/qS/ql/qy/qY/qr/qn/qN),
config (,) prefix.

Loaded conditionally via `if vim.g.vscode then require(...) end`
appended to keymaps.lua.

Session-Id: <session-id>
EOF
)"
```

---

## Task 10: Zed config migration

**Files:**
- Modify: `home/.config/zed/keymap.json`

- [ ] **Step 1: Backup current keymap.json**

```bash
cp /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/zed/keymap.json \
   /tmp/zed-keymap.json.pre-migration
```
Expected: backup file exists. (Phase-0 commit is the canonical recovery point; this is a working copy for diff.)

- [ ] **Step 2: Read current Zed git block**

```bash
sed -n '320,360p' /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/zed/keymap.json
```
This shows the existing g-prefix git block (lines ~327–351).

- [ ] **Step 3: Replace g-prefix git block with q-prefix git block**

In `home/.config/zed/keymap.json`, find the context block starting at line ~327 (`"context": "vim_mode == normal || ... || GitPanel || ...".`). Replace all `g X` keys in its `bindings` with `q X` equivalents:

Before (current state):
```json
{
  "context": "vim_mode == normal || ...",
  "bindings": {
    "fn-_gj1": "editor::GoToHunk",
    "g j": ["workspace::SendKeystrokes", "fn-_gj1 g Z"],
    "fn-_gk1": "editor::GoToPreviousHunk",
    "g k": ["workspace::SendKeystrokes", "fn-_gj1 g Z"],
    "g b": "git::Switch",
    "g w": "git_panel::ToggleFocus",
    "g d": "git::Diff",
    "g o": "editor::ToggleSelectedDiffHunks",
    "g O": "editor::ExpandAllDiffHunks",
    "g a": "git::ToggleStaged",
    "g A": "git::StageAll",
    "g u": "git::Restore",
    "g U": "git::RestoreFile",
    "g c": "git::Commit",
    "g p": "git::Push",
    "g P": "git::ForcePush"
  }
}
```

After:
```json
{
  "context": "vim_mode == normal || ...",
  "bindings": {
    "fn-_qj1": "editor::GoToHunk",
    "q j": ["workspace::SendKeystrokes", "fn-_qj1 q Z"],
    "fn-_qk1": "editor::GoToPreviousHunk",
    "q k": ["workspace::SendKeystrokes", "fn-_qk1 q Z"],
    "q b": "git::Switch",
    "q w": "git_panel::ToggleFocus",
    "q d": "git::Diff",
    "q o": "editor::ToggleSelectedDiffHunks",
    "q O": "editor::ExpandAllDiffHunks",
    "q a": "git::ToggleStaged",
    "q A": "git::StageAll",
    "q u": "git::Restore",
    "q U": "git::RestoreFile",
    "q c": "git::Commit",
    "q p": "git::Push",
    "q P": "git::ForcePush"
  }
}
```

Notes:
- Helper names `fn-_gj1`/`fn-_gk1` renamed to `fn-_qj1`/`fn-_qk1` consistent with the new prefix.
- The line 334 typo (`fn-_gj1` for `g k`) is fixed: `q k` now correctly dispatches `fn-_qk1`.

Preserve `"context"` and the surrounding context block.

- [ ] **Step 4: Add g-prefix LSP block (vim convention)**

In `home/.config/zed/keymap.json`, add a new context block (or extend an existing editor context block):
```json
{
  "context": "Editor && vim_mode == normal && !VimWaiting && !menu",
  "bindings": {
    "g d": "editor::GoToDefinition",
    "g D": "editor::GoToDefinitionSplit",
    "g r": "editor::FindAllReferences",
    "g I": "editor::GoToImplementation",
    "g y": "editor::GoToTypeDefinition",
    "g h": "editor::Hover"
  }
}
```

Note: verify each Zed action name against current Zed docs (`zed: open default keymap` shows the action registry). Adjust if Zed uses different names.

- [ ] **Step 5: Remove `w` → match-bracket override**

Search `keymap.json` for any `"w"` binding that maps to `vim::Matching` or similar. Delete that binding line. `w` returns to default vim word motion.

```bash
grep -n '"w"' /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/zed/keymap.json
```
Expected: any `"w": "vim::Matching"` or similar is removed.

- [ ] **Step 6: Remove `V` → SelectEnclosingSymbol override**

Find `"V": "editor::SelectEnclosingSymbol"` (around line ~502 per audit). Delete that line. `V` returns to default visual-line.

- [ ] **Step 7: Add `r` → Rename**

In an editor context block (or add to the existing g-prefix LSP block), add:
```json
"r": "editor::Rename"
```

- [ ] **Step 8: Add `mm` for match-bracket**

In an editor context block (vim_mode == normal), add:
```json
"m m": "vim::Matching"
```

- [ ] **Step 9: Add t-prefix toggle/panel block**

Add a new context block:
```json
{
  "context": "Editor && vim_mode == normal && !VimWaiting && !menu",
  "bindings": {
    "t e": "workspace::ToggleLeftDock",
    "t g": "git_panel::ToggleFocus",
    "t t": "terminal_panel::ToggleFocus",
    "t o": "outline_panel::ToggleFocus",
    "t d": "diagnostics::Deploy",
    "t h": "editor::ToggleInlayHints",
    "t c": "editor::ToggleCodeLens",
    "t w": "editor::ToggleSoftWrap",
    "t b": "editor::ToggleGitBlameInline",
    "t P": "workspace::CloseAllDocks"
  }
}
```

Note: action names need verification — some may be different in current Zed. Adjust as needed.

- [ ] **Step 10: Remove old `<spc>p*` and `<spc>t*` chord blocks**

Find any binding with key `space p`, `space p p`, `space t h`, etc., in keymap.json. Remove them. The new `t*` prefix replaces both menus.

```bash
grep -nE '"(space|<spc>) (p|t) ' /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/zed/keymap.json
```
Expected after edit: zero matches.

- [ ] **Step 11: Add J/K/G centering via SendKeystrokes**

Find the existing motion bindings (where `n`/`N` already use SendKeystrokes for centering). Add parallel bindings for `J`, `K`, `G`:

```json
"J": ["workspace::SendKeystrokes", "<C-d> z z"],
"K": ["workspace::SendKeystrokes", "<C-u> z z"],
"G": ["workspace::SendKeystrokes", "G z z"]
```

(Verify Zed's SendKeystrokes syntax — escape sequences like `<C-d>` may need to be raw key names depending on Zed version.)

- [ ] **Step 12: Fix `u` shadowing bug (Decision #8)**

Search keymap.json for `"u": "vim::MoveToPrevious"`. Delete that line. The line `"u": "vim::Undo"` (later in the file) becomes the active binding.

```bash
grep -n '"u": "vim::MoveToPrevious"' /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/zed/keymap.json
```
Expected after edit: zero matches.

- [ ] **Step 13: Add `[b` / `]b` for buffer prev/next (if Zed supports)**

In an editor context block, add:
```json
"[ b": "pane::ActivatePreviousItem",
"] b": "pane::ActivateNextItem"
```

(Verify action names. If Zed doesn't support these chords without further config, document the gap in keymap.yml.)

- [ ] **Step 14: Validate JSON syntax**

```bash
python3 -m json.tool /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/zed/keymap.json > /dev/null
```
Expected: no error output. (Zed allows comments in keymap.json which python json may reject — if so, use `jq` with comment support or skip syntax check and rely on Zed's reload.)

- [ ] **Step 15: Reload Zed and test each chord family**

In Zed: Cmd+Shift+P → "zed: reload keymap" or restart Zed.

Test each prefix:
- `g d` → goto definition.
- `g r` → references.
- `g h` → hover.
- `q j` → next hunk.
- `q k` → **previous** hunk (typo fix verified).
- `q w` → git panel.
- `q c` → commit.
- `t e` → file explorer.
- `t g` → git panel.
- `m m` → matching bracket.
- `r` → rename input.
- `V` → visual-line mode.
- `w` → vim word motion.
- `J`/`K`/`G` → motion + cursor centered.
- `u` → undo (not MoveToPrevious).
- `[ b` / `] b` → previous/next buffer.

Expected: all behave per Decision log.

- [ ] **Step 16: Commit**

```bash
git add home/.config/zed/keymap.json
git commit -m "$(cat <<'EOF'
align Zed keymap with new chord architecture

Mechanical edits to align Zed with the resolved decision set:

- Move git from g-prefix to q-prefix (Decision #14)
- Restore g-prefix to LSP/goto (vim convention; Decisions #1+#2.c)
- Revert w → match-bracket override (Decision #3 = D); mm replaces it
- Revert V → SelectEnclosingSymbol override (Decision #4 = B);
  V is visual-line again
- Add r → editor::Rename (Decision #5 = A)
- Add J/K/G centering via SendKeystrokes (Decision #6 = A)
- Replace <spc>p* and <spc>t* with single-key t* prefix (Decision #7)
- Fix gk typo: q k now correctly dispatches GoToPreviousHunk
- Fix u shadowing bug: remove vim::MoveToPrevious binding
- Add [b/]b for buffer prev/next

Session-Id: <session-id>
EOF
)"
```

---

## Task 11: Clean up settings.json (delete vim.* arrays)

**Files:**
- Modify: `home/Library/Application Support/Code/User/settings.json`

- [ ] **Step 1: Locate the vim.* block**

```bash
grep -n '"vim\.' "/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/Library/Application Support/Code/User/settings.json" | head -10
```
Expected: a contiguous range of vim-prefixed keys (around lines 68–263 per the spec's earlier audit).

- [ ] **Step 2: Identify the section comment markers**

The block is bracketed by VSCodeVim section comments (something like `// ───────── Vim` and a corresponding `// ─────────`).

```bash
grep -n '─.*Vim\|─.*VIM\|VSCodeVim' "/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/Library/Application Support/Code/User/settings.json"
```

- [ ] **Step 3: Delete the vim.* block**

Open the file and delete:
- The opening section comment line
- All `"vim.normalModeKeyBindings"`, `"vim.visualModeKeyBindings"`, `"vim.insertModeKeyBindings"` arrays
- All other top-level `"vim.*"` keys (e.g., `"vim.useSystemClipboard"`, `"vim.handleKeys"`)
- The closing section comment if it bracketed only the vim block

Keep all other settings unchanged.

- [ ] **Step 4: Validate JSON**

```bash
python3 -c "import json; json.load(open('/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/Library/Application Support/Code/User/settings.json'))" 2>&1 | head -5
```

Note: VS Code allows comments and trailing commas; Python's strict json may reject. If it errors, install `jsonc-tool` or use:
```bash
node -e "JSON.parse(require('fs').readFileSync('/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/Library/Application Support/Code/User/settings.json', 'utf8'))" 2>&1 | head
```
or rely on VS Code reloading without error (Step 6).

- [ ] **Step 5: Verify the vscode-neovim setting from Task 3 is still present**

```bash
grep "vscode-neovim" "/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/Library/Application Support/Code/User/settings.json"
```
Expected: `"vscode-neovim.neovimExecutablePaths.darwin": "/opt/homebrew/bin/nvim"` line still present.

- [ ] **Step 6: Reload VS Code**

Cmd+Shift+P → "Developer: Reload Window".

Expected: no parse errors. VSCodeVim is disabled (Task 3 step 2), so removing its config is harmless.

- [ ] **Step 7: Commit**

```bash
cd /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles
git add "home/Library/Application Support/Code/User/settings.json"
git commit -m "$(cat <<'EOF'
delete VSCodeVim config from settings.json

Removes ~200 lines of vim.normalModeKeyBindings,
vim.visualModeKeyBindings, vim.insertModeKeyBindings, and
other vim.* settings. VSCodeVim is disabled and these settings
are no longer read. vscode-neovim setting preserved.

Session-Id: <session-id>
EOF
)"
```

---

## Task 12: Update keybindings.json

**Files:**
- Modify: `home/Library/Application Support/Code/User/keybindings.json`

- [ ] **Step 1: Reframe vim.mode 'Visual' → neovim.mode 'visual'**

Open `home/Library/Application Support/Code/User/keybindings.json`. Find entries with `"when": "... && vim.mode == 'Visual'"`. Replace with `"when": "... && neovim.mode == 'visual'"`.

```bash
grep -n "vim.mode" "/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/Library/Application Support/Code/User/keybindings.json"
```
Expected: 2 matches per the original audit (cmd+j and cmd+k duplicate-line entries).

After editing, re-grep for `"vim.mode"` — should be 0 matches; `"neovim.mode"` should match instead.

- [ ] **Step 2: Decide on welcome-screen leader chord block**

The file has a block guarded by `!editorIsOpen` (welcome-screen leader chords). Test in VS Code: with no editor open, press `<space>k`. Does vscode-neovim handle it?

If yes: delete the welcome-screen block (no longer needed; vscode-neovim covers it).

If no: leave the block but optionally add `&& !neovim.connected` to the `when` clause so it only fires when vscode-neovim isn't ready.

- [ ] **Step 3: Update file header comment**

Open `keybindings.json` and update the header comment block. The current header (per the original spec) said something like "Vim-mode bindings live in settings.json under vim.*". Replace with:

```jsonc
// ───────────────────────────────────────────────────────────────────────────
// VS Code chrome bindings (chord-level vim bindings live in nvim init.lua,
// loaded via vscode-neovim extension).
// ───────────────────────────────────────────────────────────────────────────
```

- [ ] **Step 4: Reload VS Code and validate chrome bindings**

In VS Code:
- cmd+h / cmd+j / cmd+l → docks toggle.
- ctrl+hjkl → pane focus.
- ctrl+j / ctrl+k → menu nav.
- list view: j/k navigation.
- Explorer: dig in (Enter), delete (`d`).
- Visual mode: cmd+j / cmd+k → duplicate line down/up.
- Welcome screen leader chord (per Step 2 decision).

Expected: chrome bindings unchanged. If welcome-screen block was kept, `<space>k` etc. work on the welcome screen.

- [ ] **Step 5: Commit**

```bash
git add "home/Library/Application Support/Code/User/keybindings.json"
git commit -m "$(cat <<'EOF'
update keybindings.json for vscode-neovim

- Reframe vim.mode 'Visual' → neovim.mode 'visual' on cmd+j/cmd+k
  duplicate-line entries
- Resolve welcome-screen leader chord block per phase-3 testing
- Update file header comment: vim bindings now live in nvim init.lua

Session-Id: <session-id>
EOF
)"
```

---

## Task 13: Final cleanup

**Files:**
- Modify: `scripts/data/Brewfile`
- Create: `scripts/data/vscode-extensions.txt`
- Create: `scripts/setup/after/install-vscode-extensions`
- Modify: `justfile`
- Modify: `docs/hjkl-navigation.md` (or wherever the navigation doc lives)
- Uninstall: `vscodevim.vim` extension

- [ ] **Step 1: Uninstall VSCodeVim**

```bash
code --uninstall-extension vscodevim.vim
```
Expected: "Extension 'vscodevim.vim' was successfully uninstalled."

- [ ] **Step 2: Add VS Code to Brewfile**

Open `/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/scripts/data/Brewfile`. Find the existing `cask "zed"` line. Add immediately after:
```
cask "visual-studio-code"
```

Verify with:
```bash
grep -nE 'cask "(zed|visual-studio-code)"' /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/scripts/data/Brewfile
```
Expected: both casks present.

- [ ] **Step 3: Export VS Code extension manifest**

```bash
code --list-extensions | sort > /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/scripts/data/vscode-extensions.txt
```

Verify:
```bash
grep -E 'asvetliakov.vscode-neovim|vscodevim.vim' /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/scripts/data/vscode-extensions.txt
```
Expected: `asvetliakov.vscode-neovim` present; `vscodevim.vim` absent.

- [ ] **Step 4: Create install-vscode-extensions script**

Create `/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/scripts/setup/after/install-vscode-extensions`:
```bash
#!/usr/bin/env bash
# @describe Install all VS Code extensions from vscode-extensions.txt manifest
# @meta default-subcommand install

# @cmd Install all extensions
install() {
  local manifest="${BASH_SOURCE[0]%/*}/../../../scripts/data/vscode-extensions.txt"
  if [[ ! -f "$manifest" ]]; then
    echo "Error: manifest not found at $manifest" >&2
    exit 1
  fi
  while IFS= read -r ext; do
    [[ -z "$ext" ]] && continue
    echo "Installing $ext..."
    code --install-extension "$ext" --force
  done < "$manifest"
}

eval "$(argc --argc-eval "$0" "$@")"
```

Make executable:
```bash
chmod +x /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/scripts/setup/after/install-vscode-extensions
```

- [ ] **Step 5: Add justfile recipes**

Open `/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/justfile`. Find an appropriate section (e.g., near other extension/install recipes). Add:

```just
# Install all VS Code extensions from manifest
vscode-extensions-sync:
    scripts/setup/after/install-vscode-extensions

# Export current VS Code extensions to manifest
vscode-extensions-export:
    code --list-extensions | sort > scripts/data/vscode-extensions.txt
```

Verify with:
```bash
just --list 2>&1 | grep -E 'vscode-extensions'
```
Expected: both recipes listed.

- [ ] **Step 6: Update keymap.yml header note (if needed)**

The keymap.yml file already has the post-migration architecture documented. Verify the header comment reflects completion (no "TBD" or "pending migration" markers).

```bash
head -30 /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/keymap.yml
```

- [ ] **Step 7: Update hjkl-navigation.md**

Find and read:
```bash
ls /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/docs/hjkl-navigation.md 2>/dev/null
ls /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.claude/skills-library/git/SKILL.md 2>/dev/null  # whatever location
```

Locate the doc and update the "Per-Tool Implementation" section: VS Code section now reads "Executes nvim init.lua via vscode-neovim. Pane navigation handled by VS Code chrome (`workbench.action.navigate{Up,Down,Left,Right}`); vim-mode keys live in nvim's keymaps.lua."

If the doc doesn't exist, skip this step but note it in the commit message.

- [ ] **Step 8: Run lua-check**

```bash
cd /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles
just lua-fmt
just lua-check
```
Expected: green.

- [ ] **Step 9: Run full validation criteria from spec section 11**

Manually run through the 22 validation items in the spec ("Validation criteria" section). Document any that fail. If all pass, proceed to commit.

- [ ] **Step 10: Run `nesia add` for capability change**

```bash
cd /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles
nesia add editor "VS Code now uses vscode-neovim — vim keys live in nvim init.lua. Chord architecture: g LSP, q git, m match/surround, t toggle, , config"
```

- [ ] **Step 11: Final commit**

```bash
git add scripts/data/Brewfile \
        scripts/data/vscode-extensions.txt \
        scripts/setup/after/install-vscode-extensions \
        justfile \
        docs/hjkl-navigation.md  # if it was updated

git commit -m "$(cat <<'EOF'
finalize vscode-neovim migration

- Uninstall vscodevim.vim
- Track VS Code in Brewfile (cask "visual-studio-code")
- Add scripts/data/vscode-extensions.txt manifest
- Add install-vscode-extensions argc-based installer
- Add just recipes: vscode-extensions-sync, vscode-extensions-export
- Update hjkl-navigation.md to reflect VS Code now executes nvim config

Migration complete. VS Code is on vscode-neovim with chord
architecture aligned to nvim and Zed.

Session-Id: <session-id>
EOF
)"
```

- [ ] **Step 12: Push (optional, per user preference)**

```bash
git push
```

(Per user CLAUDE.md, commits and pushes are allowed without further confirmation.)

---

## Self-review checklist (post-plan)

After implementing all 13 tasks, verify against the spec's 22-item validation criteria:

1. **Vim primitives** — confirm `dw`/`yip`/`U`/`kj` work; `r<char>` correctly broken (rename instead).
2. **which-key per-prefix** — `g`/`q`/`m`/`t`/`,` all show menus.
3. **Operator-pending which-key** — pressing `d` shows valid motions (the headline feature).
4. **VS Code chrome** — file tree, panes, terminal exit unchanged.
5. **LSP integration** — `gd`/`gr`/`gh` work; saving formats.
6. **Git workflow** — `qj`/`qk`/`qa`/`qp`/`qw`/`qd`/`ql` all functional.
7. **Toggle/panel** — `te`/`td`/`to`/`tw` all functional.
8. **Terminal nvim** — full LazyVim experience preserved + 5 new plugins functional.
9. **Zed parity** — `g d`/`q p`/`t e`/`m m` work; J/K/G centered; `g k` correctly previous (typo fix); `u` undoes (shadowing fix).
10. **Toolchain** — `just lua-check` green, extensions list correct, Brewfile updated.

If any fail, file a follow-up issue or revisit the relevant task. The phase-0 commit (Task 1) remains the canonical recovery point.
