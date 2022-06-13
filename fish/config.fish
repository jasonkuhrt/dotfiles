if status is-interactive
    # Commands to run in interactive sessions can go here
end

# PATH
# ====

## Remote Dev Machine
## ------------------

switch (uname)
    case Linux
        eval "(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
        # Lang Setup (for man)
        set --export LC_CTYPE "en_US.UTF-8"
end

# Secrets
# =======

source ~/.config/fish/config.secrets.fish

# Misc
# ====

set --export EDITOR vim

direnv hook fish | source

# The official suggestion doesn't work inFish for some reason
# More info here about the problem and workaround: https://github.com/Schniz/fnm/issues/356#issuecomment-1010816655
# fnm env --use-on-cd | source
# if type fnm -q
#  fnm env --shell fish --use-on-cd | source
#  fnm completions --shell fish | source
# end



# Use ag to filter out git ignored files from fzf results

set --export FZF_DEFAULT_COMMAND 'ag -g ""'

# https://fishshell.com/docs/current/faq.html#how-do-i-change-the-greeting-message
set --universal fish_greeting ""

# Aliases
# =======

## Git
## ---

alias g='git'
alias ga='git add'
alias gb='git branch --format=\'%(HEAD) %(color:yellow)%(refname:short)%(color:reset) - %(contents:subject) %(color:green)(%(committerdate:relative)) [%(authorname)]\' --sort=-committerdate'
alias gaa='git add -A'
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
## ------

alias ghil="gh issue list"
alias gpr="gh pr"
alias gprc="gh pr create"
alias gprv="gh pr view --web"
alias gr="gh repo"
alias grv="gh repo view --web"
alias gi="gh issue"
alias gic="gh issue create"

## Other
## -----

alias y="yarn"
alias ..="cd .."
alias d="docker"
alias dc="docker-compose"
alias k="kubectl"
alias tf="terraform"
alias grepp="pcregrep"
alias p="pnpm"
alias ps="pnpm --silent"
alias f="flyctl"



# Helpers
# -------

function mcd --description "Create a directory and set CWD"
    command mkdir $argv
    if test $status = 0
        switch $argv[(count $argv)]
            case '-*'
            case '*'
                cd $argv[(count $argv)]
                return
        end
    end
end

set --export GITHUB_HANDLE jasonkuhrt

fish_add_path /home/linuxbrew/.linuxbrew/opt/node@16/bin

set -gx LDFLAGS "-L/home/linuxbrew/.linuxbrew/opt/node@16/lib"
set -gx CPPFLAGS "-I/home/linuxbrew/.linuxbrew/opt/node@16/include"
