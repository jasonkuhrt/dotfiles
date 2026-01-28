import type * as $Fields from './fields.js'

export * as ReleasePipelinePayload from './fields.js'

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
export interface ReleasePipelinePayload {
kind: "Object",
name: "ReleasePipelinePayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
releasePipeline: $Fields.releasePipeline,
success: $Fields.success
}
}