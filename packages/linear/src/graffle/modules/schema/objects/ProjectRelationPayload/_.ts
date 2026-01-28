import type * as $Fields from './fields.js'

export * as ProjectRelationPayload from './fields.js'

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
export interface ProjectRelationPayload {
kind: "Object",
name: "ProjectRelationPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
projectRelation: $Fields.projectRelation,
success: $Fields.success
}
}