import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NumberComparator}.
*
* Equals constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NumberComparator} |
* | **Path** | `NumberComparator.eq` |
* | **Nullability** | Optional |
*/
export interface eq {
kind: "InputField",
name: "eq",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NumberComparator}.
*
* Not-equals constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NumberComparator} |
* | **Path** | `NumberComparator.neq` |
* | **Nullability** | Optional |
*/
export interface neq {
kind: "InputField",
name: "neq",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NumberComparator}.
*
* In-array constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NumberComparator} |
* | **Path** | `NumberComparator.in` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
interface $in {
kind: "InputField",
name: "in",
inlineType: [0, [1, ]],
namedType: $Schema.Float,
type: readonly ($Schema.Float['codec']['_typeDecoded'])[] | null | undefined
}
export { type $in as in }
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NumberComparator}.
*
* Not-in-array constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NumberComparator} |
* | **Path** | `NumberComparator.nin` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface nin {
kind: "InputField",
name: "nin",
inlineType: [0, [1, ]],
namedType: $Schema.Float,
type: readonly ($Schema.Float['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NumberComparator}.
*
* Less-than constraint. Matches any values that are less than the given value.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NumberComparator} |
* | **Path** | `NumberComparator.lt` |
* | **Nullability** | Optional |
*/
export interface lt {
kind: "InputField",
name: "lt",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NumberComparator}.
*
* Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NumberComparator} |
* | **Path** | `NumberComparator.lte` |
* | **Nullability** | Optional |
*/
export interface lte {
kind: "InputField",
name: "lte",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NumberComparator}.
*
* Greater-than constraint. Matches any values that are greater than the given value.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NumberComparator} |
* | **Path** | `NumberComparator.gt` |
* | **Nullability** | Optional |
*/
export interface gt {
kind: "InputField",
name: "gt",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NumberComparator}.
*
* Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NumberComparator} |
* | **Path** | `NumberComparator.gte` |
* | **Nullability** | Optional |
*/
export interface gte {
kind: "InputField",
name: "gte",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}