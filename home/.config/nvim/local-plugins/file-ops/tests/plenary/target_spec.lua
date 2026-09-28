---@diagnostic disable: undefined-field

local fixtures = require("fixtures")
local target = require("file_ops.target")

describe("target.resolve", function()
  local dir

  before_each(function()
    dir = fixtures.temp_dir()
  end)

  after_each(function()
    fixtures.reset()
    vim.fn.delete(dir, "rf")
  end)

  it("returns the entry under the cursor in mini.files", function()
    fixtures.enter_minifiles(dir .. "/test.lua")

    assert.are.same({
      path = dir .. "/test.lua",
      dir = dir,
      name = "test.lua",
      context = "minifiles",
    }, target.resolve())
  end)

  it("returns the file of a buffer that has one", function()
    fixtures.write(dir .. "/test.lua", "test")
    fixtures.open(dir .. "/test.lua")

    local t = target.resolve()

    assert.are.equal("buffer", t.context)
    assert.are.equal(dir .. "/test.lua", vim.uv.fs_realpath(t.path))
    assert.are.equal(dir, vim.uv.fs_realpath(t.dir))
    assert.are.equal("test.lua", t.name)
  end)

  it("returns no target for a buffer whose file does not exist", function()
    fixtures.open(dir .. "/unsaved.lua")

    assert.are.same({ context = "none" }, target.resolve())
  end)

  it("returns no target for a buffer without a file", function()
    fixtures.enter_scratch()

    assert.are.same({ context = "none" }, target.resolve())
  end)
end)

describe("target.after_mutation", function()
  after_each(function()
    fixtures.reset()
  end)

  it("synchronizes mini.files after a mutation made from it", function()
    fixtures.enter_minifiles("/tmp/test.lua")

    target.after_mutation({ context = "minifiles" })

    assert.spy(MiniFiles.synchronize).was_called(1)
  end)

  it("leaves mini.files alone after a mutation made from a buffer", function()
    fixtures.enter_minifiles("/tmp/test.lua")

    target.after_mutation({ context = "buffer" })

    assert.spy(MiniFiles.synchronize).was_not_called()
  end)
end)
