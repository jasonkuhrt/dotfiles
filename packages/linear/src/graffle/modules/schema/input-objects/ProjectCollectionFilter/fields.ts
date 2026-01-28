import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Comparator for the identifier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IDComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Comparator for the created at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Comparator for the updated at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Comparator for the project name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.name` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Comparator for the project slug ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.slugId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* [DEPRECATED] Comparator for the project state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.state` |
* | **Nullability** | Optional |
*/
export interface state {
kind: "InputField",
name: "state",
inlineType: [0, ],
namedType: $Schema.StringComparator,
type: $Schema.StringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Filters that the project's status must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectStatusFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.status` |
* | **Nullability** | Optional |
*/
export interface status {
kind: "InputField",
name: "status",
inlineType: [0, ],
namedType: $Schema.ProjectStatusFilter,
type: $Schema.ProjectStatusFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Comparator for the projects priority.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableNumberComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.priority` |
* | **Nullability** | Optional |
*/
export interface priority {
kind: "InputField",
name: "priority",
inlineType: [0, ],
namedType: $Schema.NullableNumberComparator,
type: $Schema.NullableNumberComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Filters that project labels must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectLabelCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.labels` |
* | **Nullability** | Optional |
*/
export interface labels {
kind: "InputField",
name: "labels",
inlineType: [0, ],
namedType: $Schema.ProjectLabelCollectionFilter,
type: $Schema.ProjectLabelCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* [Internal] Comparator for the project's content.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ContentComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.searchableContent` |
* | **Nullability** | Optional |
*/
export interface searchableContent {
kind: "InputField",
name: "searchableContent",
inlineType: [0, ],
namedType: $Schema.ContentComparator,
type: $Schema.ContentComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Comparator for the project started date (when it was moved to an "In Progress" status).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.startedAt` |
* | **Nullability** | Optional |
*/
export interface startedAt {
kind: "InputField",
name: "startedAt",
inlineType: [0, ],
namedType: $Schema.NullableDateComparator,
type: $Schema.NullableDateComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Comparator for the project completion date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.completedAt` |
* | **Nullability** | Optional |
*/
export interface completedAt {
kind: "InputField",
name: "completedAt",
inlineType: [0, ],
namedType: $Schema.NullableDateComparator,
type: $Schema.NullableDateComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Comparator for the project cancelation date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.canceledAt` |
* | **Nullability** | Optional |
*/
export interface canceledAt {
kind: "InputField",
name: "canceledAt",
inlineType: [0, ],
namedType: $Schema.NullableDateComparator,
type: $Schema.NullableDateComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Comparator for the project start date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.startDate` |
* | **Nullability** | Optional |
*/
export interface startDate {
kind: "InputField",
name: "startDate",
inlineType: [0, ],
namedType: $Schema.NullableDateComparator,
type: $Schema.NullableDateComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Comparator for the project target date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.targetDate` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Comparator for the project health: onTrack, atRisk, offTrack
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.health` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Comparator for the project health (with age): onTrack, atRisk, offTrack, outdated, noUpdate
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.healthWithAge` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* [ALPHA] Comparator for the project activity type: buzzin, active, some, none
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.activityType` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Comparator for filtering projects with relations.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RelationExistsComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.hasRelatedRelations` |
* | **Nullability** | Optional |
*/
export interface hasRelatedRelations {
kind: "InputField",
name: "hasRelatedRelations",
inlineType: [0, ],
namedType: $Schema.RelationExistsComparator,
type: $Schema.RelationExistsComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* [Deprecated] Comparator for filtering projects which this is depended on by.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RelationExistsComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.hasDependedOnByRelations` |
* | **Nullability** | Optional |
*/
export interface hasDependedOnByRelations {
kind: "InputField",
name: "hasDependedOnByRelations",
inlineType: [0, ],
namedType: $Schema.RelationExistsComparator,
type: $Schema.RelationExistsComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* [Deprecated]Comparator for filtering projects which this depends on.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RelationExistsComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.hasDependsOnRelations` |
* | **Nullability** | Optional |
*/
export interface hasDependsOnRelations {
kind: "InputField",
name: "hasDependsOnRelations",
inlineType: [0, ],
namedType: $Schema.RelationExistsComparator,
type: $Schema.RelationExistsComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Comparator for filtering projects which are blocked.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RelationExistsComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.hasBlockedByRelations` |
* | **Nullability** | Optional |
*/
export interface hasBlockedByRelations {
kind: "InputField",
name: "hasBlockedByRelations",
inlineType: [0, ],
namedType: $Schema.RelationExistsComparator,
type: $Schema.RelationExistsComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Comparator for filtering projects which are blocking.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RelationExistsComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.hasBlockingRelations` |
* | **Nullability** | Optional |
*/
export interface hasBlockingRelations {
kind: "InputField",
name: "hasBlockingRelations",
inlineType: [0, ],
namedType: $Schema.RelationExistsComparator,
type: $Schema.RelationExistsComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Comparator for filtering projects with violated dependencies.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RelationExistsComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.hasViolatedRelations` |
* | **Nullability** | Optional |
*/
export interface hasViolatedRelations {
kind: "InputField",
name: "hasViolatedRelations",
inlineType: [0, ],
namedType: $Schema.RelationExistsComparator,
type: $Schema.RelationExistsComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Comparator for the project updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdatesCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.projectUpdates` |
* | **Nullability** | Optional |
*/
export interface projectUpdates {
kind: "InputField",
name: "projectUpdates",
inlineType: [0, ],
namedType: $Schema.ProjectUpdatesCollectionFilter,
type: $Schema.ProjectUpdatesCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Filters that the projects creator must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.creator` |
* | **Nullability** | Optional |
*/
export interface creator {
kind: "InputField",
name: "creator",
inlineType: [0, ],
namedType: $Schema.UserFilter,
type: $Schema.UserFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Filters that the projects lead must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableUserFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.lead` |
* | **Nullability** | Optional |
*/
export interface lead {
kind: "InputField",
name: "lead",
inlineType: [0, ],
namedType: $Schema.NullableUserFilter,
type: $Schema.NullableUserFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Filters that the projects members must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.members` |
* | **Nullability** | Optional |
*/
export interface members {
kind: "InputField",
name: "members",
inlineType: [0, ],
namedType: $Schema.UserCollectionFilter,
type: $Schema.UserCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Filters that the projects issues must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.issues` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Filters that the projects roadmaps must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.roadmaps` |
* | **Nullability** | Optional |
*/
export interface roadmaps {
kind: "InputField",
name: "roadmaps",
inlineType: [0, ],
namedType: $Schema.RoadmapCollectionFilter,
type: $Schema.RoadmapCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Filters that the projects initiatives must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.initiatives` |
* | **Nullability** | Optional |
*/
export interface initiatives {
kind: "InputField",
name: "initiatives",
inlineType: [0, ],
namedType: $Schema.InitiativeCollectionFilter,
type: $Schema.InitiativeCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Filters that the project's milestones must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestoneCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.projectMilestones` |
* | **Nullability** | Optional |
*/
export interface projectMilestones {
kind: "InputField",
name: "projectMilestones",
inlineType: [0, ],
namedType: $Schema.ProjectMilestoneCollectionFilter,
type: $Schema.ProjectMilestoneCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Filters that the project's completed milestones must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestoneCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.completedProjectMilestones` |
* | **Nullability** | Optional |
*/
export interface completedProjectMilestones {
kind: "InputField",
name: "completedProjectMilestones",
inlineType: [0, ],
namedType: $Schema.ProjectMilestoneCollectionFilter,
type: $Schema.ProjectMilestoneCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Filters that the project's next milestone must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestoneFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.nextProjectMilestone` |
* | **Nullability** | Optional |
*/
export interface nextProjectMilestone {
kind: "InputField",
name: "nextProjectMilestone",
inlineType: [0, ],
namedType: $Schema.ProjectMilestoneFilter,
type: $Schema.ProjectMilestoneFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Filters that the project's team must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.accessibleTeams` |
* | **Nullability** | Optional |
*/
export interface accessibleTeams {
kind: "InputField",
name: "accessibleTeams",
inlineType: [0, ],
namedType: $Schema.TeamCollectionFilter,
type: $Schema.TeamCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Filters that the last applied template must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableTemplateFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.lastAppliedTemplate` |
* | **Nullability** | Optional |
*/
export interface lastAppliedTemplate {
kind: "InputField",
name: "lastAppliedTemplate",
inlineType: [0, ],
namedType: $Schema.NullableTemplateFilter,
type: $Schema.NullableTemplateFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Filters that the project's customer needs must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.needs` |
* | **Nullability** | Optional |
*/
export interface needs {
kind: "InputField",
name: "needs",
inlineType: [0, ],
namedType: $Schema.CustomerNeedCollectionFilter,
type: $Schema.CustomerNeedCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Count of customers
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NumberComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.customerCount` |
* | **Nullability** | Optional |
*/
export interface customerCount {
kind: "InputField",
name: "customerCount",
inlineType: [0, ],
namedType: $Schema.NumberComparator,
type: $Schema.NumberComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Count of important customers
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NumberComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.customerImportantCount` |
* | **Nullability** | Optional |
*/
export interface customerImportantCount {
kind: "InputField",
name: "customerImportantCount",
inlineType: [0, ],
namedType: $Schema.NumberComparator,
type: $Schema.NumberComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Compound filters, all of which need to be matched by the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectCollectionFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.and` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface and {
kind: "InputField",
name: "and",
inlineType: [0, [1, ]],
namedType: $Schema.ProjectCollectionFilter,
type: readonly ($Schema.ProjectCollectionFilter['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Compound filters, one of which need to be matched by the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectCollectionFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.or` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface or {
kind: "InputField",
name: "or",
inlineType: [0, [1, ]],
namedType: $Schema.ProjectCollectionFilter,
type: readonly ($Schema.ProjectCollectionFilter['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Filters that needs to be matched by some projects.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.some` |
* | **Nullability** | Optional |
*/
export interface some {
kind: "InputField",
name: "some",
inlineType: [0, ],
namedType: $Schema.ProjectFilter,
type: $Schema.ProjectFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Filters that needs to be matched by all projects.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.every` |
* | **Nullability** | Optional |
*/
export interface every {
kind: "InputField",
name: "every",
inlineType: [0, ],
namedType: $Schema.ProjectFilter,
type: $Schema.ProjectFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectCollectionFilter}.
*
* Comparator for the collection length.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NumberComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ProjectCollectionFilter} |
* | **Path** | `ProjectCollectionFilter.length` |
* | **Nullability** | Optional |
*/
export interface length {
kind: "InputField",
name: "length",
inlineType: [0, ],
namedType: $Schema.NumberComparator,
type: $Schema.NumberComparator['type'] | null | undefined
}