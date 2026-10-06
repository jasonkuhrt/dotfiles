function claude-account --description 'Claude Code as account N: own login in ~/.claude-N, setup and history shared with ~/.claude'
    set -l n $argv[1]
    if not string match -qr '^[1-9]$' -- $n
        echo 'usage: claude-account <1-9> [claude args...]' >&2
        return 2
    end

    # Account 2 is the default login, the one plain `claude` uses in ~/.claude.
    if test $n = 2
        env -u CLAUDE_CONFIG_DIR claude $argv[2..]
        return
    end

    set -l base $HOME/.claude
    set -l dir $HOME/.claude-$n
    mkdir -p $dir

    # Shared with ~/.claude by symlink: the setup, then what a resumed session reads.
    # Anything not listed (login, .claude.json, daemon, caches) stays per account.
    for name in settings.json keybindings.json CLAUDE.md skills skills-library commands agents checks scripts statusline.sh plugins \
        projects history.jsonl file-history tasks todos plans paste-cache session-env
        test -e $base/$name; or continue
        test -L $dir/$name; and continue
        if test -e $dir/$name
            echo "claude-account: $dir/$name is a real file, not a link to $base/$name; leaving it alone" >&2
            continue
        end
        ln -s $base/$name $dir/$name
    end

    # .claude.json holds the account identity, so it cannot be linked. Seed it once
    # with project trust, then keep the user-scope MCP servers in step with ~/.claude.json.
    set -l global $HOME/.claude.json
    set -l config $dir/.claude.json
    set -l next
    if not test -e $config
        set next (jq '{mcpServers: (.mcpServers // {}), projects: (.projects // {}), hasCompletedOnboarding, lastOnboardingVersion} | with_entries(select(.value != null))' $global | string collect)
    else
        set -l wanted (jq -cS '.mcpServers // {}' $global | string collect)
        set -l actual (jq -cS '.mcpServers // {}' $config | string collect)
        if test -n "$wanted" -a "$wanted" != "$actual"
            set next (jq --slurpfile global $global '.mcpServers = ($global[0].mcpServers // {})' $config | string collect)
        end
    end
    if test -n "$next"
        install -m 600 /dev/null $config.tmp
        and printf '%s\n' $next >$config.tmp
        and mv $config.tmp $config
    end

    env CLAUDE_CONFIG_DIR=$dir claude $argv[2..]
end
