# Git Dashboard
# =============
# Context-aware git status with railway graph visualization
# See GIT_DASHBOARD_DESIGN.md for design documentation

function git --wraps git --description "git with no args shows dashboard"
    if test (count $argv) -eq 0
        _git_dashboard
    else
        command git $argv
    end
end

function _git_is_repo
    command git rev-parse --git-dir >/dev/null 2>&1
end

function _git_trunk_branch
    # Get trunk from remote HEAD, fall back to main/master
    set -l remote_head (command git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | string replace 'refs/remotes/origin/' '')
    if test -n "$remote_head"
        echo $remote_head
        return
    end
    # Fallback
    if command git rev-parse --verify main >/dev/null 2>&1
        echo "main"
    else if command git rev-parse --verify master >/dev/null 2>&1
        echo "master"
    end
end

function _git_is_trunk
    set -l branch (command git branch --show-current 2>/dev/null)
    set -l trunk (_git_trunk_branch)
    test "$branch" = "$trunk"
end

function _git_shorten_time -a time_str
    # Shorten relative time string (e.g., "2 hours ago" -> "2h")
    set time_str (string replace ' ago' '' "$time_str")
    set time_str (string replace 'seconds' 's' "$time_str")
    set time_str (string replace 'second' 's' "$time_str")
    set time_str (string replace 'minutes' 'm' "$time_str")
    set time_str (string replace 'minute' 'm' "$time_str")
    set time_str (string replace 'hours' 'h' "$time_str")
    set time_str (string replace 'hour' 'h' "$time_str")
    set time_str (string replace 'days' 'd' "$time_str")
    set time_str (string replace 'day' 'd' "$time_str")
    set time_str (string replace 'weeks' 'w' "$time_str")
    set time_str (string replace 'week' 'w' "$time_str")
    set time_str (string replace 'months' 'mo' "$time_str")
    set time_str (string replace 'month' 'mo' "$time_str")
    set time_str (string replace ' ' '' "$time_str")
    echo $time_str
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
                    set -a staged_files "A $file"
                case D
                    set -a staged_files "D $file"
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
                    set -a unstaged_files "D $file"
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

    # Trunk handling - unified vertical history with remote marker
    if _git_is_trunk
        # Remote position: if ahead > 0, remote is at commit index (ahead + 1)
        # This marks the fork point; if also behind, remote has moved further
        set -l remote_at 0
        if test $ahead -gt 0
            set remote_at (math $ahead + 1)
        end

        set -l recent_count 5
        set -l commits (command git log -$recent_count --format='%h|%s|%cr' 2>/dev/null)
        set -l total (count $commits)

        set_color normal
        # Show branch name with behind indicator if needed
        if test $behind -gt 0
            printf "%s " $branch
            set_color red
            printf "↓%d" $behind
            set_color normal
        else
            echo $branch
        end

        set -l idx 0
        for commit in $commits
            set idx (math $idx + 1)
            set -l parts (string split '|' $commit)
            set -l c_hash $parts[1]
            set -l c_msg $parts[2]
            set -l c_time (_git_shorten_time $parts[3])

            # Determine node style and color
            set -l is_remote (test $idx -eq $remote_at && echo 1 || echo 0)
            set -l is_last (test $idx -eq $total && echo 1 || echo 0)
            set -l connector_char (test $is_last -eq 1 && echo "└─" || echo "├─")

            # First commit is current (not dim), remote marker is red, rest are dim
            if test $is_remote -eq 1
                set_color red
                set -l node "◉"
                printf "  %s%s " $connector_char $node
            else if test $idx -eq 1
                set_color normal
                printf "  %s● " $connector_char
            else
                set_color brblack
                printf "  %s● " $connector_char
            end

            # Parse conventional commit: type(scope): message
            set -l cc_match (string match -r '^([a-z]+)(\(([^)]+)\))?:\s*(.*)$' $c_msg)
            if test (count $cc_match) -ge 3
                set -l c_type $cc_match[2]
                set -l c_scope ""
                set -l c_title ""
                # Fish skips missing optional groups, so count varies
                if test (count $cc_match) -eq 5
                    # With scope: type, (scope), scope, title
                    set c_scope $cc_match[4]
                    set c_title $cc_match[5]
                else if test (count $cc_match) -eq 3
                    # Without scope: type, title
                    set c_title $cc_match[3]
                end

                # Pad type to 8 chars (longest: refactor), scope to 6 chars
                set -l type_pad (string pad -r -w 8 $c_type)
                set -l scope_pad (string pad -r -w 6 $c_scope)

                # Truncate and pad title to 25 chars
                if test (string length "$c_title") -gt 25
                    set c_title (string sub -l 22 "$c_title")"..."
                end
                set -l title_pad (string pad -r -w 25 $c_title)

                printf "%s %s %s  %s %s" $type_pad $scope_pad $title_pad $c_hash $c_time
                # Add remote label on same line if this is remote position
                if test $is_remote -eq 1
                    set_color brblack
                    printf " ← remote"
                end
                printf "\n"
            else
                # Non-conventional commit, show as-is
                if test (string length "$c_msg") -gt 35
                    set c_msg (string sub -l 32 "$c_msg")"..."
                end
                printf "%s  %s %s" $c_msg $c_hash $c_time
                if test $is_remote -eq 1
                    set_color brblack
                    printf " ← remote"
                end
                printf "\n"
            end
        end
        set_color normal
        echo
        return
    end

    # Feature branch mode - vertical layout with fork visualization
    set -l trunk (_git_trunk_branch)

    set -l merge_base (command git merge-base HEAD $trunk 2>/dev/null)

    # Get branch commits since fork (or all if no merge base)
    set -l branch_commit_list
    if test -n "$merge_base"
        set branch_commit_list (command git log $merge_base..HEAD --format='%h|%s|%cr' 2>/dev/null)
    else
        # No merge base - just show recent commits
        set branch_commit_list (command git log -5 --format='%h|%s|%cr' 2>/dev/null)
    end

    # Get trunk commits since fork (for divergence detection)
    set -l trunk_commits_since_fork 0
    if test -n "$merge_base"
        set trunk_commits_since_fork (command git rev-list --count $merge_base..$trunk 2>/dev/null)
    end

    # Get stem commits (history before fork, max 3)
    set -l stem_commits
    if test -n "$merge_base"
        set stem_commits (command git log $merge_base~3..$merge_base --format='%h' 2>/dev/null | head -3)
    end

    # Get fork time
    set -l fork_time ""
    if test -n "$merge_base"
        set fork_time (_git_shorten_time (command git log -1 --format='%cr' $merge_base 2>/dev/null))
    end

    # Build upstream status string
    set -l upstream_status ""
    if test $ahead -gt 0
        set upstream_status "↑$ahead"
    end
    if test $behind -gt 0
        set upstream_status "$upstream_status↓$behind"
    end

    set -l diverged (test $trunk_commits_since_fork -gt 0 && echo 1 || echo 0)
    set -l branch_count (count $branch_commit_list)

    # Header line
    if test $diverged -eq 1
        # Case B: trunk has diverged - show both labels
        set_color brblack
        printf "trunk  "
        set_color normal
        printf "%s" $branch
        if test -n "$upstream_status"
            set_color yellow
            printf " %s" $upstream_status
        end
        printf "\n"
    else
        # Case A: no divergence - just branch label (indented to align with commits)
        printf "       "
        set_color normal
        printf "%s" $branch
        if test -n "$upstream_status"
            set_color yellow
            printf " %s" $upstream_status
        end
        printf "\n"
    end

    # Branch commits (newest first, growing up from fork)
    set -l commit_idx 0
    for commit in $branch_commit_list
        set commit_idx (math $commit_idx + 1)
        set -l parts (string split '|' $commit)
        set -l c_hash $parts[1]
        set -l c_msg $parts[2]
        set -l c_time (_git_shorten_time $parts[3])

        # Parse conventional commit
        set -l cc_match (string match -r '^([a-z]+)(\(([^)]+)\))?:\s*(.*)$' $c_msg)

        # Trunk column (left side)
        if test $diverged -eq 1
            # Show trunk nodes for diverged commits
            if test $commit_idx -le $trunk_commits_since_fork
                set_color brblack
                printf "  ├●   "
            else
                printf "  │    "
            end
        else
            # No divergence - just show stem line
            printf "  │    "
        end

        # Branch commit (right side)
        set_color normal
        printf "├─● "

        if test (count $cc_match) -ge 3
            set -l c_type $cc_match[2]
            set -l c_scope ""
            set -l c_title ""
            # Fish skips missing optional groups, so count varies
            if test (count $cc_match) -eq 5
                set c_scope $cc_match[4]
                set c_title $cc_match[5]
            else if test (count $cc_match) -eq 3
                set c_title $cc_match[3]
            end

            set -l type_pad (string pad -r -w 8 $c_type)
            set -l scope_pad (string pad -r -w 6 $c_scope)

            if test (string length "$c_title") -gt 25
                set c_title (string sub -l 22 "$c_title")"..."
            end
            set -l title_pad (string pad -r -w 25 $c_title)

            printf "%s %s %s  %s %s\n" $type_pad $scope_pad $title_pad $c_hash $c_time
        else
            if test (string length "$c_msg") -gt 40
                set c_msg (string sub -l 37 "$c_msg")"..."
            end
            printf "%s  %s %s\n" $c_msg $c_hash $c_time
        end
    end

    # Fork point connector
    if test $diverged -eq 1
        set_color brblack
        printf "  ├●───┘\n"
    else
        set_color brblack
        printf "  ┌─●─┘\n"
    end

    # Stem (history commits below fork)
    for stem_commit in $stem_commits
        set_color brblack
        printf "  │─●\n"
    end

    # Fork marker
    if test -n "$merge_base"
        echo
        set_color magenta
        printf "  ◆ forked %s\n" $fork_time
    end

    set_color normal
    echo
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
    end
    _git_railway
end
