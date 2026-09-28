---@diagnostic disable: undefined-field

local match = require("luassert.match")
local spy = require("luassert.spy")
local stub = require("luassert.stub")

local copy = require("file_ops.commands.copy")
local delete = require("file_ops.commands.delete")
local duplicate = require("file_ops.commands.duplicate")
local fixtures = require("fixtures")
local move = require("file_ops.commands.move")
local new = require("file_ops.commands.new")
local rename = require("file_ops.commands.rename")

local read = fixtures.read
local write = fixtures.write
local open = fixtures.open

---@param answer string?
local function answer_input(answer)
  stub(vim.ui, "input", function(_, on_confirm)
    on_confirm(answer)
  end)
end

---@return string?
local function current_file()
  return vim.uv.fs_realpath(vim.api.nvim_buf_get_name(0))
end

describe("file_ops mutating commands", function()
  local dir
  local trash_result
  local snacks_refuses_copy

  before_each(function()
    dir = fixtures.temp_dir()
    trash_result = { true }
    snacks_refuses_copy = false

    stub(vim, "notify")
    Snacks = {
      bufdelete = spy.new(function() end),
      picker = {
        util = {
          -- Like Snacks, refuses by returning nothing, whether or not it copied.
          copy_path = spy.new(function(from, to)
            if snacks_refuses_copy or vim.uv.fs_stat(to) then
              return
            end
            vim.fn.mkdir(vim.fs.dirname(to), "p")
            if vim.fn.isdirectory(from) == 1 then
              vim.fn.mkdir(to)
            else
              vim.uv.fs_copyfile(from, to)
            end
          end),
        },
      },
      rename = { rename_file = spy.new(function() end) },
    }
    package.loaded["snacks.explorer.actions"] = {
      trash = spy.new(function()
        return unpack(trash_result)
      end),
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
    fixtures.reset()
    vim.fn.delete(dir, "rf")
  end)

  describe("new", function()
    it("keeps the content of a file that already exists", function()
      local path = dir .. "/existing.txt"
      write(path, "keep me")
      answer_input(path)

      new.run()

      assert.are.equal("keep me", read(path))
      assert.are.equal(path, current_file())
    end)

    it("creates and opens an empty file that does not exist", function()
      local path = dir .. "/nested/created.txt"
      answer_input(path)

      new.run()

      assert.are.equal("", read(path))
      assert.are.equal(path, current_file())
    end)

    it("creates a directory for a path ending in a slash", function()
      write(dir .. "/a.txt", "a")
      open(dir .. "/a.txt")
      answer_input(dir .. "/made/")

      new.run()

      assert.are.equal(1, vim.fn.isdirectory(dir .. "/made"))
      assert.are.equal(dir .. "/a.txt", current_file())
    end)

    it("offers the current working directory without a file", function()
      fixtures.enter_scratch()
      answer_input(nil)

      new.run()

      assert
        .stub(vim.ui.input)
        .was_called_with({ prompt = "New: ", default = vim.fn.getcwd() .. "/", completion = "file" }, match.is_function())
    end)

    it("offers the directory under the cursor in mini.files and synchronizes it", function()
      vim.fn.mkdir(dir .. "/sub", "p")
      fixtures.enter_minifiles(dir .. "/sub")
      answer_input(dir .. "/sub/created.txt")

      new.run()

      assert
        .stub(vim.ui.input)
        .was_called_with({ prompt = "New: ", default = dir .. "/sub/", completion = "file" }, match.is_function())
      assert.are.equal("", read(dir .. "/sub/created.txt"))
      assert.are.equal("minifiles", vim.bo.filetype)
      assert.spy(MiniFiles.synchronize).was_called(1)
    end)

    it("reports a path whose parent is a file", function()
      write(dir .. "/a.txt", "a")
      answer_input(dir .. "/a.txt/child.txt")

      new.run()

      assert.stub(vim.notify).was_called(1)
      assert
        .stub(vim.notify)
        .was_called_with(match.matches("^Could not create " .. vim.pesc(dir .. "/a.txt/child.txt") .. "\n.*E739"), vim.log.levels.ERROR)
      assert.are.equal("a", read(dir .. "/a.txt"))
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
      assert.stub(vim.notify).was_called_with(dir .. "/b.txt already exists", vim.log.levels.ERROR)
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

    it("renames the entry under the cursor in mini.files and synchronizes it", function()
      write(dir .. "/a.txt", "a")
      fixtures.enter_minifiles(dir .. "/a.txt")
      answer_input("c")

      rename.run()

      assert.spy(Snacks.rename.rename_file).was_called_with({ from = dir .. "/a.txt", to = dir .. "/c.txt" })
      assert.spy(MiniFiles.synchronize).was_called(1)
    end)

    it("refuses without a file", function()
      fixtures.enter_scratch()
      answer_input("c")

      rename.run()

      assert.stub(vim.ui.input).was_not_called()
      assert.stub(vim.notify).was_called_with("No file in current context", vim.log.levels.WARN)
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
      assert.stub(vim.notify).was_called_with(dir .. "/sub/b.txt already exists", vim.log.levels.ERROR)
      assert.are.equal("b", read(dir .. "/sub/b.txt"))
    end)

    it("moves when the destination is free", function()
      write(dir .. "/a.txt", "a")
      open(dir .. "/a.txt")
      answer_input(dir .. "/sub/a.txt")

      move.run()

      assert.spy(Snacks.rename.rename_file).was_called_with({ from = dir .. "/a.txt", to = dir .. "/sub/a.txt" })
    end)

    it("moves the entry under the cursor in mini.files and synchronizes it", function()
      write(dir .. "/a.txt", "a")
      fixtures.enter_minifiles(dir .. "/a.txt")
      answer_input(dir .. "/sub/a.txt")

      move.run()

      assert.spy(Snacks.rename.rename_file).was_called_with({ from = dir .. "/a.txt", to = dir .. "/sub/a.txt" })
      assert.spy(MiniFiles.synchronize).was_called(1)
    end)

    it("refuses without a file", function()
      fixtures.enter_scratch()
      answer_input(dir .. "/sub/a.txt")

      move.run()

      assert.stub(vim.ui.input).was_not_called()
      assert.stub(vim.notify).was_called_with("No file in current context", vim.log.levels.WARN)
    end)
  end)

  describe("delete", function()
    local choice

    before_each(function()
      choice = "Yes"
      stub(vim.ui, "select", function(_, _, on_choice)
        on_choice(choice)
      end)
    end)

    it("keeps the buffer and reports when the trash fails", function()
      write(dir .. "/a.txt", "a")
      open(dir .. "/a.txt")
      trash_result = { false, "trash is unavailable" }

      delete.run()

      assert.spy(Snacks.bufdelete).was_not_called()
      assert.stub(vim.notify).was_called_with("Could not delete a.txt\ntrash is unavailable", vim.log.levels.ERROR)
    end)

    it("trashes the file and closes its buffer when the trash succeeds", function()
      write(dir .. "/a.txt", "a")
      open(dir .. "/a.txt")

      delete.run()

      assert.spy(package.loaded["snacks.explorer.actions"].trash).was_called_with(dir .. "/a.txt")
      assert.spy(Snacks.bufdelete).was_called_with({ file = dir .. "/a.txt", force = true })
    end)

    it("does nothing unless confirmed", function()
      write(dir .. "/a.txt", "a")
      open(dir .. "/a.txt")
      choice = "No"

      delete.run()

      assert.spy(package.loaded["snacks.explorer.actions"].trash).was_not_called()
      assert.spy(Snacks.bufdelete).was_not_called()
    end)

    it("trashes the entry under the cursor in mini.files and synchronizes it", function()
      write(dir .. "/a.txt", "a")
      fixtures.enter_minifiles(dir .. "/a.txt")

      delete.run()

      assert.spy(package.loaded["snacks.explorer.actions"].trash).was_called_with(dir .. "/a.txt")
      assert.spy(Snacks.bufdelete).was_not_called()
      assert.spy(MiniFiles.synchronize).was_called(1)
    end)

    it("refuses without a file", function()
      fixtures.enter_scratch()

      delete.run()

      assert.stub(vim.ui.select).was_not_called()
      assert.stub(vim.notify).was_called_with("No file in current context", vim.log.levels.WARN)
    end)
  end)

  describe("duplicate", function()
    it("copies the file beside itself with a _copy suffix and opens the copy", function()
      write(dir .. "/a.txt", "a")
      open(dir .. "/a.txt")

      duplicate.run()

      assert.spy(Snacks.picker.util.copy_path).was_called_with(dir .. "/a.txt", dir .. "/a_copy.txt")
      assert.are.equal("a", read(dir .. "/a_copy.txt"))
      assert.are.equal(dir .. "/a_copy.txt", current_file())
    end)

    it("refuses when the copy's name is taken", function()
      write(dir .. "/a.txt", "a")
      write(dir .. "/a_copy.txt", "old")
      open(dir .. "/a.txt")

      duplicate.run()

      assert.spy(Snacks.picker.util.copy_path).was_not_called()
      assert.stub(vim.notify).was_called_with(dir .. "/a_copy.txt already exists", vim.log.levels.ERROR)
      assert.are.equal("old", read(dir .. "/a_copy.txt"))
      assert.are.equal(dir .. "/a.txt", current_file())
    end)

    it("stays on the file when Snacks does not copy it", function()
      write(dir .. "/a.txt", "a")
      open(dir .. "/a.txt")
      snacks_refuses_copy = true

      duplicate.run()

      assert.is_nil(vim.uv.fs_stat(dir .. "/a_copy.txt"))
      assert.are.equal(dir .. "/a.txt", current_file())
    end)

    it("duplicates a directory under the cursor in mini.files and synchronizes it", function()
      vim.fn.mkdir(dir .. "/bar", "p")
      fixtures.enter_minifiles(dir .. "/bar")

      duplicate.run()

      assert.spy(Snacks.picker.util.copy_path).was_called_with(dir .. "/bar", dir .. "/bar_copy")
      assert.are.equal("minifiles", vim.bo.filetype)
      assert.spy(MiniFiles.synchronize).was_called(1)
    end)

    it("refuses without a file", function()
      fixtures.enter_scratch()

      duplicate.run()

      assert.spy(Snacks.picker.util.copy_path).was_not_called()
      assert.stub(vim.notify).was_called_with("No file in current context", vim.log.levels.WARN)
    end)
  end)

  describe("copy", function()
    it("copies the file to a new path", function()
      write(dir .. "/a.txt", "a")
      open(dir .. "/a.txt")
      answer_input(dir .. "/b.txt")

      copy.run()

      assert.spy(Snacks.picker.util.copy_path).was_called_with(dir .. "/a.txt", dir .. "/b.txt")
      assert.are.equal("a", read(dir .. "/b.txt"))
    end)

    it("copies into an existing directory under the same name", function()
      write(dir .. "/a.txt", "a")
      vim.fn.mkdir(dir .. "/sub", "p")
      open(dir .. "/a.txt")
      answer_input(dir .. "/sub")

      copy.run()

      assert.spy(Snacks.picker.util.copy_path).was_called_with(dir .. "/a.txt", dir .. "/sub/a.txt")
      assert.are.equal("a", read(dir .. "/sub/a.txt"))
    end)

    it("refuses when the destination is taken", function()
      write(dir .. "/a.txt", "a")
      write(dir .. "/b.txt", "b")
      open(dir .. "/a.txt")
      answer_input(dir .. "/b.txt")

      copy.run()

      assert.spy(Snacks.picker.util.copy_path).was_not_called()
      assert.stub(vim.notify).was_called_with(dir .. "/b.txt already exists", vim.log.levels.ERROR)
      assert.are.equal("b", read(dir .. "/b.txt"))
    end)

    it("refuses when the destination directory already holds that name", function()
      write(dir .. "/a.txt", "a")
      write(dir .. "/sub/a.txt", "old")
      open(dir .. "/a.txt")
      answer_input(dir .. "/sub")

      copy.run()

      assert.spy(Snacks.picker.util.copy_path).was_not_called()
      assert.stub(vim.notify).was_called_with(dir .. "/sub/a.txt already exists", vim.log.levels.ERROR)
      assert.are.equal("old", read(dir .. "/sub/a.txt"))
    end)

    for _, destination in ipairs({ "/d", "/d/inner/deeper" }) do
      it(("refuses to copy a directory into itself (%s)"):format(destination), function()
        vim.fn.mkdir(dir .. "/d/inner", "p")
        fixtures.enter_minifiles(dir .. "/d")
        answer_input(dir .. destination)

        copy.run()

        assert.spy(Snacks.picker.util.copy_path).was_not_called()
        assert.stub(vim.notify).was_called_with("Cannot copy " .. dir .. "/d into itself", vim.log.levels.ERROR)
        assert.spy(MiniFiles.synchronize).was_not_called()
      end)
    end

    it("copies the entry under the cursor in mini.files and synchronizes it", function()
      write(dir .. "/a.txt", "a")
      fixtures.enter_minifiles(dir .. "/a.txt")
      answer_input(dir .. "/b.txt")

      copy.run()

      assert.spy(Snacks.picker.util.copy_path).was_called_with(dir .. "/a.txt", dir .. "/b.txt")
      assert.spy(MiniFiles.synchronize).was_called(1)
    end)

    it("leaves mini.files alone when Snacks does not copy", function()
      write(dir .. "/a.txt", "a")
      fixtures.enter_minifiles(dir .. "/a.txt")
      answer_input(dir .. "/b.txt")
      snacks_refuses_copy = true

      copy.run()

      assert.spy(Snacks.picker.util.copy_path).was_called_with(dir .. "/a.txt", dir .. "/b.txt")
      assert.spy(MiniFiles.synchronize).was_not_called()
    end)

    it("refuses without a file", function()
      fixtures.enter_scratch()
      answer_input(dir .. "/b.txt")

      copy.run()

      assert.stub(vim.ui.input).was_not_called()
      assert.stub(vim.notify).was_called_with("No file in current context", vim.log.levels.WARN)
    end)
  end)
end)
