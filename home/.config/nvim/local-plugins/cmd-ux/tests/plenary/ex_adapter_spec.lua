---@diagnostic disable: undefined-field, undefined-global

local stub = require("luassert.stub")

local helpers = require("tests.plenary.helpers")
local ex = require("cmd_ux.adapters.ex")

local function fake_cmp(selected)
  return {
    get_selected_item = function()
      if not selected then
        return nil
      end
      return { label = selected }
    end,
    get_items = function()
      if not selected then
        return {}
      end
      return { { label = selected } }
    end,
  }
end

describe("cmd_ux ex adapter", function()
  local original_blink

  local function install_blink(visible)
    local blink = {
      is_menu_visible = function()
        return visible
      end,
      hide = function(opts)
        if opts and opts.callback then
          opts.callback()
        end
        return true
      end,
      show = function()
        return true
      end,
    }
    stub(blink, "is_menu_visible")
    blink.is_menu_visible.returns(visible)
    stub(blink, "hide")
    blink.hide.invokes(function(opts)
      if opts and opts.callback then
        opts.callback()
      end
      return true
    end)
    stub(blink, "show")
    package.loaded["blink.cmp"] = blink
    return blink
  end

  before_each(function()
    helpers.ensure_setup()
    helpers.drop_user_command("LeafCmd")
    helpers.drop_user_command("TestCmdSpace")
    helpers.sync_cmd_ux()

    original_blink = package.loaded["blink.cmp"]
    stub(vim.fn, "getcmdtype")
    vim.fn.getcmdtype.returns(":")
    stub(vim.fn, "getcmdline")
    stub(vim.fn, "setcmdline")
    stub(vim.api, "nvim_feedkeys")
    stub(vim, "notify")
    stub(vim, "schedule", function(cb)
      cb()
    end)
  end)

  after_each(function()
    package.loaded["blink.cmp"] = original_blink

    vim.fn.getcmdtype:revert()
    vim.fn.getcmdline:revert()
    vim.fn.setcmdline:revert()
    vim.api.nvim_feedkeys:revert()
    vim.notify:revert()
    vim.schedule:revert()

    helpers.drop_user_command("LeafCmd")
    helpers.drop_user_command("TestCmdSpace")
    helpers.sync_cmd_ux()
  end)

  it("reopens blink when advancing an exact namespace root on enter", function()
    local blink = install_blink(true)
    vim.fn.getcmdline.returns("Config")

    ex.handle_enter(fake_cmp())

    assert.stub(vim.fn.setcmdline).was_called_with("Config ")
    assert.stub(blink.hide).was_called(1)
    assert.stub(blink.show).was_called_with({ initial_selected_item_idx = 1 })
  end)

  it("reopens blink when advancing a partial namespace root on enter", function()
    local blink = install_blink(true)
    vim.fn.getcmdline.returns("Con")

    ex.handle_enter(fake_cmp("Config"))

    assert.stub(vim.fn.setcmdline).was_called_with("Config ")
    assert.stub(blink.hide).was_called(1)
    assert.stub(blink.show).was_called_with({ initial_selected_item_idx = 1 })
  end)

  it("reopens blink when advancing an exact namespace root on tab", function()
    local blink = install_blink(true)
    vim.fn.getcmdline.returns("Config")

    ex.handle_tab(fake_cmp())

    assert.stub(vim.fn.setcmdline).was_called_with("Config ")
    assert.stub(blink.hide).was_called(1)
    assert.stub(blink.show).was_called_with({ initial_selected_item_idx = 1 })
  end)

  it("reopens blink when advancing a partial namespace root on tab", function()
    local blink = install_blink(true)
    vim.fn.getcmdline.returns("Con")

    ex.handle_tab(fake_cmp("Config"))

    assert.stub(vim.fn.setcmdline).was_called_with("Config ")
    assert.stub(blink.hide).was_called(1)
    assert.stub(blink.show).was_called_with({ initial_selected_item_idx = 1 })
  end)

  it("reopens blink when advancing an exact namespace root on space", function()
    local blink = install_blink(true)
    vim.fn.getcmdline.returns("Config")
    ex.handle_space(fake_cmp())

    assert.stub(vim.fn.setcmdline).was_called_with("Config ")
    assert.stub(blink.hide).was_called(1)
    assert.stub(blink.show).was_called_with({ initial_selected_item_idx = 1 })
  end)

  it("reopens blink when advancing a partial namespace root on space", function()
    local blink = install_blink(true)
    vim.fn.getcmdline.returns("Con")

    ex.handle_space(fake_cmp("Config"))

    assert.stub(vim.fn.setcmdline).was_called_with("Config ")
    assert.stub(blink.hide).was_called(1)
    assert.stub(blink.show).was_called_with({ initial_selected_item_idx = 1 })
  end)

  it("auto-advances an exact typed namespace root on cmdline change", function()
    local blink = install_blink(true)
    vim.fn.getcmdline.returns("Tab")

    ex.handle_cmdline_changed()

    assert.stub(vim.fn.setcmdline).was_called_with("Tab ")
    assert.stub(blink.hide).was_called(1)
    assert.stub(blink.show).was_called_with({ initial_selected_item_idx = 1 })
  end)

  it("does not re-advance when backspacing over an auto-inserted namespace space", function()
    local blink = install_blink(true)
    local line = "Tab"
    vim.fn.getcmdline.invokes(function()
      return line
    end)

    ex.handle_cmdline_changed()
    line = "Tab"
    ex.handle_cmdline_changed()

    assert.stub(vim.fn.setcmdline).was_called(1)
    assert.stub(vim.fn.setcmdline).was_called_with("Tab ")
    assert.stub(blink.hide).was_called(1)
  end)

  it("does not auto-advance executable leaves on cmdline change", function()
    helpers.create_noarg_command("LeafCmd")
    helpers.sync_cmd_ux()
    vim.fn.getcmdline.returns("LeafCmd")

    ex.handle_cmdline_changed()

    assert.stub(vim.fn.setcmdline).was_not_called()
    assert.stub(vim.api.nvim_feedkeys).was_not_called()
  end)

  it("shows directly when blink menu is not visible", function()
    local blink = install_blink(false)
    vim.fn.getcmdline.returns("Config")

    ex.handle_enter(fake_cmp())

    assert.stub(vim.fn.setcmdline).was_called_with("Config ")
    assert.stub(blink.hide).was_not_called()
    assert.stub(blink.show).was_called_with({ initial_selected_item_idx = 1 })
  end)

  it("executes exact leaves on enter", function()
    helpers.create_noarg_command("LeafCmd")
    helpers.sync_cmd_ux()
    vim.fn.getcmdline.returns("LeafCmd")

    ex.handle_enter(fake_cmp())

    assert.stub(vim.api.nvim_feedkeys).was_called()
    assert.stub(vim.fn.setcmdline).was_called_with("LeafCmd")
  end)

  it("keeps tab as noop on exact leaves", function()
    helpers.create_noarg_command("LeafCmd")
    helpers.sync_cmd_ux()
    vim.fn.getcmdline.returns("LeafCmd")

    ex.handle_tab(fake_cmp())

    assert.stub(vim.api.nvim_feedkeys).was_not_called()
    assert.stub(vim.fn.setcmdline).was_not_called()
  end)

  it("keeps space as literal fallback on exact leaves", function()
    helpers.create_noarg_command("LeafCmd")
    helpers.sync_cmd_ux()
    vim.fn.getcmdline.returns("LeafCmd")

    ex.handle_space(fake_cmp())

    assert.stub(vim.api.nvim_feedkeys).was_not_called()
    assert.stub(vim.fn.setcmdline).was_not_called()
  end)
end)
