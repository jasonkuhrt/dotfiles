import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as FavoriteUpdateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface FavoriteUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The position of the item in the favorites list.
*/
sortOrder?: $Scalars.Float<_$Context>,
/**
* The identifier (in UUID v4 format) of the folder to move the favorite under.
*/
parentId?: $Scalars.String<_$Context>,
/**
* The name of the favorite folder.
*/
folderName?: $Scalars.String<_$Context>
}