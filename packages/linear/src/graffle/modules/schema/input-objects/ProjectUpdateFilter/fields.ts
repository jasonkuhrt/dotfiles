import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateFilter}.
*
* Comparator for the identifier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IDComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateFilter} |
* | **Path** | `ProjectUpdateFilter.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateFilter}.
*
* Comparator for the created at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateFilter} |
* | **Path** | `ProjectUpdateFilter.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateFilter}.
*
* Comparator for the updated at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateFilter} |
* | **Path** | `ProjectUpdateFilter.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateFilter}.
*
* Filters that the project update creator must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateFilter} |
* | **Path** | `ProjectUpdateFilter.user` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateFilter}.
*
* Filters that the project update project must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateFilter} |
* | **Path** | `ProjectUpdateFilter.project` |
* | **Nullability** | Optional |
*/
export interface project {
kind: "InputField",
name: "project",
inlineType: [0, ],
namedType: $Schema.ProjectFilter,
type: $Schema.ProjectFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateFilter}.
*
* Filters that the project updates reactions must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReactionCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateFilter} |
* | **Path** | `ProjectUpdateFilter.reactions` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateFilter}.
*
* Compound filters, all of which need to be matched by the ProjectUpdate.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdateFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateFilter} |
* | **Path** | `ProjectUpdateFilter.and` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface and {
kind: "InputField",
name: "and",
inlineType: [0, [1, ]],
namedType: $Schema.ProjectUpdateFilter,
type: readonly ($Schema.ProjectUpdateFilter['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateFilter}.
*
* Compound filters, one of which need to be matched by the ProjectUpdate.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdateFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateFilter} |
* | **Path** | `ProjectUpdateFilter.or` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface or {
kind: "InputField",
name: "or",
inlineType: [0, [1, ]],
namedType: $Schema.ProjectUpdateFilter,
type: readonly ($Schema.ProjectUpdateFilter['type'])[] | null | undefined
}