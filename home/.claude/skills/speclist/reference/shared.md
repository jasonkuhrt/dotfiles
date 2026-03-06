# Shared Syntax

Common conventions used by both flow and def formats.

## Glossary

Skills should define a glossary of proper nouns. Define terms in plain language describing what they ARE conceptually. Avoid circular definitions that reference implementation details (field values, enum cases, etc.).

Content MUST use glossary terms in Title Case proper noun form throughout.

```
## Glossary

| Term         | Definition                                  |
| ------------ | ------------------------------------------- |
| Sync Branch  | A branch that needs trunk changes merged in |
| Tag Conflict | A tag pointing to different commits locally vs remotely |
```

Usage: `For each Sync Branch:` not `For each sync branch:`

## Inline Code

Use backticks for field references, code, and commands:

```
`Plan.mainWorktree`        — field reference
`step.invoke()`            — inline code
`$ git merge origin/main`  — shell command ($ prefix)
```

## Blockquotes (Metadata)

Blockquotes provide item-level metadata. Bold prefix indicates type.

**No blank line above blockquotes** - blockquotes attach directly to their item:

```
3. INVOKE CHILDREN
   > **NOTE** Throttled 80/sec.
   1. For each in `records`:
      1. Process record
```

**One sentence per line** - multi-sentence notes use separate `>` lines:

```
0. CHECK INCOMPLETE
   > **NOTE** Stripe idempotency keys expire after 24h.
   > If a previous Run is incomplete past this window, retrying could create duplicates.
   > Requires human reconciliation via support-playbook.md.
   1. Query `SubscriptionMigrationRun` where status = incomplete
```

**Types:**

- `> **NOTE** ...` - context, rationale, constraints
- `> **SKIP IF** <condition>` - item is bypassed when condition is true

Multiple blockquotes can be combined:

```
3. VALIDATE DATA
   > **SKIP IF** `ImportData.isValid`
   > **NOTE** Dromo handles inline validation; this step only surfaces when issues need manual resolution.
   1. Display errors
   2. Allow editing
```

## Images

Standard markdown image syntax embeds visuals inline:

```
![alt text](path/to/image.png)
```

Images are content (not metadata), so they appear inline rather than in blockquotes:

```
2. UPLOAD FILE
   > **NOTE** Dromo validates schema based on platform selection from step 1.
   ![Dromo upload interface](./assets/dromo-upload.png)
   1. Show Dromo component
   2. Detect Stripe native format → skip column mapping
```

Use relative paths (`./assets/`) for local assets or full URLs for remote images.

## Commands

Inline shell command (use `$` prefix):

```
`$ git merge origin/main`
```

Multiple consecutive commands:

````
```sh
$ git fetch --all
$ git merge origin/main
```
````

Script file (runs `scripts/<name>.sh`):

```
Run script `<name> [args]` → `<SchemaName>`
```

Inline script reference (runs script defined at heading `# <slug>`):

```
Run [<slug>](#<slug>)
```

Slug must use underscores (e.g., `check_status`). Heading must match: `# check_status`. Referenced section must contain only script content (no prose or explanations).

## Jumps

To procedure or definition (call and return):

```
@<name>
```

Means: execute that procedure/definition, then continue from this point.

> **NOTE** Procedures and definitions share a global namespace.
> Definitions can reference definitions; procedures can reference procedures.
> Cross-type references (definition → procedure or vice versa) are not allowed.

To external file (reference, no inline):

```
@<name> > <relpath>
```

Means: the procedure/function is documented in the external file at `<relpath>`. Reader should consult that file for details. This is a reference pointer, not an inline call.

A filename without path prefix (e.g., `file.md`) implies same directory (`./` is implicit).

Example:

```
### Cleanup Reminder Function

@send-subscription-migration-cleanup-reminder > send-subscription-migration-cleanup-reminder.md
```
