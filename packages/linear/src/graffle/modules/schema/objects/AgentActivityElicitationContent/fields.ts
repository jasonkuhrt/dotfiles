import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"AgentActivityElicitationContent"`
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
value: "AgentActivityElicitationContent"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AgentActivityElicitationContent}.
*
* The type of activity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivityType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.AgentActivityElicitationContent} |
* | **Path** | `AgentActivityElicitationContent.type` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AgentActivityElicitationContent}.
*
* The elicitation message in Markdown format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AgentActivityElicitationContent} |
* | **Path** | `AgentActivityElicitationContent.body` |
* | **Nullability** | Required |
*/
export interface body {
kind: "OutputField",
name: "body",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}
