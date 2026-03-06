# Cherri Skill Design

## Why JSON in iCloud (not Data Jar)

For persistent data across shortcuts, the chosen approach is a JSON file in iCloud Drive rather than Data Jar or other apps:

- Direct CLI access with `jq` and `shortcuts-config`
- Version controllable (can symlink to dotfiles repo)
- No app dependency
- Works on iOS via Files app + Shortcuts "Get File"/"Save File"
- Claude Code can read/write directly

## Community Reference (Not Installed)

Other Shortcuts extensions worth exploring later:

| App | Purpose | Link |
|-----|---------|------|
| **Pushcut** | Webhook triggers, location/schedule automation, home server | https://pushcut.io |
| **a-Shell** | Run shell commands (Python, Unix tools) on iOS | https://holzschu.github.io/a-Shell_iOS/ |
| **Jayson** | JSON viewer/editor with Shortcuts actions | https://jayson.app |
| **GizmoPack** | CSV parsing, Wallet pass generation | App Store |
| **Jellycuts** | Write Shortcuts in code (alternative to Cherri) | App Store |
| **Shortcutify** | Control Mac from iPhone, Google/Todoist integration | App Store |
| **Text Case** | Advanced text formatting | App Store |
| **AI Actions** | AI-powered Shortcuts actions (Sindre Sorhus) | App Store |
