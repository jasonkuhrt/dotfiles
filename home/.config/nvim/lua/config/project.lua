local M = {}

local snacks_sources = { "files", "grep", "explorer" }
local project_config_path = ".nvim/config.json"

local state = {
  errors = {},
  snacks_base_exclude = nil,
}

local function notify_once(key, message)
  if state.errors[key] then
    return
  end
  state.errors[key] = true
  vim.notify(message, vim.log.levels.ERROR, { title = "project config" })
end

---@param values string[]?
---@param extras string[]
---@return string[]
local function merge_unique(values, extras)
  local merged = {}
  local seen = {}

  for _, value in ipairs(values or {}) do
    if type(value) == "string" and not seen[value] then
      seen[value] = true
      merged[#merged + 1] = value
    end
  end

  for _, value in ipairs(extras) do
    if not seen[value] then
      seen[value] = true
      merged[#merged + 1] = value
    end
  end

  return merged
end

---@param path string
---@param field string
---@param value unknown
---@return string[]
local function normalize_string_list(path, field, value)
  if value == nil then
    return {}
  end

  if type(value) ~= "table" then
    notify_once(path .. ":" .. field, ("%s must be a list of strings in %s"):format(field, path))
    return {}
  end

  local normalized = {}
  for index, item in ipairs(value) do
    if type(item) ~= "string" then
      notify_once(path .. ":" .. field, ("%s[%d] must be a string in %s"):format(field, index, path))
      return {}
    end
    normalized[#normalized + 1] = item
  end

  return normalized
end

---@param cwd? string
---@return string?
function M.find_path(cwd)
  return vim.fs.find(project_config_path, {
    path = cwd or vim.uv.cwd() or ".",
    upward = true,
    type = "file",
  })[1]
end

---@param cwd? string
---@return table
function M.read(cwd)
  local path = M.find_path(cwd)
  if not path then
    return {}
  end

  local ok_read, lines = pcall(vim.fn.readfile, path)
  if not ok_read then
    notify_once(path, ("failed to read %s: %s"):format(path, lines))
    return {}
  end

  local ok, result = pcall(vim.json.decode, table.concat(lines, "\n"))
  if not ok then
    notify_once(path, ("invalid JSON in %s: %s"):format(path, result))
    return {}
  end

  if result == nil then
    return {}
  end

  if type(result) ~= "table" then
    notify_once(path, ("project config must decode to a JSON object: %s"):format(path))
    return {}
  end

  return result
end

---@param cwd? string
---@return string[]
function M.snacks_picker_exclude(cwd)
  local path = M.find_path(cwd)
  if not path then
    return {}
  end

  local config = M.read(cwd)
  local snacks = type(config.snacks) == "table" and config.snacks or nil
  local picker = snacks and type(snacks.picker) == "table" and snacks.picker or nil

  return normalize_string_list(path, "snacks.picker.exclude", picker and picker.exclude or nil)
end

---@param opts table
function M.capture_snacks_base_opts(opts)
  local sources = opts.sources or {}
  state.snacks_base_exclude = {}

  for _, source in ipairs(snacks_sources) do
    state.snacks_base_exclude[source] = vim.deepcopy((sources[source] or {}).exclude or {})
  end
end

---@param opts table
---@param cwd? string
function M.merge_snacks_picker_opts(opts, cwd)
  opts.sources = opts.sources or {}

  if not state.snacks_base_exclude then
    M.capture_snacks_base_opts(opts)
  end

  local excludes = M.snacks_picker_exclude(cwd)
  for _, source in ipairs(snacks_sources) do
    opts.sources[source] = opts.sources[source] or {}
    opts.sources[source].exclude = merge_unique(state.snacks_base_exclude[source], excludes)
  end
end

---@param cwd? string
function M.apply_snacks_runtime(cwd)
  if not package.loaded["snacks"] or not state.snacks_base_exclude then
    return
  end

  ---@diagnostic disable-next-line: undefined-field
  local picker = require("snacks").config.picker
  picker.sources = picker.sources or {}

  local excludes = M.snacks_picker_exclude(cwd)
  for _, source in ipairs(snacks_sources) do
    picker.sources[source] = picker.sources[source] or {}
    picker.sources[source].exclude = merge_unique(state.snacks_base_exclude[source], excludes)
  end
end

function M.setup_snacks_runtime_sync()
  local group = vim.api.nvim_create_augroup("ProjectSnacksConfig", { clear = true })
  vim.api.nvim_create_autocmd({ "VimEnter", "DirChanged" }, {
    group = group,
    callback = function()
      M.apply_snacks_runtime()
    end,
  })
end

return M
