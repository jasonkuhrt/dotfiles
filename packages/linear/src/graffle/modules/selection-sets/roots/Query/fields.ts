import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type workflowStates<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = workflowStates.$SelectionSet<_$Context>

export namespace workflowStates {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.WorkflowStateConnection<_$Context> {
/**
* Arguments for `workflowStates` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned workflow states.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `WorkflowStateFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.workflowStates |
* | **Path** | `Query.workflowStates(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.WorkflowStateFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.workflowStates |
* | **Path** | `Query.workflowStates(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.workflowStates |
* | **Path** | `Query.workflowStates(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.workflowStates |
* | **Path** | `Query.workflowStates(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.workflowStates |
* | **Path** | `Query.workflowStates(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.workflowStates |
* | **Path** | `Query.workflowStates(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.workflowStates |
* | **Path** | `Query.workflowStates(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `workflowStates` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type workflowState<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = workflowState.$SelectionSet<_$Context>

export namespace workflowState {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.WorkflowState<_$Context> {
/**
* Arguments for `workflowState` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.workflowState |
* | **Path** | `Query.workflowState(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `workflowState` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type webhooks<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = webhooks.$SelectionSet<_$Context>

export namespace webhooks {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.WebhookConnection<_$Context> {
/**
* Arguments for `webhooks` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.webhooks |
* | **Path** | `Query.webhooks(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.webhooks |
* | **Path** | `Query.webhooks(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.webhooks |
* | **Path** | `Query.webhooks(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.webhooks |
* | **Path** | `Query.webhooks(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.webhooks |
* | **Path** | `Query.webhooks(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.webhooks |
* | **Path** | `Query.webhooks(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `webhooks` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type webhook<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = webhook.$SelectionSet<_$Context>

export namespace webhook {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Webhook<_$Context> {
/**
* Arguments for `webhook` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the webhook to retrieve.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.webhook |
* | **Path** | `Query.webhook(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `webhook` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type failuresForOauthWebhooks<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = failuresForOauthWebhooks.$SelectionSet<_$Context>

export namespace failuresForOauthWebhooks {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.WebhookFailureEvent<_$Context> {
/**
* Arguments for `failuresForOauthWebhooks` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the OAuth client to retrieve failures for.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.failuresForOauthWebhooks |
* | **Path** | `Query.failuresForOauthWebhooks(oauthClientId)` |
* | **Nullability** | Required |
*/
readonly oauthClientId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `failuresForOauthWebhooks` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type userSettings<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = userSettings.$SelectionSet<_$Context>

export namespace userSettings {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UserSettings<_$Context> {
}

/**
* This is the "expanded" version of the `userSettings` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type users<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = users.$SelectionSet<_$Context>

export namespace users {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.UserConnection<_$Context> {
/**
* Arguments for `users` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned users.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `UserFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.users |
* | **Path** | `Query.users(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserFilter<_$Context> | null | undefined>
/**
* Should query return disabled/suspended users (default: false).
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.users |
* | **Path** | `Query.users(includeDisabled)` |
* | **Nullability** | Optional |
*/
readonly includeDisabled?: $Scalars.Boolean<_$Context>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.users |
* | **Path** | `Query.users(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.users |
* | **Path** | `Query.users(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.users |
* | **Path** | `Query.users(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.users |
* | **Path** | `Query.users(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.users |
* | **Path** | `Query.users(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.users |
* | **Path** | `Query.users(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
/**
* [INTERNAL] Sort returned users.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `[UserSortInput!]` |
* | **Parent** | {@link $NamedTypes.$Query}.users |
* | **Path** | `Query.users(sort)` |
* | **Nullability** | Optional |
*/
readonly sort?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserSortInput<_$Context> | null | undefined>> | null | undefined>
}

/**
* This is the "expanded" version of the `users` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type user<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = user.$SelectionSet<_$Context>

export namespace user {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.User<_$Context> {
/**
* Arguments for `user` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the user to retrieve. To retrieve the authenticated user, use `viewer` query.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.user |
* | **Path** | `Query.user(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `user` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type viewer<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = viewer.$SelectionSet<_$Context>

export namespace viewer {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.User<_$Context> {
}

/**
* This is the "expanded" version of the `viewer` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type userSessions<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = userSessions.$SelectionSet<_$Context>

export namespace userSessions {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AuthenticationSessionResponse<_$Context> {
/**
* Arguments for `userSessions` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the user to list sessions of.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.userSessions |
* | **Path** | `Query.userSessions(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `userSessions` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type triageResponsibilities<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = triageResponsibilities.$SelectionSet<_$Context>

export namespace triageResponsibilities {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TriageResponsibilityConnection<_$Context> {
/**
* Arguments for `triageResponsibilities` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.triageResponsibilities |
* | **Path** | `Query.triageResponsibilities(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.triageResponsibilities |
* | **Path** | `Query.triageResponsibilities(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.triageResponsibilities |
* | **Path** | `Query.triageResponsibilities(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.triageResponsibilities |
* | **Path** | `Query.triageResponsibilities(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.triageResponsibilities |
* | **Path** | `Query.triageResponsibilities(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.triageResponsibilities |
* | **Path** | `Query.triageResponsibilities(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `triageResponsibilities` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type triageResponsibility<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = triageResponsibility.$SelectionSet<_$Context>

export namespace triageResponsibility {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TriageResponsibility<_$Context> {
/**
* Arguments for `triageResponsibility` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the triage responsibility to retrieve.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.triageResponsibility |
* | **Path** | `Query.triageResponsibility(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `triageResponsibility` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type timeSchedules<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = timeSchedules.$SelectionSet<_$Context>

export namespace timeSchedules {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TimeScheduleConnection<_$Context> {
/**
* Arguments for `timeSchedules` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.timeSchedules |
* | **Path** | `Query.timeSchedules(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.timeSchedules |
* | **Path** | `Query.timeSchedules(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.timeSchedules |
* | **Path** | `Query.timeSchedules(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.timeSchedules |
* | **Path** | `Query.timeSchedules(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.timeSchedules |
* | **Path** | `Query.timeSchedules(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.timeSchedules |
* | **Path** | `Query.timeSchedules(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `timeSchedules` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type timeSchedule<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = timeSchedule.$SelectionSet<_$Context>

export namespace timeSchedule {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TimeSchedule<_$Context> {
/**
* Arguments for `timeSchedule` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the time schedule to retrieve.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.timeSchedule |
* | **Path** | `Query.timeSchedule(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `timeSchedule` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type templates<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = templates.$SelectionSet<_$Context>

export namespace templates {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Template<_$Context> {
}

/**
* This is the "expanded" version of the `templates` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type template<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = template.$SelectionSet<_$Context>

export namespace template {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Template<_$Context> {
/**
* Arguments for `template` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the template to retrieve.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.template |
* | **Path** | `Query.template(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `template` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type templatesForIntegration<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = templatesForIntegration.$SelectionSet<_$Context>

export namespace templatesForIntegration {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Template<_$Context> {
/**
* Arguments for `templatesForIntegration` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The type of integration for which to return associated templates.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.templatesForIntegration |
* | **Path** | `Query.templatesForIntegration(integrationType)` |
* | **Nullability** | Required |
*/
readonly integrationType: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `templatesForIntegration` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projects<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projects.$SelectionSet<_$Context>

export namespace projects {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectConnection<_$Context> {
/**
* Arguments for `projects` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned projects.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ProjectFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.projects |
* | **Path** | `Query.projects(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.projects |
* | **Path** | `Query.projects(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.projects |
* | **Path** | `Query.projects(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.projects |
* | **Path** | `Query.projects(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.projects |
* | **Path** | `Query.projects(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.projects |
* | **Path** | `Query.projects(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.projects |
* | **Path** | `Query.projects(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
/**
* [INTERNAL] Sort returned projects.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `[ProjectSortInput!]` |
* | **Parent** | {@link $NamedTypes.$Query}.projects |
* | **Path** | `Query.projects(sort)` |
* | **Nullability** | Optional |
*/
readonly sort?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectSortInput<_$Context> | null | undefined>> | null | undefined>
}

/**
* This is the "expanded" version of the `projects` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type project<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = project.$SelectionSet<_$Context>

export namespace project {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Project<_$Context> {
/**
* Arguments for `project` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.project |
* | **Path** | `Query.project(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `project` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectFilterSuggestion<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectFilterSuggestion.$SelectionSet<_$Context>

export namespace projectFilterSuggestion {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectFilterSuggestionPayload<_$Context> {
/**
* Arguments for `projectFilterSuggestion` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.projectFilterSuggestion |
* | **Path** | `Query.projectFilterSuggestion(prompt)` |
* | **Nullability** | Required |
*/
readonly prompt: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectFilterSuggestion` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type teams<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = teams.$SelectionSet<_$Context>

export namespace teams {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TeamConnection<_$Context> {
/**
* Arguments for `teams` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned teams.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `TeamFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.teams |
* | **Path** | `Query.teams(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TeamFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.teams |
* | **Path** | `Query.teams(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.teams |
* | **Path** | `Query.teams(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.teams |
* | **Path** | `Query.teams(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.teams |
* | **Path** | `Query.teams(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.teams |
* | **Path** | `Query.teams(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.teams |
* | **Path** | `Query.teams(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `teams` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type administrableTeams<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = administrableTeams.$SelectionSet<_$Context>

export namespace administrableTeams {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TeamConnection<_$Context> {
/**
* Arguments for `administrableTeams` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned teams.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `TeamFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.administrableTeams |
* | **Path** | `Query.administrableTeams(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TeamFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.administrableTeams |
* | **Path** | `Query.administrableTeams(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.administrableTeams |
* | **Path** | `Query.administrableTeams(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.administrableTeams |
* | **Path** | `Query.administrableTeams(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.administrableTeams |
* | **Path** | `Query.administrableTeams(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.administrableTeams |
* | **Path** | `Query.administrableTeams(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.administrableTeams |
* | **Path** | `Query.administrableTeams(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `administrableTeams` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type team<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = team.$SelectionSet<_$Context>

export namespace team {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Team<_$Context> {
/**
* Arguments for `team` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.team |
* | **Path** | `Query.team(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `team` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type teamMemberships<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = teamMemberships.$SelectionSet<_$Context>

export namespace teamMemberships {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TeamMembershipConnection<_$Context> {
/**
* Arguments for `teamMemberships` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.teamMemberships |
* | **Path** | `Query.teamMemberships(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.teamMemberships |
* | **Path** | `Query.teamMemberships(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.teamMemberships |
* | **Path** | `Query.teamMemberships(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.teamMemberships |
* | **Path** | `Query.teamMemberships(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.teamMemberships |
* | **Path** | `Query.teamMemberships(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.teamMemberships |
* | **Path** | `Query.teamMemberships(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `teamMemberships` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type teamMembership<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = teamMembership.$SelectionSet<_$Context>

export namespace teamMembership {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.TeamMembership<_$Context> {
/**
* Arguments for `teamMembership` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.teamMembership |
* | **Path** | `Query.teamMembership(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `teamMembership` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type semanticSearch<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = semanticSearch.$SelectionSet<_$Context>

export namespace semanticSearch {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.SemanticSearchPayload<_$Context> {
/**
* Arguments for `semanticSearch` field. Some (1/5) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Search query to look for.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.semanticSearch |
* | **Path** | `Query.semanticSearch(query)` |
* | **Nullability** | Required |
*/
readonly query: $Scalars.String$NonNull<_$Context>
/**
* The types of results to return (default: all).
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `[SemanticSearchResultType!]` |
* | **Parent** | {@link $NamedTypes.$Query}.semanticSearch |
* | **Path** | `Query.semanticSearch(types)` |
* | **Nullability** | Optional |
*/
readonly $types?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SemanticSearchResultType | null | undefined>> | null | undefined>
/**
* The maximum number of results to return (default: 50).
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.semanticSearch |
* | **Path** | `Query.semanticSearch(maxResults)` |
* | **Nullability** | Optional |
*/
readonly maxResults?: $Scalars.Int<_$Context>
/**
* Whether to include archived results in the search (default: false).
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.semanticSearch |
* | **Path** | `Query.semanticSearch(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* Filters to apply to the semantic search results of each type.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `SemanticSearchFilters` |
* | **Parent** | {@link $NamedTypes.$Query}.semanticSearch |
* | **Path** | `Query.semanticSearch(filters)` |
* | **Nullability** | Optional |
*/
readonly filters?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SemanticSearchFilters<_$Context> | null | undefined>
}

/**
* This is the "expanded" version of the `semanticSearch` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type searchDocuments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = searchDocuments.$SelectionSet<_$Context>

export namespace searchDocuments {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DocumentSearchPayload<_$Context> {
/**
* Arguments for `searchDocuments` field. Some (1/10) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.searchDocuments |
* | **Path** | `Query.searchDocuments(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.searchDocuments |
* | **Path** | `Query.searchDocuments(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.searchDocuments |
* | **Path** | `Query.searchDocuments(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.searchDocuments |
* | **Path** | `Query.searchDocuments(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.searchDocuments |
* | **Path** | `Query.searchDocuments(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.searchDocuments |
* | **Path** | `Query.searchDocuments(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
/**
* Search string to look for.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.searchDocuments |
* | **Path** | `Query.searchDocuments(term)` |
* | **Nullability** | Required |
*/
readonly term: $Scalars.String$NonNull<_$Context>
/**
* Size of search snippet to return (default: 100)
*
* @deprecated No longer supported.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Float` |
* | **Parent** | {@link $NamedTypes.$Query}.searchDocuments |
* | **Path** | `Query.searchDocuments(snippetSize)` |
* | **Nullability** | Optional |
* | **⚠ Deprecated** | No longer supported. |
*/
readonly snippetSize?: $Scalars.Float<_$Context>
/**
* Should associated comments be searched (default: false).
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.searchDocuments |
* | **Path** | `Query.searchDocuments(includeComments)` |
* | **Nullability** | Optional |
*/
readonly includeComments?: $Scalars.Boolean<_$Context>
/**
* UUID of a team to use as a boost.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.searchDocuments |
* | **Path** | `Query.searchDocuments(teamId)` |
* | **Nullability** | Optional |
*/
readonly teamId?: $Scalars.String<_$Context>
}

/**
* This is the "expanded" version of the `searchDocuments` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type searchProjects<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = searchProjects.$SelectionSet<_$Context>

export namespace searchProjects {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectSearchPayload<_$Context> {
/**
* Arguments for `searchProjects` field. Some (1/10) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.searchProjects |
* | **Path** | `Query.searchProjects(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.searchProjects |
* | **Path** | `Query.searchProjects(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.searchProjects |
* | **Path** | `Query.searchProjects(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.searchProjects |
* | **Path** | `Query.searchProjects(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.searchProjects |
* | **Path** | `Query.searchProjects(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.searchProjects |
* | **Path** | `Query.searchProjects(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
/**
* Search string to look for.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.searchProjects |
* | **Path** | `Query.searchProjects(term)` |
* | **Nullability** | Required |
*/
readonly term: $Scalars.String$NonNull<_$Context>
/**
* Size of search snippet to return (default: 100)
*
* @deprecated No longer supported.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Float` |
* | **Parent** | {@link $NamedTypes.$Query}.searchProjects |
* | **Path** | `Query.searchProjects(snippetSize)` |
* | **Nullability** | Optional |
* | **⚠ Deprecated** | No longer supported. |
*/
readonly snippetSize?: $Scalars.Float<_$Context>
/**
* Should associated comments be searched (default: false).
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.searchProjects |
* | **Path** | `Query.searchProjects(includeComments)` |
* | **Nullability** | Optional |
*/
readonly includeComments?: $Scalars.Boolean<_$Context>
/**
* UUID of a team to use as a boost.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.searchProjects |
* | **Path** | `Query.searchProjects(teamId)` |
* | **Nullability** | Optional |
*/
readonly teamId?: $Scalars.String<_$Context>
}

/**
* This is the "expanded" version of the `searchProjects` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type searchIssues<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = searchIssues.$SelectionSet<_$Context>

export namespace searchIssues {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueSearchPayload<_$Context> {
/**
* Arguments for `searchIssues` field. Some (1/11) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned issues.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IssueFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.searchIssues |
* | **Path** | `Query.searchIssues(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.searchIssues |
* | **Path** | `Query.searchIssues(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.searchIssues |
* | **Path** | `Query.searchIssues(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.searchIssues |
* | **Path** | `Query.searchIssues(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.searchIssues |
* | **Path** | `Query.searchIssues(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.searchIssues |
* | **Path** | `Query.searchIssues(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.searchIssues |
* | **Path** | `Query.searchIssues(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
/**
* Search string to look for.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.searchIssues |
* | **Path** | `Query.searchIssues(term)` |
* | **Nullability** | Required |
*/
readonly term: $Scalars.String$NonNull<_$Context>
/**
* Size of search snippet to return (default: 100)
*
* @deprecated No longer supported.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Float` |
* | **Parent** | {@link $NamedTypes.$Query}.searchIssues |
* | **Path** | `Query.searchIssues(snippetSize)` |
* | **Nullability** | Optional |
* | **⚠ Deprecated** | No longer supported. |
*/
readonly snippetSize?: $Scalars.Float<_$Context>
/**
* Should associated comments be searched (default: false).
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.searchIssues |
* | **Path** | `Query.searchIssues(includeComments)` |
* | **Nullability** | Optional |
*/
readonly includeComments?: $Scalars.Boolean<_$Context>
/**
* UUID of a team to use as a boost.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.searchIssues |
* | **Path** | `Query.searchIssues(teamId)` |
* | **Nullability** | Optional |
*/
readonly teamId?: $Scalars.String<_$Context>
}

/**
* This is the "expanded" version of the `searchIssues` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type roadmapToProjects<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = roadmapToProjects.$SelectionSet<_$Context>

export namespace roadmapToProjects {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.RoadmapToProjectConnection<_$Context> {
/**
* Arguments for `roadmapToProjects` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.roadmapToProjects |
* | **Path** | `Query.roadmapToProjects(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.roadmapToProjects |
* | **Path** | `Query.roadmapToProjects(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.roadmapToProjects |
* | **Path** | `Query.roadmapToProjects(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.roadmapToProjects |
* | **Path** | `Query.roadmapToProjects(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.roadmapToProjects |
* | **Path** | `Query.roadmapToProjects(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.roadmapToProjects |
* | **Path** | `Query.roadmapToProjects(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `roadmapToProjects` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type roadmapToProject<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = roadmapToProject.$SelectionSet<_$Context>

export namespace roadmapToProject {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.RoadmapToProject<_$Context> {
/**
* Arguments for `roadmapToProject` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.roadmapToProject |
* | **Path** | `Query.roadmapToProject(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `roadmapToProject` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type roadmaps<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = roadmaps.$SelectionSet<_$Context>

export namespace roadmaps {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.RoadmapConnection<_$Context> {
/**
* Arguments for `roadmaps` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.roadmaps |
* | **Path** | `Query.roadmaps(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.roadmaps |
* | **Path** | `Query.roadmaps(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.roadmaps |
* | **Path** | `Query.roadmaps(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.roadmaps |
* | **Path** | `Query.roadmaps(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.roadmaps |
* | **Path** | `Query.roadmaps(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.roadmaps |
* | **Path** | `Query.roadmaps(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `roadmaps` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type roadmap<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = roadmap.$SelectionSet<_$Context>

export namespace roadmap {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Roadmap<_$Context> {
/**
* Arguments for `roadmap` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.roadmap |
* | **Path** | `Query.roadmap(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `roadmap` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releaseStages<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releaseStages.$SelectionSet<_$Context>

export namespace releaseStages {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReleaseStageConnection<_$Context> {
/**
* Arguments for `releaseStages` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.releaseStages |
* | **Path** | `Query.releaseStages(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.releaseStages |
* | **Path** | `Query.releaseStages(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.releaseStages |
* | **Path** | `Query.releaseStages(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.releaseStages |
* | **Path** | `Query.releaseStages(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.releaseStages |
* | **Path** | `Query.releaseStages(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.releaseStages |
* | **Path** | `Query.releaseStages(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `releaseStages` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releaseStage<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releaseStage.$SelectionSet<_$Context>

export namespace releaseStage {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReleaseStage<_$Context> {
/**
* Arguments for `releaseStage` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.releaseStage |
* | **Path** | `Query.releaseStage(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `releaseStage` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releases<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releases.$SelectionSet<_$Context>

export namespace releases {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReleaseConnection<_$Context> {
/**
* Arguments for `releases` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.releases |
* | **Path** | `Query.releases(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.releases |
* | **Path** | `Query.releases(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.releases |
* | **Path** | `Query.releases(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.releases |
* | **Path** | `Query.releases(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.releases |
* | **Path** | `Query.releases(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.releases |
* | **Path** | `Query.releases(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `releases` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type release<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = release.$SelectionSet<_$Context>

export namespace release {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Release<_$Context> {
/**
* Arguments for `release` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.release |
* | **Path** | `Query.release(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `release` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releasePipelines<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releasePipelines.$SelectionSet<_$Context>

export namespace releasePipelines {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReleasePipelineConnection<_$Context> {
/**
* Arguments for `releasePipelines` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.releasePipelines |
* | **Path** | `Query.releasePipelines(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.releasePipelines |
* | **Path** | `Query.releasePipelines(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.releasePipelines |
* | **Path** | `Query.releasePipelines(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.releasePipelines |
* | **Path** | `Query.releasePipelines(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.releasePipelines |
* | **Path** | `Query.releasePipelines(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.releasePipelines |
* | **Path** | `Query.releasePipelines(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `releasePipelines` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type releasePipeline<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = releasePipeline.$SelectionSet<_$Context>

export namespace releasePipeline {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ReleasePipeline<_$Context> {
/**
* Arguments for `releasePipeline` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.releasePipeline |
* | **Path** | `Query.releasePipeline(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `releasePipeline` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type rateLimitStatus<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = rateLimitStatus.$SelectionSet<_$Context>

export namespace rateLimitStatus {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.RateLimitPayload<_$Context> {
}

/**
* This is the "expanded" version of the `rateLimitStatus` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type pushSubscriptionTest<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = pushSubscriptionTest.$SelectionSet<_$Context>

export namespace pushSubscriptionTest {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.PushSubscriptionTestPayload<_$Context> {
/**
* Arguments for `pushSubscriptionTest` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether to send to mobile devices.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.pushSubscriptionTest |
* | **Path** | `Query.pushSubscriptionTest(targetMobile)` |
* | **Nullability** | Optional |
* | **Default** | `false` |
*/
readonly targetMobile?: $Scalars.Boolean<_$Context>
/**
* The send strategy to use.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `SendStrategy` |
* | **Parent** | {@link $NamedTypes.$Query}.pushSubscriptionTest |
* | **Path** | `Query.pushSubscriptionTest(sendStrategy)` |
* | **Nullability** | Optional |
* | **Default** | `"push"` |
*/
readonly $sendStrategy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SendStrategy | null | undefined>
}

/**
* This is the "expanded" version of the `pushSubscriptionTest` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectUpdates<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectUpdates.$SelectionSet<_$Context>

export namespace projectUpdates {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectUpdateConnection<_$Context> {
/**
* Arguments for `projectUpdates` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned project updates.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ProjectUpdateFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.projectUpdates |
* | **Path** | `Query.projectUpdates(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectUpdateFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.projectUpdates |
* | **Path** | `Query.projectUpdates(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.projectUpdates |
* | **Path** | `Query.projectUpdates(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.projectUpdates |
* | **Path** | `Query.projectUpdates(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.projectUpdates |
* | **Path** | `Query.projectUpdates(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.projectUpdates |
* | **Path** | `Query.projectUpdates(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.projectUpdates |
* | **Path** | `Query.projectUpdates(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `projectUpdates` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectUpdate.$SelectionSet<_$Context>

export namespace projectUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectUpdate<_$Context> {
/**
* Arguments for `projectUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the project update to retrieve.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.projectUpdate |
* | **Path** | `Query.projectUpdate(id)` |
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


export type projectStatuses<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectStatuses.$SelectionSet<_$Context>

export namespace projectStatuses {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectStatusConnection<_$Context> {
/**
* Arguments for `projectStatuses` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.projectStatuses |
* | **Path** | `Query.projectStatuses(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.projectStatuses |
* | **Path** | `Query.projectStatuses(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.projectStatuses |
* | **Path** | `Query.projectStatuses(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.projectStatuses |
* | **Path** | `Query.projectStatuses(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.projectStatuses |
* | **Path** | `Query.projectStatuses(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.projectStatuses |
* | **Path** | `Query.projectStatuses(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `projectStatuses` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectStatusProjectCount<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectStatusProjectCount.$SelectionSet<_$Context>

export namespace projectStatusProjectCount {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectStatusCountPayload<_$Context> {
/**
* Arguments for `projectStatusProjectCount` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the project status to find the project count for.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.projectStatusProjectCount |
* | **Path** | `Query.projectStatusProjectCount(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectStatusProjectCount` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectStatus<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectStatus.$SelectionSet<_$Context>

export namespace projectStatus {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectStatus<_$Context> {
/**
* Arguments for `projectStatus` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.projectStatus |
* | **Path** | `Query.projectStatus(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectStatus` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectRelations<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectRelations.$SelectionSet<_$Context>

export namespace projectRelations {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectRelationConnection<_$Context> {
/**
* Arguments for `projectRelations` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.projectRelations |
* | **Path** | `Query.projectRelations(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.projectRelations |
* | **Path** | `Query.projectRelations(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.projectRelations |
* | **Path** | `Query.projectRelations(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.projectRelations |
* | **Path** | `Query.projectRelations(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.projectRelations |
* | **Path** | `Query.projectRelations(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.projectRelations |
* | **Path** | `Query.projectRelations(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `projectRelations` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectRelation<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectRelation.$SelectionSet<_$Context>

export namespace projectRelation {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectRelation<_$Context> {
/**
* Arguments for `projectRelation` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.projectRelation |
* | **Path** | `Query.projectRelation(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectRelation` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectMilestones<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectMilestones.$SelectionSet<_$Context>

export namespace projectMilestones {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectMilestoneConnection<_$Context> {
/**
* Arguments for `projectMilestones` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned project milestones.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ProjectMilestoneFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.projectMilestones |
* | **Path** | `Query.projectMilestones(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectMilestoneFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.projectMilestones |
* | **Path** | `Query.projectMilestones(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.projectMilestones |
* | **Path** | `Query.projectMilestones(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.projectMilestones |
* | **Path** | `Query.projectMilestones(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.projectMilestones |
* | **Path** | `Query.projectMilestones(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.projectMilestones |
* | **Path** | `Query.projectMilestones(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.projectMilestones |
* | **Path** | `Query.projectMilestones(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `projectMilestones` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectMilestone<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectMilestone.$SelectionSet<_$Context>

export namespace projectMilestone {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectMilestone<_$Context> {
/**
* Arguments for `projectMilestone` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.projectMilestone |
* | **Path** | `Query.projectMilestone(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectMilestone` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectLabels<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectLabels.$SelectionSet<_$Context>

export namespace projectLabels {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectLabelConnection<_$Context> {
/**
* Arguments for `projectLabels` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned project labels.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `ProjectLabelFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.projectLabels |
* | **Path** | `Query.projectLabels(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectLabelFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.projectLabels |
* | **Path** | `Query.projectLabels(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.projectLabels |
* | **Path** | `Query.projectLabels(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.projectLabels |
* | **Path** | `Query.projectLabels(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.projectLabels |
* | **Path** | `Query.projectLabels(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.projectLabels |
* | **Path** | `Query.projectLabels(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.projectLabels |
* | **Path** | `Query.projectLabels(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `projectLabels` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type projectLabel<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = projectLabel.$SelectionSet<_$Context>

export namespace projectLabel {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectLabel<_$Context> {
/**
* Arguments for `projectLabel` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.projectLabel |
* | **Path** | `Query.projectLabel(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `projectLabel` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organization<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organization.$SelectionSet<_$Context>

export namespace organization {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Organization<_$Context> {
}

/**
* This is the "expanded" version of the `organization` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organizationExists<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organizationExists.$SelectionSet<_$Context>

export namespace organizationExists {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.OrganizationExistsPayload<_$Context> {
/**
* Arguments for `organizationExists` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.organizationExists |
* | **Path** | `Query.organizationExists(urlKey)` |
* | **Nullability** | Required |
*/
readonly urlKey: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `organizationExists` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type archivedTeams<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = archivedTeams.$SelectionSet<_$Context>

export namespace archivedTeams {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Team<_$Context> {
}

/**
* This is the "expanded" version of the `archivedTeams` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organizationMeta<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organizationMeta.$SelectionSet<_$Context>

export namespace organizationMeta {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.OrganizationMeta<_$Context> {
/**
* Arguments for `organizationMeta` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.organizationMeta |
* | **Path** | `Query.organizationMeta(urlKey)` |
* | **Nullability** | Required |
*/
readonly urlKey: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `organizationMeta` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organizationInvites<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organizationInvites.$SelectionSet<_$Context>

export namespace organizationInvites {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.OrganizationInviteConnection<_$Context> {
/**
* Arguments for `organizationInvites` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.organizationInvites |
* | **Path** | `Query.organizationInvites(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.organizationInvites |
* | **Path** | `Query.organizationInvites(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.organizationInvites |
* | **Path** | `Query.organizationInvites(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.organizationInvites |
* | **Path** | `Query.organizationInvites(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.organizationInvites |
* | **Path** | `Query.organizationInvites(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.organizationInvites |
* | **Path** | `Query.organizationInvites(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `organizationInvites` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organizationInvite<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organizationInvite.$SelectionSet<_$Context>

export namespace organizationInvite {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.OrganizationInvite<_$Context> {
/**
* Arguments for `organizationInvite` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.organizationInvite |
* | **Path** | `Query.organizationInvite(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `organizationInvite` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organizationInviteDetails<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organizationInviteDetails.$SelectionSet<_$Context>

export namespace organizationInviteDetails {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.OrganizationInviteDetailsPayload<_$Context> {
/**
* Arguments for `organizationInviteDetails` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.organizationInviteDetails |
* | **Path** | `Query.organizationInviteDetails(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `organizationInviteDetails` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type organizationDomainClaimRequest<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = organizationDomainClaimRequest.$SelectionSet<_$Context>

export namespace organizationDomainClaimRequest {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.OrganizationDomainClaimPayload<_$Context> {
/**
* Arguments for `organizationDomainClaimRequest` field. All arguments are required so you must include this.
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
* | **Parent** | {@link $NamedTypes.$Query}.organizationDomainClaimRequest |
* | **Path** | `Query.organizationDomainClaimRequest(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `organizationDomainClaimRequest` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type notificationSubscriptions<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = notificationSubscriptions.$SelectionSet<_$Context>

export namespace notificationSubscriptions {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.NotificationSubscriptionConnection<_$Context> {
/**
* Arguments for `notificationSubscriptions` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.notificationSubscriptions |
* | **Path** | `Query.notificationSubscriptions(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.notificationSubscriptions |
* | **Path** | `Query.notificationSubscriptions(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.notificationSubscriptions |
* | **Path** | `Query.notificationSubscriptions(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.notificationSubscriptions |
* | **Path** | `Query.notificationSubscriptions(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.notificationSubscriptions |
* | **Path** | `Query.notificationSubscriptions(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.notificationSubscriptions |
* | **Path** | `Query.notificationSubscriptions(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `notificationSubscriptions` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type notificationSubscription<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = notificationSubscription.$SelectionSet<_$Context>

export namespace notificationSubscription {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.NotificationSubscription<_$Context> {
/**
* Arguments for `notificationSubscription` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.notificationSubscription |
* | **Path** | `Query.notificationSubscription(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `notificationSubscription` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type notifications<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = notifications.$SelectionSet<_$Context>

export namespace notifications {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.NotificationConnection<_$Context> {
/**
* Arguments for `notifications` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filters returned notifications.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `NotificationFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.notifications |
* | **Path** | `Query.notifications(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NotificationFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.notifications |
* | **Path** | `Query.notifications(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.notifications |
* | **Path** | `Query.notifications(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.notifications |
* | **Path** | `Query.notifications(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.notifications |
* | **Path** | `Query.notifications(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.notifications |
* | **Path** | `Query.notifications(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.notifications |
* | **Path** | `Query.notifications(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `notifications` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type notificationsUnreadCount<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator
| GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort
| GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
| notificationsUnreadCount.$SelectionSet<_$Context>

export namespace notificationsUnreadCount {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base {
}

/**
* This is the "expanded" version of the `notificationsUnreadCount` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator
| GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort
| GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
| $SelectionSet<_$Context>>
}


export type notification<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = notification.$SelectionSet<_$Context>

export namespace notification {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Notification<_$Context> {
/**
* Arguments for `notification` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.notification |
* | **Path** | `Query.notification(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `notification` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueToReleases<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueToReleases.$SelectionSet<_$Context>

export namespace issueToReleases {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueToReleaseConnection<_$Context> {
/**
* Arguments for `issueToReleases` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.issueToReleases |
* | **Path** | `Query.issueToReleases(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.issueToReleases |
* | **Path** | `Query.issueToReleases(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.issueToReleases |
* | **Path** | `Query.issueToReleases(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.issueToReleases |
* | **Path** | `Query.issueToReleases(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.issueToReleases |
* | **Path** | `Query.issueToReleases(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.issueToReleases |
* | **Path** | `Query.issueToReleases(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `issueToReleases` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueToRelease<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueToRelease.$SelectionSet<_$Context>

export namespace issueToRelease {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueToRelease<_$Context> {
/**
* Arguments for `issueToRelease` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.issueToRelease |
* | **Path** | `Query.issueToRelease(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueToRelease` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issues<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issues.$SelectionSet<_$Context>

export namespace issues {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueConnection<_$Context> {
/**
* Arguments for `issues` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned issues.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IssueFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.issues |
* | **Path** | `Query.issues(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.issues |
* | **Path** | `Query.issues(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.issues |
* | **Path** | `Query.issues(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.issues |
* | **Path** | `Query.issues(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.issues |
* | **Path** | `Query.issues(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.issues |
* | **Path** | `Query.issues(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.issues |
* | **Path** | `Query.issues(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
/**
* [INTERNAL] Sort returned issues.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `[IssueSortInput!]` |
* | **Parent** | {@link $NamedTypes.$Query}.issues |
* | **Path** | `Query.issues(sort)` |
* | **Nullability** | Optional |
*/
readonly sort?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueSortInput<_$Context> | null | undefined>> | null | undefined>
}

/**
* This is the "expanded" version of the `issues` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issue<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issue.$SelectionSet<_$Context>

export namespace issue {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Issue<_$Context> {
/**
* Arguments for `issue` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.issue |
* | **Path** | `Query.issue(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issue` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueSearch<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueSearch.$SelectionSet<_$Context>

export namespace issueSearch {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueConnection<_$Context> {
/**
* Arguments for `issueSearch` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned issues.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IssueFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.issueSearch |
* | **Path** | `Query.issueSearch(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueFilter<_$Context> | null | undefined>
/**
* [Deprecated] Search string to look for.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.issueSearch |
* | **Path** | `Query.issueSearch(query)` |
* | **Nullability** | Optional |
*/
readonly query?: $Scalars.String<_$Context>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.issueSearch |
* | **Path** | `Query.issueSearch(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.issueSearch |
* | **Path** | `Query.issueSearch(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.issueSearch |
* | **Path** | `Query.issueSearch(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.issueSearch |
* | **Path** | `Query.issueSearch(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.issueSearch |
* | **Path** | `Query.issueSearch(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.issueSearch |
* | **Path** | `Query.issueSearch(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `issueSearch` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueVcsBranchSearch<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueVcsBranchSearch.$SelectionSet<_$Context>

export namespace issueVcsBranchSearch {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Issue<_$Context> {
/**
* Arguments for `issueVcsBranchSearch` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The VCS branch name to search for.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.issueVcsBranchSearch |
* | **Path** | `Query.issueVcsBranchSearch(branchName)` |
* | **Nullability** | Required |
*/
readonly branchName: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueVcsBranchSearch` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueFigmaFileKeySearch<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueFigmaFileKeySearch.$SelectionSet<_$Context>

export namespace issueFigmaFileKeySearch {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueConnection<_$Context> {
/**
* Arguments for `issueFigmaFileKeySearch` field. Some (1/7) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.issueFigmaFileKeySearch |
* | **Path** | `Query.issueFigmaFileKeySearch(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.issueFigmaFileKeySearch |
* | **Path** | `Query.issueFigmaFileKeySearch(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.issueFigmaFileKeySearch |
* | **Path** | `Query.issueFigmaFileKeySearch(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.issueFigmaFileKeySearch |
* | **Path** | `Query.issueFigmaFileKeySearch(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.issueFigmaFileKeySearch |
* | **Path** | `Query.issueFigmaFileKeySearch(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.issueFigmaFileKeySearch |
* | **Path** | `Query.issueFigmaFileKeySearch(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
/**
* The Figma file key.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.issueFigmaFileKeySearch |
* | **Path** | `Query.issueFigmaFileKeySearch(fileKey)` |
* | **Nullability** | Required |
*/
readonly fileKey: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueFigmaFileKeySearch` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issuePriorityValues<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issuePriorityValues.$SelectionSet<_$Context>

export namespace issuePriorityValues {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssuePriorityValue<_$Context> {
}

/**
* This is the "expanded" version of the `issuePriorityValues` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueFilterSuggestion<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueFilterSuggestion.$SelectionSet<_$Context>

export namespace issueFilterSuggestion {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueFilterSuggestionPayload<_$Context> {
/**
* Arguments for `issueFilterSuggestion` field. Some (1/2) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The ID of the project if filtering a project view
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.issueFilterSuggestion |
* | **Path** | `Query.issueFilterSuggestion(projectId)` |
* | **Nullability** | Optional |
*/
readonly projectId?: $Scalars.String<_$Context>
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.issueFilterSuggestion |
* | **Path** | `Query.issueFilterSuggestion(prompt)` |
* | **Nullability** | Required |
*/
readonly prompt: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueFilterSuggestion` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueRepositorySuggestions<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueRepositorySuggestions.$SelectionSet<_$Context>

export namespace issueRepositorySuggestions {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.RepositorySuggestionsPayload<_$Context> {
/**
* Arguments for `issueRepositorySuggestions` field. Some (2/3) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Optional AgentSession ID associated with the issue for which the suggestions are being generated.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.issueRepositorySuggestions |
* | **Path** | `Query.issueRepositorySuggestions(agentSessionId)` |
* | **Nullability** | Optional |
*/
readonly agentSessionId?: $Scalars.String<_$Context>
/**
* List of candidate repositories to restrict suggestions to.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `[CandidateRepository!]!` |
* | **Parent** | {@link $NamedTypes.$Query}.issueRepositorySuggestions |
* | **Path** | `Query.issueRepositorySuggestions(candidateRepositories)` |
* | **Nullability** | Required |
*/
readonly candidateRepositories: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CandidateRepository<_$Context> | null | undefined>>>
/**
* The ID of the issue to get repository suggestions for.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.issueRepositorySuggestions |
* | **Path** | `Query.issueRepositorySuggestions(issueId)` |
* | **Nullability** | Required |
*/
readonly issueId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueRepositorySuggestions` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueRelations<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueRelations.$SelectionSet<_$Context>

export namespace issueRelations {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueRelationConnection<_$Context> {
/**
* Arguments for `issueRelations` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.issueRelations |
* | **Path** | `Query.issueRelations(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.issueRelations |
* | **Path** | `Query.issueRelations(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.issueRelations |
* | **Path** | `Query.issueRelations(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.issueRelations |
* | **Path** | `Query.issueRelations(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.issueRelations |
* | **Path** | `Query.issueRelations(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.issueRelations |
* | **Path** | `Query.issueRelations(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `issueRelations` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueRelation<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueRelation.$SelectionSet<_$Context>

export namespace issueRelation {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueRelation<_$Context> {
/**
* Arguments for `issueRelation` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.issueRelation |
* | **Path** | `Query.issueRelation(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueRelation` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueLabels<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueLabels.$SelectionSet<_$Context>

export namespace issueLabels {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueLabelConnection<_$Context> {
/**
* Arguments for `issueLabels` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned issue labels.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IssueLabelFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.issueLabels |
* | **Path** | `Query.issueLabels(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueLabelFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.issueLabels |
* | **Path** | `Query.issueLabels(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.issueLabels |
* | **Path** | `Query.issueLabels(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.issueLabels |
* | **Path** | `Query.issueLabels(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.issueLabels |
* | **Path** | `Query.issueLabels(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.issueLabels |
* | **Path** | `Query.issueLabels(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.issueLabels |
* | **Path** | `Query.issueLabels(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `issueLabels` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueLabel<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueLabel.$SelectionSet<_$Context>

export namespace issueLabel {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueLabel<_$Context> {
/**
* Arguments for `issueLabel` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.issueLabel |
* | **Path** | `Query.issueLabel(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueLabel` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueImportCheckCSV<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueImportCheckCSV.$SelectionSet<_$Context>

export namespace issueImportCheckCSV {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueImportCheckPayload<_$Context> {
/**
* Arguments for `issueImportCheckCSV` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* CSV storage url.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.issueImportCheckCSV |
* | **Path** | `Query.issueImportCheckCSV(csvUrl)` |
* | **Nullability** | Required |
*/
readonly csvUrl: $Scalars.String$NonNull<_$Context>
/**
* The service the CSV containing data from.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.issueImportCheckCSV |
* | **Path** | `Query.issueImportCheckCSV(service)` |
* | **Nullability** | Required |
*/
readonly service: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueImportCheckCSV` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueImportCheckSync<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueImportCheckSync.$SelectionSet<_$Context>

export namespace issueImportCheckSync {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueImportSyncCheckPayload<_$Context> {
/**
* Arguments for `issueImportCheckSync` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The ID of the issue import for which to check sync eligibility
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.issueImportCheckSync |
* | **Path** | `Query.issueImportCheckSync(issueImportId)` |
* | **Nullability** | Required |
*/
readonly issueImportId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueImportCheckSync` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueImportJqlCheck<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueImportJqlCheck.$SelectionSet<_$Context>

export namespace issueImportJqlCheck {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueImportJqlCheckPayload<_$Context> {
/**
* Arguments for `issueImportJqlCheck` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Jira installation or cloud hostname.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.issueImportJqlCheck |
* | **Path** | `Query.issueImportJqlCheck(jiraHostname)` |
* | **Nullability** | Required |
*/
readonly jiraHostname: $Scalars.String$NonNull<_$Context>
/**
* Jira personal access token to access Jira REST API.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.issueImportJqlCheck |
* | **Path** | `Query.issueImportJqlCheck(jiraToken)` |
* | **Nullability** | Required |
*/
readonly jiraToken: $Scalars.String$NonNull<_$Context>
/**
* Jira user account email.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.issueImportJqlCheck |
* | **Path** | `Query.issueImportJqlCheck(jiraEmail)` |
* | **Nullability** | Required |
*/
readonly jiraEmail: $Scalars.String$NonNull<_$Context>
/**
* Jira project key to use as the base filter of the query.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.issueImportJqlCheck |
* | **Path** | `Query.issueImportJqlCheck(jiraProject)` |
* | **Nullability** | Required |
*/
readonly jiraProject: $Scalars.String$NonNull<_$Context>
/**
* The JQL query to validate.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.issueImportJqlCheck |
* | **Path** | `Query.issueImportJqlCheck(jql)` |
* | **Nullability** | Required |
*/
readonly jql: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueImportJqlCheck` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationsSettings<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationsSettings.$SelectionSet<_$Context>

export namespace integrationsSettings {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationsSettings<_$Context> {
/**
* Arguments for `integrationsSettings` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.integrationsSettings |
* | **Path** | `Query.integrationsSettings(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationsSettings` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationTemplates<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationTemplates.$SelectionSet<_$Context>

export namespace integrationTemplates {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationTemplateConnection<_$Context> {
/**
* Arguments for `integrationTemplates` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.integrationTemplates |
* | **Path** | `Query.integrationTemplates(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.integrationTemplates |
* | **Path** | `Query.integrationTemplates(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.integrationTemplates |
* | **Path** | `Query.integrationTemplates(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.integrationTemplates |
* | **Path** | `Query.integrationTemplates(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.integrationTemplates |
* | **Path** | `Query.integrationTemplates(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.integrationTemplates |
* | **Path** | `Query.integrationTemplates(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `integrationTemplates` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationTemplate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationTemplate.$SelectionSet<_$Context>

export namespace integrationTemplate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationTemplate<_$Context> {
/**
* Arguments for `integrationTemplate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.integrationTemplate |
* | **Path** | `Query.integrationTemplate(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationTemplate` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrations<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrations.$SelectionSet<_$Context>

export namespace integrations {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationConnection<_$Context> {
/**
* Arguments for `integrations` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.integrations |
* | **Path** | `Query.integrations(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.integrations |
* | **Path** | `Query.integrations(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.integrations |
* | **Path** | `Query.integrations(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.integrations |
* | **Path** | `Query.integrations(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.integrations |
* | **Path** | `Query.integrations(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.integrations |
* | **Path** | `Query.integrations(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `integrations` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integration<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integration.$SelectionSet<_$Context>

export namespace integration {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Integration<_$Context> {
/**
* Arguments for `integration` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.integration |
* | **Path** | `Query.integration(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integration` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type verifyGitHubEnterpriseServerInstallation<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = verifyGitHubEnterpriseServerInstallation.$SelectionSet<_$Context>

export namespace verifyGitHubEnterpriseServerInstallation {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.GitHubEnterpriseServerInstallVerificationPayload<_$Context> {
/**
* Arguments for `verifyGitHubEnterpriseServerInstallation` field. All arguments are required so you must include this.
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
* | **Parent** | {@link $NamedTypes.$Query}.verifyGitHubEnterpriseServerInstallation |
* | **Path** | `Query.verifyGitHubEnterpriseServerInstallation(integrationId)` |
* | **Nullability** | Required |
*/
readonly integrationId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `verifyGitHubEnterpriseServerInstallation` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type integrationHasScopes<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = integrationHasScopes.$SelectionSet<_$Context>

export namespace integrationHasScopes {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IntegrationHasScopesPayload<_$Context> {
/**
* Arguments for `integrationHasScopes` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Required scopes.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `[String!]!` |
* | **Parent** | {@link $NamedTypes.$Query}.integrationHasScopes |
* | **Path** | `Query.integrationHasScopes(scopes)` |
* | **Nullability** | Required |
*/
readonly scopes: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>>>
/**
* The integration ID.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.integrationHasScopes |
* | **Path** | `Query.integrationHasScopes(integrationId)` |
* | **Nullability** | Required |
*/
readonly integrationId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `integrationHasScopes` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiativeUpdates<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeUpdates.$SelectionSet<_$Context>

export namespace initiativeUpdates {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.InitiativeUpdateConnection<_$Context> {
/**
* Arguments for `initiativeUpdates` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned initiative updates.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `InitiativeUpdateFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeUpdates |
* | **Path** | `Query.initiativeUpdates(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeUpdateFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeUpdates |
* | **Path** | `Query.initiativeUpdates(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeUpdates |
* | **Path** | `Query.initiativeUpdates(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeUpdates |
* | **Path** | `Query.initiativeUpdates(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeUpdates |
* | **Path** | `Query.initiativeUpdates(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeUpdates |
* | **Path** | `Query.initiativeUpdates(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeUpdates |
* | **Path** | `Query.initiativeUpdates(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `initiativeUpdates` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiativeUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeUpdate.$SelectionSet<_$Context>

export namespace initiativeUpdate {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.InitiativeUpdate<_$Context> {
/**
* Arguments for `initiativeUpdate` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the  initiative update to retrieve.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeUpdate |
* | **Path** | `Query.initiativeUpdate(id)` |
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


export type initiativeToProjects<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeToProjects.$SelectionSet<_$Context>

export namespace initiativeToProjects {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.InitiativeToProjectConnection<_$Context> {
/**
* Arguments for `initiativeToProjects` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeToProjects |
* | **Path** | `Query.initiativeToProjects(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeToProjects |
* | **Path** | `Query.initiativeToProjects(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeToProjects |
* | **Path** | `Query.initiativeToProjects(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeToProjects |
* | **Path** | `Query.initiativeToProjects(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeToProjects |
* | **Path** | `Query.initiativeToProjects(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeToProjects |
* | **Path** | `Query.initiativeToProjects(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `initiativeToProjects` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiativeToProject<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeToProject.$SelectionSet<_$Context>

export namespace initiativeToProject {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.InitiativeToProject<_$Context> {
/**
* Arguments for `initiativeToProject` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeToProject |
* | **Path** | `Query.initiativeToProject(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `initiativeToProject` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiatives<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiatives.$SelectionSet<_$Context>

export namespace initiatives {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.InitiativeConnection<_$Context> {
/**
* Arguments for `initiatives` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned initiatives.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `InitiativeFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.initiatives |
* | **Path** | `Query.initiatives(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.initiatives |
* | **Path** | `Query.initiatives(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.initiatives |
* | **Path** | `Query.initiatives(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.initiatives |
* | **Path** | `Query.initiatives(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.initiatives |
* | **Path** | `Query.initiatives(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.initiatives |
* | **Path** | `Query.initiatives(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.initiatives |
* | **Path** | `Query.initiatives(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
/**
* [INTERNAL] Sort returned initiatives.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `[InitiativeSortInput!]` |
* | **Parent** | {@link $NamedTypes.$Query}.initiatives |
* | **Path** | `Query.initiatives(sort)` |
* | **Nullability** | Optional |
*/
readonly sort?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeSortInput<_$Context> | null | undefined>> | null | undefined>
}

/**
* This is the "expanded" version of the `initiatives` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiative<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiative.$SelectionSet<_$Context>

export namespace initiative {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Initiative<_$Context> {
/**
* Arguments for `initiative` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.initiative |
* | **Path** | `Query.initiative(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `initiative` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiativeRelations<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeRelations.$SelectionSet<_$Context>

export namespace initiativeRelations {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.InitiativeRelationConnection<_$Context> {
/**
* Arguments for `initiativeRelations` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeRelations |
* | **Path** | `Query.initiativeRelations(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeRelations |
* | **Path** | `Query.initiativeRelations(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeRelations |
* | **Path** | `Query.initiativeRelations(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeRelations |
* | **Path** | `Query.initiativeRelations(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeRelations |
* | **Path** | `Query.initiativeRelations(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeRelations |
* | **Path** | `Query.initiativeRelations(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `initiativeRelations` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type initiativeRelation<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = initiativeRelation.$SelectionSet<_$Context>

export namespace initiativeRelation {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ProjectRelation<_$Context> {
/**
* Arguments for `initiativeRelation` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.initiativeRelation |
* | **Path** | `Query.initiativeRelation(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `initiativeRelation` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type fetchData<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = fetchData.$SelectionSet<_$Context>

export namespace fetchData {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.FetchDataPayload<_$Context> {
/**
* Arguments for `fetchData` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Natural language query describing what data to fetch.
*
* Examples:
* - "All issues for the project with id 12345678-1234-1234-1234-123456789abc including comments"
* - "The latest project update for each project that's a part of the initiative with id 12345678-1234-1234-1234-123456789abc, including it's sub-initiatives"
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.fetchData |
* | **Path** | `Query.fetchData(query)` |
* | **Nullability** | Required |
*/
readonly query: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `fetchData` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type favorites<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = favorites.$SelectionSet<_$Context>

export namespace favorites {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.FavoriteConnection<_$Context> {
/**
* Arguments for `favorites` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.favorites |
* | **Path** | `Query.favorites(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.favorites |
* | **Path** | `Query.favorites(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.favorites |
* | **Path** | `Query.favorites(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.favorites |
* | **Path** | `Query.favorites(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.favorites |
* | **Path** | `Query.favorites(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.favorites |
* | **Path** | `Query.favorites(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `favorites` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type favorite<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = favorite.$SelectionSet<_$Context>

export namespace favorite {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Favorite<_$Context> {
/**
* Arguments for `favorite` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.favorite |
* | **Path** | `Query.favorite(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `favorite` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type externalUsers<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = externalUsers.$SelectionSet<_$Context>

export namespace externalUsers {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ExternalUserConnection<_$Context> {
/**
* Arguments for `externalUsers` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.externalUsers |
* | **Path** | `Query.externalUsers(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.externalUsers |
* | **Path** | `Query.externalUsers(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.externalUsers |
* | **Path** | `Query.externalUsers(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.externalUsers |
* | **Path** | `Query.externalUsers(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.externalUsers |
* | **Path** | `Query.externalUsers(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.externalUsers |
* | **Path** | `Query.externalUsers(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `externalUsers` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type externalUser<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = externalUser.$SelectionSet<_$Context>

export namespace externalUser {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.ExternalUser<_$Context> {
/**
* Arguments for `externalUser` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the external user to retrieve.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.externalUser |
* | **Path** | `Query.externalUser(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `externalUser` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type entityExternalLink<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = entityExternalLink.$SelectionSet<_$Context>

export namespace entityExternalLink {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.EntityExternalLink<_$Context> {
/**
* Arguments for `entityExternalLink` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.entityExternalLink |
* | **Path** | `Query.entityExternalLink(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `entityExternalLink` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type emojis<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = emojis.$SelectionSet<_$Context>

export namespace emojis {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.EmojiConnection<_$Context> {
/**
* Arguments for `emojis` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.emojis |
* | **Path** | `Query.emojis(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.emojis |
* | **Path** | `Query.emojis(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.emojis |
* | **Path** | `Query.emojis(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.emojis |
* | **Path** | `Query.emojis(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.emojis |
* | **Path** | `Query.emojis(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.emojis |
* | **Path** | `Query.emojis(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `emojis` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type emoji<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = emoji.$SelectionSet<_$Context>

export namespace emoji {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Emoji<_$Context> {
/**
* Arguments for `emoji` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier or the name of the emoji to retrieve.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.emoji |
* | **Path** | `Query.emoji(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `emoji` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type emailIntakeAddress<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = emailIntakeAddress.$SelectionSet<_$Context>

export namespace emailIntakeAddress {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.EmailIntakeAddress<_$Context> {
/**
* Arguments for `emailIntakeAddress` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.emailIntakeAddress |
* | **Path** | `Query.emailIntakeAddress(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `emailIntakeAddress` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type documents<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = documents.$SelectionSet<_$Context>

export namespace documents {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DocumentConnection<_$Context> {
/**
* Arguments for `documents` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned documents.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `DocumentFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.documents |
* | **Path** | `Query.documents(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DocumentFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.documents |
* | **Path** | `Query.documents(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.documents |
* | **Path** | `Query.documents(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.documents |
* | **Path** | `Query.documents(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.documents |
* | **Path** | `Query.documents(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.documents |
* | **Path** | `Query.documents(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.documents |
* | **Path** | `Query.documents(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `documents` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type document<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = document.$SelectionSet<_$Context>

export namespace document {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Document<_$Context> {
/**
* Arguments for `document` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.document |
* | **Path** | `Query.document(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `document` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type documentContentHistory<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = documentContentHistory.$SelectionSet<_$Context>

export namespace documentContentHistory {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.DocumentContentHistoryPayload<_$Context> {
/**
* Arguments for `documentContentHistory` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.documentContentHistory |
* | **Path** | `Query.documentContentHistory(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `documentContentHistory` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type cycles<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = cycles.$SelectionSet<_$Context>

export namespace cycles {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CycleConnection<_$Context> {
/**
* Arguments for `cycles` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned users.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CycleFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.cycles |
* | **Path** | `Query.cycles(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CycleFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.cycles |
* | **Path** | `Query.cycles(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.cycles |
* | **Path** | `Query.cycles(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.cycles |
* | **Path** | `Query.cycles(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.cycles |
* | **Path** | `Query.cycles(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.cycles |
* | **Path** | `Query.cycles(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.cycles |
* | **Path** | `Query.cycles(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `cycles` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type cycle<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = cycle.$SelectionSet<_$Context>

export namespace cycle {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Cycle<_$Context> {
/**
* Arguments for `cycle` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.cycle |
* | **Path** | `Query.cycle(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `cycle` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerTiers<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerTiers.$SelectionSet<_$Context>

export namespace customerTiers {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerTierConnection<_$Context> {
/**
* Arguments for `customerTiers` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.customerTiers |
* | **Path** | `Query.customerTiers(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.customerTiers |
* | **Path** | `Query.customerTiers(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.customerTiers |
* | **Path** | `Query.customerTiers(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.customerTiers |
* | **Path** | `Query.customerTiers(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.customerTiers |
* | **Path** | `Query.customerTiers(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.customerTiers |
* | **Path** | `Query.customerTiers(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `customerTiers` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerTier<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerTier.$SelectionSet<_$Context>

export namespace customerTier {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerTier<_$Context> {
/**
* Arguments for `customerTier` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.customerTier |
* | **Path** | `Query.customerTier(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `customerTier` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerStatuses<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerStatuses.$SelectionSet<_$Context>

export namespace customerStatuses {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerStatusConnection<_$Context> {
/**
* Arguments for `customerStatuses` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.customerStatuses |
* | **Path** | `Query.customerStatuses(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.customerStatuses |
* | **Path** | `Query.customerStatuses(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.customerStatuses |
* | **Path** | `Query.customerStatuses(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.customerStatuses |
* | **Path** | `Query.customerStatuses(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.customerStatuses |
* | **Path** | `Query.customerStatuses(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.customerStatuses |
* | **Path** | `Query.customerStatuses(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `customerStatuses` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerStatus<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerStatus.$SelectionSet<_$Context>

export namespace customerStatus {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerStatus<_$Context> {
/**
* Arguments for `customerStatus` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.customerStatus |
* | **Path** | `Query.customerStatus(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `customerStatus` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customers<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customers.$SelectionSet<_$Context>

export namespace customers {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerConnection<_$Context> {
/**
* Arguments for `customers` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned customers.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CustomerFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.customers |
* | **Path** | `Query.customers(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.customers |
* | **Path** | `Query.customers(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.customers |
* | **Path** | `Query.customers(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.customers |
* | **Path** | `Query.customers(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.customers |
* | **Path** | `Query.customers(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.customers |
* | **Path** | `Query.customers(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.customers |
* | **Path** | `Query.customers(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
/**
* Sort returned customers.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `[CustomerSortInput!]` |
* | **Parent** | {@link $NamedTypes.$Query}.customers |
* | **Path** | `Query.customers(sorts)` |
* | **Nullability** | Optional |
*/
readonly sorts?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerSortInput<_$Context> | null | undefined>> | null | undefined>
}

/**
* This is the "expanded" version of the `customers` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customer<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customer.$SelectionSet<_$Context>

export namespace customer {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Customer<_$Context> {
/**
* Arguments for `customer` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.customer |
* | **Path** | `Query.customer(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `customer` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerNeeds<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerNeeds.$SelectionSet<_$Context>

export namespace customerNeeds {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerNeedConnection<_$Context> {
/**
* Arguments for `customerNeeds` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned customers needs.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CustomerNeedFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.customerNeeds |
* | **Path** | `Query.customerNeeds(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerNeedFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.customerNeeds |
* | **Path** | `Query.customerNeeds(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.customerNeeds |
* | **Path** | `Query.customerNeeds(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.customerNeeds |
* | **Path** | `Query.customerNeeds(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.customerNeeds |
* | **Path** | `Query.customerNeeds(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.customerNeeds |
* | **Path** | `Query.customerNeeds(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.customerNeeds |
* | **Path** | `Query.customerNeeds(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `customerNeeds` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customerNeed<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customerNeed.$SelectionSet<_$Context>

export namespace customerNeed {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomerNeed<_$Context> {
/**
* Arguments for `customerNeed` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the need to retrieve.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.customerNeed |
* | **Path** | `Query.customerNeed(id)` |
* | **Nullability** | Optional |
*/
readonly id?: $Scalars.String<_$Context>
/**
* The hash of the need to retrieve.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.customerNeed |
* | **Path** | `Query.customerNeed(hash)` |
* | **Nullability** | Optional |
*/
readonly hash?: $Scalars.String<_$Context>
}

/**
* This is the "expanded" version of the `customerNeed` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type issueTitleSuggestionFromCustomerRequest<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = issueTitleSuggestionFromCustomerRequest.$SelectionSet<_$Context>

export namespace issueTitleSuggestionFromCustomerRequest {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.IssueTitleSuggestionFromCustomerRequestPayload<_$Context> {
/**
* Arguments for `issueTitleSuggestionFromCustomerRequest` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.issueTitleSuggestionFromCustomerRequest |
* | **Path** | `Query.issueTitleSuggestionFromCustomerRequest(request)` |
* | **Nullability** | Required |
*/
readonly request: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `issueTitleSuggestionFromCustomerRequest` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customViews<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customViews.$SelectionSet<_$Context>

export namespace customViews {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomViewConnection<_$Context> {
/**
* Arguments for `customViews` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned custom views.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CustomViewFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.customViews |
* | **Path** | `Query.customViews(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomViewFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.customViews |
* | **Path** | `Query.customViews(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.customViews |
* | **Path** | `Query.customViews(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.customViews |
* | **Path** | `Query.customViews(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.customViews |
* | **Path** | `Query.customViews(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.customViews |
* | **Path** | `Query.customViews(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.customViews |
* | **Path** | `Query.customViews(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
/**
* [INTERNAL] Sort returned custom views.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `[CustomViewSortInput!]` |
* | **Parent** | {@link $NamedTypes.$Query}.customViews |
* | **Path** | `Query.customViews(sort)` |
* | **Nullability** | Optional |
*/
readonly sort?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomViewSortInput<_$Context> | null | undefined>> | null | undefined>
}

/**
* This is the "expanded" version of the `customViews` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customView<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customView.$SelectionSet<_$Context>

export namespace customView {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomView<_$Context> {
/**
* Arguments for `customView` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.customView |
* | **Path** | `Query.customView(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `customView` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customViewDetailsSuggestion<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customViewDetailsSuggestion.$SelectionSet<_$Context>

export namespace customViewDetailsSuggestion {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomViewSuggestionPayload<_$Context> {
/**
* Arguments for `customViewDetailsSuggestion` field. Some (1/2) arguments are required so you must include this.
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
* | **Parent** | {@link $NamedTypes.$Query}.customViewDetailsSuggestion |
* | **Path** | `Query.customViewDetailsSuggestion(modelName)` |
* | **Nullability** | Optional |
*/
readonly modelName?: $Scalars.String<_$Context>
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `JSONObject!` |
* | **Parent** | {@link $NamedTypes.$Query}.customViewDetailsSuggestion |
* | **Path** | `Query.customViewDetailsSuggestion(filter)` |
* | **Nullability** | Required |
*/
readonly filter: $Scalars.JSONObject$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `customViewDetailsSuggestion` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type customViewHasSubscribers<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = customViewHasSubscribers.$SelectionSet<_$Context>

export namespace customViewHasSubscribers {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CustomViewHasSubscribersPayload<_$Context> {
/**
* Arguments for `customViewHasSubscribers` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.customViewHasSubscribers |
* | **Path** | `Query.customViewHasSubscribers(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `customViewHasSubscribers` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type comments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = comments.$SelectionSet<_$Context>

export namespace comments {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.CommentConnection<_$Context> {
/**
* Arguments for `comments` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned comments.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `CommentFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.comments |
* | **Path** | `Query.comments(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CommentFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.comments |
* | **Path** | `Query.comments(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.comments |
* | **Path** | `Query.comments(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.comments |
* | **Path** | `Query.comments(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.comments |
* | **Path** | `Query.comments(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.comments |
* | **Path** | `Query.comments(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.comments |
* | **Path** | `Query.comments(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `comments` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type comment<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = comment.$SelectionSet<_$Context>

export namespace comment {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Comment<_$Context> {
/**
* Arguments for `comment` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the comment to retrieve.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.comment |
* | **Path** | `Query.comment(id)` |
* | **Nullability** | Optional |
*/
readonly id?: $Scalars.String<_$Context>
/**
* [Deprecated] The issue for which to find the comment.
*
* @deprecated Not in use anymore, please use `id` or `hash` directly.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.comment |
* | **Path** | `Query.comment(issueId)` |
* | **Nullability** | Optional |
* | **⚠ Deprecated** | Not in use anymore, please use `id` or `hash` directly. |
*/
readonly issueId?: $Scalars.String<_$Context>
/**
* The hash of the comment to retrieve.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.comment |
* | **Path** | `Query.comment(hash)` |
* | **Nullability** | Optional |
*/
readonly hash?: $Scalars.String<_$Context>
}

/**
* This is the "expanded" version of the `comment` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type availableUsers<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = availableUsers.$SelectionSet<_$Context>

export namespace availableUsers {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AuthResolverResponse<_$Context> {
}

/**
* This is the "expanded" version of the `availableUsers` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type authenticationSessions<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = authenticationSessions.$SelectionSet<_$Context>

export namespace authenticationSessions {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AuthenticationSessionResponse<_$Context> {
}

/**
* This is the "expanded" version of the `authenticationSessions` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type ssoUrlFromEmail<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = ssoUrlFromEmail.$SelectionSet<_$Context>

export namespace ssoUrlFromEmail {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.SsoUrlFromEmailResponse<_$Context> {
/**
* Arguments for `ssoUrlFromEmail` field. Some (2/3) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether the client is the desktop app.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.ssoUrlFromEmail |
* | **Path** | `Query.ssoUrlFromEmail(isDesktop)` |
* | **Nullability** | Optional |
*/
readonly isDesktop?: $Scalars.Boolean<_$Context>
/**
* Type of identity provider.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `IdentityProviderType!` |
* | **Parent** | {@link $NamedTypes.$Query}.ssoUrlFromEmail |
* | **Path** | `Query.ssoUrlFromEmail(type)` |
* | **Nullability** | Required |
* | **Default** | `"general"` |
*/
readonly $type: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IdentityProviderType>
/**
* Email to query the SSO login URL by.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.ssoUrlFromEmail |
* | **Path** | `Query.ssoUrlFromEmail(email)` |
* | **Nullability** | Required |
*/
readonly email: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `ssoUrlFromEmail` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type auditEntryTypes<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = auditEntryTypes.$SelectionSet<_$Context>

export namespace auditEntryTypes {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AuditEntryType<_$Context> {
}

/**
* This is the "expanded" version of the `auditEntryTypes` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type auditEntries<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = auditEntries.$SelectionSet<_$Context>

export namespace auditEntries {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AuditEntryConnection<_$Context> {
/**
* Arguments for `auditEntries` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned audit entries.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `AuditEntryFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.auditEntries |
* | **Path** | `Query.auditEntries(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AuditEntryFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.auditEntries |
* | **Path** | `Query.auditEntries(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.auditEntries |
* | **Path** | `Query.auditEntries(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.auditEntries |
* | **Path** | `Query.auditEntries(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.auditEntries |
* | **Path** | `Query.auditEntries(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.auditEntries |
* | **Path** | `Query.auditEntries(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.auditEntries |
* | **Path** | `Query.auditEntries(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `auditEntries` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type attachments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = attachments.$SelectionSet<_$Context>

export namespace attachments {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AttachmentConnection<_$Context> {
/**
* Arguments for `attachments` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned attachments.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `AttachmentFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.attachments |
* | **Path** | `Query.attachments(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AttachmentFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.attachments |
* | **Path** | `Query.attachments(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.attachments |
* | **Path** | `Query.attachments(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.attachments |
* | **Path** | `Query.attachments(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.attachments |
* | **Path** | `Query.attachments(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.attachments |
* | **Path** | `Query.attachments(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.attachments |
* | **Path** | `Query.attachments(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `attachments` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type attachment<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = attachment.$SelectionSet<_$Context>

export namespace attachment {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Attachment<_$Context> {
/**
* Arguments for `attachment` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.attachment |
* | **Path** | `Query.attachment(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `attachment` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type attachmentsForURL<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = attachmentsForURL.$SelectionSet<_$Context>

export namespace attachmentsForURL {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AttachmentConnection<_$Context> {
/**
* Arguments for `attachmentsForURL` field. Some (1/7) arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.attachmentsForURL |
* | **Path** | `Query.attachmentsForURL(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.attachmentsForURL |
* | **Path** | `Query.attachmentsForURL(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.attachmentsForURL |
* | **Path** | `Query.attachmentsForURL(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.attachmentsForURL |
* | **Path** | `Query.attachmentsForURL(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.attachmentsForURL |
* | **Path** | `Query.attachmentsForURL(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.attachmentsForURL |
* | **Path** | `Query.attachmentsForURL(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
/**
* The attachment URL.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.attachmentsForURL |
* | **Path** | `Query.attachmentsForURL(url)` |
* | **Nullability** | Required |
*/
readonly url: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `attachmentsForURL` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type attachmentIssue<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = attachmentIssue.$SelectionSet<_$Context>

export namespace attachmentIssue {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Issue<_$Context> {
/**
* Arguments for `attachmentIssue` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* `id` of the attachment for which you'll want to get the issue for. [Deprecated] `url` as the `id` parameter.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.attachmentIssue |
* | **Path** | `Query.attachmentIssue(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `attachmentIssue` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type attachmentSources<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = attachmentSources.$SelectionSet<_$Context>

export namespace attachmentSources {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AttachmentSourcesPayload<_$Context> {
/**
* Arguments for `attachmentSources` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* (optional) if provided will only return attachment sources for the given team.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.attachmentSources |
* | **Path** | `Query.attachmentSources(teamId)` |
* | **Nullability** | Optional |
*/
readonly teamId?: $Scalars.String<_$Context>
}

/**
* This is the "expanded" version of the `attachmentSources` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type asksWebSetting<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = asksWebSetting.$SelectionSet<_$Context>

export namespace asksWebSetting {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AsksWebSettings<_$Context> {
/**
* Arguments for `asksWebSetting` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the Asks web settings.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.asksWebSetting |
* | **Path** | `Query.asksWebSetting(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `asksWebSetting` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type applicationInfo<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = applicationInfo.$SelectionSet<_$Context>

export namespace applicationInfo {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.Application<_$Context> {
/**
* Arguments for `applicationInfo` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The client ID of the application.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.applicationInfo |
* | **Path** | `Query.applicationInfo(clientId)` |
* | **Nullability** | Required |
*/
readonly clientId: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `applicationInfo` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type agentSessions<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = agentSessions.$SelectionSet<_$Context>

export namespace agentSessions {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AgentSessionConnection<_$Context> {
/**
* Arguments for `agentSessions` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.agentSessions |
* | **Path** | `Query.agentSessions(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.agentSessions |
* | **Path** | `Query.agentSessions(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.agentSessions |
* | **Path** | `Query.agentSessions(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.agentSessions |
* | **Path** | `Query.agentSessions(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.agentSessions |
* | **Path** | `Query.agentSessions(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.agentSessions |
* | **Path** | `Query.agentSessions(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `agentSessions` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type agentSession<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = agentSession.$SelectionSet<_$Context>

export namespace agentSession {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AgentSession<_$Context> {
/**
* Arguments for `agentSession` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the agent session to retrieve.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.agentSession |
* | **Path** | `Query.agentSession(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `agentSession` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type agentActivities<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = agentActivities.$SelectionSet<_$Context>

export namespace agentActivities {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AgentActivityConnection<_$Context> {
/**
* Arguments for `agentActivities` field. No arguments are required so you may omit this.
*/
readonly $?: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filter returned agent activities.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `AgentActivityFilter` |
* | **Parent** | {@link $NamedTypes.$Query}.agentActivities |
* | **Path** | `Query.agentActivities(filter)` |
* | **Nullability** | Optional |
*/
readonly filter?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.AgentActivityFilter<_$Context> | null | undefined>
/**
* A cursor to be used with last for backward pagination.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.agentActivities |
* | **Path** | `Query.agentActivities(before)` |
* | **Nullability** | Optional |
*/
readonly before?: $Scalars.String<_$Context>
/**
* A cursor to be used with first for forward pagination
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String` |
* | **Parent** | {@link $NamedTypes.$Query}.agentActivities |
* | **Path** | `Query.agentActivities(after)` |
* | **Nullability** | Optional |
*/
readonly after?: $Scalars.String<_$Context>
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.agentActivities |
* | **Path** | `Query.agentActivities(first)` |
* | **Nullability** | Optional |
*/
readonly first?: $Scalars.Int<_$Context>
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Int` |
* | **Parent** | {@link $NamedTypes.$Query}.agentActivities |
* | **Path** | `Query.agentActivities(last)` |
* | **Nullability** | Optional |
*/
readonly last?: $Scalars.Int<_$Context>
/**
* Should archived resources be included (default: false)
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `Boolean` |
* | **Parent** | {@link $NamedTypes.$Query}.agentActivities |
* | **Path** | `Query.agentActivities(includeArchived)` |
* | **Nullability** | Optional |
*/
readonly includeArchived?: $Scalars.Boolean<_$Context>
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `PaginationOrderBy` |
* | **Parent** | {@link $NamedTypes.$Query}.agentActivities |
* | **Path** | `Query.agentActivities(orderBy)` |
* | **Nullability** | Optional |
*/
readonly $orderBy?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PaginationOrderBy | null | undefined>
}

/**
* This is the "expanded" version of the `agentActivities` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}


export type agentActivity<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = agentActivity.$SelectionSet<_$Context>

export namespace agentActivity {
export interface $SelectionSet<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.Base, $Named.AgentActivity<_$Context> {
/**
* Arguments for `agentActivity` field. All arguments are required so you must include this.
*/
readonly $: $Arguments<_$Context>
}

export interface $Arguments<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the agent activity to retrieve.
*
* # Info
*
* | | |
* | - | - |
* | **GraphQL Type** | `String!` |
* | **Parent** | {@link $NamedTypes.$Query}.agentActivity |
* | **Path** | `Query.agentActivity(id)` |
* | **Nullability** | Required |
*/
readonly id: $Scalars.String$NonNull<_$Context>
}

/**
* This is the "expanded" version of the `agentActivity` type. It is identical except for the fact
* that IDEs will display its contents (a union type) directly, rather than the name of this type.
* In some cases, this is a preferable DX, making the types easier to read for users.
*/
export type $Expanded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $$Utilities.Simplify<$SelectionSet<_$Context>>
}

