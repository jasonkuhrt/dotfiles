# Worktree vs Regular Branch Comparison

**Why worktrees matter for agentic workflows:**

| Aspect                  | Regular Branch                      | Worktree                              |
| ----------------------- | ----------------------------------- | ------------------------------------- |
| **Switching context**   | Must stash/commit WIP to check main | Just `cd` to main workspace           |
| **Running dev server**  | One branch at a time                | Can run feature + main simultaneously |
| **Comparing behavior**  | Checkout back and forth             | Side-by-side in different terminals   |
| **Concurrent features** | One feature at a time               | Work on multiple features in parallel |
| **AI agent work**       | Agent changes block your main       | Agent works in isolation              |
| **Disk space**          | Minimal                             | Extra copy of working files           |
| **Mental model**        | Familiar to all devs                | Less known, slight learning curve     |

## Recommendation

**Worktrees shine when:**

- You might need to check main while feature is in progress
- Long-running feature work (days/weeks)
- AI agent doing implementation (keeps main workspace clean)
- Need to compare feature behavior against main

**Regular branch is fine for:**

- Quick fixes (< 1 hour)
- Solo work with no context switching expected
