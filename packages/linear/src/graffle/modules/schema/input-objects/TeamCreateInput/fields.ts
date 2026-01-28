import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.id` |
* | **Nullability** | Optional |
*/
export interface id {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* The name of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.name` |
* | **Nullability** | Required |
*/
export interface name {
kind: "InputField",
name: "name",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* The description of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.description` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* The key of the team. If not given, the key will be generated based on the name of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.key` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* The icon of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.icon` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* The color of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.color` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* The organization associated with the team.
*
* @deprecated The request context is used to determine the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.organizationId` |
* | **⚠ Deprecated** | The request context is used to determine the organization. |
* | **Nullability** | Optional |
*/
export interface organizationId {
kind: "InputField",
name: "organizationId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* Whether the team uses cycles.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.cyclesEnabled` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* The day of the week that a new cycle starts.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.cycleStartDay` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* The duration of each cycle in weeks.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.cycleDuration` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* The cooldown time after each cycle in weeks.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.cycleCooldownTime` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* Auto assign started issues to current active cycle setting.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.cycleIssueAutoAssignStarted` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* Auto assign completed issues to current active cycle setting.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.cycleIssueAutoAssignCompleted` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* Only allow issues issues with cycles in Active Issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.cycleLockToActive` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* How many upcoming cycles to create.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.upcomingCycleCount` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* Whether triage mode is enabled for the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.triageEnabled` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* Whether an issue needs to have a priority set before leaving triage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.requirePriorityToLeaveTriage` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* The timezone of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.timezone` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
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
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.issueOrderingNoPriorityFirst` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* Whether the team should inherit estimation settings from its parent. Only applies to sub-teams.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.inheritIssueEstimation` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* [Internal] Whether the team should inherit workflow statuses from its parent.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.inheritWorkflowStatuses` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* The issue estimation type to use. Must be one of "notUsed", "exponential", "fibonacci", "linear", "tShirt".
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.issueEstimationType` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* Whether to allow zeros in issues estimates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.issueEstimationAllowZero` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* Whether to move issues to bottom of the column when changing state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.setIssueSortOrderOnStateChange` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* Whether to add additional points to the estimate scale.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.issueEstimationExtended` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* What to use as an default estimate for unestimated issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.defaultIssueEstimate` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* Whether to group recent issue history entries.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.groupIssueHistory` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* The identifier of the default template for members of this team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.defaultTemplateForMembersId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* The identifier of the default template for non-members of this team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.defaultTemplateForNonMembersId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* The identifier of the default project template of this team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.defaultProjectTemplateId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* Internal. Whether the team is private or not.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.private` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* Period after which issues are automatically closed, in months.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.autoClosePeriod` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* The canceled workflow state which auto closed issues will be set to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.autoCloseStateId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* Period after which closed and completed issues are automatically archived, in months. 0 means disabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.autoArchivePeriod` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* The workflow state into which issues are moved when they are marked as a duplicate of another issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.markedAsDuplicateWorkflowStateId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* The parent team ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.parentId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* [Internal] Whether the team should inherit its product intelligence scope from its parent. Only applies to sub-teams.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.inheritProductIntelligenceScope` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamCreateInput}.
*
* [Internal] The scope of product intelligence suggestion data for the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProductIntelligenceScope} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.TeamCreateInput} |
* | **Path** | `TeamCreateInput.productIntelligenceScope` |
* | **Nullability** | Optional |
*/
export interface productIntelligenceScope {
kind: "InputField",
name: "productIntelligenceScope",
inlineType: [0, ],
namedType: $Schema.ProductIntelligenceScope,
type: $Schema.ProductIntelligenceScope['members'] | null | undefined
}