import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"IssueStateSpan"`
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
value: "IssueStateSpan"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueStateSpan}.
*
* The unique identifier of the state span.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueStateSpan} |
* | **Path** | `IssueStateSpan.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ID
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueStateSpan}.
*
* The workflow state identifier for this span.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueStateSpan} |
* | **Path** | `IssueStateSpan.stateId` |
* | **Nullability** | Required |
*/
export interface stateId {
kind: "OutputField",
name: "stateId",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ID
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueStateSpan}.
*
* The timestamp when the issue entered this state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueStateSpan} |
* | **Path** | `IssueStateSpan.startedAt` |
* | **Nullability** | Required |
*/
export interface startedAt {
kind: "OutputField",
name: "startedAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueStateSpan}.
*
* The timestamp when the issue left this state. Null if the issue is currently in this state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueStateSpan} |
* | **Path** | `IssueStateSpan.endedAt` |
* | **Nullability** | Optional |
*/
export interface endedAt {
kind: "OutputField",
name: "endedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueStateSpan}.
*
* The workflow state for this span.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueStateSpan} |
* | **Path** | `IssueStateSpan.state` |
* | **Nullability** | Optional |
*/
export interface state {
kind: "OutputField",
name: "state",
arguments: {},
inlineType: [0, ],
namedType: $Schema.WorkflowState
}
