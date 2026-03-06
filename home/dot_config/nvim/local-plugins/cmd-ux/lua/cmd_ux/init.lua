local config_provider = require("cmd_ux.providers").config()

local M = {}

local did_setup = false

function M.setup()
  if did_setup then
    return
  end
  did_setup = true

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

return M
