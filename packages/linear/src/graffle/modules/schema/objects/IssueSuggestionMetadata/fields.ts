import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"IssueSuggestionMetadata"`
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
value: "IssueSuggestionMetadata"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSuggestionMetadata}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionMetadata} |
* | **Path** | `IssueSuggestionMetadata.score` |
* | **Nullability** | Optional |
*/
export interface score {
kind: "OutputField",
name: "score",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSuggestionMetadata}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionMetadata} |
* | **Path** | `IssueSuggestionMetadata.classification` |
* | **Nullability** | Optional |
*/
export interface classification {
kind: "OutputField",
name: "classification",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSuggestionMetadata}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionMetadata} |
* | **Path** | `IssueSuggestionMetadata.reasons` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface reasons {
kind: "OutputField",
name: "reasons",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSuggestionMetadata}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionMetadata} |
* | **Path** | `IssueSuggestionMetadata.evalLogId` |
* | **Nullability** | Optional |
*/
export interface evalLogId {
kind: "OutputField",
name: "evalLogId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSuggestionMetadata}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionMetadata} |
* | **Path** | `IssueSuggestionMetadata.rank` |
* | **Nullability** | Optional |
*/
export interface rank {
kind: "OutputField",
name: "rank",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSuggestionMetadata}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionMetadata} |
* | **Path** | `IssueSuggestionMetadata.variant` |
* | **Nullability** | Optional |
*/
export interface variant {
kind: "OutputField",
name: "variant",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueSuggestionMetadata}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionMetadata} |
* | **Path** | `IssueSuggestionMetadata.appliedAutomationRuleId` |
* | **Nullability** | Optional |
*/
export interface appliedAutomationRuleId {
kind: "OutputField",
name: "appliedAutomationRuleId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}
