import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.PrioritySort}.
*
* Whether nulls should be sorted first or last
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PaginationNulls} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.PrioritySort} |
* | **Path** | `PrioritySort.nulls` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.PrioritySort}.
*
* The order for the individual sort
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PaginationSortOrder} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.PrioritySort} |
* | **Path** | `PrioritySort.order` |
* | **Nullability** | Optional |
*/
export interface order {
kind: "InputField",
name: "order",
inlineType: [0, ],
namedType: $Schema.PaginationSortOrder,
type: $Schema.PaginationSortOrder['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.PrioritySort}.
*
* Whether to consider no priority as the highest or lowest priority
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PrioritySort} |
* | **Path** | `PrioritySort.noPriorityFirst` |
* | **Default** | `false` |
* | **Nullability** | Optional |
*/
export interface noPriorityFirst {
kind: "InputField",
name: "noPriorityFirst",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}