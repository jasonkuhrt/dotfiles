# Syntax Pitfalls

Common Markdown syntax pitfalls to avoid.

## Tables

Tables require THREE components: header row, separator row, data rows.

**BAD** - data rows only, renders as plain text:

```
| Version | 1.0.0 |
| Runtime | 2.0.0 |
```

**BAD** - missing separator row:

```
| Key | Value |
| Version | 1.0.0 |
```

**GOOD** - complete structure:

```markdown
| Key     | Value |
| ------- | ----- |
| Version | 1.0.0 |
| Runtime | 2.0.0 |
```

**Rules:**

- Header row defines column names
- Separator row uses `|-----|` (minimum 3 dashes per column)
- Alignment: `|:---|` left, `|:---:|` center, `|---:|` right
- Tables cannot be nested inside list items (breaks most renderers)

## Code Blocks

Always specify language for syntax highlighting.

**BAD** - no language tag:

    ```
    const x = 1;
    ```

**GOOD** - language specified:

    ```typescript
    const x = 1;
    ```

## Lists

Nested lists require consistent indentation (2 or 4 spaces).

**BAD** - 1-space indent won't nest:

```
- Item 1
 - Nested (broken)
```

**GOOD** - 2-space indent:

```
- Item 1
  - Nested
  - Another
- Item 2
```

## Links

**BAD** - space breaks link:

```
[Link text] (https://example.com)
```

**GOOD** - no space:

```
[Link text](https://example.com)
```

## File Paths

Editors (Zed, VS Code) auto-detect file paths and make them clickable. Wrapping paths in backticks suppresses this — the editor treats the content as an opaque code span, not a navigable path.

**BAD** - backticks kill clickability:

```
See `src/utils/config.ts` for details.
Check `./docs/setup.md` for setup instructions.
```

**GOOD** - bare path, editor makes it clickable:

```
See src/utils/config.ts for details.
Check ./docs/setup.md for setup instructions.
```

**Rules:**

- Never wrap file paths in backticks if clickability matters (documentation, comments, issue descriptions)
- Backticks ARE appropriate when the path is part of a code expression: `` `import "./foo"` ``, `` `cat ./foo` ``
- Applies to relative paths (`src/...`, `./...`) and absolute paths alike
