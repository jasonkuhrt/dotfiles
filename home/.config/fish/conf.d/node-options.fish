# Silence Node's experimental-feature warnings (Vite+ loads `node:sqlite`) in every process this shell starts.
if not string match -q -- '*--disable-warning=ExperimentalWarning*' "$NODE_OPTIONS"
    set -gx NODE_OPTIONS (string join ' ' -- $NODE_OPTIONS --disable-warning=ExperimentalWarning)
end
