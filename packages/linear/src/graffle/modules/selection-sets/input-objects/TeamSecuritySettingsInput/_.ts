import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as TeamSecuritySettingsInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface TeamSecuritySettingsInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The minimum team role required to manage labels in the team.
*/
$labelManagement?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TeamRoleType | null | undefined>,
/**
* The minimum team role required to manage full workspace members (non-guests) in the team.
*/
$memberManagement?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TeamRoleType | null | undefined>,
/**
* The minimum team role required to manage team settings.
*/
$teamManagement?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TeamRoleType | null | undefined>,
/**
* The minimum team role required to manage templates in the team.
*/
$templateManagement?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TeamRoleType | null | undefined>
}