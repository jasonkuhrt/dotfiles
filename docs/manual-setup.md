# Manual Setup

Steps to complete after running `chezmoi apply`.

## 1. Full Disk Access for Terminal

```sh
open "x-apple.systempreferences:com.apple.settings.PrivacySecurity.extension?Privacy_AllFiles"
```

* Click + and add your terminal app (e.g., Ghostty)
* Required for bookmark sync to read Safari bookmarks

## 2. Fish Secrets

Secrets are age-encrypted in the repo. Edit with `chezmoi edit ~/.config/fish/config.secrets.fish` (decrypts in-place for editing, re-encrypts on save). On first setup, paste your age key from your password manager to `~/.config/chezmoi/key.txt`, then `chezmoi apply` decrypts automatically.

## 3. macOS Settings

### Caps Lock → Ctrl

```sh
open "x-apple.systempreferences:com.apple.Keyboard-Settings.extension"
```

* Keyboard Shortcuts → Modifier Keys → change Caps Lock to Control

### Spotlight Shortcut

Free Cmd+Space for Raycast:

* Same pref pane → Keyboard Shortcuts → Spotlight → uncheck "Show Spotlight search"

### Karabiner (Fn Toggle)

`karabiner.json` is managed by chezmoi and includes: tap `Fn` to toggle sticky `Fn`; hold `Fn` for normal `Fn`.

```sh
open -a "Karabiner-Elements"
```

* Grant required permissions when prompted (Input Monitoring, Accessibility)
* In Karabiner-Elements, ensure profile "Default profile" is selected

## 4. GitHub

### Authenticate CLI

```sh
gh auth login
```

### SSH Key (if needed)

```sh
ssh-keygen -t ed25519 -C "jasonkuhrt@me.com"
gh ssh-key add ~/.ssh/id_ed25519.pub
```

## 5. Raycast Hotkey

```sh
open -a Raycast
```

* Cmd+, → Extensions → set hotkey to Cmd+Space

## 6. Wispr Flow

* Download from [wisprflow.ai/downloads](https://wisprflow.ai/downloads) (not in Homebrew)
* Open dmg and drag to Applications
* Launch and sign in (settings sync automatically)
* Grant Accessibility permission when prompted
* Grant Microphone permission when prompted
* Hotkey is managed by chezmoi: push-to-talk is set to `F8` (run `chezmoi apply` with Wispr Flow closed)

## 7. Email Password

Generate iCloud app-specific password at appleid.apple.com/account/manage:

```sh
security add-generic-password -s 'mbsync-icloud' -a 'jasonkuhrt@me.com' -w 'YOUR_APP_PASSWORD'
```

## 8. Claude in Chrome

* Install [Claude extension](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn) from Chrome Web Store
* Sign in with your Claude account
* Pin extension (puzzle icon → thumbtack)
* Run `claude --chrome` or use `/chrome` in existing session
* Requires extension ≥1.0.36, Claude Code ≥2.0.73
* Google Chrome only (not Brave, Arc, etc.)

## 9. Serena MCP

Semantic code analysis:

```sh
claude mcp add --scope user serena -- uvx --from git+https://github.com/oraios/serena serena start-mcp-server --context claude-code --project-from-cwd
```

* Requires `uv` (installed via Brewfile)
* `--context claude-code` disables tools that duplicate Claude Code's built-in ones
* `--project-from-cwd` auto-activates project based on working directory

## 10. iCloud Desktop & Documents

```sh
open "x-apple.systempreferences:com.apple.preferences.AppleIDPrefPane"
```

* iCloud → iCloud Drive → Options → check "Desktop & Documents Folders"
