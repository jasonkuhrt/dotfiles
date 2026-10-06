function claude1 --description 'Claude Code on account 1 (the default login in ~/.claude)' --wraps claude
    env -u CLAUDE_CONFIG_DIR claude $argv
end
