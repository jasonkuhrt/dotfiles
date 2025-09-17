# dotfiles

My personal system setup script and configuration files

## Checklist

- [Install vscode](https://code.visualstudio.com/download)
  - [install vscode cli](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line)
  - [Setup Code Settings Synchronization and download settings](http://shanalikhan.github.io/2015/12/15/Visual-Studio-Code-Sync-Settings.html)
  - [Make the UI more minimal](https://github.com/Microsoft/vscode/issues/46403#issuecomment-523286973)
- [Install `iterm`](https://www.iterm2.com/downloads.html)
- [Install shifty](https://github.com/thompsonate/Shifty)
- [Install `fish`](https://fishshell.com)
- [Install `fisher`](https://github.com/jorgebucaran/fisher)
- [Install `brew`](https://brew.sh)
- [Make Fish the default shell](https://gist.github.com/gagarine/cf3f65f9be6aa0e105b184376f765262?permalink_comment_id=3960962#gistcomment-3960962)
- [life-commit](https://github.com/ByronHsu/life-commit) for journaling ish
- Node development
  - [emma-cli](https://github.com/maticzav/emma-cli) for better npm package discovery
- Development
  - [Refined GitHub](https://chrome.google.com/webstore/detail/refined-github/hlepfoohegkhhmjieoechaddaejaokhf) for better GitHub UI
- Setup macOS
  - [Enable key repeat](https://stackoverflow.com/questions/39972335/how-do-i-press-and-hold-a-key-and-have-it-repeat-in-vscode)
  - [Disable double space period](http://osxdaily.com/2019/03/27/disable-period-typing-shortcut-mac/)
  - [Install Alfred](https://www.alfredapp.com/)
  - http://osxdaily.com/2010/02/26/use-the-tab-key-to-switch-between-dialog-buttons-in-mac-os-x/
  - [enable key repeat](https://www.howtogeek.com/267463/how-to-enable-key-repeating-in-macos)
  - https://github.com/JohnCoates/Aerial
  - [Enable Touch ID for sudo](https://www.imore.com/how-use-sudo-your-mac-touch-id)
  - update bash on macOS  
    macOS ships with an old version of bash (3.x). Bash is up to 5.x at the time of this writing. Although I am a zsh user currently, being bale to invoke a modern bash via `$ bash` can be useful. For example running some bash script that I would like to be compatible with what is on CircleCI (whose convenience docker images uses bash 4.x)  
    Instructions from [here](https://apple.stackexchange.com/questions/55989/change-my-shell-to-a-different-bash-version-at-usr-local-bin-bash/55998). Add `/usr/local/bin/bash` to `/etc/shells`. Then test via `bash --version`.
- Run `bin/install`

## Programming fonts

- [FiraCode](https://github.com/tonsky/FiraCode)
- [Operator Mono](https://www.typography.com/fonts/operator/styles/) (\$) ([intro](https://www.typography.com/blog/introducing-operator)) ([hype](https://twitter.com/dan_abramov/status/700439594337222657/photo/1)) ([w/ ligatures](https://github.com/kiliman/operator-mono-lig))
- [Hasklig](https://github.com/i-tu/Hasklig)
- [Iosevka](https://github.com/be5invis/Iosevka)
- [Hack](https://github.com/source-foundry/Hack)
- [PragmataPro](https://www.fsd.it/shop/fonts/pragmatapro/) (\$)
- [Monoid](https://github.com/larsenwork/monoid)
- [Source Code Pro](https://github.com/adobe-fonts/source-code-pro)
- [Cascadia Code](https://github.com/microsoft/cascadia-code)
- [MesloLGS NF](https://github.com/IlanCosman/tide#meslo-nerd-font)
- [Monaspace](https://github.com/githubnext/monaspace)
