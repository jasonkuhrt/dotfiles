import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableTeamFilter}.
*
* Comparator for the identifier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IDComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NullableTeamFilter} |
* | **Path** | `NullableTeamFilter.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableTeamFilter}.
*
* Comparator for the created at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NullableTeamFilter} |
* | **Path** | `NullableTeamFilter.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableTeamFilter}.
*
* Comparator for the updated at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NullableTeamFilter} |
* | **Path** | `NullableTeamFilter.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableTeamFilter}.
*
* Comparator for the team name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NullableTeamFilter} |
* | **Path** | `NullableTeamFilter.name` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableTeamFilter}.
*
* Comparator for the team key.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NullableTeamFilter} |
* | **Path** | `NullableTeamFilter.key` |
* | **Nullability** | Optional |
*/
export interface key {
kind: "InputField",
name: "key",
inlineType: [0, ],
namedType: $Schema.StringComparator,
type: $Schema.StringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableTeamFilter}.
*
* Comparator for the team description.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableStringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NullableTeamFilter} |
* | **Path** | `NullableTeamFilter.description` |
* | **Nullability** | Optional |
*/
export interface description {
kind: "InputField",
name: "description",
inlineType: [0, ],
namedType: $Schema.NullableStringComparator,
type: $Schema.NullableStringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableTeamFilter}.
*
* Comparator for the team privacy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.BooleanComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NullableTeamFilter} |
* | **Path** | `NullableTeamFilter.private` |
* | **Nullability** | Optional |
*/
interface $private {
kind: "InputField",
name: "private",
inlineType: [0, ],
namedType: $Schema.BooleanComparator,
type: $Schema.BooleanComparator['type'] | null | undefined
}
export { type $private as private }
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableTeamFilter}.
*
* Filters that the teams issues must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NullableTeamFilter} |
* | **Path** | `NullableTeamFilter.issues` |
* | **Nullability** | Optional |
*/
export interface issues {
kind: "InputField",
name: "issues",
inlineType: [0, ],
namedType: $Schema.IssueCollectionFilter,
type: $Schema.IssueCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableTeamFilter}.
*
* Filters that the teams parent must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableTeamFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NullableTeamFilter} |
* | **Path** | `NullableTeamFilter.parent` |
* | **Nullability** | Optional |
*/
export interface parent {
kind: "InputField",
name: "parent",
inlineType: [0, ],
namedType: $Schema.NullableTeamFilter,
type: $Schema.NullableTeamFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableTeamFilter}.
*
* Filter based on the existence of the relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.NullableTeamFilter} |
* | **Path** | `NullableTeamFilter.null` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableTeamFilter}.
*
* Compound filters, all of which need to be matched by the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableTeamFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NullableTeamFilter} |
* | **Path** | `NullableTeamFilter.and` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface and {
kind: "InputField",
name: "and",
inlineType: [0, [1, ]],
namedType: $Schema.NullableTeamFilter,
type: readonly ($Schema.NullableTeamFilter['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.NullableTeamFilter}.
*
* Compound filters, one of which need to be matched by the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableTeamFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.NullableTeamFilter} |
* | **Path** | `NullableTeamFilter.or` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface or {
kind: "InputField",
name: "or",
inlineType: [0, [1, ]],
namedType: $Schema.NullableTeamFilter,
type: readonly ($Schema.NullableTeamFilter['type'])[] | null | undefined
}