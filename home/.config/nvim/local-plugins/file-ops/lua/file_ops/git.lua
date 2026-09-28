local M = {}

---@class FileOpsGitCommandResult
---@field code integer
---@field stdout string

---@class FileOpsGitHubUrlOptions
---@field line? integer
---@field permalink? boolean

local TIMEOUT_MS = 3000
local TIMED_OUT = 124

-- A repository's root and origin do not change during a session, so they are
-- cached once found. HEAD, branches and remote refs do, so they are read each time.
---@type table<string, string>
local repo_root_cache = {}
---@type table<string, string>
local origin_url_cache = {}

---@param path string
---@return string
local function working_directory(path)
  local stat = vim.uv.fs_stat(path)
  local directory = stat and stat.type == "directory" and path or vim.fs.dirname(path)
  return vim.fs.normalize(directory)
end

---Detached, git runs in its own process group without a terminal, so ssh cannot
---prompt, and a timeout kills the transport helpers git spawns along with git.
---Those helpers inherit stderr, so it is not piped: an open pipe would keep the
---wait from returning at the time limit.
---@param args string[]
---@param cwd string
---@return FileOpsGitCommandResult
local function run_git(args, cwd)
  local process = vim.system(vim.list_extend({ "git", "-C", cwd }, args), {
    detach = true,
    env = { GIT_TERMINAL_PROMPT = "0" },
    stderr = false,
    text = true,
  })
  local result = process:wait(TIMEOUT_MS)
  if not result or result.code == TIMED_OUT then
    vim.uv.kill(-process.pid, "sigkill")
    return { code = TIMED_OUT, stdout = "" }
  end
  return { code = result.code, stdout = vim.trim(result.stdout or "") }
end

---@param path string
---@return string?
function M.repo_root(path)
  local cwd = working_directory(path)
  if repo_root_cache[cwd] then
    return repo_root_cache[cwd]
  end

  local result = run_git({ "rev-parse", "--show-toplevel" }, cwd)
  if result.code ~= 0 or result.stdout == "" then
    return nil
  end

  local root = vim.fs.normalize(result.stdout)
  repo_root_cache[cwd] = root
  return root
end

---@param path string
---@return string?, string?
function M.relative_to_repo_root(path)
  local root = M.repo_root(path)
  if not root then
    return nil, nil
  end

  local rel = vim.fs.relpath(root, vim.fs.normalize(path))
  if not rel or rel == "" then
    return nil, root
  end

  return rel, root
end

---Maps a remote URL on a GitHub host to the repository's https URL, without
---credentials or an ssh port.
---@param remote string
---@return string?
function M.parse_github_base_url(remote)
  local cleaned = remote:gsub("/+$", ""):gsub("%.git$", "")
  local host, repo = cleaned:match("^git@([^:]+):(.+)$")

  if not host then
    host, repo = cleaned:match("^ssh://git@([^/:]+):?%d*/(.+)$")
  end

  if not host then
    host, repo = cleaned:match("^https?://([^/]+)/(.+)$")
    host = host and host:gsub("^[^@]*@", "")
  end

  if not host or not repo then
    return nil
  end

  if not host:lower():find("github", 1, true) then
    return nil
  end

  return ("https://%s/%s"):format(host, repo)
end

---@param path string
---@return string?
function M.origin_url(path)
  local root = M.repo_root(path)
  if not root then
    return nil
  end

  if origin_url_cache[root] then
    return origin_url_cache[root]
  end

  local result = run_git({ "remote", "get-url", "origin" }, root)
  if result.code ~= 0 or result.stdout == "" then
    return nil
  end

  origin_url_cache[root] = result.stdout
  return result.stdout
end

---@param path string
---@return string?
function M.github_base_url(path)
  local remote = M.origin_url(path)
  return remote and M.parse_github_base_url(remote) or nil
end

---@param path string
---@return string?
function M.current_branch(path)
  local root = M.repo_root(path)
  if not root then
    return nil
  end

  local result = run_git({ "symbolic-ref", "--quiet", "--short", "HEAD" }, root)
  if result.code ~= 0 or result.stdout == "" or result.stdout == "HEAD" then
    return nil
  end

  return result.stdout
end

---@param path string
---@return string?
function M.head_commit(path)
  local root = M.repo_root(path)
  if not root then
    return nil
  end

  local result = run_git({ "rev-parse", "HEAD" }, root)
  if result.code ~= 0 or result.stdout == "" then
    return nil
  end

  return result.stdout
end

---@param path string
---@return string?
function M.default_branch(path)
  local root = M.repo_root(path)
  if not root then
    return nil
  end

  local local_head = run_git({ "symbolic-ref", "--quiet", "--short", "refs/remotes/origin/HEAD" }, root)
  if local_head.code == 0 and local_head.stdout ~= "" then
    return (local_head.stdout:gsub("^origin/", ""))
  end

  local remote_head = run_git({ "ls-remote", "--symref", "origin", "HEAD" }, root)
  if remote_head.code == 0 and remote_head.stdout ~= "" then
    local branch = remote_head.stdout:match("ref:%s+refs/heads/([^\t\n]+)")
    if branch and branch ~= "" then
      return branch
    end
  end

  for _, candidate in ipairs({ "main", "master" }) do
    local exists = run_git({ "show-ref", "--verify", "--quiet", "refs/remotes/origin/" .. candidate }, root)
    if exists.code == 0 then
      return candidate
    end
  end

  return nil
end

---@param path string
---@param branch string
---@return boolean
function M.branch_exists_on_origin(path, branch)
  local root = M.repo_root(path)
  if not root then
    return false
  end

  local remote_result = run_git({ "ls-remote", "--exit-code", "--heads", "origin", branch }, root)
  if remote_result.code == 0 then
    return true
  end

  if remote_result.code == 2 then
    return false
  end

  local local_result = run_git({ "show-ref", "--verify", "--quiet", "refs/remotes/origin/" .. branch }, root)
  return local_result.code == 0
end

---@param path string
---@param opts? FileOpsGitHubUrlOptions
---@return string?, string?
function M.github_blob_url(path, opts)
  opts = opts or {}

  local relative_path = M.relative_to_repo_root(path)
  if not relative_path then
    return nil, "Current target is not inside a git repository"
  end

  local base_url = M.github_base_url(path)
  if not base_url then
    return nil, "Origin remote is not a GitHub URL"
  end

  local ref
  if opts.permalink then
    ref = M.head_commit(path)
  else
    local branch = M.current_branch(path)
    if branch and M.branch_exists_on_origin(path, branch) then
      ref = branch
    else
      ref = M.default_branch(path)
    end
  end

  if not ref or ref == "" then
    return nil, "Could not determine a GitHub ref for the current target"
  end

  local encoded_path = vim.uri_encode(relative_path):gsub("%%2F", "/")
  local url = ("%s/blob/%s/%s"):format(base_url, ref, encoded_path)
  if opts.line then
    url = ("%s#L%d"):format(url, opts.line)
  end

  return url
end

return M
