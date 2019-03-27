# dotfiles

My personal tool configurations

## Setup

Use a tiny script to automate linking all configs to their expected locations
(typically your home (`~`) directory).

```
./force-install.sh
```

## Installation Hell

#### Python

* https://github.com/Homebrew/homebrew-core/issues/4174
* https://github.com/Homebrew/homebrew-core/issues/19286

## Additional

#### Bootstrapping:

* Install `brew` https://brew.sh
* [Fix `brew` setup on macOS High Sierra](https://stackoverflow.com/a/49060529/499537)
* Install/Use `zsh` https://rick.cogley.info/post/use-homebrew-zsh-instead-of-the-osx-default
* `brew install yarn zsh go shellcheck cmake ag pre-commit jq watchman tree bash
mdcat wget fx up direnv`
* `brew install hub --devel`
* https://github.com/Valloric/YouCompleteMe#installation
* http://osxdaily.com/2010/02/26/use-the-tab-key-to-switch-between-dialog-buttons-in-mac-os-x/

## Other goodies to get
* https://github.com/JohnCoates/Aerial

#### Misc

* [Enable Touch ID for sudo](https://www.imore.com/how-use-sudo-your-mac-touch-id)
* Do not ask for password every time interacting with remote git repos via
  ssh

  ```
  ssh-add -K ~/.ssh/id_rsa
  ```

  [reference](http://stackoverflow.com/questions/21095054/ssh-key-still-asking-for-password-and-passphrase)

* update bash on macOS

macOS ships with an old version of bash (3.x). Bash is up to 5.x at the time of this writing. Although I am a zsh user currently, being bale to invoke a modern bash via `$ bash` can be useful. For example running some bash script that I would like to be compatible with what is on CircleCI (whose convenience docker images uses bash 4.x)

Instructions from [here](https://apple.stackexchange.com/questions/55989/change-my-shell-to-a-different-bash-version-at-usr-local-bin-bash/55998). Add `/usr/local/bin/bash` to `/etc/shells`. Then test via `bash --version`.

## Programming font

* [FiraCode](https://github.com/tonsky/FiraCode)
* [Operator Mono](https://www.typography.com/fonts/operator/styles/) ($) ([intro](https://www.typography.com/blog/introducing-operator)) ([hype](https://twitter.com/dan_abramov/status/700439594337222657/photo/1)) ([w/ ligatures](https://github.com/kiliman/operator-mono-lig))
* [Hasklig](https://github.com/i-tu/Hasklig)
* [Iosevka](https://github.com/be5invis/Iosevka)
* [Hack](https://github.com/source-foundry/Hack)
* [PragmataPro](https://www.fsd.it/shop/fonts/pragmatapro/) ($)
* [Monoid](https://github.com/larsenwork/monoid)
* [Source Code Pro](https://github.com/adobe-fonts/source-code-pro)
