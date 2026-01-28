import type * as $Members from './members.js'

export * as IntegrationService from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* Linear supported integration services.
*
* **Members:**
* - `airbyte`
* - `discord`
* - `figma`
* - `figmaPlugin`
* - `front`
* - `github`
* - `gong`
* - `githubEnterpriseServer`
* - `githubCommit`
* - `githubImport`
* - `githubPersonal`
* - `githubCodeAccessPersonal`
* - `gitlab`
* - `googleCalendarPersonal`
* - `googleSheets`
* - `intercom`
* - `jira`
* - `jiraPersonal`
* - `launchDarkly`
* - `launchDarklyPersonal`
* - `loom`
* - `notion`
* - `opsgenie`
* - `pagerDuty`
* - `salesforce`
* - `slack`
* - `slackAsks`
* - `slackCustomViewNotifications`
* - `slackOrgProjectUpdatesPost`
* - `slackOrgInitiativeUpdatesPost`
* - `slackPersonal`
* - `slackPost`
* - `slackProjectPost`
* - `slackProjectUpdatesPost`
* - `slackInitiativePost`
* - `sentry`
* - `zendesk`
* - `email`
* - `mcpServerPersonal`
* - `mcpServer`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 40 |
*/
export interface IntegrationService {
kind: "Enum",
name: "IntegrationService",
members: $Members.airbyte
| $Members.discord
| $Members.figma
| $Members.figmaPlugin
| $Members.front
| $Members.github
| $Members.gong
| $Members.githubEnterpriseServer
| $Members.githubCommit
| $Members.githubImport
| $Members.githubPersonal
| $Members.githubCodeAccessPersonal
| $Members.gitlab
| $Members.googleCalendarPersonal
| $Members.googleSheets
| $Members.intercom
| $Members.jira
| $Members.jiraPersonal
| $Members.launchDarkly
| $Members.launchDarklyPersonal
| $Members.loom
| $Members.notion
| $Members.opsgenie
| $Members.pagerDuty
| $Members.salesforce
| $Members.slack
| $Members.slackAsks
| $Members.slackCustomViewNotifications
| $Members.slackOrgProjectUpdatesPost
| $Members.slackOrgInitiativeUpdatesPost
| $Members.slackPersonal
| $Members.slackPost
| $Members.slackProjectPost
| $Members.slackProjectUpdatesPost
| $Members.slackInitiativePost
| $Members.sentry
| $Members.zendesk
| $Members.email
| $Members.mcpServerPersonal
| $Members.mcpServer
}