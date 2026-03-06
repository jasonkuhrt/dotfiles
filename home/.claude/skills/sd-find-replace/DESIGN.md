# sd Find Replace Design

## Why Rust regex (RE2-style)

Guaranteed O(m*n) time complexity -- no catastrophic backtracking, no ReDoS vulnerabilities. If a pattern compiles, it runs fast.
