# Ref Doctor

Health check and repair for Ref setup. Handles fresh installs AND fixes drift (missing auth, outdated config, missing best practices).

Run all checks in order. Fix issues as found.

---

## Check 1: MCP Installation

```bash
claude mcp list
```

| State | Action |
|-------|--------|
| `Ref: https://api.ref.tools/mcp (HTTP)` present | -> Check 2 |
| Missing entirely | -> Run Install Flow below |
| Shows as disabled | -> `claude mcp enable Ref`, then Check 2 |

**Install Flow:**

1. Ask user with AskUserQuestion:
   - "I have a Ref account" -> step 2
   - "I need to create one" -> direct to https://ref.tools/signup, wait, then step 2

2. Tell user: "Go to https://ref.tools/install - paste the pre-populated command shown there."

3. Run the command user provides. Format:
   ```bash
   claude mcp add --transport http Ref https://api.ref.tools/mcp --header "x-ref-api-key: ref_..."
   ```

4. **Restart required.** Tell user:
   > "Restart Claude Code (Cmd+R or relaunch), then say 'continue' to resume doctor."

5. After restart, re-run Check 1.

---

## Check 2: Auth Validity

Test the API key works:

```
ref_search_documentation: "what is ref mcp server"
```

| Result | Action |
|--------|--------|
| Results returned | -> Check 3 |
| "not correctly configured" | -> API key invalid. Tell user to get fresh key at https://ref.tools/keys, re-run Install Flow step 2 |
| Tool not found | -> MCP not loaded. Restart Claude Code, re-run Check 1 |

---

## Check 3: Best Practices

Reference: https://docs.ref.tools/getting-started/best-practices

**3a. Rules file exists**

Check for project rules file that mentions Ref:

```bash
# Check common locations
cat CLAUDE.md 2>/dev/null | grep -i ref || echo "NOT_FOUND"
cat AGENTS.md 2>/dev/null | grep -i ref || echo "NOT_FOUND"
cat .claude/rules/*.md 2>/dev/null | grep -i ref || echo "NOT_FOUND"
```

| State | Action |
|-------|--------|
| Ref mentioned in rules | -> Check 3b |
| No Ref rule found | -> Ask user with AskUserQuestion |

If no rule found, ask:
- "Add Ref rule to CLAUDE.md" (Recommended)
- "Add Ref rule to AGENTS.md" (cross-tool compatible)
- "Skip for now"

If adding, append this line to chosen file:
```
When working with libraries, check the docs with Ref.
```

**3b. Rule quality**

The rule should be simple. Per best practices, avoid:
- Over-prompting (checking docs for every interaction)
- Excessive complexity

Good: `When working with libraries, check the docs with Ref.`
Bad: `Always check Ref before any code change and verify all imports...`

If rule is overly complex, suggest simplifying.

---

## Check 4: Verification

Final test - search Ref's own docs:

```
ref_search_documentation: "Claude Code MCP server installation"
```

Then read a result:

```
ref_read_url: <first relevant URL from results>
```

| Result | Status |
|--------|--------|
| Both tools work | Doctor complete |
| Any failure | Review earlier checks |

Report summary to user:
- MCP status
- Auth status
- Best practices status
- Test result
