---@class LinkOpenModule
---@field extract_at fun(line: string, col1: integer): string?
---@field open_under_cursor fun(): boolean
---@field open_under_cursor_or_jump_older fun()

local M = {}

---@param col1 integer
---@param start_col integer
---@param end_col integer
---@return boolean
local function cursor_in_range(col1, start_col, end_col)
  return col1 >= start_col and col1 <= end_col
end

---@param text string
---@return string
local function trim(text)
  return (text:gsub("^%s+", ""):gsub("%s+$", ""))
end

---@param text string
---@return string
local function strip_trailing_punctuation(text)
  while #text > 0 do
    local last = text:sub(-1)
    if last == "." or last == "," or last == ";" then
      text = text:sub(1, -2)
    elseif last == ")" then
      local opens = select(2, text:gsub("%(", ""))
      local closes = select(2, text:gsub("%)", ""))
      if closes > opens then
        text = text:sub(1, -2)
      else
        break
      end
    elseif last == "]" then
      local opens = select(2, text:gsub("%[", ""))
      local closes = select(2, text:gsub("%]", ""))
      if closes > opens then
        text = text:sub(1, -2)
      else
        break
      end
    elseif last == "}" then
      local opens = select(2, text:gsub("{", ""))
      local closes = select(2, text:gsub("}", ""))
      if closes > opens then
        text = text:sub(1, -2)
      else
        break
      end
    else
      break
    end
  end

  return text
end

---@param target string
---@return boolean
local function is_uri(target)
  return target:match("^https?://") ~= nil or target:match("^mailto:") ~= nil or target:match("^file://") ~= nil
end

---@param target string
---@return boolean
local function is_web_uri(target)
  return target:match("^https?://") ~= nil
end

---@param target string
---@return boolean
local function is_localish_target(target)
  return target:sub(1, 1) == "#"
    or target:sub(1, 1) == "/"
    or target:match("^%.%./") ~= nil
    or target:match("^%./") ~= nil
    or target:find("/") ~= nil
end

---@param match string
---@return string?
local function parse_markdown_target(match)
  if match:sub(1, 1) == "!" then
    match = match:sub(2)
  end

  local raw_target = match:match("^%b[]%((.*)%)$")
  if not raw_target then
    return nil
  end

  raw_target = trim(raw_target)
  if raw_target == "" then
    return nil
  end

  if raw_target:sub(1, 1) == "<" then
    return raw_target:match("^<([^>]+)>")
  end

  return raw_target:match("^([^%s]+)")
end

---@param line string
---@param col1 integer
---@return string?
local function extract_markdown_link(line, col1)
  local from = 1

  while true do
    local start_col, end_col = line:find("%b[]%b()", from)
    if not start_col then
      return nil
    end
    ---@cast end_col integer

    if cursor_in_range(col1, start_col, end_col) then
      return parse_markdown_target(line:sub(start_col, end_col))
    end

    from = start_col + 1
  end
end

---@param line string
---@param col1 integer
---@return string?
local function extract_angle_uri(line, col1)
  for start_col, match, end_exclusive in line:gmatch("()(<[%a][%w+.-]*:[^>]+>)()") do
    local start_col_num = tonumber(start_col)
    local end_exclusive_num = tonumber(end_exclusive)
    if start_col_num and end_exclusive_num and cursor_in_range(col1, start_col_num, end_exclusive_num - 1) then
      return match:sub(2, -2)
    end
  end

  return nil
end

---@param line string
---@param col1 integer
---@return string?
local function extract_jsdoc_link(line, col1)
  for start_col, match, end_exclusive in line:gmatch("()({@link[%a]*%s+[^}]+})()") do
    local start_col_num = tonumber(start_col)
    local end_exclusive_num = tonumber(end_exclusive)
    if start_col_num and end_exclusive_num and cursor_in_range(col1, start_col_num, end_exclusive_num - 1) then
      local raw_target = match:match("{@link[%a]*%s+([^}]+)}")
      if not raw_target then
        return nil
      end

      raw_target = trim(raw_target):match("^([^%s|]+)")
      if raw_target and (is_uri(raw_target) or is_localish_target(raw_target)) then
        return raw_target
      end
    end
  end

  return nil
end

---@param line string
---@param col1 integer
---@return string?
local function extract_raw_uri(line, col1)
  local patterns = {
    "https://%S+",
    "http://%S+",
    "mailto:%S+",
    "file://%S+",
  }

  for _, pattern in ipairs(patterns) do
    for start_col, match, _ in line:gmatch("()(" .. pattern .. ")()") do
      local start_col_num = tonumber(start_col)
      local target = strip_trailing_punctuation(match)
      if start_col_num then
        local target_end_col = start_col_num + #target - 1
        if cursor_in_range(col1, start_col_num, target_end_col) then
          return target
        end
      end
    end
  end

  return nil
