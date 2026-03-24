function git-auto-fetch --description "Toggle git auto-fetch for this repo"
    command git rev-parse --is-inside-work-tree &>/dev/null
    or begin
        echo "Not a git repository"
        return 1
    end

    set -l guard (command git rev-parse --git-dir)/NO_AUTO_FETCH

    if test -f "$guard"
        command rm "$guard"
        echo "git-auto-fetch: enabled (this repo)"
    else
        command touch "$guard"
        echo "git-auto-fetch: disabled (this repo)"
    end
end
