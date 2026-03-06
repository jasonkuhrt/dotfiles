local commands = require("file_ops.commands")

local M = {}

function M.setup()
  vim.api.nvim_create_user_command("File", function(opts)
    commands.execute(opts.args)
  end, {
    desc = "File operations (rename, delete, move, copy, ...)",
    nargs = "?",
    complete = function(_, line)
      return commands.complete(line)
    end,
    force = true,
  })
end

return M
