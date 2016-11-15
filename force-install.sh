#!/bin/sh

# -s makes symbolic links so that changes to configs in .dotfiles 
#    reflect in wherever else they are linked too.
# -h prevents following links
# -F Overwrites...
# -f ...without asking
# $PWD because a relative source is relative to the _target_. 

ln -shFf $PWD/.zshrc ~/.zshrc
ln -shFf $PWD/ghci ~/.ghci
