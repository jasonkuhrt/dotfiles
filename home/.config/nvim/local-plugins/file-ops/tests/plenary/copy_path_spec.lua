---@diagnostic disable: undefined-field

local stub = require("luassert.stub")

local commands = require("file_ops.commands")
local copy_file = require("file_ops.commands.copy")
local copy_path = require("file_ops.commands.copy_path")
local git = require("file_ops.git")

---@param path string
---@param line_count integer
---@return integer
local function open_file_buffer(path, line_count)
  local lines = {}
  for index = 1, line_count do
    lines[index] = ("line %d"):format(index)
  end

  vim.fn.mkdir(vim.fs.dirname(path), "p")
  vim.fn.writefile(lines, path)

  local buf = vim.api.nvim_create_buf(true, false)
  vim.api.nvim_buf_set_name(buf, path)
  vim.api.nvim_buf_set_lines(buf, 0, -1, false, lines)
  vim.api.nvim_set_current_buf(buf)
  return buf
end

describe("file_ops copy path commands", function()
  before_each(function()
    stub(vim.fn, "setreg")
    stub(vim, "notify")
  end)

  after_each(function()
    vim.fn.setreg:revert()
    vim.notify:revert()
    pcall(function()
      git.relative_to_repo_root:revert()
    end)
    pcall(function()
      git.github_blob_url:revert()
    end)
    pcall(function()
      copy_path.absolute:revert()
    end)
    pcall(function()
      copy_file.run:revert()
    end)
    pcall(vim.cmd, "%bwipeout!")
  end)

  it("copies the absolute path with the current line as path:line", function()
    local dir = vim.fn.tempname()
    local path = dir .. "/lua/init.lua"
    local buf = open_file_buffer(path, 50)
    vim.api.nvim_win_set_cursor(0, { 40, 0 })
    local expected = vim.api.nvim_buf_get_name(buf) .. ":40"

    copy_path.absolute_line()

    assert.stub(vim.fn.setreg).was_called_with("+", expected)
    assert.stub(vim.notify).was_called_with("Absolute path + line: " .. expected)

    vim.api.nvim_buf_delete(buf, { force = true })
    vim.fn.delete(dir, "rf")
  end)

  it("copies the repo-relative path with the current line", function()
    local dir = vim.fn.tempname()
    local path = dir .. "/lua/init.lua"
    local buf = open_file_buffer(path, 50)
    vim.api.nvim_win_set_cursor(0, { 40, 0 })
    stub(git, "relative_to_repo_root", function()
      return "lua/init.lua"
    end)

    copy_path.project_line()

    assert.stub(vim.fn.setreg).was_called_with("+", "lua/init.lua:40")
    assert.stub(vim.notify).was_called_with("Project path + line: lua/init.lua:40")
    vim.api.nvim_buf_delete(buf, { force = true })
    vim.fn.delete(dir, "rf")
  end)

  it("copies GitHub links through the git helper", function()
    local dir = vim.fn.tempname()
    local path = dir .. "/lua/init.lua"
    local buf = open_file_buffer(path, 50)
    vim.api.nvim_win_set_cursor(0, { 40, 0 })
    stub(git, "github_blob_url", function(_, opts)
      if opts and opts.permalink then
        return "https://github.com/acme/widgets/blob/abc123/lua/init.lua#L40"
      end

      return "https://github.com/acme/widgets/blob/main/lua/init.lua#L40"
    end)

    copy_path.github_link_line()
    copy_path.github_permalink_line()

    assert.stub(vim.fn.setreg).was_called_with("+", "https://github.com/acme/widgets/blob/main/lua/init.lua#L40")
    assert.stub(vim.fn.setreg).was_called_with("+", "https://github.com/acme/widgets/blob/abc123/lua/init.lua#L40")
    assert
      .stub(vim.notify)
      .was_called_with("GitHub link + line: https://github.com/acme/widgets/blob/main/lua/init.lua#L40")
    assert
      .stub(vim.notify)
      .was_called_with("GitHub permalink + line: https://github.com/acme/widgets/blob/abc123/lua/init.lua#L40")
    vim.api.nvim_buf_delete(buf, { force = true })
    vim.fn.delete(dir, "rf")
  end)

  it("routes nested copy commands through the command tree", function()
    stub(copy_path, "absolute")
    stub(copy_file, "run")

    commands.execute("copy path abs")
    commands.execute("copy to")

    assert.stub(copy_path.absolute).was_called(1)
    assert.stub(copy_file.run).was_called(1)
  end)

  it("exposes nested copy namespaces through File completion", function()
    assert.are.same({ "copy" }, commands.complete("File co"))
    assert.are.same({ "dir", "github", "name", "path", "to" }, commands.complete("File copy "))
    assert.are.same({ "abs", "abs-line", "project", "project-line", "relative" }, commands.complete("File copy path "))
    assert.are.same({ "link", "link-line", "permalink", "permalink-line" }, commands.complete("File copy github "))
  end)
end)
