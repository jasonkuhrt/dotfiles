import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackSettingsInput}.
*
* Slack workspace name
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackSettingsInput} |
* | **Path** | `SlackSettingsInput.teamName` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackSettingsInput}.
*
* Slack workspace id
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackSettingsInput} |
* | **Path** | `SlackSettingsInput.teamId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackSettingsInput}.
*
* Enterprise name of the connected Slack enterprise
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackSettingsInput} |
* | **Path** | `SlackSettingsInput.enterpriseName` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackSettingsInput}.
*
* Enterprise id of the connected Slack enterprise
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackSettingsInput} |
* | **Path** | `SlackSettingsInput.enterpriseId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackSettingsInput}.
*
* Whether to show unfurl previews in Slack
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackSettingsInput} |
* | **Path** | `SlackSettingsInput.shouldUnfurl` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackSettingsInput}.
*
* Whether to show unfurls in the default style instead of Work Objects in Slack
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackSettingsInput} |
* | **Path** | `SlackSettingsInput.shouldUseDefaultUnfurl` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackSettingsInput}.
*
* Whether to allow external users to perform actions on unfurls
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackSettingsInput} |
* | **Path** | `SlackSettingsInput.externalUserActions` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackSettingsInput}.
*
* Whether Linear should automatically respond with issue unfurls when an issue identifier is mentioned in a Slack message.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackSettingsInput} |
* | **Path** | `SlackSettingsInput.linkOnIssueIdMention` |
* | **Nullability** | Required |
*/
export interface linkOnIssueIdMention {
kind: "InputField",
name: "linkOnIssueIdMention",
inlineType: [1, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackSettingsInput}.
*
* Whether Linear Agent should be enabled for this Slack integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackSettingsInput} |
* | **Path** | `SlackSettingsInput.enableAgent` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackSettingsInput}.
*
* Whether Linear Agent should be given Org-wide access within Slack workflows.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackSettingsInput} |
* | **Path** | `SlackSettingsInput.enableLinearAgentWorkflowAccess` |
* | **Nullability** | Optional |
*/
export interface enableLinearAgentWorkflowAccess {
kind: "InputField",
name: "enableLinearAgentWorkflowAccess",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}