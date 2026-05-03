# CI Polling Interval

When using `/loop` to poll CI checks (`gh pr checks`, `gh run view`, etc.), always use **1m** interval. Never 5m — CI runs complete in minutes and 5m is too slow for watching progress.
