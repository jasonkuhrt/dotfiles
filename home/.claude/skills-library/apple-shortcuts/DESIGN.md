# Apple Shortcuts -- Design Notes

## Key Learnings

1. **Shortcuts are signed** -- macOS requires signed `.shortcut` files for import
2. **Actions come from apps** -- Install extension apps to get more actions
3. **ToolKit database is truth** -- Query it to discover available actions and parameters
4. **URL schemes work everywhere** -- Trigger shortcuts from CLI, scripts, other apps
5. **Wrapped iOS apps exist** -- Some "Mac" apps are actually iOS apps in disguise
6. **Use JSON for config** -- Store persistent data in `iCloud Drive/dotfiles/shortcuts/config.json`, not extension apps like Data Jar. This gives CLI access via `shortcuts-config` and works cross-platform.

## Why JSON Over Data Jar

JSON in iCloud Drive gives: direct CLI access (`jq`, `shortcuts-config`), version control (symlink to git repo), no app dependency, cross-platform (iOS Files app can read it too), and Claude Code can read/write directly.
