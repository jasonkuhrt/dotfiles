import type * as $Members from './members.js'

export * as IssueSuggestionType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* **Members:**
* - `team`
* - `project`
* - `assignee`
* - `label`
* - `similarIssue`
* - `relatedIssue`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 6 |
*/
export interface IssueSuggestionType {
kind: "Enum",
name: "IssueSuggestionType",
members: $Members.team
| $Members.project
| $Members.assignee
| $Members.label
| $Members.similarIssue
| $Members.relatedIssue
}