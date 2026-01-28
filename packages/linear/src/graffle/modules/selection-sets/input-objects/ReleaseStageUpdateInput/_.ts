import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ReleaseStageUpdateInput from './fields.js'

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
export interface ReleaseStageUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The name of the stage.
*/
name?: $Scalars.String<_$Context>,
/**
* The UI color of the stage as a HEX string.
*/
color?: $Scalars.String<_$Context>,
/**
* The type of the stage.
*/
$type?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReleaseStageType | null | undefined>,
/**
* The position of the stage.
*/
position?: $Scalars.Float<_$Context>
}