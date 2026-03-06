local blocklist = require("cmd_ux.blocklist")
local index = require("cmd_ux.index")
local providers = require("cmd_ux.providers")
---@type Provider
local cmdux_provider = require("cmd_ux.providers.cmdux")
---@type Provider
local config_provider = require("cmd_ux.providers.config")
---@type Provider
local lazy_provider = require("cmd_ux.providers.lazy")

local M = {}

---@class CmdUxInitModule
---@field reload fun()
---@field setup fun()
---@field open_picker fun(opts?: CmdUxSnacksOpenOpts): unknown
---@field handoff_from_cmdline fun()
---@field handle_enter fun(cmp: unknown): boolean?
---@field handle_tab fun(cmp: unknown): boolean?
---@field handle_space fun(cmp: unknown): boolean?
---@field register fun(root: string, provider: ProviderSpec|Provider): Provider

---@class CmdUxUserCommandOpts
---@field args string

local did_setup = false

---@return CmdUxSnacksModule
local function snacks_adapter()
  return require("cmd_ux.adapters.snacks")
end

---@return CmdUxExModule
local function ex_adapter()
  return require("cmd_ux.adapters.ex")
end

function M.reload()
  blocklist.reload()
  providers.invalidate()
  index.refresh()
end

function M.setup()
  if did_setup then
    return
  end
  did_setup = true

  providers.register("Cmdux", cmdux_provider)
  providers.register("Config", config_provider)
  providers.register("Lazy", lazy_provider)

  index.install_hooks()

  ---@param opts CmdUxUserCommandOpts
  vim.api.nvim_create_user_command("Config", function(opts)
    config_provider.execute(opts.args)
  end, {
    desc = "Config commands (help, reload)",
    nargs = "*",
    ---@param line string
    complete = function(_, line, _)
      return config_provider.complete(line)
    end,
    force = true,
  })

  ---@param opts CmdUxUserCommandOpts
  vim.api.nvim_create_user_command("Cmdux", function(opts)
    cmdux_provider.execute(opts.args)
  end, {
    desc = "Cmd UX commands (help, refresh)",
    nargs = "*",
    ---@param line string
    complete = function(_, line, _)
      return cmdux_provider.complete(line)
    end,
    force = true,
  })

  local group = vim.api.nvim_create_augroup("CmdUxLifecycle", { clear = true })
  vim.api.nvim_create_autocmd("BufEnter", {
    group = group,
    callback = function()
      index.invalidate()
    end,
    desc = "Invalidate cmd-ux command index on buffer scope changes",
  })
  vim.api.nvim_create_autocmd("User", {
    group = group,
    pattern = "LazyReload",
    callback = function()
      M.reload()
    end,
    desc = "Refresh cmd-ux after lazy command graph reload",
  })

  blocklist.reload()
  providers.invalidate()
  index.invalidate()
  index.get()
end

---@param opts? CmdUxSnacksOpenOpts
function M.open_picker(opts)
  return snacks_adapter().open(opts)
end

function M.handoff_from_cmdline()
  return ex_adapter().handoff_to_picker()
end

---@param cmp unknown
---@return boolean?
function M.handle_enter(cmp)
  return ex_adapter().handle_enter(cmp)
end

---@param cmp unknown
---@return boolean?
function M.handle_tab(cmp)
  return ex_adapter().handle_tab(cmp)
end

---@param cmp unknown
---@return boolean?
function M.handle_space(cmp)
  return ex_adapter().handle_space(cmp)
end

---@param root string
---@param provider ProviderSpec|Provider
---@return Provider
function M.register(root, provider)
  return providers.register(root, provider)
end

---@cast M CmdUxInitModule
return M
