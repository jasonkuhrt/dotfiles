import type * as $Fields from './fields.js'

export * as InitiativeToProjectPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* The result of a initiativeToProject mutation.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
*/
export interface InitiativeToProjectPayload {
kind: "Object",
name: "InitiativeToProjectPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
initiativeToProject: $Fields.initiativeToProject,
success: $Fields.success
}
}