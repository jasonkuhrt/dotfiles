local target = require("file_ops.target")

local M = {}

function M.run()
  local t = target.resolve()
  if t.context == "none" then
    vim.notify("No file in current context", vim.log.levels.WARN)
    return
  end

  vim.ui.select({ "Yes", "No" }, { prompt = "Delete " .. t.name .. "?" }, function(choice)
    if choice ~= "Yes" then
      return
    end
    require("snacks.explorer.actions").trash(t.path)
    if t.context == "buffer" then
      Snacks.bufdelete({ file = t.path, force = true })
    end
    target.after_mutation(t)
  end)
end

return M
