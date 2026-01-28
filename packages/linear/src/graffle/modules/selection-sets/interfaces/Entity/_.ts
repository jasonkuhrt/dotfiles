import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as $Fields from './fields.js'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'
import type * as $Named from '../../$named.js'

export type * as Entity from './__.js'

/**
* Selection set for {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface}.
*
* A basic entity.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface ↗} |
* | **Fields** | 4 |
* | **Implementors** | {@link $Schema.CustomerNotificationSubscription}, {@link $Schema.CustomViewNotificationSubscription}, {@link $Schema.CycleNotificationSubscription}, {@link $Schema.LabelNotificationSubscription}, {@link $Schema.ProjectNotificationSubscription}, {@link $Schema.InitiativeNotificationSubscription}, {@link $Schema.TeamNotificationSubscription}, {@link $Schema.UserNotificationSubscription}, {@link $Schema.IssueNotification}, {@link $Schema.ProjectNotification}, {@link $Schema.InitiativeNotification}, {@link $Schema.OauthClientApprovalNotification}, {@link $Schema.DocumentNotification}, {@link $Schema.PostNotification}, {@link $Schema.CustomerNeedNotification}, {@link $Schema.CustomerNotification}, {@link $Schema.PullRequestNotification}, {@link $Schema.NotificationSubscription}, {@link $Schema.Notification} |
*/
export interface Entity<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.ObjectLike {

