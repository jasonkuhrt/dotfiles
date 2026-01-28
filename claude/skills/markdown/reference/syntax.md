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
