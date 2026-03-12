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

function __dotfiles_git_has_force_push_arg --description "Return true when push args include unsafe force"
    for arg in $argv
        switch "$arg"
            case -f --force
                return 0
        end
    end

    return 1
end

function __dotfiles_git_has_hard_reset_arg --description "Return true when reset args include --hard"
    contains -- --hard $argv
end

function git --wraps git --description "Git wrapper with interactive safety guardrails"
    if test (count $argv) -ge 1
        if status is-interactive; or set -q DOTFILES_GIT_GUARDRAILS_FORCE
            switch "$argv[1]"
                case checkout
                    __dotfiles_git_checkout_guidance $argv[2..-1]
                    return $status
                case push
                    if __dotfiles_git_has_force_push_arg $argv[2..-1]
                        __dotfiles_git_push_force_guidance $argv[2..-1]
                        return $status
                    end
                case reset
                    if __dotfiles_git_has_hard_reset_arg $argv[2..-1]
                        __dotfiles_git_reset_hard_guidance $argv[2..-1]
                        return $status
                    end
            end
        end
    end

    command git $argv
end
