---
name: writing-gherkin
description: Use when writing Gherkin scenarios, when another skill (like writing-specs) needs Given/When/Then syntax, or when asked to "create scenarios", "write acceptance criteria". Covers Gherkin DSL syntax, style rules, and validation.
---

# Writing Gherkin

Write precise, well-structured Gherkin specifications for requirements documentation.

## Agent Mode

For multi-scenario features, use Task tool to keep validation loops out of main context:

```
Task tool:
  subagent_type: "general-purpose"
  prompt: |
    Write Gherkin specs for: [feature description]

    Rules: First-person "I" voice, one behavior per scenario, no filler/passive.

    Validate: echo "$GHERKIN" | scripts/validate-all.sh -

    Fix issues and re-validate until pass. Return ONLY final validated Gherkin.
```

The agent handles write-validate-fix iterations internally. Main context receives only final output.

## CRITICAL

### Avoid AI Slop

Common AI mistakes that make Gherkin verbose and imprecise:

| Mistake            | Example                                        | Fix                        |
| ------------------ | ---------------------------------------------- | -------------------------- |
| Filler words       | "Then the user should be able to see"          | "Then I see"               |
| Passive voice      | "Then the message is displayed"                | "Then I see the message"   |
| Over-specification | "Given I am a logged-in user on the home page" | "Given I am on Home"       |
| Future tense       | "Then the system will show"                    | "Then I see"               |
| Generic actors     | "the user", "the system"                       | "I" (first person)         |
| Vague verbs        | "the page updates"                             | "I see [specific element]" |

### One Scenario = One Behavior

Test exactly one behavior per scenario. Avoid multiple behaviors or branching logic.

## Syntax

```gherkin
Feature: <capability name>
  <optional 1-line description>

  Background:
    Given <shared precondition>

  Scenario: <specific behavior>
    Given <initial state>
    When <action>
    Then <observable outcome>

  Scenario Outline: <parameterized behavior>
    Given <state with <placeholder>>
    When <action with <placeholder>>
    Then <outcome with <placeholder>>

    Examples:
      | placeholder | another |
      | value1      | value2  |
```

## Style Rules

### Steps

| Step    | Purpose                     | Verb Tense      |
| ------- | --------------------------- | --------------- |
| Given   | Precondition/state          | Past or present |
| When    | Action                      | Present         |
| Then    | Observable outcome          | Present         |
| And/But | Continue previous step type | Same as parent  |

### Actor Voice

Use first-person "I" consistently:

```gherkin
# Good
Given I am on the DMs page
When I click "New Chat"
Then I see the compose dialog

# Bad
Given the user is on the DMs page
When the user clicks "New Chat"
Then the compose dialog is displayed
```

### Specificity

Specify UI elements and states precisely:

```gherkin
# Good
Then I see 3 unread threads
Then I see "No conversations selected"
Then the filter chip shows "Unread"

# Bad
Then the list updates
Then I see a message
Then the filter is active
```

### Concision

Remove unnecessary words:

```gherkin
# Good
Given I have 5 unread DMs
When I enable the Unread filter
Then I see only unread threads

# Bad
Given that I am a user who has 5 unread direct messages in my inbox
When I click on the filter button and select the Unread option
Then I should be able to see only the threads that are unread
```

## Structure

### Feature

```gherkin
Feature: DM Unread Filter
  Filter DM list to show only unread conversations.
```

- Name: noun phrase describing the capability
- Description: one line, optional

### Background

Use for preconditions shared by ALL scenarios in the feature:

```gherkin
Background:
  Given I am logged in
  And I am on the DMs page
```

### Rule (Gherkin 6+)

Group related scenarios under a business rule. Use when a feature has 5+ scenarios that fall into logical clusters:

```gherkin
Feature: DM Unread Filter
  Filter DM list to show only unread conversations.

  Background:
    Given I am on the DMs page

  Rule: Enabling and clearing filter
    Scenario 1: Enable unread filter
      ...
    Scenario 2: Clear filter via chip
      ...

  Rule: Static snapshot behavior
    Scenario 3: Read thread stays visible
      ...
    Scenario 4: New DM appears in filtered view
      ...

  Rule: State persistence
    Scenario 5: Filter resets on refresh
      ...
```

