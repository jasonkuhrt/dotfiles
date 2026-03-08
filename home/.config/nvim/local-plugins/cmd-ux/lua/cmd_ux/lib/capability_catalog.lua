local capabilities = require("cmd_ux.lib.capabilities")
local extended = require("cmd_ux.lib.capability_catalog_extended")
local context = require("cmd_ux.lib.context")
local lsp = require("cmd_ux.lib.lsp")

local M = {}

local did_register = false

local function current_path()
  local path = vim.api.nvim_buf_get_name(0)
  if path == "" then
    return nil
  end
  return path
end

local function current_filetype()
  return vim.bo[vim.api.nvim_get_current_buf()].filetype
end

local function current_word()
  local word = vim.fn.expand("<cword>")
  if type(word) ~= "string" or word == "" then
    return nil
  end
  return word
end

local function is_normal_file_buffer()
  return vim.bo[vim.api.nvim_get_current_buf()].buftype == "" and current_path() ~= nil
end

local function is_modified()
  return vim.bo[vim.api.nvim_get_current_buf()].modified == true
end

local function has_modified_buffers()
  return #vim.fn.getbufinfo({ bufmodified = 1 }) > 0
end

local function listed_buffer_count()
  return #vim.fn.getbufinfo({ buflisted = 1 })
end

local function window_count()
  return #vim.api.nvim_tabpage_list_wins(0)
end

local function tab_count()
  return #vim.api.nvim_list_tabpages()
end

local function is_sourceable(path)
  local filetype = current_filetype()
  return filetype == "lua" or filetype == "vim" or path:sub(-4) == ".lua" or path:sub(-4) == ".vim"
end

local function in_config(path)
  local config_root = vim.fn.stdpath("config")
  return path:find(vim.pesc(config_root), 1) == 1
end

local function register(spec)
  capabilities.register(spec)
end

