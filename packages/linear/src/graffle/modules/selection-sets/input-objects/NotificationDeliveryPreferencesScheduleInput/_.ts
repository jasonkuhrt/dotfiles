import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as NotificationDeliveryPreferencesScheduleInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 8 |
* | **All Fields Nullable** | Yes |
*/
export interface NotificationDeliveryPreferencesScheduleInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether the schedule is disabled.
*/
disabled?: $Scalars.Boolean<_$Context>,
/**
* Delivery preferences for Sunday.
*/
sunday: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotificationDeliveryPreferencesDayInput<_$Context>>,
/**
* Delivery preferences for Monday.
*/
monday: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotificationDeliveryPreferencesDayInput<_$Context>>,
/**
* Delivery preferences for Tuesday.
*/
tuesday: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotificationDeliveryPreferencesDayInput<_$Context>>,
/**
* Delivery preferences for Wednesday.
*/
wednesday: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotificationDeliveryPreferencesDayInput<_$Context>>,
/**
* Delivery preferences for Thursday.
*/
thursday: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotificationDeliveryPreferencesDayInput<_$Context>>,
/**
* Delivery preferences for Friday.
*/
friday: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotificationDeliveryPreferencesDayInput<_$Context>>,
/**
* Delivery preferences for Saturday.
*/
saturday: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotificationDeliveryPreferencesDayInput<_$Context>>
}