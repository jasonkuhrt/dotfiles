import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"RoadmapConnection"`
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
value: "RoadmapConnection"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.RoadmapConnection}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapEdge}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.RoadmapConnection} |
* | **Path** | `RoadmapConnection.edges` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface edges {
kind: "OutputField",
name: "edges",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.RoadmapEdge
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.RoadmapConnection}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Roadmap}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.RoadmapConnection} |
* | **Path** | `RoadmapConnection.nodes` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface nodes {
kind: "OutputField",
name: "nodes",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.Roadmap
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.RoadmapConnection}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PageInfo}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.RoadmapConnection} |
* | **Path** | `RoadmapConnection.pageInfo` |
* | **Nullability** | Required |
*/
export interface pageInfo {
kind: "OutputField",
name: "pageInfo",
arguments: {},
inlineType: [1, ],
namedType: $Schema.PageInfo
}
