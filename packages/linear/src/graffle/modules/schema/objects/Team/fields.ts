import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"Team"`
*
* {@link https://graphql.org/learn/queries/#meta-fields | GraphQL __typename documentation}
*/
export interface __typename {
kind: "OutputField",
name: "__typename",
arguments: {},
inlineType: [1],
namedType: {
kind: "__typename",
value: "Team"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ID
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.createdAt` |
* | **Nullability** | Required |
*/
export interface createdAt {
kind: "OutputField",
name: "createdAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
* been updated after creation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.updatedAt` |
* | **Nullability** | Required |
*/
export interface updatedAt {
kind: "OutputField",
name: "updatedAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.archivedAt` |
* | **Nullability** | Optional |
*/
export interface archivedAt {
kind: "OutputField",
name: "archivedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The team's name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.name` |
* | **Nullability** | Required |
*/
export interface name {
kind: "OutputField",
name: "name",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The team's unique key. The key is used in URLs.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.key` |
* | **Nullability** | Required |
*/
export interface key {
kind: "OutputField",
name: "key",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The team's description.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.description` |
* | **Nullability** | Optional |
*/
export interface description {
kind: "OutputField",
name: "description",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The icon of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.icon` |
* | **Nullability** | Optional |
*/
export interface icon {
kind: "OutputField",
name: "icon",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The team's color.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.color` |
* | **Nullability** | Optional |
*/
export interface color {
kind: "OutputField",
name: "color",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The organization that the team is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Organization}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.organization` |
* | **Nullability** | Required |
*/
export interface organization {
kind: "OutputField",
name: "organization",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Organization
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* [Internal] The team's parent team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.parent` |
* | **Nullability** | Optional |
*/
export interface parent {
kind: "OutputField",
name: "parent",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Team
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* [Internal] The team's sub-teams.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.children` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface children {
kind: "OutputField",
name: "children",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.Team
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Whether the team uses cycles.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.cyclesEnabled` |
* | **Nullability** | Required |
*/
export interface cyclesEnabled {
kind: "OutputField",
name: "cyclesEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The day of the week that a new cycle starts.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.cycleStartDay` |
* | **Nullability** | Required |
*/
export interface cycleStartDay {
kind: "OutputField",
name: "cycleStartDay",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The duration of a cycle in weeks.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.cycleDuration` |
* | **Nullability** | Required |
*/
export interface cycleDuration {
kind: "OutputField",
name: "cycleDuration",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The cooldown time after each cycle in weeks.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.cycleCooldownTime` |
* | **Nullability** | Required |
*/
export interface cycleCooldownTime {
kind: "OutputField",
name: "cycleCooldownTime",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Auto assign started issues to current cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.cycleIssueAutoAssignStarted` |
* | **Nullability** | Required |
*/
export interface cycleIssueAutoAssignStarted {
kind: "OutputField",
name: "cycleIssueAutoAssignStarted",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Auto assign completed issues to current cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.cycleIssueAutoAssignCompleted` |
* | **Nullability** | Required |
*/
export interface cycleIssueAutoAssignCompleted {
kind: "OutputField",
name: "cycleIssueAutoAssignCompleted",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Auto assign issues to current cycle if in active status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.cycleLockToActive` |
* | **Nullability** | Required |
*/
export interface cycleLockToActive {
kind: "OutputField",
name: "cycleLockToActive",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* How many upcoming cycles to create.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.upcomingCycleCount` |
* | **Nullability** | Required |
*/
export interface upcomingCycleCount {
kind: "OutputField",
name: "upcomingCycleCount",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The timezone of the team. Defaults to "America/Los_Angeles"
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.timezone` |
* | **Nullability** | Required |
*/
export interface timezone {
kind: "OutputField",
name: "timezone",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Whether the team should inherit its workflow statuses from its parent. Only applies to sub-teams.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.inheritWorkflowStatuses` |
* | **Nullability** | Required |
*/
export interface inheritWorkflowStatuses {
kind: "OutputField",
name: "inheritWorkflowStatuses",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Whether the team should inherit its estimation settings from its parent. Only applies to sub-teams.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.inheritIssueEstimation` |
* | **Nullability** | Required |
*/
export interface inheritIssueEstimation {
kind: "OutputField",
name: "inheritIssueEstimation",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The issue estimation type to use. Must be one of "notUsed", "exponential", "fibonacci", "linear", "tShirt".
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.issueEstimationType` |
* | **Nullability** | Required |
*/
export interface issueEstimationType {
kind: "OutputField",
name: "issueEstimationType",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* [DEPRECATED] Whether issues without priority should be sorted first.
*
* @deprecated This setting is no longer in use.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.issueOrderingNoPriorityFirst` |
* | **⚠ Deprecated** | This setting is no longer in use. |
* | **Nullability** | Required |
*/
export interface issueOrderingNoPriorityFirst {
kind: "OutputField",
name: "issueOrderingNoPriorityFirst",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Whether to allow zeros in issues estimates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.issueEstimationAllowZero` |
* | **Nullability** | Required |
*/
export interface issueEstimationAllowZero {
kind: "OutputField",
name: "issueEstimationAllowZero",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Where to move issues when changing state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.setIssueSortOrderOnStateChange` |
* | **Nullability** | Required |
*/
export interface setIssueSortOrderOnStateChange {
kind: "OutputField",
name: "setIssueSortOrderOnStateChange",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Whether to add additional points to the estimate scale.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.issueEstimationExtended` |
* | **Nullability** | Required |
*/
export interface issueEstimationExtended {
kind: "OutputField",
name: "issueEstimationExtended",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* What to use as a default estimate for unestimated issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.defaultIssueEstimate` |
* | **Nullability** | Required |
*/
export interface defaultIssueEstimate {
kind: "OutputField",
name: "defaultIssueEstimate",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Whether triage mode is enabled for the team or not.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.triageEnabled` |
* | **Nullability** | Required |
*/
export interface triageEnabled {
kind: "OutputField",
name: "triageEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Whether an issue needs to have a priority set before leaving triage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.requirePriorityToLeaveTriage` |
* | **Nullability** | Required |
*/
export interface requirePriorityToLeaveTriage {
kind: "OutputField",
name: "requirePriorityToLeaveTriage",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The default workflow state into which issues are set when they are opened by team members.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.defaultIssueState` |
* | **Nullability** | Optional |
*/
export interface defaultIssueState {
kind: "OutputField",
name: "defaultIssueState",
arguments: {},
inlineType: [0, ],
namedType: $Schema.WorkflowState
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The default template to use for new issues created by members of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Template} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.defaultTemplateForMembers` |
* | **Nullability** | Optional |
*/
export interface defaultTemplateForMembers {
kind: "OutputField",
name: "defaultTemplateForMembers",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Template
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The id of the default template to use for new issues created by members of the team.
*
* @deprecated Use defaultTemplateForMembers instead
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.defaultTemplateForMembersId` |
* | **⚠ Deprecated** | Use defaultTemplateForMembers instead |
* | **Nullability** | Optional |
*/
export interface defaultTemplateForMembersId {
kind: "OutputField",
name: "defaultTemplateForMembersId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The default template to use for new issues created by non-members of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Template} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.defaultTemplateForNonMembers` |
* | **Nullability** | Optional |
*/
export interface defaultTemplateForNonMembers {
kind: "OutputField",
name: "defaultTemplateForNonMembers",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Template
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The id of the default template to use for new issues created by non-members of the team.
*
* @deprecated Use defaultTemplateForNonMembers instead
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.defaultTemplateForNonMembersId` |
* | **⚠ Deprecated** | Use defaultTemplateForNonMembers instead |
* | **Nullability** | Optional |
*/
export interface defaultTemplateForNonMembersId {
kind: "OutputField",
name: "defaultTemplateForNonMembersId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The default template to use for new projects created for the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Template} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.defaultProjectTemplate` |
* | **Nullability** | Optional |
*/
export interface defaultProjectTemplate {
kind: "OutputField",
name: "defaultProjectTemplate",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Template
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The workflow state into which issues are set when they are opened by non-team members or integrations if triage is enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.triageIssueState` |
* | **Nullability** | Optional |
*/
export interface triageIssueState {
kind: "OutputField",
name: "triageIssueState",
arguments: {},
inlineType: [0, ],
namedType: $Schema.WorkflowState
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Whether the team is private or not.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.private` |
* | **Nullability** | Required |
*/
interface $private {
kind: "OutputField",
name: "private",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}
export { type $private as private }

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Whether all members in the workspace can join the team. Only used for public teams.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.allMembersCanJoin` |
* | **Nullability** | Optional |
*/
export interface allMembersCanJoin {
kind: "OutputField",
name: "allMembersCanJoin",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Security settings for the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.securitySettings` |
* | **Nullability** | Required |
*/
export interface securitySettings {
kind: "OutputField",
name: "securitySettings",
arguments: {},
inlineType: [1, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* [Internal] Facets associated with the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Facet}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.facets` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface facets {
kind: "OutputField",
name: "facets",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.Facet
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* [Internal] Posts associated with the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Post}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.posts` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface posts {
kind: "OutputField",
name: "posts",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.Post
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Whether the team is managed by SCIM integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.scimManaged` |
* | **Nullability** | Required |
*/
export interface scimManaged {
kind: "OutputField",
name: "scimManaged",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The SCIM group name for the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.scimGroupName` |
* | **Nullability** | Optional |
*/
export interface scimGroupName {
kind: "OutputField",
name: "scimGroupName",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* [Internal] The progress history of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.progressHistory` |
* | **Nullability** | Required |
*/
export interface progressHistory {
kind: "OutputField",
name: "progressHistory",
arguments: {},
inlineType: [1, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* [Internal] The current progress of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.currentProgress` |
* | **Nullability** | Required |
*/
export interface currentProgress {
kind: "OutputField",
name: "currentProgress",
arguments: {},
inlineType: [1, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The workflow state into which issues are moved when a PR has been opened as draft.
*
* @deprecated Use team.gitAutomationStates instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.draftWorkflowState` |
* | **⚠ Deprecated** | Use team.gitAutomationStates instead. |
* | **Nullability** | Optional |
*/
export interface draftWorkflowState {
kind: "OutputField",
name: "draftWorkflowState",
arguments: {},
inlineType: [0, ],
namedType: $Schema.WorkflowState
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The workflow state into which issues are moved when a PR has been opened.
*
* @deprecated Use team.gitAutomationStates instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.startWorkflowState` |
* | **⚠ Deprecated** | Use team.gitAutomationStates instead. |
* | **Nullability** | Optional |
*/
export interface startWorkflowState {
kind: "OutputField",
name: "startWorkflowState",
arguments: {},
inlineType: [0, ],
namedType: $Schema.WorkflowState
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The workflow state into which issues are moved when a review has been requested for the PR.
*
* @deprecated Use team.gitAutomationStates instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.reviewWorkflowState` |
* | **⚠ Deprecated** | Use team.gitAutomationStates instead. |
* | **Nullability** | Optional |
*/
export interface reviewWorkflowState {
kind: "OutputField",
name: "reviewWorkflowState",
arguments: {},
inlineType: [0, ],
namedType: $Schema.WorkflowState
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The workflow state into which issues are moved when a PR is ready to be merged.
*
* @deprecated Use team.gitAutomationStates instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.mergeableWorkflowState` |
* | **⚠ Deprecated** | Use team.gitAutomationStates instead. |
* | **Nullability** | Optional |
*/
export interface mergeableWorkflowState {
kind: "OutputField",
name: "mergeableWorkflowState",
arguments: {},
inlineType: [0, ],
namedType: $Schema.WorkflowState
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The workflow state into which issues are moved when a PR has been merged.
*
* @deprecated Use team.gitAutomationStates instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.mergeWorkflowState` |
* | **⚠ Deprecated** | Use team.gitAutomationStates instead. |
* | **Nullability** | Optional |
*/
export interface mergeWorkflowState {
kind: "OutputField",
name: "mergeWorkflowState",
arguments: {},
inlineType: [0, ],
namedType: $Schema.WorkflowState
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Whether to group recent issue history entries.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.groupIssueHistory` |
* | **Nullability** | Required |
*/
export interface groupIssueHistory {
kind: "OutputField",
name: "groupIssueHistory",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Whether to enable resolved thread AI summaries.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.aiThreadSummariesEnabled` |
* | **Nullability** | Required |
*/
export interface aiThreadSummariesEnabled {
kind: "OutputField",
name: "aiThreadSummariesEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Whether to enable AI discussion summaries for issues in this team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.aiDiscussionSummariesEnabled` |
* | **Nullability** | Required |
*/
export interface aiDiscussionSummariesEnabled {
kind: "OutputField",
name: "aiDiscussionSummariesEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Whether to send new issue notifications to Slack.
*
* @deprecated No longer is use
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.slackNewIssue` |
* | **⚠ Deprecated** | No longer is use |
* | **Nullability** | Required |
*/
export interface slackNewIssue {
kind: "OutputField",
name: "slackNewIssue",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Whether to send new issue comment notifications to Slack.
*
* @deprecated No longer in use
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.slackIssueComments` |
* | **⚠ Deprecated** | No longer in use |
* | **Nullability** | Required |
*/
export interface slackIssueComments {
kind: "OutputField",
name: "slackIssueComments",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Whether to send new issue status updates to Slack.
*
* @deprecated No longer in use
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.slackIssueStatuses` |
* | **⚠ Deprecated** | No longer in use |
* | **Nullability** | Required |
*/
export interface slackIssueStatuses {
kind: "OutputField",
name: "slackIssueStatuses",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Period after which issues are automatically closed in months. Null/undefined means disabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.autoClosePeriod` |
* | **Nullability** | Optional |
*/
export interface autoClosePeriod {
kind: "OutputField",
name: "autoClosePeriod",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The canceled workflow state which auto closed issues will be set to. Defaults to the first canceled state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.autoCloseStateId` |
* | **Nullability** | Optional |
*/
export interface autoCloseStateId {
kind: "OutputField",
name: "autoCloseStateId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Period after which automatically closed and completed issues are automatically archived in months.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.autoArchivePeriod` |
* | **Nullability** | Required |
*/
export interface autoArchivePeriod {
kind: "OutputField",
name: "autoArchivePeriod",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Whether parent issues should automatically close when all child issues are closed
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.autoCloseParentIssues` |
* | **Nullability** | Optional |
*/
export interface autoCloseParentIssues {
kind: "OutputField",
name: "autoCloseParentIssues",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Whether child issues should automatically close when their parent issue is closed
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.autoCloseChildIssues` |
* | **Nullability** | Optional |
*/
export interface autoCloseChildIssues {
kind: "OutputField",
name: "autoCloseChildIssues",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The workflow state into which issues are moved when they are marked as a duplicate of another issue. Defaults to the first canceled state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.markedAsDuplicateWorkflowState` |
* | **Nullability** | Optional |
*/
export interface markedAsDuplicateWorkflowState {
kind: "OutputField",
name: "markedAsDuplicateWorkflowState",
arguments: {},
inlineType: [0, ],
namedType: $Schema.WorkflowState
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* [Internal] Whether new users should join this team by default.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.joinByDefault` |
* | **Nullability** | Optional |
*/
export interface joinByDefault {
kind: "OutputField",
name: "joinByDefault",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Calendar feed URL (iCal) for cycles.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.cycleCalenderUrl` |
* | **Nullability** | Required |
*/
export interface cycleCalenderUrl {
kind: "OutputField",
name: "cycleCalenderUrl",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The name of the team including its parent team name if it has one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.displayName` |
* | **Nullability** | Required |
*/
export interface displayName {
kind: "OutputField",
name: "displayName",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Issues associated with the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.issues` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
export interface issues {
kind: "OutputField",
name: "issues",
arguments: {
/**
* Include issues from sub-teams.
*/
includeSubTeams: {
kind: "InputField",
name: "includeSubTeams",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* Filter returned issues.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.IssueFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.IssueConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Number of issues in the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.issueCount` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface issueCount {
kind: "OutputField",
name: "issueCount",
arguments: {
/**
* Include archived issues in the count.
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
}
},
inlineType: [1, ],
namedType: $Schema.Int
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Cycles associated with the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CycleConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.cycles` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface cycles {
kind: "OutputField",
name: "cycles",
arguments: {
/**
* Filter returned cycles.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.CycleFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.CycleConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Team's currently active cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Cycle} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.activeCycle` |
* | **Nullability** | Optional |
*/
export interface activeCycle {
kind: "OutputField",
name: "activeCycle",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Cycle
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Team's triage responsibility.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TriageResponsibility} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.triageResponsibility` |
* | **Nullability** | Optional |
*/
export interface triageResponsibility {
kind: "OutputField",
name: "triageResponsibility",
arguments: {},
inlineType: [0, ],
namedType: $Schema.TriageResponsibility
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Users who are members of this team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.members` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
export interface members {
kind: "OutputField",
name: "members",
arguments: {
/**
* Filter returned users.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.UserFilter
},
/**
* Should query return disabled/suspended users (default: false).
*/
includeDisabled: {
kind: "InputField",
name: "includeDisabled",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.UserConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* [ALPHA] The membership of the given user in the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamMembership} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.membership` |
* | **Nullability** | Optional |
* | **Arguments** | 1 |
*/
export interface membership {
kind: "OutputField",
name: "membership",
arguments: {
/**
* The user ID.
*/
userId: {
kind: "InputField",
name: "userId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [0, ],
namedType: $Schema.TeamMembership
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Memberships associated with the team. For easier access of the same data, use `members` query.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamMembershipConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.memberships` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface memberships {
kind: "OutputField",
name: "memberships",
arguments: {
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.TeamMembershipConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Projects associated with the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.projects` |
* | **Nullability** | Required |
* | **Arguments** | 9 |
*/
export interface projects {
kind: "OutputField",
name: "projects",
arguments: {
/**
* Include projects from sub-teams.
*/
includeSubTeams: {
kind: "InputField",
name: "includeSubTeams",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* Filter returned projects.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.ProjectFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
},
/**
* [INTERNAL] Sort returned projects.
*/
sort: {
kind: "InputField",
name: "sort",
inlineType: [0, [1, ]],
namedType: $Schema.ProjectSortInput
}
},
inlineType: [1, ],
namedType: $Schema.ProjectConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The states that define the workflow associated with the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowStateConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.states` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface states {
kind: "OutputField",
name: "states",
arguments: {
/**
* Filter returned workflow states.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.WorkflowStateFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.WorkflowStateConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* The Git automation states for the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitAutomationStateConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.gitAutomationStates` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface gitAutomationStates {
kind: "OutputField",
name: "gitAutomationStates",
arguments: {
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.GitAutomationStateConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Templates associated with the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TemplateConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.templates` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface templates {
kind: "OutputField",
name: "templates",
arguments: {
/**
* Filter returned templates.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.NullableTemplateFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.TemplateConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Labels associated with the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.labels` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface labels {
kind: "OutputField",
name: "labels",
arguments: {
/**
* Filter returned issue labels.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.IssueLabelFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.IssueLabelConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Webhooks associated with the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WebhookConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.webhooks` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface webhooks {
kind: "OutputField",
name: "webhooks",
arguments: {
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.WebhookConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* Settings for all integrations associated with that team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationsSettings} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.integrationsSettings` |
* | **Nullability** | Optional |
*/
export interface integrationsSettings {
kind: "OutputField",
name: "integrationsSettings",
arguments: {},
inlineType: [0, ],
namedType: $Schema.IntegrationsSettings
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* [DEPRECATED] Whether to move issues to bottom of the column when changing state.
*
* @deprecated Use setIssueSortOrderOnStateChange instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.issueSortOrderDefaultToBottom` |
* | **⚠ Deprecated** | Use setIssueSortOrderOnStateChange instead. |
* | **Nullability** | Required |
*/
export interface issueSortOrderDefaultToBottom {
kind: "OutputField",
name: "issueSortOrderDefaultToBottom",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Team}.
*
* [DEPRECATED] Unique hash for the team to be used in invite URLs.
*
* @deprecated Not used anymore, simply returning an empty string.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Team} |
* | **Path** | `Team.inviteHash` |
* | **⚠ Deprecated** | Not used anymore, simply returning an empty string. |
* | **Nullability** | Required |
*/
export interface inviteHash {
kind: "OutputField",
name: "inviteHash",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}
