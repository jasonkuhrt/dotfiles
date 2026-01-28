import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsUpdateInput}.
*
* Whether to send a Slack message when a new issue is created for the project or the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsUpdateInput} |
* | **Path** | `IntegrationsSettingsUpdateInput.slackIssueCreated` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsUpdateInput}.
*
* Whether to send a Slack message when an issue is added to a view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsUpdateInput} |
* | **Path** | `IntegrationsSettingsUpdateInput.slackIssueAddedToView` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsUpdateInput}.
*
* Whether to send a Slack message when a comment is created on any of the project or team's issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsUpdateInput} |
* | **Path** | `IntegrationsSettingsUpdateInput.slackIssueNewComment` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsUpdateInput}.
*
* Whether to send a Slack message when any of the project or team's issues change to completed or cancelled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsUpdateInput} |
* | **Path** | `IntegrationsSettingsUpdateInput.slackIssueStatusChangedDone` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsUpdateInput}.
*
* Whether to send a Slack message when any of the project or team's issues has a change in status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsUpdateInput} |
* | **Path** | `IntegrationsSettingsUpdateInput.slackIssueStatusChangedAll` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsUpdateInput}.
*
* Whether to send a Slack message when a project update is created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsUpdateInput} |
* | **Path** | `IntegrationsSettingsUpdateInput.slackProjectUpdateCreated` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsUpdateInput}.
*
* Whether to send a Slack message when a project update is created to team channels.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsUpdateInput} |
* | **Path** | `IntegrationsSettingsUpdateInput.slackProjectUpdateCreatedToTeam` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsUpdateInput}.
*
* Whether to send a Slack message when a project update is created to workspace channel.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsUpdateInput} |
* | **Path** | `IntegrationsSettingsUpdateInput.slackProjectUpdateCreatedToWorkspace` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsUpdateInput}.
*
* Whether to send a Slack message when an initiative update is created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsUpdateInput} |
* | **Path** | `IntegrationsSettingsUpdateInput.slackInitiativeUpdateCreated` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsUpdateInput}.
*
* Whether to send a Slack message when a new issue is added to triage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsUpdateInput} |
* | **Path** | `IntegrationsSettingsUpdateInput.slackIssueAddedToTriage` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsUpdateInput}.
*
* Whether to send a Slack message when an SLA is at high risk.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsUpdateInput} |
* | **Path** | `IntegrationsSettingsUpdateInput.slackIssueSlaHighRisk` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationsSettingsUpdateInput}.
*
* Whether to receive notification when an SLA has breached on Slack.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationsSettingsUpdateInput} |
* | **Path** | `IntegrationsSettingsUpdateInput.slackIssueSlaBreached` |
* | **Nullability** | Optional |
*/
export interface slackIssueSlaBreached {
kind: "InputField",
name: "slackIssueSlaBreached",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}