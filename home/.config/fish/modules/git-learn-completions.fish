function __dotfiles_git_learn_topics --description "Topics for git learn and git cheat"
    printf '%s\n' \
        'overview\tOld habits -> modern replacements' \
        'switch\tBranch switching and file restore' \
        'force\tSafe history rewrite pushes' \
        'fixup\tFixup commits and autosquash rebases' \
        'stack\tStacked branches and range-diff' \
        'worktree\tParallel work without stash churn' \
        'conflict\tConflict resolution and rerere' \
        'undo\tSafe undo patterns' \
        'config\tCurrent config and next upgrades' \
        'all\tPrint every topic'
end

complete -c git -n '__fish_git_needs_command' -f -a 'learn' -d 'Learn modern Git workflows'
complete -c git -n '__fish_git_needs_command' -f -a 'cheat' -d 'Cheat sheet for modern Git workflows'
complete -c git -n '__fish_git_using_command learn cheat' -f -a '(__dotfiles_git_learn_topics)'

complete -c git-learn -f -a '(__dotfiles_git_learn_topics)'
complete -c git-cheat -f -a '(__dotfiles_git_learn_topics)'
