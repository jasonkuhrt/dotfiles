import type * as $Fields from './fields.js'

export * as ExternalEntityInfo from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Information about an external entity.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
*/
export interface ExternalEntityInfo {
kind: "Object",
name: "ExternalEntityInfo",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
service: $Fields.service,
metadata: $Fields.metadata
}
}