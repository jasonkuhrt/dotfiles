import type * as $Fields from './fields.js'

export * as FetchDataPayload from './fields.js'

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
export interface FetchDataPayload {
kind: "Object",
name: "FetchDataPayload",
fields: {
__typename: $Fields.__typename,
data: $Fields.data,
query: $Fields.query,
filters: $Fields.filters,
success: $Fields.success
}
}