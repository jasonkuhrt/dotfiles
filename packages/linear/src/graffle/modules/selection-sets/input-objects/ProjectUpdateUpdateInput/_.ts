import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ProjectUpdateUpdateInput from './fields.js'

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
export interface ProjectUpdateUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The content of the project update in markdown format.
*/
body?: $Scalars.String<_$Context>,
/**
* The content of the project update as a Prosemirror document.
*/
bodyData?: $Scalars.JSON<_$Context>,
/**
* The health of the project at the time of the update.
*/
$health?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectUpdateHealthType | null | undefined>,
/**
* Whether the diff between the current update and the previous one should be hidden.
*/
isDiffHidden?: $Scalars.Boolean<_$Context>
}