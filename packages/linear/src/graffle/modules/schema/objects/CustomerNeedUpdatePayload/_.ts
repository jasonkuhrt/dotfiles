import type * as $Fields from './fields.js'

export * as CustomerNeedUpdatePayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 4 |
*/
export interface CustomerNeedUpdatePayload {
kind: "Object",
name: "CustomerNeedUpdatePayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
need: $Fields.need,
success: $Fields.success,
updatedRelatedNeeds: $Fields.updatedRelatedNeeds
}
}