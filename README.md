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
* Install/Use `zsh` https://rick.cogley.info/post/use-homebrew-zsh-instead-of-the-osx-default
* `brew install yarn zsh go shellcheck cmake`
* `brew install hub --devel`
* https://github.com/Valloric/YouCompleteMe#installation

#### Misc

* Do not ask for password every time interacting with remote git repos via
  ssh

  ```
  ssh-add -K ~/.ssh/id_rsa
  ```

  [reference](http://stackoverflow.com/questions/21095054/ssh-key-still-asking-for-password-and-passphrase)

## Programming font

* [FiraCode](https://github.com/tonsky/FiraCode)
* [Operator Mono](https://www.typography.com/fonts/operator/styles/) ($) ([intro](https://www.typography.com/blog/introducing-operator)) ([hype](https://twitter.com/dan_abramov/status/700439594337222657/photo/1)) ([w/ ligatures](https://github.com/kiliman/operator-mono-lig))
* [Hasklig](https://github.com/i-tu/Hasklig)
* [Iosevka](https://github.com/be5invis/Iosevka)
* [Hack](https://github.com/source-foundry/Hack)
* [PragmataPro](https://www.fsd.it/shop/fonts/pragmatapro/) ($)
* [Monoid](https://github.com/larsenwork/monoid)
* [Source Code Pro](https://github.com/adobe-fonts/source-code-pro)
