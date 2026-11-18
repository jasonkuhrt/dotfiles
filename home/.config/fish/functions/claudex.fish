function claudex --description 'Claude Code on the configured OpenAI worker via CLIProxyAPI' --wraps claude
    set -l worker "$HOME/.agents/openai-worker.json"
    set -l model (jq -er '.model | strings | select(length > 0)' "$worker"); or return 1
    set -l effort (jq -er '.effort | strings | select(length > 0)' "$worker"); or return 1

    env ANTHROPIC_BASE_URL=http://127.0.0.1:8317 \
        ANTHROPIC_AUTH_TOKEN=(cat ~/.cli-proxy-api/client.key) \
        CLAUDE_CODE_SUBAGENT_MODEL="$model" \
        CLAUDE_CODE_SUBAGENT_EFFORT="$effort" \
        CLAUDEX_WORKER=1 \
        CLAUDE_CODE_ALWAYS_ENABLE_EFFORT=1 \
        CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY=3 \
        ENABLE_TOOL_SEARCH=false \
        claude --model "$model" --effort "$effort" $argv
end
