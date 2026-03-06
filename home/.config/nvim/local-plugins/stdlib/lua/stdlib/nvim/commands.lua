local M = {}

---@return string[]
function M.discover_command_names()
  local names = vim.fn.getcompletion("", "command")
  table.sort(names)
  return names
end

---@return table<string, table>
function M.get_user_commands()
  return vim.api.nvim_get_commands({})
end

---@param bufnr? integer
---@return table<string, table>
function M.get_buffer_commands(bufnr)
  return vim.api.nvim_buf_get_commands(bufnr or 0, {})
end

---@param name string
function M.get_user_command(name)
  return M.get_user_commands()[name]
end

---@param name string
---@param bufnr? integer
function M.get_buffer_command(name, bufnr)
  return M.get_buffer_commands(bufnr)[name]
end

---@param name string
function M.parse_command(name)
  local ok, parsed = pcall(vim.api.nvim_parse_cmd, name, {})
  if not ok then
    return nil
  end
  return parsed
end

---@param line string
---@return string
function M.get_completion_type(line)
  local ok, completion_type = pcall(vim.fn.getcompletiontype, line)
  if not ok then
    return ""
  end
  return completion_type or ""
end

---@param line string
---@return string[]
function M.get_cmdline_matches(line)
  local ok, matches = pcall(vim.fn.getcompletion, line, "cmdline")
  if not ok then
    return {}
  end
  return matches or {}
end

return M
