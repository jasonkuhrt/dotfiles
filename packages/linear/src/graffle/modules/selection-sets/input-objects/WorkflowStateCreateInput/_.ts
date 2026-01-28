import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as WorkflowStateCreateInput from './fields.js'

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
export interface WorkflowStateCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The workflow type.
*/
type: $Scalars.String$NonNull<_$Context>,
/**
* The name of the state.
*/
name: $Scalars.String$NonNull<_$Context>,
/**
* The color of the state.
*/
color: $Scalars.String$NonNull<_$Context>,
/**
* The description of the state.
*/
description?: $Scalars.String<_$Context>,
/**
* The position of the state.
*/
position?: $Scalars.Float<_$Context>,
/**
* The team associated with the state.
*/
teamId: $Scalars.String$NonNull<_$Context>
}