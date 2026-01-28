import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as $Fields from './fields.js'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'
import type * as $Named from '../../$named.js'

export type * as NotificationSubscription from './__.js'

/**
* Selection set for {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface}.
*
* Notification subscriptions for models.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface ↗} |
* | **Fields** | 16 |
* | **Implementors** | {@link $Schema.CustomerNotificationSubscription}, {@link $Schema.CustomViewNotificationSubscription}, {@link $Schema.CycleNotificationSubscription}, {@link $Schema.LabelNotificationSubscription}, {@link $Schema.ProjectNotificationSubscription}, {@link $Schema.InitiativeNotificationSubscription}, {@link $Schema.TeamNotificationSubscription}, {@link $Schema.UserNotificationSubscription} |
*/
export interface NotificationSubscription<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.ObjectLike {

      /**
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationSubscription} |
* | **Path** | `NotificationSubscription.id` |
* | **Nullability** | Required |
*/
id?: $Fields.id.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.id<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationSubscription} |
* | **Path** | `NotificationSubscription.createdAt` |
* | **Nullability** | Required |
*/
createdAt?: $Fields.createdAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.createdAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
* been updated after creation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationSubscription} |
* | **Path** | `NotificationSubscription.updatedAt` |
* | **Nullability** | Required |
*/
updatedAt?: $Fields.updatedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.updatedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationSubscription} |
* | **Path** | `NotificationSubscription.archivedAt` |
* | **Nullability** | Optional |
*/
archivedAt?: $Fields.archivedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.archivedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The user that subscribed to receive notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$User}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationSubscription} |
* | **Path** | `NotificationSubscription.subscriber` |
* | **Nullability** | Required |
*/
subscriber?: $Fields.subscriber.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.subscriber<_$Context>>
/**
* The customer associated with the notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Customer} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationSubscription} |
* | **Path** | `NotificationSubscription.customer` |
* | **Nullability** | Optional |
*/
customer?: $Fields.customer.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customer<_$Context>>
/**
* The contextual custom view associated with the notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomView} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationSubscription} |
* | **Path** | `NotificationSubscription.customView` |
* | **Nullability** | Optional |
*/
customView?: $Fields.customView.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customView<_$Context>>
/**
* The contextual cycle view associated with the notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Cycle} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationSubscription} |
* | **Path** | `NotificationSubscription.cycle` |
* | **Nullability** | Optional |
*/
cycle?: $Fields.cycle.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.cycle<_$Context>>
/**
* The contextual label view associated with the notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueLabel} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationSubscription} |
* | **Path** | `NotificationSubscription.label` |
* | **Nullability** | Optional |
*/
label?: $Fields.label.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.label<_$Context>>
/**
* The contextual project view associated with the notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Project} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationSubscription} |
* | **Path** | `NotificationSubscription.project` |
* | **Nullability** | Optional |
*/
project?: $Fields.project.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.project<_$Context>>
/**
* The contextual initiative view associated with the notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Initiative} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationSubscription} |
* | **Path** | `NotificationSubscription.initiative` |
* | **Nullability** | Optional |
*/
initiative?: $Fields.initiative.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiative<_$Context>>
/**
* The team associated with the notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Team} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationSubscription} |
* | **Path** | `NotificationSubscription.team` |
* | **Nullability** | Optional |
*/
team?: $Fields.team.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.team<_$Context>>
/**
* The user view associated with the notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationSubscription} |
* | **Path** | `NotificationSubscription.user` |
* | **Nullability** | Optional |
*/
user?: $Fields.user.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.user<_$Context>>
/**
* The type of view to which the notification subscription context is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ContextViewType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationSubscription} |
* | **Path** | `NotificationSubscription.contextViewType` |
* | **Nullability** | Optional |
*/
contextViewType?: $Fields.contextViewType.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.contextViewType<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The type of user view to which the notification subscription context is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserContextViewType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationSubscription} |
* | **Path** | `NotificationSubscription.userContextViewType` |
* | **Nullability** | Optional |
*/
userContextViewType?: $Fields.userContextViewType.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.userContextViewType<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether the subscription is active or not.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$NotificationSubscription} |
* | **Path** | `NotificationSubscription.active` |
* | **Nullability** | Required |
*/
active?: $Fields.active.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.active<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
      /**
* Inline fragment selection for {@link $Schema.CustomerNotificationSubscription} implementor.
*
* When the runtime value is of type {@link $Schema.CustomerNotificationSubscription}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNotificationSubscription} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.NotificationSubscription} |
* | **Path** | `NotificationSubscription -> CustomerNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.notificationsubscriptions({
* id: true,
* name: true,
* ___on_CustomerNotificationSubscription: {
* // ... CustomerNotificationSubscription-specific fields
* }
* })
* ```
*/
___on_CustomerNotificationSubscription?: $Named.CustomerNotificationSubscription<_$Context>
/**
* Inline fragment selection for {@link $Schema.CustomViewNotificationSubscription} implementor.
*
* When the runtime value is of type {@link $Schema.CustomViewNotificationSubscription}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomViewNotificationSubscription} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.NotificationSubscription} |
* | **Path** | `NotificationSubscription -> CustomViewNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.notificationsubscriptions({
* id: true,
* name: true,
* ___on_CustomViewNotificationSubscription: {
* // ... CustomViewNotificationSubscription-specific fields
* }
* })
* ```
*/
___on_CustomViewNotificationSubscription?: $Named.CustomViewNotificationSubscription<_$Context>
/**
* Inline fragment selection for {@link $Schema.CycleNotificationSubscription} implementor.
*
* When the runtime value is of type {@link $Schema.CycleNotificationSubscription}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CycleNotificationSubscription} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.NotificationSubscription} |
* | **Path** | `NotificationSubscription -> CycleNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.notificationsubscriptions({
* id: true,
* name: true,
* ___on_CycleNotificationSubscription: {
* // ... CycleNotificationSubscription-specific fields
* }
* })
* ```
*/
___on_CycleNotificationSubscription?: $Named.CycleNotificationSubscription<_$Context>
/**
* Inline fragment selection for {@link $Schema.LabelNotificationSubscription} implementor.
*
* When the runtime value is of type {@link $Schema.LabelNotificationSubscription}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.LabelNotificationSubscription} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.NotificationSubscription} |
* | **Path** | `NotificationSubscription -> LabelNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.notificationsubscriptions({
* id: true,
* name: true,
* ___on_LabelNotificationSubscription: {
* // ... LabelNotificationSubscription-specific fields
* }
* })
* ```
*/
___on_LabelNotificationSubscription?: $Named.LabelNotificationSubscription<_$Context>
/**
* Inline fragment selection for {@link $Schema.ProjectNotificationSubscription} implementor.
*
* When the runtime value is of type {@link $Schema.ProjectNotificationSubscription}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectNotificationSubscription} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.NotificationSubscription} |
* | **Path** | `NotificationSubscription -> ProjectNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.notificationsubscriptions({
* id: true,
* name: true,
* ___on_ProjectNotificationSubscription: {
* // ... ProjectNotificationSubscription-specific fields
* }
* })
* ```
*/
___on_ProjectNotificationSubscription?: $Named.ProjectNotificationSubscription<_$Context>
/**
* Inline fragment selection for {@link $Schema.InitiativeNotificationSubscription} implementor.
*
* When the runtime value is of type {@link $Schema.InitiativeNotificationSubscription}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeNotificationSubscription} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.NotificationSubscription} |
* | **Path** | `NotificationSubscription -> InitiativeNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.notificationsubscriptions({
* id: true,
* name: true,
* ___on_InitiativeNotificationSubscription: {
* // ... InitiativeNotificationSubscription-specific fields
* }
* })
* ```
*/
___on_InitiativeNotificationSubscription?: $Named.InitiativeNotificationSubscription<_$Context>
/**
* Inline fragment selection for {@link $Schema.TeamNotificationSubscription} implementor.
*
* When the runtime value is of type {@link $Schema.TeamNotificationSubscription}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamNotificationSubscription} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.NotificationSubscription} |
* | **Path** | `NotificationSubscription -> TeamNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.notificationsubscriptions({
* id: true,
* name: true,
* ___on_TeamNotificationSubscription: {
* // ... TeamNotificationSubscription-specific fields
* }
* })
* ```
*/
___on_TeamNotificationSubscription?: $Named.TeamNotificationSubscription<_$Context>
/**
* Inline fragment selection for {@link $Schema.UserNotificationSubscription} implementor.
*
* When the runtime value is of type {@link $Schema.UserNotificationSubscription}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserNotificationSubscription} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.NotificationSubscription} |
* | **Path** | `NotificationSubscription -> UserNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.notificationsubscriptions({
* id: true,
* name: true,
* ___on_UserNotificationSubscription: {
* // ... UserNotificationSubscription-specific fields
* }
* })
* ```
*/
___on_UserNotificationSubscription?: $Named.UserNotificationSubscription<_$Context>
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
* A meta field. Is the name of the type being selected. Since this is a interface type and thus polymorphic,
* the name is one of the implementor type names, whichever is ultimately returned at runtime.
*
* @see {@link https://graphql.org/learn/queries/#meta-fields | Meta Fields}
*/
__typename?: GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
    
}