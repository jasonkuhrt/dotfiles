---@diagnostic disable: undefined-field

local stub = require("luassert.stub")

local cmux_nav = require("cmux_nav")

---@param width integer?
local function reset_windows(width)
  pcall(vim.cmd, "%bwipeout!")
  vim.cmd("enew")
  vim.cmd("only")
  if width then
    vim.cmd("vertical resize " .. width)
  end
end

describe("cmux_nav", function()
  before_each(function()
    reset_windows()
    vim.env.CMUX_WORKSPACE_ID = nil
    vim.env.CMUX_NAV_HELPER = nil
  end)

  after_each(function()
    pcall(function()
      vim.fn.executable:revert()
    end)
    pcall(function()
      vim.system:revert()
    end)
    reset_windows()
    vim.env.CMUX_WORKSPACE_ID = nil
    vim.env.CMUX_NAV_HELPER = nil
  end)

  it("moves locally when a neighboring split exists", function()
    vim.cmd("vsplit")
    local left = vim.api.nvim_get_current_win()
    vim.cmd("wincmd l")
    local right = vim.api.nvim_get_current_win()
    stub(vim, "system")

    cmux_nav.move_left()

    assert.are.equal(left, vim.api.nvim_get_current_win())
    assert.stub(vim.system).was_not_called()

    vim.api.nvim_set_current_win(left)
    cmux_nav.move_right()

    assert.are.equal(right, vim.api.nvim_get_current_win())
    assert.stub(vim.system).was_not_called()
  end)

  it("falls through to the helper at the edge inside cmux", function()
    vim.env.CMUX_WORKSPACE_ID = "workspace:1"
    vim.env.CMUX_NAV_HELPER = "/tmp/cmux-mode"
    stub(vim.fn, "executable", function(target)
      if target == "cmux" or target == "/tmp/cmux-mode" then
        return 1
      end
      return 0
    end)
    stub(vim, "system", function(argv)
      return {
        wait = function()
          assert.are.same({ "/tmp/cmux-mode", "action", "focus-left" }, argv)
          return { code = 0, stdout = "", stderr = "" }
        end,
      }
    end)

    cmux_nav.move_left()

    assert.stub(vim.system).was_called(1)
  end)

  it("resizes locally when a neighboring split exists", function()
    reset_windows(120)
    vim.cmd("vsplit")
    vim.cmd("wincmd h")
    local before = vim.api.nvim_win_get_width(0)
    stub(vim, "system")

    cmux_nav.resize_right()

    assert.is_true(vim.api.nvim_win_get_width(0) > before)
    assert.stub(vim.system).was_not_called()
  end)

  it("falls through to the helper for boundary resize inside cmux", function()
    vim.env.CMUX_WORKSPACE_ID = "workspace:1"
    vim.env.CMUX_NAV_HELPER = "/tmp/cmux-mode"
    stub(vim.fn, "executable", function(target)
      if target == "cmux" or target == "/tmp/cmux-mode" then
        return 1
      end
      return 0
    end)
    stub(vim, "system", function(argv)
      return {
        wait = function()
          assert.are.same({ "/tmp/cmux-mode", "action", "resize-left" }, argv)
          return { code = 0, stdout = "", stderr = "" }
        end,
      }
    end)

    cmux_nav.resize_left()

    assert.stub(vim.system).was_called(1)
  end)
end)
