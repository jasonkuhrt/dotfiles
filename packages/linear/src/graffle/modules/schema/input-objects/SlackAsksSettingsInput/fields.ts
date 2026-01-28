import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackAsksSettingsInput}.
*
* Slack workspace name
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackAsksSettingsInput} |
* | **Path** | `SlackAsksSettingsInput.teamName` |
* | **Nullability** | Optional |
*/
export interface teamName {
kind: "InputField",
name: "teamName",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackAsksSettingsInput}.
*
* Slack workspace id
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackAsksSettingsInput} |
* | **Path** | `SlackAsksSettingsInput.teamId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackAsksSettingsInput}.
*
* Enterprise name of the connected Slack enterprise
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackAsksSettingsInput} |
* | **Path** | `SlackAsksSettingsInput.enterpriseName` |
* | **Nullability** | Optional |
*/
export interface enterpriseName {
kind: "InputField",
name: "enterpriseName",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackAsksSettingsInput}.
*
* Enterprise id of the connected Slack enterprise
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackAsksSettingsInput} |
* | **Path** | `SlackAsksSettingsInput.enterpriseId` |
* | **Nullability** | Optional |
*/
export interface enterpriseId {
kind: "InputField",
name: "enterpriseId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackAsksSettingsInput}.
*
* Whether to show unfurl previews in Slack
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackAsksSettingsInput} |
* | **Path** | `SlackAsksSettingsInput.shouldUnfurl` |
* | **Nullability** | Optional |
*/
export interface shouldUnfurl {
kind: "InputField",
name: "shouldUnfurl",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackAsksSettingsInput}.
*
* Whether to show unfurls in the default style instead of Work Objects in Slack
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackAsksSettingsInput} |
* | **Path** | `SlackAsksSettingsInput.shouldUseDefaultUnfurl` |
* | **Nullability** | Optional |
*/
export interface shouldUseDefaultUnfurl {
kind: "InputField",
name: "shouldUseDefaultUnfurl",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackAsksSettingsInput}.
*
* Whether to allow external users to perform actions on unfurls
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackAsksSettingsInput} |
* | **Path** | `SlackAsksSettingsInput.externalUserActions` |
* | **Nullability** | Optional |
*/
export interface externalUserActions {
kind: "InputField",
name: "externalUserActions",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackAsksSettingsInput}.
*
* The mapping of Slack channel ID => Slack channel name for connected channels.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SlackChannelNameMappingInput}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.SlackAsksSettingsInput} |
* | **Path** | `SlackAsksSettingsInput.slackChannelMapping` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface slackChannelMapping {
kind: "InputField",
name: "slackChannelMapping",
inlineType: [0, [1, ]],
namedType: $Schema.SlackChannelNameMappingInput,
type: readonly ($Schema.SlackChannelNameMappingInput['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackAsksSettingsInput}.
*
* The user role type that is allowed to manage Asks settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserRoleType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.SlackAsksSettingsInput} |
* | **Path** | `SlackAsksSettingsInput.canAdministrate` |
* | **Nullability** | Required |
*/
export interface canAdministrate {
kind: "InputField",
name: "canAdministrate",
inlineType: [1, ],
namedType: $Schema.UserRoleType,
type: $Schema.UserRoleType['members']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackAsksSettingsInput}.
*
* Controls who can see and set Customers when creating Asks in Slack.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerVisibilityMode} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.SlackAsksSettingsInput} |
* | **Path** | `SlackAsksSettingsInput.customerVisibility` |
* | **Nullability** | Optional |
*/
export interface customerVisibility {
kind: "InputField",
name: "customerVisibility",
inlineType: [0, ],
namedType: $Schema.CustomerVisibilityMode,
type: $Schema.CustomerVisibilityMode['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackAsksSettingsInput}.
*
* Whether Linear Agent should be enabled for this Slack Asks integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackAsksSettingsInput} |
* | **Path** | `SlackAsksSettingsInput.enableAgent` |
* | **Nullability** | Optional |
*/
export interface enableAgent {
kind: "InputField",
name: "enableAgent",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackAsksSettingsInput}.
*
* Whether Linear Agent should be given Org-wide access within Slack workflows.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackAsksSettingsInput} |
* | **Path** | `SlackAsksSettingsInput.enableLinearAgentWorkflowAccess` |
* | **Nullability** | Optional |
*/
export interface enableLinearAgentWorkflowAccess {
kind: "InputField",
name: "enableLinearAgentWorkflowAccess",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}