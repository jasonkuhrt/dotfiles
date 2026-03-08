local debug = require("cmd_ux.lib.debug")
local git = require("cmd_ux.lib.git")
local lsp = require("cmd_ux.lib.lsp")
local picker = require("cmd_ux.lib.picker")
local session = require("cmd_ux.lib.session")
local test = require("cmd_ux.lib.test")

local M = {}

local function current_path()
  local path = vim.api.nvim_buf_get_name(0)
  if path == "" then
    return nil
  end
  return path
end

local function current_word()
  local word = vim.fn.expand("<cword>")
  if type(word) ~= "string" or word == "" then
    return nil
  end
  return word
end

local function current_buffer_label()
  local path = current_path()
  return path and vim.fn.fnamemodify(path, ":~:.") or "[No Name]"
end

---@param register fun(spec: CmdUxCapabilitySpec)
function M.register_all(register)
  register({
    id = "buffer.next",
    label = "Next buffer",
    desc = "Focus the next listed buffer.",
    safety = "reversible",
    preview = function()
      return { "Operation: bnext" }
    end,
    execute = function()
      vim.cmd("bnext")
    end,
  })

  register({
    id = "buffer.previous",
    label = "Previous buffer",
    desc = "Focus the previous listed buffer.",
    safety = "reversible",
    preview = function()
      return { "Operation: bprevious" }
    end,
    execute = function()
      vim.cmd("bprevious")
    end,
  })

  register({
    id = "buffer.first",
    label = "First buffer",
    desc = "Focus the first listed buffer.",
    safety = "reversible",
    execute = function()
      vim.cmd("bfirst")
    end,
  })

  register({
    id = "buffer.last",
    label = "Last buffer",
    desc = "Focus the last listed buffer.",
    safety = "reversible",
    execute = function()
      vim.cmd("blast")
    end,
  })

  register({
    id = "pane.balance",
    label = "Balance panes",
    desc = "Equalize pane sizes in the current tab.",
    safety = "reversible",
    available = function()
      return #vim.api.nvim_tabpage_list_wins(0) > 1, "Only one pane is open."
    end,
    execute = function()
      vim.cmd("wincmd =")
    end,
  })

  register({
    id = "pane.close_current",
    label = "Close current pane",
    desc = "Close the current pane.",
    safety = "reversible",
    available = function()
      return #vim.api.nvim_tabpage_list_wins(0) > 1, "Only one pane is open."
    end,
    preview = function()
      return { ("Current pane buffer: %s"):format(current_buffer_label()) }
    end,
    execute = function()
      vim.cmd("close")
    end,
  })

  register({
    id = "pane.focus_left",
    label = "Focus left pane",
    desc = "Move focus to the pane on the left.",
    safety = "reversible",
    execute = function()
      require("cmd_ux.providers.pane").execute("focus left")
    end,
  })

  register({
    id = "pane.focus_down",
    label = "Focus lower pane",
    desc = "Move focus to the pane below.",
    safety = "reversible",
    execute = function()
      require("cmd_ux.providers.pane").execute("focus down")
    end,
  })

  register({
    id = "pane.focus_up",
    label = "Focus upper pane",
    desc = "Move focus to the pane above.",
    safety = "reversible",
    execute = function()
      require("cmd_ux.providers.pane").execute("focus up")
    end,
  })

  register({
    id = "pane.focus_right",
    label = "Focus right pane",
    desc = "Move focus to the pane on the right.",
    safety = "reversible",
    execute = function()
      require("cmd_ux.providers.pane").execute("focus right")
    end,
  })

  register({
    id = "pane.resize_left",
    label = "Resize pane left",
    desc = "Resize the current pane toward the left.",
    safety = "reversible",
    execute = function()
      require("cmd_ux.providers.pane").execute("resize left")
    end,
  })

  register({
    id = "pane.resize_down",
    label = "Resize pane down",
    desc = "Resize the current pane downward.",
    safety = "reversible",
    execute = function()
      require("cmd_ux.providers.pane").execute("resize down")
    end,
  })

  register({
    id = "pane.resize_up",
    label = "Resize pane up",
    desc = "Resize the current pane upward.",
    safety = "reversible",
    execute = function()
      require("cmd_ux.providers.pane").execute("resize up")
    end,
  })

  register({
    id = "pane.resize_right",
    label = "Resize pane right",
    desc = "Resize the current pane toward the right.",
    safety = "reversible",
    execute = function()
      require("cmd_ux.providers.pane").execute("resize right")
    end,
  })

  register({
    id = "pane.split_below",
    label = "Split below",
    desc = "Create a horizontal split below the current pane.",
    safety = "reversible",
    execute = function()
      require("cmd_ux.providers.pane").execute("split below")
    end,
  })

  register({
    id = "pane.split_right",
    label = "Split right",
    desc = "Create a vertical split to the right of the current pane.",
    safety = "reversible",
    execute = function()
      require("cmd_ux.providers.pane").execute("split right")
    end,
  })

  register({
    id = "tab.close_current",
    label = "Close current tab",
    desc = "Close the current tab.",
    safety = "reversible",
    available = function()
      return #vim.api.nvim_list_tabpages() > 1, "Only one tab is open."
    end,
    execute = function()
      vim.cmd("tabclose")
    end,
  })

  register({
    id = "tab.new",
    label = "New tab",
    desc = "Open a new tab.",
    safety = "reversible",
    execute = function()
      vim.cmd("tabnew")
    end,
  })

  register({
    id = "tab.next",
    label = "Next tab",
    desc = "Focus the next tab.",
    safety = "reversible",
    execute = function()
      vim.cmd("tabnext")
    end,
  })

  register({
    id = "tab.previous",
    label = "Previous tab",
    desc = "Focus the previous tab.",
    safety = "reversible",
    execute = function()
      vim.cmd("tabprevious")
    end,
  })

  register({
    id = "tab.first",
    label = "First tab",
    desc = "Focus the first tab.",
    safety = "reversible",
    execute = function()
      vim.cmd("tabfirst")
    end,
  })

  register({
    id = "tab.last",
    label = "Last tab",
    desc = "Focus the last tab.",
    safety = "reversible",
    execute = function()
      vim.cmd("tablast")
    end,
  })

  register({
    id = "tab.move_left",
    label = "Move tab left",
    desc = "Move the current tab left.",
    safety = "reversible",
    execute = function()
      vim.cmd("-tabmove")
    end,
  })

  register({
    id = "tab.move_right",
    label = "Move tab right",
    desc = "Move the current tab right.",
    safety = "reversible",
    execute = function()
      vim.cmd("+tabmove")
    end,
  })

  register({
    id = "search.files_project",
    label = "Project files",
    desc = "Search project files.",
    safety = "safe",
    execute = function()
      picker.run("files", "Search")
    end,
  })

  register({
    id = "search.files_git",
    label = "Git files",
    desc = "Search git-tracked files.",
    safety = "safe",
    execute = function()
      picker.run("git_files", "Search")
    end,
  })

  register({
    id = "search.files_buffers",
    label = "Open buffers",
    desc = "Search open buffers.",
    safety = "safe",
    execute = function()
      picker.run("buffers", "Search")
    end,
  })

  register({
    id = "search.files_recent",
    label = "Recent files",
    desc = "Search recent files.",
    safety = "safe",
    execute = function()
      picker.run("recent", "Search")
    end,
  })

  register({
    id = "search.files_projects",
    label = "Projects",
    desc = "Search known projects.",
    safety = "safe",
    execute = function()
      picker.run("projects", "Search")
    end,
  })

  register({
    id = "search.project_text",
    label = "Project text",
    desc = "Search project text.",
    safety = "safe",
    execute = function()
      picker.run("grep", "Search")
    end,
  })

  register({
    id = "search.commands",
    label = "Commands",
    desc = "Search Vim commands.",
    safety = "safe",
    execute = function()
      picker.run("commands", "Search")
    end,
  })

  register({
    id = "search.command_history",
    label = "Command history",
    desc = "Search command history.",
    safety = "safe",
    execute = function()
      picker.run("command_history", "Search")
    end,
  })

  register({
    id = "search.undo",
    label = "Undo history",
    desc = "Search undo states.",
    safety = "reversible",
    execute = function()
      picker.run("undo", "Search")
    end,
  })

  register({
    id = "search.todo",
    label = "Todo comments",
    desc = "Search TODO and related comments.",
    safety = "safe",
    execute = function()
      picker.run("todo_comments", "Search")
    end,
  })

  register({
    id = "search.symbols_workspace",
    label = "Workspace symbols",
    desc = "Search workspace symbols.",
    safety = "safe",
    available = function()
      return lsp.supports("workspace/symbol"), "Workspace symbols are unavailable."
    end,
    execute = function()
      picker.run("lsp_workspace_symbols", "Search")
    end,
  })

  register({
    id = "search.references",
    label = "References picker",
    desc = "Search references for the current symbol.",
    safety = "safe",
    available = function()
      return current_word() ~= nil and lsp.supports("textDocument/references"), "References are unavailable."
    end,
    execute = function()
      picker.run("lsp_references", "Search")
    end,
  })

  register({
    id = "git.status",
    label = "Git status",
    desc = "Browse git status entries.",
    safety = "safe",
    available = function()
      return git.in_repo(), "Current buffer is not in a git repo."
    end,
    preview = function()
      return {
        "Repo: " .. vim.fn.fnamemodify(git.root() or "", ":t"),
        "Branch: " .. (git.branch() or "unknown"),
      }
    end,
    execute = function()
      git.run_picker("git_status")
    end,
  })

  register({
    id = "git.branches",
    label = "Git branches",
    desc = "Browse git branches.",
    safety = "safe",
    available = function()
      return git.in_repo(), "Current buffer is not in a git repo."
    end,
    execute = function()
      git.run_picker("git_branches")
    end,
  })

  register({
    id = "git.history",
    label = "Git history",
    desc = "Browse project git history.",
    safety = "safe",
    available = function()
      return git.in_repo(), "Current buffer is not in a git repo."
    end,
    execute = function()
      git.run_picker("git_log")
    end,
  })

  register({
    id = "git.history_file",
    label = "File git history",
    desc = "Browse git history for the current file.",
    safety = "safe",
    available = function()
      return git.in_repo() and current_path() ~= nil, "Current buffer is not a tracked file."
    end,
    preview = function()
      return { "File: " .. current_buffer_label() }
    end,
    execute = function()
      git.run_picker("git_log_file")
    end,
  })

  register({
    id = "git.history_line",
    label = "Line git history",
    desc = "Browse git history for the current line.",
    safety = "safe",
    available = function()
      return git.in_repo() and current_path() ~= nil, "Current buffer is not a tracked file."
    end,
    execute = function()
      git.run_picker("git_log_line")
    end,
  })

  register({
    id = "git.hunk_next",
    label = "Next hunk",
    desc = "Jump to the next git hunk.",
    safety = "reversible",
    available = function()
      return git.has_changes(), "No git hunks are available."
    end,
    execute = function()
      git.run_gitsigns("next_hunk")
    end,
  })

  register({
    id = "git.hunk_previous",
    label = "Previous hunk",
    desc = "Jump to the previous git hunk.",
    safety = "reversible",
    available = function()
      return git.has_changes(), "No git hunks are available."
    end,
    execute = function()
      git.run_gitsigns("prev_hunk")
    end,
  })

  register({
    id = "git.hunk_preview",
    label = "Preview hunk",
    desc = "Preview the current git hunk.",
    safety = "safe",
    available = function()
      return git.has_changes(), "No git hunks are available."
    end,
    execute = function()
      git.run_gitsigns("preview_hunk")
    end,
  })

  register({
    id = "git.hunk_stage",
    label = "Stage hunk",
    desc = "Stage the current git hunk.",
    safety = "reversible",
    available = function()
      return git.has_changes(), "No git hunks are available."
    end,
    preview = function()
      local status = git.status() or {}
      return {
        "Repo: " .. vim.fn.fnamemodify(git.root() or "", ":t"),
        "File: " .. current_buffer_label(),
        ("Status: +%d ~%d -%d"):format(status.added or 0, status.changed or 0, status.removed or 0),
      }
    end,
    execute = function()
      git.run_gitsigns("stage_hunk")
    end,
  })

  register({
    id = "git.hunk_reset",
    label = "Reset hunk",
    desc = "Reset the current git hunk.",
    safety = "destructive",
    available = function()
      return git.has_changes(), "No git hunks are available."
    end,
    preview = function()
      return {
        "File: " .. current_buffer_label(),
        "Operation: discard the current hunk",
      }
    end,
    execute = function()
      git.run_gitsigns("reset_hunk")
    end,
  })

  register({
    id = "git.blame_line",
    label = "Blame line",
    desc = "Show blame for the current line.",
    safety = "safe",
    available = function()
      return git.in_repo(), "Current buffer is not in a git repo."
    end,
    execute = function()
      git.run_gitsigns("blame_line")
    end,
  })

  register({
    id = "test.run_nearest",
    label = "Run nearest test",
    desc = "Run the nearest test.",
    safety = "reversible",
    available = function()
      return test.available(), "Neotest is unavailable."
    end,
    preview = function()
      return { "Scope: nearest test", "File: " .. current_buffer_label() }
    end,
    execute = function()
      test.with_neotest(function(neotest)
        neotest.run.run()
      end)
    end,
  })

  register({
    id = "test.run_file",
    label = "Run test file",
    desc = "Run the current test file.",
    safety = "reversible",
    available = function()
      return test.available() and current_path() ~= nil, "Current file is unavailable."
    end,
    preview = function()
      return { "File: " .. current_buffer_label() }
    end,
    execute = function()
      test.with_neotest(function(neotest)
        neotest.run.run(current_path())
      end)
    end,
  })

  register({
    id = "test.run_project",
    label = "Run project tests",
    desc = "Run tests for the current project.",
    safety = "reversible",
    available = function()
      return test.available(), "Neotest is unavailable."
    end,
    execute = function()
      test.with_neotest(function(neotest)
        neotest.run.run(vim.fn.getcwd())
      end)
    end,
  })

  register({
    id = "test.run_last",
    label = "Run last test",
    desc = "Repeat the last test run.",
    safety = "reversible",
    available = function()
      return test.available() and test.has_last_run(), "No previous test run exists."
    end,
    execute = function()
      test.with_neotest(function(neotest)
        neotest.run.run_last()
      end)
    end,
  })

  register({
    id = "test.debug_nearest",
    label = "Debug nearest test",
    desc = "Run the nearest test with a debug strategy.",
    safety = "reversible",
    available = function()
      return test.available(), "Neotest is unavailable."
    end,
    execute = function()
      test.with_neotest(function(neotest)
        neotest.run.run({ strategy = "dap" })
      end)
    end,
  })

  register({
    id = "test.summary_toggle",
    label = "Toggle test summary",
    desc = "Open or close the test summary view.",
    safety = "safe",
    available = function()
      return test.available(), "Neotest is unavailable."
    end,
    execute = function()
      test.with_neotest(function(neotest)
        neotest.summary.toggle()
      end)
    end,
  })

  register({
    id = "test.output_open",
    label = "Open test output",
    desc = "Open the output for the nearest or last test.",
    safety = "safe",
    available = function()
      return test.available(), "Neotest is unavailable."
    end,
    execute = function()
      test.with_neotest(function(neotest)
        neotest.output.open({ enter = true })
      end)
    end,
  })

  register({
    id = "test.output_panel_toggle",
    label = "Toggle test output panel",
    desc = "Toggle the persistent output panel.",
    safety = "safe",
    available = function()
      return test.available(), "Neotest is unavailable."
    end,
    execute = function()
      test.with_neotest(function(neotest)
        neotest.output_panel.toggle()
      end)
    end,
  })

  register({
    id = "test.jump_next_failed",
    label = "Next failed test",
    desc = "Jump to the next failed test.",
    safety = "reversible",
    available = function()
      return test.available(), "Neotest is unavailable."
    end,
    execute = function()
      test.with_neotest(function(neotest)
        neotest.jump.next({ status = "failed" })
      end)
    end,
  })

  register({
    id = "test.jump_prev_failed",
    label = "Previous failed test",
    desc = "Jump to the previous failed test.",
    safety = "reversible",
    available = function()
      return test.available(), "Neotest is unavailable."
    end,
    execute = function()
      test.with_neotest(function(neotest)
        neotest.jump.prev({ status = "failed" })
      end)
    end,
  })

  register({
    id = "test.watch_toggle",
    label = "Toggle watch",
    desc = "Toggle watch mode for the current file.",
    safety = "reversible",
    available = function()
      return test.available() and current_path() ~= nil, "Current file is unavailable."
    end,
    execute = function()
      test.with_neotest(function(neotest)
        neotest.watch.toggle(current_path())
      end)
    end,
  })

  register({
    id = "test.stop",
    label = "Stop tests",
    desc = "Stop the active test run.",
    safety = "reversible",
    available = function()
      return test.available(), "Neotest is unavailable."
    end,
    execute = function()
      test.with_neotest(function(neotest)
        neotest.run.stop()
      end)
    end,
  })

  register({
    id = "debug.continue",
    label = "Continue debug session",
    desc = "Continue or start the debug session.",
    safety = "reversible",
    available = function()
      return debug.available(), "Debug adapter is unavailable."
    end,
    execute = function()
      debug.with_debugger(function(dap)
        dap.continue()
      end)
    end,
  })

  register({
    id = "debug.run_to_cursor",
    label = "Run to cursor",
    desc = "Continue execution to the cursor position.",
    safety = "reversible",
    available = function()
      return debug.available() and debug.session_active(), "No stopped debug session is active."
    end,
    execute = function()
      debug.with_debugger(function(dap)
        dap.run_to_cursor()
      end)
    end,
  })

  register({
    id = "debug.breakpoint_toggle",
    label = "Toggle breakpoint",
    desc = "Toggle a breakpoint at the current line.",
    safety = "reversible",
    available = function()
      return debug.available(), "Debug adapter is unavailable."
    end,
    preview = function()
      local line = vim.api.nvim_win_get_cursor(0)[1]
      return {
        "File: " .. current_buffer_label(),
        ("Line: %d"):format(line),
      }
    end,
    execute = function()
      debug.with_debugger(function(dap)
        dap.toggle_breakpoint()
      end)
    end,
  })

  register({
    id = "debug.step_over",
    label = "Step over",
    desc = "Step over the next expression.",
    safety = "reversible",
    available = function()
      return debug.available() and debug.session_active(), "No debug session is active."
    end,
    execute = function()
      debug.with_debugger(function(dap)
        dap.step_over()
      end)
    end,
  })

  register({
    id = "debug.step_into",
    label = "Step into",
    desc = "Step into the next call.",
    safety = "reversible",
    available = function()
      return debug.available() and debug.session_active(), "No debug session is active."
    end,
    execute = function()
      debug.with_debugger(function(dap)
        dap.step_into()
      end)
    end,
  })

  register({
    id = "debug.step_out",
    label = "Step out",
    desc = "Step out of the current frame.",
    safety = "reversible",
    available = function()
      return debug.available() and debug.session_active(), "No debug session is active."
    end,
    execute = function()
      debug.with_debugger(function(dap)
        dap.step_out()
      end)
    end,
  })

  register({
    id = "debug.terminate",
    label = "Terminate debug session",
    desc = "Terminate the active debug session.",
    safety = "destructive",
    available = function()
      return debug.available() and debug.session_active(), "No debug session is active."
    end,
    execute = function()
      debug.with_debugger(function(dap)
        dap.terminate()
      end)
    end,
  })

  register({
    id = "debug.disconnect",
    label = "Disconnect debugger",
    desc = "Disconnect the active debugger.",
    safety = "destructive",
    available = function()
      return debug.available() and debug.session_active(), "No debug session is active."
    end,
    execute = function()
      debug.with_debugger(function(dap)
        dap.disconnect()
      end)
    end,
  })

  register({
    id = "debug.repl_toggle",
    label = "Toggle debug REPL",
    desc = "Open or close the DAP REPL.",
    safety = "safe",
    available = function()
      return debug.available(), "Debug adapter is unavailable."
    end,
    execute = function()
      debug.with_debugger(function(dap)
        dap.repl.toggle()
      end)
    end,
  })

  register({
    id = "debug.ui_toggle",
    label = "Toggle debug UI",
    desc = "Open or close the DAP UI layout.",
    safety = "safe",
    available = function()
      return debug.available() and debug.dapui() ~= nil, "DAP UI is unavailable."
    end,
    execute = function()
      debug.with_debugger(function(_, dapui)
        dapui.toggle()
      end)
    end,
  })

  register({
    id = "session.save",
    label = "Save session",
    desc = "Persist the current session.",
    safety = "reversible",
    available = function()
      return session.available(), "Session persistence is unavailable."
    end,
    preview = function()
      return { "Session: " .. (session.current() or "current working tree") }
    end,
    execute = function()
      session.with_persistence(function(persistence)
        persistence.save()
      end)
    end,
  })

  register({
    id = "session.restore",
    label = "Restore session",
    desc = "Restore the current project session.",
    safety = "reversible",
    available = function()
      return session.available(), "Session persistence is unavailable."
    end,
    execute = function()
      session.with_persistence(function(persistence)
        persistence.load()
      end)
    end,
  })

  register({
    id = "session.restore_last",
    label = "Restore last session",
    desc = "Restore the most recent session.",
    safety = "reversible",
    available = function()
      return session.available() and #session.list() > 0, "No sessions are available."
    end,
    execute = function()
      session.with_persistence(function(persistence)
        persistence.load({ last = true })
      end)
    end,
  })

  register({
    id = "session.select",
    label = "Select session",
    desc = "Pick a saved session.",
    safety = "reversible",
    available = function()
      return session.available() and #session.list() > 0, "No sessions are available."
    end,
    execute = function()
      session.with_persistence(function(persistence)
        persistence.select()
      end)
    end,
  })

  register({
    id = "session.stop",
    label = "Stop session persistence",
    desc = "Stop session autosave for this editor instance.",
    safety = "destructive",
    available = function()
      return session.available() and session.active(), "Session persistence is already stopped."
    end,
    execute = function()
      session.with_persistence(function(persistence)
        persistence.stop()
      end)
    end,
  })

  register({
    id = "project.files",
    label = "Project files",
    desc = "Browse project files.",
    safety = "safe",
    execute = function()
      picker.run("files", "Project")
    end,
  })

  register({
    id = "project.grep",
    label = "Project grep",
    desc = "Search project text.",
    safety = "safe",
    execute = function()
      picker.run("grep", "Project")
    end,
  })

  register({
    id = "project.switch",
    label = "Switch project",
    desc = "Open the project picker.",
    safety = "reversible",
    execute = function()
      picker.run("projects", "Project")
    end,
  })

  register({
    id = "project.recent",
    label = "Recent project files",
    desc = "Browse recent files in the current project.",
    safety = "safe",
    execute = function()
      picker.run("recent", "Project")
    end,
  })

  register({
    id = "marks.browse",
    label = "Browse marks",
    desc = "Browse editor marks.",
    safety = "reversible",
    execute = function()
      picker.run("marks", "Marks")
    end,
  })

  register({
    id = "registers.browse",
    label = "Browse registers",
    desc = "Browse Vim registers.",
    safety = "reversible",
    execute = function()
      picker.run("registers", "Registers")
    end,
  })
end

return M
