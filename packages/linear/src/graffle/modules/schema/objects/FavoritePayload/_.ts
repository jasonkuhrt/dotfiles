import type * as $Fields from './fields.js'

export * as FavoritePayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
*/
export interface FavoritePayload {
kind: "Object",
name: "FavoritePayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
favorite: $Fields.favorite,
success: $Fields.success
}
}