import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type workflowStateCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = workflowStateCreate.$SelectionSet<_$Context>

export namespace workflowStateCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.WorkflowStatePayload<_$Context> {
/**
* Arguments for `workflowStateCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The state to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `WorkflowStateCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.workflowStateCreate |
* | **Path** | `Mutation.workflowStateCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.WorkflowStateCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `workflowStateCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type workflowStateUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = workflowStateUpdate.$SelectionSet<_$Context>

export namespace workflowStateUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.WorkflowStatePayload<_$Context> {
/**
* Arguments for `workflowStateUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial state object to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `WorkflowStateUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.workflowStateUpdate |
* | **Path** | `Mutation.workflowStateUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.WorkflowStateUpdateInput<_$Context>>
/**
* The identifier of the state to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.workflowStateUpdate |
* | **Path** | `Mutation.workflowStateUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `workflowStateUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type workflowStateArchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = workflowStateArchive.$SelectionSet<_$Context>

export namespace workflowStateArchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.WorkflowStateArchivePayload<_$Context> {
/**
* Arguments for `workflowStateArchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the state to archive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.workflowStateArchive |
* | **Path** | `Mutation.workflowStateArchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `workflowStateArchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type webhookCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = webhookCreate.$SelectionSet<_$Context>

export namespace webhookCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.WebhookPayload<_$Context> {
/**
* Arguments for `webhookCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The webhook object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `WebhookCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.webhookCreate |
* | **Path** | `Mutation.webhookCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.WebhookCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `webhookCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type webhookUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = webhookUpdate.$SelectionSet<_$Context>

export namespace webhookUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.WebhookPayload<_$Context> {
/**
* Arguments for `webhookUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the Webhook.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `WebhookUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.webhookUpdate |
* | **Path** | `Mutation.webhookUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.WebhookUpdateInput<_$Context>>
/**
* The identifier of the Webhook.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.webhookUpdate |
* | **Path** | `Mutation.webhookUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `webhookUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type webhookDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = webhookDelete.$SelectionSet<_$Context>

export namespace webhookDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `webhookDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the Webhook to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.webhookDelete |
* | **Path** | `Mutation.webhookDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `webhookDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type webhookRotateSecret<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = webhookRotateSecret.$SelectionSet<_$Context>

export namespace webhookRotateSecret {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.WebhookRotateSecretPayload<_$Context> {
/**
* Arguments for `webhookRotateSecret` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the Webhook to rotate the secret for.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.webhookRotateSecret |
* | **Path** | `Mutation.webhookRotateSecret(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `webhookRotateSecret` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type viewPreferencesCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = viewPreferencesCreate.$SelectionSet<_$Context>

export namespace viewPreferencesCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ViewPreferencesPayload<_$Context> {
/**
* Arguments for `viewPreferencesCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The ViewPreferences object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ViewPreferencesCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.viewPreferencesCreate |
* | **Path** | `Mutation.viewPreferencesCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ViewPreferencesCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `viewPreferencesCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type viewPreferencesUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = viewPreferencesUpdate.$SelectionSet<_$Context>

export namespace viewPreferencesUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ViewPreferencesPayload<_$Context> {
/**
* Arguments for `viewPreferencesUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the view preferences.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ViewPreferencesUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.viewPreferencesUpdate |
* | **Path** | `Mutation.viewPreferencesUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ViewPreferencesUpdateInput<_$Context>>
/**
* The identifier of the ViewPreferences object.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.viewPreferencesUpdate |
* | **Path** | `Mutation.viewPreferencesUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `viewPreferencesUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type viewPreferencesDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = viewPreferencesDelete.$SelectionSet<_$Context>

export namespace viewPreferencesDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `viewPreferencesDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the ViewPreferences to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.viewPreferencesDelete |
* | **Path** | `Mutation.viewPreferencesDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `viewPreferencesDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type userSettingsUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = userSettingsUpdate.$SelectionSet<_$Context>

export namespace userSettingsUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UserSettingsPayload<_$Context> {
/**
* Arguments for `userSettingsUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial notification object to update the settings with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `UserSettingsUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userSettingsUpdate |
* | **Path** | `Mutation.userSettingsUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserSettingsUpdateInput<_$Context>>
/**
* The identifier of the userSettings to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userSettingsUpdate |
* | **Path** | `Mutation.userSettingsUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `userSettingsUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type userSettingsFlagsReset<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = userSettingsFlagsReset.$SelectionSet<_$Context>

export namespace userSettingsFlagsReset {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UserSettingsFlagsResetPayload<_$Context> {
/**
* Arguments for `userSettingsFlagsReset` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The flags to reset. If not provided all flags will be reset.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `[UserFlagType!]` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userSettingsFlagsReset |
* | **Path** | `Mutation.userSettingsFlagsReset(flags)` |
* | **Nullability** | Optional |
*/
readonly $flags?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserFlagType | null | undefined>> | null | undefined>
}

/**
* This is the "expanded" version of the `userSettingsFlagsReset` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type userFlagUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = userFlagUpdate.$SelectionSet<_$Context>

export namespace userFlagUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UserSettingsFlagPayload<_$Context> {
/**
* Arguments for `userFlagUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Flag operation to perform.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `UserFlagUpdateOperation!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userFlagUpdate |
* | **Path** | `Mutation.userFlagUpdate(operation)` |
* | **Nullability** | Required |
*/
readonly $operation: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserFlagUpdateOperation>
/**
* Settings flag to increment.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `UserFlagType!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userFlagUpdate |
* | **Path** | `Mutation.userFlagUpdate(flag)` |
* | **Nullability** | Required |
*/
readonly $flag: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserFlagType>
}

/**
* This is the "expanded" version of the `userFlagUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type notificationCategoryChannelSubscriptionUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = notificationCategoryChannelSubscriptionUpdate.$SelectionSet<_$Context>

export namespace notificationCategoryChannelSubscriptionUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UserSettingsPayload<_$Context> {
/**
* Arguments for `notificationCategoryChannelSubscriptionUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The notification channel in which to subscribe to or unsubscribe from the category
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `NotificationChannel!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.notificationCategoryChannelSubscriptionUpdate |
* | **Path** | `Mutation.notificationCategoryChannelSubscriptionUpdate(channel)` |
* | **Nullability** | Required |
*/
readonly $channel: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotificationChannel>
/**
* The notification category to subscribe to or unsubscribe from
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `NotificationCategory!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.notificationCategoryChannelSubscriptionUpdate |
* | **Path** | `Mutation.notificationCategoryChannelSubscriptionUpdate(category)` |
* | **Nullability** | Required |
*/
readonly $category: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotificationCategory>
/**
* True if the user wants to subscribe, false if the user wants to unsubscribe
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.notificationCategoryChannelSubscriptionUpdate |
* | **Path** | `Mutation.notificationCategoryChannelSubscriptionUpdate(subscribe)` |
* | **Nullability** | Required |
*/
readonly subscribe: $Scalars.Boolean$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `notificationCategoryChannelSubscriptionUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type userUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = userUpdate.$SelectionSet<_$Context>

export namespace userUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UserPayload<_$Context> {
/**
* Arguments for `userUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial user object to update the user with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `UserUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userUpdate |
* | **Path** | `Mutation.userUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserUpdateInput<_$Context>>
/**
* The identifier of the user to update. Use `me` to reference currently authenticated user.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userUpdate |
* | **Path** | `Mutation.userUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `userUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type userDiscordConnect<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = userDiscordConnect.$SelectionSet<_$Context>

export namespace userDiscordConnect {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UserPayload<_$Context> {
/**
* Arguments for `userDiscordConnect` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Discord OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userDiscordConnect |
* | **Path** | `Mutation.userDiscordConnect(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
/**
* The Discord OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userDiscordConnect |
* | **Path** | `Mutation.userDiscordConnect(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `userDiscordConnect` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type userExternalUserDisconnect<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = userExternalUserDisconnect.$SelectionSet<_$Context>

export namespace userExternalUserDisconnect {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UserPayload<_$Context> {
/**
* Arguments for `userExternalUserDisconnect` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The external service to disconnect.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userExternalUserDisconnect |
* | **Path** | `Mutation.userExternalUserDisconnect(service)` |
* | **Nullability** | Required |
*/
readonly service: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `userExternalUserDisconnect` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type userChangeRole<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = userChangeRole.$SelectionSet<_$Context>

