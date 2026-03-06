local target = require("file_ops.target")

local M = {}

---@param value string
---@param label string
local function copy(value, label)
  vim.fn.setreg("+", value)
  vim.notify(label .. ": " .. value)
end

function M.absolute()
  local t = target.resolve()
  if t.context == "none" then
    vim.notify("No file in current context", vim.log.levels.WARN)
    return
  end
  copy(t.path, "Absolute path")
end

function M.relative()
  local t = target.resolve()
  if t.context == "none" then
    vim.notify("No file in current context", vim.log.levels.WARN)
    return
  end
  local rel = vim.fn.fnamemodify(t.path, ":.")
  copy(rel, "Relative path")
end

function M.name()
  local t = target.resolve()
  if t.context == "none" then
    vim.notify("No file in current context", vim.log.levels.WARN)
    return
  end
  copy(t.name, "Name")
end

function M.dir_path()
  local t = target.resolve()
  if t.context == "none" then
    vim.notify("No file in current context", vim.log.levels.WARN)
    return
  end
  copy(t.dir, "Directory")
end

return M
