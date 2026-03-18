local providers = require("cmd_ux.providers")
local search_cache = require("cmd_ux.lib.semantic_search_cache")
local types = require("cmd_ux.types")
local util = require("cmd_ux.util")

local M = {}
local cache_version = 1
local cache_path = vim.fn.stdpath("cache") .. "/cmd-ux-semantic-search.json"
local warming_revision = nil

---@class CmdUxCaseCollision
---@field canonical string
---@field labels string[]
---@field parent string
---@field paths string[]
---@field scope "root"|"namespace"

---@class CmdUxSemanticSearchEntry
---@field accept_line string
---@field depth integer
---@field item CommandFrontierItem
---@field label_norm string
---@field path_norm string
---@field path_words string[]
---@field root string
---@field root_norm string
---@field token_norm string

---@class CmdUxSemanticSearchCache
---@field collisions CmdUxCaseCollision[]
---@field entries CmdUxSemanticSearchEntry[]
---@field revision integer?
---@field root_items CommandFrontierItem[]
local cache = {
  collisions = {},
  entries = {},
  revision = nil,
  root_items = {},
}

local function invalidate_cache()
  cache = {
    collisions = {},
    entries = {},
    revision = nil,
    root_items = {},
  }
end

local function trim_spaces(value)
  return (value or ""):gsub("^%s+", ""):gsub("%s+$", "")
end

---@param value string
---@return string
local function normalize_search_text(value)
  local normalized = trim_spaces((value or ""):lower():gsub("[^%w]+", " "))
  local collapsed = normalized:gsub("%s+", " ")
  return collapsed
end

