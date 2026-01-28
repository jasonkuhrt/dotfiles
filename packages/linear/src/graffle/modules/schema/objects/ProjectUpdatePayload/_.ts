import type * as $Fields from './fields.js'

export * as ProjectUpdatePayload from './fields.js'

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
export interface ProjectUpdatePayload {
kind: "Object",
name: "ProjectUpdatePayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
projectUpdate: $Fields.projectUpdate,
success: $Fields.success
}
}