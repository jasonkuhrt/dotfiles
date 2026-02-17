# Flow

Procedural format for operations and procedures. Describes _what to do_ (imperative, sequential).

See `shared.md` for common syntax (glossary, blockquotes, fields, jumps, commands).

## Structure

Steps are numbered items. All levels follow the same recursive rules.

```
1. <content>
   1. <content>
      1. <content>
```

**Content** is one of:

- **Action** - verb phrase (`Query the database`, `Show error message`)
- **Label** - ALL CAPS name for a group of steps (`VALIDATE`, `CLOSE STALE`)
- **Conditional** - `If`, `Else`, `When` (see Conditionals)
- **Loop** - `For each` (see Loops)

Labels are optional grouping—use when a cluster of steps benefits from a name. Not required at any level. **Never use a label for a single action**—just write the action directly.

```
## Operations

### <operation_name>

1. CLOSE STALE
   1. Query incomplete attempts
   2. Mark as completed
2. VALIDATE
   1. Check required fields
   2. If invalid: show errors
3. Process the record
4. Save to database
```

Steps 1-2 use labels (groups of related actions). Steps 3-4 are plain actions. Both are valid at any level.

**Wrong** (label wrapping single action):

```
1. LOAD PLAN
   1. Fetch Plan by ID
```

**Right** (just the action):

```
1. Fetch Plan by ID
```

## Conditionals

Conditionals are numbered steps like everything else.

**Rules:**

- One action per line. Never combine multiple steps with commas, "and", or "then".
- Never mix single/multiline formats - all branches must use the same format.
- Never use separate If statements for mutually exclusive conditions - use If/Else.

Single action (inline):

```
1. If <condition>: <action>
2. Else: <action>
```

Multiple actions (nested):

```
1. If <condition>:
   1. <action>
   2. <action>
2. Else:
   1. <action>
```

For pattern matching, use `When` with cases as numbered sub-items (italic case labels):

```
1. When <thing>:
   1. <case>: <action>
   2. <case>: <action>
```

Multi-action cases use nested numbering:

```
1. When <thing>:
   1. <case>:
      1. <action>
      2. <action>
   2. <case>:
      1. <action>
```

Never mix inline and nested formats within the same When block - if one case needs nesting, all cases must be nested.

For single-action cases, use table format:

```
1. For each in <collection>: when <thing>

   | is     | then            |
   | ------ | --------------- |
   | <case> | <single action> |
   | <case> | <single action> |
```

The `For each in X: when Y` collapses loop + dispatch into one line.

Example (multi-step cases):

```
3. MERGE TRUNK
   1. When `BranchTask.complexity`:
      1. `none`:
         1. `git merge <trunk>`
      2. `simple`:
         1. Apply pre-recorded solution
         2. `git merge <trunk>`
```

Example (single-action table):

```
3. PROCESS TAG TASKS
   1. For each in `Plan.tagTasks`: when `tagTask.action`

      | is   | then                                |
      | ---- | ----------------------------------- |
      | push | `git push origin <tag> --force`     |
      | pull | `git tag -d <tag> && git fetch`     |
      | skip | no-op                               |
```

## Loops

Over schema collection:

```
For each in <Schema>.<collection>:
```

Over glossary term (iterates items matching that concept):

```
For each <Glossary Term>:
```

Multiple actions:

```
1. <LABEL>
   1. For each in <Schema>.<collection>:
      1. <action>
      2. <action>
```

Single action (inline):

```
1. For each in <Schema>.<collection>: <action>
```

Example:

```
3. RESOLVE TAG CONFLICTS
   1. For each in `RepositoryState.tagConflicts`:
      1. Show using _tag-conflict_
      2. Ask single select "Tag resolution":
         1. Keep local (push to remote) → record push
         2. Keep remote (fetch from remote) → record pull
         3. Skip (leave unresolved) → next conflict
```

## Step Jumps

To operation (continue, no return):

```
Continue <operation>
```

Means: jump to that operation and continue from there. Does not return - used for chaining operations.

To step within same operation:

```
@N(LABEL)
@next
```

- `@N(LABEL)` - jump to step N (parenthetical label aids readability)
- `@next` - continue to the next sequential step (useful for early exit from nested conditionals)

Examples:

```
3. @preserve_dirty_state
4. Next step continues here after procedure returns
```

```
8. WRITE PLAN
   1. Save to `.claude/git-sync-plan.json`
   2. If full sync: Continue Execute
   3. **END**
```

```
10. EVALUATE
    1. When `status`:
       1. _all pass_: **END**: success
       2. _same failure_: @5(ANALYZE FAILURE)
       3. _different failure_: @4(PRIORITIZE)
```

