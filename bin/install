#!/bin/sh

# -s makes symbolic links so that changes to configs in .dotfiles
#    reflect in wherever else they are linked too.
# -h prevents following links
# -F Overwrites...
# -f ...without asking
# $PWD because a relative source is relative to the _target_.

touch zshrc.secrets

ln -shFf $PWD/zshrc.secrets ~/.zshrc.secrets
ln -shFf $PWD/zshrc ~/.zshrc
ln -shFf $PWD/ghci ~/.ghci
ln -shFf $PWD/vimrc ~/.vimrc

# https://stackoverflow.com/questions/15769615/remove-last-login-message-for-new-tabs-in-terminal
touch ~/.hushlogin

#
# Install tools not yet available on brew
#

wget -qO ~/bin/yj https://github.com/sclevine/yj/releases/download/v4.0.0/yj-macos && chmod +x ~/bin/yj
