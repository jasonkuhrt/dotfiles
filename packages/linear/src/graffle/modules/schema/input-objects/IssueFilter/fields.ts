import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for the identifier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueIDComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.id` |
* | **Nullability** | Optional |
*/
export interface id {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.IssueIDComparator,
type: $Schema.IssueIDComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for the created at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for the updated at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for the issues number.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NumberComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.number` |
* | **Nullability** | Optional |
*/
interface $number {
kind: "InputField",
name: "number",
inlineType: [0, ],
namedType: $Schema.NumberComparator,
type: $Schema.NumberComparator['type'] | null | undefined
}
export { type $number as number }
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for the issues title.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.StringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.title` |
* | **Nullability** | Optional |
*/
export interface title {
kind: "InputField",
name: "title",
inlineType: [0, ],
namedType: $Schema.StringComparator,
type: $Schema.StringComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for the issues description.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableStringComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.description` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for the issues priority. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableNumberComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.priority` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for the issues estimate.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EstimateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.estimate` |
* | **Nullability** | Optional |
*/
export interface estimate {
kind: "InputField",
name: "estimate",
inlineType: [0, ],
namedType: $Schema.EstimateComparator,
type: $Schema.EstimateComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for the issues started at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.startedAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for the issues triaged at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.triagedAt` |
* | **Nullability** | Optional |
*/
export interface triagedAt {
kind: "InputField",
name: "triagedAt",
inlineType: [0, ],
namedType: $Schema.NullableDateComparator,
type: $Schema.NullableDateComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for the issues completed at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.completedAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for the issues canceled at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.canceledAt` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for the issues archived at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.archivedAt` |
* | **Nullability** | Optional |
*/
export interface archivedAt {
kind: "InputField",
name: "archivedAt",
inlineType: [0, ],
namedType: $Schema.NullableDateComparator,
type: $Schema.NullableDateComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for the issues auto closed at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.autoClosedAt` |
* | **Nullability** | Optional |
*/
export interface autoClosedAt {
kind: "InputField",
name: "autoClosedAt",
inlineType: [0, ],
namedType: $Schema.NullableDateComparator,
type: $Schema.NullableDateComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for the issues auto archived at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.autoArchivedAt` |
* | **Nullability** | Optional |
*/
export interface autoArchivedAt {
kind: "InputField",
name: "autoArchivedAt",
inlineType: [0, ],
namedType: $Schema.NullableDateComparator,
type: $Schema.NullableDateComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for the issues added to cycle at date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.addedToCycleAt` |
* | **Nullability** | Optional |
*/
export interface addedToCycleAt {
kind: "InputField",
name: "addedToCycleAt",
inlineType: [0, ],
namedType: $Schema.NullableDateComparator,
type: $Schema.NullableDateComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for the period when issue was added to a cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CyclePeriodComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.addedToCyclePeriod` |
* | **Nullability** | Optional |
*/
export interface addedToCyclePeriod {
kind: "InputField",
name: "addedToCyclePeriod",
inlineType: [0, ],
namedType: $Schema.CyclePeriodComparator,
type: $Schema.CyclePeriodComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for the issues due date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableTimelessDateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.dueDate` |
* | **Nullability** | Optional |
*/
export interface dueDate {
kind: "InputField",
name: "dueDate",
inlineType: [0, ],
namedType: $Schema.NullableTimelessDateComparator,
type: $Schema.NullableTimelessDateComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* [Internal] Comparator for the issue's accumulatedStateUpdatedAt date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.accumulatedStateUpdatedAt` |
* | **Nullability** | Optional |
*/
export interface accumulatedStateUpdatedAt {
kind: "InputField",
name: "accumulatedStateUpdatedAt",
inlineType: [0, ],
namedType: $Schema.NullableDateComparator,
type: $Schema.NullableDateComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for the issues snoozed until date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDateComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.snoozedUntilAt` |
* | **Nullability** | Optional |
*/
export interface snoozedUntilAt {
kind: "InputField",
name: "snoozedUntilAt",
inlineType: [0, ],
namedType: $Schema.NullableDateComparator,
type: $Schema.NullableDateComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Filters that the issues assignee must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableUserFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.assignee` |
* | **Nullability** | Optional |
*/
export interface assignee {
kind: "InputField",
name: "assignee",
inlineType: [0, ],
namedType: $Schema.NullableUserFilter,
type: $Schema.NullableUserFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Filters that the issue's delegated agent must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableUserFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.delegate` |
* | **Nullability** | Optional |
*/
export interface delegate {
kind: "InputField",
name: "delegate",
inlineType: [0, ],
namedType: $Schema.NullableUserFilter,
type: $Schema.NullableUserFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Filters that the last applied template must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableTemplateFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.lastAppliedTemplate` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* [ALPHA] Filters that the recurring issue template must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableTemplateFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.recurringIssueTemplate` |
* | **Nullability** | Optional |
*/
export interface recurringIssueTemplate {
kind: "InputField",
name: "recurringIssueTemplate",
inlineType: [0, ],
namedType: $Schema.NullableTemplateFilter,
type: $Schema.NullableTemplateFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Filters that the source must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SourceMetadataComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.sourceMetadata` |
* | **Nullability** | Optional |
*/
export interface sourceMetadata {
kind: "InputField",
name: "sourceMetadata",
inlineType: [0, ],
namedType: $Schema.SourceMetadataComparator,
type: $Schema.SourceMetadataComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Filters that the issues creator must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableUserFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.creator` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Filters that the issue parent must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableIssueFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.parent` |
* | **Nullability** | Optional |
*/
export interface parent {
kind: "InputField",
name: "parent",
inlineType: [0, ],
namedType: $Schema.NullableIssueFilter,
type: $Schema.NullableIssueFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Filters that the issues snoozer must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableUserFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.snoozedBy` |
* | **Nullability** | Optional |
*/
export interface snoozedBy {
kind: "InputField",
name: "snoozedBy",
inlineType: [0, ],
namedType: $Schema.NullableUserFilter,
type: $Schema.NullableUserFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Filters that issue labels must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.labels` |
* | **Nullability** | Optional |
*/
export interface labels {
kind: "InputField",
name: "labels",
inlineType: [0, ],
namedType: $Schema.IssueLabelCollectionFilter,
type: $Schema.IssueLabelCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Filters that issue subscribers must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.subscribers` |
* | **Nullability** | Optional |
*/
export interface subscribers {
kind: "InputField",
name: "subscribers",
inlineType: [0, ],
namedType: $Schema.UserCollectionFilter,
type: $Schema.UserCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for filtering issues which have been shared with users outside of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RelationExistsComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.hasSharedUsers` |
* | **Nullability** | Optional |
*/
export interface hasSharedUsers {
kind: "InputField",
name: "hasSharedUsers",
inlineType: [0, ],
namedType: $Schema.RelationExistsComparator,
type: $Schema.RelationExistsComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Filters that users the issue has been shared with must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.sharedWith` |
* | **Nullability** | Optional |
*/
export interface sharedWith {
kind: "InputField",
name: "sharedWith",
inlineType: [0, ],
namedType: $Schema.UserCollectionFilter,
type: $Schema.UserCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Filters that the issues team must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.team` |
* | **Nullability** | Optional |
*/
export interface team {
kind: "InputField",
name: "team",
inlineType: [0, ],
namedType: $Schema.TeamFilter,
type: $Schema.TeamFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Filters that the issues project milestone must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableProjectMilestoneFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.projectMilestone` |
* | **Nullability** | Optional |
*/
export interface projectMilestone {
kind: "InputField",
name: "projectMilestone",
inlineType: [0, ],
namedType: $Schema.NullableProjectMilestoneFilter,
type: $Schema.NullableProjectMilestoneFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Filters that the issues comments must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CommentCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.comments` |
* | **Nullability** | Optional |
*/
export interface comments {
kind: "InputField",
name: "comments",
inlineType: [0, ],
namedType: $Schema.CommentCollectionFilter,
type: $Schema.CommentCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* [Internal] Filters that the issue's suggestions must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueSuggestionCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.suggestions` |
* | **Nullability** | Optional |
*/
export interface suggestions {
kind: "InputField",
name: "suggestions",
inlineType: [0, ],
namedType: $Schema.IssueSuggestionCollectionFilter,
type: $Schema.IssueSuggestionCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Filters that the issues cycle must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableCycleFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.cycle` |
* | **Nullability** | Optional |
*/
export interface cycle {
kind: "InputField",
name: "cycle",
inlineType: [0, ],
namedType: $Schema.NullableCycleFilter,
type: $Schema.NullableCycleFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Filters that the issues project must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableProjectFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.project` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Filters that the issues state must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowStateFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.state` |
* | **Nullability** | Optional |
*/
export interface state {
kind: "InputField",
name: "state",
inlineType: [0, ],
namedType: $Schema.WorkflowStateFilter,
type: $Schema.WorkflowStateFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Filters that the child issues must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.children` |
* | **Nullability** | Optional |
*/
export interface children {
kind: "InputField",
name: "children",
inlineType: [0, ],
namedType: $Schema.IssueCollectionFilter,
type: $Schema.IssueCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Filters that the issues attachments must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.attachments` |
* | **Nullability** | Optional |
*/
export interface attachments {
kind: "InputField",
name: "attachments",
inlineType: [0, ],
namedType: $Schema.AttachmentCollectionFilter,
type: $Schema.AttachmentCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* [Internal] Comparator for the issues content.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ContentComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.searchableContent` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for filtering issues with relations.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RelationExistsComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.hasRelatedRelations` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for filtering issues which are duplicates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RelationExistsComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.hasDuplicateRelations` |
* | **Nullability** | Optional |
*/
export interface hasDuplicateRelations {
kind: "InputField",
name: "hasDuplicateRelations",
inlineType: [0, ],
namedType: $Schema.RelationExistsComparator,
type: $Schema.RelationExistsComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for filtering issues which are blocked.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RelationExistsComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.hasBlockedByRelations` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for filtering issues which are blocking.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RelationExistsComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.hasBlockingRelations` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* [Internal] Comparator for filtering issues which have suggested related issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RelationExistsComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.hasSuggestedRelatedIssues` |
* | **Nullability** | Optional |
*/
export interface hasSuggestedRelatedIssues {
kind: "InputField",
name: "hasSuggestedRelatedIssues",
inlineType: [0, ],
namedType: $Schema.RelationExistsComparator,
type: $Schema.RelationExistsComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* [Internal] Comparator for filtering issues which have suggested similar issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RelationExistsComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.hasSuggestedSimilarIssues` |
* | **Nullability** | Optional |
*/
export interface hasSuggestedSimilarIssues {
kind: "InputField",
name: "hasSuggestedSimilarIssues",
inlineType: [0, ],
namedType: $Schema.RelationExistsComparator,
type: $Schema.RelationExistsComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* [Internal] Comparator for filtering issues which have suggested assignees.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RelationExistsComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.hasSuggestedAssignees` |
* | **Nullability** | Optional |
*/
export interface hasSuggestedAssignees {
kind: "InputField",
name: "hasSuggestedAssignees",
inlineType: [0, ],
namedType: $Schema.RelationExistsComparator,
type: $Schema.RelationExistsComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* [Internal] Comparator for filtering issues which have suggested projects.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RelationExistsComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.hasSuggestedProjects` |
* | **Nullability** | Optional |
*/
export interface hasSuggestedProjects {
kind: "InputField",
name: "hasSuggestedProjects",
inlineType: [0, ],
namedType: $Schema.RelationExistsComparator,
type: $Schema.RelationExistsComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* [Internal] Comparator for filtering issues which have suggested labels.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RelationExistsComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.hasSuggestedLabels` |
* | **Nullability** | Optional |
*/
export interface hasSuggestedLabels {
kind: "InputField",
name: "hasSuggestedLabels",
inlineType: [0, ],
namedType: $Schema.RelationExistsComparator,
type: $Schema.RelationExistsComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* [Internal] Comparator for filtering issues which have suggested teams.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RelationExistsComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.hasSuggestedTeams` |
* | **Nullability** | Optional |
*/
export interface hasSuggestedTeams {
kind: "InputField",
name: "hasSuggestedTeams",
inlineType: [0, ],
namedType: $Schema.RelationExistsComparator,
type: $Schema.RelationExistsComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Comparator for the issues sla status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SlaStatusComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.slaStatus` |
* | **Nullability** | Optional |
*/
export interface slaStatus {
kind: "InputField",
name: "slaStatus",
inlineType: [0, ],
namedType: $Schema.SlaStatusComparator,
type: $Schema.SlaStatusComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Filters that the issues reactions must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReactionCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.reactions` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Filters that the issue's customer needs must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.needs` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* [ALPHA] Filters that the issue's releases must satisfy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseCollectionFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.releases` |
* | **Nullability** | Optional |
*/
export interface releases {
kind: "InputField",
name: "releases",
inlineType: [0, ],
namedType: $Schema.ReleaseCollectionFilter,
type: $Schema.ReleaseCollectionFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Count of customers
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NumberComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.customerCount` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Count of important customers
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NumberComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.customerImportantCount` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* [Internal] Lead time (created -> completed) comparator.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDurationComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.leadTime` |
* | **Nullability** | Optional |
*/
export interface leadTime {
kind: "InputField",
name: "leadTime",
inlineType: [0, ],
namedType: $Schema.NullableDurationComparator,
type: $Schema.NullableDurationComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* [Internal] Cycle time (started -> completed) comparator.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDurationComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.cycleTime` |
* | **Nullability** | Optional |
*/
export interface cycleTime {
kind: "InputField",
name: "cycleTime",
inlineType: [0, ],
namedType: $Schema.NullableDurationComparator,
type: $Schema.NullableDurationComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* [Internal] Age (created -> now) comparator, defined if the issue is still open.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDurationComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.ageTime` |
* | **Nullability** | Optional |
*/
export interface ageTime {
kind: "InputField",
name: "ageTime",
inlineType: [0, ],
namedType: $Schema.NullableDurationComparator,
type: $Schema.NullableDurationComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* [Internal] Triage time (entered triaged -> triaged) comparator.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NullableDurationComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.triageTime` |
* | **Nullability** | Optional |
*/
export interface triageTime {
kind: "InputField",
name: "triageTime",
inlineType: [0, ],
namedType: $Schema.NullableDurationComparator,
type: $Schema.NullableDurationComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Compound filters, all of which need to be matched by the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.and` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface and {
kind: "InputField",
name: "and",
inlineType: [0, [1, ]],
namedType: $Schema.IssueFilter,
type: readonly ($Schema.IssueFilter['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueFilter}.
*
* Compound filters, one of which need to be matched by the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueFilter}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IssueFilter} |
* | **Path** | `IssueFilter.or` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface or {
kind: "InputField",
name: "or",
inlineType: [0, [1, ]],
namedType: $Schema.IssueFilter,
type: readonly ($Schema.IssueFilter['type'])[] | null | undefined
}