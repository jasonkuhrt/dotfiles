---
argument-hint: '[issue-number|focus-area]'
description: Initialize Claude session with project awareness
---

# Start

## Goal

- Initialize a Claude Code session with full awareness of project standards and conventions
- Confirm awareness of personal configuration already in context
- Optionally focus on a specific GitHub issue or area of the codebase

## Usage

- `/start` - Start with general project awareness
- `/start [issue-number]` - Start with focus on a GitHub issue (e.g., `/start 37`)
- `/start [focus-area]` - Start with specific focus (e.g., `/start effect implementation`)

## Arguments

- First argument ($1): Optional issue number (integer) or focus area (text)
  - If integer: Treated as GitHub issue number on current repo
  - If text: Treated as focus area description
  - When no arguments: General project awareness

## Instructions

1. **Activate Serena project**:
   - Call `mcp__serena__activate_project` with the current working directory name as the project name
   - If activation fails (project not registered), note this but continue - Serena tools will work with the directory path instead
   - On success: "✓ Serena project activated"

2. **Load configuration files WITHOUT showing errors**:
   - FIRST use Bash to check which files exist (e.g., `ls ./CLAUDE.md 2>/dev/null` or `test -f ./CLAUDE.md && echo "exists"`)
   - THEN only Read files that were confirmed to exist
   - Required files: ~/.claude/CLAUDE.md
   - Optional files: ./CLAUDE.md, ./.claude/serena-prompt.md
   - DO NOT attempt to Read optional files that don't exist
   - Note: Serena MCP now has built-in instructions (no separate file needed)

3. **Confirm awareness of loaded configurations**:
   - For Serena: "✓ Serena MCP tools instructions loaded - will use symbolic tools for intelligent code reading"
   - If project ./.claude/serena-prompt.md was found: "✓ Project-specific Serena overrides loaded"

4. **Confirm personal configuration awareness**:
   - Explicitly state: "✓ Personal configuration from ~/.claude/CLAUDE.md is active"
   - List 2-3 key principles from the user's personal CLAUDE.md to prove awareness, such as:
     - Core work style preferences (e.g., ADHD considerations, no flattery)
     - Key technical preferences (e.g., ESM modules, TypeScript patterns)
     - Important rules (e.g., never guess APIs, verify everything)
   - Confirm: "✓ Personal commands from ~/.claude/commands/ are available"

5. **Acknowledge project configuration**:
   - If ./CLAUDE.md exists: Confirm project-specific standards are loaded
   - Note any available MCP servers (ref, serena, effect-docs, etc.)
   - Reference the current project name from the working directory

6. **Focus area handling**:
   If argument is provided: "$ARGUMENTS"

   **Check if argument is an integer (GitHub issue number)**:
   - If the argument matches the pattern `^\d+$` (digits only), treat it as a GitHub issue number
   - Use `gh issue view [number] --json number,title,body,labels,url,comments` to fetch the issue
   - If fetch succeeds:
     - Display issue details: title, URL, labels, description
     - If comments exist, display them with emphasis that later comments take precedence
     - Focus session on this issue's requirements
     - Mention that changes should reference this issue number
   - If fetch fails:
     - Show error message and treat argument as text focus area instead

   **Otherwise, treat as text focus area**:
   - Pay special attention to code and patterns related to the specified focus area
   - Proactively mention relevant standards and patterns for that area
   - Be ready to work on tasks related to the focus area

   **If no argument is provided**:
   - Provide a brief acknowledgment that all configurations are active
   - Be ready to assist with any aspect of the codebase

## Example Output

**General start** (`/start`):

```
✓ Serena project activated
✓ Serena MCP tools instructions loaded
✓ Personal configuration from ~/.claude/CLAUDE.md is active, including:
  - ADHD-aware work style: breaking down tasks into smaller iterations
  - Technical preferences: ESM modules only, no CJS, prefer unknown over any
  - Critical rule: Never guess APIs - always verify in source code
✓ Personal commands from ~/.claude/commands/ are available
✓ Project standards from ./CLAUDE.md loaded (if present)
✓ MCP servers available: ref (docs), serena (code analysis), effect-docs (Effect documentation)

Ready to assist with [current project name] development.
```

**Issue-focused start** (`/start 37`):

```
✓ Serena project activated
✓ Serena MCP tools instructions loaded
✓ Personal configuration from ~/.claude/CLAUDE.md is active
✓ Personal commands from ~/.claude/commands/ are available
✓ Project standards from ./CLAUDE.md loaded
✓ MCP servers available: ref, serena, effect-docs

## Focus: Issue #37

**Title**: Tex: Remove global state access (process.stdout.columns) for better configurability
**URL**: https://github.com/jasonkuhrt/kit/issues/37
**Labels**: enhancement

### Description
[Issue body displayed here...]

### Comments
[If comments exist, display them with note that later comments take precedence]

Ready to work on issue #37. All changes should reference this issue number.
```
