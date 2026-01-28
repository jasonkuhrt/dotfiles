import type * as $Fields from './fields.js'

export * as ProjectLabelPayload from './fields.js'

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
export interface ProjectLabelPayload {
kind: "Object",
name: "ProjectLabelPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
projectLabel: $Fields.projectLabel,
success: $Fields.success
}
}