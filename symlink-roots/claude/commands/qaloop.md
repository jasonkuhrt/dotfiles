---
description: Run structured Q&A loop within current or selected role
---

# Q&A Loop

## Goal

* Run a structured question-and-answer workflow
* Work within the context of a specific role
* Systematically gather information needed for the role's outputs

## Usage

* `/qaloop` - Start Q&A loop within current role, or select a role if none is active

## Instructions

1. __Check for active role__:
   * Review the conversation history to determine if a role is currently active
   * A role is active if `/role-pm-architect` or `/role-tech-lead` was recently invoked
   * If unsure, assume no role is active

2. __If NO role is active__:
   * Ask the user which role to use:
     * PM/Architect (`/role-pm-architect`) - for product definition and architectural design
     * Tech Lead (`/role-tech-lead`) - for implementation planning
   * Wait for user selection
   * Once selected, activate that role and proceed to Q&A loop

3. __If role IS active__:
   * Proceed directly to Q&A loop using the current role's context

4. __Run Q&A loop__:
   * Based on the active role, ask systematic questions to gather information
   * For PM/Architect role, focus on:
     * User journeys and use cases
     * Failure states and edge cases
     * Database schema design (if applicable)
     * External API interactions (if applicable)
   * For Tech Lead role, focus on:
     * Understanding the spec/requirements
     * Technical approach and architecture
     * Implementation steps and commit plan
     * Potential refactoring needs
   * Ask one question at a time
   * Wait for user response before asking next question
   * Adapt follow-up questions based on answers
   * Continue until sufficient information is gathered

5. __Complete the loop__:
   * Summarize gathered information
   * Confirm with user if anything is missing
   * Proceed to create output document as defined by the role

## Notes

* Stay in character for the active role throughout the Q&A loop
* Ask specific, targeted questions - avoid vague or open-ended queries
* Adapt questions based on previous answers
* If user doesn't know an answer, mark it as TBD and continue
