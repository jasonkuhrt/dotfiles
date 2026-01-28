import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"ProjectLabelConnection"`
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
value: "ProjectLabelConnection"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ProjectLabelConnection}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectLabelEdge}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.ProjectLabelConnection} |
* | **Path** | `ProjectLabelConnection.edges` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface edges {
kind: "OutputField",
name: "edges",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.ProjectLabelEdge
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ProjectLabelConnection}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectLabel}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.ProjectLabelConnection} |
* | **Path** | `ProjectLabelConnection.nodes` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface nodes {
kind: "OutputField",
name: "nodes",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.ProjectLabel
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ProjectLabelConnection}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PageInfo}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.ProjectLabelConnection} |
* | **Path** | `ProjectLabelConnection.pageInfo` |
* | **Nullability** | Required |
*/
export interface pageInfo {
kind: "OutputField",
name: "pageInfo",
arguments: {},
inlineType: [1, ],
namedType: $Schema.PageInfo
}
