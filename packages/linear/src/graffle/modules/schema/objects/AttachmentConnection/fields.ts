import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"AttachmentConnection"`
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
value: "AttachmentConnection"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AttachmentConnection}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentEdge}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.AttachmentConnection} |
* | **Path** | `AttachmentConnection.edges` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface edges {
kind: "OutputField",
name: "edges",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.AttachmentEdge
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AttachmentConnection}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Attachment}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.AttachmentConnection} |
* | **Path** | `AttachmentConnection.nodes` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface nodes {
kind: "OutputField",
name: "nodes",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.Attachment
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AttachmentConnection}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PageInfo}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.AttachmentConnection} |
* | **Path** | `AttachmentConnection.pageInfo` |
* | **Nullability** | Required |
*/
export interface pageInfo {
kind: "OutputField",
name: "pageInfo",
arguments: {},
inlineType: [1, ],
namedType: $Schema.PageInfo
}
