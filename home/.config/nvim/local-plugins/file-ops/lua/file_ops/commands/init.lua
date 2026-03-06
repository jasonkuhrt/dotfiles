local strings = require("kit.strings")

local M = {}

---@type table<string, fun()>
local subcommands = {
  ["copy-path"] = function()
    require("file_ops.commands.copy_path").absolute()
  end,
  ["copy-path-relative"] = function()
    require("file_ops.commands.copy_path").relative()
  end,
  ["copy-name"] = function()
    require("file_ops.commands.copy_path").name()
  end,
  ["copy-dir-path"] = function()
    require("file_ops.commands.copy_path").dir_path()
  end,
  ["delete"] = function()
    require("file_ops.commands.delete").run()
  end,
  ["rename"] = function()
    require("file_ops.commands.rename").run()
  end,
  ["move"] = function()
    require("file_ops.commands.move").run()
  end,
  ["copy"] = function()
    require("file_ops.commands.copy").run()
  end,
  ["duplicate"] = function()
    require("file_ops.commands.duplicate").run()
  end,
  ["new"] = function()
    require("file_ops.commands.new").run()
  end,
  ["reveal"] = function()
    require("file_ops.commands.reveal").run()
  end,
  ["terminal"] = function()
    require("file_ops.commands.terminal").run()
  end,
}

---@return string[]
local function subcommand_names()
  local names = vim.tbl_keys(subcommands)
  table.sort(names)
  return names
end

---@param args string
function M.execute(args)
  local words = strings.split_words(strings.trim(args))
  local name = words[1]

  if not name or name == "" then
    vim.ui.select(subcommand_names(), { prompt = "File operation:" }, function(choice)
      if choice then
        subcommands[choice]()
      end
    end)
    return
  end

  local handler = subcommands[name]
  if not handler then
    vim.notify("Unknown file command: " .. name, vim.log.levels.ERROR)
    return
  end

  handler()
end

---@param line string
---@return string[]
function M.complete(line)
  local words = strings.split_words(line)
  -- If we're still typing the first arg after "File"
  local prefix = #words <= 2 and (words[2] or "") or ""
  return vim.tbl_filter(function(name)
    return vim.startswith(name, prefix)
  end, subcommand_names())
end

return M
