import type * as $Members from './members.js'

export * as TriageRuleErrorType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The type of error that occurred during triage rule execution.
*
* **Members:**
* - `cycle`
* - `default`
* - `labelGroupConflict`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 3 |
*/
export interface TriageRuleErrorType {
kind: "Enum",
name: "TriageRuleErrorType",
members: $Members.cycle
| $Members.default
| $Members.labelGroupConflict
}