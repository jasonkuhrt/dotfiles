# Starship Modules Reference

## Disabling Modules

```toml
[nodejs]
disabled = true
```

## Module Detection

Modules auto-activate based on context:

| Option | Example |
|--------|---------|
| `detect_extensions` | `['js', 'ts']` |
| `detect_files` | `['package.json']` |
| `detect_folders` | `['node_modules']` |
| `detect_env_vars` | `['NODE_ENV']` |

Prefix with `!` for negative matching: `['!VIRTUAL_ENV']`

## Conditional Format Strings

Parentheses make content conditional:

```toml
format = '(@$region)'  # Shows nothing if $region is empty
```

## Custom Modules

For arbitrary commands in prompt:

```toml
[custom.my_module]
command = 'echo hello'
when = 'test -f .my-marker'  # Only show when condition passes
shell = ['bash', '--noprofile', '--norc']
format = '[$output]($style) '
style = 'green bold'
```
