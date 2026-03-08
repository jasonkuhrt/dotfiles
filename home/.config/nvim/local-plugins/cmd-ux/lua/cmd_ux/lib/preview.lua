local strings = require("kit.strings")
local learning = require("cmd_ux.lib.learning")

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
  lines[#lines + 1] = "Executable now: " .. strings.bool_text(state.executable == true)
  lines[#lines + 1] = "Safety: " .. (state.safety or "safe")

  local shortcut_count = 0
  for _, item in ipairs(state.frontier or {}) do
    if item.lane == "shortcut" then
      shortcut_count = shortcut_count + 1
    end
  end
  if shortcut_count > 0 then
    lines[#lines + 1] = ("Shortcut lane: %d promoted path%s"):format(shortcut_count, shortcut_count == 1 and "" or "s")
  end

  for _, line in ipairs(learning.preview_lines(state)) do
    lines[#lines + 1] = line
  end

  if state.slots and #state.slots > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Slots:"
    for index, slot in ipairs(state.slots) do
      local value = state.slot_values and state.slot_values[index] or ""
      local detail = slot.desc ~= "" and (" - " .. slot.desc) or ""
      lines[#lines + 1] = ("- <%s:%s>%s"):format(slot.name, slot.kind ~= "" and slot.kind or "value", detail)
      if value ~= "" then
        lines[#lines + 1] = "  current: " .. value
        if slot.validate then
          local ok, reason = slot.validate(value)
          lines[#lines + 1] = "  valid: " .. strings.bool_text(ok)
          if not ok and reason and reason ~= "" then
            lines[#lines + 1] = "  reason: " .. reason
          end
        end
        if slot.preview then
          local preview = slot.preview(value)
          local preview_lines = type(preview) == "string" and vim.split(preview, "\n", { plain = true })
            or (type(preview) == "table" and preview or {})
          for _, preview_line in ipairs(preview_lines) do
            lines[#lines + 1] = "  " .. preview_line
          end
        end
      end
    end
  end

  if state.refusal_reason and state.refusal_reason ~= "" then
    lines[#lines + 1] = "Refusal: " .. state.refusal_reason
  end

  if state.outcome and #state.outcome > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Outcome:"
    for _, line in ipairs(state.outcome) do
      lines[#lines + 1] = "- " .. line
    end
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
      local lane = item.lane == "shortcut" and " [shortcut]" or ""
      local detail = item.desc ~= "" and (" - " .. item.desc) or ""
      lines[#lines + 1] = "- " .. item.label .. lane .. detail
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