      /**
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Entity} |
* | **Path** | `Entity.id` |
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
* | **Parent** | {@link $NamedTypes.$Entity} |
* | **Path** | `Entity.createdAt` |
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
* | **Parent** | {@link $NamedTypes.$Entity} |
* | **Path** | `Entity.updatedAt` |
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
* | **Parent** | {@link $NamedTypes.$Entity} |
* | **Path** | `Entity.archivedAt` |
* | **Nullability** | Optional |
*/
archivedAt?: $Fields.archivedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.archivedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
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
* | **Parent** | {@link $Schema.Entity} |
* | **Path** | `Entity -> CustomerNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.entitys({
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
* | **Parent** | {@link $Schema.Entity} |
* | **Path** | `Entity -> CustomViewNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.entitys({
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
* | **Parent** | {@link $Schema.Entity} |
* | **Path** | `Entity -> CycleNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.entitys({
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
* | **Parent** | {@link $Schema.Entity} |
* | **Path** | `Entity -> LabelNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.entitys({
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
* | **Parent** | {@link $Schema.Entity} |
* | **Path** | `Entity -> ProjectNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.entitys({
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
* | **Parent** | {@link $Schema.Entity} |
* | **Path** | `Entity -> InitiativeNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.entitys({
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
* | **Parent** | {@link $Schema.Entity} |
* | **Path** | `Entity -> TeamNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.entitys({
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
* | **Parent** | {@link $Schema.Entity} |
* | **Path** | `Entity -> UserNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.entitys({
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
* Inline fragment selection for {@link $Schema.IssueNotification} implementor.
*
* When the runtime value is of type {@link $Schema.IssueNotification}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueNotification} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Entity} |
* | **Path** | `Entity -> IssueNotification` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.entitys({
* id: true,
* name: true,
* ___on_IssueNotification: {
* // ... IssueNotification-specific fields
* }
* })
* ```
*/
___on_IssueNotification?: $Named.IssueNotification<_$Context>
/**
* Inline fragment selection for {@link $Schema.ProjectNotification} implementor.
*
* When the runtime value is of type {@link $Schema.ProjectNotification}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectNotification} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Entity} |
* | **Path** | `Entity -> ProjectNotification` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.entitys({
* id: true,
* name: true,
* ___on_ProjectNotification: {
* // ... ProjectNotification-specific fields
* }
* })
* ```
*/
___on_ProjectNotification?: $Named.ProjectNotification<_$Context>
/**
* Inline fragment selection for {@link $Schema.InitiativeNotification} implementor.
*
* When the runtime value is of type {@link $Schema.InitiativeNotification}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeNotification} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Entity} |
* | **Path** | `Entity -> InitiativeNotification` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.entitys({
* id: true,
* name: true,
* ___on_InitiativeNotification: {
* // ... InitiativeNotification-specific fields
* }
* })
* ```
*/
___on_InitiativeNotification?: $Named.InitiativeNotification<_$Context>
/**
* Inline fragment selection for {@link $Schema.OauthClientApprovalNotification} implementor.
*
* When the runtime value is of type {@link $Schema.OauthClientApprovalNotification}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OauthClientApprovalNotification} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Entity} |
* | **Path** | `Entity -> OauthClientApprovalNotification` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.entitys({
* id: true,
* name: true,
* ___on_OauthClientApprovalNotification: {
* // ... OauthClientApprovalNotification-specific fields
* }
* })
* ```
*/
___on_OauthClientApprovalNotification?: $Named.OauthClientApprovalNotification<_$Context>
/**
* Inline fragment selection for {@link $Schema.DocumentNotification} implementor.
*
* When the runtime value is of type {@link $Schema.DocumentNotification}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentNotification} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Entity} |
* | **Path** | `Entity -> DocumentNotification` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.entitys({
* id: true,
* name: true,
* ___on_DocumentNotification: {
* // ... DocumentNotification-specific fields
* }
* })
* ```
*/
___on_DocumentNotification?: $Named.DocumentNotification<_$Context>
/**
* Inline fragment selection for {@link $Schema.PostNotification} implementor.
*
* When the runtime value is of type {@link $Schema.PostNotification}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PostNotification} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Entity} |
* | **Path** | `Entity -> PostNotification` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.entitys({
* id: true,
* name: true,
* ___on_PostNotification: {
* // ... PostNotification-specific fields
* }
* })
* ```
*/
___on_PostNotification?: $Named.PostNotification<_$Context>
/**
* Inline fragment selection for {@link $Schema.CustomerNeedNotification} implementor.
*
* When the runtime value is of type {@link $Schema.CustomerNeedNotification}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedNotification} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Entity} |
* | **Path** | `Entity -> CustomerNeedNotification` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.entitys({
* id: true,
* name: true,
* ___on_CustomerNeedNotification: {
* // ... CustomerNeedNotification-specific fields
* }
* })
* ```
*/
___on_CustomerNeedNotification?: $Named.CustomerNeedNotification<_$Context>
/**
* Inline fragment selection for {@link $Schema.CustomerNotification} implementor.
*
* When the runtime value is of type {@link $Schema.CustomerNotification}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNotification} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Entity} |
* | **Path** | `Entity -> CustomerNotification` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.entitys({
* id: true,
* name: true,
* ___on_CustomerNotification: {
* // ... CustomerNotification-specific fields
* }
* })
* ```
*/
___on_CustomerNotification?: $Named.CustomerNotification<_$Context>
/**
* Inline fragment selection for {@link $Schema.PullRequestNotification} implementor.
*
* When the runtime value is of type {@link $Schema.PullRequestNotification}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PullRequestNotification} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Entity} |
* | **Path** | `Entity -> PullRequestNotification` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.entitys({
* id: true,
* name: true,
* ___on_PullRequestNotification: {
* // ... PullRequestNotification-specific fields
* }
* })
* ```
*/
___on_PullRequestNotification?: $Named.PullRequestNotification<_$Context>
/**
* Inline fragment selection for {@link $Schema.NotificationSubscription} implementor.
*
* When the runtime value is of type {@link $Schema.NotificationSubscription}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationSubscription} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Entity} |
* | **Path** | `Entity -> NotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.entitys({
* id: true,
* name: true,
* ___on_NotificationSubscription: {
* // ... NotificationSubscription-specific fields
* }
* })
* ```
*/
___on_NotificationSubscription?: $Named.NotificationSubscription<_$Context>
/**
* Inline fragment selection for {@link $Schema.Notification} implementor.
*
* When the runtime value is of type {@link $Schema.Notification}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Notification} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Entity} |
* | **Path** | `Entity -> Notification` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.entitys({
* id: true,
* name: true,
* ___on_Notification: {
* // ... Notification-specific fields
* }
* })
* ```
*/
___on_Notification?: $Named.Notification<_$Context>
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