end

---@param text string
---@return string
local function heading_slug(text)
  return (
    text:lower():gsub("`", ""):gsub("[^%w%s-]", ""):gsub("%s+", "-"):gsub("%-+", "-"):gsub("^%-+", ""):gsub("%-+$", "")
  )
end

---@param fragment string
---@return boolean
local function jump_to_heading(fragment)
  local wanted = heading_slug(fragment)
  if wanted == "" then
    return false
  end

  for line_nr = 1, vim.api.nvim_buf_line_count(0) do
    local heading = vim.api.nvim_buf_get_lines(0, line_nr - 1, line_nr, false)[1]:match("^#+%s+(.+)$")
    if heading and heading_slug(heading) == wanted then
      vim.api.nvim_win_set_cursor(0, { line_nr, 0 })
      vim.cmd("normal! zz")
      return true
    end
  end

  return false
end

---@param target string
---@return string?, string?
local function resolve_local_target(target)
  if target:sub(1, 1) == "#" then
    return vim.api.nvim_buf_get_name(0), target:sub(2)
  end

  if is_uri(target) then
    return nil, nil
  end

  local path, fragment = target:match("^([^#]+)#?(.*)$")
  if not path or path == "" then
    return nil, nil
  end

  local absolute_path = path
  if absolute_path:sub(1, 1) ~= "/" then
    absolute_path = vim.fs.normalize(vim.fs.dirname(vim.api.nvim_buf_get_name(0)) .. "/" .. path)
  end

  return absolute_path, fragment ~= "" and fragment or nil
end

---@return boolean
local function in_cmux()
  return vim.env.CMUX_WORKSPACE_ID ~= nil and vim.env.CMUX_WORKSPACE_ID ~= "" and vim.fn.executable("cmux") == 1
end

---@param target string
---@return boolean, string?
local function open_in_cmux_browser(target)
  local result = vim
    .system({
      "cmux",
      "browser",
      "open",
      target,
    }, { text = true })
    :wait()

  return result.code == 0, result.stderr
end

---@param target string
---@return boolean, string?
local function open_external(target)
  if is_web_uri(target) and in_cmux() then
    local opened, err = open_in_cmux_browser(target)
    if opened then
      return true, nil
    end

    vim.notify(
      "cmux browser open failed, falling back to system opener" .. (err and err ~= "" and (": " .. trim(err)) or ""),
      vim.log.levels.WARN
    )
  end

  local opener = nil
  if vim.fn.has("mac") == 1 and vim.fn.executable("open") == 1 then
    opener = { "open", target }
  elseif vim.fn.executable("xdg-open") == 1 then
    opener = { "xdg-open", target }
  elseif vim.fn.executable("wslview") == 1 then
    opener = { "wslview", target }
  end

  if not opener then
    return false, "No system opener available"
  end

  return vim.fn.jobstart(opener, { detach = true }) > 0, nil
end

---@param line string
---@param col1 integer
---@return string?
function M.extract_at(line, col1)
  return extract_markdown_link(line, col1)
    or extract_angle_uri(line, col1)
    or extract_jsdoc_link(line, col1)
    or extract_raw_uri(line, col1)
end

---@return boolean
function M.open_under_cursor()
  local line = vim.api.nvim_get_current_line()
  local col1 = vim.api.nvim_win_get_cursor(0)[2] + 1
  local target = M.extract_at(line, col1)
  if not target then
    return false
  end

  if target:match("^file://") then
    local absolute_path = vim.uri_to_fname(target)
    if vim.uv.fs_stat(absolute_path) then
      vim.cmd.edit(vim.fn.fnameescape(absolute_path))
      return true
    end
  end

  local absolute_path, fragment = resolve_local_target(target)
  if absolute_path and vim.uv.fs_stat(absolute_path) then
    vim.cmd.edit(vim.fn.fnameescape(absolute_path))
    if fragment then
      jump_to_heading(fragment)
    end
    return true
  end

  if absolute_path and not vim.uv.fs_stat(absolute_path) then
    vim.notify("Linked file not found: " .. absolute_path, vim.log.levels.WARN)
    return true
  end

  local opened, err = open_external(target)
  if not opened then
    vim.notify(err or ("Could not open link: " .. target), vim.log.levels.ERROR)
    return false
  end

  return true
end

function M.open_under_cursor_or_jump_older()
  if M.open_under_cursor() then
    return
  end

  local keys = (vim.v.count > 0 and tostring(vim.v.count) or "") .. vim.keycode("<C-o>")
  vim.cmd.normal({ bang = true, args = { keys } })
end

---@cast M LinkOpenModule
return M
