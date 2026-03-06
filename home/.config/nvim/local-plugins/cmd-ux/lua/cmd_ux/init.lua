local blocklist = require("cmd_ux.blocklist")
local index = require("cmd_ux.index")
local providers = require("cmd_ux.providers")
local cmdux_provider = require("cmd_ux.providers.cmdux")
local config_provider = require("cmd_ux.providers.config")
local lazy_provider = require("cmd_ux.providers.lazy")

local M = {}

local did_setup = false

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

  vim.api.nvim_create_user_command("Config", function(opts)
    config_provider.execute(opts.args)
  end, {
    desc = "Config commands (help, reload)",
    nargs = "*",
    complete = function(_, line, _)
      return config_provider.complete(line)
    end,
    force = true,
  })

  vim.api.nvim_create_user_command("Cmdux", function(opts)
    cmdux_provider.execute(opts.args)
  end, {
    desc = "Cmd UX commands (help, refresh)",
    nargs = "*",
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

function M.open_picker(opts)
  return require("cmd_ux.adapters.snacks").open(opts)
end

function M.handoff_from_cmdline()
  return require("cmd_ux.adapters.ex").handoff_to_picker()
end

function M.handle_enter(cmp)
  return require("cmd_ux.adapters.ex").handle_enter(cmp)
end

function M.handle_tab(cmp)
  return require("cmd_ux.adapters.ex").handle_tab(cmp)
end

function M.handle_space(cmp)
  return require("cmd_ux.adapters.ex").handle_space(cmp)
end

---@param root string
---@param provider ProviderSpec|Provider
---@return Provider
function M.register(root, provider)
  return providers.register(root, provider)
end

return M
