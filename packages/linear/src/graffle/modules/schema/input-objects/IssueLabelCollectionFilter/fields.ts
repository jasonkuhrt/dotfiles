import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCollectionFilter}.
*
* Comparator for the identifier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IDComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabelCollectionFilter} |
* | **Path** | `IssueLabelCollectionFilter.id` |
* | **Nullability** | Optional |
*/
export interface id {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.IDComparator,
type: $Schema.IDComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCollectionFilter}.
*
* Comparator for the created at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabelCollectionFilter} |
* | **Path** | `IssueLabelCollectionFilter.createdAt` |
* | **Nullability** | Optional |
*/
export interface createdAt {
kind: "InputField",
name: "createdAt",
inlineType: [0, ],
namedType: $Schema.DateComparator,
type: $Schema.DateComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCollectionFilter}.
*
* Comparator for the updated at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabelCollectionFilter} |
* | **Path** | `IssueLabelCollectionFilter.updatedAt` |
* | **Nullability** | Optional |
*/
export interface updatedAt {
kind: "InputField",
name: "updatedAt",
inlineType: [0, ],
namedType: $Schema.DateComparator,
type: $Schema.DateComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCollectionFilter}.
*
* Comparator for the name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabelCollectionFilter} |
* | **Path** | `IssueLabelCollectionFilter.name` |
* | **Nullability** | Optional |
*/
export interface name {
kind: "InputField",
name: "name",
inlineType: [0, ],
namedType: $Schema.StringComparator,
type: $Schema.StringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCollectionFilter}.
*
* Comparator for whether the label is a group label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.BooleanComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabelCollectionFilter} |
* | **Path** | `IssueLabelCollectionFilter.isGroup` |
* | **Nullability** | Optional |
*/
export interface isGroup {
kind: "InputField",
name: "isGroup",
inlineType: [0, ],
namedType: $Schema.BooleanComparator,
type: $Schema.BooleanComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCollectionFilter}.
*
* Filters that the issue labels creator must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableUserFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabelCollectionFilter} |
* | **Path** | `IssueLabelCollectionFilter.creator` |
* | **Nullability** | Optional |
*/
export interface creator {
kind: "InputField",
name: "creator",
inlineType: [0, ],
namedType: $Schema.NullableUserFilter,
type: $Schema.NullableUserFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCollectionFilter}.
*
* Filters that the issue labels team must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableTeamFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabelCollectionFilter} |
* | **Path** | `IssueLabelCollectionFilter.team` |
* | **Nullability** | Optional |
*/
export interface team {
kind: "InputField",
name: "team",
inlineType: [0, ],
namedType: $Schema.NullableTeamFilter,
type: $Schema.NullableTeamFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCollectionFilter}.
*
* Filters that the issue label's parent label must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabelCollectionFilter} |
* | **Path** | `IssueLabelCollectionFilter.parent` |
* | **Nullability** | Optional |
*/
export interface parent {
kind: "InputField",
name: "parent",
inlineType: [0, ],
namedType: $Schema.IssueLabelFilter,
type: $Schema.IssueLabelFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCollectionFilter}.
*
* Filter based on the existence of the relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueLabelCollectionFilter} |
* | **Path** | `IssueLabelCollectionFilter.null` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCollectionFilter}.
*
* Compound filters, all of which need to be matched by the label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelCollectionFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabelCollectionFilter} |
* | **Path** | `IssueLabelCollectionFilter.and` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface and {
kind: "InputField",
name: "and",
inlineType: [0, [1, ]],
namedType: $Schema.IssueLabelCollectionFilter,
type: readonly ($Schema.IssueLabelCollectionFilter['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCollectionFilter}.
*
* Compound filters, one of which need to be matched by the label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelCollectionFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabelCollectionFilter} |
* | **Path** | `IssueLabelCollectionFilter.or` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface or {
kind: "InputField",
name: "or",
inlineType: [0, [1, ]],
namedType: $Schema.IssueLabelCollectionFilter,
type: readonly ($Schema.IssueLabelCollectionFilter['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCollectionFilter}.
*
* Filters that needs to be matched by some issue labels.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabelCollectionFilter} |
* | **Path** | `IssueLabelCollectionFilter.some` |
* | **Nullability** | Optional |
*/
export interface some {
kind: "InputField",
name: "some",
inlineType: [0, ],
namedType: $Schema.IssueLabelFilter,
type: $Schema.IssueLabelFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCollectionFilter}.
*
* Filters that needs to be matched by all issue labels.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabelCollectionFilter} |
* | **Path** | `IssueLabelCollectionFilter.every` |
* | **Nullability** | Optional |
*/
export interface every {
kind: "InputField",
name: "every",
inlineType: [0, ],
namedType: $Schema.IssueLabelFilter,
type: $Schema.IssueLabelFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCollectionFilter}.
*
* Comparator for the collection length.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NumberComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabelCollectionFilter} |
* | **Path** | `IssueLabelCollectionFilter.length` |
* | **Nullability** | Optional |
*/
export interface length {
kind: "InputField",
name: "length",
inlineType: [0, ],
namedType: $Schema.NumberComparator,
type: $Schema.NumberComparator['type'] | null | undefined
}