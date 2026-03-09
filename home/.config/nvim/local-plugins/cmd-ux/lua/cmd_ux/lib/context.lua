local M = {}

---@class CmdUxContextVector
---@field project_id string
---@field surface string
---@field surface_detail string
---@field buftype string
---@field filetype string
---@field mode string
---@field path string
---@field legacy_key string
---@field exact_key string
---@field facet_keys string[]
---@field display string

---@param values string[]
---@return string[]
local function dedupe(values)
  local seen = {}
  local result = {}
  for _, value in ipairs(values or {}) do
    if type(value) == "string" and value ~= "" and not seen[value] then
      seen[value] = true
      result[#result + 1] = value
    end
  end
  return result
end

---@return string
function M.project_id()
  local cwd = vim.fn.fnamemodify(vim.fn.getcwd(), ":p")
  local git_marks = vim.fs.find(".git", {
    path = cwd,
    upward = true,
    limit = 1,
  })
  if git_marks[1] then
    return vim.fn.fnamemodify(vim.fs.dirname(git_marks[1]), ":p")
  end
  return cwd
end

---@return CmdUxContextVector
function M.current()
  local buf = vim.api.nvim_get_current_buf()
  local win = vim.api.nvim_get_current_win()
  local buftype = vim.bo[buf].buftype
  local filetype = vim.bo[buf].filetype
  local path = vim.api.nvim_buf_get_name(buf)
  local mode = vim.api.nvim_get_mode().mode:sub(1, 1)

  local surface = "buffer"
  local surface_detail = "buffer"
  local legacy_key = "buffer"

  if filetype == "minifiles" then
    surface = "panel"
    surface_detail = "minifiles"
    legacy_key = "panel:minifiles"
  elseif filetype == "qf" then
    surface = "panel"
    local wininfo = vim.fn.getwininfo(win)[1] or {}
    surface_detail = wininfo.loclist == 1 and "loclist" or "quickfix"
    legacy_key = "panel:" .. surface_detail
  elseif filetype == "help" then
    surface = "panel"
    surface_detail = "help"
    legacy_key = "panel:help"
  elseif filetype ~= "" and filetype:find("^snacks") ~= nil then
    surface = "panel"
    surface_detail = filetype
    legacy_key = "panel:" .. filetype
  elseif buftype == "terminal" then
    surface = "panel"
    surface_detail = "terminal"
    legacy_key = "panel:terminal"
  elseif buftype ~= "" then
    surface = "special"
    surface_detail = buftype
    legacy_key = "buftype:" .. buftype
  elseif path ~= "" then
    local config_root = vim.fn.stdpath("config")
    if path:find(vim.pesc(config_root), 1) == 1 then
      surface = "config"
      surface_detail = "file"
      if filetype ~= "" then
        legacy_key = "config:filetype:" .. filetype
      else
        legacy_key = "config:file"
      end
    else
      surface = "file"
      surface_detail = "file"
      if filetype ~= "" then
        legacy_key = "filetype:" .. filetype
      else
        legacy_key = "file"
      end
    end
  elseif filetype ~= "" then
    surface = "file"
    surface_detail = "buffer"
    legacy_key = "filetype:" .. filetype
  end

  local exact_key = table.concat({
    "surface:" .. surface,
    "detail:" .. surface_detail,
    "filetype:" .. (filetype ~= "" and filetype or "*"),
    "buftype:" .. (buftype ~= "" and buftype or "*"),
    "mode:" .. (mode ~= "" and mode or "*"),
  }, "|")

  local facet_keys = dedupe({
    legacy_key,
    "surface:" .. surface,
    "surface:" .. surface .. "|detail:" .. surface_detail,
    "filetype:" .. (filetype ~= "" and filetype or "*"),
    "surface:" .. surface .. "|filetype:" .. (filetype ~= "" and filetype or "*"),
    "buftype:" .. (buftype ~= "" and buftype or "*"),
    "mode:" .. (mode ~= "" and mode or "*"),
  })

  return {
    project_id = M.project_id(),
    surface = surface,
    surface_detail = surface_detail,
    buftype = buftype,
    filetype = filetype,
    mode = mode,
    path = path,
    legacy_key = legacy_key,
    exact_key = exact_key,
    facet_keys = facet_keys,
    display = table.concat({
      "surface=" .. surface,
      "detail=" .. surface_detail,
      "filetype=" .. (filetype ~= "" and filetype or "*"),
      "buftype=" .. (buftype ~= "" and buftype or "*"),
      "mode=" .. (mode ~= "" and mode or "*"),
    }, " "),
  }
end

return M
