import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as CustomerStatusCreateInput from './fields.js'

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
export interface CustomerStatusCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The name of the status.
*/
name?: $Scalars.String<_$Context>,
/**
* The UI color of the status as a HEX string.
*/
color: $Scalars.String$NonNull<_$Context>,
/**
* Description of the status.
*/
description?: $Scalars.String<_$Context>,
/**
* The position of the status in the workspace's customer flow.
*/
position?: $Scalars.Float<_$Context>,
/**
* The display name of the status.
*/
displayName?: $Scalars.String<_$Context>
}