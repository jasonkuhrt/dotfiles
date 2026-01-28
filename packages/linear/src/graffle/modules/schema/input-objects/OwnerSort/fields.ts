import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OwnerSort}.
*
* Whether nulls should be sorted first or last
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PaginationNulls} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.OwnerSort} |
* | **Path** | `OwnerSort.nulls` |
* | **Default** | `"last"` |
* | **Nullability** | Optional |
*/
export interface nulls {
kind: "InputField",
name: "nulls",
inlineType: [0, ],
namedType: $Schema.PaginationNulls,
type: $Schema.PaginationNulls['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OwnerSort}.
*
* The order for the individual sort
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PaginationSortOrder} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.OwnerSort} |
* | **Path** | `OwnerSort.order` |
* | **Nullability** | Optional |
*/
export interface order {
kind: "InputField",
name: "order",
inlineType: [0, ],
namedType: $Schema.PaginationSortOrder,
type: $Schema.PaginationSortOrder['members'] | null | undefined
}