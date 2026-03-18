---@diagnostic disable: undefined-field

local helpers = require("tests.plenary.helpers")
local index = require("cmd_ux.index")
local interaction_session = require("cmd_ux.lib.interaction_session")

describe("cmd_ux interaction session", function()
  before_each(function()
    helpers.ensure_setup()
    helpers.drop_user_command("LeafCmd")
    helpers.sync_cmd_ux()
    interaction_session.reset()
  end)

  after_each(function()
    helpers.drop_user_command("LeafCmd")
    helpers.sync_cmd_ux()
    interaction_session.reset()
  end)

  it("captures a root search as pending input", function()
    local state = interaction_session.sync_from_line("Con")

    assert.is_nil(state.root)
    assert.equal(index.revision(), interaction_session.current().revision)
    assert.equal("Con", interaction_session.current().pending)
    assert.are.same({}, interaction_session.current().path_tokens)
    assert.equal("Con", interaction_session.render())
  end)

  it("captures a semantic namespace line as prefix state", function()
    local state = interaction_session.sync_from_line("Tab ")

    assert.equal("Tab", state.root)
    assert.equal("Tab", interaction_session.current().prefix)
    assert.equal("", interaction_session.current().pending)
    assert.is_true(interaction_session.current().trailing_space)
    assert.are.same({ "Tab" }, interaction_session.current().path_tokens)
    assert.equal("Tab ", interaction_session.render())
  end)

  it("syncs accepted tokens into the shared prefix", function()
    local state = interaction_session.sync_from_line("Search code ")

    assert.equal("Search", state.root)
    assert.equal("Search code", interaction_session.current().prefix)
    assert.are.same({ "Search", "code" }, interaction_session.current().path_tokens)
    assert.equal("Search code ", interaction_session.render())
  end)

  it("starts a fresh session when beginning a new interaction", function()
    local first = interaction_session.current().session_id

    interaction_session.begin("Tab ")

    assert.is_true(interaction_session.current().session_id > first)
    assert.equal(index.revision(), interaction_session.current().revision)
    assert.equal("Tab ", interaction_session.render())
  end)

  it("advances semantic state through a shared mutation api", function()
    local state = interaction_session.sync_from_line("Tab")

    interaction_session.advance_from_state(state)

    assert.equal("Tab ", interaction_session.render())
    assert.are.same({ "Tab" }, interaction_session.current().path_tokens)
  end)

  it("drills out of a semantic state through a shared mutation api", function()
    local state = interaction_session.sync_from_line("Search code ")

    assert.is_true(interaction_session.drill_out_from_state(state))
    assert.equal("Search", interaction_session.current().prefix)
    assert.equal("code", interaction_session.current().pending)
    assert.equal("Search code", interaction_session.render())
    assert.are.same({ "Search" }, interaction_session.current().path_tokens)
  end)

  it("previews a choice without mutating the live session", function()
    interaction_session.begin("Con")

    local preview = interaction_session.preview_choice("Config")

    assert.equal("Config", preview.rendered)
    assert.equal("Con", interaction_session.render())
    assert.equal("Con", interaction_session.current().pending)
  end)

  it("decides and applies a root choice through the shared session", function()
    interaction_session.begin("Con")

    local action = select(1, interaction_session.decide_choice("Config", "enter"))

    assert.are.same({ type = "advance", line = "Config " }, action)
    assert.equal("Config ", interaction_session.render())
    assert.equal("Config", interaction_session.current().prefix)
    assert.equal("", interaction_session.current().pending)
    assert.is_true(interaction_session.current().trailing_space)
  end)

  it("decides and applies current executable state through the shared session", function()
    helpers.create_noarg_command("LeafCmd")
    helpers.sync_cmd_ux()
    interaction_session.begin("LeafCmd")

    local action = select(1, interaction_session.decide_current("enter"))

    assert.are.same({ type = "execute", line = "LeafCmd" }, action)
    assert.equal("LeafCmd", interaction_session.render())
  end)

  it("canonicalizes a typed namespace through the shared session", function()
    interaction_session.begin("")
    interaction_session.set_pending("Tab")

    assert.is_true(interaction_session.canonicalize_typed_namespace())
    assert.equal("Tab ", interaction_session.render())
    assert.equal("Tab", interaction_session.current().prefix)
    assert.equal("", interaction_session.current().pending)
  end)

  it("uses shared semantic backspace to step out of a namespace", function()
    interaction_session.begin("Search code ")

    assert.is_true(interaction_session.semantic_backspace())
    assert.equal("Search code", interaction_session.render())
    assert.equal("Search", interaction_session.current().prefix)
    assert.equal("code", interaction_session.current().pending)
  end)

  it("suppresses namespace canonicalization once after semantic backspace", function()
    interaction_session.begin("Search code ")

    assert.is_true(interaction_session.semantic_backspace())
    assert.is_false(interaction_session.canonicalize_typed_namespace())
    assert.equal("Search code", interaction_session.render())
    assert.is_true(interaction_session.canonicalize_typed_namespace())
    assert.equal("Search code ", interaction_session.render())
  end)

  it("clears canonicalization suppression when a fresh session begins", function()
    interaction_session.begin("Tab ")

    assert.is_true(interaction_session.semantic_backspace())
    interaction_session.begin("")
    interaction_session.set_pending("Tab")

    assert.is_true(interaction_session.canonicalize_typed_namespace())
    assert.equal("Tab ", interaction_session.render())
  end)

  it("refreshes the shared session revision when the command index changes", function()
    interaction_session.begin("Con")
    local first_revision = interaction_session.current().revision

    helpers.create_noarg_command("LeafCmd")
    helpers.sync_cmd_ux()
    interaction_session.sync_from_line("LeafCmd")

    assert.is_true(interaction_session.current().revision > first_revision)
    assert.equal(index.revision(), interaction_session.current().revision)
  end)
end)
