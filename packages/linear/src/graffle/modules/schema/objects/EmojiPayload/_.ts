import type * as $Fields from './fields.js'

export * as EmojiPayload from './fields.js'

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
export interface EmojiPayload {
kind: "Object",
name: "EmojiPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
emoji: $Fields.emoji,
success: $Fields.success
}
}