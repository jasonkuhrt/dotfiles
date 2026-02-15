# Research Pattern: Clone and Read Source Code

When researching library/framework/tool capabilities:

1. **Clone the repo** to `~/repo-references/<name>/`
2. **Read the actual source code** - don't guess or rely on web search summaries
3. **Find the relevant types, actions, modules** - use `rg` to locate them
4. **Read the implementation** - understand what actually happens

Web search and docs are starting points. Source code is the truth.

## Example

Instead of guessing "can Zed profiles be activated via keybinding?":

```bash
git clone --depth 1 https://github.com/zed-industries/zed.git ~/repo-references/zed
cd ~/repo-references/zed
rg "settings_profile" --type rust -l
# Read the actual implementation
```

This reveals:
- What actions exist (`Toggle` only, no `Activate(name)`)
- How activation works (sets runtime global, not file edit)
- What IPC exists (only `Open`, no action dispatch)
