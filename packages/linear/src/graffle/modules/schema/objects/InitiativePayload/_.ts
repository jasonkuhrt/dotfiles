import type * as $Fields from './fields.js'

export * as InitiativePayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* The payload returned by the initiative mutations.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
*/
export interface InitiativePayload {
kind: "Object",
name: "InitiativePayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
initiative: $Fields.initiative,
success: $Fields.success
}
}