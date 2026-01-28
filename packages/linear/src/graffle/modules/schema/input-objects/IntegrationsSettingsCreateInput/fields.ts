import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsCreateInput}.
*
* Whether to send a Slack message when a new issue is created for the project or the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsCreateInput} |
* | **Path** | `IntegrationsSettingsCreateInput.slackIssueCreated` |
* | **Nullability** | Optional |
*/
export interface slackIssueCreated {
kind: "InputField",
name: "slackIssueCreated",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsCreateInput}.
*
* Whether to send a Slack message when an issue is added to a view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsCreateInput} |
* | **Path** | `IntegrationsSettingsCreateInput.slackIssueAddedToView` |
* | **Nullability** | Optional |
*/
export interface slackIssueAddedToView {
kind: "InputField",
name: "slackIssueAddedToView",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsCreateInput}.
*
* Whether to send a Slack message when a comment is created on any of the project or team's issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsCreateInput} |
* | **Path** | `IntegrationsSettingsCreateInput.slackIssueNewComment` |
* | **Nullability** | Optional |
*/
export interface slackIssueNewComment {
kind: "InputField",
name: "slackIssueNewComment",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsCreateInput}.
*
* Whether to send a Slack message when any of the project or team's issues change to completed or cancelled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsCreateInput} |
* | **Path** | `IntegrationsSettingsCreateInput.slackIssueStatusChangedDone` |
* | **Nullability** | Optional |
*/
export interface slackIssueStatusChangedDone {
kind: "InputField",
name: "slackIssueStatusChangedDone",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsCreateInput}.
*
* Whether to send a Slack message when any of the project or team's issues has a change in status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsCreateInput} |
* | **Path** | `IntegrationsSettingsCreateInput.slackIssueStatusChangedAll` |
* | **Nullability** | Optional |
*/
export interface slackIssueStatusChangedAll {
kind: "InputField",
name: "slackIssueStatusChangedAll",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsCreateInput}.
*
* Whether to send a Slack message when a project update is created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsCreateInput} |
* | **Path** | `IntegrationsSettingsCreateInput.slackProjectUpdateCreated` |
* | **Nullability** | Optional |
*/
export interface slackProjectUpdateCreated {
kind: "InputField",
name: "slackProjectUpdateCreated",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsCreateInput}.
*
* Whether to send a Slack message when a project update is created to team channels.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsCreateInput} |
* | **Path** | `IntegrationsSettingsCreateInput.slackProjectUpdateCreatedToTeam` |
* | **Nullability** | Optional |
*/
export interface slackProjectUpdateCreatedToTeam {
kind: "InputField",
name: "slackProjectUpdateCreatedToTeam",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsCreateInput}.
*
* Whether to send a Slack message when a project update is created to workspace channel.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsCreateInput} |
* | **Path** | `IntegrationsSettingsCreateInput.slackProjectUpdateCreatedToWorkspace` |
* | **Nullability** | Optional |
*/
export interface slackProjectUpdateCreatedToWorkspace {
kind: "InputField",
name: "slackProjectUpdateCreatedToWorkspace",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsCreateInput}.
*
* Whether to send a Slack message when an initiative update is created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsCreateInput} |
* | **Path** | `IntegrationsSettingsCreateInput.slackInitiativeUpdateCreated` |
* | **Nullability** | Optional |
*/
export interface slackInitiativeUpdateCreated {
kind: "InputField",
name: "slackInitiativeUpdateCreated",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsCreateInput}.
*
* Whether to send a Slack message when a new issue is added to triage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsCreateInput} |
* | **Path** | `IntegrationsSettingsCreateInput.slackIssueAddedToTriage` |
* | **Nullability** | Optional |
*/
export interface slackIssueAddedToTriage {
kind: "InputField",
name: "slackIssueAddedToTriage",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsCreateInput}.
*
* Whether to send a Slack message when an SLA is at high risk.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsCreateInput} |
* | **Path** | `IntegrationsSettingsCreateInput.slackIssueSlaHighRisk` |
* | **Nullability** | Optional |
*/
export interface slackIssueSlaHighRisk {
kind: "InputField",
name: "slackIssueSlaHighRisk",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsCreateInput}.
*
* Whether to receive notification when an SLA has breached on Slack.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsCreateInput} |
* | **Path** | `IntegrationsSettingsCreateInput.slackIssueSlaBreached` |
* | **Nullability** | Optional |
*/
export interface slackIssueSlaBreached {
kind: "InputField",
name: "slackIssueSlaBreached",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsCreateInput}.
*
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsCreateInput} |
* | **Path** | `IntegrationsSettingsCreateInput.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsCreateInput}.
*
* The identifier of the team to create settings for.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsCreateInput} |
* | **Path** | `IntegrationsSettingsCreateInput.teamId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsCreateInput}.
*
* The identifier of the project to create settings for.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsCreateInput} |
* | **Path** | `IntegrationsSettingsCreateInput.projectId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsCreateInput}.
*
* The identifier of the initiative to create settings for.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsCreateInput} |
* | **Path** | `IntegrationsSettingsCreateInput.initiativeId` |
* | **Nullability** | Optional |
*/
export interface initiativeId {
kind: "InputField",
name: "initiativeId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsCreateInput}.
*
* The identifier of the custom view to create settings for.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsCreateInput} |
* | **Path** | `IntegrationsSettingsCreateInput.customViewId` |
* | **Nullability** | Optional |
*/
export interface customViewId {
kind: "InputField",
name: "customViewId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsCreateInput}.
*
* The type of view to which the integration settings context is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ContextViewType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsCreateInput} |
* | **Path** | `IntegrationsSettingsCreateInput.contextViewType` |
* | **Nullability** | Optional |
*/
export interface contextViewType {
kind: "InputField",
name: "contextViewType",
inlineType: [0, ],
namedType: $Schema.ContextViewType,
type: $Schema.ContextViewType['members'] | null | undefined
}