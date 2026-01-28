import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectMilestoneCollectionFilter}.
*
* Comparator for the identifier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IDComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneCollectionFilter} |
* | **Path** | `ProjectMilestoneCollectionFilter.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectMilestoneCollectionFilter}.
*
* Comparator for the created at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneCollectionFilter} |
* | **Path** | `ProjectMilestoneCollectionFilter.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectMilestoneCollectionFilter}.
*
* Comparator for the updated at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneCollectionFilter} |
* | **Path** | `ProjectMilestoneCollectionFilter.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectMilestoneCollectionFilter}.
*
* Comparator for the project milestone name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableStringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneCollectionFilter} |
* | **Path** | `ProjectMilestoneCollectionFilter.name` |
* | **Nullability** | Optional |
*/
export interface name {
kind: "InputField",
name: "name",
inlineType: [0, ],
namedType: $Schema.NullableStringComparator,
type: $Schema.NullableStringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectMilestoneCollectionFilter}.
*
* Comparator for the project milestone target date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneCollectionFilter} |
* | **Path** | `ProjectMilestoneCollectionFilter.targetDate` |
* | **Nullability** | Optional |
*/
export interface targetDate {
kind: "InputField",
name: "targetDate",
inlineType: [0, ],
namedType: $Schema.NullableDateComparator,
type: $Schema.NullableDateComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectMilestoneCollectionFilter}.
*
* Filters that the project milestone's project must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableProjectFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneCollectionFilter} |
* | **Path** | `ProjectMilestoneCollectionFilter.project` |
* | **Nullability** | Optional |
*/
export interface project {
kind: "InputField",
name: "project",
inlineType: [0, ],
namedType: $Schema.NullableProjectFilter,
type: $Schema.NullableProjectFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectMilestoneCollectionFilter}.
*
* Compound filters, all of which need to be matched by the milestone.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestoneCollectionFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneCollectionFilter} |
* | **Path** | `ProjectMilestoneCollectionFilter.and` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface and {
kind: "InputField",
name: "and",
inlineType: [0, [1, ]],
namedType: $Schema.ProjectMilestoneCollectionFilter,
type: readonly ($Schema.ProjectMilestoneCollectionFilter['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectMilestoneCollectionFilter}.
*
* Compound filters, one of which need to be matched by the milestone.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestoneCollectionFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneCollectionFilter} |
* | **Path** | `ProjectMilestoneCollectionFilter.or` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface or {
kind: "InputField",
name: "or",
inlineType: [0, [1, ]],
namedType: $Schema.ProjectMilestoneCollectionFilter,
type: readonly ($Schema.ProjectMilestoneCollectionFilter['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectMilestoneCollectionFilter}.
*
* Filters that needs to be matched by some milestones.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestoneFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneCollectionFilter} |
* | **Path** | `ProjectMilestoneCollectionFilter.some` |
* | **Nullability** | Optional |
*/
export interface some {
kind: "InputField",
name: "some",
inlineType: [0, ],
namedType: $Schema.ProjectMilestoneFilter,
type: $Schema.ProjectMilestoneFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectMilestoneCollectionFilter}.
*
* Filters that needs to be matched by all milestones.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestoneFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneCollectionFilter} |
* | **Path** | `ProjectMilestoneCollectionFilter.every` |
* | **Nullability** | Optional |
*/
export interface every {
kind: "InputField",
name: "every",
inlineType: [0, ],
namedType: $Schema.ProjectMilestoneFilter,
type: $Schema.ProjectMilestoneFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectMilestoneCollectionFilter}.
*
* Comparator for the collection length.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NumberComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectMilestoneCollectionFilter} |
* | **Path** | `ProjectMilestoneCollectionFilter.length` |
* | **Nullability** | Optional |
*/
export interface length {
kind: "InputField",
name: "length",
inlineType: [0, ],
namedType: $Schema.NumberComparator,
type: $Schema.NumberComparator['type'] | null | undefined
}