import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"IssueSearchPayload"`
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
value: "IssueSearchPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchPayload}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueSearchResultEdge}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchPayload} |
* | **Path** | `IssueSearchPayload.edges` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface edges {
kind: "OutputField",
name: "edges",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.IssueSearchResultEdge
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchPayload}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueSearchResult}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchPayload} |
* | **Path** | `IssueSearchPayload.nodes` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface nodes {
kind: "OutputField",
name: "nodes",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.IssueSearchResult
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchPayload}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PageInfo}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchPayload} |
* | **Path** | `IssueSearchPayload.pageInfo` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchPayload}.
*
* Archived entities matching the search term along with all their dependencies.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ArchiveResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueSearchPayload} |
* | **Path** | `IssueSearchPayload.archivePayload` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSearchPayload}.
*
* Total number of results for query without filters applied.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSearchPayload} |
* | **Path** | `IssueSearchPayload.totalCount` |
* | **Nullability** | Required |
*/
export interface totalCount {
kind: "OutputField",
name: "totalCount",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}
