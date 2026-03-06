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
    Snacks.picker.util.copy_path(t.path, to)
    target.after_mutation(t)
  end)
end

return M
