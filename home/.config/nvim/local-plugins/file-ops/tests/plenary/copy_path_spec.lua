---@diagnostic disable: undefined-field

local stub = require("luassert.stub")

local commands = require("file_ops.commands")
local copy_file = require("file_ops.commands.copy")
local copy_path = require("file_ops.commands.copy_path")
local fixtures = require("fixtures")
local git = require("file_ops.git")

local line_variants = { "absolute_line", "project_line", "github_link_line", "github_permalink_line" }

---@param dir string
---@return { run: string, label: string, value: string }[]
local function whole_file_variants(dir)
  return {
    { run = "absolute", label = "Absolute path", value = dir .. "/lua/init.lua" },
    { run = "relative", label = "Relative path", value = "lua/init.lua" },
    { run = "project", label = "Project path", value = "lua/init.lua" },
    { run = "name", label = "Name", value = "init.lua" },
    { run = "dir_path", label = "Directory", value = dir .. "/lua" },
    { run = "github_link", label = "GitHub link", value = "https://github.com/acme/widgets/blob/main/lua/init.lua" },
    {
      run = "github_permalink",
      label = "GitHub permalink",
      value = "https://github.com/acme/widgets/blob/abc123/lua/init.lua",
    },
  }
end

describe("file_ops copy path commands", function()
  local dir
  local file
  local previous_cwd

  before_each(function()
    dir = fixtures.temp_dir()
    file = dir .. "/lua/init.lua"
    local lines = {}
    for index = 1, 50 do
      lines[index] = ("line %d"):format(index)
    end
    vim.fn.mkdir(dir .. "/lua", "p")
    vim.fn.writefile(lines, file)
    previous_cwd = vim.fn.chdir(dir)

    stub(vim.fn, "setreg")
    stub(vim, "notify")
    stub(git, "relative_to_repo_root", function(path)
      if path == file then
        return "lua/init.lua"
      end
    end)
    stub(git, "github_blob_url", function(path, opts)
      if path ~= file then
        return nil, "unexpected path " .. path
      end
      opts = opts or {}
      local url = ("https://github.com/acme/widgets/blob/%s/lua/init.lua"):format(opts.permalink and "abc123" or "main")
      return opts.line and ("%s#L%d"):format(url, opts.line) or url
    end)
  end)

  after_each(function()
    vim.fn.setreg:revert()
    vim.notify:revert()
    git.relative_to_repo_root:revert()
    git.github_blob_url:revert()
    pcall(function()
      copy_path.absolute:revert()
    end)
    pcall(function()
      copy_file.run:revert()
    end)
    fixtures.reset()
    vim.fn.chdir(previous_cwd)
    vim.fn.delete(dir, "rf")
  end)

  describe("in a file buffer", function()
    before_each(function()
      fixtures.open(file)
      vim.api.nvim_win_set_cursor(0, { 40, 0 })
    end)

    it("copies each whole-file variant of the buffer's file", function()
      for _, variant in ipairs(whole_file_variants(dir)) do
        copy_path[variant.run]()

        assert.stub(vim.fn.setreg).was_called_with("+", variant.value)
        assert.stub(vim.notify).was_called_with(variant.label .. ": " .. variant.value)
      end
    end)

    it("copies the absolute path with the cursor line as path:line", function()
      copy_path.absolute_line()

      assert.stub(vim.fn.setreg).was_called_with("+", file .. ":40")
      assert.stub(vim.notify).was_called_with("Absolute path + line: " .. file .. ":40")
    end)

    it("copies the repo-relative path with the cursor line", function()
      copy_path.project_line()

      assert.stub(vim.fn.setreg).was_called_with("+", "lua/init.lua:40")
      assert.stub(vim.notify).was_called_with("Project path + line: lua/init.lua:40")
    end)

    it("copies GitHub links anchored to the cursor line", function()
      copy_path.github_link_line()
      copy_path.github_permalink_line()

      local link = "https://github.com/acme/widgets/blob/main/lua/init.lua#L40"
      local permalink = "https://github.com/acme/widgets/blob/abc123/lua/init.lua#L40"
      assert.stub(vim.fn.setreg).was_called_with("+", link)
      assert.stub(vim.fn.setreg).was_called_with("+", permalink)
      assert.stub(vim.notify).was_called_with("GitHub link + line: " .. link)
      assert.stub(vim.notify).was_called_with("GitHub permalink + line: " .. permalink)
    end)

    it("reports why a path cannot be copied and copies nothing", function()
      git.github_blob_url:revert()
      stub(git, "github_blob_url", function()
        return nil, "Origin remote is not a GitHub URL"
      end)

      copy_path.github_link()

      assert.stub(vim.fn.setreg).was_not_called()
      assert.stub(vim.notify).was_called_with("Origin remote is not a GitHub URL", vim.log.levels.WARN)
    end)
  end)

  describe("in mini.files", function()
    before_each(function()
      fixtures.enter_minifiles(file)
    end)

    it("copies each whole-file variant of the entry under the cursor", function()
      for _, variant in ipairs(whole_file_variants(dir)) do
        copy_path[variant.run]()

        assert.stub(vim.fn.setreg).was_called_with("+", variant.value)
        assert.stub(vim.notify).was_called_with(variant.label .. ": " .. variant.value)
      end
    end)

    for _, run in ipairs(line_variants) do
      it(("refuses %s because the explorer line is not a file line"):format(run), function()
        copy_path[run]()

        assert.stub(vim.fn.setreg).was_not_called()
        assert.stub(vim.notify).was_called(1)
        assert.stub(vim.notify).was_called_with("Current buffer line copy requires a file buffer", vim.log.levels.WARN)
      end)
    end
  end)

  describe("without a file", function()
    before_each(function()
      fixtures.enter_scratch()
    end)

    local every_variant = vim.tbl_keys(copy_path)
    table.sort(every_variant)

    for _, run in ipairs(every_variant) do
      it(("refuses %s with a single warning"):format(run), function()
        copy_path[run]()

        assert.stub(vim.fn.setreg).was_not_called()
        assert.stub(vim.notify).was_called(1)
        assert.stub(vim.notify).was_called_with("No file in current context", vim.log.levels.WARN)
      end)
    end
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
