import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as $Fields from './fields.js'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'

export type * as NotificationDeliveryPreferencesSchedule from './__.js'

/**
* Selection set for {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A user's notification delivery schedule for a particular day.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 8 |
*/
export interface NotificationDeliveryPreferencesSchedule<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.ObjectLike {

      /**
* Whether the schedule is disabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationDeliveryPreferencesSchedule} |
* | **Path** | `NotificationDeliveryPreferencesSchedule.disabled` |
* | **Nullability** | Optional |
*/
disabled?: $Fields.disabled.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.disabled<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Delivery preferences for Sunday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationDeliveryPreferencesDay}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationDeliveryPreferencesSchedule} |
* | **Path** | `NotificationDeliveryPreferencesSchedule.sunday` |
* | **Nullability** | Required |
*/
sunday?: $Fields.sunday.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.sunday<_$Context>>
/**
* Delivery preferences for Monday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationDeliveryPreferencesDay}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationDeliveryPreferencesSchedule} |
* | **Path** | `NotificationDeliveryPreferencesSchedule.monday` |
* | **Nullability** | Required |
*/
monday?: $Fields.monday.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.monday<_$Context>>
/**
* Delivery preferences for Tuesday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationDeliveryPreferencesDay}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationDeliveryPreferencesSchedule} |
* | **Path** | `NotificationDeliveryPreferencesSchedule.tuesday` |
* | **Nullability** | Required |
*/
tuesday?: $Fields.tuesday.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.tuesday<_$Context>>
/**
* Delivery preferences for Wednesday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationDeliveryPreferencesDay}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationDeliveryPreferencesSchedule} |
* | **Path** | `NotificationDeliveryPreferencesSchedule.wednesday` |
* | **Nullability** | Required |
*/
wednesday?: $Fields.wednesday.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.wednesday<_$Context>>
/**
* Delivery preferences for Thursday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationDeliveryPreferencesDay}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationDeliveryPreferencesSchedule} |
* | **Path** | `NotificationDeliveryPreferencesSchedule.thursday` |
* | **Nullability** | Required |
*/
thursday?: $Fields.thursday.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.thursday<_$Context>>
/**
* Delivery preferences for Friday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationDeliveryPreferencesDay}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationDeliveryPreferencesSchedule} |
* | **Path** | `NotificationDeliveryPreferencesSchedule.friday` |
* | **Nullability** | Required |
*/
friday?: $Fields.friday.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.friday<_$Context>>
/**
* Delivery preferences for Saturday.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationDeliveryPreferencesDay}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationDeliveryPreferencesSchedule} |
* | **Path** | `NotificationDeliveryPreferencesSchedule.saturday` |
* | **Nullability** | Required |
*/
saturday?: $Fields.saturday.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.saturday<_$Context>>
      
      /**
* Inline fragments for field groups.
*
* Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
* selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments}
*/
___?: $FragmentInline<_$Context> | $FragmentInline<_$Context>[]
      /**
* A meta field. Is the name of the type being selected.
*
* @see {@link https://graphql.org/learn/queries/#meta-fields | Meta Fields}
*/
__typename?: GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
    
}