import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"ViewPreferencesValues"`
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
value: "ViewPreferencesValues"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ViewPreferencesValues}.
*
* The issue ordering.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ViewPreferencesValues} |
* | **Path** | `ViewPreferencesValues.viewOrdering` |
* | **Nullability** | Optional |
*/
export interface viewOrdering {
kind: "OutputField",
name: "viewOrdering",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ViewPreferencesValues}.
*
* The issue grouping.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ViewPreferencesValues} |
* | **Path** | `ViewPreferencesValues.issueGrouping` |
* | **Nullability** | Optional |
*/
export interface issueGrouping {
kind: "OutputField",
name: "issueGrouping",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ViewPreferencesValues}.
*
* The issue sub grouping.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ViewPreferencesValues} |
* | **Path** | `ViewPreferencesValues.issueSubGrouping` |
* | **Nullability** | Optional |
*/
export interface issueSubGrouping {
kind: "OutputField",
name: "issueSubGrouping",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ViewPreferencesValues}.
*
* Whether to show completed issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ViewPreferencesValues} |
* | **Path** | `ViewPreferencesValues.showCompletedIssues` |
* | **Nullability** | Optional |
*/
export interface showCompletedIssues {
kind: "OutputField",
name: "showCompletedIssues",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}
