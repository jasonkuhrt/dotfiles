import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ReleaseStageCreateInput from './fields.js'

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
export interface ReleaseStageCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The name of the stage.
*/
name: $Scalars.String$NonNull<_$Context>,
/**
* The UI color of the stage as a HEX string.
*/
color: $Scalars.String$NonNull<_$Context>,
/**
* The type of the stage.
*/
$type: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReleaseStageType>,
/**
* The position of the stage.
*/
position: $Scalars.Float$NonNull<_$Context>,
/**
* The identifier of the pipeline this stage belongs to.
*/
pipelineId: $Scalars.String$NonNull<_$Context>
}