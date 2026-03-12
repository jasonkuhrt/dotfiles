# cmd-ux Performance Audit Protocol

Reusable loop: **measure → identify → fix → verify → commit → repeat**.

## 1. Measure Baseline

```bash
just cmd-ux-bench-finder
```

Record the table. Key columns: `avg`, `p95`, `max`.

Targets:
- **<16ms** per keystroke = 60fps
- **<33ms** = 30fps minimum

Focus rows (worst-case paths):
- `finder_root_empty` — full frontier, empty input
- `finder_root_partial` — full frontier, partial match
- `rank_root` — scoring overhead isolated
- `deepcopy_root_frontier` — allocation overhead isolated

## 2. Identify Bottleneck

### Flamegraph approach (manual)

Wrap the suspect call with `vim.uv.hrtime()`:

```lua
local t0 = vim.uv.hrtime()
-- suspect call
local elapsed = (vim.uv.hrtime() - t0) / 1e6
if elapsed > 5 then print(("PERF: %.2fms"):format(elapsed)) end
```

### Common patterns to check

| Pattern | Symptom | Fix |
|---|---|---|
| Scoring inside sort comparator | O(n log n) × score cost | Schwartzian transform (pre-compute) |
| Uncached env/context lookups | Filesystem walk per call | Cache in module-local struct, clear after |
| `vim.deepcopy` on read-only data | GC pressure, allocation ms | Shallow copy or direct reference |
| `vim.list_extend` + `vim.deepcopy` for concat | Alloc + copy for string | String concat: `root .. "/" .. table.concat(t, "/")` |
| Large frontier without threshold | Scoring 600+ items nobody scrolls | Skip scoring above N items |
| Unbounded candidate scan | Grows with learning store | Budget cap on iterations |
| Repeated identical function calls | Same result each time in loop | Hoist outside loop |

### Architecture reference

```
keystroke
  → sync_pending                           ~0ms
  → canonicalize_typed_namespace           ~0ms
  → current_state()
      → core.resolve_line(line)
          → resolver.resolve_line(line)    resolution layer
          → learning.rank_state(state)     scoring layer
  → current_items()
      → picker_item per item               allocation layer
  → return items to snacks
```

## 3. Fix

Rules:
- One concern per commit
- Zero behavioral change unless explicitly noted
- Run `just cmd-ux-test` after every edit — all 109 tests must pass
- Run `just lua-check` before committing

### Fix categories (by impact)

1. **Algorithm** — change asymptotic cost (e.g., Schwartzian transform)
2. **Caching** — eliminate repeated identical work (e.g., scoring_ctx)
3. **Allocation** — reduce GC pressure (e.g., shallow copy, string concat)
4. **Threshold** — skip unnecessary work (e.g., frontier size gate)
5. **Budget** — bound worst-case (e.g., promotion candidate cap)

## 4. Verify

```bash
just cmd-ux-test          # correctness — all tests pass
just lua-check            # lint — 0 errors, 0 warnings
just cmd-ux-bench-finder  # performance — compare to baseline
```

Compare the new numbers against the baseline table from step 1.
Record improvement or regression for each row.

## 5. Commit

Follow repo convention:

```
cmd-ux: <verb> <what> in <where>

<2-3 line body explaining why, with before/after numbers if significant>
```

## 6. Repeat

Go back to step 1. Each pass narrows the gap to the target.
Stop when all focus rows are under 16ms avg and 33ms p95.

## Key Files

| File | Role |
|---|---|
| `lua/cmd_ux/lib/learning_scoring.lua` | Scoring, ranking, promotions |
| `lua/cmd_ux/adapters/snacks.lua` | Picker integration, finder, deep-copy |
| `lua/cmd_ux/core.lua` | resolve_line orchestration |
| `lua/cmd_ux/lib/learning_runtime.lua` | Learning store, scope traversal |
| `lua/cmd_ux/lib/context.lua` | Context vector, project ID (filesystem) |
| `tests/benchmarks/finder_bench.lua` | Benchmark harness |
| `tests/plenary/learning_spec.lua` | Scoring + threshold tests |

## Historical Results

### Round 1 (e1fc5f27) — Schwartzian + caching + threshold + budget

| Metric | Before | After |
|---|---|---|
| rank_root (601 items) | 640ms | 1.4ms |
| finder_root_empty | 669ms | 3.3ms |
| finder_root_partial | 525ms | 4.2ms |

### Round 2 (4518ec00) — Deepcopy removal + inline + parent_id hoist

| Metric | Before | After |
|---|---|---|
| rank_root | 1.4ms | 0.76ms |
| finder_root_empty | 3.3ms | 3.3ms |
| deepcopy_root_frontier | 0.65ms | 0.70ms |

Round 2 halved `rank_root` cost; `finder_root_empty` is dominated by
`resolve_line` (~2.3ms) + `deepcopy` (~0.7ms), so scoring improvements
no longer move the needle at the finder level.
