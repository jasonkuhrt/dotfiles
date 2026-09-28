---@diagnostic disable: undefined-field

local spy = require("luassert.spy")
local stub = require("luassert.stub")

local fixtures = require("fixtures")
local git = require("file_ops.git")

local identity = {
  GIT_AUTHOR_NAME = "file-ops",
  GIT_AUTHOR_EMAIL = "file-ops@example.invalid",
  GIT_COMMITTER_NAME = "file-ops",
  GIT_COMMITTER_EMAIL = "file-ops@example.invalid",
}

---@param repo string
---@param ... string
---@return string
local function git_in(repo, ...)
  local result = vim.system({ "git", "-C", repo, ... }, { env = identity, text = true }):wait()
  assert(result.code == 0, result.stderr)
  return vim.trim(result.stdout)
end

---@param path string
---@param branch? string
---@return string
local function init_repo(path, branch)
  vim.fn.mkdir(path, "p")
  git_in(path, "init", "--quiet", "--initial-branch=" .. (branch or "main"))
  return path
end

---Commits the empty tree with plumbing, which runs no hooks.
---@param repo string
---@param parent? string
---@return string
local function commit(repo, parent)
  local args = { "commit-tree", git_in(repo, "write-tree"), "-m", "commit" }
  if parent then
    vim.list_extend(args, { "-p", parent })
  end
  local sha = git_in(repo, unpack(args))
  git_in(repo, "update-ref", "HEAD", sha)
  return sha
end

---@param argv string[]
---@return integer
local function count_spawns(argv)
  local count = 0
  for _, call in ipairs(vim.system.calls) do
    if vim.deep_equal(call.refs[1], argv) then
      count = count + 1
    end
  end
  return count
end

