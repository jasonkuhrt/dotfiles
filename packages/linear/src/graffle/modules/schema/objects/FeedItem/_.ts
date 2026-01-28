import type * as $Fields from './fields.js'

export * as FeedItem from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* [Internal] An item in a users feed.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 10 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface FeedItem {
kind: "Object",
name: "FeedItem",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
organization: $Fields.organization,
user: $Fields.user,
team: $Fields.team,
projectUpdate: $Fields.projectUpdate,
initiativeUpdate: $Fields.initiativeUpdate,
post: $Fields.post
}
}