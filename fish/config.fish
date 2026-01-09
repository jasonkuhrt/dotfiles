if status is-interactive
    # Commands to run in interactive sessions can go here
end

# Tide prompt presets
# Usage: tide-daily (default) or tide-zen (minimal)
# Core functions (_tide-*-vars) set variables only, for use in scripts
# Interactive functions (tide-*) set vars then restart shell

function _tide-daily-vars --description "Set daily prompt variables (no shell restart)"
    set -U tide_left_prompt_items pwd git newline character
    set -U tide_right_prompt_items status cmd_duration context jobs direnv node time
    set -U tide_prompt_add_newline_before true
    set -U tide_prompt_transient_enabled false
end

function _tide-zen-vars --description "Set zen prompt variables (no shell restart)"
    set -U tide_left_prompt_items character
    set -U tide_right_prompt_items status cmd_duration jobs
    set -U tide_prompt_add_newline_before false
    set -U tide_prompt_transient_enabled false
end

function tide-daily --description "Daily prompt: 2-line, time, git, full info"
    _tide-daily-vars
    exec fish
end

function tide-zen --description "Zen prompt: minimal, 1-line, no distractions"
    _tide-zen-vars
    exec fish
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



# Direnv: lazy-load only when needed (saves ~130ms startup)
# Auto-activates if .envrc exists in current dir, otherwise run `direnv-init`
set -gx DIRENV_LOG_FORMAT ""  # Silence "loading" messages
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
abbr -a gst 'git status'
abbr -a gd 'git diff'
abbr -a gb 'git branch'
abbr -a gp 'git push'
abbr -a ga 'git add'
abbr -a gaa 'git add --all'
abbr -a gl 'git log --oneline'
abbr -a gll 'git log'
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

function git --wraps git --description "git with no args shows dashboard"
    if test (count $argv) -eq 0
        _git_dashboard
    else
        command git $argv
    end
end

# Git Dashboard
# =============
# Context-aware git status with railway graph visualization

function _git_is_repo
    command git rev-parse --git-dir >/dev/null 2>&1
end

function _git_is_trunk
    set -l branch (command git branch --show-current 2>/dev/null)
    test "$branch" = "main" -o "$branch" = "master"
end

function _git_is_dirty
    test -n "(command git status --porcelain 2>/dev/null)"
end

function _git_branch_info
    # Returns: branch upstream ahead behind
    set -l branch (command git branch --show-current 2>/dev/null)
    if test -z "$branch"
        # Detached HEAD
        set branch (command git rev-parse --short HEAD 2>/dev/null)
        echo "$branch" "" "0" "0"
        return
    end

    set -l upstream (command git rev-parse --abbrev-ref '@{upstream}' 2>/dev/null)
    if test -z "$upstream"
        echo "$branch" "" "0" "0"
        return
    end

    # Get ahead/behind counts
    set -l counts (command git rev-list --left-right --count HEAD...'@{upstream}' 2>/dev/null)
    set -l ahead (echo $counts | awk '{print $1}')
    set -l behind (echo $counts | awk '{print $2}')

    # Extract just the remote branch name (origin/main -> main)
    set -l upstream_short (string replace -r '^[^/]+/' '' "$upstream")

    echo "$branch" "$upstream_short" "$ahead" "$behind"
end

function _git_file_status
    # Parse git status --porcelain and group by status
    set -l staged_files
    set -l unstaged_files
    set -l untracked_files

    for line in (command git status --porcelain 2>/dev/null)
        set -l index_status (string sub -s 1 -l 1 "$line")
        set -l work_status (string sub -s 2 -l 1 "$line")
        set -l file (string sub -s 4 "$line")

        # Staged changes (index has changes)
        if test "$index_status" != " " -a "$index_status" != "?"
            switch $index_status
                case M
                    set -a staged_files "M $file"
                case A
                    set -a staged_files "+ $file"
                case D
                    set -a staged_files "- $file"
                case R
                    set -a staged_files "R $file"
                case C
                    set -a staged_files "C $file"
            end
        end

        # Unstaged changes (working tree has changes)
        if test "$work_status" != " " -a "$index_status" != "?"
            switch $work_status
                case M
                    set -a unstaged_files "M $file"
                case D
                    set -a unstaged_files "- $file"
            end
        end

        # Untracked
        if test "$index_status" = "?"
            set -a untracked_files "U $file"
        end
    end

    # Output grouped files with orange status indicators
    if test (count $staged_files) -gt 0
        set_color green
        echo "Staged ("(count $staged_files)")"
        for f in $staged_files
            set -l file_status (string sub -l 1 "$f")
            set -l file (string sub -s 3 "$f")
            set_color yellow
            printf "  %s" $file_status
            set_color normal
            printf " %s\n" $file
        end
        echo
    end

    if test (count $unstaged_files) -gt 0
        set_color yellow
        echo "Unstaged ("(count $unstaged_files)")"
        for f in $unstaged_files
            set -l file_status (string sub -l 1 "$f")
            set -l file (string sub -s 3 "$f")
            set_color yellow
            printf "  %s" $file_status
            set_color normal
            printf " %s\n" $file
        end
        echo
    end

    if test (count $untracked_files) -gt 0
        set_color brblack
        echo "Untracked ("(count $untracked_files)")"
        for f in $untracked_files
            set -l file_status (string sub -l 1 "$f")
            set -l file (string sub -s 3 "$f")
            set_color yellow
            printf "  %s" $file_status
            set_color normal
            printf " %s\n" $file
        end
        echo
    end
