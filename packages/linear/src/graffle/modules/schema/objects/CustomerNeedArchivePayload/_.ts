import type * as $Fields from './fields.js'

export * as CustomerNeedArchivePayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A generic payload return from entity archive mutations.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
* | **Implements** | {@link $Schema.ArchivePayload} |
*/
export interface CustomerNeedArchivePayload {
kind: "Object",
name: "CustomerNeedArchivePayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
success: $Fields.success,
entity: $Fields.entity
}
}