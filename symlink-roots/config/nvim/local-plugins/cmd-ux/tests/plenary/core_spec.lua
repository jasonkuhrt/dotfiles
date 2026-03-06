---@diagnostic disable: undefined-field, undefined-global

local eq = assert.are.same

local cmd_ux = require("cmd_ux")
local core = require("cmd_ux.core")
local index = require("cmd_ux.index")

local function ensure_setup()
  cmd_ux.setup()
end

local function drop_user_command(name)
  pcall(vim.api.nvim_del_user_command, name)
end

local function sync_cmd_ux()
  cmd_ux.reload()
end

local function create_structured_test_command(name)
  drop_user_command(name)
  vim.api.nvim_create_user_command(name, function() end, {
    nargs = "*",
    desc = "Structured custom completion command for cmd-ux tests",
    complete = function(arglead, line, _)
      if line:match("^" .. name .. "%s+alpha%s+") then
        return vim.tbl_filter(function(item)
          return item:find("^" .. vim.pesc(arglead)) ~= nil
        end, { "one", "two" })
      end

      return vim.tbl_filter(function(item)
        return item:find("^" .. vim.pesc(arglead)) ~= nil
      end, { "alpha", "beta" })
    end,
  })
end

describe("cmd_ux generic command behavior", function()
  before_each(function()
    ensure_setup()
    drop_user_command("TestCmdSpace")
    drop_user_command("IndexVisibleCmd")
    sync_cmd_ux()
  end)

  after_each(function()
    drop_user_command("TestCmdSpace")
    drop_user_command("IndexVisibleCmd")
    sync_cmd_ux()
  end)

  it("uses semantic space for structured generic custom completions", function()
    create_structured_test_command("TestCmdSpace")
    sync_cmd_ux()

    local state = core.resolve_line("TestCmdSpace al")

    eq("generic", state.provider)
    assert.is_true(state.pending_is_named)
    assert.is_true(core.should_intercept_space(state))

    local action = core.decide_choice(state, "alpha", "space")
    eq("advance", action.type)
    eq("TestCmdSpace alpha ", action.line)
  end)

  it("keeps literal space for generic free-form file arguments", function()
    local dir = vim.fn.tempname()
    vim.fn.mkdir(dir, "p")
    vim.fn.writefile({ "hello" }, dir .. "/hello.txt")

    local state = core.resolve_line("edit " .. dir .. "/he")

    eq("generic", state.provider)
    assert.is_false(state.pending_is_named)
    assert.is_false(core.should_intercept_space(state))
  end)

  it("indexes live user commands in the current session", function()
    vim.api.nvim_create_user_command("IndexVisibleCmd", function() end, {
      desc = "Visible in the cmd-ux index",
    })

    assert.is_true(index.has("IndexVisibleCmd"))

    local state = core.resolve_line("IndexVisibleCmd")
    assert.is_true(state.executable)
  end)
end)
