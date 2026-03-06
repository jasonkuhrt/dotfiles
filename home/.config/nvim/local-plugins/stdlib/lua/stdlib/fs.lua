local M = {}
local uv = vim.uv or vim.loop

---@param path string
---@return integer
function M.mtime_sec(path)
  local stat = uv.fs_stat(path)
  if not stat or not stat.mtime then
    return 0
  end
  return stat.mtime.sec or 0
end

---@param path string
---@param text string
function M.write_text(path, text)
  vim.fn.mkdir(vim.fn.fnamemodify(path, ":h"), "p")
  vim.fn.writefile({ text }, path)
end

---@param path string
---@return string?
function M.read_text(path)
  local ok, lines = pcall(vim.fn.readfile, path)
  if not ok or not lines[1] then
    return nil
  end
  return table.concat(lines, "\n")
end

return M
