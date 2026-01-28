import type * as $Fields from './fields.js'

export * as ActorBot from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A bot actor is an actor that is not a user, but an application or integration.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 6 |
*/
export interface ActorBot {
kind: "Object",
name: "ActorBot",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
type: $Fields.type,
subType: $Fields.subType,
name: $Fields.name,
userDisplayName: $Fields.userDisplayName,
avatarUrl: $Fields.avatarUrl
}
}