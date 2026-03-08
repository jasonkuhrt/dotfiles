local M = {}

---@return table[]
function M.clients()
  local getter = vim.lsp.get_clients or vim.lsp.get_active_clients
  if type(getter) ~= "function" then
    return {}
  end

  local ok, clients = pcall(getter, { bufnr = 0 })
  if ok and type(clients) == "table" then
    return clients
  end

  ok, clients = pcall(getter)
  if ok and type(clients) == "table" then
    return clients
  end

  return {}
end

---@return boolean
function M.has_clients()
  return #M.clients() > 0
end

---@param methods string|string[]
---@return boolean
function M.supports(methods)
  local supported_methods = type(methods) == "string" and { methods } or methods
  if type(supported_methods) ~= "table" or #supported_methods == 0 then
    return false
  end

  for _, client in ipairs(M.clients()) do
    for _, method in ipairs(supported_methods) do
      local ok, supported = pcall(function()
        local supports_method = client.supports_method
        if type(supports_method) == "function" then
          return supports_method(client, method, 0)
        end
        return false
      end)
      if ok and supported then
        return true
      end
    end
  end

  return false
end

return M
