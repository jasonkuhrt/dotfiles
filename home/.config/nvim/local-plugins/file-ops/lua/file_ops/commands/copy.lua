local destination = require("file_ops.destination")
local target = require("file_ops.target")

local M = {}

function M.run()
  local t = target.resolve()
  if t.context == "none" then
    vim.notify("No file in current context", vim.log.levels.WARN)
    return
  end

  vim.ui.input({ prompt = "Copy to: ", completion = "file" }, function(input)
    if not input or input == "" then
      return
    end
    local to = vim.fn.fnamemodify(input, ":p")
    if vim.fn.isdirectory(to) == 1 then
      to = vim.fs.joinpath(to, t.name)
    end
    if vim.uv.fs_stat(to) then
      vim.notify(to .. " already exists", vim.log.levels.ERROR)
      return
    end
    if destination.is_inside(to, t.path) then
      vim.notify(("Cannot copy %s into itself"):format(t.path), vim.log.levels.ERROR)
      return
    end
    Snacks.picker.util.copy_path(t.path, to)
    -- Snacks reports a refused copy itself and returns nothing either way.
    if vim.uv.fs_stat(to) then
      target.after_mutation(t)
    end
  end)
end

return M
