# dprint Design

## CC Misconception: "dprint is project-local only"

This is wrong. dprint supports ancestor directory lookup, global fallback config, and explicit path config. The misconception arises because most formatters (prettier, eslint) require per-project configuration, leading CC to assume dprint works the same way. The Config Resolution section in SKILL.md corrects this directly.
