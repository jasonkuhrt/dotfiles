# Fish completions for git-agent
# Supports both `git-agent <cmd>` and `git agent <cmd>`

# ── Direct invocation: git-agent ──────────────────────────

complete -c git-agent -f # disable file completions

# First-level commands
complete -c git-agent -n 'not __fish_seen_subcommand_from r w on off install uninstall' \
    -a r -d 'Read-only mode (block all writes)'
complete -c git-agent -n 'not __fish_seen_subcommand_from r w on off install uninstall' \
    -a w -d 'Read-write mode (allow all writes)'
complete -c git-agent -n 'not __fish_seen_subcommand_from r w on off install uninstall' \
    -a on -d 'Allow operations'
complete -c git-agent -n 'not __fish_seen_subcommand_from r w on off install uninstall' \
    -a off -d 'Block operations'
complete -c git-agent -n 'not __fish_seen_subcommand_from r w on off install uninstall' \
    -a install -d 'Install hooks and rules'
complete -c git-agent -n 'not __fish_seen_subcommand_from r w on off install uninstall' \
    -a uninstall -d 'Remove all traces'

# Second-level targets for on/off
complete -c git-agent -n '__fish_seen_subcommand_from on off; and not __fish_seen_subcommand_from commit push' \
    -a commit -d 'Control commit access'
complete -c git-agent -n '__fish_seen_subcommand_from on off; and not __fish_seen_subcommand_from commit push' \
    -a push -d 'Control push access'

# ── Git subcommand: git agent ─────────────────────────────

complete -c git -n __fish_git_needs_command -a agent -d 'Control agent git access'

# First-level commands under git agent
complete -c git -n '__fish_git_using_command agent; and not __fish_seen_subcommand_from r w on off install uninstall' \
    -a r -d 'Read-only mode'
complete -c git -n '__fish_git_using_command agent; and not __fish_seen_subcommand_from r w on off install uninstall' \
    -a w -d 'Read-write mode'
complete -c git -n '__fish_git_using_command agent; and not __fish_seen_subcommand_from r w on off install uninstall' \
    -a on -d 'Allow operations'
complete -c git -n '__fish_git_using_command agent; and not __fish_seen_subcommand_from r w on off install uninstall' \
    -a off -d 'Block operations'
complete -c git -n '__fish_git_using_command agent; and not __fish_seen_subcommand_from r w on off install uninstall' \
    -a install -d 'Install hooks'
complete -c git -n '__fish_git_using_command agent; and not __fish_seen_subcommand_from r w on off install uninstall' \
    -a uninstall -d 'Remove hooks'

# Second-level targets for on/off under git agent
complete -c git -n '__fish_git_using_command agent; and __fish_seen_subcommand_from on off; and not __fish_seen_subcommand_from commit push' \
    -a commit -d 'Control commit access'
complete -c git -n '__fish_git_using_command agent; and __fish_seen_subcommand_from on off; and not __fish_seen_subcommand_from commit push' \
    -a push -d 'Control push access'
