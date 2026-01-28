import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.StringArrayComparator}.
*
* Length of the array. Matches any values that have the given length.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NumberComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.StringArrayComparator} |
* | **Path** | `StringArrayComparator.length` |
* | **Nullability** | Optional |
*/
export interface length {
kind: "InputField",
name: "length",
inlineType: [0, ],
namedType: $Schema.NumberComparator,
type: $Schema.NumberComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.StringArrayComparator}.
*
* Compound filters, all of which need to be matched.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringItemComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.StringArrayComparator} |
* | **Path** | `StringArrayComparator.every` |
* | **Nullability** | Optional |
*/
export interface every {
kind: "InputField",
name: "every",
inlineType: [0, ],
namedType: $Schema.StringItemComparator,
type: $Schema.StringItemComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.StringArrayComparator}.
*
* Compound filters, one of which needs to be matched.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringItemComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.StringArrayComparator} |
* | **Path** | `StringArrayComparator.some` |
* | **Nullability** | Optional |
*/
export interface some {
kind: "InputField",
name: "some",
inlineType: [0, ],
namedType: $Schema.StringItemComparator,
type: $Schema.StringItemComparator['type'] | null | undefined
}