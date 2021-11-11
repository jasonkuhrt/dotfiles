if status is-interactive
    # Commands to run in interactive sessions can go here
end

source ~/.config/fish/config.secrets.fish

set EDITOR vim

direnv hook fish | source

# Aliases

## Git

alias gs='git status'
alias gst='git status'
alias gc='git commit -v'
alias gd='git diff'
alias gbd='git branch -d'
alias gco='git checkout'
alias glg='git log --stat'
alias gp='git push'
alias gl='git log --oneline --decorate --graph'
alias gla='git log --oneline --decorate --graph --all'


## Github

alias ghil="gh issue list"
alias gpr="gh pr"
alias gprc="gh pr create"
alias gprv="gh pr view --web"
alias gr="gh repo"
alias grv="gh repo view --web"
alias gi="gh issue"
alias gic="gh issue create"

## Other

alias y="yarn"
alias ..="cd .."
alias d="docker"
alias dc="docker-compose"
alias k="kubectl"
alias tf="terraform"
alias grepp="pcregrep"

# Use ag to filter out git ignored files from fzf results

set FZF_DEFAULT_COMMAND 'ag -g ""'

# Debian Machine

if test -d /home/debian
    set PATH "$PATH:/home/debian/.linuxbrew/bin"

    # set NIX_LINK $HOME/.nix-profile
    # set PATH "$PATH:$NIX_LINK/bin"

    # Lang Setup (for man)
    set LC_CTYPE "en_US.UTF-8"
end