import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"DocumentSearchPayload"`
*
* {@link https://graphql.org/learn/queries/#meta-fields | GraphQL __typename documentation}
*/
export interface __typename {
kind: "OutputField",
name: "__typename",
arguments: {},
inlineType: [1],
namedType: {
kind: "__typename",
value: "DocumentSearchPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.DocumentSearchPayload}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentSearchResultEdge}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.DocumentSearchPayload} |
* | **Path** | `DocumentSearchPayload.edges` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface edges {
kind: "OutputField",
name: "edges",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.DocumentSearchResultEdge
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.DocumentSearchPayload}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentSearchResult}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.DocumentSearchPayload} |
* | **Path** | `DocumentSearchPayload.nodes` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface nodes {
kind: "OutputField",
name: "nodes",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.DocumentSearchResult
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.DocumentSearchPayload}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PageInfo}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.DocumentSearchPayload} |
* | **Path** | `DocumentSearchPayload.pageInfo` |
* | **Nullability** | Required |
*/
export interface pageInfo {
kind: "OutputField",
name: "pageInfo",
arguments: {},
inlineType: [1, ],
namedType: $Schema.PageInfo
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.DocumentSearchPayload}.
*
* Archived entities matching the search term along with all their dependencies.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ArchiveResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.DocumentSearchPayload} |
* | **Path** | `DocumentSearchPayload.archivePayload` |
* | **Nullability** | Required |
*/
export interface archivePayload {
kind: "OutputField",
name: "archivePayload",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ArchiveResponse
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.DocumentSearchPayload}.
*
* Total number of results for query without filters applied.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.DocumentSearchPayload} |
* | **Path** | `DocumentSearchPayload.totalCount` |
* | **Nullability** | Required |
*/
export interface totalCount {
kind: "OutputField",
name: "totalCount",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}
