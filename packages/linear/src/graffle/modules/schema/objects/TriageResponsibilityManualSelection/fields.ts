import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"TriageResponsibilityManualSelection"`
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
value: "TriageResponsibilityManualSelection"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.TriageResponsibilityManualSelection}.
*
* The set of users responsible for triage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TriageResponsibilityManualSelection} |
* | **Path** | `TriageResponsibilityManualSelection.userIds` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface userIds {
kind: "OutputField",
name: "userIds",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.TriageResponsibilityManualSelection}.
*
* [Internal] The index of the current userId used for the assign action when having more than one user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TriageResponsibilityManualSelection} |
* | **Path** | `TriageResponsibilityManualSelection.assignmentIndex` |
* | **Nullability** | Optional |
*/
export interface assignmentIndex {
kind: "OutputField",
name: "assignmentIndex",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Int
}