end

function _git_recent_branches
    # Get branches sorted by recent commit activity (excluding current)
    set -l current (command git branch --show-current 2>/dev/null)
    set -l branches

    for ref in (command git for-each-ref --sort=-committerdate --format='%(refname:short) %(committerdate:relative)' refs/heads/ 2>/dev/null | head -5)
        set -l parts (string split ' ' "$ref")
        set -l name $parts[1]
        set -l time (string join ' ' $parts[2..-1])

        if test "$name" != "$current"
            # Shorten relative time
            set time (string replace ' ago' '' "$time")
            set time (string replace 'minutes' 'm' "$time")
            set time (string replace 'minute' 'm' "$time")
            set time (string replace 'hours' 'h' "$time")
            set time (string replace 'hour' 'h' "$time")
            set time (string replace 'days' 'd' "$time")
            set time (string replace 'day' 'd' "$time")
            set time (string replace 'weeks' 'w' "$time")
            set time (string replace 'week' 'w' "$time")
            set time (string replace ' ' '' "$time")
            set -a branches "$name ($time)"
        end
    end

    if test (count $branches) -gt 0
        set_color brblack
        echo "Recent: "(string join " | " $branches[1..3])
        set_color normal
        echo
    end
end

function _git_railway
    # Render horizontal railway graph
    set -l branch (command git branch --show-current 2>/dev/null)
    set -l upstream (command git rev-parse --abbrev-ref '@{upstream}' 2>/dev/null)
    set -l ahead 0
    set -l behind 0

    if test -n "$upstream"
        set -l counts (command git rev-list --left-right --count HEAD...'@{upstream}' 2>/dev/null | string split \t)
        if test (count $counts) -ge 2
            set ahead $counts[1]
            set behind $counts[2]
        end
        set upstream (string replace -r '^[^/]+/' '' "$upstream")
    end

    # Trunk handling
    if _git_is_trunk
        set -l last_hash (command git log -1 --format='%h' 2>/dev/null)
        set -l last_msg (command git log -1 --format='%s' 2>/dev/null)
        set -l last_time (command git log -1 --format='%cr' 2>/dev/null | string replace ' ago' '')

        # Truncate message
        if test (string length "$last_msg") -gt 40
            set last_msg (string sub -l 37 "$last_msg")"..."
        end

        # If synced with remote, show simple viz (no remote label needed)
        if test $ahead -eq 0 -a $behind -eq 0
            set -l base_len (string length "$branch ──")

            # Zen history mode: show recent commits when synced (default, env var to disable)
            if test -z "$GIT_DASHBOARD_NO_HISTORY"
                # Show recent commit history as compact vertical list
                set -l recent_count 5
                set -l commits (command git log -$recent_count --format='%h|%s|%cr' 2>/dev/null)

                echo
                set_color cyan
                echo $branch
                set_color brblack

                set -l total (count $commits)
                set -l idx 0
                for commit in $commits
                    set idx (math $idx + 1)
                    set -l parts (string split '|' $commit)
                    set -l c_hash $parts[1]
                    set -l c_msg $parts[2]
                    set -l c_time (string replace ' ago' '' $parts[3])

                    # Railway connector
                    set -l connector (test $idx -lt $total && echo "├─●" || echo "└─●")

                    # Parse conventional commit: type(scope): message
                    set -l cc_match (string match -r '^([a-z]+)(\(([^)]+)\))?:\s*(.*)$' $c_msg)
                    if test (count $cc_match) -ge 2
                        set -l c_type $cc_match[2]
                        set -l c_scope $cc_match[4]
                        set -l c_title $cc_match[5]

                        # Pad type to 8 chars, scope to 8 chars
                        set -l type_pad (string pad -r -w 8 $c_type)
                        set -l scope_pad (string pad -r -w 8 $c_scope)

                        # Truncate title
                        if test (string length "$c_title") -gt 25
                            set c_title (string sub -l 22 "$c_title")"..."
                        end
                        set -l title_pad (string pad -r -w 25 $c_title)

                        printf "  %s %s %s %s  %s %s\n" $connector $type_pad $scope_pad $title_pad $c_hash $c_time
                    else
                        # Non-conventional commit, show as-is
                        if test (string length "$c_msg") -gt 35
                            set c_msg (string sub -l 32 "$c_msg")"..."
                        end
                        echo "  $connector $c_msg  $c_hash $c_time"
                    end
                end
                set_color normal
                return
            end

            # Default: show just the latest commit
            set -l main_line "$branch ──●"
            set -l commit_line (string repeat -n $base_len " ")"└─ $last_msg"
            set -l meta_line (string repeat -n (math $base_len + 3) " ")"$last_hash $last_time"

            echo
            set_color cyan
            echo $main_line
            set_color brblack
            echo $commit_line
            echo $meta_line
            set_color normal
            return
        end

        # Diverged from remote - show railway
        # Only truncate if hiding 2+ commits (otherwise just show all)
        set -l max_dots 5
        set -l ahead_hidden (math "$ahead - $max_dots")
        set -l behind_hidden (math "$behind - $max_dots")
        set -l ahead_truncated (test $ahead_hidden -ge 2 && echo 1 || echo 0)
        set -l behind_truncated (test $behind_hidden -ge 2 && echo 1 || echo 0)
        # If truncating, show max_dots; otherwise show all
        set -l show_ahead (test $ahead_truncated -eq 1 && echo $max_dots || echo $ahead)
        set -l show_behind (test $behind_truncated -eq 1 && echo $max_dots || echo $behind)

        # Case 1: Only behind (need to pull, no local commits)
        if test $ahead -eq 0
            # main ──●──●──● remote
            #        ↑
            #        └─ -2 228b3e5 "feat..." 4m
            set -l main_line "$branch ──●"
            if test $behind_truncated -eq 1
                set main_line $main_line"──⋮$behind_hidden"
            end
            if test $show_behind -gt 0
                for i in (seq 1 $show_behind)
                    set main_line $main_line"──●"
                end
            end
            set -l main_line_no_remote $main_line
            set main_line $main_line" "

            set -l base_len (string length "$branch ──")
            set -l count_len (string length "$behind")
            set -l pointer_line (string repeat -n $base_len " ")"↑"
            set -l commit_line (string repeat -n $base_len " ")"└─ $behind $last_msg"
            # Align meta with start of message (after count)
            set -l meta_indent (math $base_len + 4 + $count_len)
            set -l meta_line (string repeat -n $meta_indent " ")"$last_hash $last_time"

            echo
            set_color cyan
            printf "%s" $main_line
            set_color brblack
            printf "remote\n"
            echo $pointer_line
            echo $commit_line
            echo $meta_line
            set_color normal
            return
        end

        # Case 2: Only ahead (remote hasn't moved)
        if test $behind -eq 0
            # main ──●──●──●──●──●
            #        ↑           └─ +5 228b3e5 "feat..." 4m
            #        remote
            set -l main_line "$branch ──●"
            if test $ahead_truncated -eq 1
                set main_line $main_line"──⋮$ahead_hidden"
            end
            if test $show_ahead -gt 0
                for i in (seq 1 $show_ahead)
                    set main_line $main_line"──●"
                end
            end

            set -l base_len (string length "$branch ──")
            set -l main_len (string length "$main_line")
            set -l count_len (string length "$ahead")
            set -l commit_line (string repeat -n $base_len " ")"↑"(string repeat -n (math $main_len - $base_len - 1) " ")"└─ $ahead $last_msg"
            # Align meta with start of message (after count)
            set -l meta_indent (math $main_len + 4 + $count_len)
            set -l meta_line (string repeat -n $meta_indent " ")"$last_hash $last_time"
            set -l remote_line (string repeat -n $base_len " ")"remote"

            echo
            set_color cyan
            echo $main_line
            set_color brblack
            echo $commit_line
            echo $meta_line
            set_color brblack
            echo $remote_line
            set_color normal
            return
        end

        # Case 3: Diverged (both ahead and behind)
        # main ──●──┬──● -1 remote
        #           └──●──●──●──●──●
        #                         └─ +5 228b3e5 "feat..." 4m
        set -l main_line "$branch ──●──┬"
        if test $behind_truncated -eq 1
            set main_line $main_line"──⋮$behind_hidden"
        end
        if test $show_behind -gt 0
            for i in (seq 1 $show_behind)
                set main_line $main_line"──●"
            end
        end
        set main_line $main_line" $behind "

        set -l fork_pos (string length "$branch ──●──")
        set -l local_line (string repeat -n $fork_pos " ")"└"
        if test $ahead_truncated -eq 1
            set local_line $local_line"──⋮$ahead_hidden"
        end
        if test $show_ahead -gt 0
            for i in (seq 1 $show_ahead)
                set local_line $local_line"──●"
            end
        end

        set -l local_len (string length "$local_line")
        set -l count_len (string length "$ahead")
        set -l commit_line (string repeat -n (math $local_len - 1) " ")"└─ $ahead $last_msg"
        # Align meta with start of message (after count)
        set -l meta_indent (math $local_len + 3 + $count_len)
        set -l meta_line (string repeat -n $meta_indent " ")"$last_hash $last_time"

        echo
        set_color cyan
        printf "%s" $main_line
        set_color brblack
        printf "remote\n"
        echo $local_line
        echo $commit_line
        echo $meta_line
        set_color normal
        return
    end

    # Find merge base with main/master
    set -l trunk "main"
    if not command git rev-parse --verify main >/dev/null 2>&1
        set trunk "master"
    end

    set -l merge_base (command git merge-base HEAD $trunk 2>/dev/null)
    if test -z "$merge_base"
        # No merge base found, just show simple status
        return
    end

    # Count commits on current branch since merge base
    set -l branch_commits (command git rev-list --count $merge_base..HEAD 2>/dev/null)
    # Count commits on trunk since merge base
    set -l trunk_commits (command git rev-list --count $merge_base..$trunk 2>/dev/null)

    # Get last commit info
    set -l last_hash (command git log -1 --format='%h' 2>/dev/null)
    set -l last_msg (command git log -1 --format='%s' 2>/dev/null)
    set -l last_time (command git log -1 --format='%cr' 2>/dev/null | string replace ' ago' '')

    # Truncate message
    if test (string length "$last_msg") -gt 30
        set last_msg (string sub -l 27 "$last_msg")"..."
    end

    # Calculate display widths
    set -l max_commits 8
    set -l show_branch_commits (math "min($branch_commits, $max_commits)")
    set -l show_trunk_commits (math "min($trunk_commits, 3)")
    set -l truncated (test $branch_commits -gt $max_commits && echo 1 || echo 0)

    # Build the railway lines
    # Line 1: trunk
    set -l trunk_line "$trunk ──●──"
    if test $trunk_commits -gt 0
        set trunk_line $trunk_line"┬"
        if test $show_trunk_commits -gt 0
            for i in (seq 1 $show_trunk_commits)
                set trunk_line $trunk_line"──●"
            end
        end
    else
        set trunk_line $trunk_line"┐"
    end

    # Line 2: branch commits
    # Pattern: └──●──●──● (dots are commits, dashes connect them)
    set -l branch_line "          └"
    if test $show_branch_commits -gt 0
        if test $truncated -eq 1
            set branch_line $branch_line"──●──⋮"
        end
        for i in (seq 1 $show_branch_commits)
            set branch_line $branch_line"──●"
        end
    else
        # No commits yet on branch, show the branch point only
        set branch_line $branch_line"──●"
    end

    # Calculate positions
    set -l branch_len (string length "$branch_line")
    set -l branch_point 10  # Position of └ in branch line

    # Line 3: dual connector - from branch point and to last commit
    set -l connector_line (string repeat -n $branch_point " ")"│"(string repeat -n (math $branch_len - $branch_point - 2) " ")"│"

    # Line 4: commit info with connector back to branch point
    set -l commit_line (string repeat -n $branch_point " ")"│"(string repeat -n (math $branch_len - $branch_point - 2) " ")"└─ $last_msg"
    set -l meta_line (string repeat -n $branch_point " ")"│"(string repeat -n (math $branch_len - $branch_point + 1) " ")"$last_hash $last_time"

    # Line 5: branch name line from branch point
    set -l branch_display (string repeat -n $branch_point " ")"└"
    set -l dashes (string repeat -n (math $branch_len - $branch_point - 1) "─")
    set branch_display $branch_display$dashes"── "

    # Add upstream status
    set -l status_parts
    if test $ahead -gt 0
        set -a status_parts "↑$ahead"
    end
    if test $behind -gt 0
        set -a status_parts "↓$behind"
    end

    set -l upstream_display ""
    if test -n "$upstream"
        set upstream_display " "(string join " " $status_parts)" $upstream"
    end

    # Print the railway
    echo
    set_color brblack
    echo $trunk_line
    echo $branch_line
    echo $connector_line
    echo $commit_line
    echo $meta_line
    set_color cyan
    printf "%s%s" $branch_display $branch
    set_color yellow
    printf "%s\n" $upstream_display
    set_color normal
end

function _git_dashboard
    if not _git_is_repo
        echo "Not a git repository"
        return 1
    end

    echo

    set -l status_output (command git status --porcelain 2>/dev/null)

    if test -n "$status_output"
        # Dirty mode: files first, then railway
        _git_file_status
        _git_railway
    else
        # Clean mode: recent branches, then railway
        _git_recent_branches
        _git_railway
    end
end

set --export GITHUB_HANDLE jasonkuhrt

# Node package managers
# pnpm manages node versions; npm globals go to fixed location
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
