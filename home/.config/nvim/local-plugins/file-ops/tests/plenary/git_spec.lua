---@diagnostic disable: undefined-field

local stub = require("luassert.stub")

local git = require("file_ops.git")

describe("file_ops git GitHub URLs", function()
  after_each(function()
    pcall(function()
      git.relative_to_repo_root:revert()
    end)
    pcall(function()
      git.github_base_url:revert()
    end)
    pcall(function()
      git.current_branch:revert()
    end)
    pcall(function()
      git.branch_exists_on_origin:revert()
    end)
    pcall(function()
      git.default_branch:revert()
    end)
    pcall(function()
      git.head_commit:revert()
    end)
  end)

  it("prefers the current branch when it exists on origin", function()
    stub(git, "relative_to_repo_root", function()
      return "lua/init.lua"
    end)
    stub(git, "github_base_url", function()
      return "https://github.com/acme/widgets"
    end)
    stub(git, "current_branch", function()
      return "feature/copy-links"
    end)
    stub(git, "branch_exists_on_origin", function()
      return true
    end)

    local url = git.github_blob_url("/tmp/repo/lua/init.lua", { line = 40 })

    assert.equal("https://github.com/acme/widgets/blob/feature/copy-links/lua/init.lua#L40", url)
  end)

  it("falls back to the remote default branch when the current branch is unavailable", function()
    stub(git, "relative_to_repo_root", function()
      return "lua/init.lua"
    end)
    stub(git, "github_base_url", function()
      return "https://github.com/acme/widgets"
    end)
    stub(git, "current_branch", function()
      return "feature/copy-links"
    end)
    stub(git, "branch_exists_on_origin", function()
      return false
    end)
    stub(git, "default_branch", function()
      return "main"
    end)

    local url = git.github_blob_url("/tmp/repo/lua/init.lua")

    assert.equal("https://github.com/acme/widgets/blob/main/lua/init.lua", url)
  end)

  it("pins permalinks to the current HEAD commit", function()
    stub(git, "relative_to_repo_root", function()
      return "lua/init.lua"
    end)
    stub(git, "github_base_url", function()
      return "https://github.com/acme/widgets"
    end)
    stub(git, "head_commit", function()
      return "deadbeef"
    end)

    local url = git.github_blob_url("/tmp/repo/lua/init.lua", { line = 40, permalink = true })

    assert.equal("https://github.com/acme/widgets/blob/deadbeef/lua/init.lua#L40", url)
  end)

  it("returns a descriptive error outside git repositories", function()
    stub(git, "relative_to_repo_root", function()
      return nil
    end)

    local url, err = git.github_blob_url("/tmp/nope.lua")

    assert.is_nil(url)
    assert.equal("Current target is not inside a git repository", err)
  end)
end)
