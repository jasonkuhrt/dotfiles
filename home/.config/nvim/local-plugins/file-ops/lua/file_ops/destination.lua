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

---Whether `path` lies below `directory`. Parents are compared by inode, so a
---path that reaches `directory` through a symlink or a letter-case variant counts.
---@param path string
---@param directory string
---@return boolean
function M.is_inside(path, directory)
  local ancestor = vim.uv.fs_stat(directory)
  if not ancestor or ancestor.type ~= "directory" then
    return false
  end

  for parent in vim.fs.parents(path) do
    local stat = vim.uv.fs_stat(parent)
    if stat and stat.ino == ancestor.ino and stat.dev == ancestor.dev then
      return true
    end
  end
  return false
end

return M
