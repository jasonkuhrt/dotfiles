# System Configuration

When making any system configuration changes, always consider:

1. **Should this go in dotfiles?** If the change should persist across machines or be reproducible, add it to the dotfiles repo instead of making direct system changes
2. **Where in dotfiles?** Match the config to the appropriate location:
   - Shell config → `fish/`
   - Git config → `git/`
   - Editor config → `zed/`, `nvim/`, `vim/`
   - Homebrew packages → `Brewfile`
   - npm globals → `npm/global-packages.txt`
   - macOS settings → `sync` script (defaults commands)
   - New tools → appropriate subdirectory + `sync` script updates

3. **Update sync script if needed** - New config directories need linking rules in `sync`
