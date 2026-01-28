import type * as $Fields from './fields.js'

export * as IssueSuggestion from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 19 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface IssueSuggestion {
kind: "Object",
name: "IssueSuggestion",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
issue: $Fields.issue,
issueId: $Fields.issueId,
type: $Fields.type,
state: $Fields.state,
stateChangedAt: $Fields.stateChangedAt,
dismissalReason: $Fields.dismissalReason,
metadata: $Fields.metadata,
suggestedIssue: $Fields.suggestedIssue,
suggestedIssueId: $Fields.suggestedIssueId,
suggestedTeam: $Fields.suggestedTeam,
suggestedProject: $Fields.suggestedProject,
suggestedUser: $Fields.suggestedUser,
suggestedUserId: $Fields.suggestedUserId,
suggestedLabel: $Fields.suggestedLabel,
suggestedLabelId: $Fields.suggestedLabelId
}
}