---@param value string
---@return string[]
local function split_search_words(value)
  local words = {}
  for word in normalize_search_text(value):gmatch("%S+") do
    words[#words + 1] = word
  end
  return words
end

---@param haystack string
---@param needle string
---@return boolean
local function starts_with(haystack, needle)
  return needle ~= "" and haystack:find("^" .. vim.pesc(needle)) ~= nil
end

---@param words string[]
---@param needle string
---@return boolean
local function words_contain(words, needle)
  if needle == "" then
    return false
  end

  for _, word in ipairs(words) do
    if word == needle or starts_with(word, needle) or word:find(needle, 1, true) ~= nil then
      return true
    end
  end

  return false
end

---@param collision CmdUxCaseCollision
---@return string
local function collision_warning(collision)
  local preview = vim.list_slice(collision.paths, 1, 4)
  local suffix = #collision.paths > #preview and ", ..." or ""
  return ("Case-fold collision under %s: %s%s. Use `Cmdux collisions` to audit and fix it."):format(
    collision.parent,
    table.concat(preview, ", "),
    suffix
  )
end

---@param item CommandFrontierItem
---@param overrides? table<string, unknown>
---@param collision? CmdUxCaseCollision
---@return CommandFrontierItem
local function decorate_item(item, overrides, collision)
  local spec = {}
  for key, value in pairs(item) do
    spec[key] = value
  end
  for key, value in pairs(overrides or {}) do
    spec[key] = value
  end

  if collision then
    spec.desc = spec.desc ~= "" and (spec.desc .. " [case-collision]") or "Case-fold collision"
    spec.help = collision_warning(collision) .. "\n\n" .. (spec.help or "")
  end

  spec.text = spec.label .. (spec.desc ~= "" and ("  " .. spec.desc) or "")
  ---@cast spec CommandFrontierItem
  return spec
end

---@param root string
---@param accepted string[]
---@return ResolutionState
local function resolve_state(root, accepted)
  return providers.resolve(
    root,
    types.snapshot({
      root = root,
      accepted = accepted,
      pending = "",
      trailing_space = false,
      raw = util.render_command(root, accepted, "", false),
    })
  )
end

---@param collision_annotations table<string, CmdUxCaseCollision>
---@param collisions CmdUxCaseCollision[]
---@param parent string
---@param scope "root"|"namespace"
---@param variants { label: string, path: string }[]
---@return nil
local function record_collisions(collision_annotations, collisions, parent, scope, variants)
  local by_key = {}

  for _, variant in ipairs(variants) do
    local key = variant.label:lower()
    by_key[key] = by_key[key] or {}
    by_key[key][#by_key[key] + 1] = variant
  end

  for key, group in pairs(by_key) do
    if #group > 1 then
      local labels = {}
      local labels_seen = {}
      local paths = {}
      for _, variant in ipairs(group) do
        paths[#paths + 1] = variant.path
        if not labels_seen[variant.label] then
          labels_seen[variant.label] = true
          labels[#labels + 1] = variant.label
        end
      end

      if #labels > 1 then
        table.sort(labels)
        table.sort(paths)
        local collision = {
          canonical = key,
          labels = labels,
          parent = parent,
          paths = paths,
          scope = scope,
        }
        collisions[#collisions + 1] = collision
        for _, path in ipairs(paths) do
          collision_annotations[path] = collision
        end
      end
    end
  end
end

---@param item CommandFrontierItem
---@param root string
---@param accepted string[]
---@return CmdUxSemanticSearchEntry
local function search_entry(item, root, accepted)
  local accept_line = item.accept_line ~= "" and item.accept_line or util.render_command(root, accepted, "", false)
  return {
    accept_line = accept_line,
    depth = math.max(#accepted - 1, 0),
    item = item,
    label_norm = normalize_search_text(item.label),
    path_norm = normalize_search_text(accept_line),
    path_words = split_search_words(accept_line),
    root = root,
    root_norm = normalize_search_text(root),
    token_norm = normalize_search_text(accepted[#accepted] or item.token or item.label),
  }
end

---@param accepted string[]
---@param token string
---@return string[]
local function append_token(accepted, token)
  local path_tokens = {}
  for index, value in ipairs(accepted) do
    path_tokens[index] = value
  end
  path_tokens[#path_tokens + 1] = token
  return path_tokens
end

---@param entries CommandIndexEntry[]
---@return CommandFrontierItem[], CmdUxSemanticSearchEntry[], CmdUxCaseCollision[]
local function build_cache(entries)
  local collision_annotations = {}
  local collisions = {}
  local root_items = {}
  local search_entries = {}

  local function walk(root, accepted, seen_paths)
    local state = resolve_state(root, accepted)
    if state.kind ~= "namespace" and state.kind ~= "hybrid" then
      return
    end

    local parent = #accepted == 0 and root or util.render_command(root, accepted, "", false)
    local variants = {}
    for _, item in ipairs(state.frontier or {}) do
      local path_tokens = append_token(accepted, item.token)
      variants[#variants + 1] = {
        label = item.label,
        path = util.render_command(root, path_tokens, "", false),
      }
    end
    record_collisions(collision_annotations, collisions, parent, "namespace", variants)

    for _, item in ipairs(state.frontier or {}) do
      local path_tokens = append_token(accepted, item.token)
      local rendered = util.render_command(root, path_tokens, "", false)
      local semantic_item = decorate_item(item, {
        token = item.token,
        label = rendered,
        kind = item.kind,
        desc = item.desc,
        help = item.help,
        examples = item.examples,
        executable = item.executable,
        requires_more = item.requires_more,
        slots = item.slots,
        slot_values = item.slot_values,
        safety = item.safety,
        outcome = item.outcome,
        capability = item.capability,
        steps = item.steps,
        accept_line = rendered,
        node_id = rendered,
      }, collision_annotations[rendered])

      search_entries[#search_entries + 1] = search_entry(semantic_item, root, path_tokens)

      if (item.kind == "namespace" or item.kind == "hybrid") and not seen_paths[rendered] then
        seen_paths[rendered] = true
        walk(root, path_tokens, seen_paths)
      end
    end
  end

  for _, entry in ipairs(entries) do
    local root = entry.root
    local item = decorate_item(entry.item, {
      accept_line = root,
    })
    root_items[#root_items + 1] = item
    search_entries[#search_entries + 1] = search_entry(item, root, { root })
    walk(root, {}, {})
  end

  return root_items, search_entries, collisions
end

---@param revision integer
---@param current CommandIndex
local function ensure_cache(revision, current)
  if cache.revision == revision then
    return
  end

  local persisted = search_cache.load(cache_path, cache_version, {
    generation = current.generation,
    built_at = current.built_at,
  })
  if persisted then
    cache.revision = revision
    cache.root_items = persisted.root_items
    cache.entries = persisted.entries
    cache.collisions = persisted.collisions
    return
  end

  local root_items, search_entries, collisions = build_cache(current.entries)
  cache.revision = revision
  cache.root_items = root_items
  cache.entries = search_entries
  cache.collisions = collisions
  search_cache.write(cache_path, cache_version, {
    generation = current.generation,
    built_at = current.built_at,
  }, root_items, search_entries, collisions)
end

---@param item CommandFrontierItem
---@param entry CmdUxSemanticSearchEntry
---@param root_collision_by_key table<string, CmdUxCaseCollision>
---@return CommandFrontierItem
local function maybe_decorate_root_item(item, entry, root_collision_by_key)
  if entry.depth ~= 0 then
    return item
  end

  local collision = root_collision_by_key[entry.root:lower()]
  if not collision then
    return item
  end

  return decorate_item(item, { accept_line = entry.accept_line }, collision)
end

---@param entry CmdUxSemanticSearchEntry
---@param query string
---@return integer?
local function score_entry(entry, query)
  if query == "" then
    return 0
  end

  local score = nil

  if entry.root_norm == query then
    score = 1600
  end
  if entry.token_norm == query then
    score = math.max(score or 0, 1500 - entry.depth)
  end
  if entry.path_norm == query then
    score = math.max(score or 0, 1450 - entry.depth)
  end

  if starts_with(entry.root_norm, query) then
    score = math.max(score or 0, 1350)
  end
  if starts_with(entry.token_norm, query) then
    score = math.max(score or 0, 1325 - entry.depth)
  end
  if starts_with(entry.path_norm, query) then
    score = math.max(score or 0, 1275 - entry.depth)
  end

  if words_contain(entry.path_words, query) then
    score = math.max(score or 0, 1180 - entry.depth)
  end
  if entry.token_norm:find(query, 1, true) ~= nil then
    score = math.max(score or 0, 1120 - entry.depth)
  end
  if entry.path_norm:find(query, 1, true) ~= nil then
    score = math.max(score or 0, 1080 - entry.depth)
  end
  if entry.label_norm:find(query, 1, true) ~= nil then
    score = math.max(score or 0, 1040 - entry.depth)
  end

  return score
end

---@param root_collision_by_key table<string, CmdUxCaseCollision>
---@param revision integer
---@param current CommandIndex
---@param query string?
---@return CommandFrontierItem[]
function M.frontier(revision, current, query, root_collision_by_key)
  root_collision_by_key = root_collision_by_key or {}
  ensure_cache(revision, current)

  local normalized = normalize_search_text(query or "")
  if normalized == "" then
    local items = {}
    for _, item in ipairs(cache.root_items) do
      local collision = root_collision_by_key[item.label:lower()]
      items[#items + 1] = collision and decorate_item(item, { accept_line = item.accept_line }, collision) or item
    end
    return items
  end

  local matches = {}
  local seen = {}
  for _, entry in ipairs(cache.entries) do
    local score = score_entry(entry, normalized)
    if score and not seen[entry.accept_line] then
      seen[entry.accept_line] = true
      matches[#matches + 1] = {
        entry = entry,
        score = score,
      }
    end
  end

  table.sort(matches, function(left, right)
    if left.score ~= right.score then
      return left.score > right.score
    end
    if left.entry.depth ~= right.entry.depth then
      return left.entry.depth < right.entry.depth
    end
    return left.entry.item.label < right.entry.item.label
  end)

  local items = {}
  for _, match in ipairs(matches) do
    items[#items + 1] = maybe_decorate_root_item(match.entry.item, match.entry, root_collision_by_key)
  end
  return items
end

---@param revision integer
---@param current CommandIndex
---@return CmdUxCaseCollision[]
function M.case_collisions(revision, current)
  ensure_cache(revision, current)
  return cache.collisions
end

---@param revision integer
---@return boolean
function M.ready(revision)
  return cache.revision == revision
end

---@param revision integer
---@return boolean
function M.warming(revision)
  return warming_revision == revision
end

---@param revision integer
---@param current CommandIndex
function M.schedule_warm(revision, current)
  if cache.revision == revision or warming_revision == revision then
    return
  end

  warming_revision = revision
  vim.schedule(function()
    if warming_revision ~= revision then
      return
    end

    local ok = pcall(ensure_cache, revision, current)
    warming_revision = nil
    if ok then
      vim.api.nvim_exec_autocmds("User", {
        pattern = "CmdUxSemanticSearchReady",
        modeline = false,
        data = { revision = revision },
      })
    end
  end)
end

---@param revision integer
---@param current CommandIndex
function M.warm(revision, current)
  ensure_cache(revision, current)
end

function M.invalidate()
  warming_revision = nil
  invalidate_cache()
end

return M
