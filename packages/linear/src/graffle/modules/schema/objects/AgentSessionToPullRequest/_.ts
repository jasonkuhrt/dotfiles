import type * as $Fields from './fields.js'

export * as AgentSessionToPullRequest from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Join table between agent sessions and pull requests.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 6 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface AgentSessionToPullRequest {
kind: "Object",
name: "AgentSessionToPullRequest",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
pullRequest: $Fields.pullRequest,
agentSession: $Fields.agentSession
}
}