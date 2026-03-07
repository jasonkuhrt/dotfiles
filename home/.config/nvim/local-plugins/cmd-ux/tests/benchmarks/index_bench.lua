local core = require("cmd_ux.core")
local index = require("cmd_ux.index")
local helpers = require("tests.plenary.helpers")

local uv = vim.uv or vim.loop

local function elapsed_ms(started)
  return (uv.hrtime() - started) / 1e6
end

---@param iterations integer
---@param fn fun()
---@return { total_ms: number, avg_ms: number }
local function benchmark(iterations, fn)
  collectgarbage("collect")
  fn()

  local started = uv.hrtime()
  for _ = 1, iterations do
    fn()
  end

  local total_ms = elapsed_ms(started)
  return {
    total_ms = total_ms,
    avg_ms = total_ms / iterations,
  }
end

local created = {}

---@param prefix string
---@param count integer
---@param create fun(name: string)
local function create_family(prefix, count, create)
  for index_nr = 1, count do
    local name = ("%s%03d"):format(prefix, index_nr)
    created[#created + 1] = name
    create(name)
  end
end

local function cleanup()
  for _, name in ipairs(created) do
    helpers.drop_user_command(name)
  end
  created = {}
end

local function print_result(name, iterations, metrics)
  print(("%-26s %4dx  total=%8.2fms  avg=%7.3fms"):format(name, iterations, metrics.total_ms, metrics.avg_ms))
end

helpers.ensure_setup()
cleanup()

create_family("BenchNoArg", 400, helpers.create_noarg_command)
create_family("BenchStructured", 80, helpers.create_structured_test_command)
create_family("BenchOptional", 40, helpers.create_optional_structured_test_command)
helpers.sync_cmd_ux()

local payload = index.get()
print(("cmd_ux benchmark (%d roots)"):format(#payload.roots))

local inventory_refresh = benchmark(10, function()
  index.refresh()
end)
print_result("inventory_refresh", 10, inventory_refresh)

local inventory_cache_load = benchmark(50, function()
  index.invalidate()
  index.get()
end)
print_result("inventory_cache_load", 50, inventory_cache_load)

local root_frontier_full = benchmark(25, function()
  index.frontier("")
end)
print_result("root_frontier_full", 25, root_frontier_full)

local root_frontier_prefix = benchmark(50, function()
  index.frontier("BenchStructured0")
end)
print_result("root_frontier_prefix", 50, root_frontier_prefix)

local resolve_root_structured = benchmark(100, function()
  core.resolve_line("BenchStructured001")
end)
print_result("resolve_root_structured", 100, resolve_root_structured)

local resolve_branch_structured = benchmark(100, function()
  core.resolve_line("BenchStructured001 alpha")
end)
print_result("resolve_branch_structured", 100, resolve_branch_structured)

local resolve_leaf_noarg = benchmark(100, function()
  core.resolve_line("BenchNoArg001")
end)
print_result("resolve_leaf_noarg", 100, resolve_leaf_noarg)

local resolve_many_unique_leaf_roots = benchmark(20, function()
  for index_nr = 1, 100 do
    core.resolve_line(("BenchNoArg%03d"):format(index_nr))
  end
end)
print_result("resolve_many_unique_leaf", 20, resolve_many_unique_leaf_roots)

local resolve_many_unique_structured_roots = benchmark(20, function()
  for index_nr = 1, 40 do
    core.resolve_line(("BenchStructured%03d"):format(index_nr))
  end
end)
print_result("resolve_many_unique_struct", 20, resolve_many_unique_structured_roots)

cleanup()
helpers.sync_cmd_ux()

vim.cmd("qa!")
