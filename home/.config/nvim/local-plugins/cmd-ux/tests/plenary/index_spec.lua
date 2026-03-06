---@diagnostic disable: undefined-field, undefined-global

local helpers = require("tests.plenary.helpers")
local index = require("cmd_ux.index")
local providers = require("cmd_ux.providers")
local types = require("cmd_ux.types")

local function registered_root(root)
  return types.node({
    token = root,
    kind = "namespace",
    desc = "Runtime-registered provider for tests",
    help = "Runtime-registered provider for tests",
    examples = { root .. " help" },
    executable = false,
    requires_more = true,
  })
end

local registered_provider = types.provider({
  id = "registered-test",
  describe_root = registered_root,
  resolve = function(ctx)
    return types.state_from_node(registered_root(ctx.root), {
      executable = false,
      requires_more = true,
      refusal_reason = "Pick a subcommand.",
      frontier = {},
    })
  end,
  complete = function()
    return {}
  end,
  execute = function() end,
})

describe("cmd_ux index cache", function()
  before_each(function()
    helpers.ensure_setup()
    helpers.drop_user_command("CacheVisibleCmd")
    helpers.drop_user_command("RegisteredVisibleCmd")
    providers.by_root.RegisteredVisibleCmd = nil
    helpers.sync_cmd_ux()
  end)

  after_each(function()
    helpers.drop_user_command("CacheVisibleCmd")
    helpers.drop_user_command("RegisteredVisibleCmd")
    providers.by_root.RegisteredVisibleCmd = nil
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

  it("rebuilds the index when a provider is registered at runtime", function()
    helpers.create_noarg_command("RegisteredVisibleCmd")

    local first_index = index.get()
    assert.are.equal("generic", first_index.by_root.RegisteredVisibleCmd.provider)

    providers.register("RegisteredVisibleCmd", registered_provider)

    local rebuilt = index.get()
    assert.is_true(rebuilt.generation > first_index.generation)
    assert.are.equal("registered-test", rebuilt.by_root.RegisteredVisibleCmd.provider)
    assert.are.equal("namespace", rebuilt.by_root.RegisteredVisibleCmd.node.kind)
  end)
end)
