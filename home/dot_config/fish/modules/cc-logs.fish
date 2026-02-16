# hb-logs: Open the latest Claude Code background task output in lnav
#
# CC writes background task output to:
#   /private/tmp/claude-<uid>/-<mangled-project-path>/tasks/<hash>.output
#
# This function finds the latest .output file for the current project
# and opens it in lnav for live tailing with search/filter/SQL.

function hb-logs --description "Open latest CC task output in lnav"
    set -l uid (id -u)
    set -l project_dir (pwd | string replace -a '/' '-')
    set -l tasks_dir "/private/tmp/claude-$uid/$project_dir/tasks"

    if not test -d "$tasks_dir"
        echo "No CC task directory found for this project"
        echo "  Expected: $tasks_dir"
        echo "  (Run a background task in CC first)"
        return 1
    end

    set -l outputs (ls -t "$tasks_dir"/*.output 2>/dev/null)

    if test (count $outputs) -eq 0
        echo "No task output files found in $tasks_dir"
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
    set -l uid (id -u)
    set -l project_dir (pwd | string replace -a '/' '-')
    set -l tasks_dir "/private/tmp/claude-$uid/$project_dir/tasks"

    if not test -d "$tasks_dir"
        echo "No CC task directory found" >&2
        return 1
    end

    set -l outputs (ls -t "$tasks_dir"/*.output 2>/dev/null)
    if test (count $outputs) -eq 0
        echo "No output files found" >&2
        return 1
    end

    # Print the path (no lnav, just the path for piping/copying)
    echo $outputs[1]
end
