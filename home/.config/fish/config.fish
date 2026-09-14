# PATH
# ====
#
# One block, one mechanism, first in the file: later config (starship, secrets
# via gh) needs the tools already resolvable.
#
# `fish_add_path -gP` prepends to the global $PATH. It is idempotent, so nested
# shells no longer grow PATH by five entries per level, and it skips directories
# that do not exist, so a missing toolchain leaves no dead entry behind. It
# deliberately does not touch the universal `fish_user_paths`: universal PATH
# entries are machine state that outlives this file and cannot be reviewed here.
#
# First argument wins. ~/.local/bin leads so its wrappers shadow Homebrew casks
# (see home/.local/bin/codex). Installer-appended blocks for pnpm, bun, cargo,
# go and grok are folded in here; if one re-appends its own block, delete it.

set -gx NPM_GLOBAL "$HOME/.npm-global"
set -gx PNPM_HOME "$HOME/Library/pnpm"
set -gx BUN_INSTALL "$HOME/.bun"

fish_add_path -gP \
    "$HOME/.local/bin" \
    "$NPM_GLOBAL/bin" \
    "$PNPM_HOME" "$PNPM_HOME/bin" \
    "$BUN_INSTALL/bin" \
    "$HOME/.cargo/bin" \
    "$HOME/go/bin" \
    "$HOME/.grok/bin" \
    /opt/homebrew/bin \
    /opt/homebrew/sbin

# Prompt (Starship). --print-full-init avoids the extra process the default init spawns.
status is-interactive; and starship init fish --print-full-init | source

# Secrets
# =======

test -f ~/.config/fish/config.secrets.fish && source ~/.config/fish/config.secrets.fish

# Misc
# ====

set --export EDITOR nvim
set --export XDG_CONFIG_HOME ~/.config
set --export RIPGREP_CONFIG_PATH ~/.config/ripgrep/config

# Claude Code: max response length. The harness reserves 13k + this value as the
# output buffer, so raising it trades context window for longer single responses.
# Source: https://x.com/bcherny/status/2012670336362492296
set --export CLAUDE_CODE_MAX_OUTPUT_TOKENS 50000

# Claude Code: double skill description budget from 15k→30k chars
# Prevents skills silently disappearing when you have many installed
# Docs: https://code.claude.com/docs/en/skills#claude-doesnt-see-all-my-skills
set --export SLASH_COMMAND_TOOL_CHAR_BUDGET 30000

# Claude Code: enable agent teams (experimental)
# Unlocks TeamCreate, TaskCreate, TaskUpdate, TaskList, SendMessage tools
# Docs: https://code.claude.com/docs/en/agent-teams
set --export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS 1

# Claude Code: flicker-free alt-screen rendering with virtualized scrollback
# Added in v2.1.89
set --export CLAUDE_CODE_NO_FLICKER 1

# Plannotator: open in cmux browser instead of OS default
set --export PLANNOTATOR_BROWSER "$HOME/.local/bin/plannotator-browser"

# fzf: use fd for file listing (respects .gitignore, purpose-built for file enumeration)
set --export FZF_DEFAULT_COMMAND 'fd --type f --strip-cwd-prefix --hidden --follow --exclude .git'

# fzf Tokyo Night theme
# Source: https://github.com/folke/tokyonight.nvim/blob/main/extras/fzf/tokyonight_night.sh
set --export FZF_DEFAULT_OPTS "\
--color=bg+:#283457,bg:#1a1b26,spinner:#9ece6a,hl:#7aa2f7 \
--color=fg:#c0caf5,header:#7aa2f7,info:#e0af68,pointer:#9ece6a \
--color=marker:#9ece6a,fg+:#c0caf5,prompt:#e0af68,hl+:#7aa2f7 \
--color=border:#565f89"

# https://fishshell.com/docs/current/faq.html#how-do-i-change-the-greeting-message
set -g fish_greeting ""

# Interactive-only block: abbreviations, helper functions, shell modules and prompt
# integrations do nothing in a script, but every `fish -c` paid for them.
if status is-interactive

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
abbr -a gst 'git'
abbr -a gd lazygit
abbr -a gb 'git branch'
abbr -a gp 'git push'
abbr -a ga 'git add'
abbr -a gaa 'git add --all'
abbr -a gc 'git commit'
abbr -a gl 'git log --oneline'
abbr -a gll 'git log'
abbr -a lg lazygit
abbr -a wts 'wt switch'
abbr -a d docker
abbr -a dc docker-compose
abbr -a k kubectl
abbr -a p pnpm
abbr -a c claude
abbr -a cx 'claude --print'
abbr -a cr 'claude --resume'
abbr -a clp 'claude plugin'
abbr -a clpi 'claude plugin install'
abbr -a clpr 'claude plugin uninstall'
abbr -a clpl 'claude plugin list'
abbr -a clpe 'claude plugin enable'
abbr -a clpd 'claude plugin disable'
abbr -a clpu 'claude plugin update'
abbr -a clpm 'claude plugin marketplace'
abbr -a clpma 'claude plugin marketplace add'
abbr -a clpml 'claude plugin marketplace list'
abbr -a clpmu 'claude plugin marketplace update'
abbr -a clpmr 'claude plugin marketplace remove'
abbr -a l yazi
abbr -a h hunk
abbr -a ghil 'gh issue list'
abbr -a gi 'gh issue'
abbr -a gic 'gh issue create'
abbr -a gpr 'gh pr'
abbr -a gprc 'gh pr create'
abbr -a gr 'gh repo'
abbr -a pnx 'pnpm nx'
abbr -a grepp pcre2grep

