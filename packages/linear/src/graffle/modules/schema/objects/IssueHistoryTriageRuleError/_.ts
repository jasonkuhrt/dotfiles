import type * as $Fields from './fields.js'

export * as IssueHistoryTriageRuleError from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An error that occurred during triage rule execution.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 6 |
*/
export interface IssueHistoryTriageRuleError {
kind: "Object",
name: "IssueHistoryTriageRuleError",
fields: {
__typename: $Fields.__typename,
type: $Fields.type,
property: $Fields.property,
conflictForSameChildLabel: $Fields.conflictForSameChildLabel,
fromTeam: $Fields.fromTeam,
toTeam: $Fields.toTeam,
conflictingLabels: $Fields.conflictingLabels
}
}