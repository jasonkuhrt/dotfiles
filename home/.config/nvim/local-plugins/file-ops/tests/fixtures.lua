local spy = require("luassert.spy")

local M = {}

---@return string
function M.temp_dir()
  local dir = vim.uv.fs_realpath(vim.fs.dirname(vim.fn.tempname())) .. "/file-ops-" .. vim.uv.hrtime()
  vim.fn.mkdir(dir, "p")
  return dir
end

---@param path string
---@param content string
function M.write(path, content)
  vim.fn.mkdir(vim.fs.dirname(path), "p")
  vim.fn.writefile({ content }, path)
end

---@param path string
---@return string
function M.read(path)
  return table.concat(vim.fn.readfile(path), "\n")
end

---@param path string
function M.open(path)
  vim.cmd({ cmd = "edit", args = { path } })
end

---Make the current window a mini.files explorer with its cursor on `path`.
---@param path string
function M.enter_minifiles(path)
  vim.api.nvim_set_current_buf(vim.api.nvim_create_buf(false, true))
  vim.bo.filetype = "minifiles"
  MiniFiles = {
    get_fs_entry = function()
      return {
        fs_type = vim.fn.isdirectory(path) == 1 and "directory" or "file",
        name = vim.fs.basename(path),
        path = path,
      }
    end,
    synchronize = spy.new(function() end),
  }
end

---Make the current window show a buffer that has no file.
function M.enter_scratch()
  vim.api.nvim_set_current_buf(vim.api.nvim_create_buf(false, true))
end

---Undo every context change the functions above make.
function M.reset()
  MiniFiles = nil
  pcall(vim.cmd, "%bwipeout!")
end

return M
