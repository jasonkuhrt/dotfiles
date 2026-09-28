---@diagnostic disable: undefined-field

local spy = require("luassert.spy")
local stub = require("luassert.stub")

local delete = require("file_ops.commands.delete")
local move = require("file_ops.commands.move")
local new = require("file_ops.commands.new")
local rename = require("file_ops.commands.rename")

---@param path string
---@param content string
local function write(path, content)
  vim.fn.mkdir(vim.fs.dirname(path), "p")
  vim.fn.writefile({ content }, path)
end

---@param path string
---@return string
local function read(path)
  return table.concat(vim.fn.readfile(path), "\n")
end

---@param path string
local function open(path)
  vim.cmd({ cmd = "edit", args = { path } })
end

---@param answer string
local function answer_input(answer)
  stub(vim.ui, "input", function(_, on_confirm)
    on_confirm(answer)
  end)
end

---@return boolean
local function notified_error()
  for _, call in ipairs(vim.notify.calls) do
    if call.refs[2] == vim.log.levels.ERROR then
      return true
    end
  end
  return false
end

describe("file_ops mutating commands", function()
  local dir
  local trash_result

  before_each(function()
    dir = vim.uv.fs_realpath(vim.fn.tempname():match("^(.*)/")) .. "/file-ops-" .. vim.uv.hrtime()
    vim.fn.mkdir(dir, "p")
    trash_result = { true }

    stub(vim, "notify")
    Snacks = {
      rename = { rename_file = spy.new(function() end) },
      bufdelete = spy.new(function() end),
    }
    package.loaded["snacks.explorer.actions"] = {
      trash = function()
        return unpack(trash_result)
      end,
    }
  end)

  after_each(function()
    vim.notify:revert()
    pcall(function()
      vim.ui.input:revert()
    end)
    pcall(function()
      vim.ui.select:revert()
    end)
    Snacks = nil
    package.loaded["snacks.explorer.actions"] = nil
    pcall(vim.cmd, "%bwipeout!")
    vim.fn.delete(dir, "rf")
  end)

  describe("new", function()
    it("keeps the content of a file that already exists", function()
      local path = dir .. "/existing.txt"
      write(path, "keep me")
      answer_input(path)

      new.run()

      assert.are.equal("keep me", read(path))
      assert.are.equal(path, vim.uv.fs_realpath(vim.api.nvim_buf_get_name(0)))
    end)

    it("creates a file that does not exist", function()
      local path = dir .. "/nested/created.txt"
      answer_input(path)

      new.run()

      assert.is_not_nil(vim.uv.fs_stat(path))
    end)
  end)

  describe("rename", function()
    it("refuses when the new name is taken", function()
      write(dir .. "/a.txt", "a")
      write(dir .. "/b.txt", "b")
      open(dir .. "/a.txt")
      answer_input("b")

      rename.run()

      assert.spy(Snacks.rename.rename_file).was_not_called()
      assert.is_true(notified_error())
      assert.are.equal("b", read(dir .. "/b.txt"))
    end)

    it("renames when the new name is free", function()
      write(dir .. "/a.txt", "a")
      open(dir .. "/a.txt")
      answer_input("c")

      rename.run()

      assert.spy(Snacks.rename.rename_file).was_called_with({ from = dir .. "/a.txt", to = dir .. "/c.txt" })
    end)

    it("allows a rename that only changes letter case", function()
      write(dir .. "/a.txt", "a")
      open(dir .. "/a.txt")
      answer_input("A")

      rename.run()

      assert.spy(Snacks.rename.rename_file).was_called_with({ from = dir .. "/a.txt", to = dir .. "/A.txt" })
    end)
  end)

  describe("move", function()
    it("refuses when the destination is taken", function()
      write(dir .. "/a.txt", "a")
      write(dir .. "/sub/b.txt", "b")
      open(dir .. "/a.txt")
      answer_input(dir .. "/sub/b.txt")

      move.run()

      assert.spy(Snacks.rename.rename_file).was_not_called()
      assert.is_true(notified_error())
      assert.are.equal("b", read(dir .. "/sub/b.txt"))
    end)

    it("moves when the destination is free", function()
      write(dir .. "/a.txt", "a")
      open(dir .. "/a.txt")
      answer_input(dir .. "/sub/a.txt")

      move.run()

      assert.spy(Snacks.rename.rename_file).was_called_with({ from = dir .. "/a.txt", to = dir .. "/sub/a.txt" })
    end)
  end)

  describe("delete", function()
    before_each(function()
      stub(vim.ui, "select", function(_, _, on_choice)
        on_choice("Yes")
      end)
    end)

    it("keeps the buffer and reports when the trash fails", function()
      write(dir .. "/a.txt", "a")
      open(dir .. "/a.txt")
      trash_result = { false, "trash is unavailable" }

      delete.run()

      assert.spy(Snacks.bufdelete).was_not_called()
      assert.is_true(notified_error())
    end)

    it("closes the buffer when the trash succeeds", function()
      write(dir .. "/a.txt", "a")
      open(dir .. "/a.txt")

      delete.run()

      assert.spy(Snacks.bufdelete).was_called_with({ file = dir .. "/a.txt", force = true })
    end)
  end)
end)
