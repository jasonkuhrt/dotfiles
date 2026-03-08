local runtime = require("cmd_ux.lib.runtime")
local types = require("cmd_ux.types")
local util = require("cmd_ux.util")

local M = {
  id = "flow",
}

---@class FlowAction
---@field token string
---@field desc string
---@field help string
---@field examples string[]
---@field command string

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

---@return FlowAction[]
local function actions()
  local items = {}
  local path = current_path()

  if is_normal_file_buffer() and is_modified() then
    items[#items + 1] = {
      token = "save",
      desc = "Write the current buffer",
      help = "Save the current file without leaving the current flow.",
      examples = { "Flow save" },
      command = "write",
    }
  end

  if has_modified_buffers() then
    items[#items + 1] = {
      token = "write-all",
      desc = "Write every modified buffer",
      help = "Flush all modified buffers without leaving the current command flow.",
      examples = { "Flow write-all" },
      command = "wall",
    }
  end

  if path and is_sourceable(path) then
    items[#items + 1] = {
      token = "source-buffer",
      desc = "Source the current Lua/Vim buffer",
      help = "Run :source on the current file.",
      examples = { "Flow source-buffer" },
      command = "source " .. vim.fn.fnameescape(path),
    }
  end

  if path and is_sourceable(path) and is_modified() then
    items[#items + 1] = {
      token = "save-and-source",
      desc = "Write and source the current buffer",
      help = "Save the current file first, then source it.",
      examples = { "Flow save-and-source" },
      command = "write | source " .. vim.fn.fnameescape(path),
    }
  end

  if path and in_config(path) then
    items[#items + 1] = {
      token = "config-reload",
      desc = "Run Config reload",
      help = "Reload the safe subset of your Neovim config.",
      examples = { "Flow config-reload" },
      command = "Config reload",
    }
  end

  if path and in_config(path) and is_modified() then
    items[#items + 1] = {
      token = "save-and-config-reload",
      desc = "Write the file and reload config",
      help = "Save the current config file first, then run Config reload.",
      examples = { "Flow save-and-config-reload" },
      command = "write | Config reload",
    }
  end

  if vim.fn.buflisted(vim.api.nvim_get_current_buf()) == 1 then
    items[#items + 1] = {
      token = "close-buffer",
      desc = "Close the current buffer",
      help = "Close the current buffer through the Buffer namespace.",
      examples = { "Flow close-buffer" },
      command = "Buffer close",
    }
  end

  if listed_buffer_count() > 1 then
    items[#items + 1] = {
      token = "close-other-buffers",
      desc = "Close all other listed buffers",
      help = "Keep the current buffer and close every other listed buffer.",
      examples = { "Flow close-other-buffers" },
      command = "Buffer close-others",
    }
  end

  if vim.fn.bufname("#") ~= "" then
    items[#items + 1] = {
      token = "alternate-buffer",
      desc = "Jump to the alternate buffer",
      help = "Use the Buffer namespace for alternate buffer switching.",
      examples = { "Flow alternate-buffer" },
      command = "Buffer alternate",
    }
  end

  if is_normal_file_buffer() and path then
    items[#items + 1] = {
      token = "buffer-dir",
      desc = "Change cwd to the current file directory",
      help = "Set the local working directory to the current buffer's folder.",
      examples = { "Flow buffer-dir" },
      command = "lcd %:p:h",
    }
  end

  if window_count() > 1 then
    items[#items + 1] = {
      token = "pane-only",
      desc = "Keep only the current pane",
      help = "Close all other panes through the Pane namespace.",
      examples = { "Flow pane-only" },
      command = "Pane only",
    }
  end

  if tab_count() > 1 then
    items[#items + 1] = {
      token = "tab-only",
      desc = "Keep only the current tab",
      help = "Close all other tabs through the Tab namespace.",
      examples = { "Flow tab-only" },
      command = "Tab only",
    }
  end

  if vim.diagnostic.get(0) and #vim.diagnostic.get(0) > 0 then
    items[#items + 1] = {
      token = "diagnostics",
      desc = "Open the diagnostics list",
      help = "Jump straight to the current buffer diagnostics.",
      examples = { "Flow diagnostics" },
      command = "lopen",
    }
  end

  if #vim.fn.getqflist() > 0 then
    items[#items + 1] = {
      token = "quickfix",
      desc = "Open the quickfix list",
      help = "Jump straight to the current quickfix list.",
      examples = { "Flow quickfix" },
      command = "copen",
    }
  end

  return items
