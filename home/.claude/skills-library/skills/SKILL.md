---
name: skills
description: >-
  Manage skill library. Routes natural language to skills:change (for on/off/reset/undo)
  or skills:list (for viewing outfit and history). Use when user says "equip", "add skill",
  "remove skill", "what skills do I have", "show available skills", "undo", etc.
allowed-tools:
  - Bash(bun:*)
---

# /skills — Skill Management Router

This is the entry point for managing skills. Based on the user's intent, route to the appropriate sub-skill:

## Sub-skills

- **/skills:change** — All mutations: turn skills on/off, undo/redo changes
  - Use for: "add", "equip", "enable", "remove", "disable", "undo", "redo", "clear all skills", "turn off everything", "reset"

- **/skills:list** — Read-only views: show outfit, history, token budget
  - Use for: "what skills are on", "show my skills", "available skills", "skill cost", "skill history"

- **/skills:doctor** — Health checks (already exists as its own skill)
  - Use for: "check skills", "diagnose", "skill problems"

## Routing Logic

1. If the user wants to **view** or **query** skill state → `/skills:list`
2. If the user wants to **change** skill state → `/skills:change`
3. If ambiguous, ask which they need
