import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ProjectStatusCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectStatusCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The name of the status.
*/
name: $Scalars.String$NonNull<_$Context>,
/**
* The UI color of the status as a HEX string.
*/
color: $Scalars.String$NonNull<_$Context>,
/**
* Description of the status.
*/
description?: $Scalars.String<_$Context>,
/**
* The position of the status in the workspace's project flow.
*/
position: $Scalars.Float$NonNull<_$Context>,
/**
* The type of the project status.
*/
$type: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectStatusType>,
/**
* Whether or not a project can be in this status indefinitely.
*/
indefinite?: $Scalars.Boolean<_$Context>
}