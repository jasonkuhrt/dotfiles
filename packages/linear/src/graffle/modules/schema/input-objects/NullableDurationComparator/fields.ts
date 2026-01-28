import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDurationComparator}.
*
* Equals constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Duration} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.NullableDurationComparator} |
* | **Path** | `NullableDurationComparator.eq` |
* | **Nullability** | Optional |
*/
export interface eq {
kind: "InputField",
name: "eq",
inlineType: [0, ],
namedType: $Schema.Duration,
type: $Schema.Duration['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDurationComparator}.
*
* Not-equals constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Duration} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.NullableDurationComparator} |
* | **Path** | `NullableDurationComparator.neq` |
* | **Nullability** | Optional |
*/
export interface neq {
kind: "InputField",
name: "neq",
inlineType: [0, ],
namedType: $Schema.Duration,
type: $Schema.Duration['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDurationComparator}.
*
* In-array constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Duration}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.NullableDurationComparator} |
* | **Path** | `NullableDurationComparator.in` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
interface $in {
kind: "InputField",
name: "in",
inlineType: [0, [1, ]],
namedType: $Schema.Duration,
type: readonly ($Schema.Duration['codec']['_typeDecoded'])[] | null | undefined
}
export { type $in as in }
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDurationComparator}.
*
* Not-in-array constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Duration}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.NullableDurationComparator} |
* | **Path** | `NullableDurationComparator.nin` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface nin {
kind: "InputField",
name: "nin",
inlineType: [0, [1, ]],
namedType: $Schema.Duration,
type: readonly ($Schema.Duration['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDurationComparator}.
*
* Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NullableDurationComparator} |
* | **Path** | `NullableDurationComparator.null` |
* | **Nullability** | Optional |
*/
interface $null {
kind: "InputField",
name: "null",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
export { type $null as null }
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDurationComparator}.
*
* Less-than constraint. Matches any values that are less than the given value.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Duration} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.NullableDurationComparator} |
* | **Path** | `NullableDurationComparator.lt` |
* | **Nullability** | Optional |
*/
export interface lt {
kind: "InputField",
name: "lt",
inlineType: [0, ],
namedType: $Schema.Duration,
type: $Schema.Duration['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDurationComparator}.
*
* Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Duration} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.NullableDurationComparator} |
* | **Path** | `NullableDurationComparator.lte` |
* | **Nullability** | Optional |
*/
export interface lte {
kind: "InputField",
name: "lte",
inlineType: [0, ],
namedType: $Schema.Duration,
type: $Schema.Duration['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDurationComparator}.
*
* Greater-than constraint. Matches any values that are greater than the given value.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Duration} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.NullableDurationComparator} |
* | **Path** | `NullableDurationComparator.gt` |
* | **Nullability** | Optional |
*/
export interface gt {
kind: "InputField",
name: "gt",
inlineType: [0, ],
namedType: $Schema.Duration,
type: $Schema.Duration['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDurationComparator}.
*
* Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Duration} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.NullableDurationComparator} |
* | **Path** | `NullableDurationComparator.gte` |
* | **Nullability** | Optional |
*/
export interface gte {
kind: "InputField",
name: "gte",
inlineType: [0, ],
namedType: $Schema.Duration,
type: $Schema.Duration['codec']['_typeDecoded'] | null | undefined
}