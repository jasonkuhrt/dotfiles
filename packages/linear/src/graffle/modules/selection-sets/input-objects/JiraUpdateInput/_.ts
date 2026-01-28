import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as JiraUpdateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 8 |
* | **All Fields Nullable** | Yes |
*/
export interface JiraUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The id of the integration to update.
*/
id: $Scalars.String$NonNull<_$Context>,
/**
* Whether to refresh Jira Projects for the integration.
*/
updateProjects?: $Scalars.Boolean<_$Context>,
/**
* Whether to refresh Jira metadata for the integration.
*/
updateMetadata?: $Scalars.Boolean<_$Context>,
/**
* Whether to delete the current manual webhook configuration.
*/
deleteWebhook?: $Scalars.Boolean<_$Context>,
/**
* Webhook secret for a new manual configuration.
*/
webhookSecret?: $Scalars.String<_$Context>,
/**
* Whether the Jira instance does not support webhook secrets.
*/
noSecret?: $Scalars.Boolean<_$Context>,
/**
* The Jira personal access token.
*/
accessToken?: $Scalars.String<_$Context>,
/**
* The Jira user email address associated with the personal access token.
*/
email?: $Scalars.String<_$Context>
}