# Display-Only Output in Terminal AI Coding Assistants

Research into whether terminal AI coding tools support rendering output for humans without consuming context window tokens.

**Problem Statement:** Users want verbose, pretty-printed output (help text, formatted JSON, etc.) that helps them visually but doesn't need to be in the AI's context. Currently, all tools conflate "what the human sees" with "what goes into context."

**Last Updated:** 2025-01-24

## Summary

No terminal AI coding tool currently supports true display/context separation. All tools show the same content to users that goes into context. The closest features are:

- **Incognito shell mode** (Amp) - shell output excluded from context
- **Subagents** (all tools) - isolate verbose operations in separate context
- **Quiet/JSON modes** (all tools) - reduce display, but for scripts not humans

## Tools Researched

### Claude Code

**Status:** No display/context separation

**Tracking Issue:** [anthropics/claude-code#15718](https://github.com/anthropics/claude-code/issues/15718) - "MCP Tools: Support display/context separation to save 50-80% tokens on formatted output"

**Context Management:**
- Auto-compacts at ~95% capacity
- Manual `/compact` command
- Users report better results with manual compaction before auto-trigger

**Community Discussion:**
- Issue #15718 specifically addresses ANSI-formatted output consuming tokens
- Related issues about context visibility (#18562, #6577)
- No workaround other than subagents or `--print` mode

---

### OpenAI Codex CLI

**Status:** No display/context separation

**Repo:** [github.com/openai/codex](https://github.com/openai/codex)

**Context Management:**
- 272k effective context (400k - 128k output)
- Auto-compacts at 95% threshold
- Preserves recent ~20k tokens alongside summary
- Retry logic with exponential backoff

**Community Discussion:**
- [Issue #1047](https://github.com/openai/codex/issues/1047) - Request for cumulative token usage display
- [Issue #6426](https://github.com/openai/codex/issues/6426) - Tool output truncation is line-based, not token-based (causes excessive tool calls)
- [Issue #3630](https://github.com/openai/codex/issues/3630) - Confusing statusline tokens vs % context
- [Discussion #347](https://github.com/openai/codex/discussions/347) - Visual indicator request for context utilization
- No discussion found specifically about display/context separation

**Relevant Feature:**
- Quiet mode outputs JSON for scripts - useful for automation but not for human-readable pretty output

---

### OpenCode

**Status:** No display/context separation (but closest to having it)

**Repo:** [github.com/opencode-ai/opencode](https://github.com/opencode-ai/opencode)

**Context Management:**
- Auto-compacts via `isOverflow()` check
- Separate "prune" mechanism removes old tool outputs (protects last 40k tokens)
- Can disable auto-compaction via environment variable

**Unique Feature:**
- **Maintains distinct summaries:** Brief UI versions (2 sentences max) vs detailed compaction summaries
- This is the closest any tool gets to display/context separation, but it's for summaries only, not arbitrary output

**Community Discussion:**
- [Issue #41](https://github.com/opencode-ai/opencode/issues/41) - Implement context window warning
- [Issue #61](https://github.com/opencode-ai/opencode/issues/61) - Request for headless/API mode
- No discussion found specifically about display/context separation

---

### Amp (Sourcegraph)

**Status:** No display/context separation

**Docs:** [ampcode.com/manual](https://ampcode.com/manual)

**Philosophy:** Manual-first approach - rejects automatic compaction in favor of user discipline

**Context Management:**
- Uses Claude Opus 4.5 with up to 200k tokens
- Provides Handoff (goal-based extraction into new thread)
- Fork (duplicate context at specific point)
- Edit/Restore previous messages
- Thread References

**Unique Feature:**
- **Incognito shell mode (`$$`)** - Execute shell commands that are NOT included in context
- This is the closest any tool gets to true display/context separation for a specific use case

**Context Visibility:**
- Users see messages, replies, tool calls in Thread view
- Users don't see: system prompt, tool definitions, AGENTS.md content
- But all user-visible content still goes into context

**Community Discussion:**
- [amp-examples-and-guides](https://github.com/sourcegraph/amp-examples-and-guides) - Focus on context management best practices
- [Context Management Guide](https://ampcode.com/guides/context-management) - Philosophy explanation
- No issues found specifically about display/context separation

---

## Comparison Matrix

| Tool | Display/Context Separation | Closest Feature | Auto-Compact |
|------|---------------------------|-----------------|--------------|
| Claude Code | No | Subagents | Yes (95%) |
| Codex CLI | No | Quiet mode (JSON) | Yes (95%) |
| OpenCode | No | Separate UI vs compaction summaries | Yes |
| Amp | Partial | Incognito shell (`$$`) | No (manual) |

## Workarounds (All Tools)

1. **Subagents** - Delegate verbose operations, return summaries
2. **External rendering** - Write to temp file, open in editor/pager
3. **Non-interactive modes** - `claude --print`, `codex --quiet`, etc.
4. **Manual context hygiene** - Start fresh threads for different tasks

## The Gap

This appears to be an unsolved problem across the ecosystem. The architectural assumption in all tools is that the conversation IS the context. Separating them would require:

1. A way to mark output as "display-only"
2. UI to distinguish display-only from context-included content
3. Handling edge cases (what if user references display-only content?)

## Appendix: GUI-Based Tools

These tools have the UI surface area for display/context separation but don't implement it either:

### Cursor
- Separate panels for chat/terminal/output
- Chat content still goes into context
- Users complain about context limits forcing new chats mid-task
- [Forum discussion](https://forum.cursor.com/t/managing-chat-context-in-cursor-ide-for-large-repositories-what-s-working-for-you/76391)

### Windsurf
- Similar architecture to Cursor
- No display/context separation documented

### Zed
- Agent panel separate from editor
- No display/context separation documented

## Sources

- [Context Compaction Research Gist](https://gist.github.com/badlogic/cd2ef65b0697c4dbe2d13fbecb0a0a5f) - Comparison by @badlogic
- [Amp Context Management Guide](https://ampcode.com/guides/context-management)
- [Codex CLI Features](https://developers.openai.com/codex/cli/features/)
- [OpenCode TUI Docs](https://opencode.ai/docs/tui/)
- [Claude Code Issue #15718](https://github.com/anthropics/claude-code/issues/15718)
