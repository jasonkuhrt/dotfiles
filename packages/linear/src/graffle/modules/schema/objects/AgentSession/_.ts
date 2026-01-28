import type * as $Fields from './fields.js'

export * as AgentSession from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A session for agent activities and state management.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 25 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface AgentSession {
kind: "Object",
name: "AgentSession",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
creator: $Fields.creator,
appUser: $Fields.appUser,
comment: $Fields.comment,
sourceComment: $Fields.sourceComment,
issue: $Fields.issue,
status: $Fields.status,
startedAt: $Fields.startedAt,
endedAt: $Fields.endedAt,
dismissedAt: $Fields.dismissedAt,
dismissedBy: $Fields.dismissedBy,
activities: $Fields.activities,
externalLink: $Fields.externalLink,
externalUrls: $Fields.externalUrls,
summary: $Fields.summary,
sourceMetadata: $Fields.sourceMetadata,
plan: $Fields.plan,
context: $Fields.context,
type: $Fields.type,
url: $Fields.url,
promptContext: $Fields.promptContext,
pullRequests: $Fields.pullRequests
}
}