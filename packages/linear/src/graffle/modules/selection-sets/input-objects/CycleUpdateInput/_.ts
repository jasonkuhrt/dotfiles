import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as CycleUpdateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 5 |
* | **All Fields Nullable** | Yes |
*/
export interface CycleUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The custom name of the cycle.
*/
name?: $Scalars.String<_$Context>,
/**
* The description of the cycle.
*/
description?: $Scalars.String<_$Context>,
/**
* The start date of the cycle.
*/
startsAt?: $Scalars.DateTime<_$Context>,
/**
* The end date of the cycle.
*/
endsAt?: $Scalars.DateTime<_$Context>,
/**
* The end date of the cycle.
*/
completedAt?: $Scalars.DateTime<_$Context>
}