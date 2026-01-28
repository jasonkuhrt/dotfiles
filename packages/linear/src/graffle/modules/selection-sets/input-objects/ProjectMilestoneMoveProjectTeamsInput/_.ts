import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ProjectMilestoneMoveProjectTeamsInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* [Internal] Used for ProjectMilestoneMoveInput to describe a snapshot of a project and its team ids
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | No |
*/
export interface ProjectMilestoneMoveProjectTeamsInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The project id
*/
projectId: $Scalars.String$NonNull<_$Context>,
/**
* The team ids for the project
*/
teamIds: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>>>
}