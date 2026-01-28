import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as JiraConfigurationInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 5 |
* | **All Fields Nullable** | Yes |
*/
export interface JiraConfigurationInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Jira personal access token.
*/
accessToken: $Scalars.String$NonNull<_$Context>,
/**
* The Jira user's email address. A username is also accepted on Jira Server / DC.
*/
email: $Scalars.String$NonNull<_$Context>,
/**
* The Jira installation hostname.
*/
hostname: $Scalars.String$NonNull<_$Context>,
/**
* [DEPRECATED] The Jira project keys to scope the integration to.
*
* @deprecated This parameter is ignored, use mappings instead to scope the integration to one or more specific projects
*/
project?: $Scalars.String<_$Context>,
/**
* Whether this integration will be setup using the manual webhook flow.
*/
manualSetup?: $Scalars.Boolean<_$Context>
}