---@diagnostic disable: undefined-field, undefined-global

local helpers = require("tests.plenary.helpers")
local index = require("cmd_ux.index")
local semantic_search = require("cmd_ux.lib.semantic_search")
local providers = require("cmd_ux.providers")
local types = require("cmd_ux.types")
local nvim_commands = require("kit.nvim.commands")

local function labels(items)
  return vim.tbl_map(function(item)
    return item.label
  end, items)
end

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
    helpers.drop_user_command("CacheTreeCmd")
    helpers.drop_user_command("RegisteredVisibleCmd")
    helpers.drop_user_command("StructuredVisibleCmd")
    helpers.drop_user_command("OptionalVisibleCmd")
    helpers.drop_user_command("RepeatEnumVisibleCmd")
    helpers.drop_user_command("PrefixFamilyVisibleCmd")
    helpers.drop_user_command("ShapeShiftCmd")
    helpers.drop_user_command("MapReuseCmdOne")
    helpers.drop_user_command("MapReuseCmdTwo")
    helpers.drop_user_command("CasePath")
    helpers.drop_user_command("Casepath")
    helpers.drop_user_command("BufferLineCloseLeft")
    helpers.drop_user_command("BufferLineCycleNext")
    helpers.drop_user_command("BufferLine")
    helpers.drop_user_command("BufferLineGoToBuffer")
    providers.by_root.RegisteredVisibleCmd = nil
    helpers.sync_cmd_ux()
  end)

  after_each(function()
    helpers.drop_user_command("CacheVisibleCmd")
    helpers.drop_user_command("CacheTreeCmd")
    helpers.drop_user_command("RegisteredVisibleCmd")
    helpers.drop_user_command("StructuredVisibleCmd")
    helpers.drop_user_command("OptionalVisibleCmd")
    helpers.drop_user_command("RepeatEnumVisibleCmd")
    helpers.drop_user_command("PrefixFamilyVisibleCmd")
    helpers.drop_user_command("ShapeShiftCmd")
    helpers.drop_user_command("MapReuseCmdOne")
    helpers.drop_user_command("MapReuseCmdTwo")
    helpers.drop_user_command("CasePath")
    helpers.drop_user_command("Casepath")
    helpers.drop_user_command("BufferLineCloseLeft")
    helpers.drop_user_command("BufferLineCycleNext")
    helpers.drop_user_command("BufferLine")
    helpers.drop_user_command("BufferLineGoToBuffer")
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

  it("surfaces case-fold collisions and annotates ambiguous root results", function()
    helpers.create_noarg_command("CasePath")
    helpers.create_noarg_command("Casepath")

    local collision = index.root_case_collision("CasePath")
    assert.is_not_nil(collision)
    ---@cast collision CmdUxCaseCollision
    assert.are.same({ "CasePath", "Casepath" }, collision.paths)

    local frontier = index.search_frontier("casepath")
    assert.is_true(vim.tbl_contains(labels(frontier), "CasePath"))
    assert.is_true(vim.tbl_contains(labels(frontier), "Casepath"))

    local ambiguous
    for _, item in ipairs(frontier) do
      if item.label == "CasePath" then
        ambiguous = item
        break
      end
    end

    assert.is_truthy(ambiguous)
    assert.is_truthy(ambiguous.desc:find("case%-collision", 1) ~= nil)
  end)

  it("keeps shallow root-prefix search independent from deep semantic resolution", function()
    local original_resolve = providers.resolve
    ---@diagnostic disable-next-line: duplicate-set-field
    providers.resolve = function()
      error("root-prefix search should not resolve semantic descendants")
    end

    local ok, result = pcall(function()
      return labels(index.search_frontier("w"))
    end)

    providers.resolve = original_resolve

    if not ok then
      error(result)
    end

    assert.is_true(vim.tbl_contains(result, "wall"))
    assert.is_true(vim.tbl_contains(result, "wq"))
    assert.is_true(vim.tbl_contains(result, "write"))
  end)

  it("does not warm semantic descendants on interactive root-only access", function()
    local original_list_uis = vim.api.nvim_list_uis
    local original_schedule_warm = semantic_search.schedule_warm
    local scheduled = 0

    ---@diagnostic disable-next-line: duplicate-set-field
    vim.api.nvim_list_uis = function()
      return { { chan = 1 } }
    end
    ---@diagnostic disable-next-line: duplicate-set-field
    semantic_search.schedule_warm = function()
      scheduled = scheduled + 1
    end

    local ok, result = pcall(function()
      return labels(index.search_frontier("w"))
    end)

    vim.api.nvim_list_uis = original_list_uis
    semantic_search.schedule_warm = original_schedule_warm

    if not ok then
      error(result)
    end

    assert.are.equal(0, scheduled)
    assert.is_true(vim.tbl_contains(result, "wall"))
    assert.is_true(vim.tbl_contains(result, "wq"))
    assert.is_true(vim.tbl_contains(result, "write"))
  end)

  it("reloads descendant search results from the persisted semantic cache", function()
    helpers.create_prefix_family_command("PrefixFamilyVisibleCmd")

    local initial = labels(index.search_frontier("copy-path"))
    assert.is_true(vim.tbl_contains(initial, "PrefixFamilyVisibleCmd copy-path"))

    semantic_search.invalidate()

    local original_resolve = providers.resolve
    ---@diagnostic disable-next-line: duplicate-set-field
    providers.resolve = function()
      error("persisted semantic search cache should avoid rebuilding descendants")
    end

    local ok, result = pcall(function()
      return labels(index.search_frontier("copy-path"))
    end)

    providers.resolve = original_resolve

    if not ok then
      error(result)
    end

    assert.is_true(vim.tbl_contains(result, "PrefixFamilyVisibleCmd copy-path"))
  end)

  it("returns a loading frontier instead of synchronously building deep search on an interactive root miss", function()
    helpers.create_prefix_family_command("PrefixFamilyVisibleCmd")
    semantic_search.invalidate()

    local original_list_uis = vim.api.nvim_list_uis
    local original_ready = semantic_search.ready
    local original_warming = semantic_search.warming
    local original_schedule_warm = semantic_search.schedule_warm
    local original_frontier = semantic_search.frontier
    local scheduled = 0

    ---@diagnostic disable-next-line: duplicate-set-field
    vim.api.nvim_list_uis = function()
      return { { chan = 1 } }
    end
    ---@diagnostic disable-next-line: duplicate-set-field
    semantic_search.ready = function()
      return false
    end
    ---@diagnostic disable-next-line: duplicate-set-field
    semantic_search.warming = function()
      return false
    end
    ---@diagnostic disable-next-line: duplicate-set-field
    semantic_search.schedule_warm = function()
      scheduled = scheduled + 1
    end
    ---@diagnostic disable-next-line: duplicate-set-field
    semantic_search.frontier = function()
      error("interactive root miss should not synchronously build deep semantic search")
    end

    local ok, result = pcall(function()
      return index.search_frontier("copy-path")
    end)

    vim.api.nvim_list_uis = original_list_uis
    semantic_search.ready = original_ready
    semantic_search.warming = original_warming
    semantic_search.schedule_warm = original_schedule_warm
    semantic_search.frontier = original_frontier

    if not ok then
      error(result)
    end

    assert.is_true(scheduled > 0)
    assert.are.equal("Searching semantic descendants...", result[1].label)
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

  it("bounds the generic named frontier cache for deep custom completion trees", function()
    local generic_provider = require("cmd_ux.providers.generic")

    helpers.create_binary_cache_tree_command("CacheTreeCmd", 7)

    assert.are.equal("namespace", index.describe_root("CacheTreeCmd").kind)
    assert.is_true(generic_provider._named_frontier_cache_size_for_tests("CacheTreeCmd") <= 64)
  end)

  it("keeps semantic workspace roots while hiding overlapping legacy commands", function()
    local frontier = labels(index.frontier(""))

    assert.is_true(vim.tbl_contains(frontier, "Buffer"))
    assert.is_true(vim.tbl_contains(frontier, "Search"))
    assert.is_true(vim.tbl_contains(frontier, "Tab"))
    assert.is_false(vim.tbl_contains(frontier, "buffers"))
    assert.is_false(vim.tbl_contains(frontier, "files"))
    assert.is_false(vim.tbl_contains(frontier, "ls"))
  end)

  it("suppresses prefixed plugin command families once a semantic root owns that namespace", function()
    helpers.create_noarg_command("BufferLine")
    helpers.create_noarg_command("BufferLineCloseLeft")
    helpers.create_noarg_command("BufferLineCycleNext")
    helpers.create_needarg_command("BufferLineGoToBuffer")

    local frontier = labels(index.frontier("Buffer"))

    assert.is_true(vim.tbl_contains(frontier, "Buffer"))
    assert.is_false(vim.tbl_contains(frontier, "BufferLine"))
    assert.is_false(vim.tbl_contains(frontier, "BufferLineCloseLeft"))
    assert.is_false(vim.tbl_contains(frontier, "BufferLineCycleNext"))
    assert.is_false(vim.tbl_contains(frontier, "BufferLineGoToBuffer"))
    assert.is_nil(index.entry("BufferLine"))
    assert.is_nil(index.entry("BufferLineCloseLeft"))
    assert.is_nil(index.entry("BufferLineCycleNext"))
    assert.is_nil(index.entry("BufferLineGoToBuffer"))
  end)
end)
