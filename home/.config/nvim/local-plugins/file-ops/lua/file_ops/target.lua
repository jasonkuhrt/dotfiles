local M = {}

---@class FileOpsTarget
---@field path? string
---@field dir? string
---@field name? string
---@field context "minifiles"|"buffer"|"none"

---@return FileOpsTarget
function M.resolve()
  if vim.bo.filetype == "minifiles" then
    local entry = MiniFiles.get_fs_entry()
    if entry then
      return {
        path = entry.path,
        dir = vim.fs.dirname(entry.path),
        name = entry.name,
        context = "minifiles",
      }
    end
  end

  local bufname = vim.api.nvim_buf_get_name(0)
  if bufname ~= "" and vim.uv.fs_stat(bufname) then
    return {
      path = bufname,
      dir = vim.fs.dirname(bufname),
      name = vim.fs.basename(bufname),
      context = "buffer",
    }
  end

  return { context = "none" }
end

---The directory a command works in: `path` itself when it is a directory, the
---directory that holds it otherwise, and the current working directory without one.
---@param path? string
---@return string
function M.working_dir(path)
  if not path then
    return vim.fn.getcwd()
  end

  local stat = vim.uv.fs_stat(path)
  return stat and stat.type == "directory" and path or vim.fs.dirname(path)
end

---@param target FileOpsTarget
function M.after_mutation(target)
  if target.context == "minifiles" then
    MiniFiles.synchronize()
  end
end

return M
