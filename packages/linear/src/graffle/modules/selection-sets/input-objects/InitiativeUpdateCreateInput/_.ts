import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as InitiativeUpdateCreateInput from './fields.js'

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
export interface InitiativeUpdateCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The content of the update in markdown format.
*/
body?: $Scalars.String<_$Context>,
/**
* [Internal] The content of the update as a Prosemirror document.
*/
bodyData?: $Scalars.JSON<_$Context>,
/**
* The health of the initiative at the time of the update.
*/
$health?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeUpdateHealthType | null | undefined>,
/**
* The initiative to associate the update with.
*/
initiativeId: $Scalars.String$NonNull<_$Context>,
/**
* Whether the diff between the current update and the previous one should be hidden.
*/
isDiffHidden?: $Scalars.Boolean<_$Context>
}