import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as OrganizationSecuritySettingsInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 9 |
* | **All Fields Nullable** | Yes |
*/
export interface OrganizationSecuritySettingsInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The minimum role required to create personal API keys.
*/
$personalApiKeysRole?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserRoleType | null | undefined>,
/**
* The minimum role required to invite users.
*/
$invitationsRole?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserRoleType | null | undefined>,
/**
* The minimum role required to create teams.
*/
$teamCreationRole?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserRoleType | null | undefined>,
/**
* The minimum role required to manage workspace labels.
*/
$labelManagementRole?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserRoleType | null | undefined>,
/**
* The minimum role required to manage API settings.
*/
$apiSettingsRole?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserRoleType | null | undefined>,
/**
* The minimum role required to manage workspace templates.
*/
$templateManagementRole?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserRoleType | null | undefined>,
/**
* The minimum role required to import data.
*/
$importRole?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserRoleType | null | undefined>,
/**
* The minimum role required to manage agent guidance prompts and settings.
*/
$agentGuidanceRole?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserRoleType | null | undefined>,
/**
* The minimum role required to install and connect new integrations.
*/
$integrationCreationRole?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserRoleType | null | undefined>
}