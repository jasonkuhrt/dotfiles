import type * as $Fields from './fields.js'

export * as PushSubscription from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A user's web or mobile push notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 4 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface PushSubscription {
kind: "Object",
name: "PushSubscription",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt
}
}