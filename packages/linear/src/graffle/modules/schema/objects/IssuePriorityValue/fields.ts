import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"IssuePriorityValue"`
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
value: "IssuePriorityValue"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssuePriorityValue}.
*
* Priority's number value.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssuePriorityValue} |
* | **Path** | `IssuePriorityValue.priority` |
* | **Nullability** | Required |
*/
export interface priority {
kind: "OutputField",
name: "priority",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Int
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssuePriorityValue}.
*
* Priority's label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssuePriorityValue} |
* | **Path** | `IssuePriorityValue.label` |
* | **Nullability** | Required |
*/
export interface label {
kind: "OutputField",
name: "label",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}
