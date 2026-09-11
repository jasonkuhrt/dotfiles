# hb-logs: Open the latest Claude Code background task output in lnav
#
# CC writes background task output to:
#   /private/tmp/claude-<uid>/<mangled-project-path>/<session-uuid>/tasks/<hash>.output
#
# The mangling replaces every non-alphanumeric character, '.' included, so
# ~/.codex/worktrees/x/Heartbeat becomes -Users-jasonkuhrt--codex-worktrees-x-Heartbeat.

function __hb_logs_outputs --description "List CC task output files for the current project, newest first"
    set -l uid (id -u)
    set -l project_dir (string replace -ra '[^A-Za-z0-9]' '-' -- $PWD)
    set -l base /private/tmp/claude-$uid/$project_dir

    test -d $base; or return 1

    set -l found (find $base -mindepth 3 -maxdepth 3 -path '*/tasks/*.output' -type f 2>/dev/null)
    test (count $found) -gt 0; or return 1

    ls -t $found
end

function hb-logs --description "Open latest CC task output in lnav"
    set -l outputs (__hb_logs_outputs)

    if test (count $outputs) -eq 0
        echo "No CC task output found for this project"
        echo "  (Run a background task in CC first)"
        return 1
    end

    if test (count $argv) -gt 0
        # Argument given: match against task ID prefix
        set -l match ""
        for f in $outputs
            if string match -q "*$argv[1]*" (basename $f)
                set match $f
                break
            end
        end
        if test -z "$match"
            echo "No output file matching '$argv[1]'"
            echo "Available:"
            for f in $outputs
                echo "  "(basename $f .output)
            end
            return 1
        end
        echo "Opening: $match"
        lnav "$match"
    else
        # No argument: open the most recent output file
        echo "Opening latest: $outputs[1]"
        lnav "$outputs[1]"
    end
end

function hb-logs-path --description "Print CC task output path (for pasting into other tools)"
    set -l outputs (__hb_logs_outputs)

    if test (count $outputs) -eq 0
        echo "No CC task output found for this project" >&2
        return 1
    end

    echo $outputs[1]
end