# Modern Unix replacements (only expand in interactive mode, not scripts)
abbr -a ls lsd
abbr -a cat bat
abbr -a top btm
abbr -a htop btm
abbr -a find 'fd --hyperlink auto'
abbr -a grep rg
abbr -a du dust
abbr -a df duf
abbr -a ps procs
abbr -a sed sd
abbr -a dig doggo
abbr -a ping gping
abbr -a diff difft
abbr -a n nvim
abbr -a vim nvim
abbr -a vi nvim

# Utilities
function weather --description 'Terminal weather forecast'
    set -l location (test (count $argv) -gt 0; and echo $argv[1]; or echo "Montreal")
    curl -s "wttr.in/$location"
end
alias cal='cal -3'  # show 3 months by default

## Aliases (commands with flags/args)
## ----------------------------------

alias ccusage 'npx ccusage@latest'

# GitHub CLI
function dr --description "Devin Review for current branch's PR"
    set -l pr_url (gh pr view --json url -q .url 2>/dev/null)
    or begin; echo "No PR found for current branch"; return 1; end
    npx devin-review $pr_url
end
function gprv --description "Open current branch's PR in browser"
    set -l pr_url (gh pr view --json url -q .url 2>/dev/null)
    or begin; echo "No PR found for current branch" >&2; return 1; end

    if test -n "$CMUX_WORKSPACE_ID"; and command -q cmux
        set -l workspace_ref (cmux current-workspace 2>/dev/null | string trim)
        if test -n "$workspace_ref"
            echo "Opening $pr_url in cmux browser."
            cmux browser open --workspace "$workspace_ref" "$pr_url"
            and return 0
            echo "cmux browser open failed; falling back to system browser." >&2
        end
    end

    gh pr view --web
end
alias grv="gh repo view --web"

# Other
# OSC 8 hyperlinks (tree has no config file; no auto mode, just on/off)
alias tree='tree --hyperlink'

alias px="pnpm --silent"
alias pt="pnpm --silent turbo"
alias octorus="command or" # octorus' binary is `or`, which collides with the fish builtin

# npm script runner with silent mode and automatic -- for args
function npmx --description "Run npm scripts silently with args"
    npm run -s $argv[1] -- $argv[2..-1]
end


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

abbr -a zx zmx
abbr -a zs zsm

function zz --description "zmx: attach/create session named after current directory"
    zmx attach (basename $PWD)
end

# zoxide: smart cd with frecency ranking (replaces jethrokuan/z)
zoxide init fish | source

# Dotfiles modules (fish/modules/*.fish)
for f in ~/.config/fish/modules/*.fish
    source $f
end

end # interactive-only block

# cmux ships a `tmux` shim that proxies to `cmux __tmux-compat`, so tools that
# drive tmux (Claude Code teams) drive cmux panes instead. Real tmux is not
# installed, so without this those tools have no tmux at all.
if set -q CMUX_SURFACE_ID; and test -x "$HOME/.cmuxterm/claude-teams-bin/tmux"
    fish_add_path -gP "$HOME/.cmuxterm/claude-teams-bin"
end


#
#
#
#
# ––––––––––––––––––––––––––– Vim Mode
#
#

if status is-interactive

# Vi mode with hybrid insert (Ctrl+A/E still work in insert mode)
fish_vi_key_bindings default
bind -M insert -m default k,j cancel repaint-mode
set -g fish_sequence_key_delay_ms 200

# Ctrl+J/K navigate the tab-completion pager like arrow keys
bind -M pager \ck up-or-search
bind -M pager \cj down-or-search

# Cursor shapes per mode (visual feedback)
set -g fish_cursor_default block
set -g fish_cursor_insert line
set -g fish_cursor_visual block

# fzf.fish: must be called AFTER fish_vi_key_bindings, which replaces all bindings
# Provides: Ctrl+R (history), Ctrl+Alt+F (files), Ctrl+Alt+L (git log),
#           Ctrl+Alt+S (git status), Ctrl+Alt+P (processes), Ctrl+V (variables)
fzf_configure_bindings

# Disable replace mode (unused)
bind -M default r ''
bind -M default R ''

# Vi normal mode: [ and ] cycle cmux tabs (surfaces) via cmuxx
# Overrides history-token-search (alt-up/down and ctrl+r remain)
bind -M default \[ 'cmuxx prev-surface'
bind -M default \] 'cmuxx next-surface'

function fish_mode_prompt --description "Display vi mode as a single Tokyo Night colored letter"
    if not set -q __dotfiles_fish_vi_mode_bootstrapped
        set -g __dotfiles_fish_vi_mode_bootstrapped 1
        if test "$fish_key_bindings" = fish_vi_key_bindings
            or test "$fish_key_bindings" = fish_hybrid_key_bindings
            set fish_bind_mode default
        end
    end

    switch $fish_bind_mode
        case default
            set_color --bold 7aa2f7
            echo -n 'N '
        case insert
            set_color --bold 9ece6a
            echo -n 'I '
        case visual
            set_color --bold bb9af7
            echo -n 'V '
        case '*'
            set_color --bold 7aa2f7
            echo -n 'N '
    end
    set_color normal
end

end # interactive-only block

# Gentle nudge if nesia changelog hasn't been checked in 7+ days
# Must be after PATH setup since nesia lives in ~/.local/bin
status is-interactive; and nesia nag 2>/dev/null

# Added by OrbStack: command-line tools and integration
# This won't be added again if you remove it.
source ~/.orbstack/shell/init2.fish 2>/dev/null || :
