# Def

Definition format for entities, functions, and component specs. Describes _what exists_ (declarative, unordered).

See `shared.md` for common syntax (glossary, blockquotes, fields, jumps, commands).

## Structure

Definitions are unordered bullet items. Each definition has a bold name and sub-items for properties.

```
## <Section>

- **<name>**
  - <brief description>
  - <property>: <value>
  - <property>: <value>

- **<name>**
  - <brief description>
  - <property>: <value>
```

**Key characteristics:**

- **Unordered** (bullets) not numbered - no sequence implied
- **Bold name** - the entity/function/component being defined
- **Description as first sub-item** - brief explanation of what it is
- **Blank line between definitions** for readability

## Properties

Properties are sub-items with `<key>: <value>` format:

```
- **execute-subscription-migration**
  - Orchestrator that loads Records, invokes children, publishes completion.
  - Trigger: `migration/subscription.execute` event
  - Retries: 3
  - Timeout: 5 minutes
```

Properties can include codeblocks:

````
- **execute-subscription-migration**
  - Orchestrator that loads Records, invokes children, publishes completion.
  - Trigger: `migration/subscription.execute` event
  - Config:
    ```ts
    concurrency: { key: 'event.data.migrationId', limit: 1 }
    ```
````

## Nested Flows

A definition can contain a numbered procedural flow for its behavior:

```
- **execute-subscription-migration**
  - Orchestrator that loads Records, invokes children, publishes completion.
  - Trigger: `migration/subscription.execute` event
  - Steps:
    1. Load all Records for the Migration
    2. For each in `records`:
       1. Invoke child function
    3. Publish completion event
```

This nests flow syntax within def structure - the Steps property contains a procedural flow.

## Example

Complete definition section for Inngest functions:

````
## Functions

- **execute-subscription-migration**
  - Orchestrator that loads Records, invokes children, publishes completion.
  - Trigger: `migration/subscription.execute` event
  - Config:
    ```ts
    concurrency: { key: 'event.data.migrationId', limit: 1 }
    ```

- **execute-subscription-migration-record**
  - Per-Record processor that creates Stripe subscription.
  - Trigger: invoked by parent via `step.invoke()`
  - Config:
    ```ts
    throttle: { limit: 80, period: '1s' }
    retries: 4
    ```
````

## When to Use

Use **def** for:

- Function/method signatures
- Component specifications
- Entity descriptions
- Configuration schemas
- API endpoint definitions

Use **flow** for:

- Step-by-step procedures
- User workflows
- Operation sequences
- Algorithms

The two formats complement each other - def describes "what exists", flow describes "what to do".
