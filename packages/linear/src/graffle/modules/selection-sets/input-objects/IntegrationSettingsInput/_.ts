import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as IntegrationSettingsInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 25 |
* | **All Fields Nullable** | Yes |
*/
export interface IntegrationSettingsInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
slack?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SlackSettingsInput<_$Context> | null | undefined>,
slackAsks?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SlackAsksSettingsInput<_$Context> | null | undefined>,
slackPost?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SlackPostSettingsInput<_$Context> | null | undefined>,
slackProjectPost?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SlackPostSettingsInput<_$Context> | null | undefined>,
slackInitiativePost?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SlackPostSettingsInput<_$Context> | null | undefined>,
slackCustomViewNotifications?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SlackPostSettingsInput<_$Context> | null | undefined>,
slackOrgProjectUpdatesPost?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SlackPostSettingsInput<_$Context> | null | undefined>,
slackOrgInitiativeUpdatesPost?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SlackPostSettingsInput<_$Context> | null | undefined>,
googleSheets?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GoogleSheetsSettingsInput<_$Context> | null | undefined>,
gitHub?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GitHubSettingsInput<_$Context> | null | undefined>,
gitHubImport?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GitHubImportSettingsInput<_$Context> | null | undefined>,
gitHubPersonal?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GitHubPersonalSettingsInput<_$Context> | null | undefined>,
gitLab?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GitLabSettingsInput<_$Context> | null | undefined>,
sentry?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SentrySettingsInput<_$Context> | null | undefined>,
zendesk?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ZendeskSettingsInput<_$Context> | null | undefined>,
intercom?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IntercomSettingsInput<_$Context> | null | undefined>,
front?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.FrontSettingsInput<_$Context> | null | undefined>,
gong?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GongSettingsInput<_$Context> | null | undefined>,
jira?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.JiraSettingsInput<_$Context> | null | undefined>,
notion?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotionSettingsInput<_$Context> | null | undefined>,
opsgenie?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.OpsgenieInput<_$Context> | null | undefined>,
pagerDuty?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PagerDutyInput<_$Context> | null | undefined>,
launchDarkly?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.LaunchDarklySettingsInput<_$Context> | null | undefined>,
jiraPersonal?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.JiraPersonalSettingsInput<_$Context> | null | undefined>,
salesforce?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SalesforceSettingsInput<_$Context> | null | undefined>
}