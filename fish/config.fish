if status is-interactive
    # Commands to run in interactive sessions can go here
end

# Secrets
# =======

test -f ~/.config/fish/config.secrets.fish && source ~/.config/fish/config.secrets.fish

# Misc
# ====

set --export EDITOR nvim



direnv hook fish | source

# The official suggestion doesn't work in Fish for some reason
# More info here about the problem and workaround: https://github.com/Schniz/fnm/issues/356#issuecomment-1010816655
# fnm env --use-on-cd | source
# fnm env | source
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
# Single alias - use git aliases for the rest (g co, g st, g lg, etc.)
# See: ~/.gitconfig [alias] section

alias g='git'
alias serena 'uv run --directory /Users/jasonkuhrt/projects/oraios/serena serena'
alias ccusage 'npx ccusage@latest'
alias ccmonitor 'claude-monitor --plan max20'


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

# alias y="yarn"
alias ..="cd .."
alias d="docker"
alias dc="docker-compose"
alias k="kubectl"
alias tf="terraform"
alias grepp="pcregrep"
alias p="pnpm"
alias pnx="pnpm nx"
alias px="pnpm --silent"
alias c="clear"
alias l="libra"
alias pt="pnpm --silent turbo"


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

# pnpm
set -gx PNPM_HOME "/Users/jasonkuhrt/Library/pnpm"
set -gx PATH "$PNPM_HOME" $PATH
# pnpm end

# The next line updates PATH for the Google Cloud SDK.
if [ -f '/Users/jasonkuhrt/google-cloud-sdk/path.fish.inc' ]; . '/Users/jasonkuhrt/google-cloud-sdk/path.fish.inc'; end

test -e {$HOME}/.iterm2_shell_integration.fish ; and source {$HOME}/.iterm2_shell_integration.fish


# Added by Windsurf
fish_add_path /Users/jasonkuhrt/.codeium/windsurf/bin

#
#
#
#
# ––––––––––––––––––––––––––– Vim Mode
#
#

# Currently disabled to not conflict with vim inside Zed.
# TODO: Can I conditionally enable the below when NOT in Zed?
fish_default_key_bindings

# To discover the avalable commands you can run this:
#
#   bind --function-names
#

# fish_vi_key_bindings
# bind --mode insert -m default k,j cancel repaint-mode
# set -g fish_sequence_key_delay_ms 200

# bind -M default H beginning-of-line
# bind -M default L end-of-line
set -gx PATH /Users/jasonkuhrt/Library/pnpm $PATH


# bun
set --export BUN_INSTALL "$HOME/.bun"
set --export PATH $BUN_INSTALL/bin $PATH

# uv
fish_add_path "/Users/jasonkuhrt/.local/bin"
