---@diagnostic disable: undefined-field, undefined-global

local helpers = require("tests.plenary.helpers")
local index = require("cmd_ux.index")
local providers = require("cmd_ux.providers")
local types = require("cmd_ux.types")
local nvim_commands = require("kit.nvim.commands")

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
    helpers.drop_user_command("StructuredVisibleCmd")
    helpers.drop_user_command("OptionalVisibleCmd")
    helpers.drop_user_command("RepeatEnumVisibleCmd")
    helpers.drop_user_command("PrefixFamilyVisibleCmd")
    helpers.drop_user_command("ShapeShiftCmd")
    helpers.drop_user_command("MapReuseCmdOne")
    helpers.drop_user_command("MapReuseCmdTwo")
    providers.by_root.RegisteredVisibleCmd = nil
    helpers.sync_cmd_ux()
  end)

  after_each(function()
    helpers.drop_user_command("CacheVisibleCmd")
    helpers.drop_user_command("RegisteredVisibleCmd")
    helpers.drop_user_command("StructuredVisibleCmd")
    helpers.drop_user_command("OptionalVisibleCmd")
    helpers.drop_user_command("RepeatEnumVisibleCmd")
    helpers.drop_user_command("PrefixFamilyVisibleCmd")
    helpers.drop_user_command("ShapeShiftCmd")
    helpers.drop_user_command("MapReuseCmdOne")
    helpers.drop_user_command("MapReuseCmdTwo")
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
    assert.are.equal("namespace", index.describe_root("RegisteredVisibleCmd").kind)
  end)

  it("keeps semantic root description lazy during inventory build", function()
    helpers.create_noarg_command("RegisteredVisibleCmd")

    local describe_calls = 0
    local lazy_provider = types.provider({
      id = "lazy-root-test",
      describe_root = function(root)
        describe_calls = describe_calls + 1
        return registered_root(root)
      end,
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

    providers.register("RegisteredVisibleCmd", lazy_provider)

    local payload = index.get()

    assert.are.equal(0, describe_calls)
    assert.are.equal("lazy-root-test", payload.by_root.RegisteredVisibleCmd.provider)
    assert.are.equal("RegisteredVisibleCmd", payload.by_root.RegisteredVisibleCmd.item.label)
    assert.are.equal("RegisteredVisibleCmd", index.frontier("Registered")[1].label)
    assert.are.equal(0, describe_calls)
    assert.are.equal("namespace", index.describe_root("RegisteredVisibleCmd").kind)
    assert.are.equal(1, describe_calls)
    assert.are.equal("namespace", index.describe_root("RegisteredVisibleCmd").kind)
    assert.are.equal(1, describe_calls)
  end)

  it("describes inferred named generic roots lazily", function()
    helpers.create_structured_test_command("StructuredVisibleCmd")
    helpers.create_optional_structured_test_command("OptionalVisibleCmd")

    local payload = index.get()

    assert.are.equal("StructuredVisibleCmd", payload.by_root.StructuredVisibleCmd.item.label)
    assert.are.equal("OptionalVisibleCmd", payload.by_root.OptionalVisibleCmd.item.label)
    assert.are.equal("namespace", index.describe_root("StructuredVisibleCmd").kind)
    assert.are.equal("hybrid", index.describe_root("OptionalVisibleCmd").kind)
  end)

  it("keeps repeatable enums generic while preserving narrowed prefix families lazily", function()
    helpers.create_repeatable_named_enum_command("RepeatEnumVisibleCmd")
    helpers.create_prefix_family_command("PrefixFamilyVisibleCmd")

    local payload = index.get()

    assert.are.equal("RepeatEnumVisibleCmd", payload.by_root.RepeatEnumVisibleCmd.item.label)
    assert.are.equal("PrefixFamilyVisibleCmd", payload.by_root.PrefixFamilyVisibleCmd.item.label)
    assert.are.equal("leaf", index.describe_root("RepeatEnumVisibleCmd").kind)
    assert.are.equal("hybrid", index.describe_root("PrefixFamilyVisibleCmd").kind)
  end)

  it("refreshes generic root semantics when the active index revision changes", function()
    helpers.create_structured_test_command("ShapeShiftCmd")

    assert.are.equal("namespace", index.describe_root("ShapeShiftCmd").kind)

    helpers.drop_user_command("ShapeShiftCmd")
    helpers.create_noarg_command("ShapeShiftCmd")

    assert.are.equal("leaf", index.describe_root("ShapeShiftCmd").kind)
  end)

  it("reuses live command maps across generic roots within one active index revision", function()
    helpers.create_noarg_command("MapReuseCmdOne")
    helpers.create_noarg_command("MapReuseCmdTwo")

    local original_get_user_commands = nvim_commands.get_user_commands
    local original_get_buffer_commands = nvim_commands.get_buffer_commands
    local user_calls = 0
    local buffer_calls = 0

    ---@diagnostic disable-next-line: duplicate-set-field
    nvim_commands.get_user_commands = function(...)
      user_calls = user_calls + 1
      return original_get_user_commands(...)
    end

    ---@diagnostic disable-next-line: duplicate-set-field
    nvim_commands.get_buffer_commands = function(...)
      buffer_calls = buffer_calls + 1
      return original_get_buffer_commands(...)
    end

    local ok, err = pcall(function()
      assert.are.equal("leaf", index.describe_root("MapReuseCmdOne").kind)
      assert.are.equal("leaf", index.describe_root("MapReuseCmdTwo").kind)
    end)

    nvim_commands.get_user_commands = original_get_user_commands
    nvim_commands.get_buffer_commands = original_get_buffer_commands

    if not ok then
      error(err)
    end
    assert.are.equal(1, user_calls)
    assert.are.equal(1, buffer_calls)
  end)
end)
