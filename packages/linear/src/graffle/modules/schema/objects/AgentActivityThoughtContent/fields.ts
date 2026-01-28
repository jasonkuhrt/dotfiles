import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"AgentActivityThoughtContent"`
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
value: "AgentActivityThoughtContent"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AgentActivityThoughtContent}.
*
* The type of activity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivityType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.AgentActivityThoughtContent} |
* | **Path** | `AgentActivityThoughtContent.type` |
* | **Nullability** | Required |
*/
export interface type {
kind: "OutputField",
name: "type",
arguments: {},
inlineType: [1, ],
namedType: $Schema.AgentActivityType
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AgentActivityThoughtContent}.
*
* The thought content in Markdown format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AgentActivityThoughtContent} |
* | **Path** | `AgentActivityThoughtContent.body` |
* | **Nullability** | Required |
*/
export interface body {
kind: "OutputField",
name: "body",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}