function M.register_all()
  if did_register then
    return
  end
  did_register = true

  register({
    id = "buffer.write_current",
    label = "Write current buffer",
    desc = "Save the current file.",
    help = "Write the current buffer to disk.",
    examples = { "write" },
    safety = "safe",
    available = function()
      return is_normal_file_buffer() and is_modified(), "Current buffer is not a modified file."
    end,
    preview = function()
      local path = current_path()
      if not path then
        return { "Current buffer is not a file." }
      end
      return {
        "Target: " .. vim.fn.fnamemodify(path, ":~:."),
        "Operation: write current buffer",
      }
    end,
    execute = function()
      vim.cmd("write")
    end,
  })

  register({
    id = "workspace.write_all",
    label = "Write all modified buffers",
    desc = "Save every modified listed buffer.",
    help = "Write all modified buffers without leaving the current flow.",
    examples = { "wall" },
    safety = "safe",
    available = function()
      return has_modified_buffers(), "No modified buffers are available."
    end,
    preview = function()
      return {
        ("Modified buffers: %d"):format(#vim.fn.getbufinfo({ bufmodified = 1 })),
        "Operation: write all modified buffers",
      }
    end,
    execute = function()
      vim.cmd("wall")
    end,
  })

  register({
    id = "buffer.source_current",
    label = "Source current buffer",
    desc = "Source the current Lua/Vim file.",
    help = "Run :source on the current buffer path.",
    examples = { "source %" },
    safety = "reversible",
    available = function()
      local path = current_path()
      return path ~= nil and is_sourceable(path), "Current buffer is not sourceable."
    end,
    preview = function()
      local path = current_path()
      return path and { "Source: " .. vim.fn.fnamemodify(path, ":~:.") } or {}
    end,
    execute = function()
      local path = current_path()
      if path then
        vim.cmd("source " .. vim.fn.fnameescape(path))
      end
    end,
  })

  register({
    id = "config.reload",
    label = "Reload config",
    desc = "Reload the safe subset of your Neovim config.",
    help = "Run the Config namespace reload command.",
    examples = { "Config reload" },
    safety = "reversible",
    available = function()
      local path = current_path()
      return path ~= nil and in_config(path), "Current buffer is not inside the config tree."
    end,
    preview = function()
      local ctx = context.current()
      return {
        "Scope: " .. ctx.project_id,
        "Operation: reload safe config subset",
      }
    end,
    execute = function()
      require("cmd_ux.providers.config").execute("reload")
    end,
  })

  register({
    id = "buffer.close_current",
    label = "Close current buffer",
    desc = "Close the current listed buffer.",
    help = "Run the semantic Buffer close action.",
    examples = { "Buffer close" },
    safety = "reversible",
    available = function()
      return vim.fn.buflisted(vim.api.nvim_get_current_buf()) == 1, "Current buffer is not listed."
    end,
    preview = function()
      local path = current_path()
      return {
        "Buffer: " .. (path and vim.fn.fnamemodify(path, ":~:.") or "[No Name]"),
        "Operation: close current buffer",
      }
    end,
    execute = function()
      require("cmd_ux.providers.buffer").execute("close")
    end,
  })

  register({
    id = "buffer.close_others",
    label = "Close other buffers",
    desc = "Keep the current buffer and close all other listed buffers.",
    help = "Run the semantic Buffer close-others action.",
    examples = { "Buffer close-others" },
    safety = "reversible",
    available = function()
      return listed_buffer_count() > 1, "No other listed buffers are available."
    end,
    preview = function()
      return {
        ("Listed buffers: %d"):format(listed_buffer_count()),
        "Operation: close every listed buffer except the current one",
      }
    end,
    execute = function()
      require("cmd_ux.providers.buffer").execute("close-others")
    end,
  })

  register({
    id = "buffer.alternate",
    label = "Switch to alternate buffer",
    desc = "Jump to the alternate buffer.",
    help = "Run the semantic Buffer alternate action.",
    examples = { "Buffer alternate" },
    safety = "reversible",
    available = function()
      return vim.fn.bufname("#") ~= "", "No alternate buffer is available."
    end,
    preview = function()
      local alternate = vim.fn.bufname("#")
      if alternate == "" then
        return {}
      end
      return {
        "Alternate: " .. vim.fn.fnamemodify(alternate, ":~:."),
      }
    end,
    execute = function()
      require("cmd_ux.providers.buffer").execute("alternate")
    end,
  })

  register({
    id = "window.cwd_to_buffer_dir",
    label = "Set cwd to buffer dir",
    desc = "Change the local working directory to the current buffer directory.",
    help = "Run :lcd %:p:h for the current buffer.",
    examples = { "lcd %:p:h" },
    safety = "reversible",
    available = function()
      return is_normal_file_buffer(), "Current buffer is not a normal file buffer."
    end,
    preview = function()
      local path = current_path()
      return path and { "Directory: " .. vim.fn.fnamemodify(path, ":~:.:h") } or {}
    end,
    execute = function()
      vim.cmd("lcd %:p:h")
    end,
  })

  register({
    id = "search.word_under_cursor",
    label = "Search word under cursor",
    desc = "Search the current word through the Search namespace.",
    help = "Open the Search text word flow.",
    examples = { "Search text word" },
    safety = "safe",
    available = function()
      return is_normal_file_buffer() and current_word() ~= nil, "No word under cursor is available."
    end,
    preview = function()
      local word = current_word()
      return word and { "Word: " .. word, "Scope: project text search" } or {}
    end,
    execute = function()
      require("cmd_ux.providers.search").execute("text word")
    end,
  })

  register({
    id = "search.buffer_diagnostics",
    label = "Search current-buffer diagnostics",
    desc = "Browse diagnostics for the current buffer.",
    help = "Open the Search code diagnostics-buffer flow.",
    examples = { "Search code diagnostics-buffer" },
    safety = "safe",
    available = function()
      return #vim.diagnostic.get(0) > 0, "Current buffer has no diagnostics."
    end,
    preview = function()
      return {
        ("Diagnostics: %d"):format(#vim.diagnostic.get(0)),
        "Scope: current buffer",
      }
    end,
    execute = function()
      require("cmd_ux.providers.search").execute("code diagnostics-buffer")
    end,
  })

  register({
    id = "lsp.references",
    label = "Search LSP references",
    desc = "Find references for the symbol under cursor.",
    help = "Run the semantic Lsp references action.",
    examples = { "Lsp references" },
    safety = "safe",
    available = function()
      return current_word() ~= nil and lsp.supports("textDocument/references"), "LSP references are unavailable."
    end,
    preview = function()
      local word = current_word()
      return word and { "Symbol: " .. word, "Operation: references" } or {}
    end,
    execute = function()
      require("cmd_ux.providers.lsp").execute("references")
    end,
  })

  register({
    id = "lsp.rename",
    label = "Rename symbol",
    desc = "Rename the symbol under cursor.",
    help = "Run the semantic Lsp refactor rename action.",
    examples = { "Lsp refactor rename" },
    safety = "reversible",
    available = function()
      return current_word() ~= nil and lsp.supports("textDocument/rename"), "LSP rename is unavailable."
    end,
    preview = function()
      local word = current_word()
      return word and { "Symbol: " .. word, "Operation: rename" } or {}
    end,
    execute = function()
      require("cmd_ux.providers.lsp").execute("refactor rename")
    end,
  })

  register({
    id = "lsp.code_action_all",
    label = "Show code actions",
    desc = "Open the general LSP code-action menu.",
    help = "Run the semantic Lsp refactor action all action.",
    examples = { "Lsp refactor action all" },
    safety = "safe",
    available = function()
      return lsp.supports("textDocument/codeAction"), "LSP code actions are unavailable."
    end,
    execute = function()
      require("cmd_ux.providers.lsp").execute("refactor action all")
    end,
  })

  register({
    id = "lists.loclist_open",
    label = "Open location list",
    desc = "Open the current location list.",
    help = "Run :lopen for the current window.",
    examples = { "lopen" },
    safety = "safe",
    available = function()
      return #vim.diagnostic.get(0) > 0, "Current buffer has no diagnostics."
    end,
    execute = function()
      vim.cmd("lopen")
    end,
  })

  register({
    id = "lists.quickfix_open",
    label = "Open quickfix list",
    desc = "Open the current quickfix list.",
    help = "Run :copen for the current quickfix stack.",
    examples = { "copen" },
    safety = "safe",
    available = function()
      return #vim.fn.getqflist() > 0, "Quickfix list is empty."
    end,
    execute = function()
      vim.cmd("copen")
    end,
  })

  register({
    id = "pane.only",
    label = "Keep only current pane",
    desc = "Close all other panes in the current tab.",
    help = "Run the semantic Pane only action.",
    examples = { "Pane only" },
    safety = "reversible",
    available = function()
      return window_count() > 1, "Only one pane is open."
    end,
    execute = function()
      require("cmd_ux.providers.pane").execute("only")
    end,
  })

  register({
    id = "tab.only",
    label = "Keep only current tab",
    desc = "Close all other tabs.",
    help = "Run the semantic Tab only action.",
    examples = { "Tab only" },
    safety = "reversible",
    available = function()
      return tab_count() > 1, "Only one tab is open."
    end,
    execute = function()
      require("cmd_ux.providers.tab").execute("only")
    end,
  })

  extended.register_all(register)
end

return M
