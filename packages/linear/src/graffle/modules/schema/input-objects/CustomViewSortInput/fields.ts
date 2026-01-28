import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomViewSortInput}.
*
* Sort by custom view name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomViewNameSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomViewSortInput} |
* | **Path** | `CustomViewSortInput.name` |
* | **Nullability** | Optional |
*/
export interface name {
kind: "InputField",
name: "name",
inlineType: [0, ],
namedType: $Schema.CustomViewNameSort,
type: $Schema.CustomViewNameSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomViewSortInput}.
*
* Sort by custom view creation date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomViewCreatedAtSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomViewSortInput} |
* | **Path** | `CustomViewSortInput.createdAt` |
* | **Nullability** | Optional |
*/
export interface createdAt {
kind: "InputField",
name: "createdAt",
inlineType: [0, ],
namedType: $Schema.CustomViewCreatedAtSort,
type: $Schema.CustomViewCreatedAtSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomViewSortInput}.
*
* Sort by custom view shared status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomViewSharedSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomViewSortInput} |
* | **Path** | `CustomViewSortInput.shared` |
* | **Nullability** | Optional |
*/
export interface shared {
kind: "InputField",
name: "shared",
inlineType: [0, ],
namedType: $Schema.CustomViewSharedSort,
type: $Schema.CustomViewSharedSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomViewSortInput}.
*
* Sort by custom view update date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomViewUpdatedAtSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomViewSortInput} |
* | **Path** | `CustomViewSortInput.updatedAt` |
* | **Nullability** | Optional |
*/
export interface updatedAt {
kind: "InputField",
name: "updatedAt",
inlineType: [0, ],
namedType: $Schema.CustomViewUpdatedAtSort,
type: $Schema.CustomViewUpdatedAtSort['type'] | null | undefined
}