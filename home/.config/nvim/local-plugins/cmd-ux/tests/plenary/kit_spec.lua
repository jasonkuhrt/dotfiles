describe("kit Penlight integration", function()
  it("loads Penlight in the Neovim plugin environment", function()
    local stringx = require("pl.stringx")

    assert(type(stringx.strip) == "function")
    assert(type(stringx.split) == "function")
  end)

  it("keeps kit wrappers returning plain Lua data", function()
    local collections = require("kit.collections")
    local strings = require("kit.strings")

    assert(vim.deep_equal("hello", strings.trim("  hello  ")))
    assert(vim.deep_equal({ "one", "two", "three" }, strings.split_words("one two three")))
    assert(vim.deep_equal({ 2, 3 }, collections.slice({ 1, 2, 3 }, 2)))
  end)
end)
