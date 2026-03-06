---@diagnostic disable: undefined-field, undefined-global

local helpers = require("tests.plenary.helpers")
local index = require("cmd_ux.index")

describe("cmd_ux index cache", function()
  before_each(function()
    helpers.ensure_setup()
    helpers.drop_user_command("CacheVisibleCmd")
    helpers.sync_cmd_ux()
  end)

  after_each(function()
    helpers.drop_user_command("CacheVisibleCmd")
    helpers.sync_cmd_ux()
  end)

  it("rejects a persisted cache when live roots have changed", function()
    local first_index = index.get()
    assert.truthy(vim.uv.fs_stat(index.cache_path()))
    assert.is_false(first_index.by_root.CacheVisibleCmd ~= nil)

    helpers.create_noarg_command("CacheVisibleCmd")

    local rebuilt = index.get()
    assert.is_true(index.has("CacheVisibleCmd"))
    assert.is_not_nil(rebuilt.by_root.CacheVisibleCmd)
  end)
end)
