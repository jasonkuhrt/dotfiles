local learning = require("cmd_ux.lib.learning")

local M = {}

---@param rendered string
function M.execute_command(rendered)
  if type(rendered) ~= "string" or rendered == "" then
    return
  end

  local ok, state = pcall(require("cmd_ux.core").resolve_line, rendered)
  if ok and state and state.executable then
    learning.record_execute_state(state)
  else
    learning.record_rendered_command(rendered)
  end

  vim.cmd(rendered)
end

return M
