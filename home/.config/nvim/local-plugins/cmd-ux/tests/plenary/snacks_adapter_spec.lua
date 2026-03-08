---@diagnostic disable: undefined-field, undefined-global

local helpers = require("tests.plenary.helpers")
local snacks = require("cmd_ux.adapters.snacks")

describe("cmd_ux snacks adapter", function()
  local original_snacks

  before_each(function()
    helpers.ensure_setup()
    helpers.sync_cmd_ux()
    snacks.session.prefix = ""
    snacks.session.pending = ""
    snacks.session.trailing_space = false
    original_snacks = Snacks
  end)

  after_each(function()
    Snacks = original_snacks
    snacks.session.prefix = ""
    snacks.session.pending = ""
    snacks.session.trailing_space = false
  end)

  it("reruns the finder from the live search text instead of matcher pattern", function()
    local captured

    Snacks = {
      picker = {
        pick = function(opts)
          captured = opts
          return opts
        end,
      },
    }

    snacks.open()

    assert.is_true(captured.live)
    assert.equal("", captured.pattern)
    assert.equal("", captured.search)

    local fake_picker = {
      opts = captured,
      update_titles = function() end,
    }

    local initial = captured.finder(captured, {
      filter = { search = "" },
      picker = fake_picker,
    })
    assert.is_true(#initial > 0)

    local filtered = captured.finder(captured, {
      filter = { search = "Con" },
      picker = fake_picker,
    })
    assert.is_true(#filtered > 0)
    assert.equal("Config", filtered[1].label)
  end)

  it("seeds the live search from the pending token when opening from cmdline text", function()
    local captured

    Snacks = {
      picker = {
        pick = function(opts)
          captured = opts
          return opts
        end,
      },
    }

    snacks.open({ line = "Con" })

    assert.equal("", captured.pattern)
    assert.equal("Con", captured.search)

    local fake_picker = {
      opts = captured,
      update_titles = function() end,
    }

    local filtered = captured.finder(captured, {
      filter = { search = "Con" },
      picker = fake_picker,
    })

    assert.is_true(#filtered > 0)
    assert.equal("Config", filtered[1].label)
  end)

  it("advances a namespace root into its semantic children on confirm", function()
    local captured

    Snacks = {
      picker = {
        pick = function(opts)
          captured = opts
          return opts
        end,
      },
    }

    snacks.open()

    local fake_picker = {
      opts = captured,
      closed = false,
      update_titles = function() end,
      close = function(self)
        self.closed = true
      end,
      input = {
        value = "Ta",
        get = function(self)
          return self.value
        end,
        set = function(self, pattern, search)
          self.value = search or pattern or self.value
        end,
      },
    }

    fake_picker.refresh = function(self)
      self.items = captured.finder(captured, {
        filter = { search = self.input:get() },
        picker = self,
      })
    end

    local root_items = captured.finder(captured, {
      filter = { search = "Ta" },
      picker = fake_picker,
    })

    assert.equal("Tab", root_items[1].label)
    captured.confirm(fake_picker, root_items[1])

    assert.equal("", fake_picker.input.value)
    assert.equal("Cmd UX: Tab ", fake_picker.opts.title)
    assert.is_truthy(fake_picker.items)
    assert.are.same(
      { "close", "first", "goto", "last", "move", "new", "next", "only", "previous" },
      vim.tbl_map(function(item)
        return item.label
      end, fake_picker.items)
    )
  end)

  it("auto-enters an exact typed namespace search", function()
    local captured

    Snacks = {
      picker = {
        pick = function(opts)
          captured = opts
          return opts
        end,
      },
    }

    snacks.open()

    local fake_picker = {
      opts = captured,
      closed = false,
      update_titles = function() end,
      input = {
        value = "Tab",
        get = function(self)
          return self.value
        end,
        set = function(self, pattern, search)
          self.value = search or pattern or self.value
        end,
      },
    }

    local filter = { search = "Tab" }
    local items = captured.finder(captured, {
      filter = filter,
      picker = fake_picker,
    })

    assert.equal("", fake_picker.input.value)
    assert.equal("", filter.search)
    assert.equal("Cmd UX: Tab ", fake_picker.opts.title)
    assert.are.same(
      { "close", "first", "goto", "last", "move", "new", "next", "only", "previous" },
      vim.tbl_map(function(item)
        return item.label
      end, items)
    )
  end)
end)
