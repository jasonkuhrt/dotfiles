import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"PageInfo"`
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
value: "PageInfo"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PageInfo}.
*
* Indicates if there are more results when paginating backward.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PageInfo} |
* | **Path** | `PageInfo.hasPreviousPage` |
* | **Nullability** | Required |
*/
export interface hasPreviousPage {
kind: "OutputField",
name: "hasPreviousPage",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PageInfo}.
*
* Indicates if there are more results when paginating forward.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PageInfo} |
* | **Path** | `PageInfo.hasNextPage` |
* | **Nullability** | Required |
*/
export interface hasNextPage {
kind: "OutputField",
name: "hasNextPage",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PageInfo}.
*
* Cursor representing the first result in the paginated results.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PageInfo} |
* | **Path** | `PageInfo.startCursor` |
* | **Nullability** | Optional |
*/
export interface startCursor {
kind: "OutputField",
name: "startCursor",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PageInfo}.
*
* Cursor representing the last result in the paginated results.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PageInfo} |
* | **Path** | `PageInfo.endCursor` |
* | **Nullability** | Optional |
*/
export interface endCursor {
kind: "OutputField",
name: "endCursor",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}
