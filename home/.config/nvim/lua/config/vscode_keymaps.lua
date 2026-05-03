-- VS Code-mode-only keymaps. Loaded by keymaps.lua when vim.g.vscode is true.
-- These dispatch VS Code commands via vscode.action() and OVERRIDE the
-- terminal-nvim mappings from keymaps.lua wherever the underlying plugin
-- isn't loaded under VS Code (lspconfig, gitsigns, diffview, octo, gitlinker,
-- aerial, trouble are all gated off in VS Code mode by LazyVim's vscode
-- extras whitelist or our own gating).
--
-- What works the same in both modes (no override needed here): pure-vim
-- motions and operators, mini.surround (m s/m d/m r/m f/m F/m h), `mm` match
-- bracket, basic centering (n/N/J/K/G zz), text objects (vi(/va{/vif).
--
-- What this file overrides: cmdline palette dispatch, find-widget for n/N
-- and / and ?, folding to VS Code's editor.fold*, navigation history,
-- leader top-level + sub-menus (q/d/s), visual J/K, q-prefix git (gitsigns
-- replaced by VS Code's git extension commands), t-prefix toggle/panel
-- (snacks/aerial/trouble replaced by chrome dispatches), `r` rename, gh
-- hover, , config menu.

local vscode = require("vscode")
local map = vim.keymap.set

local function vsmap(modes, lhs, command, desc)
  vim.keymap.set(modes, lhs, function()
    vscode.action(command)
  end, { desc = desc })
end

local function vsmaps(modes, lhs, commands, desc)
  vim.keymap.set(modes, lhs, function()
    for _, c in ipairs(commands) do
      vscode.action(c)
    end
  end, { desc = desc })
end

-- ──────────────────────────────────────────────────────────────────────────
-- SEARCH (override centered n/N to use VS Code's find widget)
-- ──────────────────────────────────────────────────────────────────────────
vsmap("n", "/", "actions.find", "Find in file")
vsmap("n", "?", "workbench.action.findInFiles", "Find in files")
vsmap("n", "n", "editor.action.nextMatchFindAction", "Next match")
vsmap("n", "N", "editor.action.previousMatchFindAction", "Prev match")

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

-- ──────────────────────────────────────────────────────────────────────────
-- NAVIGATION HISTORY
-- ──────────────────────────────────────────────────────────────────────────
vsmap("n", "[", "workbench.action.navigateBack", "Navigate back")
vsmap("n", "]", "workbench.action.navigateForward", "Navigate forward")

-- ──────────────────────────────────────────────────────────────────────────
-- LEADER TOP-LEVEL
-- ──────────────────────────────────────────────────────────────────────────
vsmap("n", "<leader>l", "workbench.action.gotoSymbol", "Go to symbol")
vsmap("n", "<leader>L", "workbench.action.showAllSymbols", "Workspace symbols")
vsmap("n", "<leader>j", "workbench.action.tasks.runTask", "Run task")
vsmap("n", "<leader>o", "workbench.action.openRecent", "Open recent")
vsmap("n", "<leader>O", "projectManager.listProjects", "Project manager")
vsmap("n", "<leader>z", "workbench.action.toggleZenMode", "Zen mode")
vsmap("n", "<leader>.", "editor.action.quickFix", "Quick fix")

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

-- ──────────────────────────────────────────────────────────────────────────
-- VISUAL J/K — explicit editorScroll to keep selection
-- ──────────────────────────────────────────────────────────────────────────
map("v", "J", function()
  vscode.action("editorScroll", { args = { to = "down", by = "halfPage", select = true } })
end, { desc = "Half-page down (visual)" })

map("v", "K", function()
  vscode.action("editorScroll", { args = { to = "up", by = "halfPage", select = true } })
end, { desc = "Half-page up (visual)" })

-- ──────────────────────────────────────────────────────────────────────────
-- GIT (q-prefix VS Code-only — extension-driven; complements terminal-nvim
-- chords from keymaps.lua. The q* chords routed through gitsigns/diffview/
-- octo/gitlinker in keymaps.lua silently no-op in VS Code because those
-- plugins are gated off — these explicit dispatches replace them.)
-- ──────────────────────────────────────────────────────────────────────────
vsmap("n", "qj", "workbench.action.editor.nextChange", "Next git hunk")
vsmap("n", "qk", "workbench.action.editor.previousChange", "Prev git hunk")
vsmap("n", "qb", "git.checkout", "Branch picker")
vsmap("n", "qw", "workbench.view.scm", "SCM panel")
vsmap("n", "qd", "git.openChange", "Git diff")
vsmap("n", "qo", "git.openChange", "Inline hunk preview") -- closest VS Code analog
vsmap("n", "qO", "git.viewChanges", "View all changes")
vsmap("n", "qa", "git.stageSelectedRanges", "Stage hunk")
vsmap("n", "qA", "git.stage", "Stage all")
vsmap("n", "qu", "git.revertSelectedRanges", "Restore hunk")
vsmap("n", "qU", "git.clean", "Restore file")
vsmap("n", "qc", "git.commit", "Commit")
vsmap("n", "qp", "git.push", "Push")
vsmap("n", "qP", "git.pushForce", "Force push")
vsmap("n", "qB", "editor.action.toggleBlame", "Toggle blame")

-- VS Code-only git extensions (no terminal-nvim equivalent in keymaps.lua;
-- these chords no-op in terminal nvim by design — see migration spec)
vsmap("n", "qf", "git.fetch", "Git fetch")
vsmap("n", "qs", "git.stash", "Git stash")
vsmap("n", "qS", "git.stashPop", "Git stash pop")
vsmap("n", "ql", "git-graph.view", "Git graph")
vsmap({ "n", "v" }, "qy", "extension.copyGitHubLinkToClipboard", "Copy GitHub link")
vsmap({ "n", "v" }, "qY", "extension.openInGitHub", "Open in GitHub")
vsmap("n", "qr", "extension.openPrGitProvider", "Open PR")
vsmap("n", "qn", "pr.goToNextDiffInPr", "Next PR diff")
vsmap("n", "qN", "pr.goToPreviousDiffInPr", "Prev PR diff")

-- ──────────────────────────────────────────────────────────────────────────
-- TOGGLE / PANELS (t-prefix VS Code-only — chrome dispatches that override
-- the terminal-nvim t* chords from keymaps.lua. Without these, te/tg/tt/to/td
-- would call snacks/aerial/trouble which don't load in VS Code.)
-- ──────────────────────────────────────────────────────────────────────────
vsmap("n", "te", "workbench.files.action.focusFilesExplorer", "File explorer")
vsmap("n", "tg", "workbench.view.scm", "SCM panel")
vsmap("n", "tt", "workbench.action.terminal.focus", "Terminal")
vsmap("n", "to", "outline.focus", "Outline")
vsmap("n", "td", "workbench.panel.markers.view.focus", "Diagnostics")
vsmap("n", "tD", "jason.toggleProblemsVisibility", "Toggle problems visibility")
vsmap("n", "tP", "workbench.action.closePanel", "Close panel")
vsmap("n", "th", "editor.action.toggleInlayHints", "Toggle inlay hints")
vsmap("n", "tc", "jason.toggleCodeLens", "Toggle code lens")
vsmap("n", "tw", "editor.action.toggleWordWrap", "Toggle word wrap")
vsmap("n", "tb", "editor.action.toggleBlame", "Toggle blame")

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
