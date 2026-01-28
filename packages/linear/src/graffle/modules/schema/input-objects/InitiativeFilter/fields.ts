import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeFilter}.
*
* Comparator for the identifier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IDComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeFilter} |
* | **Path** | `InitiativeFilter.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeFilter}.
*
* Comparator for the created at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeFilter} |
* | **Path** | `InitiativeFilter.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeFilter}.
*
* Comparator for the updated at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeFilter} |
* | **Path** | `InitiativeFilter.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeFilter}.
*
* Comparator for the initiative name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeFilter} |
* | **Path** | `InitiativeFilter.name` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeFilter}.
*
* Comparator for the initiative slug ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeFilter} |
* | **Path** | `InitiativeFilter.slugId` |
* | **Nullability** | Optional |
*/
export interface slugId {
kind: "InputField",
name: "slugId",
inlineType: [0, ],
namedType: $Schema.StringComparator,
type: $Schema.StringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeFilter}.
*
* Filters that the initiative creator must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableUserFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeFilter} |
* | **Path** | `InitiativeFilter.creator` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeFilter}.
*
* Comparator for the initiative status: Planned, Active, Completed
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeFilter} |
* | **Path** | `InitiativeFilter.status` |
* | **Nullability** | Optional |
*/
export interface status {
kind: "InputField",
name: "status",
inlineType: [0, ],
namedType: $Schema.StringComparator,
type: $Schema.StringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeFilter}.
*
* Filters that the initiative teams must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeFilter} |
* | **Path** | `InitiativeFilter.teams` |
* | **Nullability** | Optional |
*/
export interface teams {
kind: "InputField",
name: "teams",
inlineType: [0, ],
namedType: $Schema.TeamCollectionFilter,
type: $Schema.TeamCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeFilter}.
*
* Filters that the initiative owner must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableUserFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeFilter} |
* | **Path** | `InitiativeFilter.owner` |
* | **Nullability** | Optional |
*/
export interface owner {
kind: "InputField",
name: "owner",
inlineType: [0, ],
namedType: $Schema.NullableUserFilter,
type: $Schema.NullableUserFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeFilter}.
*
* Comparator for the initiative target date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeFilter} |
* | **Path** | `InitiativeFilter.targetDate` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeFilter}.
*
* Comparator for the initiative health: onTrack, atRisk, offTrack
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeFilter} |
* | **Path** | `InitiativeFilter.health` |
* | **Nullability** | Optional |
*/
export interface health {
kind: "InputField",
name: "health",
inlineType: [0, ],
namedType: $Schema.StringComparator,
type: $Schema.StringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeFilter}.
*
* Comparator for the initiative health (with age): onTrack, atRisk, offTrack, outdated, noUpdate
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeFilter} |
* | **Path** | `InitiativeFilter.healthWithAge` |
* | **Nullability** | Optional |
*/
export interface healthWithAge {
kind: "InputField",
name: "healthWithAge",
inlineType: [0, ],
namedType: $Schema.StringComparator,
type: $Schema.StringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeFilter}.
*
* Comparator for the initiative activity type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeFilter} |
* | **Path** | `InitiativeFilter.activityType` |
* | **Nullability** | Optional |
*/
export interface activityType {
kind: "InputField",
name: "activityType",
inlineType: [0, ],
namedType: $Schema.StringComparator,
type: $Schema.StringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeFilter}.
*
* Filters that the initiative must be an ancestor of.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeFilter} |
* | **Path** | `InitiativeFilter.ancestors` |
* | **Nullability** | Optional |
*/
export interface ancestors {
kind: "InputField",
name: "ancestors",
inlineType: [0, ],
namedType: $Schema.InitiativeCollectionFilter,
type: $Schema.InitiativeCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeFilter}.
*
* Compound filters, all of which need to be matched by the initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeFilter} |
* | **Path** | `InitiativeFilter.and` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface and {
kind: "InputField",
name: "and",
inlineType: [0, [1, ]],
namedType: $Schema.InitiativeFilter,
type: readonly ($Schema.InitiativeFilter['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeFilter}.
*
* Compound filters, one of which need to be matched by the initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.InitiativeFilter} |
* | **Path** | `InitiativeFilter.or` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface or {
kind: "InputField",
name: "or",
inlineType: [0, [1, ]],
namedType: $Schema.InitiativeFilter,
type: readonly ($Schema.InitiativeFilter['type'])[] | null | undefined
}