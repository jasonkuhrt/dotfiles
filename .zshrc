#
# Expose directories that contain executables
#

# NOTE Lower values take precedence since each value is appended.

export PATH=/bin:$PATH # TODO Needed?
export PATH=/sbin:$PATH  # TODO Needed?
export PATH=/usr/bin:$PATH  # TODO Needed?
export PATH=/usr/sbin:$PATH  # TODO Needed?
export PATH=/usr/local/bin:$PATH
export PATH=/usr/local/sbin:$PATH # TODO Needed?
export PATH=~/bin:$PATH
export PATH=~/.local/bin:$PATH
export PATH=~/Library/Haskell/bin:$PATH # TODO Delete?



#
# Initialize zplug
#

# Reference `brew info zplug`

export ZPLUG_HOME=/usr/local/opt/zplug
source $ZPLUG_HOME/init.zsh



#
# Use zplug to install plugins
#

# NOTE syntax-highlighting must preceed history-substring-search
# Ref https://github.com/zsh-users/zsh-history-substring-search#usage

zplug "supercrabtree/k"
zplug "felixr/docker-zsh-completion"
zplug "zsh-users/zsh-completions"
zplug "tarrasch/zsh-mcd"
zplug "lukechilds/zsh-better-npm-completion"
zplug "lukechilds/zsh-nvm"
zplug "mafredri/zsh-async" # Required by sindresorhus/pure
zplug "sindresorhus/pure"
zplug "tarrasch/zsh-bd"
zplug "zsh-users/zsh-completions"
zplug "zsh-users/zsh-autosuggestions"
zplug "plugins/git", from:oh-my-zsh
zplug "zsh-users/zsh-syntax-highlighting"
zplug "zsh-users/zsh-history-substring-search", nice:10
# Other plugins under consideration:
# zplug "the8/terminal-app.zsh"
# zplug "tymm/zsh-directory-history"
# zplug "walesmd/caniuse.plugin.zsh"
zplug load



#
# Configure history-substring-search
#

# Bind "up" and "down" keys
# Reference https://github.com/zsh-users/zsh-history-substring-search#usage

zmodload zsh/terminfo
bindkey '^[[A' history-substring-search-up
bindkey '^[[B' history-substring-search-down

# Avoid _contiguous_ duplicates in search results
# NOTE There is a way to also avoid global duplicates as well.
# Ref https://github.com/zsh-users/zsh-history-substring-search#configuration

# E.g. `> which` with result set:
#     which foo, which bar, which foo, which foo
# Would just show:
#     which foo, which bar, which foo

setopt HIST_FIND_NO_DUPS



#
# Configure fzf
#

# Support fzf in file completion

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

# Use ag to filter out git ignored files from fzf results

export FZF_DEFAULT_COMMAND='ag -g ""'



#
# Configure Autocompletion
#

# Cherry picked from:
# https://github.com/robbyrussell/oh-my-zsh/blob/master/lib/completion.zsh

# zsh documentation:
#http://zsh.sourceforge.net/Doc/Release/Completion-System.html#Standard-Styles

unsetopt menu_complete   # do not autoselect the first completion entry
unsetopt flowcontrol
setopt auto_menu         # show completion menu on succesive tab press
setopt complete_in_word
setopt always_to_end

zstyle ':completion:*' verbose true
# Enable this if I decide that I want highlights when cycling through options.
# zstyle ':completion:*:*:*:*:*' menu select-long
zstyle ':completion:*' matcher-list 'm:{a-zA-Z-_}={A-Za-z_-}' 'r:|=*' 'l:|=* r:|=*'
zstyle ':completion:*' list-colors ''
zstyle ':completion:*:*:kill:*:processes' list-colors '=(#b) #([0-9]#) ([0-9a-z-]#)*=01;34=0=01'
zstyle ':completion:*:cd:*' tag-order local-directories directory-stack path-directories

zstyle :compinstall filename '/Users/jasonkuhrt/.zshrc'
autoload -Uz compinit
compinit



#
# Configure hub
#

# Create an alias that integrates hub command into git
# Ref https://github.com/github/hub#aliasing

eval "$(hub alias -s)"



#
# Aliases
#

alias ..="cd .."



#
# System & Misc
#

bindkey -e
HISTFILE=~/.zsh-history
HISTSIZE=10000
SAVEHIST=10000
setopt beep
setopt autocd
autoload -U promptinit && promptinit # TODO What is this?

export EDITOR='atom --wait' # TODO remove this

hash -d dir_homebrews=/usr/local/Cellar # TODO What is this?
