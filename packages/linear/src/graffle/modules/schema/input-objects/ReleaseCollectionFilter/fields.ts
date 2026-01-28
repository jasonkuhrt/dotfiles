import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseCollectionFilter}.
*
* Comparator for the identifier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IDComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ReleaseCollectionFilter} |
* | **Path** | `ReleaseCollectionFilter.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseCollectionFilter}.
*
* Comparator for the created at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ReleaseCollectionFilter} |
* | **Path** | `ReleaseCollectionFilter.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseCollectionFilter}.
*
* Comparator for the updated at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ReleaseCollectionFilter} |
* | **Path** | `ReleaseCollectionFilter.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseCollectionFilter}.
*
* Filters that the release's pipeline must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePipelineFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ReleaseCollectionFilter} |
* | **Path** | `ReleaseCollectionFilter.pipeline` |
* | **Nullability** | Optional |
*/
export interface pipeline {
kind: "InputField",
name: "pipeline",
inlineType: [0, ],
namedType: $Schema.ReleasePipelineFilter,
type: $Schema.ReleasePipelineFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseCollectionFilter}.
*
* Filters that the release's stage must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseStageFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ReleaseCollectionFilter} |
* | **Path** | `ReleaseCollectionFilter.stage` |
* | **Nullability** | Optional |
*/
export interface stage {
kind: "InputField",
name: "stage",
inlineType: [0, ],
namedType: $Schema.ReleaseStageFilter,
type: $Schema.ReleaseStageFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseCollectionFilter}.
*
* Compound filters, all of which need to be matched by the release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseCollectionFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ReleaseCollectionFilter} |
* | **Path** | `ReleaseCollectionFilter.and` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface and {
kind: "InputField",
name: "and",
inlineType: [0, [1, ]],
namedType: $Schema.ReleaseCollectionFilter,
type: readonly ($Schema.ReleaseCollectionFilter['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseCollectionFilter}.
*
* Compound filters, one of which need to be matched by the release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseCollectionFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ReleaseCollectionFilter} |
* | **Path** | `ReleaseCollectionFilter.or` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface or {
kind: "InputField",
name: "or",
inlineType: [0, [1, ]],
namedType: $Schema.ReleaseCollectionFilter,
type: readonly ($Schema.ReleaseCollectionFilter['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseCollectionFilter}.
*
* Filters that needs to be matched by some releases.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ReleaseCollectionFilter} |
* | **Path** | `ReleaseCollectionFilter.some` |
* | **Nullability** | Optional |
*/
export interface some {
kind: "InputField",
name: "some",
inlineType: [0, ],
namedType: $Schema.ReleaseFilter,
type: $Schema.ReleaseFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseCollectionFilter}.
*
* Filters that needs to be matched by all releases.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ReleaseCollectionFilter} |
* | **Path** | `ReleaseCollectionFilter.every` |
* | **Nullability** | Optional |
*/
export interface every {
kind: "InputField",
name: "every",
inlineType: [0, ],
namedType: $Schema.ReleaseFilter,
type: $Schema.ReleaseFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseCollectionFilter}.
*
* Comparator for the collection length.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NumberComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ReleaseCollectionFilter} |
* | **Path** | `ReleaseCollectionFilter.length` |
* | **Nullability** | Optional |
*/
export interface length {
kind: "InputField",
name: "length",
inlineType: [0, ],
namedType: $Schema.NumberComparator,
type: $Schema.NumberComparator['type'] | null | undefined
}