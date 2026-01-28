import type * as $Fields from './fields.js'

export * as SlackSettingsInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 10 |
* | **All Fields Nullable** | Yes |
*/
export interface SlackSettingsInput {
kind: "InputObject",
name: "SlackSettingsInput",
isAllFieldsNullable: true,
fields: {
teamName: $Fields.teamName,
teamId: $Fields.teamId,
enterpriseName: $Fields.enterpriseName,
enterpriseId: $Fields.enterpriseId,
shouldUnfurl: $Fields.shouldUnfurl,
shouldUseDefaultUnfurl: $Fields.shouldUseDefaultUnfurl,
externalUserActions: $Fields.externalUserActions,
linkOnIssueIdMention: $Fields.linkOnIssueIdMention,
enableAgent: $Fields.enableAgent,
enableLinearAgentWorkflowAccess: $Fields.enableLinearAgentWorkflowAccess
},
type: {
teamName?: $Fields.teamName['type'],
teamId?: $Fields.teamId['type'],
enterpriseName?: $Fields.enterpriseName['type'],
enterpriseId?: $Fields.enterpriseId['type'],
shouldUnfurl?: $Fields.shouldUnfurl['type'],
shouldUseDefaultUnfurl?: $Fields.shouldUseDefaultUnfurl['type'],
externalUserActions?: $Fields.externalUserActions['type'],
linkOnIssueIdMention: $Fields.linkOnIssueIdMention['type'],
enableAgent?: $Fields.enableAgent['type'],
enableLinearAgentWorkflowAccess?: $Fields.enableLinearAgentWorkflowAccess['type']
}
}