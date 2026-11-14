function claudex --description 'Claude Code harness on GPT-6.1 Terra at max effort via CLIProxyAPI (brew services start cliproxyapi)' --wraps claude
    env ANTHROPIC_BASE_URL=http://127.0.0.1:8317 \
        ANTHROPIC_AUTH_TOKEN=(cat ~/.cli-proxy-api/client.key) \
        CLAUDE_CODE_SUBAGENT_MODEL=gpt-6.1-terra \
        CLAUDE_CODE_SUBAGENT_EFFORT=max \
        CLAUDEX_WORKER=1 \
        CLAUDE_CODE_ALWAYS_ENABLE_EFFORT=1 \
        CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY=3 \
        ENABLE_TOOL_SEARCH=false \
        claude --model gpt-6.1-terra --effort max $argv
end
