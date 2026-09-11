# Interactive git safety guardrails.
# git.fish runs every interactive invocation through __dotfiles_git_guardrail.
# Blocked commands print a modern alternative and return 2; `command git ...` is
# the escape hatch.

function __dotfiles_git_checkout_guidance --description "Reject interactive git checkout usage with modern replacements"
    set -l args $argv

    echo 'Blocked: `git checkout` is disabled in interactive fish.'
    echo

    if test (count $args) -eq 0
        echo "Use:"
        echo "  branches:   git switch <branch>   or gco <branch>"
        echo "  files:      git restore <path>"
        echo "  detach:     git switch --detach <commit>"
    else
        switch "$args[1]"
            case -b
                echo "Use: git switch -c $args[2..-1]"
            case -B
                echo "Use: git switch -C $args[2..-1]"
            case --detach -d
                echo "Use: git switch --detach $args[2..-1]"
            case --
                echo "Use: git restore $args[2..-1]"
            case .
                echo "Use: git restore ."
            case '*'
                echo "Use:"
                echo "  branch move:  git switch $args"
                echo "  branch move:  gco $args"
                echo "  file restore: git restore $args"
        end
    end

    echo
    echo "Escape hatch: command git checkout ..."
    return 2
end

function __dotfiles_git_push_force_guidance --description "Reject interactive git push --force usage with safer alternative"
    set -l filtered_args
    for arg in $argv
        switch "$arg"
            case -f --force
            case '--*'
                set -a filtered_args "$arg"
            case '-*f*'
                # A short-option cluster such as -fu keeps its other flags.
                set -l other_flags (string replace -a f '' -- "$arg")
                test "$other_flags" != -; and set -a filtered_args "$other_flags"
            case '+*'
                # The lease protects the ref without the forcing plus.
                set -a filtered_args (string sub --start 2 -- "$arg")
            case '*'
                set -a filtered_args "$arg"
        end
    end

    echo 'Blocked: `git push --force` is disabled in interactive fish.'
    echo
    echo "Use:"
    if test (count $filtered_args) -gt 0
        echo "  safe rewrite push: git push --force-with-lease $filtered_args"
        echo "  your alias:        git pf $filtered_args"
    else
        echo "  safe rewrite push: git push --force-with-lease"
        echo "  your alias:        git pf"
    end
    echo
    echo "Escape hatch: command git push --force ..."
    return 2
end

function __dotfiles_git_reset_hard_guidance --description "Reject interactive git reset --hard usage with safer alternatives"
    set -l filtered_args
    for arg in $argv
        if test "$arg" != --hard
            set -a filtered_args "$arg"
        end
    end

    echo 'Blocked: `git reset --hard` is disabled in interactive fish.'
    echo
    echo "Use:"
    echo "  unstage paths:     git restore --staged <path>"
    echo "  discard file edits: git restore <path>"
    echo "  undo commit safely: git reset --soft HEAD~1"
    echo "  recover published work: git revert <commit>"
    echo "  recover lost state: git reflog"
    if test (count $filtered_args) -gt 0
        echo
        echo "Context-preserving alternative:"
        echo "  git reset --soft $filtered_args"
    end
    echo
    echo "Escape hatch: command git reset --hard ..."
    return 2
end

function __dotfiles_git_has_force_push_arg --description "Return true when push args force-update a ref"
    for arg in $argv
        switch "$arg"
            case --force '+*'
                return 0
            case '--*'
                # Long options, including the safe --force-with-lease and --force-if-includes.
            case '-*f*'
                return 0
        end
    end

    return 1
end

function __dotfiles_git_has_hard_reset_arg --description "Return true when reset args include --hard"
    contains -- --hard $argv
end

function __dotfiles_git_guardrail --description "Print guidance and return 2 for a blocked git invocation; return 0 to allow it"
    # Skip global options so `git -C <dir> push --force` still resolves to `push`.
    set -l idx 1
    while test $idx -le (count $argv)
        switch "$argv[$idx]"
            case -C -c --git-dir --work-tree --namespace --config-env --super-prefix
                set idx (math $idx + 2)
            case '-*'
                set idx (math $idx + 1)
            case '*'
                break
        end
    end
    test $idx -le (count $argv); or return 0

    set -l subcommand $argv[$idx]
    set -l rest $argv
    set -e rest[1..$idx]

    switch "$subcommand"
        case checkout
            __dotfiles_git_checkout_guidance $rest
            return $status
        case push
            if __dotfiles_git_has_force_push_arg $rest
                __dotfiles_git_push_force_guidance $rest
                return $status
            end
        case reset
            if __dotfiles_git_has_hard_reset_arg $rest
                __dotfiles_git_reset_hard_guidance $rest
                return $status
            end
    end

    return 0
end
