import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as CycleCreateInput from './fields.js'

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
export interface CycleCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The custom name of the cycle.
*/
name?: $Scalars.String<_$Context>,
/**
* The description of the cycle.
*/
description?: $Scalars.String<_$Context>,
/**
* The team to associate the cycle with.
*/
teamId: $Scalars.String$NonNull<_$Context>,
/**
* The start date of the cycle.
*/
startsAt: $Scalars.DateTime$NonNull<_$Context>,
/**
* The end date of the cycle.
*/
endsAt: $Scalars.DateTime$NonNull<_$Context>,
/**
* The completion time of the cycle. If null, the cycle hasn't been completed.
*/
completedAt?: $Scalars.DateTime<_$Context>
}