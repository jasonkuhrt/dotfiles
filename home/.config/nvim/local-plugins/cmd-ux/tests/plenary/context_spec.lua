---@diagnostic disable: undefined-field

local context = require("cmd_ux.lib.context")

describe("cmd_ux context", function()
  local original_cwd

  before_each(function()
    original_cwd = vim.fn.getcwd()
  end)

  after_each(function()
    vim.cmd("lcd " .. vim.fn.fnameescape(original_cwd))
  end)

  it("resolves the enclosing git repo root from nested working directories", function()
    local repo_root = vim.fn.tempname()
    local nested = repo_root .. "/packages/app/src"

    vim.fn.mkdir(repo_root .. "/.git", "p")
    vim.fn.mkdir(nested, "p")
    vim.cmd("lcd " .. vim.fn.fnameescape(nested))

    local expected = vim.uv.fs_realpath(vim.fn.fnamemodify(repo_root, ":p"))
    local actual = vim.uv.fs_realpath(context.project_id())

    assert.are.equal(expected, actual)

    pcall(vim.fn.delete, repo_root, "rf")
  end)
end)
