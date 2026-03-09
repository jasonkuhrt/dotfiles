describe("kit Penlight integration", function()
  it("loads Penlight in the Neovim plugin environment", function()
    local stringx = require("pl.stringx")

    assert(type(stringx.strip) == "function")
    assert(type(stringx.split) == "function")
  end)

  it("keeps kit wrappers returning plain Lua data", function()
    local collections = require("kit.collections")
    local modules = require("kit.modules")
    local strings = require("kit.strings")

    assert(vim.deep_equal("hello", strings.trim("  hello  ")))
    assert(vim.deep_equal({ "one", "two", "three" }, strings.split_words("one two three")))
    assert(vim.deep_equal({ 2, 3 }, collections.slice({ 1, 2, 3 }, 2)))
    assert(vim.deep_equal({ "one", "two" }, collections.unique({ "one", "two", "one" })))
    assert(collections.find({ "one", "two", "three" }, function(item)
      return item == "two"
    end) == "two")

    package.loaded["kit_test_optional"] = {
      ok = function()
        return true
      end,
    }

    assert(type(modules.optional("kit_test_optional", "table")) == "table")
    assert(type(modules.field(modules.optional("kit_test_optional", "table"), "ok", "function")) == "function")
    assert(modules.optional("kit_missing_optional", "table") == nil)

    package.loaded["kit_test_optional"] = nil
  end)
end)
