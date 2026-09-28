local M = {}

---@param a uv.fs_stat.result
---@param b uv.fs_stat.result
---@return boolean
local function same_inode(a, b)
  return a.ino == b.ino and a.dev == b.dev
end

---Whether `a` and `b` name the same existing file. They are compared by inode,
---so a path that reaches the file through a symlink, or that differs in letter
---case on a case-insensitive filesystem, counts.
---@param a string
---@param b string
---@return boolean
function M.is_same(a, b)
  local a_stat, b_stat = vim.uv.fs_stat(a), vim.uv.fs_stat(b)
  return a_stat ~= nil and b_stat ~= nil and same_inode(a_stat, b_stat)
end

---A destination that is the source itself is free: on a case-insensitive
---filesystem a rename that only changes letter case resolves to the same file.
---@param from string
---@param to string
---@return boolean
function M.is_taken(from, to)
  return vim.uv.fs_stat(to) ~= nil and not M.is_same(from, to)
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
    if stat and same_inode(stat, ancestor) then
      return true
    end
  end
  return false
end

---Where moving or copying `from` to `to` puts it, as with mv and cp: inside `to`
---under `from`'s name when `to` is an existing directory other than `from`
---itself, or does not exist and ends in a slash; at `to` otherwise.
---@param from string
---@param to string
---@return string
function M.resolve(from, to)
  local path = vim.fs.normalize(vim.fn.fnamemodify(to, ":p"), { expand_env = false })
  local into
  if vim.uv.fs_stat(path) then
    into = vim.fn.isdirectory(path) == 1 and not M.is_same(from, path)
  else
    into = vim.endswith(to, "/")
  end
  return into and vim.fs.joinpath(path, vim.fs.basename(from)) or path
end

return M
