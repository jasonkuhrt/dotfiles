local picker = require("cmd_ux.lib.picker")

local M = {}

---@return string?
function M.current_path()
  local path = vim.api.nvim_buf_get_name(0)
  if path == "" then
    return nil
  end
  return path
end

---@return string?
function M.root()
  local path = M.current_path() or vim.fn.getcwd()
  local git_dir = vim.fn.finddir(".git", path .. ";")
  if git_dir == "" then
    return nil
  end
  return vim.fn.fnamemodify(git_dir, ":p:h")
end

---@return boolean
function M.in_repo()
  return M.root() ~= nil
end

---@return string?
function M.branch()
  if not M.in_repo() then
    return nil
  end
  local branch = vim.fn.systemlist("git branch --show-current")[1]
  if vim.v.shell_error ~= 0 or type(branch) ~= "string" or branch == "" then
    return nil
  end
  return branch
end

---@return table?
function M.status()
  local status = vim.b.gitsigns_status_dict
  return type(status) == "table" and status or nil
end

---@return boolean
function M.has_changes()
  local status = M.status()
  if not status then
    return false
  end
  return (tonumber(status.added) or 0) > 0 or (tonumber(status.changed) or 0) > 0 or (tonumber(status.removed) or 0) > 0
end

---@return table?
function M.gitsigns()
  local ok, module = pcall(require, "gitsigns")
  if ok and type(module) == "table" then
    return module
  end
end

---@param method string
function M.run_gitsigns(method)
  local module = M.gitsigns()
  local fn = module and rawget(module, method)
  if type(fn) ~= "function" then
    vim.notify(("Gitsigns method is unavailable: %s"):format(method), vim.log.levels.ERROR, { title = "Git" })
    return
  end
  fn()
end

---@param method string
function M.run_picker(method)
  picker.run(method, "Git")
end

return M
