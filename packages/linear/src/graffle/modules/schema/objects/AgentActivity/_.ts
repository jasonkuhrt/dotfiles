import type * as $Fields from './fields.js'

export * as AgentActivity from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An activity within an agent context.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 13 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface AgentActivity {
kind: "Object",
name: "AgentActivity",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
agentSession: $Fields.agentSession,
content: $Fields.content,
sourceComment: $Fields.sourceComment,
user: $Fields.user,
sourceMetadata: $Fields.sourceMetadata,
signal: $Fields.signal,
signalMetadata: $Fields.signalMetadata,
ephemeral: $Fields.ephemeral,
contextualMetadata: $Fields.contextualMetadata
}
}