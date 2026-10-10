function claude-default --description 'Show or set the account plain `claude` runs: claude-default [1-9|auto]'
    if not set -q argv[1]
        # Unset means account 2, the login the binary uses on its own in ~/.claude.
        set -q claude_default_account; or set -l claude_default_account 2
        echo $claude_default_account
        return
    end

    # auto leaves the choice to each launch: the account to finish next (see claude).
    if not string match -qr '^([1-9]|auto)$' -- $argv[1]
        echo 'usage: claude-default [1-9|auto]' >&2
        return 2
    end

    # Universal, so every open shell follows the flip at once.
    set -U claude_default_account $argv[1]
end
