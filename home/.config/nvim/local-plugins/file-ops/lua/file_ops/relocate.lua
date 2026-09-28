local destination = require("file_ops.destination")
local target = require("file_ops.target")

local M = {}

---The ordinary file buffers with unsaved changes to the file at `path`, under
---any spelling of its path. Special buffers are never written: for an acwrite
---buffer, a write can accept a proposed diff or publish a review.
---@param path string
---@return integer[]
local function unsaved_buffers(path)
  return vim.tbl_filter(function(buf)
    local name = vim.api.nvim_buf_get_name(buf)
    return vim.bo[buf].buftype == "" and vim.bo[buf].modified and name ~= "" and destination.is_same(name, path)
  end, vim.api.nvim_list_bufs())
end

---@param path string
---@return boolean saved, string? err
local function save(path)
  for _, buf in ipairs(unsaved_buffers(path)) do
    local ok, err = pcall(vim.api.nvim_buf_call, buf, function()
      vim.cmd("silent update")
    end)
    -- A write can also end without an error and without saving, as when a
    -- prompt about the file having changed on disk is declined.
    if not ok or vim.bo[buf].modified then
      return false, err or "it still has unsaved changes"
    end
  end
  return true
end

---Moves the target to `to` with `Snacks.rename.rename_file()`, which tells LSP
---clients and replaces the file's buffer with one read from `to`. Replacing it
---drops unsaved changes, so they are written first, and nothing moves when that fails.
---@param t FileOpsTarget
---@param to string
function M.run(t, to)
  local saved, err = save(t.path)
  if not saved then
    vim.notify(("Could not save %s\n%s"):format(t.path, err), vim.log.levels.ERROR)
    return
  end

  Snacks.rename.rename_file({ from = t.path, to = to })
  target.after_mutation(t)
end

return M
