import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IDComparator}.
*
* Equals constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IDComparator} |
* | **Path** | `IDComparator.eq` |
* | **Nullability** | Optional |
*/
export interface eq {
kind: "InputField",
name: "eq",
inlineType: [0, ],
namedType: $Schema.ID,
type: $Schema.ID['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IDComparator}.
*
* Not-equals constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IDComparator} |
* | **Path** | `IDComparator.neq` |
* | **Nullability** | Optional |
*/
export interface neq {
kind: "InputField",
name: "neq",
inlineType: [0, ],
namedType: $Schema.ID,
type: $Schema.ID['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IDComparator}.
*
* In-array constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IDComparator} |
* | **Path** | `IDComparator.in` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
interface $in {
kind: "InputField",
name: "in",
inlineType: [0, [1, ]],
namedType: $Schema.ID,
type: readonly ($Schema.ID['codec']['_typeDecoded'])[] | null | undefined
}
export { type $in as in }
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IDComparator}.
*
* Not-in-array constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IDComparator} |
* | **Path** | `IDComparator.nin` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface nin {
kind: "InputField",
name: "nin",
inlineType: [0, [1, ]],
namedType: $Schema.ID,
type: readonly ($Schema.ID['codec']['_typeDecoded'])[] | null | undefined
}