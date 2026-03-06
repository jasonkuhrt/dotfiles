local M = {}

local blocklist = require("cmd_ux.blocklist")

---@class CommandCache
---@field exact table<string, boolean>?
---@field names string[]?
local command_cache = {
  exact = nil,
  names = nil,
}

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

function M.trim(text)
  return (tostring(text or ""):gsub("^%s+", ""):gsub("%s+$", ""))
end

function M.split_words(text)
  local result = {}
  for token in tostring(text or ""):gmatch("%S+") do
    result[#result + 1] = token
  end
  return result
end

function M.slice(list, start_index)
  local result = {}
  for index = start_index, #list do
    result[#result + 1] = list[index]
  end
  return result
end

---@param name string
---@return boolean
function M.has_exact_command(name)
  if name == "" then
    return false
  end
  if not command_cache.exact or not command_cache.names then
    M.get_command_names("")
  end
  return command_cache.exact[name] == true
end

---@param prefix? string
---@return string[]
function M.get_command_names(prefix)
  if not command_cache.exact or not command_cache.names then
    local names = blocklist.filter_commands(vim.fn.getcompletion("", "command"))
    local exact = {}
    for _, name in ipairs(names) do
      exact[name] = true
    end
    table.sort(names)
    command_cache.exact = exact
    command_cache.names = names
  end

  if not prefix or prefix == "" then
    return command_cache.names or {}
  end

  local escaped = vim.pesc(prefix)
  local result = {}
  for _, name in ipairs(command_cache.names or {}) do
    if name:find("^" .. escaped) ~= nil then
      result[#result + 1] = name
    end
  end
  return result
end

function M.invalidate_command_cache()
  command_cache.exact = nil
  command_cache.names = nil
end

function M.get_user_command(name)
  local commands = vim.api.nvim_get_commands({})
  return commands[name]
end

function M.parse_command(name)
  local ok, parsed = pcall(vim.api.nvim_parse_cmd, name, {})
  if not ok then
    return nil
  end
  return parsed
end

function M.get_completion_type(line)
  local ok, completion_type = pcall(vim.fn.getcompletiontype, line)
  if not ok then
    return ""
  end
  return completion_type or ""
end

function M.get_cmdline_matches(line)
  local ok, matches = pcall(vim.fn.getcompletion, line, "cmdline")
  if not ok then
    return {}
  end
  return matches or {}
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

function M.bool_text(value)
  return value and "yes" or "no"
end

function M.indent(lines, prefix)
  local result = {}
  for _, line in ipairs(lines) do
    result[#result + 1] = prefix .. line
  end
  return result
end

return M
