# CC Teacher Core -- Design

## Tasks: Raw Source Quotes

Preserved verbatim from original sources for posterity and future review.

### Official Docs

From https://code.claude.com/docs/en/interactive-mode#task-list:

> When working on complex, multi-step work, Claude creates a task list to track progress. Tasks appear in the status area of your terminal with indicators showing what's pending, in progress, or complete.
> - Press `Ctrl+T` to toggle the task list view. The display shows up to 10 tasks at a time
> - To see all tasks or clear them, ask Claude directly: "show me all tasks" or "clear all tasks"
> - Tasks persist across context compactions, helping Claude stay organized on larger projects
> - To share a task list across sessions, set `CLAUDE_CODE_TASK_LIST_ID` to use a named directory in `~/.claude/tasks/`: `CLAUDE_CODE_TASK_LIST_ID=my-project claude`
> - To revert to the previous TODO list, set `CLAUDE_CODE_ENABLE_TASKS=false`.

### Anthropic Announcement

From https://x.com/trq212/status/2014480496013803643:

> We're turning Todos into Tasks in Claude Code
> Today, we're upgrading Todos in Claude Code to Tasks. Tasks are a new primitive that help Claude Code track and complete more complicated projects and collaborate on them across multiple sessions or subagents.
> As model capabilities grow, one of the most important things we can do is "unhobble" Claude and allow it to use its new capabilities effectively. Compared to previous models, Opus 4.5 is able to run autonomously for longer and keep track of its state better. We found that the TodoWrite Tool was no longer necessary because Claude already knew what it needed to do for smaller tasks.
> At the same time, we found ourselves using Claude Code to complete longer projects, sometimes across multiple subagents, context windows or sessions. But projects are more complex, tasks have dependencies and blockers and require coordination when using it across sessions.
> It was clear we needed to evolve Todos to help Claude work on longer projects. This need was also emerging in the community and we took inspiration from projects like Beads by Steve Yegge.
> Tasks are our new abstraction for coordinating many pieces of work across projects, Claude can create Tasks with dependencies on each other that are stored in the metadata, which mirrors more how projects work. Additionally, Tasks are stored in the file system so that multiple subagents or sessions can collaborate on them. When one session updates a Task, that is broadcasted to all sessions currently working on the same Task List.
> You can ask Claude to create tasks right now, it's especially useful when creating when spinning up subagents. Tasks are stored in ~/.claude/tasks, you can use this to build additional utilities on top of tasks as well.
> To make sessions collaborate on a single Task List, you can set the TaskList as an environment variable and start Claude like so:
> CLAUDE_CODE_TASK_LIST_ID=groceries claude
> This also works for claude -p and the AgentSDK.
> Tasks are a key building block for allowing Claude to build more complex projects. We're looking forward to seeing how you use it.

### Reddit Discussion

From https://www.reddit.com/r/ClaudeAI/comments/1qkjznp/anthropic_replaced_claude_codes_old_todos_with (cross-post of announcement):

> TL;DR generated automatically after 50 comments.
>
> Alright, the hivemind has spoken, and the consensus is a big thumbs-up for the new Tasks feature.
>
> This is seen as a massive Quality of Life upgrade, finally solving the annoying problem of Claude forgetting everything after a memory compaction. The move to persistent tasks makes multi-day projects and agentic workflows actually viable.
>
> However, don't get too excited just yet. Users quickly pointed out this is a very minimal implementation. The biggest complaint is that tasks are stored locally and aren't shareable via Git, which is a step back from community tools like beads. While some are happy to ditch beads (calling it a "hot mess"), they're still waiting for Anthropic to add better project and team collaboration features.
>
> The general feeling is that Anthropic nailed the most critical problem (memory loss) and will likely add more functionality later. For now, it's a solid, much-needed foundation.

### Gemini Search Summary

As of January 22, 2026, Claude Code has upgraded its "Todo" system to a more robust, persistent Tasks system. This new system is designed to manage complex, multi-step projects with better context management and cross-session persistence.

Key Features of Claude Code Tasks (v2):
- File-System Persistence: Tasks are stored in ~/.claude/tasks, allowing Claude to remember them across different chat sessions, even days later.
- Dependency Management: Tasks can now have dependencies, allowing Claude to understand the order of operations and execute tasks in the correct sequence.
- Collaboration & Sync: Tasks work across multiple subagents or sessions. When one session updates a task, it is broadcast to others, ensuring consistency.
- Detailed Status: Tasks include states like pending (not started), in_progress (currently working), and completed.

Comparison: Old Todos vs. New Tasks:

| Feature     | Old Todos (Pre-v2)           | New Tasks (v2+)                    |
|-------------|------------------------------|------------------------------------|
| Persistence | Session-only (lost if closed)| File-system (~/.claude/tasks)      |
| Scope       | Simple linear list           | Hierarchical with dependencies     |
| Context     | Limited                      | High (carries over to new sessions)|
