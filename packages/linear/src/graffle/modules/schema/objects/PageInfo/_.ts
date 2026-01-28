import type * as $Fields from './fields.js'

export * as PageInfo from './fields.js'

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
export interface PageInfo {
kind: "Object",
name: "PageInfo",
fields: {
__typename: $Fields.__typename,
hasPreviousPage: $Fields.hasPreviousPage,
hasNextPage: $Fields.hasNextPage,
startCursor: $Fields.startCursor,
endCursor: $Fields.endCursor
}
}