export namespace userChangeRole {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UserAdminPayload<_$Context> {
/**
* Arguments for `userChangeRole` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The new role for the user.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `UserRoleType!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userChangeRole |
* | **Path** | `Mutation.userChangeRole(role)` |
* | **Nullability** | Required |
*/
readonly $role: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserRoleType>
/**
* The identifier of the user
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userChangeRole |
* | **Path** | `Mutation.userChangeRole(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `userChangeRole` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type userPromoteAdmin<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = userPromoteAdmin.$SelectionSet<_$Context>

export namespace userPromoteAdmin {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UserAdminPayload<_$Context> {
/**
* Arguments for `userPromoteAdmin` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the user to make an admin.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userPromoteAdmin |
* | **Path** | `Mutation.userPromoteAdmin(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `userPromoteAdmin` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type userDemoteAdmin<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = userDemoteAdmin.$SelectionSet<_$Context>

export namespace userDemoteAdmin {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UserAdminPayload<_$Context> {
/**
* Arguments for `userDemoteAdmin` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the user to make a regular user.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userDemoteAdmin |
* | **Path** | `Mutation.userDemoteAdmin(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `userDemoteAdmin` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type userPromoteMember<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = userPromoteMember.$SelectionSet<_$Context>

export namespace userPromoteMember {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UserAdminPayload<_$Context> {
/**
* Arguments for `userPromoteMember` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the user to make a regular user.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userPromoteMember |
* | **Path** | `Mutation.userPromoteMember(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `userPromoteMember` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type userDemoteMember<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = userDemoteMember.$SelectionSet<_$Context>

export namespace userDemoteMember {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UserAdminPayload<_$Context> {
/**
* Arguments for `userDemoteMember` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the user to make a guest.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userDemoteMember |
* | **Path** | `Mutation.userDemoteMember(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `userDemoteMember` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type userSuspend<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = userSuspend.$SelectionSet<_$Context>

export namespace userSuspend {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UserAdminPayload<_$Context> {
/**
* Arguments for `userSuspend` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the user to suspend.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userSuspend |
* | **Path** | `Mutation.userSuspend(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `userSuspend` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type userRevokeAllSessions<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = userRevokeAllSessions.$SelectionSet<_$Context>

export namespace userRevokeAllSessions {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UserAdminPayload<_$Context> {
/**
* Arguments for `userRevokeAllSessions` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the user to logout all sessions of.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userRevokeAllSessions |
* | **Path** | `Mutation.userRevokeAllSessions(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `userRevokeAllSessions` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type userRevokeSession<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = userRevokeSession.$SelectionSet<_$Context>

export namespace userRevokeSession {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UserAdminPayload<_$Context> {
/**
* Arguments for `userRevokeSession` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the session to revoke.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userRevokeSession |
* | **Path** | `Mutation.userRevokeSession(sessionId)` |
* | **Nullability** | Required |
*/
readonly sessionId: $Scalars.String$NonNull<_$Context>
/**
* The identifier of the user whose session to revoke.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userRevokeSession |
* | **Path** | `Mutation.userRevokeSession(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `userRevokeSession` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type userUnsuspend<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = userUnsuspend.$SelectionSet<_$Context>

export namespace userUnsuspend {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UserAdminPayload<_$Context> {
/**
* Arguments for `userUnsuspend` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the user to unsuspend.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userUnsuspend |
* | **Path** | `Mutation.userUnsuspend(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `userUnsuspend` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type userUnlinkFromIdentityProvider<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = userUnlinkFromIdentityProvider.$SelectionSet<_$Context>

export namespace userUnlinkFromIdentityProvider {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UserAdminPayload<_$Context> {
/**
* Arguments for `userUnlinkFromIdentityProvider` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the guest user to unlink from their identity provider.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.userUnlinkFromIdentityProvider |
* | **Path** | `Mutation.userUnlinkFromIdentityProvider(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `userUnlinkFromIdentityProvider` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type triageResponsibilityCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = triageResponsibilityCreate.$SelectionSet<_$Context>

export namespace triageResponsibilityCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TriageResponsibilityPayload<_$Context> {
/**
* Arguments for `triageResponsibilityCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the triage responsibility to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `TriageResponsibilityCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.triageResponsibilityCreate |
* | **Path** | `Mutation.triageResponsibilityCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TriageResponsibilityCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `triageResponsibilityCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type triageResponsibilityUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = triageResponsibilityUpdate.$SelectionSet<_$Context>

export namespace triageResponsibilityUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TriageResponsibilityPayload<_$Context> {
/**
* Arguments for `triageResponsibilityUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the triage responsibility to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `TriageResponsibilityUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.triageResponsibilityUpdate |
* | **Path** | `Mutation.triageResponsibilityUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TriageResponsibilityUpdateInput<_$Context>>
/**
* The identifier of the triage responsibility to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.triageResponsibilityUpdate |
* | **Path** | `Mutation.triageResponsibilityUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `triageResponsibilityUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type triageResponsibilityDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = triageResponsibilityDelete.$SelectionSet<_$Context>

export namespace triageResponsibilityDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `triageResponsibilityDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the triage responsibility to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.triageResponsibilityDelete |
* | **Path** | `Mutation.triageResponsibilityDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `triageResponsibilityDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type timeScheduleCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = timeScheduleCreate.$SelectionSet<_$Context>

export namespace timeScheduleCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TimeSchedulePayload<_$Context> {
/**
* Arguments for `timeScheduleCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the time schedule to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `TimeScheduleCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.timeScheduleCreate |
* | **Path** | `Mutation.timeScheduleCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TimeScheduleCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `timeScheduleCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type timeScheduleUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = timeScheduleUpdate.$SelectionSet<_$Context>

export namespace timeScheduleUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TimeSchedulePayload<_$Context> {
/**
* Arguments for `timeScheduleUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the time schedule to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `TimeScheduleUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.timeScheduleUpdate |
* | **Path** | `Mutation.timeScheduleUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TimeScheduleUpdateInput<_$Context>>
/**
* The identifier of the time schedule to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.timeScheduleUpdate |
* | **Path** | `Mutation.timeScheduleUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `timeScheduleUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type timeScheduleUpsertExternal<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = timeScheduleUpsertExternal.$SelectionSet<_$Context>

export namespace timeScheduleUpsertExternal {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TimeSchedulePayload<_$Context> {
/**
* Arguments for `timeScheduleUpsertExternal` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the time schedule to insert or update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `TimeScheduleUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.timeScheduleUpsertExternal |
* | **Path** | `Mutation.timeScheduleUpsertExternal(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TimeScheduleUpdateInput<_$Context>>
/**
* The unique identifier of the external schedule.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.timeScheduleUpsertExternal |
* | **Path** | `Mutation.timeScheduleUpsertExternal(externalId)` |
* | **Nullability** | Required |
*/
readonly externalId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `timeScheduleUpsertExternal` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type timeScheduleDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = timeScheduleDelete.$SelectionSet<_$Context>

export namespace timeScheduleDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `timeScheduleDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the time schedule to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.timeScheduleDelete |
* | **Path** | `Mutation.timeScheduleDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `timeScheduleDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type timeScheduleRefreshIntegrationSchedule<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = timeScheduleRefreshIntegrationSchedule.$SelectionSet<_$Context>

export namespace timeScheduleRefreshIntegrationSchedule {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TimeSchedulePayload<_$Context> {
/**
* Arguments for `timeScheduleRefreshIntegrationSchedule` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the time schedule to refresh.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.timeScheduleRefreshIntegrationSchedule |
* | **Path** | `Mutation.timeScheduleRefreshIntegrationSchedule(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `timeScheduleRefreshIntegrationSchedule` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type templateCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = templateCreate.$SelectionSet<_$Context>

export namespace templateCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TemplatePayload<_$Context> {
/**
* Arguments for `templateCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The template object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `TemplateCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.templateCreate |
* | **Path** | `Mutation.templateCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TemplateCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `templateCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type templateUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = templateUpdate.$SelectionSet<_$Context>

export namespace templateUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TemplatePayload<_$Context> {
/**
* Arguments for `templateUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the template to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `TemplateUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.templateUpdate |
* | **Path** | `Mutation.templateUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TemplateUpdateInput<_$Context>>
/**
* The identifier of the template.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.templateUpdate |
* | **Path** | `Mutation.templateUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `templateUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type templateDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = templateDelete.$SelectionSet<_$Context>

export namespace templateDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `templateDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the template to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.templateDelete |
* | **Path** | `Mutation.templateDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `templateDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectCreate.$SelectionSet<_$Context>

export namespace projectCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectPayload<_$Context> {
/**
* Arguments for `projectCreate` field. Some (1/2) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether to connect a Slack channel to the project.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectCreate |
* | **Path** | `Mutation.projectCreate(connectSlackChannel)` |
* | **Nullability** | Optional |
*/
readonly connectSlackChannel?: $Scalars.Boolean<_$Context>
/**
* The issue object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ProjectCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectCreate |
* | **Path** | `Mutation.projectCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `projectCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectUpdate.$SelectionSet<_$Context>

export namespace projectUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectPayload<_$Context> {
/**
* Arguments for `projectUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial project object to update the project with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ProjectUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectUpdate |
* | **Path** | `Mutation.projectUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectUpdateInput<_$Context>>
/**
* The identifier of the project to update. Also the identifier from the URL is accepted.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectUpdate |
* | **Path** | `Mutation.projectUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectReassignStatus<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectReassignStatus.$SelectionSet<_$Context>

export namespace projectReassignStatus {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.SuccessPayload<_$Context> {
/**
* Arguments for `projectReassignStatus` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the new project status to update the projects to.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectReassignStatus |
* | **Path** | `Mutation.projectReassignStatus(newProjectStatusId)` |
* | **Nullability** | Required |
*/
readonly newProjectStatusId: $Scalars.String$NonNull<_$Context>
/**
* The identifier of the project status with which projects will be updated.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectReassignStatus |
* | **Path** | `Mutation.projectReassignStatus(originalProjectStatusId)` |
* | **Nullability** | Required |
*/
readonly originalProjectStatusId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectReassignStatus` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectDelete.$SelectionSet<_$Context>

export namespace projectDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectArchivePayload<_$Context> {
/**
* Arguments for `projectDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the project to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectDelete |
* | **Path** | `Mutation.projectDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectArchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectArchive.$SelectionSet<_$Context>

export namespace projectArchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectArchivePayload<_$Context> {
/**
* Arguments for `projectArchive` field. Some (1/2) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether to trash the project.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectArchive |
* | **Path** | `Mutation.projectArchive(trash)` |
* | **Nullability** | Optional |
*/
readonly trash?: $Scalars.Boolean<_$Context>
/**
* The identifier of the project to archive. Also the identifier from the URL is accepted.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectArchive |
* | **Path** | `Mutation.projectArchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectArchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectUnarchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectUnarchive.$SelectionSet<_$Context>

export namespace projectUnarchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectArchivePayload<_$Context> {
/**
* Arguments for `projectUnarchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the project to restore. Also the identifier from the URL is accepted.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectUnarchive |
* | **Path** | `Mutation.projectUnarchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectUnarchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectAddLabel<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectAddLabel.$SelectionSet<_$Context>

export namespace projectAddLabel {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectPayload<_$Context> {
/**
* Arguments for `projectAddLabel` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the label to add.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectAddLabel |
* | **Path** | `Mutation.projectAddLabel(labelId)` |
* | **Nullability** | Required |
*/
readonly labelId: $Scalars.String$NonNull<_$Context>
/**
* The identifier of the project to add the label to.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectAddLabel |
* | **Path** | `Mutation.projectAddLabel(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectAddLabel` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectRemoveLabel<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectRemoveLabel.$SelectionSet<_$Context>

export namespace projectRemoveLabel {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectPayload<_$Context> {
/**
* Arguments for `projectRemoveLabel` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the label to remove.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectRemoveLabel |
* | **Path** | `Mutation.projectRemoveLabel(labelId)` |
* | **Nullability** | Required |
*/
readonly labelId: $Scalars.String$NonNull<_$Context>
/**
* The identifier of the project to remove the label from.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectRemoveLabel |
* | **Path** | `Mutation.projectRemoveLabel(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectRemoveLabel` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectExternalSyncDisable<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectExternalSyncDisable.$SelectionSet<_$Context>

export namespace projectExternalSyncDisable {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectPayload<_$Context> {
/**
* Arguments for `projectExternalSyncDisable` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The source of the external sync to disable.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ExternalSyncService!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectExternalSyncDisable |
* | **Path** | `Mutation.projectExternalSyncDisable(syncSource)` |
* | **Nullability** | Required |
*/
readonly $syncSource: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ExternalSyncService>
/**
* The ID of the project to disable external sync for.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectExternalSyncDisable |
* | **Path** | `Mutation.projectExternalSyncDisable(projectId)` |
* | **Nullability** | Required |
*/
readonly projectId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectExternalSyncDisable` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type teamCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = teamCreate.$SelectionSet<_$Context>

export namespace teamCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TeamPayload<_$Context> {
/**
* Arguments for `teamCreate` field. Some (1/2) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The team id to copy settings from, if any.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.teamCreate |
* | **Path** | `Mutation.teamCreate(copySettingsFromTeamId)` |
* | **Nullability** | Optional |
*/
readonly copySettingsFromTeamId?: $Scalars.String<_$Context>
/**
* The team object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `TeamCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.teamCreate |
* | **Path** | `Mutation.teamCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TeamCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `teamCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type teamUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = teamUpdate.$SelectionSet<_$Context>

export namespace teamUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TeamPayload<_$Context> {
/**
* Arguments for `teamUpdate` field. Some (2/3) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* [INTERNAL] Mapping of existing team entities to those inherited from the parent team
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `InheritanceEntityMapping` |
* | **Parent** | {@link $NamedTypes.$Mutation}.teamUpdate |
* | **Path** | `Mutation.teamUpdate(mapping)` |
* | **Nullability** | Optional |
*/
readonly mapping?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InheritanceEntityMapping<_$Context> | null | undefined>
/**
* A partial team object to update the team with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `TeamUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.teamUpdate |
* | **Path** | `Mutation.teamUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TeamUpdateInput<_$Context>>
/**
* The identifier of the team to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.teamUpdate |
* | **Path** | `Mutation.teamUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `teamUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type teamDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = teamDelete.$SelectionSet<_$Context>

export namespace teamDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `teamDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the team to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.teamDelete |
* | **Path** | `Mutation.teamDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `teamDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type teamUnarchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = teamUnarchive.$SelectionSet<_$Context>

export namespace teamUnarchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TeamArchivePayload<_$Context> {
/**
* Arguments for `teamUnarchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the team to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.teamUnarchive |
* | **Path** | `Mutation.teamUnarchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `teamUnarchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type teamCyclesDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = teamCyclesDelete.$SelectionSet<_$Context>

export namespace teamCyclesDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TeamPayload<_$Context> {
/**
* Arguments for `teamCyclesDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the team, which cycles will be deleted.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.teamCyclesDelete |
* | **Path** | `Mutation.teamCyclesDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `teamCyclesDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type teamMembershipCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = teamMembershipCreate.$SelectionSet<_$Context>

export namespace teamMembershipCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TeamMembershipPayload<_$Context> {
/**
* Arguments for `teamMembershipCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The team membership object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `TeamMembershipCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.teamMembershipCreate |
* | **Path** | `Mutation.teamMembershipCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TeamMembershipCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `teamMembershipCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type teamMembershipUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = teamMembershipUpdate.$SelectionSet<_$Context>

export namespace teamMembershipUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TeamMembershipPayload<_$Context> {
/**
* Arguments for `teamMembershipUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial team membership object to update the team membership with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `TeamMembershipUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.teamMembershipUpdate |
* | **Path** | `Mutation.teamMembershipUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TeamMembershipUpdateInput<_$Context>>
/**
* The identifier of the team membership to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.teamMembershipUpdate |
* | **Path** | `Mutation.teamMembershipUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `teamMembershipUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type teamMembershipDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = teamMembershipDelete.$SelectionSet<_$Context>

export namespace teamMembershipDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `teamMembershipDelete` field. Some (1/2) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether to leave the parent teams.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.teamMembershipDelete |
* | **Path** | `Mutation.teamMembershipDelete(alsoLeaveParentTeams)` |
* | **Nullability** | Optional |
*/
readonly alsoLeaveParentTeams?: $Scalars.Boolean<_$Context>
/**
* The identifier of the team membership to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.teamMembershipDelete |
* | **Path** | `Mutation.teamMembershipDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `teamMembershipDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type teamKeyDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = teamKeyDelete.$SelectionSet<_$Context>

export namespace teamKeyDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `teamKeyDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the team key to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.teamKeyDelete |
* | **Path** | `Mutation.teamKeyDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `teamKeyDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type roadmapToProjectCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = roadmapToProjectCreate.$SelectionSet<_$Context>

export namespace roadmapToProjectCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.RoadmapToProjectPayload<_$Context> {
/**
* Arguments for `roadmapToProjectCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the roadmapToProject to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `RoadmapToProjectCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.roadmapToProjectCreate |
* | **Path** | `Mutation.roadmapToProjectCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RoadmapToProjectCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `roadmapToProjectCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type roadmapToProjectUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = roadmapToProjectUpdate.$SelectionSet<_$Context>

export namespace roadmapToProjectUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.RoadmapToProjectPayload<_$Context> {
/**
* Arguments for `roadmapToProjectUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the roadmapToProject to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `RoadmapToProjectUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.roadmapToProjectUpdate |
* | **Path** | `Mutation.roadmapToProjectUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RoadmapToProjectUpdateInput<_$Context>>
/**
* The identifier of the roadmapToProject to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.roadmapToProjectUpdate |
* | **Path** | `Mutation.roadmapToProjectUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `roadmapToProjectUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type roadmapToProjectDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = roadmapToProjectDelete.$SelectionSet<_$Context>

export namespace roadmapToProjectDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `roadmapToProjectDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the roadmapToProject to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.roadmapToProjectDelete |
* | **Path** | `Mutation.roadmapToProjectDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `roadmapToProjectDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type roadmapCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = roadmapCreate.$SelectionSet<_$Context>

export namespace roadmapCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.RoadmapPayload<_$Context> {
/**
* Arguments for `roadmapCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the roadmap to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `RoadmapCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.roadmapCreate |
* | **Path** | `Mutation.roadmapCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RoadmapCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `roadmapCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type roadmapUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = roadmapUpdate.$SelectionSet<_$Context>

export namespace roadmapUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.RoadmapPayload<_$Context> {
/**
* Arguments for `roadmapUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the roadmap to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `RoadmapUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.roadmapUpdate |
* | **Path** | `Mutation.roadmapUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.RoadmapUpdateInput<_$Context>>
/**
* The identifier of the roadmap to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.roadmapUpdate |
* | **Path** | `Mutation.roadmapUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `roadmapUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type roadmapArchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = roadmapArchive.$SelectionSet<_$Context>

export namespace roadmapArchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.RoadmapArchivePayload<_$Context> {
/**
* Arguments for `roadmapArchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the roadmap to archive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.roadmapArchive |
* | **Path** | `Mutation.roadmapArchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `roadmapArchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type roadmapUnarchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = roadmapUnarchive.$SelectionSet<_$Context>

export namespace roadmapUnarchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.RoadmapArchivePayload<_$Context> {
/**
* Arguments for `roadmapUnarchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the roadmap to unarchive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.roadmapUnarchive |
* | **Path** | `Mutation.roadmapUnarchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `roadmapUnarchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type roadmapDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = roadmapDelete.$SelectionSet<_$Context>

export namespace roadmapDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `roadmapDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the roadmap to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.roadmapDelete |
* | **Path** | `Mutation.roadmapDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `roadmapDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type createCsvExportReport<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = createCsvExportReport.$SelectionSet<_$Context>

export namespace createCsvExportReport {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CreateCsvExportReportPayload<_$Context> {
/**
* Arguments for `createCsvExportReport` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `[String!]` |
* | **Parent** | {@link $NamedTypes.$Mutation}.createCsvExportReport |
* | **Path** | `Mutation.createCsvExportReport(includePrivateTeamIds)` |
* | **Nullability** | Optional |
*/
readonly includePrivateTeamIds?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>
}

/**
* This is the "expanded" version of the `createCsvExportReport` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releaseStageCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releaseStageCreate.$SelectionSet<_$Context>

export namespace releaseStageCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReleaseStagePayload<_$Context> {
/**
* Arguments for `releaseStageCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The ReleaseStage object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ReleaseStageCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.releaseStageCreate |
* | **Path** | `Mutation.releaseStageCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReleaseStageCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `releaseStageCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releaseStageUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releaseStageUpdate.$SelectionSet<_$Context>

export namespace releaseStageUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReleaseStagePayload<_$Context> {
/**
* Arguments for `releaseStageUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial ReleaseStage object to update the ReleaseStage with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ReleaseStageUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.releaseStageUpdate |
* | **Path** | `Mutation.releaseStageUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReleaseStageUpdateInput<_$Context>>
/**
* The identifier of the release stage to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.releaseStageUpdate |
* | **Path** | `Mutation.releaseStageUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `releaseStageUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releaseStageArchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releaseStageArchive.$SelectionSet<_$Context>

export namespace releaseStageArchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReleaseStageArchivePayload<_$Context> {
/**
* Arguments for `releaseStageArchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the release stage to archive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.releaseStageArchive |
* | **Path** | `Mutation.releaseStageArchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `releaseStageArchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releaseStageUnarchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releaseStageUnarchive.$SelectionSet<_$Context>

export namespace releaseStageUnarchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReleaseStageArchivePayload<_$Context> {
/**
* Arguments for `releaseStageUnarchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the release stage to unarchive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.releaseStageUnarchive |
* | **Path** | `Mutation.releaseStageUnarchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `releaseStageUnarchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releaseSync<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releaseSync.$SelectionSet<_$Context>

export namespace releaseSync {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReleasePayload<_$Context> {
/**
* Arguments for `releaseSync` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The release data to sync.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ReleaseSyncInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.releaseSync |
* | **Path** | `Mutation.releaseSync(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReleaseSyncInput<_$Context>>
}

/**
* This is the "expanded" version of the `releaseSync` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releaseCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releaseCreate.$SelectionSet<_$Context>

export namespace releaseCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReleasePayload<_$Context> {
/**
* Arguments for `releaseCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The release to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ReleaseCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.releaseCreate |
* | **Path** | `Mutation.releaseCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReleaseCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `releaseCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releaseUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releaseUpdate.$SelectionSet<_$Context>

export namespace releaseUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReleasePayload<_$Context> {
/**
* Arguments for `releaseUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial Release object to update the Release with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ReleaseUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.releaseUpdate |
* | **Path** | `Mutation.releaseUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReleaseUpdateInput<_$Context>>
/**
* The identifier of the release to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.releaseUpdate |
* | **Path** | `Mutation.releaseUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `releaseUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releaseComplete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releaseComplete.$SelectionSet<_$Context>

export namespace releaseComplete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReleasePayload<_$Context> {
/**
* Arguments for `releaseComplete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The input containing the pipeline ID and optional version.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ReleaseCompleteInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.releaseComplete |
* | **Path** | `Mutation.releaseComplete(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReleaseCompleteInput<_$Context>>
}

/**
* This is the "expanded" version of the `releaseComplete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releaseUpdateByPipeline<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releaseUpdateByPipeline.$SelectionSet<_$Context>

export namespace releaseUpdateByPipeline {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReleasePayload<_$Context> {
/**
* Arguments for `releaseUpdateByPipeline` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The input containing the pipeline ID, optional version, and optional stage name.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ReleaseUpdateByPipelineInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.releaseUpdateByPipeline |
* | **Path** | `Mutation.releaseUpdateByPipeline(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReleaseUpdateByPipelineInput<_$Context>>
}

/**
* This is the "expanded" version of the `releaseUpdateByPipeline` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releaseDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releaseDelete.$SelectionSet<_$Context>

export namespace releaseDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `releaseDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the release to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.releaseDelete |
* | **Path** | `Mutation.releaseDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `releaseDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releaseArchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releaseArchive.$SelectionSet<_$Context>

export namespace releaseArchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReleaseArchivePayload<_$Context> {
/**
* Arguments for `releaseArchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the release to archive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.releaseArchive |
* | **Path** | `Mutation.releaseArchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `releaseArchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releaseUnarchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releaseUnarchive.$SelectionSet<_$Context>

export namespace releaseUnarchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReleaseArchivePayload<_$Context> {
/**
* Arguments for `releaseUnarchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the release to unarchive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.releaseUnarchive |
* | **Path** | `Mutation.releaseUnarchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `releaseUnarchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releasePipelineCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releasePipelineCreate.$SelectionSet<_$Context>

export namespace releasePipelineCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReleasePipelinePayload<_$Context> {
/**
* Arguments for `releasePipelineCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The ReleasePipeline object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ReleasePipelineCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.releasePipelineCreate |
* | **Path** | `Mutation.releasePipelineCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReleasePipelineCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `releasePipelineCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releasePipelineUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releasePipelineUpdate.$SelectionSet<_$Context>

export namespace releasePipelineUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReleasePipelinePayload<_$Context> {
/**
* Arguments for `releasePipelineUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial ReleasePipeline object to update the ReleasePipeline with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ReleasePipelineUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.releasePipelineUpdate |
* | **Path** | `Mutation.releasePipelineUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReleasePipelineUpdateInput<_$Context>>
/**
* The identifier of the release pipeline to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.releasePipelineUpdate |
* | **Path** | `Mutation.releasePipelineUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `releasePipelineUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releasePipelineArchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releasePipelineArchive.$SelectionSet<_$Context>

export namespace releasePipelineArchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReleasePipelineArchivePayload<_$Context> {
/**
* Arguments for `releasePipelineArchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the release pipeline to archive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.releasePipelineArchive |
* | **Path** | `Mutation.releasePipelineArchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `releasePipelineArchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releasePipelineUnarchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releasePipelineUnarchive.$SelectionSet<_$Context>

export namespace releasePipelineUnarchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReleasePipelineArchivePayload<_$Context> {
/**
* Arguments for `releasePipelineUnarchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the release pipeline to unarchive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.releasePipelineUnarchive |
* | **Path** | `Mutation.releasePipelineUnarchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `releasePipelineUnarchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releasePipelineDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releasePipelineDelete.$SelectionSet<_$Context>

export namespace releasePipelineDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `releasePipelineDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the release pipeline to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.releasePipelineDelete |
* | **Path** | `Mutation.releasePipelineDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `releasePipelineDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type reactionCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = reactionCreate.$SelectionSet<_$Context>

export namespace reactionCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReactionPayload<_$Context> {
/**
* Arguments for `reactionCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The reaction object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ReactionCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.reactionCreate |
* | **Path** | `Mutation.reactionCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReactionCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `reactionCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type reactionDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = reactionDelete.$SelectionSet<_$Context>

export namespace reactionDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `reactionDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the reaction to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.reactionDelete |
* | **Path** | `Mutation.reactionDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `reactionDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type pushSubscriptionCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = pushSubscriptionCreate.$SelectionSet<_$Context>

export namespace pushSubscriptionCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.PushSubscriptionPayload<_$Context> {
/**
* Arguments for `pushSubscriptionCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The push subscription to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PushSubscriptionCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.pushSubscriptionCreate |
* | **Path** | `Mutation.pushSubscriptionCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PushSubscriptionCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `pushSubscriptionCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type pushSubscriptionDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = pushSubscriptionDelete.$SelectionSet<_$Context>

export namespace pushSubscriptionDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.PushSubscriptionPayload<_$Context> {
/**
* Arguments for `pushSubscriptionDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the push subscription to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.pushSubscriptionDelete |
* | **Path** | `Mutation.pushSubscriptionDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `pushSubscriptionDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectUpdateCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectUpdateCreate.$SelectionSet<_$Context>

export namespace projectUpdateCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectUpdatePayload<_$Context> {
/**
* Arguments for `projectUpdateCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Data for the project update to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ProjectUpdateCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectUpdateCreate |
* | **Path** | `Mutation.projectUpdateCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectUpdateCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `projectUpdateCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectUpdateUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectUpdateUpdate.$SelectionSet<_$Context>

export namespace projectUpdateUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectUpdatePayload<_$Context> {
/**
* Arguments for `projectUpdateUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A data to update the project update with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ProjectUpdateUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectUpdateUpdate |
* | **Path** | `Mutation.projectUpdateUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectUpdateUpdateInput<_$Context>>
/**
* The identifier of the project update to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectUpdateUpdate |
* | **Path** | `Mutation.projectUpdateUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectUpdateUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectUpdateArchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectUpdateArchive.$SelectionSet<_$Context>

export namespace projectUpdateArchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectUpdateArchivePayload<_$Context> {
/**
* Arguments for `projectUpdateArchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the project update to archive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectUpdateArchive |
* | **Path** | `Mutation.projectUpdateArchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectUpdateArchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectUpdateUnarchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectUpdateUnarchive.$SelectionSet<_$Context>

export namespace projectUpdateUnarchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectUpdateArchivePayload<_$Context> {
/**
* Arguments for `projectUpdateUnarchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the project update to unarchive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectUpdateUnarchive |
* | **Path** | `Mutation.projectUpdateUnarchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectUpdateUnarchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectUpdateDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectUpdateDelete.$SelectionSet<_$Context>

export namespace projectUpdateDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `projectUpdateDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the project update to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectUpdateDelete |
* | **Path** | `Mutation.projectUpdateDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectUpdateDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type createProjectUpdateReminder<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = createProjectUpdateReminder.$SelectionSet<_$Context>

export namespace createProjectUpdateReminder {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectUpdateReminderPayload<_$Context> {
/**
* Arguments for `createProjectUpdateReminder` field. Some (1/2) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The user identifier to whom the notification will be sent. By default, it is set to the project lead.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.createProjectUpdateReminder |
* | **Path** | `Mutation.createProjectUpdateReminder(userId)` |
* | **Nullability** | Optional |
*/
readonly userId?: $Scalars.String<_$Context>
/**
* The identifier of the project to remind about.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.createProjectUpdateReminder |
* | **Path** | `Mutation.createProjectUpdateReminder(projectId)` |
* | **Nullability** | Required |
*/
readonly projectId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `createProjectUpdateReminder` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectStatusCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectStatusCreate.$SelectionSet<_$Context>

export namespace projectStatusCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectStatusPayload<_$Context> {
/**
* Arguments for `projectStatusCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The ProjectStatus object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ProjectStatusCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectStatusCreate |
* | **Path** | `Mutation.projectStatusCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectStatusCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `projectStatusCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectStatusUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectStatusUpdate.$SelectionSet<_$Context>

export namespace projectStatusUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectStatusPayload<_$Context> {
/**
* Arguments for `projectStatusUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial ProjectStatus object to update the ProjectStatus with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ProjectStatusUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectStatusUpdate |
* | **Path** | `Mutation.projectStatusUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectStatusUpdateInput<_$Context>>
/**
* The identifier of the project status to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectStatusUpdate |
* | **Path** | `Mutation.projectStatusUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectStatusUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectStatusArchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectStatusArchive.$SelectionSet<_$Context>

export namespace projectStatusArchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectStatusArchivePayload<_$Context> {
/**
* Arguments for `projectStatusArchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the project status to archive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectStatusArchive |
* | **Path** | `Mutation.projectStatusArchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectStatusArchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectStatusUnarchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectStatusUnarchive.$SelectionSet<_$Context>

export namespace projectStatusUnarchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectStatusArchivePayload<_$Context> {
/**
* Arguments for `projectStatusUnarchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the project status to unarchive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectStatusUnarchive |
* | **Path** | `Mutation.projectStatusUnarchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectStatusUnarchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectRelationCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectRelationCreate.$SelectionSet<_$Context>

export namespace projectRelationCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectRelationPayload<_$Context> {
/**
* Arguments for `projectRelationCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The project relation to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ProjectRelationCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectRelationCreate |
* | **Path** | `Mutation.projectRelationCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectRelationCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `projectRelationCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectRelationUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectRelationUpdate.$SelectionSet<_$Context>

export namespace projectRelationUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectRelationPayload<_$Context> {
/**
* Arguments for `projectRelationUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the project relation to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ProjectRelationUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectRelationUpdate |
* | **Path** | `Mutation.projectRelationUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectRelationUpdateInput<_$Context>>
/**
* The identifier of the project relation to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectRelationUpdate |
* | **Path** | `Mutation.projectRelationUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectRelationUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectRelationDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectRelationDelete.$SelectionSet<_$Context>

export namespace projectRelationDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `projectRelationDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the project relation to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectRelationDelete |
* | **Path** | `Mutation.projectRelationDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectRelationDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectMilestoneCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectMilestoneCreate.$SelectionSet<_$Context>

export namespace projectMilestoneCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectMilestonePayload<_$Context> {
/**
* Arguments for `projectMilestoneCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The project milestone to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ProjectMilestoneCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectMilestoneCreate |
* | **Path** | `Mutation.projectMilestoneCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectMilestoneCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `projectMilestoneCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectMilestoneUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectMilestoneUpdate.$SelectionSet<_$Context>

export namespace projectMilestoneUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectMilestonePayload<_$Context> {
/**
* Arguments for `projectMilestoneUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial object to update the project milestone with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ProjectMilestoneUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectMilestoneUpdate |
* | **Path** | `Mutation.projectMilestoneUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectMilestoneUpdateInput<_$Context>>
/**
* The identifier of the project milestone to update. Also the identifier from the URL is accepted.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectMilestoneUpdate |
* | **Path** | `Mutation.projectMilestoneUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectMilestoneUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectMilestoneDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectMilestoneDelete.$SelectionSet<_$Context>

export namespace projectMilestoneDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `projectMilestoneDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the project milestone to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectMilestoneDelete |
* | **Path** | `Mutation.projectMilestoneDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectMilestoneDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectMilestoneMove<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectMilestoneMove.$SelectionSet<_$Context>

export namespace projectMilestoneMove {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectMilestoneMovePayload<_$Context> {
/**
* Arguments for `projectMilestoneMove` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The project to move the milestone to, as well as any additional options need to make a successful move, or undo a previous move.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ProjectMilestoneMoveInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectMilestoneMove |
* | **Path** | `Mutation.projectMilestoneMove(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectMilestoneMoveInput<_$Context>>
/**
* The identifier of the project milestone to move.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectMilestoneMove |
* | **Path** | `Mutation.projectMilestoneMove(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectMilestoneMove` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectLabelCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectLabelCreate.$SelectionSet<_$Context>

export namespace projectLabelCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectLabelPayload<_$Context> {
/**
* Arguments for `projectLabelCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The project label to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ProjectLabelCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectLabelCreate |
* | **Path** | `Mutation.projectLabelCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectLabelCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `projectLabelCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectLabelUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectLabelUpdate.$SelectionSet<_$Context>

export namespace projectLabelUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectLabelPayload<_$Context> {
/**
* Arguments for `projectLabelUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial label object to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ProjectLabelUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectLabelUpdate |
* | **Path** | `Mutation.projectLabelUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectLabelUpdateInput<_$Context>>
/**
* The identifier of the label to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectLabelUpdate |
* | **Path** | `Mutation.projectLabelUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectLabelUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectLabelDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectLabelDelete.$SelectionSet<_$Context>

export namespace projectLabelDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `projectLabelDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the label to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectLabelDelete |
* | **Path** | `Mutation.projectLabelDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectLabelDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectLabelRetire<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectLabelRetire.$SelectionSet<_$Context>

export namespace projectLabelRetire {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectLabelPayload<_$Context> {
/**
* Arguments for `projectLabelRetire` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the label to retire.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectLabelRetire |
* | **Path** | `Mutation.projectLabelRetire(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectLabelRetire` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectLabelRestore<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectLabelRestore.$SelectionSet<_$Context>

export namespace projectLabelRestore {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectLabelPayload<_$Context> {
/**
* Arguments for `projectLabelRestore` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the label to restore.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.projectLabelRestore |
* | **Path** | `Mutation.projectLabelRestore(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectLabelRestore` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organizationUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organizationUpdate.$SelectionSet<_$Context>

export namespace organizationUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.OrganizationPayload<_$Context> {
/**
* Arguments for `organizationUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial organization object to update the organization with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `OrganizationUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.organizationUpdate |
* | **Path** | `Mutation.organizationUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.OrganizationUpdateInput<_$Context>>
}

/**
* This is the "expanded" version of the `organizationUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organizationDeleteChallenge<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organizationDeleteChallenge.$SelectionSet<_$Context>

export namespace organizationDeleteChallenge {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.OrganizationDeletePayload<_$Context> {
}

/**
* This is the "expanded" version of the `organizationDeleteChallenge` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organizationDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organizationDelete.$SelectionSet<_$Context>

export namespace organizationDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.OrganizationDeletePayload<_$Context> {
/**
* Arguments for `organizationDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Information required to delete an organization.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `DeleteOrganizationInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.organizationDelete |
* | **Path** | `Mutation.organizationDelete(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DeleteOrganizationInput<_$Context>>
}

/**
* This is the "expanded" version of the `organizationDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organizationCancelDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organizationCancelDelete.$SelectionSet<_$Context>

export namespace organizationCancelDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.OrganizationCancelDeletePayload<_$Context> {
}

/**
* This is the "expanded" version of the `organizationCancelDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organizationStartTrialForPlan<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organizationStartTrialForPlan.$SelectionSet<_$Context>

export namespace organizationStartTrialForPlan {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.OrganizationStartTrialPayload<_$Context> {
/**
* Arguments for `organizationStartTrialForPlan` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Plan details for trial
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `OrganizationStartTrialInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.organizationStartTrialForPlan |
* | **Path** | `Mutation.organizationStartTrialForPlan(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.OrganizationStartTrialInput<_$Context>>
}

/**
* This is the "expanded" version of the `organizationStartTrialForPlan` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organizationStartTrial<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organizationStartTrial.$SelectionSet<_$Context>

export namespace organizationStartTrial {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.OrganizationStartTrialPayload<_$Context> {
}

/**
* This is the "expanded" version of the `organizationStartTrial` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organizationInviteCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organizationInviteCreate.$SelectionSet<_$Context>

export namespace organizationInviteCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.OrganizationInvitePayload<_$Context> {
/**
* Arguments for `organizationInviteCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The organization invite object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `OrganizationInviteCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.organizationInviteCreate |
* | **Path** | `Mutation.organizationInviteCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.OrganizationInviteCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `organizationInviteCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organizationInviteUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organizationInviteUpdate.$SelectionSet<_$Context>

export namespace organizationInviteUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.OrganizationInvitePayload<_$Context> {
/**
* Arguments for `organizationInviteUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The updates to make to the organization invite object.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `OrganizationInviteUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.organizationInviteUpdate |
* | **Path** | `Mutation.organizationInviteUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.OrganizationInviteUpdateInput<_$Context>>
/**
* The identifier of the organization invite to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.organizationInviteUpdate |
* | **Path** | `Mutation.organizationInviteUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `organizationInviteUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type resendOrganizationInvite<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = resendOrganizationInvite.$SelectionSet<_$Context>

export namespace resendOrganizationInvite {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `resendOrganizationInvite` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the organization invite to re-send.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.resendOrganizationInvite |
* | **Path** | `Mutation.resendOrganizationInvite(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `resendOrganizationInvite` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type resendOrganizationInviteByEmail<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = resendOrganizationInviteByEmail.$SelectionSet<_$Context>

export namespace resendOrganizationInviteByEmail {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `resendOrganizationInviteByEmail` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The email address tied to the organization invite to re-send.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.resendOrganizationInviteByEmail |
* | **Path** | `Mutation.resendOrganizationInviteByEmail(email)` |
* | **Nullability** | Required |
*/
readonly email: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `resendOrganizationInviteByEmail` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organizationInviteDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organizationInviteDelete.$SelectionSet<_$Context>

export namespace organizationInviteDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `organizationInviteDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the organization invite to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.organizationInviteDelete |
* | **Path** | `Mutation.organizationInviteDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `organizationInviteDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organizationDomainClaim<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organizationDomainClaim.$SelectionSet<_$Context>

export namespace organizationDomainClaim {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.OrganizationDomainSimplePayload<_$Context> {
/**
* Arguments for `organizationDomainClaim` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The ID of the organization domain to claim.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.organizationDomainClaim |
* | **Path** | `Mutation.organizationDomainClaim(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `organizationDomainClaim` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organizationDomainVerify<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organizationDomainVerify.$SelectionSet<_$Context>

export namespace organizationDomainVerify {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.OrganizationDomainPayload<_$Context> {
/**
* Arguments for `organizationDomainVerify` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The organization domain to verify.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `OrganizationDomainVerificationInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.organizationDomainVerify |
* | **Path** | `Mutation.organizationDomainVerify(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.OrganizationDomainVerificationInput<_$Context>>
}

/**
* This is the "expanded" version of the `organizationDomainVerify` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organizationDomainCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organizationDomainCreate.$SelectionSet<_$Context>

export namespace organizationDomainCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.OrganizationDomainPayload<_$Context> {
/**
* Arguments for `organizationDomainCreate` field. Some (1/2) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether to trigger an email verification flow during domain creation.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.organizationDomainCreate |
* | **Path** | `Mutation.organizationDomainCreate(triggerEmailVerification)` |
* | **Nullability** | Optional |
*/
readonly triggerEmailVerification?: $Scalars.Boolean<_$Context>
/**
* The organization domain entry to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `OrganizationDomainCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.organizationDomainCreate |
* | **Path** | `Mutation.organizationDomainCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.OrganizationDomainCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `organizationDomainCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organizationDomainUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organizationDomainUpdate.$SelectionSet<_$Context>

export namespace organizationDomainUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.OrganizationDomainPayload<_$Context> {
/**
* Arguments for `organizationDomainUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The organization domain entry to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `OrganizationDomainUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.organizationDomainUpdate |
* | **Path** | `Mutation.organizationDomainUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.OrganizationDomainUpdateInput<_$Context>>
/**
* The identifier of the domain to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.organizationDomainUpdate |
* | **Path** | `Mutation.organizationDomainUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `organizationDomainUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organizationDomainDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organizationDomainDelete.$SelectionSet<_$Context>

export namespace organizationDomainDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `organizationDomainDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the domain to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.organizationDomainDelete |
* | **Path** | `Mutation.organizationDomainDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `organizationDomainDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type notificationSubscriptionCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = notificationSubscriptionCreate.$SelectionSet<_$Context>

export namespace notificationSubscriptionCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.NotificationSubscriptionPayload<_$Context> {
/**
* Arguments for `notificationSubscriptionCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The subscription object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `NotificationSubscriptionCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.notificationSubscriptionCreate |
* | **Path** | `Mutation.notificationSubscriptionCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotificationSubscriptionCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `notificationSubscriptionCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type notificationSubscriptionUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = notificationSubscriptionUpdate.$SelectionSet<_$Context>

export namespace notificationSubscriptionUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.NotificationSubscriptionPayload<_$Context> {
/**
* Arguments for `notificationSubscriptionUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial notification subscription object to update the notification subscription with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `NotificationSubscriptionUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.notificationSubscriptionUpdate |
* | **Path** | `Mutation.notificationSubscriptionUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotificationSubscriptionUpdateInput<_$Context>>
/**
* The identifier of the notification subscription to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.notificationSubscriptionUpdate |
* | **Path** | `Mutation.notificationSubscriptionUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `notificationSubscriptionUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type notificationSubscriptionDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = notificationSubscriptionDelete.$SelectionSet<_$Context>

export namespace notificationSubscriptionDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `notificationSubscriptionDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the notification subscription reference to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.notificationSubscriptionDelete |
* | **Path** | `Mutation.notificationSubscriptionDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `notificationSubscriptionDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type notificationUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = notificationUpdate.$SelectionSet<_$Context>

export namespace notificationUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.NotificationPayload<_$Context> {
/**
* Arguments for `notificationUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial notification object to update the notification with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `NotificationUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.notificationUpdate |
* | **Path** | `Mutation.notificationUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotificationUpdateInput<_$Context>>
/**
* The identifier of the notification to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.notificationUpdate |
* | **Path** | `Mutation.notificationUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `notificationUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type notificationMarkReadAll<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = notificationMarkReadAll.$SelectionSet<_$Context>

export namespace notificationMarkReadAll {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.NotificationBatchActionPayload<_$Context> {
/**
* Arguments for `notificationMarkReadAll` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The time when notification was marked as read.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `DateTime!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.notificationMarkReadAll |
* | **Path** | `Mutation.notificationMarkReadAll(readAt)` |
* | **Nullability** | Required |
*/
readonly readAt: $Scalars.DateTime$NonNull<_$Context>
/**
* The type and id of the entity to archive notifications for.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `NotificationEntityInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.notificationMarkReadAll |
* | **Path** | `Mutation.notificationMarkReadAll(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotificationEntityInput<_$Context>>
}

/**
* This is the "expanded" version of the `notificationMarkReadAll` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type notificationMarkUnreadAll<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = notificationMarkUnreadAll.$SelectionSet<_$Context>

export namespace notificationMarkUnreadAll {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.NotificationBatchActionPayload<_$Context> {
/**
* Arguments for `notificationMarkUnreadAll` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The type and id of the entity to archive notifications for.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `NotificationEntityInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.notificationMarkUnreadAll |
* | **Path** | `Mutation.notificationMarkUnreadAll(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotificationEntityInput<_$Context>>
}

/**
* This is the "expanded" version of the `notificationMarkUnreadAll` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type notificationSnoozeAll<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = notificationSnoozeAll.$SelectionSet<_$Context>

export namespace notificationSnoozeAll {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.NotificationBatchActionPayload<_$Context> {
/**
* Arguments for `notificationSnoozeAll` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The time until a notification will be snoozed. After that it will appear in the inbox again.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `DateTime!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.notificationSnoozeAll |
* | **Path** | `Mutation.notificationSnoozeAll(snoozedUntilAt)` |
* | **Nullability** | Required |
*/
readonly snoozedUntilAt: $Scalars.DateTime$NonNull<_$Context>
/**
* The type and id of the entity to archive notifications for.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `NotificationEntityInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.notificationSnoozeAll |
* | **Path** | `Mutation.notificationSnoozeAll(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotificationEntityInput<_$Context>>
}

/**
* This is the "expanded" version of the `notificationSnoozeAll` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type notificationUnsnoozeAll<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = notificationUnsnoozeAll.$SelectionSet<_$Context>

export namespace notificationUnsnoozeAll {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.NotificationBatchActionPayload<_$Context> {
/**
* Arguments for `notificationUnsnoozeAll` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The time when the notification was unsnoozed.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `DateTime!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.notificationUnsnoozeAll |
* | **Path** | `Mutation.notificationUnsnoozeAll(unsnoozedAt)` |
* | **Nullability** | Required |
*/
readonly unsnoozedAt: $Scalars.DateTime$NonNull<_$Context>
/**
* The type and id of the entity to archive notifications for.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `NotificationEntityInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.notificationUnsnoozeAll |
* | **Path** | `Mutation.notificationUnsnoozeAll(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotificationEntityInput<_$Context>>
}

/**
* This is the "expanded" version of the `notificationUnsnoozeAll` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type notificationArchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = notificationArchive.$SelectionSet<_$Context>

export namespace notificationArchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.NotificationArchivePayload<_$Context> {
/**
* Arguments for `notificationArchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The id of the notification to archive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.notificationArchive |
* | **Path** | `Mutation.notificationArchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `notificationArchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type notificationArchiveAll<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = notificationArchiveAll.$SelectionSet<_$Context>

export namespace notificationArchiveAll {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.NotificationBatchActionPayload<_$Context> {
/**
* Arguments for `notificationArchiveAll` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The type and id of the entity to archive notifications for.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `NotificationEntityInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.notificationArchiveAll |
* | **Path** | `Mutation.notificationArchiveAll(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotificationEntityInput<_$Context>>
}

/**
* This is the "expanded" version of the `notificationArchiveAll` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type notificationUnarchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = notificationUnarchive.$SelectionSet<_$Context>

export namespace notificationUnarchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.NotificationArchivePayload<_$Context> {
/**
* Arguments for `notificationUnarchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The id of the notification to archive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.notificationUnarchive |
* | **Path** | `Mutation.notificationUnarchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `notificationUnarchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueToReleaseCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueToReleaseCreate.$SelectionSet<_$Context>

export namespace issueToReleaseCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueToReleasePayload<_$Context> {
/**
* Arguments for `issueToReleaseCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the issueToRelease to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IssueToReleaseCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueToReleaseCreate |
* | **Path** | `Mutation.issueToReleaseCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueToReleaseCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `issueToReleaseCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueToReleaseDeleteByIssueAndRelease<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueToReleaseDeleteByIssueAndRelease.$SelectionSet<_$Context>

export namespace issueToReleaseDeleteByIssueAndRelease {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `issueToReleaseDeleteByIssueAndRelease` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the release
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueToReleaseDeleteByIssueAndRelease |
* | **Path** | `Mutation.issueToReleaseDeleteByIssueAndRelease(releaseId)` |
* | **Nullability** | Required |
*/
readonly releaseId: $Scalars.String$NonNull<_$Context>
/**
* The identifier of the issue. Can be a UUID or issue identifier (e.g., 'LIN-123').
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueToReleaseDeleteByIssueAndRelease |
* | **Path** | `Mutation.issueToReleaseDeleteByIssueAndRelease(issueId)` |
* | **Nullability** | Required |
*/
readonly issueId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueToReleaseDeleteByIssueAndRelease` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueToReleaseDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueToReleaseDelete.$SelectionSet<_$Context>

export namespace issueToReleaseDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `issueToReleaseDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the issueToRelease to delete
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueToReleaseDelete |
* | **Path** | `Mutation.issueToReleaseDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueToReleaseDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueCreate.$SelectionSet<_$Context>

export namespace issueCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssuePayload<_$Context> {
/**
* Arguments for `issueCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The issue object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IssueCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueCreate |
* | **Path** | `Mutation.issueCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `issueCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueBatchCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueBatchCreate.$SelectionSet<_$Context>

export namespace issueBatchCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueBatchPayload<_$Context> {
/**
* Arguments for `issueBatchCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A list of issue objects to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IssueBatchCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueBatchCreate |
* | **Path** | `Mutation.issueBatchCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueBatchCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `issueBatchCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueUpdate.$SelectionSet<_$Context>

export namespace issueUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssuePayload<_$Context> {
/**
* Arguments for `issueUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial issue object to update the issue with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IssueUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueUpdate |
* | **Path** | `Mutation.issueUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueUpdateInput<_$Context>>
/**
* The identifier of the issue to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueUpdate |
* | **Path** | `Mutation.issueUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueBatchUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueBatchUpdate.$SelectionSet<_$Context>

export namespace issueBatchUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueBatchPayload<_$Context> {
/**
* Arguments for `issueBatchUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial issue object to update the issues with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IssueUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueBatchUpdate |
* | **Path** | `Mutation.issueBatchUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueUpdateInput<_$Context>>
/**
* The id's of the issues to update. Can't be more than 50 at a time.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `[UUID!]!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueBatchUpdate |
* | **Path** | `Mutation.issueBatchUpdate(ids)` |
* | **Nullability** | Required |
*/
readonly ids: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.UUID<_$Context>>>
}

/**
* This is the "expanded" version of the `issueBatchUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueArchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueArchive.$SelectionSet<_$Context>

export namespace issueArchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueArchivePayload<_$Context> {
/**
* Arguments for `issueArchive` field. Some (1/2) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether to trash the issue.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueArchive |
* | **Path** | `Mutation.issueArchive(trash)` |
* | **Nullability** | Optional |
*/
readonly trash?: $Scalars.Boolean<_$Context>
/**
* The identifier of the issue to archive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueArchive |
* | **Path** | `Mutation.issueArchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueArchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueUnarchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueUnarchive.$SelectionSet<_$Context>

export namespace issueUnarchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueArchivePayload<_$Context> {
/**
* Arguments for `issueUnarchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the issue to archive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueUnarchive |
* | **Path** | `Mutation.issueUnarchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueUnarchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueDelete.$SelectionSet<_$Context>

export namespace issueDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueArchivePayload<_$Context> {
/**
* Arguments for `issueDelete` field. Some (1/2) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether to permanently delete the issue and skip the grace period of 30 days. Available only to admins!
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueDelete |
* | **Path** | `Mutation.issueDelete(permanentlyDelete)` |
* | **Nullability** | Optional |
*/
readonly permanentlyDelete?: $Scalars.Boolean<_$Context>
/**
* The identifier of the issue to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueDelete |
* | **Path** | `Mutation.issueDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueAddLabel<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueAddLabel.$SelectionSet<_$Context>

export namespace issueAddLabel {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssuePayload<_$Context> {
/**
* Arguments for `issueAddLabel` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the label to add.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueAddLabel |
* | **Path** | `Mutation.issueAddLabel(labelId)` |
* | **Nullability** | Required |
*/
readonly labelId: $Scalars.String$NonNull<_$Context>
/**
* The identifier of the issue to add the label to.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueAddLabel |
* | **Path** | `Mutation.issueAddLabel(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueAddLabel` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueRemoveLabel<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueRemoveLabel.$SelectionSet<_$Context>

export namespace issueRemoveLabel {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssuePayload<_$Context> {
/**
* Arguments for `issueRemoveLabel` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the label to remove.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueRemoveLabel |
* | **Path** | `Mutation.issueRemoveLabel(labelId)` |
* | **Nullability** | Required |
*/
readonly labelId: $Scalars.String$NonNull<_$Context>
/**
* The identifier of the issue to remove the label from.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueRemoveLabel |
* | **Path** | `Mutation.issueRemoveLabel(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueRemoveLabel` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueReminder<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueReminder.$SelectionSet<_$Context>

export namespace issueReminder {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssuePayload<_$Context> {
/**
* Arguments for `issueReminder` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The time when a reminder notification will be sent.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `DateTime!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueReminder |
* | **Path** | `Mutation.issueReminder(reminderAt)` |
* | **Nullability** | Required |
*/
readonly reminderAt: $Scalars.DateTime$NonNull<_$Context>
/**
* The identifier of the issue to add a reminder for.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueReminder |
* | **Path** | `Mutation.issueReminder(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueReminder` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueSubscribe<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueSubscribe.$SelectionSet<_$Context>

export namespace issueSubscribe {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssuePayload<_$Context> {
/**
* Arguments for `issueSubscribe` field. Some (1/3) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The email of the user to subscribe, default is the current user.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueSubscribe |
* | **Path** | `Mutation.issueSubscribe(userEmail)` |
* | **Nullability** | Optional |
*/
readonly userEmail?: $Scalars.String<_$Context>
/**
* The identifier of the user to subscribe, default is the current user.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueSubscribe |
* | **Path** | `Mutation.issueSubscribe(userId)` |
* | **Nullability** | Optional |
*/
readonly userId?: $Scalars.String<_$Context>
/**
* The identifier of the issue to subscribe to.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueSubscribe |
* | **Path** | `Mutation.issueSubscribe(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueSubscribe` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueUnsubscribe<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueUnsubscribe.$SelectionSet<_$Context>

export namespace issueUnsubscribe {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssuePayload<_$Context> {
/**
* Arguments for `issueUnsubscribe` field. Some (1/3) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The email of the user to unsubscribe, default is the current user.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueUnsubscribe |
* | **Path** | `Mutation.issueUnsubscribe(userEmail)` |
* | **Nullability** | Optional |
*/
readonly userEmail?: $Scalars.String<_$Context>
/**
* The identifier of the user to unsubscribe, default is the current user.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueUnsubscribe |
* | **Path** | `Mutation.issueUnsubscribe(userId)` |
* | **Nullability** | Optional |
*/
readonly userId?: $Scalars.String<_$Context>
/**
* The identifier of the issue to unsubscribe from.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueUnsubscribe |
* | **Path** | `Mutation.issueUnsubscribe(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueUnsubscribe` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueDescriptionUpdateFromFront<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueDescriptionUpdateFromFront.$SelectionSet<_$Context>

export namespace issueDescriptionUpdateFromFront {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssuePayload<_$Context> {
/**
* Arguments for `issueDescriptionUpdateFromFront` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Description to update the issue with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueDescriptionUpdateFromFront |
* | **Path** | `Mutation.issueDescriptionUpdateFromFront(description)` |
* | **Nullability** | Required |
*/
readonly description: $Scalars.String$NonNull<_$Context>
/**
* The identifier of the issue to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueDescriptionUpdateFromFront |
* | **Path** | `Mutation.issueDescriptionUpdateFromFront(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueDescriptionUpdateFromFront` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueExternalSyncDisable<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueExternalSyncDisable.$SelectionSet<_$Context>

export namespace issueExternalSyncDisable {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssuePayload<_$Context> {
/**
* Arguments for `issueExternalSyncDisable` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The ID of the sync attachment to disable.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueExternalSyncDisable |
* | **Path** | `Mutation.issueExternalSyncDisable(attachmentId)` |
* | **Nullability** | Required |
*/
readonly attachmentId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueExternalSyncDisable` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueRelationCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueRelationCreate.$SelectionSet<_$Context>

export namespace issueRelationCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueRelationPayload<_$Context> {
/**
* Arguments for `issueRelationCreate` field. Some (1/2) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Used by client undo operations. Should not be set directly.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `DateTime` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueRelationCreate |
* | **Path** | `Mutation.issueRelationCreate(overrideCreatedAt)` |
* | **Nullability** | Optional |
*/
readonly overrideCreatedAt?: $Scalars.DateTime<_$Context>
/**
* The issue relation to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IssueRelationCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueRelationCreate |
* | **Path** | `Mutation.issueRelationCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueRelationCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `issueRelationCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueRelationUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueRelationUpdate.$SelectionSet<_$Context>

export namespace issueRelationUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueRelationPayload<_$Context> {
/**
* Arguments for `issueRelationUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the issue relation to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IssueRelationUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueRelationUpdate |
* | **Path** | `Mutation.issueRelationUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueRelationUpdateInput<_$Context>>
/**
* The identifier of the issue relation to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueRelationUpdate |
* | **Path** | `Mutation.issueRelationUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueRelationUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueRelationDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueRelationDelete.$SelectionSet<_$Context>

export namespace issueRelationDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `issueRelationDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the issue relation to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueRelationDelete |
* | **Path** | `Mutation.issueRelationDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueRelationDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueLabelCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueLabelCreate.$SelectionSet<_$Context>

export namespace issueLabelCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueLabelPayload<_$Context> {
/**
* Arguments for `issueLabelCreate` field. Some (1/2) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether to replace all team-specific labels with the same name with this newly created workspace label (default: false).
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueLabelCreate |
* | **Path** | `Mutation.issueLabelCreate(replaceTeamLabels)` |
* | **Nullability** | Optional |
*/
readonly replaceTeamLabels?: $Scalars.Boolean<_$Context>
/**
* The issue label to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IssueLabelCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueLabelCreate |
* | **Path** | `Mutation.issueLabelCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueLabelCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `issueLabelCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueLabelUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueLabelUpdate.$SelectionSet<_$Context>

export namespace issueLabelUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueLabelPayload<_$Context> {
/**
* Arguments for `issueLabelUpdate` field. Some (2/3) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether to replace all team-specific labels with the same name with this updated workspace label (default: false).
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueLabelUpdate |
* | **Path** | `Mutation.issueLabelUpdate(replaceTeamLabels)` |
* | **Nullability** | Optional |
*/
readonly replaceTeamLabels?: $Scalars.Boolean<_$Context>
/**
* A partial label object to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IssueLabelUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueLabelUpdate |
* | **Path** | `Mutation.issueLabelUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueLabelUpdateInput<_$Context>>
/**
* The identifier of the label to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueLabelUpdate |
* | **Path** | `Mutation.issueLabelUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueLabelUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueLabelDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueLabelDelete.$SelectionSet<_$Context>

export namespace issueLabelDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `issueLabelDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the label to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueLabelDelete |
* | **Path** | `Mutation.issueLabelDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueLabelDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueLabelRetire<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueLabelRetire.$SelectionSet<_$Context>

export namespace issueLabelRetire {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueLabelPayload<_$Context> {
/**
* Arguments for `issueLabelRetire` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the label to retire.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueLabelRetire |
* | **Path** | `Mutation.issueLabelRetire(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueLabelRetire` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueLabelRestore<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueLabelRestore.$SelectionSet<_$Context>

export namespace issueLabelRestore {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueLabelPayload<_$Context> {
/**
* Arguments for `issueLabelRestore` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the label to restore.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueLabelRestore |
* | **Path** | `Mutation.issueLabelRestore(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueLabelRestore` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueImportCreateGithub<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueImportCreateGithub.$SelectionSet<_$Context>

export namespace issueImportCreateGithub {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueImportPayload<_$Context> {
/**
* Arguments for `issueImportCreateGithub` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* ID of the organization into which to import data.
*
* @deprecated Argument will be ignored. Use teamId to import in a specific team, or teamName to import into a new team.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateGithub |
* | **Path** | `Mutation.issueImportCreateGithub(organizationId)` |
* | **Nullability** | Optional |
* | **⚠ Deprecated** | Argument will be ignored. Use teamId to import in a specific team, or teamName to import into a new team. |
*/
readonly organizationId?: $Scalars.String<_$Context>
/**
* ID of the team into which to import data.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateGithub |
* | **Path** | `Mutation.issueImportCreateGithub(teamId)` |
* | **Nullability** | Optional |
*/
readonly teamId?: $Scalars.String<_$Context>
/**
* Name of new team. When teamId is not set.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateGithub |
* | **Path** | `Mutation.issueImportCreateGithub(teamName)` |
* | **Nullability** | Optional |
*/
readonly teamName?: $Scalars.String<_$Context>
/**
* IDs of the Github repositories from which we will import data.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `[Int!]` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateGithub |
* | **Path** | `Mutation.issueImportCreateGithub(githubRepoIds)` |
* | **Nullability** | Optional |
*/
readonly githubRepoIds?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.Int<_$Context>> | null | undefined>
/**
* Labels to use to filter the import data. Only issues matching any of these filters will be imported.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `[String!]` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateGithub |
* | **Path** | `Mutation.issueImportCreateGithub(githubLabels)` |
* | **Nullability** | Optional |
*/
readonly githubLabels?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>
/**
* [DEPRECATED] ID of the Github import integration to use to access issues.
*
* @deprecated An import can span multiple integrations. Value will be ignored.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateGithub |
* | **Path** | `Mutation.issueImportCreateGithub(integrationId)` |
* | **Nullability** | Optional |
* | **⚠ Deprecated** | An import can span multiple integrations. Value will be ignored. |
*/
readonly integrationId?: $Scalars.String<_$Context>
/**
* Whether or not we should import GitHub organization level projects.
*
* @deprecated Argument will be ignored. The project information of an issue is always imported regardless of whether the project is linked to the repository of the issue or not
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateGithub |
* | **Path** | `Mutation.issueImportCreateGithub(githubShouldImportOrgProjects)` |
* | **Nullability** | Optional |
* | **⚠ Deprecated** | Argument will be ignored. The project information of an issue is always imported regardless of whether the project is linked to the repository of the issue or not |
*/
readonly githubShouldImportOrgProjects?: $Scalars.Boolean<_$Context>
/**
* Whether to instantly process the import with the default configuration mapping.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateGithub |
* | **Path** | `Mutation.issueImportCreateGithub(instantProcess)` |
* | **Nullability** | Optional |
*/
readonly instantProcess?: $Scalars.Boolean<_$Context>
/**
* Whether or not we should collect the data for closed issues.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateGithub |
* | **Path** | `Mutation.issueImportCreateGithub(includeClosedIssues)` |
* | **Nullability** | Optional |
*/
readonly includeClosedIssues?: $Scalars.Boolean<_$Context>
}

/**
* This is the "expanded" version of the `issueImportCreateGithub` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueImportCreateJira<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueImportCreateJira.$SelectionSet<_$Context>

export namespace issueImportCreateJira {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueImportPayload<_$Context> {
/**
* Arguments for `issueImportCreateJira` field. Some (4/11) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* ID of the organization into which to import data.
*
* @deprecated Argument will be ignored. Use teamId to import in a specific team, or teamName to import into a new team.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateJira |
* | **Path** | `Mutation.issueImportCreateJira(organizationId)` |
* | **Nullability** | Optional |
* | **⚠ Deprecated** | Argument will be ignored. Use teamId to import in a specific team, or teamName to import into a new team. |
*/
readonly organizationId?: $Scalars.String<_$Context>
/**
* ID of the team into which to import data. Empty to create new team.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateJira |
* | **Path** | `Mutation.issueImportCreateJira(teamId)` |
* | **Nullability** | Optional |
*/
readonly teamId?: $Scalars.String<_$Context>
/**
* Name of new team. When teamId is not set.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateJira |
* | **Path** | `Mutation.issueImportCreateJira(teamName)` |
* | **Nullability** | Optional |
*/
readonly teamName?: $Scalars.String<_$Context>
/**
* Jira personal access token to access Jira REST API.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateJira |
* | **Path** | `Mutation.issueImportCreateJira(jiraToken)` |
* | **Nullability** | Required |
*/
readonly jiraToken: $Scalars.String$NonNull<_$Context>
/**
* Jira project key from which we will import data.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateJira |
* | **Path** | `Mutation.issueImportCreateJira(jiraProject)` |
* | **Nullability** | Required |
*/
readonly jiraProject: $Scalars.String$NonNull<_$Context>
/**
* Jira user account email.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateJira |
* | **Path** | `Mutation.issueImportCreateJira(jiraEmail)` |
* | **Nullability** | Required |
*/
readonly jiraEmail: $Scalars.String$NonNull<_$Context>
/**
* Jira installation or cloud hostname.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateJira |
* | **Path** | `Mutation.issueImportCreateJira(jiraHostname)` |
* | **Nullability** | Required |
*/
readonly jiraHostname: $Scalars.String$NonNull<_$Context>
/**
* A custom JQL query to filter issues being imported
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateJira |
* | **Path** | `Mutation.issueImportCreateJira(jql)` |
* | **Nullability** | Optional |
*/
readonly jql?: $Scalars.String<_$Context>
/**
* Whether to instantly process the import with the default configuration mapping.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateJira |
* | **Path** | `Mutation.issueImportCreateJira(instantProcess)` |
* | **Nullability** | Optional |
*/
readonly instantProcess?: $Scalars.Boolean<_$Context>
/**
* Whether or not we should collect the data for closed issues.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateJira |
* | **Path** | `Mutation.issueImportCreateJira(includeClosedIssues)` |
* | **Nullability** | Optional |
*/
readonly includeClosedIssues?: $Scalars.Boolean<_$Context>
/**
* ID of issue import. If not provided it will be generated.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateJira |
* | **Path** | `Mutation.issueImportCreateJira(id)` |
* | **Nullability** | Optional |
*/
readonly id?: $Scalars.String<_$Context>
}

/**
* This is the "expanded" version of the `issueImportCreateJira` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueImportCreateCSVJira<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueImportCreateCSVJira.$SelectionSet<_$Context>

export namespace issueImportCreateCSVJira {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueImportPayload<_$Context> {
/**
* Arguments for `issueImportCreateCSVJira` field. Some (1/7) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* ID of the organization into which to import data.
*
* @deprecated Argument will be ignored. Use teamId to import in a specific team, or teamName to import into a new team.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateCSVJira |
* | **Path** | `Mutation.issueImportCreateCSVJira(organizationId)` |
* | **Nullability** | Optional |
* | **⚠ Deprecated** | Argument will be ignored. Use teamId to import in a specific team, or teamName to import into a new team. |
*/
readonly organizationId?: $Scalars.String<_$Context>
/**
* ID of the team into which to import data. Empty to create new team.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateCSVJira |
* | **Path** | `Mutation.issueImportCreateCSVJira(teamId)` |
* | **Nullability** | Optional |
*/
readonly teamId?: $Scalars.String<_$Context>
/**
* Name of new team. When teamId is not set.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateCSVJira |
* | **Path** | `Mutation.issueImportCreateCSVJira(teamName)` |
* | **Nullability** | Optional |
*/
readonly teamName?: $Scalars.String<_$Context>
/**
* URL for the CSV.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateCSVJira |
* | **Path** | `Mutation.issueImportCreateCSVJira(csvUrl)` |
* | **Nullability** | Required |
*/
readonly csvUrl: $Scalars.String$NonNull<_$Context>
/**
* Jira installation or cloud hostname.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateCSVJira |
* | **Path** | `Mutation.issueImportCreateCSVJira(jiraHostname)` |
* | **Nullability** | Optional |
*/
readonly jiraHostname?: $Scalars.String<_$Context>
/**
* Jira personal access token to access Jira REST API.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateCSVJira |
* | **Path** | `Mutation.issueImportCreateCSVJira(jiraToken)` |
* | **Nullability** | Optional |
*/
readonly jiraToken?: $Scalars.String<_$Context>
/**
* Jira user account email.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateCSVJira |
* | **Path** | `Mutation.issueImportCreateCSVJira(jiraEmail)` |
* | **Nullability** | Optional |
*/
readonly jiraEmail?: $Scalars.String<_$Context>
}

/**
* This is the "expanded" version of the `issueImportCreateCSVJira` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueImportCreateClubhouse<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueImportCreateClubhouse.$SelectionSet<_$Context>

export namespace issueImportCreateClubhouse {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueImportPayload<_$Context> {
/**
* Arguments for `issueImportCreateClubhouse` field. Some (2/8) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* ID of the organization into which to import data.
*
* @deprecated Argument will be ignored. Use teamId to import in a specific team, or teamName to import into a new team.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateClubhouse |
* | **Path** | `Mutation.issueImportCreateClubhouse(organizationId)` |
* | **Nullability** | Optional |
* | **⚠ Deprecated** | Argument will be ignored. Use teamId to import in a specific team, or teamName to import into a new team. |
*/
readonly organizationId?: $Scalars.String<_$Context>
/**
* ID of the team into which to import data.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateClubhouse |
* | **Path** | `Mutation.issueImportCreateClubhouse(teamId)` |
* | **Nullability** | Optional |
*/
readonly teamId?: $Scalars.String<_$Context>
/**
* Name of new team. When teamId is not set.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateClubhouse |
* | **Path** | `Mutation.issueImportCreateClubhouse(teamName)` |
* | **Nullability** | Optional |
*/
readonly teamName?: $Scalars.String<_$Context>
/**
* Shortcut (formerly Clubhouse) token to fetch information from the Clubhouse API.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateClubhouse |
* | **Path** | `Mutation.issueImportCreateClubhouse(clubhouseToken)` |
* | **Nullability** | Required |
*/
readonly clubhouseToken: $Scalars.String$NonNull<_$Context>
/**
* Shortcut (formerly Clubhouse) group name to choose which issues we should import.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateClubhouse |
* | **Path** | `Mutation.issueImportCreateClubhouse(clubhouseGroupName)` |
* | **Nullability** | Required |
*/
readonly clubhouseGroupName: $Scalars.String$NonNull<_$Context>
/**
* Whether to instantly process the import with the default configuration mapping.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateClubhouse |
* | **Path** | `Mutation.issueImportCreateClubhouse(instantProcess)` |
* | **Nullability** | Optional |
*/
readonly instantProcess?: $Scalars.Boolean<_$Context>
/**
* Whether or not we should collect the data for closed issues.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateClubhouse |
* | **Path** | `Mutation.issueImportCreateClubhouse(includeClosedIssues)` |
* | **Nullability** | Optional |
*/
readonly includeClosedIssues?: $Scalars.Boolean<_$Context>
/**
* ID of issue import. If not provided it will be generated.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateClubhouse |
* | **Path** | `Mutation.issueImportCreateClubhouse(id)` |
* | **Nullability** | Optional |
*/
readonly id?: $Scalars.String<_$Context>
}

/**
* This is the "expanded" version of the `issueImportCreateClubhouse` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueImportCreateAsana<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueImportCreateAsana.$SelectionSet<_$Context>

export namespace issueImportCreateAsana {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueImportPayload<_$Context> {
/**
* Arguments for `issueImportCreateAsana` field. Some (2/8) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* ID of the organization into which to import data.
*
* @deprecated Argument will be ignored. Use teamId to import in a specific team, or teamName to import into a new team.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateAsana |
* | **Path** | `Mutation.issueImportCreateAsana(organizationId)` |
* | **Nullability** | Optional |
* | **⚠ Deprecated** | Argument will be ignored. Use teamId to import in a specific team, or teamName to import into a new team. |
*/
readonly organizationId?: $Scalars.String<_$Context>
/**
* ID of the team into which to import data.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateAsana |
* | **Path** | `Mutation.issueImportCreateAsana(teamId)` |
* | **Nullability** | Optional |
*/
readonly teamId?: $Scalars.String<_$Context>
/**
* Name of new team. When teamId is not set.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateAsana |
* | **Path** | `Mutation.issueImportCreateAsana(teamName)` |
* | **Nullability** | Optional |
*/
readonly teamName?: $Scalars.String<_$Context>
/**
* Asana token to fetch information from the Asana API.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateAsana |
* | **Path** | `Mutation.issueImportCreateAsana(asanaToken)` |
* | **Nullability** | Required |
*/
readonly asanaToken: $Scalars.String$NonNull<_$Context>
/**
* Asana team name to choose which issues we should import.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateAsana |
* | **Path** | `Mutation.issueImportCreateAsana(asanaTeamName)` |
* | **Nullability** | Required |
*/
readonly asanaTeamName: $Scalars.String$NonNull<_$Context>
/**
* Whether to instantly process the import with the default configuration mapping.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateAsana |
* | **Path** | `Mutation.issueImportCreateAsana(instantProcess)` |
* | **Nullability** | Optional |
*/
readonly instantProcess?: $Scalars.Boolean<_$Context>
/**
* Whether or not we should collect the data for closed issues.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateAsana |
* | **Path** | `Mutation.issueImportCreateAsana(includeClosedIssues)` |
* | **Nullability** | Optional |
*/
readonly includeClosedIssues?: $Scalars.Boolean<_$Context>
/**
* ID of issue import. If not provided it will be generated.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateAsana |
* | **Path** | `Mutation.issueImportCreateAsana(id)` |
* | **Nullability** | Optional |
*/
readonly id?: $Scalars.String<_$Context>
}

/**
* This is the "expanded" version of the `issueImportCreateAsana` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueImportCreateLinearV2<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueImportCreateLinearV2.$SelectionSet<_$Context>

export namespace issueImportCreateLinearV2 {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueImportPayload<_$Context> {
/**
* Arguments for `issueImportCreateLinearV2` field. Some (1/2) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The source organization to import from.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateLinearV2 |
* | **Path** | `Mutation.issueImportCreateLinearV2(linearSourceOrganizationId)` |
* | **Nullability** | Required |
*/
readonly linearSourceOrganizationId: $Scalars.String$NonNull<_$Context>
/**
* ID of issue import. If not provided it will be generated.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportCreateLinearV2 |
* | **Path** | `Mutation.issueImportCreateLinearV2(id)` |
* | **Nullability** | Optional |
*/
readonly id?: $Scalars.String<_$Context>
}

/**
* This is the "expanded" version of the `issueImportCreateLinearV2` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueImportDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueImportDelete.$SelectionSet<_$Context>

export namespace issueImportDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueImportDeletePayload<_$Context> {
/**
* Arguments for `issueImportDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* ID of the issue import to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportDelete |
* | **Path** | `Mutation.issueImportDelete(issueImportId)` |
* | **Nullability** | Required |
*/
readonly issueImportId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueImportDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueImportProcess<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueImportProcess.$SelectionSet<_$Context>

export namespace issueImportProcess {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueImportPayload<_$Context> {
/**
* Arguments for `issueImportProcess` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The mapping configuration to use for processing the import.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `JSONObject!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportProcess |
* | **Path** | `Mutation.issueImportProcess(mapping)` |
* | **Nullability** | Required |
*/
readonly mapping: $Scalars.JSONObject$NonNull<_$Context>
/**
* ID of the issue import which we're going to process.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportProcess |
* | **Path** | `Mutation.issueImportProcess(issueImportId)` |
* | **Nullability** | Required |
*/
readonly issueImportId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueImportProcess` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueImportUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueImportUpdate.$SelectionSet<_$Context>

export namespace issueImportUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueImportPayload<_$Context> {
/**
* Arguments for `issueImportUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the issue import to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IssueImportUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportUpdate |
* | **Path** | `Mutation.issueImportUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueImportUpdateInput<_$Context>>
/**
* The identifier of the issue import.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.issueImportUpdate |
* | **Path** | `Mutation.issueImportUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueImportUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationsSettingsCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationsSettingsCreate.$SelectionSet<_$Context>

export namespace integrationsSettingsCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationsSettingsPayload<_$Context> {
/**
* Arguments for `integrationsSettingsCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The settings to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IntegrationsSettingsCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationsSettingsCreate |
* | **Path** | `Mutation.integrationsSettingsCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IntegrationsSettingsCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `integrationsSettingsCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationsSettingsUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationsSettingsUpdate.$SelectionSet<_$Context>

export namespace integrationsSettingsUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationsSettingsPayload<_$Context> {
/**
* Arguments for `integrationsSettingsUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A settings object to update the settings with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IntegrationsSettingsUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationsSettingsUpdate |
* | **Path** | `Mutation.integrationsSettingsUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IntegrationsSettingsUpdateInput<_$Context>>
/**
* The identifier of the settings to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationsSettingsUpdate |
* | **Path** | `Mutation.integrationsSettingsUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationsSettingsUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationTemplateCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationTemplateCreate.$SelectionSet<_$Context>

export namespace integrationTemplateCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationTemplatePayload<_$Context> {
/**
* Arguments for `integrationTemplateCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the integrationTemplate to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IntegrationTemplateCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationTemplateCreate |
* | **Path** | `Mutation.integrationTemplateCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IntegrationTemplateCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `integrationTemplateCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationTemplateDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationTemplateDelete.$SelectionSet<_$Context>

export namespace integrationTemplateDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `integrationTemplateDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the integrationTemplate to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationTemplateDelete |
* | **Path** | `Mutation.integrationTemplateDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationTemplateDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationUpdate.$SelectionSet<_$Context>

export namespace integrationUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial integration object to update the integration with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IntegrationUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationUpdate |
* | **Path** | `Mutation.integrationUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IntegrationUpdateInput<_$Context>>
/**
* The identifier of the integration to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationUpdate |
* | **Path** | `Mutation.integrationUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationSettingsUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationSettingsUpdate.$SelectionSet<_$Context>

export namespace integrationSettingsUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationSettingsUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* An integration settings object.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IntegrationSettingsInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSettingsUpdate |
* | **Path** | `Mutation.integrationSettingsUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IntegrationSettingsInput<_$Context>>
/**
* The identifier of the integration to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSettingsUpdate |
* | **Path** | `Mutation.integrationSettingsUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationSettingsUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationGithubCommitCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationGithubCommitCreate.$SelectionSet<_$Context>

export namespace integrationGithubCommitCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.GitHubCommitIntegrationPayload<_$Context> {
}

/**
* This is the "expanded" version of the `integrationGithubCommitCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationGithubConnect<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationGithubConnect.$SelectionSet<_$Context>

export namespace integrationGithubConnect {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationGithubConnect` field. Some (2/3) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether the integration should have code access
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationGithubConnect |
* | **Path** | `Mutation.integrationGithubConnect(codeAccess)` |
* | **Nullability** | Optional |
* | **Default** | `false` |
*/
readonly codeAccess?: $Scalars.Boolean<_$Context>
/**
* The GitHub grant code that's exchanged for OAuth tokens.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationGithubConnect |
* | **Path** | `Mutation.integrationGithubConnect(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
/**
* The GitHub data to connect with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationGithubConnect |
* | **Path** | `Mutation.integrationGithubConnect(installationId)` |
* | **Nullability** | Required |
*/
readonly installationId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationGithubConnect` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationGithubImportConnect<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationGithubImportConnect.$SelectionSet<_$Context>

export namespace integrationGithubImportConnect {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationGithubImportConnect` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The GitHub grant code that's exchanged for OAuth tokens.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationGithubImportConnect |
* | **Path** | `Mutation.integrationGithubImportConnect(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
/**
* The GitHub data to connect with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationGithubImportConnect |
* | **Path** | `Mutation.integrationGithubImportConnect(installationId)` |
* | **Nullability** | Required |
*/
readonly installationId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationGithubImportConnect` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationGithubImportRefresh<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationGithubImportRefresh.$SelectionSet<_$Context>

export namespace integrationGithubImportRefresh {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationGithubImportRefresh` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The id of the integration to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationGithubImportRefresh |
* | **Path** | `Mutation.integrationGithubImportRefresh(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationGithubImportRefresh` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationGitHubEnterpriseServerConnect<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationGitHubEnterpriseServerConnect.$SelectionSet<_$Context>

export namespace integrationGitHubEnterpriseServerConnect {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.GitHubEnterpriseServerPayload<_$Context> {
/**
* Arguments for `integrationGitHubEnterpriseServerConnect` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The name of GitHub organization.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationGitHubEnterpriseServerConnect |
* | **Path** | `Mutation.integrationGitHubEnterpriseServerConnect(organizationName)` |
* | **Nullability** | Required |
*/
readonly organizationName: $Scalars.String$NonNull<_$Context>
/**
* The base URL of the GitHub Enterprise Server installation.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationGitHubEnterpriseServerConnect |
* | **Path** | `Mutation.integrationGitHubEnterpriseServerConnect(githubUrl)` |
* | **Nullability** | Required |
*/
readonly githubUrl: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationGitHubEnterpriseServerConnect` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationGitlabConnect<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationGitlabConnect.$SelectionSet<_$Context>

export namespace integrationGitlabConnect {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.GitLabIntegrationCreatePayload<_$Context> {
/**
* Arguments for `integrationGitlabConnect` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The URL of the GitLab installation.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationGitlabConnect |
* | **Path** | `Mutation.integrationGitlabConnect(gitlabUrl)` |
* | **Nullability** | Required |
*/
readonly gitlabUrl: $Scalars.String$NonNull<_$Context>
/**
* The GitLab Access Token to connect with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationGitlabConnect |
* | **Path** | `Mutation.integrationGitlabConnect(accessToken)` |
* | **Nullability** | Required |
*/
readonly accessToken: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationGitlabConnect` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationGitlabTestConnection<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationGitlabTestConnection.$SelectionSet<_$Context>

export namespace integrationGitlabTestConnection {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.GitLabTestConnectionPayload<_$Context> {
/**
* Arguments for `integrationGitlabTestConnection` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The ID of the GitLab integration to test.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationGitlabTestConnection |
* | **Path** | `Mutation.integrationGitlabTestConnection(integrationId)` |
* | **Nullability** | Required |
*/
readonly integrationId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationGitlabTestConnection` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type airbyteIntegrationConnect<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = airbyteIntegrationConnect.$SelectionSet<_$Context>

export namespace airbyteIntegrationConnect {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `airbyteIntegrationConnect` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Airbyte integration settings.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `AirbyteConfigurationInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.airbyteIntegrationConnect |
* | **Path** | `Mutation.airbyteIntegrationConnect(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AirbyteConfigurationInput<_$Context>>
}

/**
* This is the "expanded" version of the `airbyteIntegrationConnect` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationGoogleCalendarPersonalConnect<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationGoogleCalendarPersonalConnect.$SelectionSet<_$Context>

export namespace integrationGoogleCalendarPersonalConnect {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationGoogleCalendarPersonalConnect` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* [Internal] The Google OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationGoogleCalendarPersonalConnect |
* | **Path** | `Mutation.integrationGoogleCalendarPersonalConnect(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationGoogleCalendarPersonalConnect` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationLaunchDarklyConnect<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationLaunchDarklyConnect.$SelectionSet<_$Context>

export namespace integrationLaunchDarklyConnect {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationLaunchDarklyConnect` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The LaunchDarkly OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationLaunchDarklyConnect |
* | **Path** | `Mutation.integrationLaunchDarklyConnect(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
/**
* The LaunchDarkly project key.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationLaunchDarklyConnect |
* | **Path** | `Mutation.integrationLaunchDarklyConnect(projectKey)` |
* | **Nullability** | Required |
*/
readonly projectKey: $Scalars.String$NonNull<_$Context>
/**
* The LaunchDarkly environment.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationLaunchDarklyConnect |
* | **Path** | `Mutation.integrationLaunchDarklyConnect(environment)` |
* | **Nullability** | Required |
*/
readonly environment: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationLaunchDarklyConnect` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationLaunchDarklyPersonalConnect<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationLaunchDarklyPersonalConnect.$SelectionSet<_$Context>

export namespace integrationLaunchDarklyPersonalConnect {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationLaunchDarklyPersonalConnect` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The LaunchDarkly OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationLaunchDarklyPersonalConnect |
* | **Path** | `Mutation.integrationLaunchDarklyPersonalConnect(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationLaunchDarklyPersonalConnect` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type jiraIntegrationConnect<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = jiraIntegrationConnect.$SelectionSet<_$Context>

export namespace jiraIntegrationConnect {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `jiraIntegrationConnect` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Jira integration settings.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `JiraConfigurationInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.jiraIntegrationConnect |
* | **Path** | `Mutation.jiraIntegrationConnect(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.JiraConfigurationInput<_$Context>>
}

/**
* This is the "expanded" version of the `jiraIntegrationConnect` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationJiraUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationJiraUpdate.$SelectionSet<_$Context>

export namespace integrationJiraUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationJiraUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Jira integration update input.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `JiraUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationJiraUpdate |
* | **Path** | `Mutation.integrationJiraUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.JiraUpdateInput<_$Context>>
}

/**
* This is the "expanded" version of the `integrationJiraUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationJiraPersonal<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationJiraPersonal.$SelectionSet<_$Context>

export namespace integrationJiraPersonal {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationJiraPersonal` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Jira OAuth code, when connecting using OAuth.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationJiraPersonal |
* | **Path** | `Mutation.integrationJiraPersonal(code)` |
* | **Nullability** | Optional |
*/
readonly code?: $Scalars.String<_$Context>
/**
* The Jira personal access token, when connecting using a PAT.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationJiraPersonal |
* | **Path** | `Mutation.integrationJiraPersonal(accessToken)` |
* | **Nullability** | Optional |
*/
readonly accessToken?: $Scalars.String<_$Context>
}

/**
* This is the "expanded" version of the `integrationJiraPersonal` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationGitHubPersonal<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationGitHubPersonal.$SelectionSet<_$Context>

export namespace integrationGitHubPersonal {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationGitHubPersonal` field. Some (1/2) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether to connect with code access.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationGitHubPersonal |
* | **Path** | `Mutation.integrationGitHubPersonal(codeAccess)` |
* | **Nullability** | Optional |
*/
readonly codeAccess?: $Scalars.Boolean<_$Context>
/**
* The GitHub OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationGitHubPersonal |
* | **Path** | `Mutation.integrationGitHubPersonal(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationGitHubPersonal` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationIntercom<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationIntercom.$SelectionSet<_$Context>

export namespace integrationIntercom {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationIntercom` field. Some (2/3) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Intercom domain URL to use for the integration. Defaults to app.intercom.com if not provided.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationIntercom |
* | **Path** | `Mutation.integrationIntercom(domainUrl)` |
* | **Nullability** | Optional |
*/
readonly domainUrl?: $Scalars.String<_$Context>
/**
* The Intercom OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationIntercom |
* | **Path** | `Mutation.integrationIntercom(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
/**
* The Intercom OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationIntercom |
* | **Path** | `Mutation.integrationIntercom(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationIntercom` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationIntercomDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationIntercomDelete.$SelectionSet<_$Context>

export namespace integrationIntercomDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
}

/**
* This is the "expanded" version of the `integrationIntercomDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationCustomerDataAttributesRefresh<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationCustomerDataAttributesRefresh.$SelectionSet<_$Context>

export namespace integrationCustomerDataAttributesRefresh {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationCustomerDataAttributesRefresh` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The integration service to refresh customer data attributes from.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IntegrationCustomerDataAttributesRefreshInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationCustomerDataAttributesRefresh |
* | **Path** | `Mutation.integrationCustomerDataAttributesRefresh(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IntegrationCustomerDataAttributesRefreshInput<_$Context>>
}

/**
* This is the "expanded" version of the `integrationCustomerDataAttributesRefresh` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationIntercomSettingsUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationIntercomSettingsUpdate.$SelectionSet<_$Context>

export namespace integrationIntercomSettingsUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationIntercomSettingsUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial Intercom integration settings object to update the integration settings with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IntercomSettingsInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationIntercomSettingsUpdate |
* | **Path** | `Mutation.integrationIntercomSettingsUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IntercomSettingsInput<_$Context>>
}

/**
* This is the "expanded" version of the `integrationIntercomSettingsUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationDiscord<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationDiscord.$SelectionSet<_$Context>

export namespace integrationDiscord {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationDiscord` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Discord OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationDiscord |
* | **Path** | `Mutation.integrationDiscord(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
/**
* The Discord OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationDiscord |
* | **Path** | `Mutation.integrationDiscord(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationDiscord` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationOpsgenieConnect<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationOpsgenieConnect.$SelectionSet<_$Context>

export namespace integrationOpsgenieConnect {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationOpsgenieConnect` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Opsgenie API key.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationOpsgenieConnect |
* | **Path** | `Mutation.integrationOpsgenieConnect(apiKey)` |
* | **Nullability** | Required |
*/
readonly apiKey: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationOpsgenieConnect` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationOpsgenieRefreshScheduleMappings<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationOpsgenieRefreshScheduleMappings.$SelectionSet<_$Context>

export namespace integrationOpsgenieRefreshScheduleMappings {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
}

/**
* This is the "expanded" version of the `integrationOpsgenieRefreshScheduleMappings` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationPagerDutyConnect<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationPagerDutyConnect.$SelectionSet<_$Context>

export namespace integrationPagerDutyConnect {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationPagerDutyConnect` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The PagerDuty OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationPagerDutyConnect |
* | **Path** | `Mutation.integrationPagerDutyConnect(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
/**
* The PagerDuty OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationPagerDutyConnect |
* | **Path** | `Mutation.integrationPagerDutyConnect(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationPagerDutyConnect` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationPagerDutyRefreshScheduleMappings<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationPagerDutyRefreshScheduleMappings.$SelectionSet<_$Context>

export namespace integrationPagerDutyRefreshScheduleMappings {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
}

/**
* This is the "expanded" version of the `integrationPagerDutyRefreshScheduleMappings` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type updateIntegrationSlackScopes<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = updateIntegrationSlackScopes.$SelectionSet<_$Context>

export namespace updateIntegrationSlackScopes {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `updateIntegrationSlackScopes` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The ID of the existing Slack integration
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.updateIntegrationSlackScopes |
* | **Path** | `Mutation.updateIntegrationSlackScopes(integrationId)` |
* | **Nullability** | Required |
*/
readonly integrationId: $Scalars.String$NonNull<_$Context>
/**
* The Slack OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.updateIntegrationSlackScopes |
* | **Path** | `Mutation.updateIntegrationSlackScopes(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
/**
* The Slack OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.updateIntegrationSlackScopes |
* | **Path** | `Mutation.updateIntegrationSlackScopes(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `updateIntegrationSlackScopes` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationSlack<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationSlack.$SelectionSet<_$Context>

export namespace integrationSlack {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationSlack` field. Some (2/3) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* [DEPRECATED] Whether or not v2 of Slack OAuth should be used. No longer used.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlack |
* | **Path** | `Mutation.integrationSlack(shouldUseV2Auth)` |
* | **Nullability** | Optional |
*/
readonly shouldUseV2Auth?: $Scalars.Boolean<_$Context>
/**
* The Slack OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlack |
* | **Path** | `Mutation.integrationSlack(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
/**
* The Slack OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlack |
* | **Path** | `Mutation.integrationSlack(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationSlack` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationSlackAsks<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationSlackAsks.$SelectionSet<_$Context>

export namespace integrationSlackAsks {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationSlackAsks` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Slack OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackAsks |
* | **Path** | `Mutation.integrationSlackAsks(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
/**
* The Slack OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackAsks |
* | **Path** | `Mutation.integrationSlackAsks(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationSlackAsks` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationSlackOrAsksUpdateSlackTeamName<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationSlackOrAsksUpdateSlackTeamName.$SelectionSet<_$Context>

export namespace integrationSlackOrAsksUpdateSlackTeamName {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationSlackWorkspaceNamePayload<_$Context> {
/**
* Arguments for `integrationSlackOrAsksUpdateSlackTeamName` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The integration ID.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackOrAsksUpdateSlackTeamName |
* | **Path** | `Mutation.integrationSlackOrAsksUpdateSlackTeamName(integrationId)` |
* | **Nullability** | Required |
*/
readonly integrationId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationSlackOrAsksUpdateSlackTeamName` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationSlackPersonal<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationSlackPersonal.$SelectionSet<_$Context>

export namespace integrationSlackPersonal {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationSlackPersonal` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Slack OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackPersonal |
* | **Path** | `Mutation.integrationSlackPersonal(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
/**
* The Slack OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackPersonal |
* | **Path** | `Mutation.integrationSlackPersonal(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationSlackPersonal` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationAsksConnectChannel<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationAsksConnectChannel.$SelectionSet<_$Context>

export namespace integrationAsksConnectChannel {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AsksChannelConnectPayload<_$Context> {
/**
* Arguments for `integrationAsksConnectChannel` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Slack OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationAsksConnectChannel |
* | **Path** | `Mutation.integrationAsksConnectChannel(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
/**
* The Slack OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationAsksConnectChannel |
* | **Path** | `Mutation.integrationAsksConnectChannel(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationAsksConnectChannel` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationSlackPost<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationSlackPost.$SelectionSet<_$Context>

export namespace integrationSlackPost {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.SlackChannelConnectPayload<_$Context> {
/**
* Arguments for `integrationSlackPost` field. Some (3/4) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* [DEPRECATED] Whether or not v2 of Slack OAuth should be used. No longer used.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackPost |
* | **Path** | `Mutation.integrationSlackPost(shouldUseV2Auth)` |
* | **Nullability** | Optional |
*/
readonly shouldUseV2Auth?: $Scalars.Boolean<_$Context>
/**
* The Slack OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackPost |
* | **Path** | `Mutation.integrationSlackPost(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
/**
* Integration's associated team.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackPost |
* | **Path** | `Mutation.integrationSlackPost(teamId)` |
* | **Nullability** | Required |
*/
readonly teamId: $Scalars.String$NonNull<_$Context>
/**
* The Slack OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackPost |
* | **Path** | `Mutation.integrationSlackPost(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationSlackPost` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationSlackProjectPost<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationSlackProjectPost.$SelectionSet<_$Context>

export namespace integrationSlackProjectPost {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.SlackChannelConnectPayload<_$Context> {
/**
* Arguments for `integrationSlackProjectPost` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The service to enable once connected, either 'notifications' or 'updates'.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackProjectPost |
* | **Path** | `Mutation.integrationSlackProjectPost(service)` |
* | **Nullability** | Required |
*/
readonly service: $Scalars.String$NonNull<_$Context>
/**
* The Slack OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackProjectPost |
* | **Path** | `Mutation.integrationSlackProjectPost(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
/**
* Integration's associated project.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackProjectPost |
* | **Path** | `Mutation.integrationSlackProjectPost(projectId)` |
* | **Nullability** | Required |
*/
readonly projectId: $Scalars.String$NonNull<_$Context>
/**
* The Slack OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackProjectPost |
* | **Path** | `Mutation.integrationSlackProjectPost(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationSlackProjectPost` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationSlackInitiativePost<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationSlackInitiativePost.$SelectionSet<_$Context>

export namespace integrationSlackInitiativePost {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.SlackChannelConnectPayload<_$Context> {
/**
* Arguments for `integrationSlackInitiativePost` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Slack OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackInitiativePost |
* | **Path** | `Mutation.integrationSlackInitiativePost(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
/**
* Integration's associated initiative.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackInitiativePost |
* | **Path** | `Mutation.integrationSlackInitiativePost(initiativeId)` |
* | **Nullability** | Required |
*/
readonly initiativeId: $Scalars.String$NonNull<_$Context>
/**
* The Slack OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackInitiativePost |
* | **Path** | `Mutation.integrationSlackInitiativePost(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationSlackInitiativePost` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationSlackCustomViewNotifications<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationSlackCustomViewNotifications.$SelectionSet<_$Context>

export namespace integrationSlackCustomViewNotifications {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.SlackChannelConnectPayload<_$Context> {
/**
* Arguments for `integrationSlackCustomViewNotifications` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Slack OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackCustomViewNotifications |
* | **Path** | `Mutation.integrationSlackCustomViewNotifications(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
/**
* Integration's associated custom view.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackCustomViewNotifications |
* | **Path** | `Mutation.integrationSlackCustomViewNotifications(customViewId)` |
* | **Nullability** | Required |
*/
readonly customViewId: $Scalars.String$NonNull<_$Context>
/**
* The Slack OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackCustomViewNotifications |
* | **Path** | `Mutation.integrationSlackCustomViewNotifications(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationSlackCustomViewNotifications` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationSlackCustomerChannelLink<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationSlackCustomerChannelLink.$SelectionSet<_$Context>

export namespace integrationSlackCustomerChannelLink {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.SuccessPayload<_$Context> {
/**
* Arguments for `integrationSlackCustomerChannelLink` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Slack OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackCustomerChannelLink |
* | **Path** | `Mutation.integrationSlackCustomerChannelLink(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
/**
* The customer to link the Slack channel with
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackCustomerChannelLink |
* | **Path** | `Mutation.integrationSlackCustomerChannelLink(customerId)` |
* | **Nullability** | Required |
*/
readonly customerId: $Scalars.String$NonNull<_$Context>
/**
* The Slack OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackCustomerChannelLink |
* | **Path** | `Mutation.integrationSlackCustomerChannelLink(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationSlackCustomerChannelLink` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationSlackOrgProjectUpdatesPost<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationSlackOrgProjectUpdatesPost.$SelectionSet<_$Context>

export namespace integrationSlackOrgProjectUpdatesPost {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.SlackChannelConnectPayload<_$Context> {
/**
* Arguments for `integrationSlackOrgProjectUpdatesPost` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Slack OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackOrgProjectUpdatesPost |
* | **Path** | `Mutation.integrationSlackOrgProjectUpdatesPost(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
/**
* The Slack OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackOrgProjectUpdatesPost |
* | **Path** | `Mutation.integrationSlackOrgProjectUpdatesPost(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationSlackOrgProjectUpdatesPost` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationSlackOrgInitiativeUpdatesPost<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationSlackOrgInitiativeUpdatesPost.$SelectionSet<_$Context>

export namespace integrationSlackOrgInitiativeUpdatesPost {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.SlackChannelConnectPayload<_$Context> {
/**
* Arguments for `integrationSlackOrgInitiativeUpdatesPost` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Slack OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackOrgInitiativeUpdatesPost |
* | **Path** | `Mutation.integrationSlackOrgInitiativeUpdatesPost(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
/**
* The Slack OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackOrgInitiativeUpdatesPost |
* | **Path** | `Mutation.integrationSlackOrgInitiativeUpdatesPost(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationSlackOrgInitiativeUpdatesPost` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationSlackImportEmojis<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationSlackImportEmojis.$SelectionSet<_$Context>

export namespace integrationSlackImportEmojis {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationSlackImportEmojis` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Slack OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackImportEmojis |
* | **Path** | `Mutation.integrationSlackImportEmojis(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
/**
* The Slack OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackImportEmojis |
* | **Path** | `Mutation.integrationSlackImportEmojis(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationSlackImportEmojis` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationFigma<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationFigma.$SelectionSet<_$Context>

export namespace integrationFigma {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationFigma` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Figma OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationFigma |
* | **Path** | `Mutation.integrationFigma(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
/**
* The Figma OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationFigma |
* | **Path** | `Mutation.integrationFigma(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationFigma` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationGong<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationGong.$SelectionSet<_$Context>

export namespace integrationGong {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationGong` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Gong OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationGong |
* | **Path** | `Mutation.integrationGong(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
/**
* The Gong OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationGong |
* | **Path** | `Mutation.integrationGong(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationGong` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationGoogleSheets<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationGoogleSheets.$SelectionSet<_$Context>

export namespace integrationGoogleSheets {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationGoogleSheets` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Google OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationGoogleSheets |
* | **Path** | `Mutation.integrationGoogleSheets(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationGoogleSheets` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type refreshGoogleSheetsData<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = refreshGoogleSheetsData.$SelectionSet<_$Context>

export namespace refreshGoogleSheetsData {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `refreshGoogleSheetsData` field. Some (1/2) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The type of export.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.refreshGoogleSheetsData |
* | **Path** | `Mutation.refreshGoogleSheetsData(type)` |
* | **Nullability** | Optional |
*/
readonly type?: $Scalars.String<_$Context>
/**
* The identifier of the Google Sheets integration to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.refreshGoogleSheetsData |
* | **Path** | `Mutation.refreshGoogleSheetsData(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `refreshGoogleSheetsData` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationSentryConnect<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationSentryConnect.$SelectionSet<_$Context>

export namespace integrationSentryConnect {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationSentryConnect` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The slug of the Sentry organization being connected.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSentryConnect |
* | **Path** | `Mutation.integrationSentryConnect(organizationSlug)` |
* | **Nullability** | Required |
*/
readonly organizationSlug: $Scalars.String$NonNull<_$Context>
/**
* The Sentry grant code that's exchanged for OAuth tokens.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSentryConnect |
* | **Path** | `Mutation.integrationSentryConnect(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
/**
* The Sentry installationId to connect with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSentryConnect |
* | **Path** | `Mutation.integrationSentryConnect(installationId)` |
* | **Nullability** | Required |
*/
readonly installationId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationSentryConnect` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationFront<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationFront.$SelectionSet<_$Context>

export namespace integrationFront {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationFront` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Front OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationFront |
* | **Path** | `Mutation.integrationFront(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
/**
* The Front OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationFront |
* | **Path** | `Mutation.integrationFront(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationFront` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationZendesk<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationZendesk.$SelectionSet<_$Context>

export namespace integrationZendesk {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationZendesk` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Zendesk installation subdomain.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationZendesk |
* | **Path** | `Mutation.integrationZendesk(subdomain)` |
* | **Nullability** | Required |
*/
readonly subdomain: $Scalars.String$NonNull<_$Context>
/**
* The Zendesk OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationZendesk |
* | **Path** | `Mutation.integrationZendesk(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
/**
* The Zendesk OAuth scopes.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationZendesk |
* | **Path** | `Mutation.integrationZendesk(scope)` |
* | **Nullability** | Required |
*/
readonly scope: $Scalars.String$NonNull<_$Context>
/**
* The Zendesk OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationZendesk |
* | **Path** | `Mutation.integrationZendesk(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationZendesk` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationLoom<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationLoom.$SelectionSet<_$Context>

export namespace integrationLoom {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
}

/**
* This is the "expanded" version of the `integrationLoom` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationSalesforce<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationSalesforce.$SelectionSet<_$Context>

export namespace integrationSalesforce {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationSalesforce` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Salesforce OAuth code.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSalesforce |
* | **Path** | `Mutation.integrationSalesforce(code)` |
* | **Nullability** | Required |
*/
readonly code: $Scalars.String$NonNull<_$Context>
/**
* The Salesforce installation subdomain.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSalesforce |
* | **Path** | `Mutation.integrationSalesforce(subdomain)` |
* | **Nullability** | Required |
*/
readonly subdomain: $Scalars.String$NonNull<_$Context>
/**
* The Salesforce OAuth redirect URI.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSalesforce |
* | **Path** | `Mutation.integrationSalesforce(redirectUri)` |
* | **Nullability** | Required |
*/
readonly redirectUri: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationSalesforce` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationSalesforceMetadataRefresh<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationSalesforceMetadataRefresh.$SelectionSet<_$Context>

export namespace integrationSalesforceMetadataRefresh {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationSalesforceMetadataRefresh` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The ID of the integration to refresh metadata for.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSalesforceMetadataRefresh |
* | **Path** | `Mutation.integrationSalesforceMetadataRefresh(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationSalesforceMetadataRefresh` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationMcpServerPersonalConnect<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationMcpServerPersonalConnect.$SelectionSet<_$Context>

export namespace integrationMcpServerPersonalConnect {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationMcpServerPersonalConnect` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The URL of the MCP server to connect with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationMcpServerPersonalConnect |
* | **Path** | `Mutation.integrationMcpServerPersonalConnect(serverUrl)` |
* | **Nullability** | Required |
*/
readonly serverUrl: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationMcpServerPersonalConnect` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationMcpServerConnect<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationMcpServerConnect.$SelectionSet<_$Context>

export namespace integrationMcpServerConnect {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationMcpServerConnect` field. Some (1/2) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The ID of the team to connect the MCP server to.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationMcpServerConnect |
* | **Path** | `Mutation.integrationMcpServerConnect(teamId)` |
* | **Nullability** | Optional |
*/
readonly teamId?: $Scalars.String<_$Context>
/**
* The URL of the MCP server to connect with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationMcpServerConnect |
* | **Path** | `Mutation.integrationMcpServerConnect(serverUrl)` |
* | **Nullability** | Required |
*/
readonly serverUrl: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationMcpServerConnect` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationDelete.$SelectionSet<_$Context>

export namespace integrationDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `integrationDelete` field. Some (1/2) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether to skip deleting the installation on the external service side.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationDelete |
* | **Path** | `Mutation.integrationDelete(skipInstallationDeletion)` |
* | **Nullability** | Optional |
*/
readonly skipInstallationDeletion?: $Scalars.Boolean<_$Context>
/**
* The identifier of the integration to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationDelete |
* | **Path** | `Mutation.integrationDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationArchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationArchive.$SelectionSet<_$Context>

export namespace integrationArchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `integrationArchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the integration to archive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationArchive |
* | **Path** | `Mutation.integrationArchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationArchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationSlackWorkflowAccessUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationSlackWorkflowAccessUpdate.$SelectionSet<_$Context>

export namespace integrationSlackWorkflowAccessUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationPayload<_$Context> {
/**
* Arguments for `integrationSlackWorkflowAccessUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether to enable workflow access.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackWorkflowAccessUpdate |
* | **Path** | `Mutation.integrationSlackWorkflowAccessUpdate(enabled)` |
* | **Nullability** | Required |
*/
readonly enabled: $Scalars.Boolean$NonNull<_$Context>
/**
* The ID of the integration to toggle workflow access for.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationSlackWorkflowAccessUpdate |
* | **Path** | `Mutation.integrationSlackWorkflowAccessUpdate(integrationId)` |
* | **Nullability** | Required |
*/
readonly integrationId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationSlackWorkflowAccessUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationRequest<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationRequest.$SelectionSet<_$Context>

export namespace integrationRequest {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationRequestPayload<_$Context> {
/**
* Arguments for `integrationRequest` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Integration request details.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IntegrationRequestInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.integrationRequest |
* | **Path** | `Mutation.integrationRequest(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IntegrationRequestInput<_$Context>>
}

/**
* This is the "expanded" version of the `integrationRequest` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiativeUpdateCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeUpdateCreate.$SelectionSet<_$Context>

export namespace initiativeUpdateCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.InitiativeUpdatePayload<_$Context> {
/**
* Arguments for `initiativeUpdateCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The initiative update object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `InitiativeUpdateCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.initiativeUpdateCreate |
* | **Path** | `Mutation.initiativeUpdateCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeUpdateCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `initiativeUpdateCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiativeUpdateUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeUpdateUpdate.$SelectionSet<_$Context>

export namespace initiativeUpdateUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.InitiativeUpdatePayload<_$Context> {
/**
* Arguments for `initiativeUpdateUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A data to update the update with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `InitiativeUpdateUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.initiativeUpdateUpdate |
* | **Path** | `Mutation.initiativeUpdateUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeUpdateUpdateInput<_$Context>>
/**
* The identifier of the update to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.initiativeUpdateUpdate |
* | **Path** | `Mutation.initiativeUpdateUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `initiativeUpdateUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiativeUpdateArchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeUpdateArchive.$SelectionSet<_$Context>

export namespace initiativeUpdateArchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.InitiativeUpdateArchivePayload<_$Context> {
/**
* Arguments for `initiativeUpdateArchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the initiative update to archive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.initiativeUpdateArchive |
* | **Path** | `Mutation.initiativeUpdateArchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `initiativeUpdateArchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type createInitiativeUpdateReminder<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = createInitiativeUpdateReminder.$SelectionSet<_$Context>

export namespace createInitiativeUpdateReminder {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.InitiativeUpdateReminderPayload<_$Context> {
/**
* Arguments for `createInitiativeUpdateReminder` field. Some (1/2) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The user identifier to whom the notification will be sent. By default, it is set to the initiative owner.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.createInitiativeUpdateReminder |
* | **Path** | `Mutation.createInitiativeUpdateReminder(userId)` |
* | **Nullability** | Optional |
*/
readonly userId?: $Scalars.String<_$Context>
/**
* The identifier of the initiative to remind about.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.createInitiativeUpdateReminder |
* | **Path** | `Mutation.createInitiativeUpdateReminder(initiativeId)` |
* | **Nullability** | Required |
*/
readonly initiativeId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `createInitiativeUpdateReminder` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiativeUpdateUnarchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeUpdateUnarchive.$SelectionSet<_$Context>

export namespace initiativeUpdateUnarchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.InitiativeUpdateArchivePayload<_$Context> {
/**
* Arguments for `initiativeUpdateUnarchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the initiative update to unarchive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.initiativeUpdateUnarchive |
* | **Path** | `Mutation.initiativeUpdateUnarchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `initiativeUpdateUnarchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiativeToProjectCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeToProjectCreate.$SelectionSet<_$Context>

export namespace initiativeToProjectCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.InitiativeToProjectPayload<_$Context> {
/**
* Arguments for `initiativeToProjectCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the initiativeToProject to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `InitiativeToProjectCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.initiativeToProjectCreate |
* | **Path** | `Mutation.initiativeToProjectCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeToProjectCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `initiativeToProjectCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiativeToProjectUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeToProjectUpdate.$SelectionSet<_$Context>

export namespace initiativeToProjectUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.InitiativeToProjectPayload<_$Context> {
/**
* Arguments for `initiativeToProjectUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the initiativeToProject to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `InitiativeToProjectUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.initiativeToProjectUpdate |
* | **Path** | `Mutation.initiativeToProjectUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeToProjectUpdateInput<_$Context>>
/**
* The identifier of the initiativeToProject to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.initiativeToProjectUpdate |
* | **Path** | `Mutation.initiativeToProjectUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `initiativeToProjectUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiativeToProjectDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeToProjectDelete.$SelectionSet<_$Context>

export namespace initiativeToProjectDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `initiativeToProjectDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the initiativeToProject to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.initiativeToProjectDelete |
* | **Path** | `Mutation.initiativeToProjectDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `initiativeToProjectDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiativeCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeCreate.$SelectionSet<_$Context>

export namespace initiativeCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.InitiativePayload<_$Context> {
/**
* Arguments for `initiativeCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the initiative to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `InitiativeCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.initiativeCreate |
* | **Path** | `Mutation.initiativeCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `initiativeCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiativeUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeUpdate.$SelectionSet<_$Context>

export namespace initiativeUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.InitiativePayload<_$Context> {
/**
* Arguments for `initiativeUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the initiative to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `InitiativeUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.initiativeUpdate |
* | **Path** | `Mutation.initiativeUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeUpdateInput<_$Context>>
/**
* The identifier of the initiative to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.initiativeUpdate |
* | **Path** | `Mutation.initiativeUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `initiativeUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiativeArchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeArchive.$SelectionSet<_$Context>

export namespace initiativeArchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.InitiativeArchivePayload<_$Context> {
/**
* Arguments for `initiativeArchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the initiative to archive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.initiativeArchive |
* | **Path** | `Mutation.initiativeArchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `initiativeArchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiativeUnarchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeUnarchive.$SelectionSet<_$Context>

export namespace initiativeUnarchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.InitiativeArchivePayload<_$Context> {
/**
* Arguments for `initiativeUnarchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the initiative to unarchive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.initiativeUnarchive |
* | **Path** | `Mutation.initiativeUnarchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `initiativeUnarchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiativeDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeDelete.$SelectionSet<_$Context>

export namespace initiativeDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `initiativeDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the initiative to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.initiativeDelete |
* | **Path** | `Mutation.initiativeDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `initiativeDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiativeRelationCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeRelationCreate.$SelectionSet<_$Context>

export namespace initiativeRelationCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.InitiativeRelationPayload<_$Context> {
/**
* Arguments for `initiativeRelationCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The initiative relation to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `InitiativeRelationCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.initiativeRelationCreate |
* | **Path** | `Mutation.initiativeRelationCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeRelationCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `initiativeRelationCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiativeRelationUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeRelationUpdate.$SelectionSet<_$Context>

export namespace initiativeRelationUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `initiativeRelationUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the initiative relation to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `InitiativeRelationUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.initiativeRelationUpdate |
* | **Path** | `Mutation.initiativeRelationUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeRelationUpdateInput<_$Context>>
/**
* The identifier of the initiative relation to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.initiativeRelationUpdate |
* | **Path** | `Mutation.initiativeRelationUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `initiativeRelationUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiativeRelationDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeRelationDelete.$SelectionSet<_$Context>

export namespace initiativeRelationDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `initiativeRelationDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the initiative relation to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.initiativeRelationDelete |
* | **Path** | `Mutation.initiativeRelationDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `initiativeRelationDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type gitAutomationTargetBranchCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = gitAutomationTargetBranchCreate.$SelectionSet<_$Context>

export namespace gitAutomationTargetBranchCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.GitAutomationTargetBranchPayload<_$Context> {
/**
* Arguments for `gitAutomationTargetBranchCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Git target branch automation to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `GitAutomationTargetBranchCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.gitAutomationTargetBranchCreate |
* | **Path** | `Mutation.gitAutomationTargetBranchCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GitAutomationTargetBranchCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `gitAutomationTargetBranchCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type gitAutomationTargetBranchUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = gitAutomationTargetBranchUpdate.$SelectionSet<_$Context>

export namespace gitAutomationTargetBranchUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.GitAutomationTargetBranchPayload<_$Context> {
/**
* Arguments for `gitAutomationTargetBranchUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The updates.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `GitAutomationTargetBranchUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.gitAutomationTargetBranchUpdate |
* | **Path** | `Mutation.gitAutomationTargetBranchUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GitAutomationTargetBranchUpdateInput<_$Context>>
/**
* The identifier of the Git target branch automation to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.gitAutomationTargetBranchUpdate |
* | **Path** | `Mutation.gitAutomationTargetBranchUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `gitAutomationTargetBranchUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type gitAutomationTargetBranchDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = gitAutomationTargetBranchDelete.$SelectionSet<_$Context>

export namespace gitAutomationTargetBranchDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `gitAutomationTargetBranchDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the Git target branch automation to archive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.gitAutomationTargetBranchDelete |
* | **Path** | `Mutation.gitAutomationTargetBranchDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `gitAutomationTargetBranchDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type gitAutomationStateCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = gitAutomationStateCreate.$SelectionSet<_$Context>

export namespace gitAutomationStateCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.GitAutomationStatePayload<_$Context> {
/**
* Arguments for `gitAutomationStateCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The automation state to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `GitAutomationStateCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.gitAutomationStateCreate |
* | **Path** | `Mutation.gitAutomationStateCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GitAutomationStateCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `gitAutomationStateCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type gitAutomationStateUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = gitAutomationStateUpdate.$SelectionSet<_$Context>

export namespace gitAutomationStateUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.GitAutomationStatePayload<_$Context> {
/**
* Arguments for `gitAutomationStateUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The state to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `GitAutomationStateUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.gitAutomationStateUpdate |
* | **Path** | `Mutation.gitAutomationStateUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GitAutomationStateUpdateInput<_$Context>>
/**
* The identifier of the state to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.gitAutomationStateUpdate |
* | **Path** | `Mutation.gitAutomationStateUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `gitAutomationStateUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type gitAutomationStateDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = gitAutomationStateDelete.$SelectionSet<_$Context>

export namespace gitAutomationStateDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `gitAutomationStateDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the automation state to archive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.gitAutomationStateDelete |
* | **Path** | `Mutation.gitAutomationStateDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `gitAutomationStateDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type fileUpload<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = fileUpload.$SelectionSet<_$Context>

export namespace fileUpload {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UploadPayload<_$Context> {
/**
* Arguments for `fileUpload` field. Some (3/5) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Optional metadata.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `JSON` |
* | **Parent** | {@link $NamedTypes.$Mutation}.fileUpload |
* | **Path** | `Mutation.fileUpload(metaData)` |
* | **Nullability** | Optional |
*/
readonly metaData?: $Scalars.JSON<_$Context>
/**
* Should the file be made publicly accessible (default: false).
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.fileUpload |
* | **Path** | `Mutation.fileUpload(makePublic)` |
* | **Nullability** | Optional |
*/
readonly makePublic?: $Scalars.Boolean<_$Context>
/**
* File size of the uploaded file.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.fileUpload |
* | **Path** | `Mutation.fileUpload(size)` |
* | **Nullability** | Required |
*/
readonly size: $Scalars.Int$NonNull<_$Context>
/**
* MIME type of the uploaded file.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.fileUpload |
* | **Path** | `Mutation.fileUpload(contentType)` |
* | **Nullability** | Required |
*/
readonly contentType: $Scalars.String$NonNull<_$Context>
/**
* Filename of the uploaded file.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.fileUpload |
* | **Path** | `Mutation.fileUpload(filename)` |
* | **Nullability** | Required |
*/
readonly filename: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `fileUpload` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type importFileUpload<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = importFileUpload.$SelectionSet<_$Context>

export namespace importFileUpload {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UploadPayload<_$Context> {
/**
* Arguments for `importFileUpload` field. Some (3/4) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Optional metadata.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `JSON` |
* | **Parent** | {@link $NamedTypes.$Mutation}.importFileUpload |
* | **Path** | `Mutation.importFileUpload(metaData)` |
* | **Nullability** | Optional |
*/
readonly metaData?: $Scalars.JSON<_$Context>
/**
* File size of the uploaded file.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.importFileUpload |
* | **Path** | `Mutation.importFileUpload(size)` |
* | **Nullability** | Required |
*/
readonly size: $Scalars.Int$NonNull<_$Context>
/**
* MIME type of the uploaded file.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.importFileUpload |
* | **Path** | `Mutation.importFileUpload(contentType)` |
* | **Nullability** | Required |
*/
readonly contentType: $Scalars.String$NonNull<_$Context>
/**
* Filename of the uploaded file.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.importFileUpload |
* | **Path** | `Mutation.importFileUpload(filename)` |
* | **Nullability** | Required |
*/
readonly filename: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `importFileUpload` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type imageUploadFromUrl<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = imageUploadFromUrl.$SelectionSet<_$Context>

export namespace imageUploadFromUrl {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ImageUploadFromUrlPayload<_$Context> {
/**
* Arguments for `imageUploadFromUrl` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* URL of the file to be uploaded to Linear.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.imageUploadFromUrl |
* | **Path** | `Mutation.imageUploadFromUrl(url)` |
* | **Nullability** | Required |
*/
readonly url: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `imageUploadFromUrl` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type fileUploadDangerouslyDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = fileUploadDangerouslyDelete.$SelectionSet<_$Context>

export namespace fileUploadDangerouslyDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.FileUploadDeletePayload<_$Context> {
/**
* Arguments for `fileUploadDangerouslyDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The asset URL of the uploaded file to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.fileUploadDangerouslyDelete |
* | **Path** | `Mutation.fileUploadDangerouslyDelete(assetUrl)` |
* | **Nullability** | Required |
*/
readonly assetUrl: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `fileUploadDangerouslyDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type favoriteCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = favoriteCreate.$SelectionSet<_$Context>

export namespace favoriteCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.FavoritePayload<_$Context> {
/**
* Arguments for `favoriteCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The favorite object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `FavoriteCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.favoriteCreate |
* | **Path** | `Mutation.favoriteCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.FavoriteCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `favoriteCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type favoriteUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = favoriteUpdate.$SelectionSet<_$Context>

export namespace favoriteUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.FavoritePayload<_$Context> {
/**
* Arguments for `favoriteUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial favorite object to update the favorite with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `FavoriteUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.favoriteUpdate |
* | **Path** | `Mutation.favoriteUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.FavoriteUpdateInput<_$Context>>
/**
* The identifier of the favorite to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.favoriteUpdate |
* | **Path** | `Mutation.favoriteUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `favoriteUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type favoriteDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = favoriteDelete.$SelectionSet<_$Context>

export namespace favoriteDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `favoriteDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the favorite reference to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.favoriteDelete |
* | **Path** | `Mutation.favoriteDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `favoriteDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type entityExternalLinkCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = entityExternalLinkCreate.$SelectionSet<_$Context>

export namespace entityExternalLinkCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.EntityExternalLinkPayload<_$Context> {
/**
* Arguments for `entityExternalLinkCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The entity link object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `EntityExternalLinkCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.entityExternalLinkCreate |
* | **Path** | `Mutation.entityExternalLinkCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.EntityExternalLinkCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `entityExternalLinkCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type entityExternalLinkUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = entityExternalLinkUpdate.$SelectionSet<_$Context>

export namespace entityExternalLinkUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.EntityExternalLinkPayload<_$Context> {
/**
* Arguments for `entityExternalLinkUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The entity link object to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `EntityExternalLinkUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.entityExternalLinkUpdate |
* | **Path** | `Mutation.entityExternalLinkUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.EntityExternalLinkUpdateInput<_$Context>>
/**
* The identifier of the entity link to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.entityExternalLinkUpdate |
* | **Path** | `Mutation.entityExternalLinkUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `entityExternalLinkUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type entityExternalLinkDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = entityExternalLinkDelete.$SelectionSet<_$Context>

export namespace entityExternalLinkDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `entityExternalLinkDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the entity link to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.entityExternalLinkDelete |
* | **Path** | `Mutation.entityExternalLinkDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `entityExternalLinkDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type emojiCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = emojiCreate.$SelectionSet<_$Context>

export namespace emojiCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.EmojiPayload<_$Context> {
/**
* Arguments for `emojiCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The emoji object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `EmojiCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.emojiCreate |
* | **Path** | `Mutation.emojiCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.EmojiCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `emojiCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type emojiDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = emojiDelete.$SelectionSet<_$Context>

export namespace emojiDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `emojiDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the emoji to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.emojiDelete |
* | **Path** | `Mutation.emojiDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `emojiDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type emailUnsubscribe<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = emailUnsubscribe.$SelectionSet<_$Context>

export namespace emailUnsubscribe {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.EmailUnsubscribePayload<_$Context> {
/**
* Arguments for `emailUnsubscribe` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Unsubscription details.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `EmailUnsubscribeInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.emailUnsubscribe |
* | **Path** | `Mutation.emailUnsubscribe(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.EmailUnsubscribeInput<_$Context>>
}

/**
* This is the "expanded" version of the `emailUnsubscribe` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type emailIntakeAddressCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = emailIntakeAddressCreate.$SelectionSet<_$Context>

export namespace emailIntakeAddressCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.EmailIntakeAddressPayload<_$Context> {
/**
* Arguments for `emailIntakeAddressCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The email intake address object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `EmailIntakeAddressCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.emailIntakeAddressCreate |
* | **Path** | `Mutation.emailIntakeAddressCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.EmailIntakeAddressCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `emailIntakeAddressCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type emailIntakeAddressRotate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = emailIntakeAddressRotate.$SelectionSet<_$Context>

export namespace emailIntakeAddressRotate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.EmailIntakeAddressPayload<_$Context> {
/**
* Arguments for `emailIntakeAddressRotate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the email intake address.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.emailIntakeAddressRotate |
* | **Path** | `Mutation.emailIntakeAddressRotate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `emailIntakeAddressRotate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type emailIntakeAddressUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = emailIntakeAddressUpdate.$SelectionSet<_$Context>

export namespace emailIntakeAddressUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.EmailIntakeAddressPayload<_$Context> {
/**
* Arguments for `emailIntakeAddressUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the email intake address to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `EmailIntakeAddressUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.emailIntakeAddressUpdate |
* | **Path** | `Mutation.emailIntakeAddressUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.EmailIntakeAddressUpdateInput<_$Context>>
/**
* The identifier of the email intake address.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.emailIntakeAddressUpdate |
* | **Path** | `Mutation.emailIntakeAddressUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `emailIntakeAddressUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type emailIntakeAddressDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = emailIntakeAddressDelete.$SelectionSet<_$Context>

export namespace emailIntakeAddressDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `emailIntakeAddressDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the email intake address to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.emailIntakeAddressDelete |
* | **Path** | `Mutation.emailIntakeAddressDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `emailIntakeAddressDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type documentCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = documentCreate.$SelectionSet<_$Context>

export namespace documentCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DocumentPayload<_$Context> {
/**
* Arguments for `documentCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The document to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `DocumentCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.documentCreate |
* | **Path** | `Mutation.documentCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DocumentCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `documentCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type documentUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = documentUpdate.$SelectionSet<_$Context>

export namespace documentUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DocumentPayload<_$Context> {
/**
* Arguments for `documentUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial document object to update the document with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `DocumentUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.documentUpdate |
* | **Path** | `Mutation.documentUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DocumentUpdateInput<_$Context>>
/**
* The identifier of the document to update. Also the identifier from the URL is accepted.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.documentUpdate |
* | **Path** | `Mutation.documentUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `documentUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type documentDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = documentDelete.$SelectionSet<_$Context>

export namespace documentDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DocumentArchivePayload<_$Context> {
/**
* Arguments for `documentDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the document to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.documentDelete |
* | **Path** | `Mutation.documentDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `documentDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type documentUnarchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = documentUnarchive.$SelectionSet<_$Context>

export namespace documentUnarchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DocumentArchivePayload<_$Context> {
/**
* Arguments for `documentUnarchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the document to restore.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.documentUnarchive |
* | **Path** | `Mutation.documentUnarchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `documentUnarchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type cycleCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = cycleCreate.$SelectionSet<_$Context>

export namespace cycleCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CyclePayload<_$Context> {
/**
* Arguments for `cycleCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The cycle object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CycleCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.cycleCreate |
* | **Path** | `Mutation.cycleCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CycleCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `cycleCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type cycleUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = cycleUpdate.$SelectionSet<_$Context>

export namespace cycleUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CyclePayload<_$Context> {
/**
* Arguments for `cycleUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial cycle object to update the cycle with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CycleUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.cycleUpdate |
* | **Path** | `Mutation.cycleUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CycleUpdateInput<_$Context>>
/**
* The identifier of the cycle to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.cycleUpdate |
* | **Path** | `Mutation.cycleUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `cycleUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type cycleArchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = cycleArchive.$SelectionSet<_$Context>

export namespace cycleArchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CycleArchivePayload<_$Context> {
/**
* Arguments for `cycleArchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the cycle to archive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.cycleArchive |
* | **Path** | `Mutation.cycleArchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `cycleArchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type cycleShiftAll<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = cycleShiftAll.$SelectionSet<_$Context>

export namespace cycleShiftAll {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CyclePayload<_$Context> {
/**
* Arguments for `cycleShiftAll` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial cycle object to update the cycle with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CycleShiftAllInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.cycleShiftAll |
* | **Path** | `Mutation.cycleShiftAll(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CycleShiftAllInput<_$Context>>
}

/**
* This is the "expanded" version of the `cycleShiftAll` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type cycleStartUpcomingCycleToday<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = cycleStartUpcomingCycleToday.$SelectionSet<_$Context>

export namespace cycleStartUpcomingCycleToday {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CyclePayload<_$Context> {
/**
* Arguments for `cycleStartUpcomingCycleToday` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the cycle to start as of midnight today. Must be the upcoming cycle.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.cycleStartUpcomingCycleToday |
* | **Path** | `Mutation.cycleStartUpcomingCycleToday(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `cycleStartUpcomingCycleToday` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerTierCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerTierCreate.$SelectionSet<_$Context>

export namespace customerTierCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerTierPayload<_$Context> {
/**
* Arguments for `customerTierCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The CustomerTier object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CustomerTierCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerTierCreate |
* | **Path** | `Mutation.customerTierCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerTierCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `customerTierCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerTierUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerTierUpdate.$SelectionSet<_$Context>

export namespace customerTierUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerTierPayload<_$Context> {
/**
* Arguments for `customerTierUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial CustomerTier object to update the CustomerTier with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CustomerTierUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerTierUpdate |
* | **Path** | `Mutation.customerTierUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerTierUpdateInput<_$Context>>
/**
* The identifier of the customer tier to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerTierUpdate |
* | **Path** | `Mutation.customerTierUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `customerTierUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerTierDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerTierDelete.$SelectionSet<_$Context>

export namespace customerTierDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `customerTierDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the customer tier to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerTierDelete |
* | **Path** | `Mutation.customerTierDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `customerTierDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerStatusCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerStatusCreate.$SelectionSet<_$Context>

export namespace customerStatusCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerStatusPayload<_$Context> {
/**
* Arguments for `customerStatusCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The CustomerStatus object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CustomerStatusCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerStatusCreate |
* | **Path** | `Mutation.customerStatusCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerStatusCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `customerStatusCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerStatusUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerStatusUpdate.$SelectionSet<_$Context>

export namespace customerStatusUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerStatusPayload<_$Context> {
/**
* Arguments for `customerStatusUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial CustomerStatus object to update the CustomerStatus with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CustomerStatusUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerStatusUpdate |
* | **Path** | `Mutation.customerStatusUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerStatusUpdateInput<_$Context>>
/**
* The identifier of the customer status to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerStatusUpdate |
* | **Path** | `Mutation.customerStatusUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `customerStatusUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerStatusDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerStatusDelete.$SelectionSet<_$Context>

export namespace customerStatusDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `customerStatusDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the customer status to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerStatusDelete |
* | **Path** | `Mutation.customerStatusDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `customerStatusDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerCreate.$SelectionSet<_$Context>

export namespace customerCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerPayload<_$Context> {
/**
* Arguments for `customerCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The customer to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CustomerCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerCreate |
* | **Path** | `Mutation.customerCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `customerCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerUpdate.$SelectionSet<_$Context>

export namespace customerUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerPayload<_$Context> {
/**
* Arguments for `customerUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the customer to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CustomerUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerUpdate |
* | **Path** | `Mutation.customerUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerUpdateInput<_$Context>>
/**
* The identifier of the customer to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerUpdate |
* | **Path** | `Mutation.customerUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `customerUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerDelete.$SelectionSet<_$Context>

export namespace customerDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `customerDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the customer to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerDelete |
* | **Path** | `Mutation.customerDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `customerDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerMerge<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerMerge.$SelectionSet<_$Context>

export namespace customerMerge {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerPayload<_$Context> {
/**
* Arguments for `customerMerge` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The ID of the customer to merge. The needs of this customer will be transferred before it gets deleted.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerMerge |
* | **Path** | `Mutation.customerMerge(sourceCustomerId)` |
* | **Nullability** | Required |
*/
readonly sourceCustomerId: $Scalars.String$NonNull<_$Context>
/**
* The ID of the target customer to merge into. The needs of this customer will be retained
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerMerge |
* | **Path** | `Mutation.customerMerge(targetCustomerId)` |
* | **Nullability** | Required |
*/
readonly targetCustomerId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `customerMerge` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerUpsert<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerUpsert.$SelectionSet<_$Context>

export namespace customerUpsert {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerPayload<_$Context> {
/**
* Arguments for `customerUpsert` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The customer to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CustomerUpsertInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerUpsert |
* | **Path** | `Mutation.customerUpsert(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerUpsertInput<_$Context>>
}

/**
* This is the "expanded" version of the `customerUpsert` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerUnsync<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerUnsync.$SelectionSet<_$Context>

export namespace customerUnsync {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerPayload<_$Context> {
/**
* Arguments for `customerUnsync` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the customer to unsync.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerUnsync |
* | **Path** | `Mutation.customerUnsync(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `customerUnsync` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerNeedCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerNeedCreate.$SelectionSet<_$Context>

export namespace customerNeedCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerNeedPayload<_$Context> {
/**
* Arguments for `customerNeedCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The customer need to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CustomerNeedCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerNeedCreate |
* | **Path** | `Mutation.customerNeedCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerNeedCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `customerNeedCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerNeedCreateFromAttachment<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerNeedCreateFromAttachment.$SelectionSet<_$Context>

export namespace customerNeedCreateFromAttachment {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerNeedPayload<_$Context> {
/**
* Arguments for `customerNeedCreateFromAttachment` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The customer need to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CustomerNeedCreateFromAttachmentInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerNeedCreateFromAttachment |
* | **Path** | `Mutation.customerNeedCreateFromAttachment(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerNeedCreateFromAttachmentInput<_$Context>>
}

/**
* This is the "expanded" version of the `customerNeedCreateFromAttachment` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerNeedUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerNeedUpdate.$SelectionSet<_$Context>

export namespace customerNeedUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerNeedUpdatePayload<_$Context> {
/**
* Arguments for `customerNeedUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the customer need to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CustomerNeedUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerNeedUpdate |
* | **Path** | `Mutation.customerNeedUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerNeedUpdateInput<_$Context>>
/**
* The identifier of the customer need to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerNeedUpdate |
* | **Path** | `Mutation.customerNeedUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `customerNeedUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerNeedDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerNeedDelete.$SelectionSet<_$Context>

export namespace customerNeedDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `customerNeedDelete` field. Some (1/2) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether to keep the attachment associated with the customer need.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerNeedDelete |
* | **Path** | `Mutation.customerNeedDelete(keepAttachment)` |
* | **Nullability** | Optional |
*/
readonly keepAttachment?: $Scalars.Boolean<_$Context>
/**
* The identifier of the customer need to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerNeedDelete |
* | **Path** | `Mutation.customerNeedDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `customerNeedDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerNeedArchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerNeedArchive.$SelectionSet<_$Context>

export namespace customerNeedArchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerNeedArchivePayload<_$Context> {
/**
* Arguments for `customerNeedArchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the customer need to archive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerNeedArchive |
* | **Path** | `Mutation.customerNeedArchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `customerNeedArchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerNeedUnarchive<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerNeedUnarchive.$SelectionSet<_$Context>

export namespace customerNeedUnarchive {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerNeedArchivePayload<_$Context> {
/**
* Arguments for `customerNeedUnarchive` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the customer need to unarchive.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customerNeedUnarchive |
* | **Path** | `Mutation.customerNeedUnarchive(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `customerNeedUnarchive` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customViewCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customViewCreate.$SelectionSet<_$Context>

export namespace customViewCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomViewPayload<_$Context> {
/**
* Arguments for `customViewCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the custom view to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CustomViewCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customViewCreate |
* | **Path** | `Mutation.customViewCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomViewCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `customViewCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customViewUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customViewUpdate.$SelectionSet<_$Context>

export namespace customViewUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomViewPayload<_$Context> {
/**
* Arguments for `customViewUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The properties of the custom view to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CustomViewUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customViewUpdate |
* | **Path** | `Mutation.customViewUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomViewUpdateInput<_$Context>>
/**
* The identifier of the custom view to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customViewUpdate |
* | **Path** | `Mutation.customViewUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `customViewUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customViewDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customViewDelete.$SelectionSet<_$Context>

export namespace customViewDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `customViewDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the custom view to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.customViewDelete |
* | **Path** | `Mutation.customViewDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `customViewDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type contactCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = contactCreate.$SelectionSet<_$Context>

export namespace contactCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ContactPayload<_$Context> {
/**
* Arguments for `contactCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The contact entry to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ContactCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.contactCreate |
* | **Path** | `Mutation.contactCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ContactCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `contactCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type contactSalesCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = contactSalesCreate.$SelectionSet<_$Context>

export namespace contactSalesCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ContactPayload<_$Context> {
/**
* Arguments for `contactSalesCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The contact entry to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ContactSalesCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.contactSalesCreate |
* | **Path** | `Mutation.contactSalesCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ContactSalesCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `contactSalesCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type commentCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = commentCreate.$SelectionSet<_$Context>

export namespace commentCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CommentPayload<_$Context> {
/**
* Arguments for `commentCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The comment object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CommentCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.commentCreate |
* | **Path** | `Mutation.commentCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CommentCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `commentCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type commentUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = commentUpdate.$SelectionSet<_$Context>

export namespace commentUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CommentPayload<_$Context> {
/**
* Arguments for `commentUpdate` field. Some (2/3) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* [INTERNAL] Flag to prevent setting editedAt when updating bodyData (used for background uploads).
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.commentUpdate |
* | **Path** | `Mutation.commentUpdate(skipEditedAt)` |
* | **Nullability** | Optional |
*/
readonly skipEditedAt?: $Scalars.Boolean<_$Context>
/**
* A partial comment object to update the comment with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CommentUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.commentUpdate |
* | **Path** | `Mutation.commentUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CommentUpdateInput<_$Context>>
/**
* The identifier of the comment to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.commentUpdate |
* | **Path** | `Mutation.commentUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `commentUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type commentDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = commentDelete.$SelectionSet<_$Context>

export namespace commentDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `commentDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the comment to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.commentDelete |
* | **Path** | `Mutation.commentDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `commentDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type commentResolve<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = commentResolve.$SelectionSet<_$Context>

export namespace commentResolve {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CommentPayload<_$Context> {
/**
* Arguments for `commentResolve` field. Some (1/2) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.commentResolve |
* | **Path** | `Mutation.commentResolve(resolvingCommentId)` |
* | **Nullability** | Optional |
*/
readonly resolvingCommentId?: $Scalars.String<_$Context>
/**
* The identifier of the comment to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.commentResolve |
* | **Path** | `Mutation.commentResolve(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `commentResolve` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type commentUnresolve<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = commentUnresolve.$SelectionSet<_$Context>

export namespace commentUnresolve {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CommentPayload<_$Context> {
/**
* Arguments for `commentUnresolve` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the comment to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.commentUnresolve |
* | **Path** | `Mutation.commentUnresolve(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `commentUnresolve` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type emailUserAccountAuthChallenge<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = emailUserAccountAuthChallenge.$SelectionSet<_$Context>

export namespace emailUserAccountAuthChallenge {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.EmailUserAccountAuthChallengeResponse<_$Context> {
/**
* Arguments for `emailUserAccountAuthChallenge` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The data used for email authentication.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `EmailUserAccountAuthChallengeInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.emailUserAccountAuthChallenge |
* | **Path** | `Mutation.emailUserAccountAuthChallenge(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.EmailUserAccountAuthChallengeInput<_$Context>>
}

/**
* This is the "expanded" version of the `emailUserAccountAuthChallenge` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type emailTokenUserAccountAuth<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = emailTokenUserAccountAuth.$SelectionSet<_$Context>

export namespace emailTokenUserAccountAuth {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AuthResolverResponse<_$Context> {
/**
* Arguments for `emailTokenUserAccountAuth` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The data used for token authentication.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `TokenUserAccountAuthInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.emailTokenUserAccountAuth |
* | **Path** | `Mutation.emailTokenUserAccountAuth(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TokenUserAccountAuthInput<_$Context>>
}

/**
* This is the "expanded" version of the `emailTokenUserAccountAuth` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type samlTokenUserAccountAuth<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = samlTokenUserAccountAuth.$SelectionSet<_$Context>

export namespace samlTokenUserAccountAuth {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AuthResolverResponse<_$Context> {
/**
* Arguments for `samlTokenUserAccountAuth` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The data used for token authentication.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `TokenUserAccountAuthInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.samlTokenUserAccountAuth |
* | **Path** | `Mutation.samlTokenUserAccountAuth(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TokenUserAccountAuthInput<_$Context>>
}

/**
* This is the "expanded" version of the `samlTokenUserAccountAuth` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type googleUserAccountAuth<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = googleUserAccountAuth.$SelectionSet<_$Context>

export namespace googleUserAccountAuth {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AuthResolverResponse<_$Context> {
/**
* Arguments for `googleUserAccountAuth` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The data used for Google authentication.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `GoogleUserAccountAuthInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.googleUserAccountAuth |
* | **Path** | `Mutation.googleUserAccountAuth(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GoogleUserAccountAuthInput<_$Context>>
}

/**
* This is the "expanded" version of the `googleUserAccountAuth` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type passkeyLoginStart<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = passkeyLoginStart.$SelectionSet<_$Context>

export namespace passkeyLoginStart {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.PasskeyLoginStartResponse<_$Context> {
/**
* Arguments for `passkeyLoginStart` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Random ID to start passkey login with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.passkeyLoginStart |
* | **Path** | `Mutation.passkeyLoginStart(authId)` |
* | **Nullability** | Required |
*/
readonly authId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `passkeyLoginStart` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type passkeyLoginFinish<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = passkeyLoginFinish.$SelectionSet<_$Context>

export namespace passkeyLoginFinish {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AuthResolverResponse<_$Context> {
/**
* Arguments for `passkeyLoginFinish` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `JSONObject!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.passkeyLoginFinish |
* | **Path** | `Mutation.passkeyLoginFinish(response)` |
* | **Nullability** | Required |
*/
readonly response: $Scalars.JSONObject$NonNull<_$Context>
/**
* Random ID to start passkey login with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.passkeyLoginFinish |
* | **Path** | `Mutation.passkeyLoginFinish(authId)` |
* | **Nullability** | Required |
*/
readonly authId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `passkeyLoginFinish` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type createOrganizationFromOnboarding<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = createOrganizationFromOnboarding.$SelectionSet<_$Context>

export namespace createOrganizationFromOnboarding {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CreateOrJoinOrganizationResponse<_$Context> {
/**
* Arguments for `createOrganizationFromOnboarding` field. Some (1/2) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Onboarding survey.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `OnboardingCustomerSurvey` |
* | **Parent** | {@link $NamedTypes.$Mutation}.createOrganizationFromOnboarding |
* | **Path** | `Mutation.createOrganizationFromOnboarding(survey)` |
* | **Nullability** | Optional |
*/
readonly survey?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.OnboardingCustomerSurvey<_$Context> | null | undefined>
/**
* Organization details for the new organization.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CreateOrganizationInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.createOrganizationFromOnboarding |
* | **Path** | `Mutation.createOrganizationFromOnboarding(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CreateOrganizationInput<_$Context>>
}

/**
* This is the "expanded" version of the `createOrganizationFromOnboarding` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type joinOrganizationFromOnboarding<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = joinOrganizationFromOnboarding.$SelectionSet<_$Context>

export namespace joinOrganizationFromOnboarding {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CreateOrJoinOrganizationResponse<_$Context> {
/**
* Arguments for `joinOrganizationFromOnboarding` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Organization details for the organization to join.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `JoinOrganizationInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.joinOrganizationFromOnboarding |
* | **Path** | `Mutation.joinOrganizationFromOnboarding(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.JoinOrganizationInput<_$Context>>
}

/**
* This is the "expanded" version of the `joinOrganizationFromOnboarding` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type leaveOrganization<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = leaveOrganization.$SelectionSet<_$Context>

export namespace leaveOrganization {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CreateOrJoinOrganizationResponse<_$Context> {
/**
* Arguments for `leaveOrganization` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* ID of the organization to leave.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.leaveOrganization |
* | **Path** | `Mutation.leaveOrganization(organizationId)` |
* | **Nullability** | Required |
*/
readonly organizationId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `leaveOrganization` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type logout<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = logout.$SelectionSet<_$Context>

export namespace logout {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.LogoutResponse<_$Context> {
/**
* Arguments for `logout` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The reason for logging out.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.logout |
* | **Path** | `Mutation.logout(reason)` |
* | **Nullability** | Optional |
*/
readonly reason?: $Scalars.String<_$Context>
}

/**
* This is the "expanded" version of the `logout` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type logoutSession<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = logoutSession.$SelectionSet<_$Context>

export namespace logoutSession {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.LogoutResponse<_$Context> {
/**
* Arguments for `logoutSession` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* ID of the session to logout.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.logoutSession |
* | **Path** | `Mutation.logoutSession(sessionId)` |
* | **Nullability** | Required |
*/
readonly sessionId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `logoutSession` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type logoutAllSessions<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = logoutAllSessions.$SelectionSet<_$Context>

export namespace logoutAllSessions {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.LogoutResponse<_$Context> {
/**
* Arguments for `logoutAllSessions` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The reason for logging out.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.logoutAllSessions |
* | **Path** | `Mutation.logoutAllSessions(reason)` |
* | **Nullability** | Optional |
*/
readonly reason?: $Scalars.String<_$Context>
}

/**
* This is the "expanded" version of the `logoutAllSessions` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type logoutOtherSessions<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = logoutOtherSessions.$SelectionSet<_$Context>

export namespace logoutOtherSessions {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.LogoutResponse<_$Context> {
/**
* Arguments for `logoutOtherSessions` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The reason for logging out.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.logoutOtherSessions |
* | **Path** | `Mutation.logoutOtherSessions(reason)` |
* | **Nullability** | Optional |
*/
readonly reason?: $Scalars.String<_$Context>
}

/**
* This is the "expanded" version of the `logoutOtherSessions` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type attachmentCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = attachmentCreate.$SelectionSet<_$Context>

export namespace attachmentCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AttachmentPayload<_$Context> {
/**
* Arguments for `attachmentCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The attachment object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `AttachmentCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentCreate |
* | **Path** | `Mutation.attachmentCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AttachmentCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `attachmentCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type attachmentUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = attachmentUpdate.$SelectionSet<_$Context>

export namespace attachmentUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AttachmentPayload<_$Context> {
/**
* Arguments for `attachmentUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial attachment object to update the attachment with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `AttachmentUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentUpdate |
* | **Path** | `Mutation.attachmentUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AttachmentUpdateInput<_$Context>>
/**
* The identifier of the attachment to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentUpdate |
* | **Path** | `Mutation.attachmentUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `attachmentUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type attachmentLinkURL<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = attachmentLinkURL.$SelectionSet<_$Context>

export namespace attachmentLinkURL {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AttachmentPayload<_$Context> {
/**
* Arguments for `attachmentLinkURL` field. Some (2/6) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkURL |
* | **Path** | `Mutation.attachmentLinkURL(createAsUser)` |
* | **Nullability** | Optional |
*/
readonly createAsUser?: $Scalars.String<_$Context>
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkURL |
* | **Path** | `Mutation.attachmentLinkURL(displayIconUrl)` |
* | **Nullability** | Optional |
*/
readonly displayIconUrl?: $Scalars.String<_$Context>
/**
* The title to use for the attachment.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkURL |
* | **Path** | `Mutation.attachmentLinkURL(title)` |
* | **Nullability** | Optional |
*/
readonly title?: $Scalars.String<_$Context>
/**
* The url to link.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkURL |
* | **Path** | `Mutation.attachmentLinkURL(url)` |
* | **Nullability** | Required |
*/
readonly url: $Scalars.String$NonNull<_$Context>
/**
* The issue for which to link the url. Can be a UUID or issue identifier (e.g., 'LIN-123').
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkURL |
* | **Path** | `Mutation.attachmentLinkURL(issueId)` |
* | **Nullability** | Required |
*/
readonly issueId: $Scalars.String$NonNull<_$Context>
/**
* The id for the attachment.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkURL |
* | **Path** | `Mutation.attachmentLinkURL(id)` |
* | **Nullability** | Optional |
*/
readonly id?: $Scalars.String<_$Context>
}

/**
* This is the "expanded" version of the `attachmentLinkURL` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type attachmentLinkGitLabMR<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = attachmentLinkGitLabMR.$SelectionSet<_$Context>

export namespace attachmentLinkGitLabMR {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AttachmentPayload<_$Context> {
/**
* Arguments for `attachmentLinkGitLabMR` field. Some (4/8) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitLabMR |
* | **Path** | `Mutation.attachmentLinkGitLabMR(createAsUser)` |
* | **Nullability** | Optional |
*/
readonly createAsUser?: $Scalars.String<_$Context>
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitLabMR |
* | **Path** | `Mutation.attachmentLinkGitLabMR(displayIconUrl)` |
* | **Nullability** | Optional |
*/
readonly displayIconUrl?: $Scalars.String<_$Context>
/**
* The title to use for the attachment.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitLabMR |
* | **Path** | `Mutation.attachmentLinkGitLabMR(title)` |
* | **Nullability** | Optional |
*/
readonly title?: $Scalars.String<_$Context>
/**
* The issue for which to link the GitLab merge request. Can be a UUID or issue identifier (e.g., 'LIN-123').
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitLabMR |
* | **Path** | `Mutation.attachmentLinkGitLabMR(issueId)` |
* | **Nullability** | Required |
*/
readonly issueId: $Scalars.String$NonNull<_$Context>
/**
* Optional attachment ID that may be provided through the API.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitLabMR |
* | **Path** | `Mutation.attachmentLinkGitLabMR(id)` |
* | **Nullability** | Optional |
*/
readonly id?: $Scalars.String<_$Context>
/**
* The URL of the GitLab merge request to link.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitLabMR |
* | **Path** | `Mutation.attachmentLinkGitLabMR(url)` |
* | **Nullability** | Required |
*/
readonly url: $Scalars.String$NonNull<_$Context>
/**
* The path name to the project including any (sub)groups. E.g. linear/main/client.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitLabMR |
* | **Path** | `Mutation.attachmentLinkGitLabMR(projectPathWithNamespace)` |
* | **Nullability** | Required |
*/
readonly projectPathWithNamespace: $Scalars.String$NonNull<_$Context>
/**
* The GitLab merge request number to link.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Float!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitLabMR |
* | **Path** | `Mutation.attachmentLinkGitLabMR(number)` |
* | **Nullability** | Required |
*/
readonly number: $Scalars.Float$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `attachmentLinkGitLabMR` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type attachmentLinkGitHubIssue<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = attachmentLinkGitHubIssue.$SelectionSet<_$Context>

export namespace attachmentLinkGitHubIssue {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AttachmentPayload<_$Context> {
/**
* Arguments for `attachmentLinkGitHubIssue` field. Some (2/6) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitHubIssue |
* | **Path** | `Mutation.attachmentLinkGitHubIssue(createAsUser)` |
* | **Nullability** | Optional |
*/
readonly createAsUser?: $Scalars.String<_$Context>
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitHubIssue |
* | **Path** | `Mutation.attachmentLinkGitHubIssue(displayIconUrl)` |
* | **Nullability** | Optional |
*/
readonly displayIconUrl?: $Scalars.String<_$Context>
/**
* The title to use for the attachment.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitHubIssue |
* | **Path** | `Mutation.attachmentLinkGitHubIssue(title)` |
* | **Nullability** | Optional |
*/
readonly title?: $Scalars.String<_$Context>
/**
* The Linear issue for which to link the GitHub issue. Can be a UUID or issue identifier (e.g., 'LIN-123').
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitHubIssue |
* | **Path** | `Mutation.attachmentLinkGitHubIssue(issueId)` |
* | **Nullability** | Required |
*/
readonly issueId: $Scalars.String$NonNull<_$Context>
/**
* Optional attachment ID that may be provided through the API.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitHubIssue |
* | **Path** | `Mutation.attachmentLinkGitHubIssue(id)` |
* | **Nullability** | Optional |
*/
readonly id?: $Scalars.String<_$Context>
/**
* The URL of the GitHub issue to link.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitHubIssue |
* | **Path** | `Mutation.attachmentLinkGitHubIssue(url)` |
* | **Nullability** | Required |
*/
readonly url: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `attachmentLinkGitHubIssue` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type attachmentLinkGitHubPR<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = attachmentLinkGitHubPR.$SelectionSet<_$Context>

export namespace attachmentLinkGitHubPR {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AttachmentPayload<_$Context> {
/**
* Arguments for `attachmentLinkGitHubPR` field. Some (2/10) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitHubPR |
* | **Path** | `Mutation.attachmentLinkGitHubPR(createAsUser)` |
* | **Nullability** | Optional |
*/
readonly createAsUser?: $Scalars.String<_$Context>
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitHubPR |
* | **Path** | `Mutation.attachmentLinkGitHubPR(displayIconUrl)` |
* | **Nullability** | Optional |
*/
readonly displayIconUrl?: $Scalars.String<_$Context>
/**
* The title to use for the attachment.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitHubPR |
* | **Path** | `Mutation.attachmentLinkGitHubPR(title)` |
* | **Nullability** | Optional |
*/
readonly title?: $Scalars.String<_$Context>
/**
* The issue for which to link the GitHub pull request. Can be a UUID or issue identifier (e.g., 'LIN-123').
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitHubPR |
* | **Path** | `Mutation.attachmentLinkGitHubPR(issueId)` |
* | **Nullability** | Required |
*/
readonly issueId: $Scalars.String$NonNull<_$Context>
/**
* Optional attachment ID that may be provided through the API.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitHubPR |
* | **Path** | `Mutation.attachmentLinkGitHubPR(id)` |
* | **Nullability** | Optional |
*/
readonly id?: $Scalars.String<_$Context>
/**
* The URL of the GitHub pull request to link.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitHubPR |
* | **Path** | `Mutation.attachmentLinkGitHubPR(url)` |
* | **Nullability** | Required |
*/
readonly url: $Scalars.String$NonNull<_$Context>
/**
* The owner of the GitHub repository.
*
* @deprecated No longer required
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitHubPR |
* | **Path** | `Mutation.attachmentLinkGitHubPR(owner)` |
* | **Nullability** | Optional |
* | **⚠ Deprecated** | No longer required |
*/
readonly owner?: $Scalars.String<_$Context>
/**
* The name of the GitHub repository.
*
* @deprecated No longer required
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitHubPR |
* | **Path** | `Mutation.attachmentLinkGitHubPR(repo)` |
* | **Nullability** | Optional |
* | **⚠ Deprecated** | No longer required |
*/
readonly repo?: $Scalars.String<_$Context>
/**
* The GitHub pull request number to link.
*
* @deprecated No longer required
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Float` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitHubPR |
* | **Path** | `Mutation.attachmentLinkGitHubPR(number)` |
* | **Nullability** | Optional |
* | **⚠ Deprecated** | No longer required |
*/
readonly number?: $Scalars.Float<_$Context>
/**
* [Internal] The kind of link between the issue and the pull request.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `GitLinkKind` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkGitHubPR |
* | **Path** | `Mutation.attachmentLinkGitHubPR(linkKind)` |
* | **Nullability** | Optional |
*/
readonly $linkKind?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GitLinkKind | null | undefined>
}

/**
* This is the "expanded" version of the `attachmentLinkGitHubPR` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type attachmentLinkZendesk<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = attachmentLinkZendesk.$SelectionSet<_$Context>

export namespace attachmentLinkZendesk {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AttachmentPayload<_$Context> {
/**
* Arguments for `attachmentLinkZendesk` field. Some (2/7) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkZendesk |
* | **Path** | `Mutation.attachmentLinkZendesk(createAsUser)` |
* | **Nullability** | Optional |
*/
readonly createAsUser?: $Scalars.String<_$Context>
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkZendesk |
* | **Path** | `Mutation.attachmentLinkZendesk(displayIconUrl)` |
* | **Nullability** | Optional |
*/
readonly displayIconUrl?: $Scalars.String<_$Context>
/**
* The title to use for the attachment.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkZendesk |
* | **Path** | `Mutation.attachmentLinkZendesk(title)` |
* | **Nullability** | Optional |
*/
readonly title?: $Scalars.String<_$Context>
/**
* The Zendesk ticket ID to link.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkZendesk |
* | **Path** | `Mutation.attachmentLinkZendesk(ticketId)` |
* | **Nullability** | Required |
*/
readonly ticketId: $Scalars.String$NonNull<_$Context>
/**
* The issue for which to link the Zendesk ticket. Can be a UUID or issue identifier (e.g., 'LIN-123').
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkZendesk |
* | **Path** | `Mutation.attachmentLinkZendesk(issueId)` |
* | **Nullability** | Required |
*/
readonly issueId: $Scalars.String$NonNull<_$Context>
/**
* Optional attachment ID that may be provided through the API.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkZendesk |
* | **Path** | `Mutation.attachmentLinkZendesk(id)` |
* | **Nullability** | Optional |
*/
readonly id?: $Scalars.String<_$Context>
/**
* The URL of the Zendesk ticket to link.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkZendesk |
* | **Path** | `Mutation.attachmentLinkZendesk(url)` |
* | **Nullability** | Optional |
*/
readonly url?: $Scalars.String<_$Context>
}

/**
* This is the "expanded" version of the `attachmentLinkZendesk` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type attachmentLinkDiscord<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = attachmentLinkDiscord.$SelectionSet<_$Context>

export namespace attachmentLinkDiscord {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AttachmentPayload<_$Context> {
/**
* Arguments for `attachmentLinkDiscord` field. Some (4/8) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkDiscord |
* | **Path** | `Mutation.attachmentLinkDiscord(createAsUser)` |
* | **Nullability** | Optional |
*/
readonly createAsUser?: $Scalars.String<_$Context>
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkDiscord |
* | **Path** | `Mutation.attachmentLinkDiscord(displayIconUrl)` |
* | **Nullability** | Optional |
*/
readonly displayIconUrl?: $Scalars.String<_$Context>
/**
* The title to use for the attachment.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkDiscord |
* | **Path** | `Mutation.attachmentLinkDiscord(title)` |
* | **Nullability** | Optional |
*/
readonly title?: $Scalars.String<_$Context>
/**
* The issue for which to link the Discord message. Can be a UUID or issue identifier (e.g., 'LIN-123').
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkDiscord |
* | **Path** | `Mutation.attachmentLinkDiscord(issueId)` |
* | **Nullability** | Required |
*/
readonly issueId: $Scalars.String$NonNull<_$Context>
/**
* Optional attachment ID that may be provided through the API.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkDiscord |
* | **Path** | `Mutation.attachmentLinkDiscord(id)` |
* | **Nullability** | Optional |
*/
readonly id?: $Scalars.String<_$Context>
/**
* The Discord channel ID for the message to link.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkDiscord |
* | **Path** | `Mutation.attachmentLinkDiscord(channelId)` |
* | **Nullability** | Required |
*/
readonly channelId: $Scalars.String$NonNull<_$Context>
/**
* The Discord message ID for the message to link.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkDiscord |
* | **Path** | `Mutation.attachmentLinkDiscord(messageId)` |
* | **Nullability** | Required |
*/
readonly messageId: $Scalars.String$NonNull<_$Context>
/**
* The Discord message URL for the message to link.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkDiscord |
* | **Path** | `Mutation.attachmentLinkDiscord(url)` |
* | **Nullability** | Required |
*/
readonly url: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `attachmentLinkDiscord` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type attachmentSyncToSlack<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = attachmentSyncToSlack.$SelectionSet<_$Context>

export namespace attachmentSyncToSlack {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AttachmentPayload<_$Context> {
/**
* Arguments for `attachmentSyncToSlack` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The ID of the Slack attachment to begin syncing.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentSyncToSlack |
* | **Path** | `Mutation.attachmentSyncToSlack(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `attachmentSyncToSlack` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type attachmentLinkSlack<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = attachmentLinkSlack.$SelectionSet<_$Context>

export namespace attachmentLinkSlack {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AttachmentPayload<_$Context> {
/**
* Arguments for `attachmentLinkSlack` field. Some (2/10) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkSlack |
* | **Path** | `Mutation.attachmentLinkSlack(createAsUser)` |
* | **Nullability** | Optional |
*/
readonly createAsUser?: $Scalars.String<_$Context>
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkSlack |
* | **Path** | `Mutation.attachmentLinkSlack(displayIconUrl)` |
* | **Nullability** | Optional |
*/
readonly displayIconUrl?: $Scalars.String<_$Context>
/**
* The title to use for the attachment.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkSlack |
* | **Path** | `Mutation.attachmentLinkSlack(title)` |
* | **Nullability** | Optional |
*/
readonly title?: $Scalars.String<_$Context>
/**
* [DEPRECATED] The Slack channel ID for the message to link.
*
* @deprecated This field is now ignored.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkSlack |
* | **Path** | `Mutation.attachmentLinkSlack(channel)` |
* | **Nullability** | Optional |
* | **⚠ Deprecated** | This field is now ignored. |
*/
readonly channel?: $Scalars.String<_$Context>
/**
* [DEPRECATED] Unique identifier of either a thread's parent message or a message in the thread.
*
* @deprecated This field is now ignored.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkSlack |
* | **Path** | `Mutation.attachmentLinkSlack(ts)` |
* | **Nullability** | Optional |
* | **⚠ Deprecated** | This field is now ignored. |
*/
readonly ts?: $Scalars.String<_$Context>
/**
* [DEPRECATED] The latest timestamp for the Slack message.
*
* @deprecated This field is now ignored.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkSlack |
* | **Path** | `Mutation.attachmentLinkSlack(latest)` |
* | **Nullability** | Optional |
* | **⚠ Deprecated** | This field is now ignored. |
*/
readonly latest?: $Scalars.String<_$Context>
/**
* The issue to which to link the Slack message. Can be a UUID or issue identifier (e.g., 'LIN-123').
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkSlack |
* | **Path** | `Mutation.attachmentLinkSlack(issueId)` |
* | **Nullability** | Required |
*/
readonly issueId: $Scalars.String$NonNull<_$Context>
/**
* The Slack message URL for the message to link.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkSlack |
* | **Path** | `Mutation.attachmentLinkSlack(url)` |
* | **Nullability** | Required |
*/
readonly url: $Scalars.String$NonNull<_$Context>
/**
* Optional attachment ID that may be provided through the API.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkSlack |
* | **Path** | `Mutation.attachmentLinkSlack(id)` |
* | **Nullability** | Optional |
*/
readonly id?: $Scalars.String<_$Context>
/**
* Whether to begin syncing the message's Slack thread with a comment thread on the issue.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkSlack |
* | **Path** | `Mutation.attachmentLinkSlack(syncToCommentThread)` |
* | **Nullability** | Optional |
*/
readonly syncToCommentThread?: $Scalars.Boolean<_$Context>
}

/**
* This is the "expanded" version of the `attachmentLinkSlack` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type attachmentLinkFront<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = attachmentLinkFront.$SelectionSet<_$Context>

export namespace attachmentLinkFront {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.FrontAttachmentPayload<_$Context> {
/**
* Arguments for `attachmentLinkFront` field. Some (2/6) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkFront |
* | **Path** | `Mutation.attachmentLinkFront(createAsUser)` |
* | **Nullability** | Optional |
*/
readonly createAsUser?: $Scalars.String<_$Context>
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkFront |
* | **Path** | `Mutation.attachmentLinkFront(displayIconUrl)` |
* | **Nullability** | Optional |
*/
readonly displayIconUrl?: $Scalars.String<_$Context>
/**
* The title to use for the attachment.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkFront |
* | **Path** | `Mutation.attachmentLinkFront(title)` |
* | **Nullability** | Optional |
*/
readonly title?: $Scalars.String<_$Context>
/**
* The Front conversation ID to link.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkFront |
* | **Path** | `Mutation.attachmentLinkFront(conversationId)` |
* | **Nullability** | Required |
*/
readonly conversationId: $Scalars.String$NonNull<_$Context>
/**
* The issue for which to link the Front conversation. Can be a UUID or issue identifier (e.g., 'LIN-123').
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkFront |
* | **Path** | `Mutation.attachmentLinkFront(issueId)` |
* | **Nullability** | Required |
*/
readonly issueId: $Scalars.String$NonNull<_$Context>
/**
* Optional attachment ID that may be provided through the API.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkFront |
* | **Path** | `Mutation.attachmentLinkFront(id)` |
* | **Nullability** | Optional |
*/
readonly id?: $Scalars.String<_$Context>
}

/**
* This is the "expanded" version of the `attachmentLinkFront` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type attachmentLinkIntercom<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = attachmentLinkIntercom.$SelectionSet<_$Context>

export namespace attachmentLinkIntercom {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AttachmentPayload<_$Context> {
/**
* Arguments for `attachmentLinkIntercom` field. Some (2/7) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkIntercom |
* | **Path** | `Mutation.attachmentLinkIntercom(createAsUser)` |
* | **Nullability** | Optional |
*/
readonly createAsUser?: $Scalars.String<_$Context>
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkIntercom |
* | **Path** | `Mutation.attachmentLinkIntercom(displayIconUrl)` |
* | **Nullability** | Optional |
*/
readonly displayIconUrl?: $Scalars.String<_$Context>
/**
* The title to use for the attachment.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkIntercom |
* | **Path** | `Mutation.attachmentLinkIntercom(title)` |
* | **Nullability** | Optional |
*/
readonly title?: $Scalars.String<_$Context>
/**
* The Intercom conversation ID to link.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkIntercom |
* | **Path** | `Mutation.attachmentLinkIntercom(conversationId)` |
* | **Nullability** | Required |
*/
readonly conversationId: $Scalars.String$NonNull<_$Context>
/**
* An optional Intercom conversation part ID to link to
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkIntercom |
* | **Path** | `Mutation.attachmentLinkIntercom(partId)` |
* | **Nullability** | Optional |
*/
readonly partId?: $Scalars.String<_$Context>
/**
* Optional attachment ID that may be provided through the API.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkIntercom |
* | **Path** | `Mutation.attachmentLinkIntercom(id)` |
* | **Nullability** | Optional |
*/
readonly id?: $Scalars.String<_$Context>
/**
* The issue for which to link the Intercom conversation. Can be a UUID or issue identifier (e.g., 'LIN-123').
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkIntercom |
* | **Path** | `Mutation.attachmentLinkIntercom(issueId)` |
* | **Nullability** | Required |
*/
readonly issueId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `attachmentLinkIntercom` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type attachmentLinkJiraIssue<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = attachmentLinkJiraIssue.$SelectionSet<_$Context>

export namespace attachmentLinkJiraIssue {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AttachmentPayload<_$Context> {
/**
* Arguments for `attachmentLinkJiraIssue` field. Some (2/7) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkJiraIssue |
* | **Path** | `Mutation.attachmentLinkJiraIssue(createAsUser)` |
* | **Nullability** | Optional |
*/
readonly createAsUser?: $Scalars.String<_$Context>
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkJiraIssue |
* | **Path** | `Mutation.attachmentLinkJiraIssue(displayIconUrl)` |
* | **Nullability** | Optional |
*/
readonly displayIconUrl?: $Scalars.String<_$Context>
/**
* The title to use for the attachment.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkJiraIssue |
* | **Path** | `Mutation.attachmentLinkJiraIssue(title)` |
* | **Nullability** | Optional |
*/
readonly title?: $Scalars.String<_$Context>
/**
* The issue for which to link the Jira issue. Can be a UUID or issue identifier (e.g., 'LIN-123').
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkJiraIssue |
* | **Path** | `Mutation.attachmentLinkJiraIssue(issueId)` |
* | **Nullability** | Required |
*/
readonly issueId: $Scalars.String$NonNull<_$Context>
/**
* The Jira issue key or ID to link.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkJiraIssue |
* | **Path** | `Mutation.attachmentLinkJiraIssue(jiraIssueId)` |
* | **Nullability** | Required |
*/
readonly jiraIssueId: $Scalars.String$NonNull<_$Context>
/**
* Optional attachment ID that may be provided through the API.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkJiraIssue |
* | **Path** | `Mutation.attachmentLinkJiraIssue(id)` |
* | **Nullability** | Optional |
*/
readonly id?: $Scalars.String<_$Context>
/**
* Optional fallback URL to use if the Jira issue cannot be found.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkJiraIssue |
* | **Path** | `Mutation.attachmentLinkJiraIssue(url)` |
* | **Nullability** | Optional |
*/
readonly url?: $Scalars.String<_$Context>
}

/**
* This is the "expanded" version of the `attachmentLinkJiraIssue` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type attachmentLinkSalesforce<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = attachmentLinkSalesforce.$SelectionSet<_$Context>

export namespace attachmentLinkSalesforce {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AttachmentPayload<_$Context> {
/**
* Arguments for `attachmentLinkSalesforce` field. Some (2/6) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkSalesforce |
* | **Path** | `Mutation.attachmentLinkSalesforce(createAsUser)` |
* | **Nullability** | Optional |
*/
readonly createAsUser?: $Scalars.String<_$Context>
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkSalesforce |
* | **Path** | `Mutation.attachmentLinkSalesforce(displayIconUrl)` |
* | **Nullability** | Optional |
*/
readonly displayIconUrl?: $Scalars.String<_$Context>
/**
* The title to use for the attachment.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkSalesforce |
* | **Path** | `Mutation.attachmentLinkSalesforce(title)` |
* | **Nullability** | Optional |
*/
readonly title?: $Scalars.String<_$Context>
/**
* The issue for which to link the Salesforce case. Can be a UUID or issue identifier (e.g., 'LIN-123').
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkSalesforce |
* | **Path** | `Mutation.attachmentLinkSalesforce(issueId)` |
* | **Nullability** | Required |
*/
readonly issueId: $Scalars.String$NonNull<_$Context>
/**
* Optional attachment ID that may be provided through the API.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkSalesforce |
* | **Path** | `Mutation.attachmentLinkSalesforce(id)` |
* | **Nullability** | Optional |
*/
readonly id?: $Scalars.String<_$Context>
/**
* The URL of the Salesforce case to link.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentLinkSalesforce |
* | **Path** | `Mutation.attachmentLinkSalesforce(url)` |
* | **Nullability** | Required |
*/
readonly url: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `attachmentLinkSalesforce` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type attachmentDelete<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = attachmentDelete.$SelectionSet<_$Context>

export namespace attachmentDelete {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DeletePayload<_$Context> {
/**
* Arguments for `attachmentDelete` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the attachment to delete.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.attachmentDelete |
* | **Path** | `Mutation.attachmentDelete(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `attachmentDelete` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type agentSessionCreateOnComment<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = agentSessionCreateOnComment.$SelectionSet<_$Context>

export namespace agentSessionCreateOnComment {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AgentSessionPayload<_$Context> {
/**
* Arguments for `agentSessionCreateOnComment` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The agent session object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `AgentSessionCreateOnComment!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.agentSessionCreateOnComment |
* | **Path** | `Mutation.agentSessionCreateOnComment(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AgentSessionCreateOnComment<_$Context>>
}

/**
* This is the "expanded" version of the `agentSessionCreateOnComment` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type agentSessionCreateOnIssue<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = agentSessionCreateOnIssue.$SelectionSet<_$Context>

export namespace agentSessionCreateOnIssue {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AgentSessionPayload<_$Context> {
/**
* Arguments for `agentSessionCreateOnIssue` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The agent session object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `AgentSessionCreateOnIssue!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.agentSessionCreateOnIssue |
* | **Path** | `Mutation.agentSessionCreateOnIssue(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AgentSessionCreateOnIssue<_$Context>>
}

/**
* This is the "expanded" version of the `agentSessionCreateOnIssue` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type agentSessionCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = agentSessionCreate.$SelectionSet<_$Context>

export namespace agentSessionCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AgentSessionPayload<_$Context> {
/**
* Arguments for `agentSessionCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The agent session object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `AgentSessionCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.agentSessionCreate |
* | **Path** | `Mutation.agentSessionCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AgentSessionCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `agentSessionCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type agentSessionUpdateExternalUrl<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = agentSessionUpdateExternalUrl.$SelectionSet<_$Context>

export namespace agentSessionUpdateExternalUrl {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AgentSessionPayload<_$Context> {
/**
* Arguments for `agentSessionUpdateExternalUrl` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The agent session object to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `AgentSessionUpdateExternalUrlInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.agentSessionUpdateExternalUrl |
* | **Path** | `Mutation.agentSessionUpdateExternalUrl(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AgentSessionUpdateExternalUrlInput<_$Context>>
/**
* The identifier of the agent session to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.agentSessionUpdateExternalUrl |
* | **Path** | `Mutation.agentSessionUpdateExternalUrl(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `agentSessionUpdateExternalUrl` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type agentSessionUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = agentSessionUpdate.$SelectionSet<_$Context>

export namespace agentSessionUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AgentSessionPayload<_$Context> {
/**
* Arguments for `agentSessionUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A partial agent session object to update the agent session with.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `AgentSessionUpdateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.agentSessionUpdate |
* | **Path** | `Mutation.agentSessionUpdate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AgentSessionUpdateInput<_$Context>>
/**
* The identifier of the agent session to update.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.agentSessionUpdate |
* | **Path** | `Mutation.agentSessionUpdate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `agentSessionUpdate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type agentActivityCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = agentActivityCreate.$SelectionSet<_$Context>

export namespace agentActivityCreate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AgentActivityPayload<_$Context> {
/**
* Arguments for `agentActivityCreate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The agent activity object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `AgentActivityCreateInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.agentActivityCreate |
* | **Path** | `Mutation.agentActivityCreate(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AgentActivityCreateInput<_$Context>>
}

/**
* This is the "expanded" version of the `agentActivityCreate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type agentActivityCreatePrompt<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = agentActivityCreatePrompt.$SelectionSet<_$Context>

export namespace agentActivityCreatePrompt {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AgentActivityPayload<_$Context> {
/**
* Arguments for `agentActivityCreatePrompt` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The prompt agent activity object to create.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `AgentActivityCreatePromptInput!` |
* | **Parent** | {@link $NamedTypes.$Mutation}.agentActivityCreatePrompt |
* | **Path** | `Mutation.agentActivityCreatePrompt(input)` |
* | **Nullability** | Required |
*/
readonly input: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AgentActivityCreatePromptInput<_$Context>>
}

/**
* This is the "expanded" version of the `agentActivityCreatePrompt` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}

