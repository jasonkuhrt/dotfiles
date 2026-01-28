import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as EntityExternalLinkUpdateInput from './fields.js'

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
export interface EntityExternalLinkUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The URL of the link.
*/
url?: $Scalars.String<_$Context>,
/**
* The label for the link.
*/
label?: $Scalars.String<_$Context>,
/**
* The order of the item in the entities resources list.
*/
sortOrder?: $Scalars.Float<_$Context>,
/**
* [Internal] The resource folder containing the link.
*/
resourceFolderId?: $Scalars.String<_$Context>
}