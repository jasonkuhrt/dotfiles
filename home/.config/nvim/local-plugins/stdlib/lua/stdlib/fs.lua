local dir = require("pl.dir")
local pathx = require("pl.path")

local M = {}

---@param file_path string
---@return integer
function M.mtime_sec(file_path)
  return pathx.getmtime(file_path) or 0
end

---@param file_path string
---@param text string
function M.write_text(file_path, text)
  local parent = pathx.dirname(file_path)
  if parent ~= "" and parent ~= "." then
    dir.makepath(parent)
  end
  vim.fn.writefile({ text }, file_path)
end

---@param file_path string
---@return string?
function M.read_text(file_path)
  local ok, lines = pcall(vim.fn.readfile, file_path)
  if not ok or not lines[1] then
    return nil
  end
  return table.concat(lines, "\n")
end

return M
