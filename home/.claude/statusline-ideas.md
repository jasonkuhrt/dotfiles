# Statusline Ideas

Future additions for `~/.claude/statusline-command.sh`.

## Unread email count

`notmuch count tag:unread` via the isync/notmuch/himalaya stack. Show as dim `✉3`, silent when 0.

## Next meeting countdown

Query Calendar.app via `icalBuddy` (macOS built-in) or MeetingBar data. Show as `standup 12m`. Silent when no meetings within the next hour.
