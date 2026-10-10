function claude --description 'Claude Code on the account claude-default names, or on auto the account to finish next: soonest weekly reset with quota left'
    set -l account (claude-default)
    test $account = auto; and set account (__claude_auto_account)
    claude-account $account $argv
end

# Use it or lose it: of the accounts with quota left, the one whose week resets soonest, so
# quota about to expire is spent first. An account at its five-hour or weekly limit is passed
# over until that window resets, and one whose week has not started goes last. With every
# account at a limit the answer is the one whose week resets first.
#
# The figures are the ones cswap-meter collects for CodexBar. claude-swap's aliases carry the
# launcher names, so the row aliased claudeN is account N. A row without trusted figures is
# skipped, and with no figures at all the answer is account 2, the login the binary uses alone.
function __claude_auto_account
    # Unset CLAUDE_CONFIG_DIR so the meter reads what it reads for CodexBar, whatever shell this is.
    set -l pick (env -u CLAUDE_CONFIG_DIR cswap-meter --list --json 2>/dev/null | jq -r '
        [.accounts[] | select(.usage != null and (.alias // "" | test("^claude[1-9]$")))
            | {account: .alias[6:], week: (.usage.sevenDay.pct // 0), countdown: .usage.sevenDay.countdown,
               full: ((.usage.sevenDay.pct // 0) >= 100 or (.usage.fiveHour.pct // 0) >= 100),
               reset: (.usage.sevenDay.resetsAt // "9")}]
        | sort_by([.full, .reset]) | first // empty
        | "\(.account)\tweek \(.week | round)% used" + (if .countdown then ", resets in \(.countdown)" else "" end)
        ' 2>/dev/null | string split \t)
    if not set -q pick[2]
        isatty stderr; and echo 'claude: no usage figures, so account 2' >&2
        echo 2
        return
    end
    isatty stderr; and echo "claude: account $pick[1], $pick[2]" >&2
    echo $pick[1]
end
