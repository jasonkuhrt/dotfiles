local destination = require("file_ops.destination")
local target = require("file_ops.target")

local M = {}

function M.run()
  local t = target.resolve()
  if t.context == "none" then
    vim.notify("No file in current context", vim.log.levels.WARN)
    return
  end

  local stem = vim.fn.fnamemodify(t.name, ":r")
  local ext = vim.fn.fnamemodify(t.name, ":e")
  local prompt_default = ext ~= "" and stem or t.name

  vim.ui.input({ prompt = "Rename: ", default = prompt_default }, function(input)
    if not input or input == "" then
      return
    end
    local new_name = ext ~= "" and input .. "." .. ext or input
    local new_path = t.dir .. "/" .. new_name
    if destination.is_taken(t.path, new_path) then
      vim.notify(new_path .. " already exists", vim.log.levels.ERROR)
      return
    end
    Snacks.rename.rename_file({ from = t.path, to = new_path })
    target.after_mutation(t)
  end)
end

return M