**When to use:**

| Scenarios | Recommendation                            |
| --------- | ----------------------------------------- |
| 1-4       | Flat structure, no Rules needed           |
| 5-10      | Consider Rules if natural groupings exist |
| 10+       | Strongly recommend Rules for readability  |

**Benefits:**

- Easier discussion: "The 'State persistence' rule needs review"
- Semantic structure aids downstream interpretation (design, impl planning)
- Background still applies to all scenarios across Rules

**Caution:** Only use Rules when genuine semantic groupings exist. Forced or arbitrary groupings reduce clarity rather than improve it.

### Tags

Categorize scenarios for organization or filtering:

```gherkin
@slow @integration
Scenario: Long-running data import
  ...

@wip
Scenario: Feature in progress
  ...
```

Common tags: `@wip`, `@slow`, `@smoke`, `@regression`, `@manual`. Useful for docs organization even without test automation.

### Data Tables

Structured data within steps (different from Scenario Outline Examples):

```gherkin
Given these users exist:
  | name  | email          | role  |
  | Alice | alice@test.com | admin |
  | Bob   | bob@test.com   | guest |
When I import the user list
Then I see 2 users
```

Use for setup data, expected results, or any structured information within a single scenario.

### Doc Strings

Multi-line text or payloads:

```gherkin
When I send the payload:
  """json
  {
    "action": "subscribe",
    "channel": "updates"
  }
  """
Then I receive confirmation
```

The content type hint (e.g., `json`) is optional but aids readability.

### Comments

Inline notes with `#`:

```gherkin
Feature: DM Unread Filter
  # Note: "snapshot" means captured thread IDs at filter enable time

  Scenario 1: Enable filter
    Given I have unread threads
    When I enable the filter
    Then I see only unread threads
    # Edge case: empty state handled in S5
```

### Scenario Naming

Use declarative names describing the behavior, not the test:

```gherkin
# Good
Scenario: Filtering shows only unread threads
Scenario: Reading a thread keeps it visible until refresh

# Bad
Scenario: Test unread filter functionality
Scenario: Verify that when user reads thread it stays in list
```

## Examples

### Simple Feature

```gherkin
Feature: DM Unread Filter
  Filter DM list to show only unread conversations.

  Background:
    Given I am on the DMs page

  Scenario: Enabling filter shows only unread threads
    Given I have 3 unread and 5 read threads
    When I enable the Unread filter
    Then I see 3 threads

  Scenario: Reading a thread keeps it visible
    Given the Unread filter is enabled
    And I see an unread thread "Project update"
    When I open "Project update"
    And I read the thread
    Then I still see "Project update" in the list

  Scenario: Clearing filter shows all threads
    Given the Unread filter is enabled
    When I click the clear filter button
    Then I see all 8 threads
```

### With Scenario Outline

```gherkin
Feature: Voice Note Playback
  Control voice note audio playback.

  Scenario Outline: Playback speed adjustment
    Given I am playing a voice note
    When I tap the speed button <times> times
    Then playback speed is <speed>

    Examples:
      | times | speed |
      | 1     | 1.5x  |
      | 2     | 2x    |
      | 3     | 1x    |
```

## Validation

After writing Gherkin, run validators:

```bash
# 1. Check syntax
echo "$GHERKIN_CONTENT" | scripts/validate-syntax.sh -

# 2. Check AI slop patterns
echo "$GHERKIN_CONTENT" | scripts/check-slop.sh -

# 3. Lint structure and style (uses gherkin-lint)
echo "$GHERKIN_CONTENT" | scripts/lint.sh -
```

| Script               | Checks                                                    |
| -------------------- | --------------------------------------------------------- |
| `validate-syntax.sh` | Valid Gherkin syntax                                      |
| `check-slop.sh`      | AI slop: passive voice, generic actors, filler            |
| `lint.sh`            | Given/When/Then order, use And, scenario size, duplicates |

Fix any flagged issues before presenting output.

## Notes

- Write each scenario to be understandable in isolation
- Never reference other scenarios or features
- Use Background sparingly - only for truly universal preconditions
- Keep tables focused on data-driven scenarios

## Reference

- `writing-specs` skill - spec authoring process, Ubiquitous Language, terminology
