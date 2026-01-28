import type * as $Fields from './fields.js'

export * as IntegrationSettingsInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 25 |
* | **All Fields Nullable** | Yes |
*/
export interface IntegrationSettingsInput {
kind: "InputObject",
name: "IntegrationSettingsInput",
isAllFieldsNullable: true,
fields: {
slack: $Fields.slack,
slackAsks: $Fields.slackAsks,
slackPost: $Fields.slackPost,
slackProjectPost: $Fields.slackProjectPost,
slackInitiativePost: $Fields.slackInitiativePost,
slackCustomViewNotifications: $Fields.slackCustomViewNotifications,
slackOrgProjectUpdatesPost: $Fields.slackOrgProjectUpdatesPost,
slackOrgInitiativeUpdatesPost: $Fields.slackOrgInitiativeUpdatesPost,
googleSheets: $Fields.googleSheets,
gitHub: $Fields.gitHub,
gitHubImport: $Fields.gitHubImport,
gitHubPersonal: $Fields.gitHubPersonal,
gitLab: $Fields.gitLab,
sentry: $Fields.sentry,
zendesk: $Fields.zendesk,
intercom: $Fields.intercom,
front: $Fields.front,
gong: $Fields.gong,
jira: $Fields.jira,
notion: $Fields.notion,
opsgenie: $Fields.opsgenie,
pagerDuty: $Fields.pagerDuty,
launchDarkly: $Fields.launchDarkly,
jiraPersonal: $Fields.jiraPersonal,
salesforce: $Fields.salesforce
},
type: {
slack?: $Fields.slack['type'],
slackAsks?: $Fields.slackAsks['type'],
slackPost?: $Fields.slackPost['type'],
slackProjectPost?: $Fields.slackProjectPost['type'],
slackInitiativePost?: $Fields.slackInitiativePost['type'],
slackCustomViewNotifications?: $Fields.slackCustomViewNotifications['type'],
slackOrgProjectUpdatesPost?: $Fields.slackOrgProjectUpdatesPost['type'],
slackOrgInitiativeUpdatesPost?: $Fields.slackOrgInitiativeUpdatesPost['type'],
googleSheets?: $Fields.googleSheets['type'],
gitHub?: $Fields.gitHub['type'],
gitHubImport?: $Fields.gitHubImport['type'],
gitHubPersonal?: $Fields.gitHubPersonal['type'],
gitLab?: $Fields.gitLab['type'],
sentry?: $Fields.sentry['type'],
zendesk?: $Fields.zendesk['type'],
intercom?: $Fields.intercom['type'],
front?: $Fields.front['type'],
gong?: $Fields.gong['type'],
jira?: $Fields.jira['type'],
notion?: $Fields.notion['type'],
opsgenie?: $Fields.opsgenie['type'],
pagerDuty?: $Fields.pagerDuty['type'],
launchDarkly?: $Fields.launchDarkly['type'],
jiraPersonal?: $Fields.jiraPersonal['type'],
salesforce?: $Fields.salesforce['type']
}
}