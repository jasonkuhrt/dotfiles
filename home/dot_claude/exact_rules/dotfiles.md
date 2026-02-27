# Dotfiles (chezmoi)

All system config changes go through `~/projects/jasonkuhrt/dotfiles/home/`, not direct home directory edits. `chezmoi apply` overwrites managed paths — direct edits are lost.

Path mapping: `dot_config/fish/config.fish` → `~/.config/fish/config.fish`.

**Never `chezmoi apply --force` blind.** Diff first: `diff <(chezmoi cat ~/.config/foo) ~/.config/foo`. Show the user what would be lost. Only force-apply after explicit approval.
