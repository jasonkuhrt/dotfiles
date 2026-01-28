import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDateComparator}.
*
* Equals constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTimeOrDuration} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.NullableDateComparator} |
* | **Path** | `NullableDateComparator.eq` |
* | **Nullability** | Optional |
*/
export interface eq {
kind: "InputField",
name: "eq",
inlineType: [0, ],
namedType: $Schema.DateTimeOrDuration,
type: $Schema.DateTimeOrDuration['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDateComparator}.
*
* Not-equals constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTimeOrDuration} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.NullableDateComparator} |
* | **Path** | `NullableDateComparator.neq` |
* | **Nullability** | Optional |
*/
export interface neq {
kind: "InputField",
name: "neq",
inlineType: [0, ],
namedType: $Schema.DateTimeOrDuration,
type: $Schema.DateTimeOrDuration['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDateComparator}.
*
* In-array constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTimeOrDuration}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.NullableDateComparator} |
* | **Path** | `NullableDateComparator.in` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
interface $in {
kind: "InputField",
name: "in",
inlineType: [0, [1, ]],
namedType: $Schema.DateTimeOrDuration,
type: readonly ($Schema.DateTimeOrDuration['codec']['_typeDecoded'])[] | null | undefined
}
export { type $in as in }
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDateComparator}.
*
* Not-in-array constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTimeOrDuration}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.NullableDateComparator} |
* | **Path** | `NullableDateComparator.nin` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface nin {
kind: "InputField",
name: "nin",
inlineType: [0, [1, ]],
namedType: $Schema.DateTimeOrDuration,
type: readonly ($Schema.DateTimeOrDuration['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDateComparator}.
*
* Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NullableDateComparator} |
* | **Path** | `NullableDateComparator.null` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDateComparator}.
*
* Less-than constraint. Matches any values that are less than the given value.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTimeOrDuration} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.NullableDateComparator} |
* | **Path** | `NullableDateComparator.lt` |
* | **Nullability** | Optional |
*/
export interface lt {
kind: "InputField",
name: "lt",
inlineType: [0, ],
namedType: $Schema.DateTimeOrDuration,
type: $Schema.DateTimeOrDuration['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDateComparator}.
*
* Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTimeOrDuration} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.NullableDateComparator} |
* | **Path** | `NullableDateComparator.lte` |
* | **Nullability** | Optional |
*/
export interface lte {
kind: "InputField",
name: "lte",
inlineType: [0, ],
namedType: $Schema.DateTimeOrDuration,
type: $Schema.DateTimeOrDuration['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDateComparator}.
*
* Greater-than constraint. Matches any values that are greater than the given value.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTimeOrDuration} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.NullableDateComparator} |
* | **Path** | `NullableDateComparator.gt` |
* | **Nullability** | Optional |
*/
export interface gt {
kind: "InputField",
name: "gt",
inlineType: [0, ],
namedType: $Schema.DateTimeOrDuration,
type: $Schema.DateTimeOrDuration['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableDateComparator}.
*
* Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTimeOrDuration} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.NullableDateComparator} |
* | **Path** | `NullableDateComparator.gte` |
* | **Nullability** | Optional |
*/
export interface gte {
kind: "InputField",
name: "gte",
inlineType: [0, ],
namedType: $Schema.DateTimeOrDuration,
type: $Schema.DateTimeOrDuration['codec']['_typeDecoded'] | null | undefined
}