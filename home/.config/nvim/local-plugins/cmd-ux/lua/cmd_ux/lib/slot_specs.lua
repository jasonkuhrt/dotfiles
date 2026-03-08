local M = {}

---@param value string
---@return boolean, string?
local function validate_buffer_number(value)
  local bufnr = tonumber(value or "")
  if not bufnr or bufnr < 1 or vim.api.nvim_buf_is_valid(bufnr) == false or vim.fn.buflisted(bufnr) ~= 1 then
    return false, "Expected a listed buffer number."
  end
  return true, nil
end

---@param value string
---@return string[]
local function preview_buffer_number(value)
  local ok, reason = validate_buffer_number(value)
  if not ok then
    return { reason or "Invalid buffer." }
  end

  local bufnr = assert(tonumber(value))
  local name = vim.api.nvim_buf_get_name(bufnr)
  local label = name ~= "" and vim.fn.fnamemodify(name, ":~:.") or "[No Name]"
  local modified = vim.bo[bufnr].modified and "yes" or "no"
  return {
    ("Target buffer: %d"):format(bufnr),
    "Path: " .. label,
    "Modified: " .. modified,
  }
end

---@param opts? { name?: string, desc?: string, help?: string }
---@return CommandSlotSpec
function M.buffer_number(opts)
  opts = opts or {}
  return {
    name = opts.name or "buffer",
    kind = "buffer",
    required = true,
    desc = opts.desc or "Listed buffer number",
    help = opts.help or "Pick a listed buffer number.",
    validate = validate_buffer_number,
    preview = preview_buffer_number,
  }
end

---@param value string
---@return boolean, string?
local function validate_tab_number(value)
  local tabnr = tonumber(value or "")
  if not tabnr or tabnr < 1 or tabnr > #vim.api.nvim_list_tabpages() then
    return false, "Expected a valid tab number."
  end
  return true, nil
end

---@param value string
---@return string[]
local function preview_tab_number(value)
  local ok, reason = validate_tab_number(value)
  if not ok then
    return { reason or "Invalid tab." }
  end

  local tabnr = assert(tonumber(value))
  local tabpage = vim.api.nvim_list_tabpages()[tabnr]
  local wins = tabpage and vim.api.nvim_tabpage_list_wins(tabpage) or {}
  local current = vim.fn.tabpagenr() == tabnr and "yes" or "no"
  local bufname = "[No Name]"
  if wins[1] then
    local buf = vim.api.nvim_win_get_buf(wins[1])
    local path = vim.api.nvim_buf_get_name(buf)
    if path ~= "" then
      bufname = vim.fn.fnamemodify(path, ":~:.")
    end
  end

  return {
    ("Target tab: %d"):format(tabnr),
    "Primary buffer: " .. bufname,
    ("Windows: %d"):format(#wins),
    "Current tab: " .. current,
  }
end

---@param opts? { name?: string, desc?: string, help?: string }
---@return CommandSlotSpec
function M.tab_number(opts)
  opts = opts or {}
  return {
    name = opts.name or "tab",
    kind = "tab",
    required = true,
    desc = opts.desc or "Tab number",
    help = opts.help or "Pick a valid tab number.",
    validate = validate_tab_number,
    preview = preview_tab_number,
  }
end

return M
