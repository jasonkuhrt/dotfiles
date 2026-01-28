import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as JiraSettingsInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 6 |
* | **All Fields Nullable** | Yes |
*/
export interface JiraSettingsInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The mapping of Jira project id => Linear team id.
*/
projectMapping?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.JiraLinearMappingInput<_$Context> | null | undefined>> | null | undefined>,
/**
* The Jira projects for the organization.
*/
projects: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.JiraProjectDataInput<_$Context> | null | undefined>>>,
/**
* Whether this integration is for Jira Server or not.
*/
isJiraServer?: $Scalars.Boolean<_$Context>,
/**
* Whether the user needs to provide setup information about the webhook to complete the integration setup. Only relevant for integrations that use a manual setup flow
*/
setupPending?: $Scalars.Boolean<_$Context>,
/**
* Whether this integration is using a manual setup flow.
*/
manualSetup?: $Scalars.Boolean<_$Context>,
/**
* The label of the Jira instance, for visual identification purposes only
*/
label?: $Scalars.String<_$Context>
}