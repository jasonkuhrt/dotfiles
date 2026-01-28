import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The issue title.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.title` |
* | **Nullability** | Optional |
*/
export interface title {
kind: "InputField",
name: "title",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The issue description in markdown format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.description` |
* | **Nullability** | Optional |
*/
export interface description {
kind: "InputField",
name: "description",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* [Internal] The issue description as a Prosemirror document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSON} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.descriptionData` |
* | **Nullability** | Optional |
*/
export interface descriptionData {
kind: "InputField",
name: "descriptionData",
inlineType: [0, ],
namedType: $Schema.JSON,
type: $Schema.JSON['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The identifier of the user to assign the issue to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.assigneeId` |
* | **Nullability** | Optional |
*/
export interface assigneeId {
kind: "InputField",
name: "assigneeId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The identifier of the agent user to delegate the issue to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.delegateId` |
* | **Nullability** | Optional |
*/
export interface delegateId {
kind: "InputField",
name: "delegateId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The identifier of the parent issue. Can be a UUID or issue identifier (e.g., 'LIN-123').
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.parentId` |
* | **Nullability** | Optional |
*/
export interface parentId {
kind: "InputField",
name: "parentId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.priority` |
* | **Nullability** | Optional |
*/
export interface priority {
kind: "InputField",
name: "priority",
inlineType: [0, ],
namedType: $Schema.Int,
type: $Schema.Int['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The estimated complexity of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.estimate` |
* | **Nullability** | Optional |
*/
export interface estimate {
kind: "InputField",
name: "estimate",
inlineType: [0, ],
namedType: $Schema.Int,
type: $Schema.Int['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The identifiers of the users subscribing to this ticket.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.subscriberIds` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface subscriberIds {
kind: "InputField",
name: "subscriberIds",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The identifiers of the issue labels associated with this ticket.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.labelIds` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface labelIds {
kind: "InputField",
name: "labelIds",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The identifiers of the issue labels to be added to this issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.addedLabelIds` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface addedLabelIds {
kind: "InputField",
name: "addedLabelIds",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The identifiers of the issue labels to be removed from this issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.removedLabelIds` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface removedLabelIds {
kind: "InputField",
name: "removedLabelIds",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The identifier of the team associated with the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.teamId` |
* | **Nullability** | Optional |
*/
export interface teamId {
kind: "InputField",
name: "teamId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The cycle associated with the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.cycleId` |
* | **Nullability** | Optional |
*/
export interface cycleId {
kind: "InputField",
name: "cycleId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The project associated with the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.projectId` |
* | **Nullability** | Optional |
*/
export interface projectId {
kind: "InputField",
name: "projectId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The project milestone associated with the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.projectMilestoneId` |
* | **Nullability** | Optional |
*/
export interface projectMilestoneId {
kind: "InputField",
name: "projectMilestoneId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The ID of the last template applied to the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.lastAppliedTemplateId` |
* | **Nullability** | Optional |
*/
export interface lastAppliedTemplateId {
kind: "InputField",
name: "lastAppliedTemplateId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The team state of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.stateId` |
* | **Nullability** | Optional |
*/
export interface stateId {
kind: "InputField",
name: "stateId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The position of the issue in its column on the board view.
*
* @deprecated Will be removed in near future, please use `sortOrder` instead
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.boardOrder` |
* | **⚠ Deprecated** | Will be removed in near future, please use `sortOrder` instead |
* | **Nullability** | Optional |
*/
export interface boardOrder {
kind: "InputField",
name: "boardOrder",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The position of the issue related to other issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.sortOrder` |
* | **Nullability** | Optional |
*/
export interface sortOrder {
kind: "InputField",
name: "sortOrder",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The position of the issue related to other issues, when ordered by priority.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.prioritySortOrder` |
* | **Nullability** | Optional |
*/
export interface prioritySortOrder {
kind: "InputField",
name: "prioritySortOrder",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The position of the issue in parent's sub-issue list.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.subIssueSortOrder` |
* | **Nullability** | Optional |
*/
export interface subIssueSortOrder {
kind: "InputField",
name: "subIssueSortOrder",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The date at which the issue is due.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimelessDate} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.dueDate` |
* | **Nullability** | Optional |
*/
export interface dueDate {
kind: "InputField",
name: "dueDate",
inlineType: [0, ],
namedType: $Schema.TimelessDate,
type: $Schema.TimelessDate['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* Whether the issue has been trashed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.trashed` |
* | **Nullability** | Optional |
*/
export interface trashed {
kind: "InputField",
name: "trashed",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* [Internal] The timestamp at which an issue will be considered in breach of SLA.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.slaBreachesAt` |
* | **Nullability** | Optional |
*/
export interface slaBreachesAt {
kind: "InputField",
name: "slaBreachesAt",
inlineType: [0, ],
namedType: $Schema.DateTime,
type: $Schema.DateTime['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* [Internal] The timestamp at which the issue's SLA was started.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.slaStartedAt` |
* | **Nullability** | Optional |
*/
export interface slaStartedAt {
kind: "InputField",
name: "slaStartedAt",
inlineType: [0, ],
namedType: $Schema.DateTime,
type: $Schema.DateTime['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The time until an issue will be snoozed in Triage view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.snoozedUntilAt` |
* | **Nullability** | Optional |
*/
export interface snoozedUntilAt {
kind: "InputField",
name: "snoozedUntilAt",
inlineType: [0, ],
namedType: $Schema.DateTime,
type: $Schema.DateTime['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The identifier of the user who snoozed the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.snoozedById` |
* | **Nullability** | Optional |
*/
export interface snoozedById {
kind: "InputField",
name: "snoozedById",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* The SLA day count type for the issue. Whether SLA should be business days only or calendar days (default).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SLADayCountType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.slaType` |
* | **Nullability** | Optional |
*/
export interface slaType {
kind: "InputField",
name: "slaType",
inlineType: [0, ],
namedType: $Schema.SLADayCountType,
type: $Schema.SLADayCountType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueUpdateInput}.
*
* Whether the issue was automatically closed because its parent issue was closed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueUpdateInput} |
* | **Path** | `IssueUpdateInput.autoClosedByParentClosing` |
* | **Nullability** | Optional |
*/
export interface autoClosedByParentClosing {
kind: "InputField",
name: "autoClosedByParentClosing",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}