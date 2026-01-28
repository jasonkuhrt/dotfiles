import type * as $Fields from './fields.js'

export * as ExternalUser from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An external authenticated (e.g., through Slack) user which doesn't have a Linear account, but can create and update entities in Linear from the external system that authenticated them.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 10 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface ExternalUser {
kind: "Object",
name: "ExternalUser",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
name: $Fields.name,
displayName: $Fields.displayName,
email: $Fields.email,
avatarUrl: $Fields.avatarUrl,
organization: $Fields.organization,
lastSeen: $Fields.lastSeen
}
}