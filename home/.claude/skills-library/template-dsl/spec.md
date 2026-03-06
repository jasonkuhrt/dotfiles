# Template DSL Specification

## Introduction

This is a lightweight specification for defining templates that in turn describe a layout pattern that an AI agent will execute.

Design Goals:

1. Syntax that is easy for humans to write and read.
2. Syntax that supports human expressions of both deterministic invariants and non-deterministic instructions intended for an AI agent to resolve as best it can while executing the template.
3. Syntax that avoids conflicts with common output formats (markdown, code, prose).

## Syntax

All DSL constructs use the `@` sigil to distinguish them from literal output.

| Name           | Syntax                               | Kind | Expr | Binding | Notes                 |
| -------------- | ------------------------------------ | ---- | ---- | ------- | --------------------- |
| Repeat         | `@...___`                            | E    | C    | prefix  |                       |
| Or Single Line | `___ @\| ___`                        | E    | C    | infix   |                       |
| Or Multi Line  | `@\| ___`                            | E    | C    | infix   | Newline separated     |
| Function       | `___@>___name___(___instruction___)` | E    | C    | postfix | `name` in lower_snake |
| Variable       | `@:___NAME___`                       | E    | A    | —       | `NAME` in UPPER_SNAKE |
| Partial        | `@+___name___`                       | E    | A    | —       | `name` in lower_snake |
| Group          | `@(___@)`                            | E    | C    | —       | Paired delimiters     |
| Line Cont.     | `@--`                                | T    | —    | —       | Join lines            |
| Escaped @      | `@@`                                 | T    | —    | —       | Literal `@` in output |

### Meta

(Legend for Legend)

| Name  | Syntax       |
| ----- | ------------ |
| Block | `___`        |
| Slot  | `___....___` |

| Abbr | Meaning                                          |
| ---- | ------------------------------------------------ |
| E    | Expression                                       |
| T    | Token                                            |
| A    | Atomic (expression without sub-expressions)      |
| C    | Compound (expression containing sub-expressions) |

## Whitespace

- Whitespace outside DSL constructs is literal output
- Exception: `@--` joins lines, consuming the newline and surrounding whitespace

## Binding Order

Precedence from tightest to loosest:

1. **Postfix** - binds to immediately preceding expression
2. **Prefix** - binds to the complete expression following it
3. **Infix** - binds last, separating complete expressions

## Variables

- Written as `@:NAME` where `NAME` is UPPER_SNAKE_CASE
- Chosen names should be semantic (carry meaning) for the agent
- Agent resolves values from its execution context

## Partials

- Written as `@+name` where `name` is lower_snake_case
- References a named sub-template defined in the Partials section
- Expands inline when the template is executed

## Functions

- Written as `target@>name(instruction)`
- Are a target, name, and optional instruction set encapsulating some action to be resolved by the agent
- Regarding Target:
  - Is what the function applies to. It is the immediately preceding expression.
  - Example: `@(x y@)@>if(cond)` applies `if` to the entire group, not just `y`.
- Regarding Name:
  - References a routine, e.g. make some text a link.
- Regarding Instruction:
  - Generally Optional
  - Allow human to provide callsite details that somehow instruct use of this function call, e.g. what a link value should be.
- Regarding definition:
  - Functions may be formally defined in tables with these columns:
    - **Name**: Required. Function identifier (lower_snake_case)
    - **Description**: Required. What the function should do
    - **Instructions**: Optional. Expected instruction format/values and hints about how to interpret/process them.
      - If constrained: list expected values or patterns
      - If open: state "freeform" or "any"
  - Alternatively they can be omitted, letting the agent infer it from the callsite target, name, instruction.
  - Style Guide:
    - Maximize a self-documenting approach, layer formal definition if needed after that
    - Should be named semantically for the agent
    - If using instructions, write as extension to context, do not repeat it

## Repeat

- Written as `@...expr`
- Indicates the immediately following expression repeats zero or more times based on available context data
- Example: `@...@(X@)@>if(cond)` parses as `@...(@(X@)@>if(cond))`:
  1. `@>if(cond)` attaches to `@(X@)` → conditionalized group
  2. `@...` applies to the result → repeated conditionalized group

## Or

- Single line: `A @| B` means "A or B"
- Multi line: Each alternative on its own line, prefixed with `@|`
  ```
  @| option one
  @| option two
  @| option three
  ```

## Built In Functions

| Name | Description                  | Instructions                               |
| ---- | ---------------------------- | ------------------------------------------ |
| link | make something appear linked | URL or semantic hint (e.g., "npm", "repo") |
| if   | conditional expression       | condition description (freeform)           |

## Document

- A template spec in markdown with prescribed sections (see next)
- `# <Title>` (L1)
  - The name of the template
- A fenced code block with the main template expression
- `## Partials` (L2)
  - Optional, only if template uses partials
  - Each partial as `### <partial_name>` (L3)
    - Contains a fenced code block with the partial's expression
- `## Functions` (L2)
  - Optional, only if template defines custom functions
  - Table with columns: Name, Description, Instructions
  - Instructions column documents expected instruction format/values
    - If constrained: list expected values or patterns (e.g., "npm", "github", "docs")
    - If open: explicitly state "freeform" or "any"
- `## Special Rules And Notes` (L2)
  - Optional
  - Free form customizations for this template about anything, even new syntax etc.
- `## Examples` (L2)
  - One or more fenced code blocks showing expected output
  - Should cover key variations (e.g., conditional branches)

## Style: Icons

Prefer elegant Unicode symbols over emojis. Unicode renders consistently across terminals, editors, and fonts.

| Meaning | Symbol | Unicode | Name                   |
| ------- | ------ | ------- | ---------------------- |
| Success | ✓      | U+2713  | CHECK MARK             |
| Failure | ✗      | U+2717  | BALLOT X               |
| Warning | ⚠      | U+26A0  | WARNING SIGN           |
| Pending | ◔      | U+25D4  | CIRCLE QUARTER BLACK   |
| Deleted | ⌀      | U+2300  | DIAMETER SIGN          |
| Info    | ℹ      | U+2139  | INFORMATION SOURCE     |
| Skip    | ⊘      | U+2298  | CIRCLED DIVISION SLASH |

Avoid: ❌ ✅ ⚠️ 🗑 ⏳ and other emoji variants.

## Runtime

- Variables (`@:NAME`)
  - Agent finds values from its context
- Partials (`@+name`)
  - Agent expands by substituting the partial's expression
- Agent must resolve the function upon encountering a callsite (`@>`)
  - Agent combines 2-3 sources of information to make a decision on how to act:
    1. Its own context
    2. The fn callsite (target and instructions may be unique)
    3. The fn definition (if available)
  - If agent is confused about how to resolve a callsite for any reason it may ignore it (see below)
  - Regarding fn definition:
    - Agent must try to find definition if this is the first encounter of this fn
    - Agent searches for definitions in following order, using first hit:
      - local template spec's Functions table
      - Built In Functions
    - Note: Using first hit means templates can redefine built-in behavior entirely
    - If none found Agent should decide if it can accurately autonomously resolve the callsite from sources 1 & 2
  - Regarding callsite ignore:
    - Agent should generally treat the Target as a passthrough.
    - Agent may use context to act differently if it's judged more sensible, like eliding Target.
