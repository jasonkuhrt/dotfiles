local M = {}

local blocklist = require("cmd_ux.blocklist")
local nvim_commands = require("kit.nvim.commands")

M.denied_completion_types = {
  expression = true,
  lua = true,
  shellcmd = true,
  shellcmdline = true,
}

M.enumerable_completion_types = {
  arglist = true,
  augroup = true,
  buffer = true,
  color = true,
  command = true,
  compiler = true,
  diff_buffer = true,
  dir = true,
  dir_in_path = true,
  event = true,
  file = true,
  file_in_path = true,
  filetype = true,
  ["function"] = true,
  help = true,
  highlight = true,
  history = true,
  keymap = true,
  mapping = true,
  option = true,
  packadd = true,
  runtime = true,
  sign = true,
  syntax = true,
  tag = true,
  user = true,
}

---@return string[]
function M.discover_command_names()
  return blocklist.filter_commands(nvim_commands.discover_command_names())
end

function M.sort_by_label(items)
  table.sort(items, function(a, b)
    return a.label < b.label
  end)
  return items
end

function M.filter_prefix(items, prefix)
  if prefix == "" then
    return items
  end
  local escaped = vim.pesc(prefix)
  local result = {}
  for _, item in ipairs(items) do
    if item.label:find("^" .. escaped) ~= nil then
      result[#result + 1] = item
    end
  end
  return result
end

function M.render_line(parts)
  local tokens = {}
  if parts.prefix ~= "" then
    tokens[#tokens + 1] = parts.prefix
  end
  if parts.pending ~= "" then
    tokens[#tokens + 1] = parts.pending
  end
  local line = table.concat(tokens, " ")
  if parts.trailing_space and line ~= "" then
    line = line .. " "
  end
  return line
end

function M.render_command(root, accepted, pending, trailing_space)
  local prefix = root
  if #accepted > 0 then
    prefix = prefix .. " " .. table.concat(accepted, " ")
  end
  return M.render_line({
    prefix = prefix,
    pending = pending or "",
    trailing_space = trailing_space == true,
  })
end

function M.min_required_args(nargs)
  if nargs == "1" or nargs == "+" then
    return 1
  end
  return 0
end

function M.synthetic_desc(root, parsed, completion_type)
  local parts = { root ~= "" and ("Ex command `" .. root .. "`") or "Ex command" }
  if parsed and parsed.nargs and parsed.nargs ~= "0" then
    if parsed.nargs == "1" then
      parts[#parts + 1] = "needs 1 argument"
    elseif parsed.nargs == "+" then
      parts[#parts + 1] = "needs 1+ arguments"
    elseif parsed.nargs == "?" then
      parts[#parts + 1] = "takes an optional argument"
    elseif parsed.nargs == "*" then
      parts[#parts + 1] = "takes arguments"
    end
  end
  if completion_type ~= "" then
    parts[#parts + 1] = "completes " .. completion_type
  end
  return table.concat(parts, "; ")
end

return M
