---@diagnostic disable: undefined-field, undefined-global

local helpers = require("tests.plenary.helpers")
local snacks = require("cmd_ux.adapters.snacks")

describe("cmd_ux snacks adapter", function()
  local original_snacks

  before_each(function()
    helpers.ensure_setup()
    helpers.sync_cmd_ux()
    original_snacks = Snacks
  end)

  after_each(function()
    Snacks = original_snacks
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
end)
