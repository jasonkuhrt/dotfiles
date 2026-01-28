# Refresh Template

```
- @+title_line
  @...@(- @:CHANGELOG_ITEM_HIGHLIGHT@)@>if(changelog found)
```

## Partials

### title_line

```
@:DATE_OF_CHECK | @--
@(
    @|   @:NEW_LATEST_VERSION_ON_NPM_FOUND | @--
         npm@>link(npm) | @--
         @(changelog@>link(gh release or repo file) |@)@>if(changelog found) @--
         highlights:
    @|   (no changes found)
@)
```

## Examples

```
- 2000-01-01 abc
  - abc
  - def
  - ghi
```

```
- 2000-01-01 (no changes found)
```
