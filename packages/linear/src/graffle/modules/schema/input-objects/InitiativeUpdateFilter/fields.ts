import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateFilter}.
*
* Comparator for the identifier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IDComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateFilter} |
* | **Path** | `InitiativeUpdateFilter.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateFilter}.
*
* Comparator for the created at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateFilter} |
* | **Path** | `InitiativeUpdateFilter.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateFilter}.
*
* Comparator for the updated at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateFilter} |
* | **Path** | `InitiativeUpdateFilter.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateFilter}.
*
* Filters that the initiative update creator must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateFilter} |
* | **Path** | `InitiativeUpdateFilter.user` |
* | **Nullability** | Optional |
*/
export interface user {
kind: "InputField",
name: "user",
inlineType: [0, ],
namedType: $Schema.UserFilter,
type: $Schema.UserFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateFilter}.
*
* Filters that the initiative update initiative must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateFilter} |
* | **Path** | `InitiativeUpdateFilter.initiative` |
* | **Nullability** | Optional |
*/
export interface initiative {
kind: "InputField",
name: "initiative",
inlineType: [0, ],
namedType: $Schema.InitiativeFilter,
type: $Schema.InitiativeFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateFilter}.
*
* Filters that the initiative updates reactions must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReactionCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateFilter} |
* | **Path** | `InitiativeUpdateFilter.reactions` |
* | **Nullability** | Optional |
*/
export interface reactions {
kind: "InputField",
name: "reactions",
inlineType: [0, ],
namedType: $Schema.ReactionCollectionFilter,
type: $Schema.ReactionCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateFilter}.
*
* Compound filters, all of which need to be matched by the InitiativeUpdate.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdateFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateFilter} |
* | **Path** | `InitiativeUpdateFilter.and` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface and {
kind: "InputField",
name: "and",
inlineType: [0, [1, ]],
namedType: $Schema.InitiativeUpdateFilter,
type: readonly ($Schema.InitiativeUpdateFilter['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateFilter}.
*
* Compound filters, one of which need to be matched by the InitiativeUpdate.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdateFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateFilter} |
* | **Path** | `InitiativeUpdateFilter.or` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface or {
kind: "InputField",
name: "or",
inlineType: [0, [1, ]],
namedType: $Schema.InitiativeUpdateFilter,
type: readonly ($Schema.InitiativeUpdateFilter['type'])[] | null | undefined
}