local fs = require("kit.fs")

local M = {}

---@param path string
---@param payload table
function M.write_json(path, payload)
  fs.write_text(path, vim.json.encode(payload))
end

---@param path string
---@return table?
function M.read_json(path)
  local text = fs.read_text(path)
  if not text or text == "" then
    return nil
  end

  local ok, payload = pcall(vim.json.decode, text)
  if not ok or type(payload) ~= "table" then
    return nil
  end

  return payload
end

return M
