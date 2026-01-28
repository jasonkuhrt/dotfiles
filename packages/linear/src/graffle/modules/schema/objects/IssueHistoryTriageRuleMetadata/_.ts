import type * as $Fields from './fields.js'

export * as IssueHistoryTriageRuleMetadata from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Metadata about a triage rule that made changes to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 2 |
*/
export interface IssueHistoryTriageRuleMetadata {
kind: "Object",
name: "IssueHistoryTriageRuleMetadata",
fields: {
__typename: $Fields.__typename,
triageRuleError: $Fields.triageRuleError,
updatedByTriageRule: $Fields.updatedByTriageRule
}
}