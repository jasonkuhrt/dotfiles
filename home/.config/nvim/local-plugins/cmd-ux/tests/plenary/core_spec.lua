---@diagnostic disable: undefined-field, undefined-global

local eq = assert.are.same

local core = require("cmd_ux.core")
local index = require("cmd_ux.index")
local helpers = require("tests.plenary.helpers")

local function action(state, intent)
  return core.decide_current(state, intent)
end

local function choice(state, token, intent)
  return core.decide_choice(state, token, intent)
end

describe("cmd_ux semantic decisions", function()
  before_each(function()
    helpers.ensure_setup()
    helpers.drop_user_command("LeafCmd")
    helpers.drop_user_command("NeedArgCmd")
    helpers.drop_user_command("TestCmdSpace")
    helpers.drop_user_command("OptionalTestCmd")
    helpers.drop_user_command("DeepStructuredCmd")
    helpers.drop_user_command("TrailingSpaceCmd")
    helpers.drop_user_command("RepeatEnumCmd")
    helpers.drop_user_command("NestedRepeatCmd")
    helpers.drop_user_command("CyclicStructuredCmd")
    helpers.drop_user_command("PrefixFamilyCmd")
    helpers.drop_user_command("EnumChoiceCmd")
    helpers.drop_user_command("IndexVisibleCmd")
    helpers.sync_cmd_ux()
  end)

  after_each(function()
    helpers.drop_user_command("LeafCmd")
    helpers.drop_user_command("NeedArgCmd")
    helpers.drop_user_command("TestCmdSpace")
    helpers.drop_user_command("OptionalTestCmd")
    helpers.drop_user_command("DeepStructuredCmd")
    helpers.drop_user_command("TrailingSpaceCmd")
    helpers.drop_user_command("RepeatEnumCmd")
    helpers.drop_user_command("NestedRepeatCmd")
    helpers.drop_user_command("CyclicStructuredCmd")
    helpers.drop_user_command("PrefixFamilyCmd")
    helpers.drop_user_command("EnumChoiceCmd")
    helpers.drop_user_command("IndexVisibleCmd")
    helpers.sync_cmd_ux()
  end)

  it("advances exact namespace roots on enter tab and space", function()
    local state = core.resolve_line("Config")

    eq("namespace", state.kind)
    eq({ type = "advance", line = "Config " }, action(state, "enter"))
    eq({ type = "advance", line = "Config " }, action(state, "tab"))
    eq({ type = "advance", line = "Config " }, action(state, "space"))
  end)

  it("accepts partial namespace roots then advances on enter tab and space", function()
    local state = core.resolve_line("Con")

    eq("root", state.kind)
    eq({ type = "advance", line = "Config " }, choice(state, "Config", "enter"))
    eq({ type = "advance", line = "Config " }, choice(state, "Config", "tab"))
    eq({ type = "advance", line = "Config " }, choice(state, "Config", "space"))
  end)

  it("executes exact leaf commands on enter and noops on tab", function()
    helpers.create_noarg_command("LeafCmd")
    helpers.sync_cmd_ux()

    local state = core.resolve_line("LeafCmd")

    eq("leaf", state.kind)
    eq({ type = "execute", line = "LeafCmd" }, action(state, "enter"))
    eq({ type = "noop" }, action(state, "tab"))
    assert.is_false(core.should_intercept_space(state))
  end)

  it("treats required named generic roots as namespaces", function()
    helpers.create_structured_test_command("TestCmdSpace")
    helpers.sync_cmd_ux()

    local state = core.resolve_line("TestCmdSpace")

    eq("generic", state.provider)
    eq("namespace", state.kind)
    eq({ type = "advance", line = "TestCmdSpace " }, action(state, "enter"))
    eq({ type = "advance", line = "TestCmdSpace " }, action(state, "tab"))
    eq({ type = "advance", line = "TestCmdSpace " }, action(state, "space"))
  end)

  it("treats optional named generic roots as hybrids", function()
    helpers.create_optional_structured_test_command("OptionalTestCmd")
    helpers.sync_cmd_ux()

    local state = core.resolve_line("OptionalTestCmd")

    eq("generic", state.provider)
    eq("hybrid", state.kind)
    eq({ type = "execute", line = "OptionalTestCmd" }, action(state, "enter"))
    eq({ type = "advance", line = "OptionalTestCmd " }, action(state, "tab"))
    eq({ type = "advance", line = "OptionalTestCmd " }, action(state, "space"))
  end)

  it("advances incomplete required-arg commands on enter tab and space", function()
    helpers.create_needarg_command("NeedArgCmd")
    helpers.sync_cmd_ux()

    local state = core.resolve_line("NeedArgCmd")

    assert.is_true(state.requires_more)
    eq({ type = "advance", line = "NeedArgCmd " }, action(state, "enter"))
    eq({ type = "advance", line = "NeedArgCmd " }, action(state, "tab"))
    eq({ type = "advance", line = "NeedArgCmd " }, action(state, "space"))
  end)

  it("uses semantic space for structured generic descendants", function()
    helpers.create_structured_test_command("TestCmdSpace")
    helpers.sync_cmd_ux()

    local state = core.resolve_line("TestCmdSpace al")

    eq("generic", state.provider)
    assert.is_true(state.pending_is_named)
    assert.is_true(core.should_intercept_space(state))

    eq({ type = "advance", line = "TestCmdSpace alpha " }, choice(state, "alpha", "enter"))
    eq({ type = "advance", line = "TestCmdSpace alpha " }, choice(state, "alpha", "tab"))
    eq({ type = "advance", line = "TestCmdSpace alpha " }, choice(state, "alpha", "space"))
  end)

  it("treats inferred named descendants as namespaces", function()
    helpers.create_structured_test_command("TestCmdSpace")
    helpers.sync_cmd_ux()

    local state = core.resolve_line("TestCmdSpace alpha")

    eq("generic", state.provider)
    eq("namespace", state.kind)
    eq(
      { "one", "two" },
      vim.tbl_map(function(item)
        return item.label
      end, state.frontier)
    )
    eq({ type = "advance", line = "TestCmdSpace alpha " }, action(state, "enter"))
    eq({ type = "advance", line = "TestCmdSpace alpha " }, action(state, "tab"))
    eq({ type = "advance", line = "TestCmdSpace alpha " }, action(state, "space"))
  end)

  it("recurses through deeper named branches until terminal leaves", function()
    helpers.create_deep_structured_test_command("DeepStructuredCmd")
    helpers.sync_cmd_ux()

    local state = core.resolve_line("DeepStructuredCmd alpha")

    eq("generic", state.provider)
    eq("namespace", state.kind)
    eq(
      {
        { label = "branch", kind = "namespace" },
        { label = "solo", kind = "leaf" },
      },
      vim.tbl_map(function(item)
        return { label = item.label, kind = item.kind }
      end, state.frontier)
    )

    local deeper_state = core.resolve_line("DeepStructuredCmd alpha branch")

    eq("generic", deeper_state.provider)
    eq("namespace", deeper_state.kind)
    eq(
      {
        { label = "leaf", kind = "leaf" },
        { label = "twig", kind = "leaf" },
      },
      vim.tbl_map(function(item)
        return { label = item.label, kind = item.kind }
      end, deeper_state.frontier)
    )
  end)

  it("keeps accepted inferred tokens valid when the callback only exposes children after a space", function()
    helpers.create_trailing_space_structured_command("TrailingSpaceCmd")
    helpers.sync_cmd_ux()

    local state = core.resolve_line("TrailingSpaceCmd alpha")

    eq("generic", state.provider)
    eq("namespace", state.kind)
    eq(
      { "one", "two" },
      vim.tbl_map(function(item)
        return item.label
      end, state.frontier)
    )
  end)

  it("keeps repeatable named enums in arg mode but executable after the minimum arity", function()
    helpers.create_repeatable_named_enum_command("RepeatEnumCmd")
    helpers.sync_cmd_ux()

    local root_state = core.resolve_line("RepeatEnumCmd")
    eq("generic", root_state.provider)
    eq("leaf", root_state.kind)
    assert.is_true(root_state.requires_more)
    eq("arg", root_state.frontier[1].kind)

    local state = core.resolve_line("RepeatEnumCmd alpha")
    eq("generic", state.provider)
    eq("leaf", state.kind)
    assert.is_true(state.executable)
    assert.is_false(state.requires_more)
    eq("arg", state.frontier[1].kind)
    eq({ type = "execute", line = "RepeatEnumCmd alpha" }, action(state, "enter"))
    assert.is_false(core.should_intercept_space(state))
  end)

  it("stops recursive inference at nested repeatable named-value frontiers", function()
    helpers.create_nested_repeatable_value_command("NestedRepeatCmd")
    helpers.sync_cmd_ux()

    local root_state = core.resolve_line("NestedRepeatCmd")
    eq("generic", root_state.provider)
    eq("namespace", root_state.kind)
    eq(
      {
        { label = "alpha", kind = "leaf" },
        { label = "beta", kind = "leaf" },
      },
      vim.tbl_map(function(item)
        return { label = item.label, kind = item.kind }
      end, root_state.frontier)
    )

    local state = core.resolve_line("NestedRepeatCmd alpha")
    eq("generic", state.provider)
    eq("leaf", state.kind)
    assert.is_true(state.executable)
    assert.is_false(state.requires_more)
    eq("arg", state.frontier[1].kind)
  end)

  it("stops recursive inference when a branch re-enters an ancestor frontier shape", function()
    helpers.create_cyclic_structured_test_command("CyclicStructuredCmd")
    helpers.sync_cmd_ux()

    local root_state = core.resolve_line("CyclicStructuredCmd")
    eq("generic", root_state.provider)
    eq("namespace", root_state.kind)
    eq("namespace", root_state.frontier[1].kind)

    local state = core.resolve_line("CyclicStructuredCmd alpha")
    eq("generic", state.provider)
    eq("namespace", state.kind)
    eq(
      {
        { label = "branch", kind = "leaf" },
      },
      vim.tbl_map(function(item)
        return { label = item.label, kind = item.kind }
      end, state.frontier)
    )
  end)

  it("keeps narrowed prefix families inferred as namespaces", function()
    helpers.create_prefix_family_command("PrefixFamilyCmd")
    helpers.sync_cmd_ux()

    local root_state = core.resolve_line("PrefixFamilyCmd")
    eq("generic", root_state.provider)
    eq("hybrid", root_state.kind)
    eq("namespace", root_state.frontier[1].kind)

    local state = core.resolve_line("PrefixFamilyCmd copy")
    eq("generic", state.provider)
    eq("namespace", state.kind)
    eq(
      { "copy", "copy-dir-path", "copy-name", "copy-path", "copy-path-relative" },
      vim.tbl_map(function(item)
        return item.label
      end, state.frontier)
    )
  end)

  it("executes the final structured generic leaf when the path is complete", function()
    helpers.create_structured_test_command("TestCmdSpace")
    helpers.sync_cmd_ux()

    local state = core.resolve_line("TestCmdSpace alpha o")

    eq("generic", state.provider)
    assert.is_true(state.pending_is_named)
    eq({ type = "execute", line = "TestCmdSpace alpha one" }, choice(state, "one", "enter"))
    eq({ type = "set", line = "TestCmdSpace alpha one" }, choice(state, "one", "tab"))
    eq({ type = "advance", line = "TestCmdSpace alpha one " }, choice(state, "one", "space"))
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

  it("keeps enum-style custom completions as arguments", function()
    helpers.create_enum_choice_command("EnumChoiceCmd")
    helpers.sync_cmd_ux()

    local state = core.resolve_line("EnumChoiceCmd")

    eq("generic", state.provider)
    eq("hybrid", state.kind)
    eq("arg", state.frontier[1].kind)
    assert.is_true(#state.frontier > 0)
  end)

  it("indexes live user commands in the current session", function()
    vim.api.nvim_create_user_command("IndexVisibleCmd", function() end, {
      desc = "Visible in the cmd-ux index",
    })

    assert.is_true(index.has("IndexVisibleCmd"))

    local state = core.resolve_line("IndexVisibleCmd")
    assert.is_true(state.executable)
  end)

  -- ── Bug tests ──────────────────────────────────────────────────────

  it("[REGRESSION] nargs='*' named trees remain namespace-first", function()
    -- A generic command with nargs="*" and root-level named completions is
    -- still treated as a namespace-first semantic tree. Neovim exposes no
    -- reliable signal that the bare root should execute instead of requiring
    -- a structured choice, so cmd-ux stays conservative here.
    helpers.create_structured_test_command("TestCmdSpace")
    helpers.sync_cmd_ux()

    local state = core.resolve_line("TestCmdSpace")

    eq("generic", state.provider)
    eq("namespace", state.kind)
    assert.is_false(state.executable)
    assert.is_true(state.requires_more)
    eq({ type = "advance", line = "TestCmdSpace " }, action(state, "enter"))
  end)
end)