```
0. CHECK CACHE
   1. Query cache for `key`
   2. If not found: @next
   3. Return cached value
```

## Halt

```
1. CHECK TRUNK
   1. If Trunk has unpushed commits:
      1. Show using _trunk-dirty_
      2. **HALT**
```

Means: stop execution entirely, do not continue. HALT is a terminal point.

## End

```
**END**
**END**: <outcome>
```

Marks a terminal point. Every operation/procedure must have explicit END at all terminal paths. Use outcome label for procedures with multiple exit points (e.g., `**END**: synced`, `**END**: aborted`).

## Requirements and Actions

Steps can contain **requirements** (declarative specs—what must exist) and **actions** (procedural steps—what to do). The labeling rule:

| Step contains     | Syntax                                                                   |
| ----------------- | ------------------------------------------------------------------------ |
| Actions only      | Numbered list (unlabeled, default)                                       |
| Requirements only | `**Requirements:**` + numbered list                                      |
| Both              | `**Requirements:**` + numbered list, then `**Actions:**` + numbered list |

**Actions only (default):**

```
1. SELECT PLATFORM
   1. Show platform options
   2. Record selection
```

**Requirements only:**

```
1. SELECT PLATFORM
   **Requirements:**
   1. Overview explaining the process
   2. Platform selector (Circle, Kajabi, Mighty Networks, Stripe)
   3. Support callout for unlisted platforms
```

**Both requirements and actions:**

```
1. SELECT PLATFORM
   > **NOTE** We only support Stripe → Stripe migrations.

   **Requirements:**
   1. Overview explaining the process
   2. Platform selector (Circle, Kajabi, Mighty Networks, Stripe)
   3. Support callout for unlisted platforms

   **Actions:**
   1. Show platform options
   2. Record selection
```

**Nested requirements** use standard numbered sub-items:

```
**Requirements:**
1. Dromo embedded upload component
   1. Column mapping UI for required fields
   2. Auto-detect Stripe native format
2. Support callout with how-to video
```

**Requirements with codeblocks** - a requirement item can include a codeblock for exact formats/schemas:

````
**Requirements:**
1. Idempotency key format:
   ```
   hb_migration_{migrationId}_{recordId}
   ```
2. Subscription metadata:
   ```json
   {
     "heartbeat_migration_id": "uuid",
     "heartbeat_migration_record_id": "uuid"
   }
   ```
````

The colon after the requirement label signals that a codeblock follows.

**Content style distinction:**

- Requirements are noun phrases (what exists): "Platform selector", "Support callout"
- Actions are verb phrases (what to do): "Show options", "Record selection"

## Classify

AI-driven classification that derives an enum value from analysis:

```
Classify:

| class   | heuristic                |
| ------- | ------------------------ |
| <value> | <criteria for this case> |
| <value> | <criteria for this case> |
```

The AI analyzes the situation and selects the appropriate class based on heuristics.

## User Prompts

Single-select:

```
Ask single select "<question>":

| select   | description   | then   |
| -------- | ------------- | ------ |
| <option> | <description> | <goto> |
```

Multi-select:

```
Ask multi select "<question>":

| select   | description   | default |
| -------- | ------------- | ------- |
| <option> | <description> | on/off  |
```

Tabbed multi-select:

```
Ask tabbed multi select:

| tab    | select   | description   | default |
| ------ | -------- | ------------- | ------- |
| <tab>  | <option> | <description> | on/off  |
```

Maps to AskUserQuestion tool.

Example:

```
Ask single select "Tag resolution":

| select      | description                 | then        |
| ----------- | --------------------------- | ----------- |
| Keep local  | push local tag to remote    | record push |
| Keep remote | delete local, fetch remote  | record pull |
| Skip        | leave conflict unresolved   | next conflict |
```

## Templates

```
Show using <name>
Show <descriptor> using <name>
```

Optional descriptor (e.g., `warning`, `conflicts`) clarifies what's being shown.

Means: format output using `templates/<name>.tpl.md`.

## Procedures

Reusable sequences as a bullet list:

```
## Procedures

- **<procedure_name>**
  1. <LABEL or action>
     1. <action>
     2. <action>
  2. <action>
- **<another_procedure>**
  1. <action>
```

Procedures are called via jumps: `@<procedure_name>`

## Priority Tables

For ordered decision logic:

```
| Condition | Action | Set |
|-----------|--------|-----|
| first match | <action> | <field> |
| second match | <action> | <field> |
| Otherwise | <action> | <field> |
```

Evaluated top-to-bottom, first match wins.
