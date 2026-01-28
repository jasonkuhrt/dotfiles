import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* [DEPRECATED] The state of the project.
*
* @deprecated Use statusId instead
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.state` |
* | **⚠ Deprecated** | Use statusId instead |
* | **Nullability** | Optional |
*/
export interface state {
kind: "InputField",
name: "state",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The ID of the project status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.statusId` |
* | **Nullability** | Optional |
*/
export interface statusId {
kind: "InputField",
name: "statusId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The name of the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.name` |
* | **Nullability** | Optional |
*/
export interface name {
kind: "InputField",
name: "name",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The description for the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.description` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The project content as markdown.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.content` |
* | **Nullability** | Optional |
*/
export interface content {
kind: "InputField",
name: "content",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The ID of the issue from which that project is created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.convertedFromIssueId` |
* | **Nullability** | Optional |
*/
export interface convertedFromIssueId {
kind: "InputField",
name: "convertedFromIssueId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The ID of the last template applied to the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.lastAppliedTemplateId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The icon of the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.icon` |
* | **Nullability** | Optional |
*/
export interface icon {
kind: "InputField",
name: "icon",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The color of the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.color` |
* | **Nullability** | Optional |
*/
export interface color {
kind: "InputField",
name: "color",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The identifiers of the teams this project is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.teamIds` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface teamIds {
kind: "InputField",
name: "teamIds",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The time until which project update reminders are paused.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.projectUpdateRemindersPausedUntilAt` |
* | **Nullability** | Optional |
*/
export interface projectUpdateRemindersPausedUntilAt {
kind: "InputField",
name: "projectUpdateRemindersPausedUntilAt",
inlineType: [0, ],
namedType: $Schema.DateTime,
type: $Schema.DateTime['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The n-weekly frequency at which to prompt for updates. When not set, reminders are inherited from workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.updateReminderFrequencyInWeeks` |
* | **Nullability** | Optional |
*/
export interface updateReminderFrequencyInWeeks {
kind: "InputField",
name: "updateReminderFrequencyInWeeks",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The frequency at which to prompt for updates. When not set, reminders are inherited from workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.updateReminderFrequency` |
* | **Nullability** | Optional |
*/
export interface updateReminderFrequency {
kind: "InputField",
name: "updateReminderFrequency",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The frequency resolution.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FrequencyResolutionType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.frequencyResolution` |
* | **Nullability** | Optional |
*/
export interface frequencyResolution {
kind: "InputField",
name: "frequencyResolution",
inlineType: [0, ],
namedType: $Schema.FrequencyResolutionType,
type: $Schema.FrequencyResolutionType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The day at which to prompt for updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Day} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.updateRemindersDay` |
* | **Nullability** | Optional |
*/
export interface updateRemindersDay {
kind: "InputField",
name: "updateRemindersDay",
inlineType: [0, ],
namedType: $Schema.Day,
type: $Schema.Day['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The hour at which to prompt for updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.updateRemindersHour` |
* | **Nullability** | Optional |
*/
export interface updateRemindersHour {
kind: "InputField",
name: "updateRemindersHour",
inlineType: [0, ],
namedType: $Schema.Int,
type: $Schema.Int['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The identifier of the project lead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.leadId` |
* | **Nullability** | Optional |
*/
export interface leadId {
kind: "InputField",
name: "leadId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The identifiers of the members of this project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.memberIds` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface memberIds {
kind: "InputField",
name: "memberIds",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The planned start date of the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimelessDate} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.startDate` |
* | **Nullability** | Optional |
*/
export interface startDate {
kind: "InputField",
name: "startDate",
inlineType: [0, ],
namedType: $Schema.TimelessDate,
type: $Schema.TimelessDate['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The resolution of the project's start date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateResolutionType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.startDateResolution` |
* | **Nullability** | Optional |
*/
export interface startDateResolution {
kind: "InputField",
name: "startDateResolution",
inlineType: [0, ],
namedType: $Schema.DateResolutionType,
type: $Schema.DateResolutionType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The planned target date of the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimelessDate} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.targetDate` |
* | **Nullability** | Optional |
*/
export interface targetDate {
kind: "InputField",
name: "targetDate",
inlineType: [0, ],
namedType: $Schema.TimelessDate,
type: $Schema.TimelessDate['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The resolution of the project's estimated completion date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateResolutionType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.targetDateResolution` |
* | **Nullability** | Optional |
*/
export interface targetDateResolution {
kind: "InputField",
name: "targetDateResolution",
inlineType: [0, ],
namedType: $Schema.DateResolutionType,
type: $Schema.DateResolutionType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The date when the project was completed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.completedAt` |
* | **Nullability** | Optional |
*/
export interface completedAt {
kind: "InputField",
name: "completedAt",
inlineType: [0, ],
namedType: $Schema.DateTime,
type: $Schema.DateTime['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The date when the project was canceled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.canceledAt` |
* | **Nullability** | Optional |
*/
export interface canceledAt {
kind: "InputField",
name: "canceledAt",
inlineType: [0, ],
namedType: $Schema.DateTime,
type: $Schema.DateTime['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* Whether to send new issue notifications to Slack.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.slackNewIssue` |
* | **Nullability** | Optional |
*/
export interface slackNewIssue {
kind: "InputField",
name: "slackNewIssue",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* Whether to send new issue comment notifications to Slack.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.slackIssueComments` |
* | **Nullability** | Optional |
*/
export interface slackIssueComments {
kind: "InputField",
name: "slackIssueComments",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* Whether to send issue status update notifications to Slack.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.slackIssueStatuses` |
* | **Nullability** | Optional |
*/
export interface slackIssueStatuses {
kind: "InputField",
name: "slackIssueStatuses",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The sort order for the project in shared views.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.sortOrder` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The sort order for the project within shared views, when ordered by priority.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.prioritySortOrder` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* Whether the project has been trashed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.trashed` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The priority of the project. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.priority` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateInput}.
*
* The identifiers of the project labels associated with this project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateInput} |
* | **Path** | `ProjectUpdateInput.labelIds` |
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