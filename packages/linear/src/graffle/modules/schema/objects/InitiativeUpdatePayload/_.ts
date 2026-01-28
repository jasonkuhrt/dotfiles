import type * as $Fields from './fields.js'

export * as InitiativeUpdatePayload from './fields.js'

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
export interface InitiativeUpdatePayload {
kind: "Object",
name: "InitiativeUpdatePayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
initiativeUpdate: $Fields.initiativeUpdate,
success: $Fields.success
}
}