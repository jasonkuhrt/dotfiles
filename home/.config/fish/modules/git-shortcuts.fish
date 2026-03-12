function __dotfiles_git_default_remote --description "Return the preferred remote for the current repo"
    command git rev-parse --is-inside-work-tree >/dev/null 2>&1
    or return 1

    if command git remote get-url origin >/dev/null 2>&1
        printf '%s\n' origin
        return 0
    end

    set -l remote (command git remote 2>/dev/null | head -n 1 | string trim)
    test -n "$remote"
    or return 1

    printf '%s\n' "$remote"
end

function __dotfiles_git_default_branch --description "Resolve the default branch for the current repo"
    command git rev-parse --is-inside-work-tree >/dev/null 2>&1
    or return 1

    if type -q gh
        set -l github_default_branch (command gh repo view --json defaultBranchRef -q '.defaultBranchRef.name' 2>/dev/null | string trim)
        if test -n "$github_default_branch"
            printf '%s\n' "$github_default_branch"
            return 0
        end
    end

    set -l remote (__dotfiles_git_default_remote)
    if test -n "$remote"
        set -l remote_head (command git symbolic-ref --quiet --short "refs/remotes/$remote/HEAD" 2>/dev/null | string replace "$remote/" "" | string trim)
        if test -n "$remote_head"
            printf '%s\n' "$remote_head"
            return 0
        end
    end

    for candidate in main master
        if command git show-ref --verify --quiet "refs/heads/$candidate"
            printf '%s\n' "$candidate"
            return 0
        end

        if test -n "$remote"; and command git show-ref --verify --quiet "refs/remotes/$remote/$candidate"
            printf '%s\n' "$candidate"
            return 0
        end
    end

    return 1
end

function __dotfiles_gco_checkoutable_branches --description "List branch targets that gco can switch to"
    command git rev-parse --is-inside-work-tree >/dev/null 2>&1
    or return 0

    set -l local_branch_refs (command git for-each-ref --format='%(refname:strip=2)%09Local Branch' --sort=-committerdate refs/heads 2>/dev/null)
    set -l local_branch_names

    for ref in $local_branch_refs
        printf '%s\n' "$ref"
        set -l parts (string split \t -- "$ref")
        if test (count $parts) -ge 1
            set -a local_branch_names "$parts[1]"
        end
    end

    set -l seen_unique_remote_names
    set -l duplicate_unique_remote_names
    for ref in (command git for-each-ref --format='%(refname:strip=3)' --sort='refname:strip=3' refs/remotes 2>/dev/null | string match -rv '^HEAD$')
        if contains -- "$ref" $seen_unique_remote_names
            if not contains -- "$ref" $duplicate_unique_remote_names
                set -a duplicate_unique_remote_names "$ref"
            end
        else
            set -a seen_unique_remote_names "$ref"
        end
    end

    for ref in $seen_unique_remote_names
        if contains -- "$ref" $duplicate_unique_remote_names
            continue
        end

        if contains -- "$ref" $local_branch_names
            continue
        end

        printf '%s\tUnique Remote Branch\n' "$ref"
    end

    command git for-each-ref --format='%(refname:strip=2)%09Remote Branch' refs/remotes 2>/dev/null \
        | string match -rv '.*/HEAD\tRemote Branch$'
end

function gco --wraps 'git switch' --description "Switch branches, defaulting to the repo default branch"
    command git rev-parse --is-inside-work-tree >/dev/null 2>&1
    or begin
        echo "gco: not inside a git repository" >&2
        return 1
    end

    if test (count $argv) -eq 0
        set -l branch (__dotfiles_git_default_branch)
        if test -z "$branch"
            echo "gco: could not resolve the default branch from GitHub or remote HEAD" >&2
            return 1
        end

        command git switch "$branch"
        return $status
    end

    command git switch $argv
end
