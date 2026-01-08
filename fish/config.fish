if status is-interactive
    # Commands to run in interactive sessions can go here
end

# Tide prompt presets
# Usage: tide-daily (default) or tide-zen (minimal)
function tide-daily --description "Daily prompt: 2-line, time, git, full info (restart shell to apply)"
    tide configure --auto --style=Lean --prompt_colors='True color' --show_time='12-hour format' --lean_prompt_height='Two lines' --prompt_connection=Solid --prompt_connection_andor_frame_color=Darkest --prompt_spacing=Sparse --icons='Few icons' --transient=Yes
end

function tide-zen --description "Zen prompt: minimal, 1-line, no distractions (restart shell to apply)"
    tide configure --auto --style=Lean --prompt_colors='True color' --show_time=No --lean_prompt_height='One line' --prompt_connection=Disconnected --prompt_spacing=Compact --icons='Few icons' --transient=Yes
    set -U tide_left_prompt_items character
end

function tide-toggle --description "Toggle between daily and zen prompts"
    if test "$tide_left_prompt_items" = "character"
        tide-daily
    else
        tide-zen
    end
end
alias tt='tide-toggle'

# Secrets
# =======

test -f ~/.config/fish/config.secrets.fish && source ~/.config/fish/config.secrets.fish

# Misc
# ====

set --export EDITOR nvim
set --export DPRINT_CONFIG_DISCOVERY global  # use ~/.config/dprint/dprint.json



# Direnv: lazy-load only when needed (saves ~130ms startup)
# Auto-activates if .envrc exists in current dir, otherwise run `direnv-init`
function direnv-init --description "Enable direnv for this shell session"
    direnv hook fish | source
    direnv reload 2>/dev/null
end
if test -f .envrc
    direnv-init
end

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

# Abbreviations & Aliases
# =======================
#
# Abbreviations (abbr) vs Aliases:
# - abbr: Expands as you type, shows full command in history
#         e.g., type "g st" → expands to "git st" → history shows "git st"
# - alias: Runs command but history shows the alias
#         e.g., type "px test" → runs "pnpm --silent test" → history shows "px test"
#
# Rule of thumb:
# - Use abbr for simple command renames (g→git, p→pnpm, d→docker)
# - Use alias for commands with flags/args baked in (px="pnpm --silent")

## Abbreviations
## -------------

abbr -a g git
abbr -a lg lazygit
abbr -a d docker
abbr -a dc docker-compose
abbr -a k kubectl
abbr -a tf terraform
abbr -a p pnpm
abbr -a c clear
abbr -a l libra

## Aliases (commands with flags/args)
## ----------------------------------

alias serena 'uv run --directory /Users/jasonkuhrt/projects/oraios/serena serena'
alias ccusage 'npx ccusage@latest'
alias ccmonitor 'claude-monitor --plan max20'

# GitHub CLI
alias ghil="gh issue list"
alias gpr="gh pr"
alias gprc="gh pr create"
alias gprv="gh pr view --web"
alias gr="gh repo"
alias grv="gh repo view --web"
alias gi="gh issue"
alias gic="gh issue create"

# Other
alias ..="cd .."
alias grepp="pcregrep"
alias pnx="pnpm nx"
alias px="pnpm --silent"
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

# Node package managers
# pnpm manages node versions; npm globals go to fixed location (survives node version changes)
# See README "Node Package Management" for details
set -gx NPM_GLOBAL "$HOME/.npm-global"
set -gx PNPM_HOME "$HOME/Library/pnpm"
set -gx PATH "$NPM_GLOBAL/bin" "$PNPM_HOME" $PATH

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

# bun
set --export BUN_INSTALL "$HOME/.bun"
set --export PATH $BUN_INSTALL/bin $PATH

# uv
fish_add_path "/Users/jasonkuhrt/.local/bin"
