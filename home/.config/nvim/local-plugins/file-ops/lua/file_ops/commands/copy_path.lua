local git = require("file_ops.git")
local target = require("file_ops.target")

local M = {}

---@param value string
---@param label string
local function copy(value, label)
  vim.fn.setreg("+", value)
  vim.notify(label .. ": " .. value)
end

---@return FileOpsTarget?
local function resolve_target()
  local t = target.resolve()
  if t.context == "none" then
    vim.notify("No file in current context", vim.log.levels.WARN)
    return nil
  end
  return t
end

---@return FileOpsTarget?
local function resolve_buffer_target()
  local t = resolve_target()
  if not t then
    return nil
  end

  if t.context ~= "buffer" then
    vim.notify("Current buffer line copy requires a file buffer", vim.log.levels.WARN)
    return nil
  end

  return t
end

---@param value string
---@return string
local function with_line(value)
  return ("%s:%d"):format(value, vim.api.nvim_win_get_cursor(0)[1])
end

---@param label string
---@param resolver fun(target: FileOpsTarget): string?, string?
---@param opts? { buffer_only?: boolean }
local function copy_resolved(label, resolver, opts)
  local t = opts and opts.buffer_only and resolve_buffer_target() or resolve_target()
  if not t then
    return
  end

  local value, err = resolver(t)
  if not value then
    vim.notify(err or ("Unable to copy " .. label:lower()), vim.log.levels.WARN)
    return
  end

  copy(value, label)
end

function M.absolute()
  copy_resolved("Absolute path", function(t)
    return t.path
  end)
end

function M.absolute_line()
  copy_resolved("Absolute path + line", function(t)
    return with_line(t.path)
  end, { buffer_only = true })
end

function M.relative()
  copy_resolved("Relative path", function(t)
    return vim.fn.fnamemodify(t.path, ":.")
  end)
end

function M.project()
  copy_resolved("Project path", function(t)
    local rel = git.relative_to_repo_root(t.path)
    if not rel then
      return nil, "Current target is not inside a git repository"
    end
    return rel
  end)
end

function M.project_line()
  copy_resolved("Project path + line", function(t)
    local rel = git.relative_to_repo_root(t.path)
    if not rel then
      return nil, "Current buffer is not inside a git repository"
    end
    return with_line(rel)
  end, { buffer_only = true })
end

function M.github_link()
  copy_resolved("GitHub link", function(t)
    return git.github_blob_url(t.path)
  end)
end

function M.github_link_line()
  copy_resolved("GitHub link + line", function(t)
    return git.github_blob_url(t.path, { line = vim.api.nvim_win_get_cursor(0)[1] })
  end, { buffer_only = true })
end

function M.github_permalink()
  copy_resolved("GitHub permalink", function(t)
    return git.github_blob_url(t.path, { permalink = true })
  end)
end

function M.github_permalink_line()
  copy_resolved("GitHub permalink + line", function(t)
    return git.github_blob_url(t.path, {
      line = vim.api.nvim_win_get_cursor(0)[1],
      permalink = true,
    })
  end, { buffer_only = true })
end

function M.name()
  copy_resolved("Name", function(t)
    return t.name
  end)
end

function M.dir_path()
  copy_resolved("Directory", function(t)
    return t.dir
  end)
end

return M
