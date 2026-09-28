local M = {}

---A destination that is the source itself is free: on a case-insensitive
---filesystem a rename that only changes letter case resolves to the same file.
---@param from string
---@param to string
---@return boolean
function M.is_taken(from, to)
  local destination = vim.uv.fs_stat(to)
  if not destination then
    return false
  end

  local source = vim.uv.fs_stat(from)
  return not (source and source.ino == destination.ino and source.dev == destination.dev)
end

return M
