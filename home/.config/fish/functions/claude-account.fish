function claude-account --description 'Claude Code as account N: own login in ~/.claude-N, setup and history shared with ~/.claude'
    set -l n $argv[1]
    if not string match -qr '^[1-9]$' -- $n
        echo 'usage: claude-account <1-9> [claude args...]' >&2
        return 2
    end

    # Account 2 is the login in ~/.claude itself, the one the binary uses with no CLAUDE_CONFIG_DIR.
    # `env` here and below runs the binary; a bare `claude` would re-enter the `claude` function.
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

    # .claude.json holds the account identity, so it cannot be linked. Seed it once with
    # project trust; the sync on either side of the run shares its user-scope MCP servers.
    set -l config $dir/.claude.json
    test -e $config; or __claude_account_jq_into $config '{mcpServers: (.mcpServers // {}), projects: (.projects // {}), hasCompletedOnboarding, lastOnboardingVersion} | with_entries(select(.value != null))' $HOME/.claude.json

    __claude_account_sync_mcp $dir
    env CLAUDE_CONFIG_DIR=$dir claude $argv[2..]
    set -l claude_status $status
    __claude_account_sync_mcp $dir
    return $claude_status
end

# User-scope MCP servers sit in .claude.json beside the account identity, so they are merged,
# not linked. ~/.claude.json is the hub and $dir/mcp-synced.json records the list hub and account
# last agreed on. Whatever the account added, changed or removed since then is replayed onto the
# hub's current list, and the result is written to both. A change made under any account therefore
# survives, even when another launch of that account syncs before the session that made it exits.
function __claude_account_sync_mcp --argument-names dir
    set -l hub $HOME/.claude.json
    set -l config $dir/.claude.json
    set -l synced $dir/mcp-synced.json
    test -e $config; or return

    # No record yet: take the account's list as the agreed one, so the hub wins as it did before.
    test -e $synced; or __claude_account_jq_into $synced '.mcpServers // {}' $config; or return

    # `objects` yields nothing for a file that is empty or not a config, which skips the sync
    # instead of reading it as "every server was removed".
    set -l merged (jq -cnS --slurpfile hub $hub --slurpfile account $config --slurpfile synced $synced '
        ($hub[0] | objects | .mcpServers // {}) as $h
        | ($account[0] | objects | .mcpServers // {}) as $a
        | ($synced[0] | objects) as $s
        | $h + ($a | with_entries(select(.value != $s[.key])))
        | del(.[($s | keys) - ($a | keys) | .[]])' | string collect)
    test -n "$merged"; or return

    for file in $hub $config
        set -l current (jq -cS '.mcpServers // {}' $file | string collect)
        test "$merged" = "$current"; or __claude_account_jq_into $file --argjson servers $merged '.mcpServers = $servers' $file
    end
    set -l current (jq -cS . $synced | string collect)
    test "$merged" = "$current"; or __claude_account_jq_into $synced -n --argjson servers $merged '$servers'
end

# Replace $file with jq's output in one rename. mktemp keeps it private to the user: these files
# hold MCP credentials. Empty output never replaces anything.
function __claude_account_jq_into --argument-names file
    set -l tmp (mktemp $file.XXXXXX); or return
    if jq $argv[2..] >$tmp; and test -s $tmp
        mv $tmp $file
    else
        rm -f $tmp
        return 1
    end
end
