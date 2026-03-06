# Mermaid Directives Reference

Directives modify diagram behavior before rendering. Place them at the start of your diagram.

## Accessibility Directives

Work on **all diagram types**.

### accTitle (Accessibility Title)

Single-line title added to SVG `<title>` element.

```mermaid
accTitle: User Authentication Flow
flowchart LR
    login --> validate
```

### accDescr (Accessibility Description)

Single-line:

```mermaid
accDescr: Shows the login validation process
flowchart LR
    login --> validate
```

Multi-line (no colon, uses braces):

```mermaid
accDescr {
    This diagram shows the complete
    user authentication flow including
    validation and error handling.
}
flowchart LR
    login --> validate
```

## Configuration Directive

### %%{init}%%

Override theme, fonts, and diagram-specific settings.

```mermaid
%%{init: { "theme": "dark", "fontFamily": "monospace" } }%%
flowchart LR
    a --> b
```

**Top-level options:**

| Option        | Values                               |
| ------------- | ------------------------------------ |
| theme         | default, base, dark, forest, neutral |
| fontFamily    | Any CSS font-family                  |
| logLevel      | debug, info, warn, error, fatal      |
| securityLevel | strict, loose, antiscript, sandbox   |

**Diagram-specific options** (nested under diagram type):

```mermaid
%%{init: { "flowchart": { "curve": "linear", "htmlLabels": false } } }%%
flowchart LR
    a --> b
```

## Diagram-Specific Title

Some diagram types have a `title` keyword (not a directive, but diagram syntax):

### Gantt

```mermaid
gantt
    title Project Timeline
    dateFormat YYYY-MM-DD
    section Phase 1
    Task A :a1, 2025-01-01, 7d
```

### Pie

```mermaid
pie
    title Distribution
    "A" : 40
    "B" : 60
```

## Comments

Use `%%` for comments (ignored by parser):

```mermaid
flowchart LR
    %% This is a comment
    a --> b
```

## Frontmatter Alternative

As of v10.5.0, you can use YAML frontmatter instead of `%%{init}%%`:

```mermaid
---
config:
  theme: dark
  fontFamily: monospace
---
flowchart LR
    a --> b
```
