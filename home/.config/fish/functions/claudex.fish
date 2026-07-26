function claudex --description 'Claude Code harness on GPT-5.6 Sol via CLIProxyAPI (brew services start cliproxyapi)' --wraps claude
    env ANTHROPIC_BASE_URL=http://127.0.0.1:8317 \
        ANTHROPIC_AUTH_TOKEN=(cat ~/.cli-proxy-api/client.key) \
        CLAUDE_CODE_SUBAGENT_MODEL=gpt-5.6-sol \
        CLAUDEX_WORKER=1 \
        CLAUDE_CODE_ALWAYS_ENABLE_EFFORT=1 \
        CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY=3 \
        ENABLE_TOOL_SEARCH=false \
        claude --model gpt-5.6-sol $argv
end