describe("file_ops git", function()
  local dir

  before_each(function()
    dir = fixtures.temp_dir()
  end)

  after_each(function()
    pcall(function()
      vim.system:revert()
    end)
    vim.fn.delete(dir, "rf")
  end)

  describe("parse_github_base_url", function()
    for _, case in ipairs({
      { "git@github.com:acme/widgets.git", "https://github.com/acme/widgets" },
      { "git@github.com:acme/widgets", "https://github.com/acme/widgets" },
      { "ssh://git@github.com/acme/widgets.git", "https://github.com/acme/widgets" },
      { "ssh://git@github.example.com:2222/acme/widgets.git", "https://github.example.com/acme/widgets" },
      { "https://github.com/acme/widgets.git", "https://github.com/acme/widgets" },
      { "https://github.com/acme/widgets.git/", "https://github.com/acme/widgets" },
      { "http://github.com/acme/widgets", "https://github.com/acme/widgets" },
      { "https://x-access-token:secret@github.com/acme/widgets.git", "https://github.com/acme/widgets" },
      { "git@github.example.com:acme/widgets.git", "https://github.example.com/acme/widgets" },
      { "git@gitlab.com:acme/widgets.git", nil },
      { "/srv/git/widgets.git", nil },
    }) do
      local remote, expected = case[1], case[2]
      it(("maps %s to %s"):format(remote, tostring(expected)), function()
        assert.are.equal(expected, git.parse_github_base_url(remote))
      end)
    end
  end)

  describe("github_blob_url", function()
    after_each(function()
      for _, name in ipairs({
        "relative_to_repo_root",
        "github_base_url",
        "current_branch",
        "branch_exists_on_origin",
        "default_branch",
        "head_commit",
      }) do
        pcall(function()
          git[name]:revert()
        end)
      end
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

    it("builds links for a file in a real repository whose origin cannot be reached", function()
      local repo = init_repo(dir .. "/repo")
      local sha = commit(repo)
      git_in(repo, "remote", "add", "origin", "git@github.invalid:acme/widgets.git")
      git_in(repo, "update-ref", "refs/remotes/origin/main", sha)
      local file = repo .. "/lua/my file.lua"
      fixtures.write(file, "x")

      assert.are.equal(
        "https://github.invalid/acme/widgets/blob/main/lua/my%20file.lua#L3",
        git.github_blob_url(file, { line = 3 })
      )
      assert.are.equal(
        ("https://github.invalid/acme/widgets/blob/%s/lua/my%%20file.lua"):format(sha),
        git.github_blob_url(file, { permalink = true })
      )
    end)
  end)

  describe("lookups that can change during a session", function()
    it("returns the new HEAD commit after a commit", function()
      local repo = init_repo(dir .. "/repo")
      local first = commit(repo)
      assert.are.equal(first, git.head_commit(repo))

      local second = commit(repo, first)

      assert.are.equal(second, git.head_commit(repo))
    end)

    it("returns the new branch after a branch switch", function()
      local repo = init_repo(dir .. "/repo")
      local sha = commit(repo)
      assert.are.equal("main", git.current_branch(repo))

      git_in(repo, "update-ref", "refs/heads/topic", sha)
      git_in(repo, "symbolic-ref", "HEAD", "refs/heads/topic")

      assert.are.equal("topic", git.current_branch(repo))
    end)

    it("sees a branch pushed to origin after the first lookup", function()
      local origin = init_repo(dir .. "/origin")
      local sha = commit(origin)
      local repo = init_repo(dir .. "/repo")
      git_in(repo, "remote", "add", "origin", origin)
      assert.is_false(git.branch_exists_on_origin(repo, "topic"))

      git_in(origin, "update-ref", "refs/heads/topic", sha)

      assert.is_true(git.branch_exists_on_origin(repo, "topic"))
    end)

    it("finds a repository created after a failed lookup", function()
      local path = dir .. "/later"
      vim.fn.mkdir(path, "p")
      assert.is_nil(git.repo_root(path))

      init_repo(path)

      assert.are.equal(path, git.repo_root(path))
    end)
  end)

  it("looks up a repository's root and origin once", function()
    local repo = init_repo(dir .. "/repo")
    git_in(repo, "remote", "add", "origin", "git@github.com:acme/widgets.git")
    spy.on(vim, "system")

    assert.are.equal("https://github.com/acme/widgets", git.github_base_url(repo))
    assert.are.equal("https://github.com/acme/widgets", git.github_base_url(repo))

    assert.are.equal(1, count_spawns({ "git", "-C", repo, "rev-parse", "--show-toplevel" }))
    assert.are.equal(1, count_spawns({ "git", "-C", repo, "remote", "get-url", "origin" }))
  end)

  describe("default_branch", function()
    it("uses origin's HEAD as recorded by the last fetch", function()
      local repo = init_repo(dir .. "/repo")
      git_in(repo, "remote", "add", "origin", dir .. "/missing")
      git_in(repo, "update-ref", "refs/remotes/origin/develop", commit(repo))
      git_in(repo, "symbolic-ref", "refs/remotes/origin/HEAD", "refs/remotes/origin/develop")

      assert.are.equal("develop", git.default_branch(repo))
    end)

    it("asks origin for its HEAD when no fetch recorded it", function()
      local origin = init_repo(dir .. "/origin", "trunk")
      commit(origin)
      local repo = init_repo(dir .. "/repo")
      git_in(repo, "remote", "add", "origin", origin)

      assert.are.equal("trunk", git.default_branch(repo))
    end)

    it("falls back to a remote-tracking master when origin cannot be reached", function()
      local repo = init_repo(dir .. "/repo")
      git_in(repo, "remote", "add", "origin", dir .. "/missing")
      git_in(repo, "update-ref", "refs/remotes/origin/master", commit(repo))

      assert.are.equal("master", git.default_branch(repo))
    end)

    it("returns nothing when no default branch can be found", function()
      local repo = init_repo(dir .. "/repo")
      git_in(repo, "remote", "add", "origin", dir .. "/missing")

      assert.is_nil(git.default_branch(repo))
    end)
  end)

  describe("branch_exists_on_origin", function()
    it("trusts remote-tracking branches when origin cannot be reached", function()
      local repo = init_repo(dir .. "/repo")
      git_in(repo, "remote", "add", "origin", dir .. "/missing")
      git_in(repo, "update-ref", "refs/remotes/origin/topic", commit(repo))

      assert.is_true(git.branch_exists_on_origin(repo, "topic"))
      assert.is_false(git.branch_exists_on_origin(repo, "other"))
    end)

    it("trusts origin over a stale remote-tracking branch", function()
      local origin = init_repo(dir .. "/origin")
      commit(origin)
      local repo = init_repo(dir .. "/repo")
      git_in(repo, "remote", "add", "origin", origin)
      git_in(repo, "update-ref", "refs/remotes/origin/topic", commit(repo))

      assert.is_false(git.branch_exists_on_origin(repo, "topic"))
    end)

    it("gives up on an unresponsive origin after 3 seconds and stops its transport", function()
      local repo = init_repo(dir .. "/repo")
      local transport = dir .. "/unresponsive"
      vim.fn.writefile({ "#!/bin/sh", 'echo $$ > "$0.pid"', "exec sleep 10" }, transport)
      vim.fn.setfperm(transport, "rwx------")
      git_in(repo, "config", "protocol.ext.allow", "always")
      git_in(repo, "remote", "add", "origin", "ext::" .. transport)
      git_in(repo, "update-ref", "refs/remotes/origin/topic", commit(repo))

      local started = vim.uv.hrtime()
      local exists = git.branch_exists_on_origin(repo, "topic")
      local elapsed_ms = (vim.uv.hrtime() - started) / 1e6

      assert.is_true(exists)
      assert.is_true(elapsed_ms >= 3000 and elapsed_ms < 4500, ("took %d ms"):format(elapsed_ms))
      local transport_pid = assert(tonumber(fixtures.read(transport .. ".pid")))
      assert.is_true(vim.wait(1000, function()
        return vim.uv.kill(transport_pid, 0) == nil
      end, 50))
    end)
  end)

  it("runs git detached, without prompts and without a stderr pipe", function()
    local repo = init_repo(dir .. "/repo")
    commit(repo)
    spy.on(vim, "system")

    git.head_commit(repo)

    assert.spy(vim.system).was_called_with({ "git", "-C", repo, "rev-parse", "HEAD" }, {
      detach = true,
      env = { GIT_TERMINAL_PROMPT = "0" },
      stderr = false,
      text = true,
    })
  end)
end)
