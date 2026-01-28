import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceTypeComparator}.
*
* Equals constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceTypeComparator} |
* | **Path** | `SourceTypeComparator.eq` |
* | **Nullability** | Optional |
*/
export interface eq {
kind: "InputField",
name: "eq",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceTypeComparator}.
*
* Not-equals constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceTypeComparator} |
* | **Path** | `SourceTypeComparator.neq` |
* | **Nullability** | Optional |
*/
export interface neq {
kind: "InputField",
name: "neq",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceTypeComparator}.
*
* In-array constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceTypeComparator} |
* | **Path** | `SourceTypeComparator.in` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
interface $in {
kind: "InputField",
name: "in",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}
export { type $in as in }
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceTypeComparator}.
*
* Not-in-array constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceTypeComparator} |
* | **Path** | `SourceTypeComparator.nin` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface nin {
kind: "InputField",
name: "nin",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceTypeComparator}.
*
* Equals case insensitive. Matches any values that matches the given string case insensitive.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceTypeComparator} |
* | **Path** | `SourceTypeComparator.eqIgnoreCase` |
* | **Nullability** | Optional |
*/
export interface eqIgnoreCase {
kind: "InputField",
name: "eqIgnoreCase",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceTypeComparator}.
*
* Not-equals case insensitive. Matches any values that don't match the given string case insensitive.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceTypeComparator} |
* | **Path** | `SourceTypeComparator.neqIgnoreCase` |
* | **Nullability** | Optional |
*/
export interface neqIgnoreCase {
kind: "InputField",
name: "neqIgnoreCase",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceTypeComparator}.
*
* Starts with constraint. Matches any values that start with the given string.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceTypeComparator} |
* | **Path** | `SourceTypeComparator.startsWith` |
* | **Nullability** | Optional |
*/
export interface startsWith {
kind: "InputField",
name: "startsWith",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceTypeComparator}.
*
* Starts with case insensitive constraint. Matches any values that start with the given string.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceTypeComparator} |
* | **Path** | `SourceTypeComparator.startsWithIgnoreCase` |
* | **Nullability** | Optional |
*/
export interface startsWithIgnoreCase {
kind: "InputField",
name: "startsWithIgnoreCase",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceTypeComparator}.
*
* Doesn't start with constraint. Matches any values that don't start with the given string.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceTypeComparator} |
* | **Path** | `SourceTypeComparator.notStartsWith` |
* | **Nullability** | Optional |
*/
export interface notStartsWith {
kind: "InputField",
name: "notStartsWith",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceTypeComparator}.
*
* Ends with constraint. Matches any values that end with the given string.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceTypeComparator} |
* | **Path** | `SourceTypeComparator.endsWith` |
* | **Nullability** | Optional |
*/
export interface endsWith {
kind: "InputField",
name: "endsWith",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceTypeComparator}.
*
* Doesn't end with constraint. Matches any values that don't end with the given string.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceTypeComparator} |
* | **Path** | `SourceTypeComparator.notEndsWith` |
* | **Nullability** | Optional |
*/
export interface notEndsWith {
kind: "InputField",
name: "notEndsWith",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceTypeComparator}.
*
* Contains constraint. Matches any values that contain the given string.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceTypeComparator} |
* | **Path** | `SourceTypeComparator.contains` |
* | **Nullability** | Optional |
*/
export interface contains {
kind: "InputField",
name: "contains",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceTypeComparator}.
*
* Contains case insensitive constraint. Matches any values that contain the given string case insensitive.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceTypeComparator} |
* | **Path** | `SourceTypeComparator.containsIgnoreCase` |
* | **Nullability** | Optional |
*/
export interface containsIgnoreCase {
kind: "InputField",
name: "containsIgnoreCase",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceTypeComparator}.
*
* Doesn't contain constraint. Matches any values that don't contain the given string.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceTypeComparator} |
* | **Path** | `SourceTypeComparator.notContains` |
* | **Nullability** | Optional |
*/
export interface notContains {
kind: "InputField",
name: "notContains",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceTypeComparator}.
*
* Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceTypeComparator} |
* | **Path** | `SourceTypeComparator.notContainsIgnoreCase` |
* | **Nullability** | Optional |
*/
export interface notContainsIgnoreCase {
kind: "InputField",
name: "notContainsIgnoreCase",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceTypeComparator}.
*
* Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceTypeComparator} |
* | **Path** | `SourceTypeComparator.containsIgnoreCaseAndAccent` |
* | **Nullability** | Optional |
*/
export interface containsIgnoreCaseAndAccent {
kind: "InputField",
name: "containsIgnoreCaseAndAccent",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}