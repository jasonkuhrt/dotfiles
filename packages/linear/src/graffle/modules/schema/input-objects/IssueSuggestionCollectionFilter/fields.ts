import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSuggestionCollectionFilter}.
*
* Comparator for the identifier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IDComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionCollectionFilter} |
* | **Path** | `IssueSuggestionCollectionFilter.id` |
* | **Nullability** | Optional |
*/
export interface id {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.IDComparator,
type: $Schema.IDComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSuggestionCollectionFilter}.
*
* Comparator for the created at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionCollectionFilter} |
* | **Path** | `IssueSuggestionCollectionFilter.createdAt` |
* | **Nullability** | Optional |
*/
export interface createdAt {
kind: "InputField",
name: "createdAt",
inlineType: [0, ],
namedType: $Schema.DateComparator,
type: $Schema.DateComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSuggestionCollectionFilter}.
*
* Comparator for the updated at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionCollectionFilter} |
* | **Path** | `IssueSuggestionCollectionFilter.updatedAt` |
* | **Nullability** | Optional |
*/
export interface updatedAt {
kind: "InputField",
name: "updatedAt",
inlineType: [0, ],
namedType: $Schema.DateComparator,
type: $Schema.DateComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSuggestionCollectionFilter}.
*
* Comparator for the suggestion type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionCollectionFilter} |
* | **Path** | `IssueSuggestionCollectionFilter.type` |
* | **Nullability** | Optional |
*/
export interface type {
kind: "InputField",
name: "type",
inlineType: [0, ],
namedType: $Schema.StringComparator,
type: $Schema.StringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSuggestionCollectionFilter}.
*
* Comparator for the suggestion state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionCollectionFilter} |
* | **Path** | `IssueSuggestionCollectionFilter.state` |
* | **Nullability** | Optional |
*/
export interface state {
kind: "InputField",
name: "state",
inlineType: [0, ],
namedType: $Schema.StringComparator,
type: $Schema.StringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSuggestionCollectionFilter}.
*
* Filters that the suggested user must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableUserFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionCollectionFilter} |
* | **Path** | `IssueSuggestionCollectionFilter.suggestedUser` |
* | **Nullability** | Optional |
*/
export interface suggestedUser {
kind: "InputField",
name: "suggestedUser",
inlineType: [0, ],
namedType: $Schema.NullableUserFilter,
type: $Schema.NullableUserFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSuggestionCollectionFilter}.
*
* Filters that the suggested project must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableProjectFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionCollectionFilter} |
* | **Path** | `IssueSuggestionCollectionFilter.suggestedProject` |
* | **Nullability** | Optional |
*/
export interface suggestedProject {
kind: "InputField",
name: "suggestedProject",
inlineType: [0, ],
namedType: $Schema.NullableProjectFilter,
type: $Schema.NullableProjectFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSuggestionCollectionFilter}.
*
* Filters that the suggested team must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableTeamFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionCollectionFilter} |
* | **Path** | `IssueSuggestionCollectionFilter.suggestedTeam` |
* | **Nullability** | Optional |
*/
export interface suggestedTeam {
kind: "InputField",
name: "suggestedTeam",
inlineType: [0, ],
namedType: $Schema.NullableTeamFilter,
type: $Schema.NullableTeamFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSuggestionCollectionFilter}.
*
* Filters that the suggested label must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionCollectionFilter} |
* | **Path** | `IssueSuggestionCollectionFilter.suggestedLabel` |
* | **Nullability** | Optional |
*/
export interface suggestedLabel {
kind: "InputField",
name: "suggestedLabel",
inlineType: [0, ],
namedType: $Schema.IssueLabelFilter,
type: $Schema.IssueLabelFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSuggestionCollectionFilter}.
*
* Compound filters, all of which need to be matched by the suggestion.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueSuggestionCollectionFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionCollectionFilter} |
* | **Path** | `IssueSuggestionCollectionFilter.and` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface and {
kind: "InputField",
name: "and",
inlineType: [0, [1, ]],
namedType: $Schema.IssueSuggestionCollectionFilter,
type: readonly ($Schema.IssueSuggestionCollectionFilter['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSuggestionCollectionFilter}.
*
* Compound filters, one of which need to be matched by the suggestion.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueSuggestionCollectionFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionCollectionFilter} |
* | **Path** | `IssueSuggestionCollectionFilter.or` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface or {
kind: "InputField",
name: "or",
inlineType: [0, [1, ]],
namedType: $Schema.IssueSuggestionCollectionFilter,
type: readonly ($Schema.IssueSuggestionCollectionFilter['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSuggestionCollectionFilter}.
*
* Filters that needs to be matched by some suggestions.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueSuggestionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionCollectionFilter} |
* | **Path** | `IssueSuggestionCollectionFilter.some` |
* | **Nullability** | Optional |
*/
export interface some {
kind: "InputField",
name: "some",
inlineType: [0, ],
namedType: $Schema.IssueSuggestionFilter,
type: $Schema.IssueSuggestionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSuggestionCollectionFilter}.
*
* Filters that needs to be matched by all suggestions.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueSuggestionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionCollectionFilter} |
* | **Path** | `IssueSuggestionCollectionFilter.every` |
* | **Nullability** | Optional |
*/
export interface every {
kind: "InputField",
name: "every",
inlineType: [0, ],
namedType: $Schema.IssueSuggestionFilter,
type: $Schema.IssueSuggestionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueSuggestionCollectionFilter}.
*
* Comparator for the collection length.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NumberComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueSuggestionCollectionFilter} |
* | **Path** | `IssueSuggestionCollectionFilter.length` |
* | **Nullability** | Optional |
*/
export interface length {
kind: "InputField",
name: "length",
inlineType: [0, ],
namedType: $Schema.NumberComparator,
type: $Schema.NumberComparator['type'] | null | undefined
}