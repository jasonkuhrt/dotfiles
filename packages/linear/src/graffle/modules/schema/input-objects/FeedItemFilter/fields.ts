import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FeedItemFilter}.
*
* Comparator for the identifier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IDComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.FeedItemFilter} |
* | **Path** | `FeedItemFilter.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FeedItemFilter}.
*
* Comparator for the created at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.FeedItemFilter} |
* | **Path** | `FeedItemFilter.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FeedItemFilter}.
*
* Comparator for the updated at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.FeedItemFilter} |
* | **Path** | `FeedItemFilter.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FeedItemFilter}.
*
* Filters that the feed item author must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.FeedItemFilter} |
* | **Path** | `FeedItemFilter.author` |
* | **Nullability** | Optional |
*/
export interface author {
kind: "InputField",
name: "author",
inlineType: [0, ],
namedType: $Schema.UserFilter,
type: $Schema.UserFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FeedItemFilter}.
*
* Comparator for the update type: initiative, project, team
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.FeedItemFilter} |
* | **Path** | `FeedItemFilter.updateType` |
* | **Nullability** | Optional |
*/
export interface updateType {
kind: "InputField",
name: "updateType",
inlineType: [0, ],
namedType: $Schema.StringComparator,
type: $Schema.StringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FeedItemFilter}.
*
* Comparator for the project or initiative update health: onTrack, atRisk, offTrack
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.FeedItemFilter} |
* | **Path** | `FeedItemFilter.updateHealth` |
* | **Nullability** | Optional |
*/
export interface updateHealth {
kind: "InputField",
name: "updateHealth",
inlineType: [0, ],
namedType: $Schema.StringComparator,
type: $Schema.StringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FeedItemFilter}.
*
* Filters that the feed item's project update must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdateFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.FeedItemFilter} |
* | **Path** | `FeedItemFilter.projectUpdate` |
* | **Nullability** | Optional |
*/
export interface projectUpdate {
kind: "InputField",
name: "projectUpdate",
inlineType: [0, ],
namedType: $Schema.ProjectUpdateFilter,
type: $Schema.ProjectUpdateFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FeedItemFilter}.
*
* Filters that the related feed item initiatives must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.FeedItemFilter} |
* | **Path** | `FeedItemFilter.relatedInitiatives` |
* | **Nullability** | Optional |
*/
export interface relatedInitiatives {
kind: "InputField",
name: "relatedInitiatives",
inlineType: [0, ],
namedType: $Schema.InitiativeCollectionFilter,
type: $Schema.InitiativeCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FeedItemFilter}.
*
* Filters that the related feed item team must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.FeedItemFilter} |
* | **Path** | `FeedItemFilter.relatedTeams` |
* | **Nullability** | Optional |
*/
export interface relatedTeams {
kind: "InputField",
name: "relatedTeams",
inlineType: [0, ],
namedType: $Schema.TeamCollectionFilter,
type: $Schema.TeamCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FeedItemFilter}.
*
* Compound filters, all of which need to be matched by the feed item.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FeedItemFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.FeedItemFilter} |
* | **Path** | `FeedItemFilter.and` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface and {
kind: "InputField",
name: "and",
inlineType: [0, [1, ]],
namedType: $Schema.FeedItemFilter,
type: readonly ($Schema.FeedItemFilter['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FeedItemFilter}.
*
* Compound filters, one of which need to be matched by the feed item.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FeedItemFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.FeedItemFilter} |
* | **Path** | `FeedItemFilter.or` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface or {
kind: "InputField",
name: "or",
inlineType: [0, [1, ]],
namedType: $Schema.FeedItemFilter,
type: readonly ($Schema.FeedItemFilter['type'])[] | null | undefined
}