end

---@param action FlowAction
---@return CommandFrontierItem
local function action_item(action)
  return types.frontier_item({
    token = action.token,
    label = action.token,
    kind = "leaf",
    desc = action.desc,
    help = action.help,
    examples = action.examples,
    executable = true,
    text = action.token .. "  " .. action.desc,
  })
end

---@param prefix string
---@return CommandFrontierItem[]
local function action_items(prefix)
  local items = {}
  for _, action in ipairs(actions()) do
    items[#items + 1] = action_item(action)
  end
  return util.filter_prefix(util.sort_by_label(items), prefix)
end

---@param token string
---@return FlowAction?
local function find_action(token)
  for _, action in ipairs(actions()) do
    if action.token == token then
      return action
    end
  end
end

---@param root string
---@return CommandNode
function M.describe_root(root)
  return types.node({
    token = root ~= "" and root or "Flow",
    kind = "namespace",
    desc = "Context-aware flow actions for the current editing state",
    help = table.concat({
      "Flow surfaces high-signal actions based on the current buffer.",
      "",
      "Examples include save, write-all, source, config reload, quickfix, alternate-buffer, and diagnostics.",
    }, "\n"),
    examples = { "Flow save", "Flow write-all", "Flow source-buffer", "Flow config-reload" },
    executable = false,
    requires_more = true,
  })
end

---@param ctx CommandSnapshot
---@return ResolutionState
function M.resolve(ctx)
  local root_node = M.describe_root(ctx.root)

  if #ctx.accepted == 0 then
    local frontier = action_items(ctx.pending)
    return types.state_from_node(root_node, {
      executable = false,
      requires_more = true,
      refusal_reason = #frontier == 0 and "No flow actions are available for the current buffer."
        or "Pick a flow action.",
      frontier = frontier,
    })
  end

  local action = find_action(ctx.accepted[1])
  if not action then
    return types.state_from_node(root_node, {
      executable = false,
      requires_more = true,
      refusal_reason = "Unknown Flow action.",
      frontier = action_items(ctx.pending),
    })
  end

  return types.state_from_node(
    types.node({
      token = action.token,
      kind = "leaf",
      desc = action.desc,
      help = action.help,
      examples = action.examples,
      executable = true,
      execute = function()
        runtime.execute_command(action.command)
      end,
    }),
    {
      executable = true,
      requires_more = false,
      frontier = {},
    }
  )
end

---@param line string
---@return string[]
function M.complete(line)
  local rest = line:match("^%s*Flow%s*(.*)$") or ""
  local trailing_space = rest:match("%s$") ~= nil
  local tokens = vim.split(vim.trim(rest), "%s+", { plain = false, trimempty = true })

  local prefix = ""
  if not trailing_space and #tokens > 0 then
    prefix = table.remove(tokens)
  end

  if #tokens > 0 then
    return {}
  end

  local result = {}
  for _, item in ipairs(action_items(prefix)) do
    result[#result + 1] = item.label
  end
  return result
end

---@param args string
function M.execute(args)
  local tokens = vim.split(vim.trim(args), "%s+", { plain = false, trimempty = true })
  local token = tokens[1]
  if not token then
    vim.notify("Flow needs a subcommand.", vim.log.levels.WARN, { title = "Flow" })
    return
  end

  local action = find_action(token)
  if not action then
    vim.notify("Unknown Flow action: " .. token, vim.log.levels.ERROR, { title = "Flow" })
    return
  end

  runtime.execute_command(action.command)
end

local provider = types.provider({
  id = M.id,
  describe_root = M.describe_root,
  resolve = M.resolve,
  complete = M.complete,
  execute = M.execute,
})

return provider
