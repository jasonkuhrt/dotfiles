import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* The name of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.name` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* The description of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.description` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* The key of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.key` |
* | **Nullability** | Optional |
*/
export interface key {
kind: "InputField",
name: "key",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* The icon of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.icon` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* The color of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.color` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Whether the team uses cycles.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.cyclesEnabled` |
* | **Nullability** | Optional |
*/
export interface cyclesEnabled {
kind: "InputField",
name: "cyclesEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* The day of the week that a new cycle starts.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.cycleStartDay` |
* | **Nullability** | Optional |
*/
export interface cycleStartDay {
kind: "InputField",
name: "cycleStartDay",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* The duration of each cycle in weeks.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.cycleDuration` |
* | **Nullability** | Optional |
*/
export interface cycleDuration {
kind: "InputField",
name: "cycleDuration",
inlineType: [0, ],
namedType: $Schema.Int,
type: $Schema.Int['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* The cooldown time after each cycle in weeks.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.cycleCooldownTime` |
* | **Nullability** | Optional |
*/
export interface cycleCooldownTime {
kind: "InputField",
name: "cycleCooldownTime",
inlineType: [0, ],
namedType: $Schema.Int,
type: $Schema.Int['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Auto assign started issues to current active cycle setting.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.cycleIssueAutoAssignStarted` |
* | **Nullability** | Optional |
*/
export interface cycleIssueAutoAssignStarted {
kind: "InputField",
name: "cycleIssueAutoAssignStarted",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Auto assign completed issues to current active cycle setting.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.cycleIssueAutoAssignCompleted` |
* | **Nullability** | Optional |
*/
export interface cycleIssueAutoAssignCompleted {
kind: "InputField",
name: "cycleIssueAutoAssignCompleted",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Only allow issues with cycles in Active Issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.cycleLockToActive` |
* | **Nullability** | Optional |
*/
export interface cycleLockToActive {
kind: "InputField",
name: "cycleLockToActive",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* The date to begin cycles on.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.cycleEnabledStartDate` |
* | **Nullability** | Optional |
*/
export interface cycleEnabledStartDate {
kind: "InputField",
name: "cycleEnabledStartDate",
inlineType: [0, ],
namedType: $Schema.DateTime,
type: $Schema.DateTime['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* How many upcoming cycles to create.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.upcomingCycleCount` |
* | **Nullability** | Optional |
*/
export interface upcomingCycleCount {
kind: "InputField",
name: "upcomingCycleCount",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* The timezone of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.timezone` |
* | **Nullability** | Optional |
*/
export interface timezone {
kind: "InputField",
name: "timezone",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* [DEPRECATED] Whether issues without priority should be sorted first.
*
* @deprecated This setting is no longer in use.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.issueOrderingNoPriorityFirst` |
* | **⚠ Deprecated** | This setting is no longer in use. |
* | **Nullability** | Optional |
*/
export interface issueOrderingNoPriorityFirst {
kind: "InputField",
name: "issueOrderingNoPriorityFirst",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Whether the team should inherit estimation settings from its parent. Only applies to sub-teams.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.inheritIssueEstimation` |
* | **Nullability** | Optional |
*/
export interface inheritIssueEstimation {
kind: "InputField",
name: "inheritIssueEstimation",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* The issue estimation type to use. Must be one of "notUsed", "exponential", "fibonacci", "linear", "tShirt".
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.issueEstimationType` |
* | **Nullability** | Optional |
*/
export interface issueEstimationType {
kind: "InputField",
name: "issueEstimationType",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Whether to allow zeros in issues estimates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.issueEstimationAllowZero` |
* | **Nullability** | Optional |
*/
export interface issueEstimationAllowZero {
kind: "InputField",
name: "issueEstimationAllowZero",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Whether to move issues to bottom of the column when changing state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.setIssueSortOrderOnStateChange` |
* | **Nullability** | Optional |
*/
export interface setIssueSortOrderOnStateChange {
kind: "InputField",
name: "setIssueSortOrderOnStateChange",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Whether to add additional points to the estimate scale.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.issueEstimationExtended` |
* | **Nullability** | Optional |
*/
export interface issueEstimationExtended {
kind: "InputField",
name: "issueEstimationExtended",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* What to use as an default estimate for unestimated issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.defaultIssueEstimate` |
* | **Nullability** | Optional |
*/
export interface defaultIssueEstimate {
kind: "InputField",
name: "defaultIssueEstimate",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Whether to send new issue notifications to Slack.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.slackNewIssue` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Whether to send new issue comment notifications to Slack.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.slackIssueComments` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Whether to send issue status update notifications to Slack.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.slackIssueStatuses` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Whether to group recent issue history entries.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.groupIssueHistory` |
* | **Nullability** | Optional |
*/
export interface groupIssueHistory {
kind: "InputField",
name: "groupIssueHistory",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Whether to enable resolved thread AI summaries.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.aiThreadSummariesEnabled` |
* | **Nullability** | Optional |
*/
export interface aiThreadSummariesEnabled {
kind: "InputField",
name: "aiThreadSummariesEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Whether to enable AI discussion summaries for issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.aiDiscussionSummariesEnabled` |
* | **Nullability** | Optional |
*/
export interface aiDiscussionSummariesEnabled {
kind: "InputField",
name: "aiDiscussionSummariesEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* The identifier of the default template for members of this team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.defaultTemplateForMembersId` |
* | **Nullability** | Optional |
*/
export interface defaultTemplateForMembersId {
kind: "InputField",
name: "defaultTemplateForMembersId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* The identifier of the default template for non-members of this team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.defaultTemplateForNonMembersId` |
* | **Nullability** | Optional |
*/
export interface defaultTemplateForNonMembersId {
kind: "InputField",
name: "defaultTemplateForNonMembersId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* The identifier of the default project template of this team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.defaultProjectTemplateId` |
* | **Nullability** | Optional |
*/
export interface defaultProjectTemplateId {
kind: "InputField",
name: "defaultProjectTemplateId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Whether the team is private or not.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.private` |
* | **Nullability** | Optional |
*/
interface $private {
kind: "InputField",
name: "private",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
export { type $private as private }
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Whether triage mode is enabled for the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.triageEnabled` |
* | **Nullability** | Optional |
*/
export interface triageEnabled {
kind: "InputField",
name: "triageEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Whether an issue needs to have a priority set before leaving triage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.requirePriorityToLeaveTriage` |
* | **Nullability** | Optional |
*/
export interface requirePriorityToLeaveTriage {
kind: "InputField",
name: "requirePriorityToLeaveTriage",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Default status for newly created issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.defaultIssueStateId` |
* | **Nullability** | Optional |
*/
export interface defaultIssueStateId {
kind: "InputField",
name: "defaultIssueStateId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Period after which issues are automatically closed, in months.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.autoClosePeriod` |
* | **Nullability** | Optional |
*/
export interface autoClosePeriod {
kind: "InputField",
name: "autoClosePeriod",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* The canceled workflow state which auto closed issues will be set to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.autoCloseStateId` |
* | **Nullability** | Optional |
*/
export interface autoCloseStateId {
kind: "InputField",
name: "autoCloseStateId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Whether to automatically close a parent issue in this team if all its sub-issues are closed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.autoCloseParentIssues` |
* | **Nullability** | Optional |
*/
export interface autoCloseParentIssues {
kind: "InputField",
name: "autoCloseParentIssues",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Whether to automatically close all sub-issues when a parent issue in this team is closed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.autoCloseChildIssues` |
* | **Nullability** | Optional |
*/
export interface autoCloseChildIssues {
kind: "InputField",
name: "autoCloseChildIssues",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Period after which closed and completed issues are automatically archived, in months.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.autoArchivePeriod` |
* | **Nullability** | Optional |
*/
export interface autoArchivePeriod {
kind: "InputField",
name: "autoArchivePeriod",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* The workflow state into which issues are moved when they are marked as a duplicate of another issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.markedAsDuplicateWorkflowStateId` |
* | **Nullability** | Optional |
*/
export interface markedAsDuplicateWorkflowStateId {
kind: "InputField",
name: "markedAsDuplicateWorkflowStateId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Whether new users should join this team by default. Mutation restricted to workspace admins or owners!
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.joinByDefault` |
* | **Nullability** | Optional |
*/
export interface joinByDefault {
kind: "InputField",
name: "joinByDefault",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Whether the team is managed by SCIM integration. Mutation restricted to workspace admins or owners and only unsetting is allowed!
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.scimManaged` |
* | **Nullability** | Optional |
*/
export interface scimManaged {
kind: "InputField",
name: "scimManaged",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* The parent team ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.parentId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* [Internal] Whether the team should inherit workflow statuses from its parent.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.inheritWorkflowStatuses` |
* | **Nullability** | Optional |
*/
export interface inheritWorkflowStatuses {
kind: "InputField",
name: "inheritWorkflowStatuses",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* [Internal] Whether the team should inherit its product intelligence scope from its parent. Only applies to sub-teams.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.inheritProductIntelligenceScope` |
* | **Nullability** | Optional |
*/
export interface inheritProductIntelligenceScope {
kind: "InputField",
name: "inheritProductIntelligenceScope",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* [Internal] The scope of product intelligence suggestion data for the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProductIntelligenceScope} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.productIntelligenceScope` |
* | **Nullability** | Optional |
*/
export interface productIntelligenceScope {
kind: "InputField",
name: "productIntelligenceScope",
inlineType: [0, ],
namedType: $Schema.ProductIntelligenceScope,
type: $Schema.ProductIntelligenceScope['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* The security settings for the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamSecuritySettingsInput} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.securitySettings` |
* | **Nullability** | Optional |
*/
export interface securitySettings {
kind: "InputField",
name: "securitySettings",
inlineType: [0, ],
namedType: $Schema.TeamSecuritySettingsInput,
type: $Schema.TeamSecuritySettingsInput['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* Whether all members in the workspace can join the team. Only used for public teams.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.allMembersCanJoin` |
* | **Nullability** | Optional |
*/
export interface allMembersCanJoin {
kind: "InputField",
name: "allMembersCanJoin",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* [Internal] When the team was retired.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.retiredAt` |
* | **Nullability** | Optional |
*/
export interface retiredAt {
kind: "InputField",
name: "retiredAt",
inlineType: [0, ],
namedType: $Schema.DateTime,
type: $Schema.DateTime['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamUpdateInput}.
*
* [Internal] How to handle sub-teams when retiring. Required if the team has active sub-teams.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamRetirementSubTeamHandling} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.TeamUpdateInput} |
* | **Path** | `TeamUpdateInput.handleSubTeamsOnRetirement` |
* | **Nullability** | Optional |
*/
export interface handleSubTeamsOnRetirement {
kind: "InputField",
name: "handleSubTeamsOnRetirement",
inlineType: [0, ],
namedType: $Schema.TeamRetirementSubTeamHandling,
type: $Schema.TeamRetirementSubTeamHandling['members'] | null | undefined
}