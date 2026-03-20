#!/usr/bin/env bash
# PreToolUse hook for AskUserQuestion.
# Blocks permission-like questions (yes/no, proceed/cancel) so the user
# never sees them — Claude proceeds with the affirmative option.
# Genuine questions (substantive choices) pass through to the user.
#
# Output format: hookSpecificOutput with permissionDecision per
# https://code.claude.com/docs/en/hooks#pretooluse-decision-control
#
# Known issues this hook navigates:
#   - AskUserQuestion triggers PermissionRequest (anthropics/claude-code#15400)
#   - PreToolUse updatedInput corrupts AskUserQuestion (anthropics/claude-code#29547)
#     → We never return updatedInput, avoiding this entirely.
#   - permissionDecision:"deny" was ignored in older versions (#4669, fixed Jan 2026)
#     → If deny stops working, switch to exit 2 + stderr (see FALLBACK below).

set -euo pipefail

python3 -c '
import json, sys, re

data = json.load(sys.stdin)
questions = data.get("tool_input", {}).get("questions", [])

if not questions:
    print("{}")
    sys.exit(0)

AFFIRM = re.compile(r"^(proceed|continue|go\s*ahead|confirm|approve|create\s*it|ok|sure|do\s*it|accept|allow)\b", re.I)
NEGATE = re.compile(r"^(no|cancel|skip|stop|abort|deny|decline|don.t|do\s*not|reject|nevermind|never\s*mind)\b", re.I)
PERM_Q = re.compile(r"^(do you want|should i|shall i|would you like me to|can i|may i|want me to|is it ok|are you ok|ready to|would you like to)\b", re.I)

is_permission_like = False

for q in questions:
    labels = [o.get("label", "").strip() for o in q.get("options", [])]
    labels_lower = [l.lower() for l in labels]
    qt = q.get("question", "").strip()

    # Tier 1: Any option starts with "yes"
    if any(l.startswith("yes") for l in labels_lower):
        is_permission_like = True
        break

    # Tier 2: Affirmative + negative option pair
    has_affirm = any(AFFIRM.match(l) for l in labels)
    has_negate = any(NEGATE.match(l) for l in labels)
    if has_affirm and has_negate:
        is_permission_like = True
        break

    # Tier 3: Permission-seeking question text + binary options
    if PERM_Q.match(qt) and len(labels) <= 2:
        is_permission_like = True
        break

if is_permission_like:
    # DENY: permissionDecisionReason goes to Claude (not user) for deny decisions.
    # See: https://code.claude.com/docs/en/hooks#pretooluse-decision-control
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": (
                "Auto-approved by the user\u0027s preference hook. "
                "The user does not want to see permission-like yes/no questions. "
                "Proceed as if the user selected the first affirmative option. "
                "Do not re-ask this question or any rephrasing of it."
            )
        }
    }))
else:
    # ALLOW: let the tool execute so the user sees the elicitation UI.
    # No updatedInput — never modify AskUserQuestion input (see #29547).
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "allow"
        }
    }))
' <<< "$(cat)"

# FALLBACK (if deny stops working in a future version):
# Replace the deny branch above with:
#   print("...", file=sys.stderr)
#   sys.exit(2)
# Exit code 2 blocks the tool and feeds stderr to Claude.
