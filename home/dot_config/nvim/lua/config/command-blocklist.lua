-- Shared command blocklist: loaded once, used by Snacks picker and blink.cmp cmdline.
-- Reads Lua patterns from nvim/command-blocklist.yml (flat YAML list).
-- Validates patterns on startup (see :messages for warnings).

local M = {}

local patterns

local function parse()
  local path = vim.fn.stdpath("config") .. "/command-blocklist.yml"
  local ok, lines = pcall(vim.fn.readfile, path)
  if not ok then
    return {}
  end
  local result = {}
  for i, line in ipairs(lines) do
    local pattern = line:match('^%s*-%s*"(.-)"') or line:match("^%s*-%s*'(.-)'")
    if pattern then
      result[#result + 1] = { pattern = pattern, line = i }
    end
  end
  return result
end

local function lint(entries)
  local all_cmds = vim.fn.getcompletion("", "command")
  for _, entry in ipairs(entries) do
    -- Check for invalid Lua pattern syntax
    local ok, err = pcall(string.find, "", entry.pattern)
    if not ok then
      vim.notify(
        ("blocklist:%d: invalid pattern %q — %s"):format(entry.line, entry.pattern, err),
        vim.log.levels.WARN
      )
    else
      -- Check for dead patterns (match nothing)
      local matched = false
      for _, cmd in ipairs(all_cmds) do
        if cmd:find(entry.pattern) then
          matched = true
          break
        end
      end
      if not matched then
        vim.notify(
          ("blocklist:%d: dead pattern %q — matches no commands"):format(entry.line, entry.pattern),
          vim.log.levels.WARN
        )
      end
    end
  end
end

local function load()
  local entries = parse()
  -- Lint after startup (deferred so all plugins have registered commands)
  vim.defer_fn(function()
    lint(entries)
  end, 3000)
  local result = {}
  for _, entry in ipairs(entries) do
    result[#result + 1] = entry.pattern
  end
  return result
end

function M.is_blocked(name)
  if not patterns then
    patterns = load()
  end
  for _, pattern in ipairs(patterns) do
    if name:find(pattern) then
      return true
    end
  end
  return false
end

return M
