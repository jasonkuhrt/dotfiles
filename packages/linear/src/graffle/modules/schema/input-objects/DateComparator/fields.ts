import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.DateComparator}.
*
* Equals constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTimeOrDuration} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.DateComparator} |
* | **Path** | `DateComparator.eq` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.DateComparator}.
*
* Not-equals constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTimeOrDuration} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.DateComparator} |
* | **Path** | `DateComparator.neq` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.DateComparator}.
*
* In-array constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTimeOrDuration}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.DateComparator} |
* | **Path** | `DateComparator.in` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.DateComparator}.
*
* Not-in-array constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTimeOrDuration}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.DateComparator} |
* | **Path** | `DateComparator.nin` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.DateComparator}.
*
* Less-than constraint. Matches any values that are less than the given value.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTimeOrDuration} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.DateComparator} |
* | **Path** | `DateComparator.lt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.DateComparator}.
*
* Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTimeOrDuration} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.DateComparator} |
* | **Path** | `DateComparator.lte` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.DateComparator}.
*
* Greater-than constraint. Matches any values that are greater than the given value.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTimeOrDuration} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.DateComparator} |
* | **Path** | `DateComparator.gt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.DateComparator}.
*
* Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTimeOrDuration} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.DateComparator} |
* | **Path** | `DateComparator.gte` |
* | **Nullability** | Optional |
*/
export interface gte {
kind: "InputField",
name: "gte",
inlineType: [0, ],
namedType: $Schema.DateTimeOrDuration,
type: $Schema.DateTimeOrDuration['codec']['_typeDecoded'] | null | undefined
}