---@diagnostic disable: undefined-field

local target = require("file_ops.target")

describe("resolve_target", function()
  it("returns minifiles context when filetype is minifiles", function()
    -- Mock minifiles environment
    local original_ft = vim.bo.filetype
    vim.bo.filetype = "minifiles"

    MiniFiles = {
      get_fs_entry = function()
        return { path = "/tmp/test.lua", name = "test.lua" }
      end,
      synchronize = function() end,
    }

    local t = target.resolve()
    assert.are.equal("minifiles", t.context)
    assert.are.equal("/tmp/test.lua", t.path)
    assert.are.equal("test.lua", t.name)
    assert.are.equal("/tmp", t.dir)

    vim.bo.filetype = original_ft
    MiniFiles = nil
  end)

  it("returns buffer context when buffer has a real file", function()
    local tmpfile = vim.fn.tempname()
    local f = io.open(tmpfile, "w")
    if f then
      f:write("test")
      f:close()
    end

    local buf = vim.api.nvim_create_buf(false, false)
    vim.api.nvim_buf_set_name(buf, tmpfile)
    vim.api.nvim_set_current_buf(buf)

    local t = target.resolve()
    assert.are.equal("buffer", t.context)
    assert.are.equal(vim.uv.fs_realpath(tmpfile), vim.uv.fs_realpath(t.path))

    vim.api.nvim_buf_delete(buf, { force = true })
    os.remove(tmpfile)
  end)

  it("returns none context when no file", function()
    local buf = vim.api.nvim_create_buf(false, false)
    vim.api.nvim_set_current_buf(buf)

    local t = target.resolve()
    assert.are.equal("none", t.context)

    vim.api.nvim_buf_delete(buf, { force = true })
  end)
end)

describe("after_mutation", function()
  it("calls synchronize for minifiles context", function()
    local synced = false
    MiniFiles = {
      synchronize = function()
        synced = true
      end,
    }

    target.after_mutation({ context = "minifiles" })
    assert.is_true(synced)

    MiniFiles = nil
  end)

  it("does not call synchronize for buffer context", function()
    local synced = false
    MiniFiles = {
      synchronize = function()
        synced = true
      end,
    }

    target.after_mutation({ context = "buffer" })
    assert.is_false(synced)

    MiniFiles = nil
  end)
end)
