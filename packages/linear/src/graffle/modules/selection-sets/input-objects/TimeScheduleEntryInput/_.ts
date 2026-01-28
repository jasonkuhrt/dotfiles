import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as TimeScheduleEntryInput from './fields.js'

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
export interface TimeScheduleEntryInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The start date of the schedule in ISO 8601 date-time format.
*/
startsAt: $Scalars.DateTime$NonNull<_$Context>,
/**
* The end date of the schedule in ISO 8601 date-time format.
*/
endsAt: $Scalars.DateTime$NonNull<_$Context>,
/**
* The Linear user id of the user on schedule. If the user cannot be mapped to a Linear user then `userEmail` can be used as a reference.
*/
userId?: $Scalars.String<_$Context>,
/**
* The email, name or reference to the user on schedule. This is used in case the external user could not be mapped to a Linear user id.
*/
userEmail?: $Scalars.String<_$Context>
}