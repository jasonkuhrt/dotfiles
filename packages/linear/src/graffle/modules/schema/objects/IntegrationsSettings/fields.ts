import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"IntegrationsSettings"`
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
value: "IntegrationsSettings"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationsSettings}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettings} |
* | **Path** | `IntegrationsSettings.id` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationsSettings}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettings} |
* | **Path** | `IntegrationsSettings.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationsSettings}.
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
* | **Parent** | {@link $Schema.IntegrationsSettings} |
* | **Path** | `IntegrationsSettings.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationsSettings}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettings} |
* | **Path** | `IntegrationsSettings.archivedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationsSettings}.
*
* The type of view to which the integration settings context is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ContextViewType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettings} |
* | **Path** | `IntegrationsSettings.contextViewType` |
* | **Nullability** | Optional |
*/
export interface contextViewType {
kind: "OutputField",
name: "contextViewType",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ContextViewType
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationsSettings}.
*
* Whether to send a Slack message when a new issue is created for the project or the team.
*
* @deprecated No longer in use. Use `slackIssueAddedToView` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettings} |
* | **Path** | `IntegrationsSettings.slackIssueCreated` |
* | **⚠ Deprecated** | No longer in use. Use `slackIssueAddedToView` instead. |
* | **Nullability** | Optional |
*/
export interface slackIssueCreated {
kind: "OutputField",
name: "slackIssueCreated",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationsSettings}.
*
* Whether to send a Slack message when a comment is created on any of the project or team's issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettings} |
* | **Path** | `IntegrationsSettings.slackIssueNewComment` |
* | **Nullability** | Optional |
*/
export interface slackIssueNewComment {
kind: "OutputField",
name: "slackIssueNewComment",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationsSettings}.
*
* Whether to send a Slack message when any of the project or team's issues change to completed or cancelled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettings} |
* | **Path** | `IntegrationsSettings.slackIssueStatusChangedDone` |
* | **Nullability** | Optional |
*/
export interface slackIssueStatusChangedDone {
kind: "OutputField",
name: "slackIssueStatusChangedDone",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationsSettings}.
*
* Whether to send a Slack message when an issue is added to the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettings} |
* | **Path** | `IntegrationsSettings.slackIssueAddedToView` |
* | **Nullability** | Optional |
*/
export interface slackIssueAddedToView {
kind: "OutputField",
name: "slackIssueAddedToView",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationsSettings}.
*
* Whether to send a Slack message when any of the project or team's issues has a change in status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettings} |
* | **Path** | `IntegrationsSettings.slackIssueStatusChangedAll` |
* | **Nullability** | Optional |
*/
export interface slackIssueStatusChangedAll {
kind: "OutputField",
name: "slackIssueStatusChangedAll",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationsSettings}.
*
* Whether to send a Slack message when a project update is created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettings} |
* | **Path** | `IntegrationsSettings.slackProjectUpdateCreated` |
* | **Nullability** | Optional |
*/
export interface slackProjectUpdateCreated {
kind: "OutputField",
name: "slackProjectUpdateCreated",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationsSettings}.
*
* Whether to send a new project update to team Slack channels.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettings} |
* | **Path** | `IntegrationsSettings.slackProjectUpdateCreatedToTeam` |
* | **Nullability** | Optional |
*/
export interface slackProjectUpdateCreatedToTeam {
kind: "OutputField",
name: "slackProjectUpdateCreatedToTeam",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationsSettings}.
*
* Whether to send a new project update to workspace Slack channel.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettings} |
* | **Path** | `IntegrationsSettings.slackProjectUpdateCreatedToWorkspace` |
* | **Nullability** | Optional |
*/
export interface slackProjectUpdateCreatedToWorkspace {
kind: "OutputField",
name: "slackProjectUpdateCreatedToWorkspace",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationsSettings}.
*
* Whether to send a Slack message when a initiate update is created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettings} |
* | **Path** | `IntegrationsSettings.slackInitiativeUpdateCreated` |
* | **Nullability** | Optional |
*/
export interface slackInitiativeUpdateCreated {
kind: "OutputField",
name: "slackInitiativeUpdateCreated",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationsSettings}.
*
* Whether to send a Slack message when a new issue is added to triage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettings} |
* | **Path** | `IntegrationsSettings.slackIssueAddedToTriage` |
* | **Nullability** | Optional |
*/
export interface slackIssueAddedToTriage {
kind: "OutputField",
name: "slackIssueAddedToTriage",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationsSettings}.
*
* Whether to send a Slack message when an SLA is at high risk.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettings} |
* | **Path** | `IntegrationsSettings.slackIssueSlaHighRisk` |
* | **Nullability** | Optional |
*/
export interface slackIssueSlaHighRisk {
kind: "OutputField",
name: "slackIssueSlaHighRisk",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationsSettings}.
*
* Whether to send a Slack message when an SLA is breached.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettings} |
* | **Path** | `IntegrationsSettings.slackIssueSlaBreached` |
* | **Nullability** | Optional |
*/
export interface slackIssueSlaBreached {
kind: "OutputField",
name: "slackIssueSlaBreached",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationsSettings}.
*
* Team which those settings apply to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettings} |
* | **Path** | `IntegrationsSettings.team` |
* | **Nullability** | Optional |
*/
export interface team {
kind: "OutputField",
name: "team",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Team
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationsSettings}.
*
* Project which those settings apply to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Project} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettings} |
* | **Path** | `IntegrationsSettings.project` |
* | **Nullability** | Optional |
*/
export interface project {
kind: "OutputField",
name: "project",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Project
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IntegrationsSettings}.
*
* Initiative which those settings apply to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Initiative} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettings} |
* | **Path** | `IntegrationsSettings.initiative` |
* | **Nullability** | Optional |
*/
export interface initiative {
kind: "OutputField",
name: "initiative",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Initiative
}
