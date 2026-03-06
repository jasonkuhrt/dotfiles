local util = require("cmd_ux.util")

local M = {}

---@param state ResolutionState
---@return string
function M.build(state)
  local lines = {}

  if state.root then
    lines[#lines + 1] = "Breadcrumb: " .. state.rendered_display
    lines[#lines + 1] = ""
  end

  lines[#lines + 1] = "Kind: " .. (state.kind or "unknown")
  lines[#lines + 1] = "Executable now: " .. util.bool_text(state.executable == true)

  if state.refusal_reason and state.refusal_reason ~= "" then
    lines[#lines + 1] = "Refusal: " .. state.refusal_reason
  end

  if state.desc and state.desc ~= "" then
    lines[#lines + 1] = ""
    lines[#lines + 1] = state.desc
  end

  if state.help and state.help ~= "" then
    lines[#lines + 1] = ""
    for _, line in ipairs(vim.split(state.help, "\n", { plain = true })) do
      lines[#lines + 1] = line
    end
  end

  if state.frontier and #state.frontier > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Next valid choices:"
    for _, item in ipairs(state.frontier) do
      local detail = item.desc ~= "" and (" - " .. item.desc) or ""
      lines[#lines + 1] = "- " .. item.label .. detail
    end
  end

  if state.examples and #state.examples > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Examples:"
    for _, example in ipairs(state.examples) do
      lines[#lines + 1] = "- " .. example
    end
  end

  return table.concat(lines, "\n")
end

return M
