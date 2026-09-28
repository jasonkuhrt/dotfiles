---@diagnostic disable: undefined-field

local spy = require("luassert.spy")
local stub = require("luassert.stub")

local fixtures = require("fixtures")
local reveal = require("file_ops.commands.reveal")
local terminal = require("file_ops.commands.terminal")

describe("file_ops commands that open the containing directory", function()
  local dir
  local open_result

  before_each(function()
    dir = fixtures.temp_dir()
    fixtures.write(dir .. "/sub/a.txt", "a")
    open_result = { {}, nil }

    stub(vim, "notify")
    stub(vim.ui, "open", function()
      return unpack(open_result, 1, 2)
    end)
    Snacks = { terminal = spy.new(function() end) }
  end)

  after_each(function()
    vim.notify:revert()
    vim.ui.open:revert()
    Snacks = nil
    fixtures.reset()
    vim.fn.delete(dir, "rf")
  end)

  ---@type { name: string, enter: fun(), dir: fun(): string }[]
  local contexts = {
    {
      name = "a file buffer",
      enter = function()
        fixtures.open(dir .. "/sub/a.txt")
      end,
      dir = function()
        return dir .. "/sub"
      end,
    },
    {
      name = "mini.files",
      enter = function()
        fixtures.enter_minifiles(dir .. "/sub/a.txt")
      end,
      dir = function()
        return dir .. "/sub"
      end,
    },
    {
      name = "a buffer without a file",
      enter = fixtures.enter_scratch,
      dir = vim.fn.getcwd,
    },
  }

  for _, context in ipairs(contexts) do
    describe("from " .. context.name, function()
      before_each(function()
        context.enter()
      end)

      it("reveals the containing directory", function()
        reveal.run()

        assert.stub(vim.ui.open).was_called_with(context.dir())
        assert.stub(vim.notify).was_not_called()
      end)

      it("opens a terminal in the containing directory", function()
        terminal.run()

        assert.spy(Snacks.terminal).was_called_with(nil, { cwd = context.dir() })
      end)
    end)
  end

  it("reports when the system has no handler to reveal with", function()
    fixtures.open(dir .. "/sub/a.txt")
    local err = "vim.ui.open: no handler found (tried: wslview, explorer.exe, xdg-open, lemonade)"
    open_result = { nil, err }

    reveal.run()

    assert.stub(vim.notify).was_called_with(err, vim.log.levels.ERROR)
  end)
end)
