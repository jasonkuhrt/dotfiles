import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as $Fields from './fields.js'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'

export type * as Mutation from './__.js'

/**
* GraphQL root {@link https://graphql.org/learn/schema/#the-mutation-and-mutation-types | Mutation} type.
*/
export interface Mutation<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.RootObjectLike {

      /**
* Creates a new state, adding it to the workflow of a team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WorkflowStatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.workflowStateCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
workflowStateCreate?: $Fields.workflowStateCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.workflowStateCreate<_$Context>>
/**
* Updates a state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WorkflowStatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.workflowStateUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
workflowStateUpdate?: $Fields.workflowStateUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.workflowStateUpdate<_$Context>>
/**
* Archives a state. Only states with issues that have all been archived can be archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WorkflowStateArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.workflowStateArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
workflowStateArchive?: $Fields.workflowStateArchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.workflowStateArchive<_$Context>>
/**
* Creates a new webhook.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WebhookPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.webhookCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
webhookCreate?: $Fields.webhookCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.webhookCreate<_$Context>>
/**
* Updates an existing Webhook.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WebhookPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.webhookUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
webhookUpdate?: $Fields.webhookUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.webhookUpdate<_$Context>>
/**
* Deletes a Webhook.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.webhookDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
webhookDelete?: $Fields.webhookDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.webhookDelete<_$Context>>
/**
* Rotates the signing secret for a Webhook.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WebhookRotateSecretPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.webhookRotateSecret` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
webhookRotateSecret?: $Fields.webhookRotateSecret<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.webhookRotateSecret<_$Context>>
/**
* Creates a new ViewPreferences object.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ViewPreferencesPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.viewPreferencesCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
viewPreferencesCreate?: $Fields.viewPreferencesCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.viewPreferencesCreate<_$Context>>
/**
* Updates an existing ViewPreferences object.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ViewPreferencesPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.viewPreferencesUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
viewPreferencesUpdate?: $Fields.viewPreferencesUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.viewPreferencesUpdate<_$Context>>
/**
* Deletes a ViewPreferences.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.viewPreferencesDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
viewPreferencesDelete?: $Fields.viewPreferencesDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.viewPreferencesDelete<_$Context>>
/**
* Updates the user's settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserSettingsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.userSettingsUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
userSettingsUpdate?: $Fields.userSettingsUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.userSettingsUpdate<_$Context>>
/**
* Resets user's setting flags.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserSettingsFlagsResetPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.userSettingsFlagsReset` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
userSettingsFlagsReset?: $Fields.userSettingsFlagsReset.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.userSettingsFlagsReset<_$Context>>
/**
* Updates a user's settings flag.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserSettingsFlagPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.userFlagUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
userFlagUpdate?: $Fields.userFlagUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.userFlagUpdate<_$Context>>
/**
* Subscribes to or unsubscribes from a notification category for a given notification channel for the user
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserSettingsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.notificationCategoryChannelSubscriptionUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
notificationCategoryChannelSubscriptionUpdate?: $Fields.notificationCategoryChannelSubscriptionUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.notificationCategoryChannelSubscriptionUpdate<_$Context>>
/**
* Updates a user. Only available to organization admins and the user themselves.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.userUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
userUpdate?: $Fields.userUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.userUpdate<_$Context>>
/**
* Connects the Discord user to this Linear account via OAuth2.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.userDiscordConnect` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
userDiscordConnect?: $Fields.userDiscordConnect<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.userDiscordConnect<_$Context>>
/**
* Disconnects the external user from this Linear account.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.userExternalUserDisconnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
userExternalUserDisconnect?: $Fields.userExternalUserDisconnect<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.userExternalUserDisconnect<_$Context>>
/**
* Changes the role of a user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.userChangeRole` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
userChangeRole?: $Fields.userChangeRole<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.userChangeRole<_$Context>>
/**
* [DEPRECATED] Makes user an admin. Can only be called by an admin or owner.
*
* @deprecated Use userChangeRole instead. This mutation will be removed in a future release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.userPromoteAdmin` |
* | **⚠ Deprecated** | Use userChangeRole instead. This mutation will be removed in a future release. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
userPromoteAdmin?: $Fields.userPromoteAdmin<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.userPromoteAdmin<_$Context>>
/**
* [DEPRECATED] Makes user a regular user. Can only be called by an admin or owner.
*
* @deprecated Use userChangeRole instead. This mutation will be removed in a future release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.userDemoteAdmin` |
* | **⚠ Deprecated** | Use userChangeRole instead. This mutation will be removed in a future release. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
userDemoteAdmin?: $Fields.userDemoteAdmin<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.userDemoteAdmin<_$Context>>
/**
* [DEPRECATED] Makes user a regular user. Can only be called by an admin.
*
* @deprecated Use userChangeRole instead. This mutation will be removed in a future release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.userPromoteMember` |
* | **⚠ Deprecated** | Use userChangeRole instead. This mutation will be removed in a future release. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
userPromoteMember?: $Fields.userPromoteMember<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.userPromoteMember<_$Context>>
/**
* [DEPRECATED] Makes user a guest. Can only be called by an admin.
*
* @deprecated Use userChangeRole instead. This mutation will be removed in a future release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.userDemoteMember` |
* | **⚠ Deprecated** | Use userChangeRole instead. This mutation will be removed in a future release. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
userDemoteMember?: $Fields.userDemoteMember<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.userDemoteMember<_$Context>>
/**
* Suspends a user. Can only be called by an admin or owner.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.userSuspend` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
userSuspend?: $Fields.userSuspend<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.userSuspend<_$Context>>
/**
* Revokes a user's sessions. Can only be called by an admin or owner.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.userRevokeAllSessions` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
userRevokeAllSessions?: $Fields.userRevokeAllSessions<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.userRevokeAllSessions<_$Context>>
/**
* Revokes a specific session for a user. Can only be called by an admin or owner.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.userRevokeSession` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
userRevokeSession?: $Fields.userRevokeSession<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.userRevokeSession<_$Context>>
/**
* Un-suspends a user. Can only be called by an admin or owner.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.userUnsuspend` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
userUnsuspend?: $Fields.userUnsuspend<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.userUnsuspend<_$Context>>
/**
* Unlinks a guest user from their identity provider. Can only be called by an admin when SCIM is enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.userUnlinkFromIdentityProvider` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
userUnlinkFromIdentityProvider?: $Fields.userUnlinkFromIdentityProvider<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.userUnlinkFromIdentityProvider<_$Context>>
/**
* Creates a new triage responsibility.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TriageResponsibilityPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.triageResponsibilityCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
triageResponsibilityCreate?: $Fields.triageResponsibilityCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.triageResponsibilityCreate<_$Context>>
/**
* Updates an existing triage responsibility.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TriageResponsibilityPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.triageResponsibilityUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
triageResponsibilityUpdate?: $Fields.triageResponsibilityUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.triageResponsibilityUpdate<_$Context>>
/**
* Deletes a triage responsibility.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.triageResponsibilityDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
triageResponsibilityDelete?: $Fields.triageResponsibilityDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.triageResponsibilityDelete<_$Context>>
/**
* Creates a new time schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TimeSchedulePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.timeScheduleCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
timeScheduleCreate?: $Fields.timeScheduleCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.timeScheduleCreate<_$Context>>
/**
* Updates a time schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TimeSchedulePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.timeScheduleUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
timeScheduleUpdate?: $Fields.timeScheduleUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.timeScheduleUpdate<_$Context>>
/**
* Upsert an external time schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TimeSchedulePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.timeScheduleUpsertExternal` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
timeScheduleUpsertExternal?: $Fields.timeScheduleUpsertExternal<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.timeScheduleUpsertExternal<_$Context>>
/**
* Deletes a time schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.timeScheduleDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
timeScheduleDelete?: $Fields.timeScheduleDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.timeScheduleDelete<_$Context>>
/**
* Refresh the integration schedule information.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TimeSchedulePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.timeScheduleRefreshIntegrationSchedule` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
timeScheduleRefreshIntegrationSchedule?: $Fields.timeScheduleRefreshIntegrationSchedule<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.timeScheduleRefreshIntegrationSchedule<_$Context>>
/**
* Creates a new template.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TemplatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.templateCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
templateCreate?: $Fields.templateCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.templateCreate<_$Context>>
/**
* Updates an existing template.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TemplatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.templateUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
templateUpdate?: $Fields.templateUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.templateUpdate<_$Context>>
/**
* Deletes a template.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.templateDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
templateDelete?: $Fields.templateDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.templateDelete<_$Context>>
/**
* Creates a new project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectCreate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
projectCreate?: $Fields.projectCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectCreate<_$Context>>
/**
* Updates a project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
projectUpdate?: $Fields.projectUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectUpdate<_$Context>>
/**
* [INTERNAL] Updates all projects currently assigned to to a project status to a new project status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$SuccessPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectReassignStatus` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
projectReassignStatus?: $Fields.projectReassignStatus<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectReassignStatus<_$Context>>
/**
* Deletes (trashes) a project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectDelete?: $Fields.projectDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectDelete<_$Context>>
/**
* Archives a project.
*
* @deprecated Deprecated in favor of projectDelete.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectArchive` |
* | **⚠ Deprecated** | Deprecated in favor of projectDelete. |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
projectArchive?: $Fields.projectArchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectArchive<_$Context>>
/**
* Unarchives a project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectUnarchive?: $Fields.projectUnarchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectUnarchive<_$Context>>
/**
* Adds a label to a project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectAddLabel` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
projectAddLabel?: $Fields.projectAddLabel<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectAddLabel<_$Context>>
/**
* Removes a label from a project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectRemoveLabel` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
projectRemoveLabel?: $Fields.projectRemoveLabel<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectRemoveLabel<_$Context>>
/**
* Disables external sync on a project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectExternalSyncDisable` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
projectExternalSyncDisable?: $Fields.projectExternalSyncDisable<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectExternalSyncDisable<_$Context>>
/**
* Creates a new team. The user who creates the team will automatically be added as a member to the newly created team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TeamPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.teamCreate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
teamCreate?: $Fields.teamCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.teamCreate<_$Context>>
/**
* Updates a team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TeamPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.teamUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
teamUpdate?: $Fields.teamUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.teamUpdate<_$Context>>
/**
* Deletes a team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.teamDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
teamDelete?: $Fields.teamDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.teamDelete<_$Context>>
/**
* Unarchives a team and cancels deletion.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TeamArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.teamUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
teamUnarchive?: $Fields.teamUnarchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.teamUnarchive<_$Context>>
/**
* Deletes team's cycles data
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TeamPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.teamCyclesDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
teamCyclesDelete?: $Fields.teamCyclesDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.teamCyclesDelete<_$Context>>
/**
* Creates a new team membership.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TeamMembershipPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.teamMembershipCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
teamMembershipCreate?: $Fields.teamMembershipCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.teamMembershipCreate<_$Context>>
/**
* Updates a team membership.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TeamMembershipPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.teamMembershipUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
teamMembershipUpdate?: $Fields.teamMembershipUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.teamMembershipUpdate<_$Context>>
/**
* Deletes a team membership.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.teamMembershipDelete` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
teamMembershipDelete?: $Fields.teamMembershipDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.teamMembershipDelete<_$Context>>
/**
* Deletes a previously used team key.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.teamKeyDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
teamKeyDelete?: $Fields.teamKeyDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.teamKeyDelete<_$Context>>
/**
* Creates a new roadmapToProject join.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$RoadmapToProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.roadmapToProjectCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
roadmapToProjectCreate?: $Fields.roadmapToProjectCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.roadmapToProjectCreate<_$Context>>
/**
* Updates a roadmapToProject.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$RoadmapToProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.roadmapToProjectUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
roadmapToProjectUpdate?: $Fields.roadmapToProjectUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.roadmapToProjectUpdate<_$Context>>
/**
* Deletes a roadmapToProject.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.roadmapToProjectDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
roadmapToProjectDelete?: $Fields.roadmapToProjectDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.roadmapToProjectDelete<_$Context>>
/**
* Creates a new roadmap.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$RoadmapPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.roadmapCreate` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
roadmapCreate?: $Fields.roadmapCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.roadmapCreate<_$Context>>
/**
* Updates a roadmap.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$RoadmapPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.roadmapUpdate` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
roadmapUpdate?: $Fields.roadmapUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.roadmapUpdate<_$Context>>
/**
* Archives a roadmap.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$RoadmapArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.roadmapArchive` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
roadmapArchive?: $Fields.roadmapArchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.roadmapArchive<_$Context>>
/**
* Unarchives a roadmap.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$RoadmapArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.roadmapUnarchive` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
roadmapUnarchive?: $Fields.roadmapUnarchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.roadmapUnarchive<_$Context>>
/**
* Deletes a roadmap.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.roadmapDelete` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
roadmapDelete?: $Fields.roadmapDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.roadmapDelete<_$Context>>
/**
* Create CSV export report for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CreateCsvExportReportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.createCsvExportReport` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
createCsvExportReport?: $Fields.createCsvExportReport.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.createCsvExportReport<_$Context>>
/**
* [ALPHA] Creates a new release stage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReleaseStagePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.releaseStageCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
releaseStageCreate?: $Fields.releaseStageCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releaseStageCreate<_$Context>>
/**
* [ALPHA] Updates a release stage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReleaseStagePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.releaseStageUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
releaseStageUpdate?: $Fields.releaseStageUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releaseStageUpdate<_$Context>>
/**
* [ALPHA] Archives a release stage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReleaseStageArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.releaseStageArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
releaseStageArchive?: $Fields.releaseStageArchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releaseStageArchive<_$Context>>
/**
* [ALPHA] Unarchives a release stage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReleaseStageArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.releaseStageUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
releaseStageUnarchive?: $Fields.releaseStageUnarchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releaseStageUnarchive<_$Context>>
/**
* [ALPHA] Syncs release data.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReleasePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.releaseSync` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
releaseSync?: $Fields.releaseSync<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releaseSync<_$Context>>
/**
* [ALPHA] Creates a new release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReleasePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.releaseCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
releaseCreate?: $Fields.releaseCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releaseCreate<_$Context>>
/**
* [ALPHA] Updates a release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReleasePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.releaseUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
releaseUpdate?: $Fields.releaseUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releaseUpdate<_$Context>>
/**
* [ALPHA] Marks a release as completed. If version is provided, completes that specific release; otherwise completes the most recent started release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReleasePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.releaseComplete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
releaseComplete?: $Fields.releaseComplete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releaseComplete<_$Context>>
/**
* [ALPHA] Updates a release by pipeline. If version is provided, updates that specific release; otherwise updates the most recent started release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReleasePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.releaseUpdateByPipeline` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
releaseUpdateByPipeline?: $Fields.releaseUpdateByPipeline<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releaseUpdateByPipeline<_$Context>>
/**
* [ALPHA] Deletes a release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.releaseDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
releaseDelete?: $Fields.releaseDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releaseDelete<_$Context>>
/**
* [ALPHA] Archives a release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReleaseArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.releaseArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
releaseArchive?: $Fields.releaseArchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releaseArchive<_$Context>>
/**
* [ALPHA] Unarchives a release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReleaseArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.releaseUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
releaseUnarchive?: $Fields.releaseUnarchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releaseUnarchive<_$Context>>
/**
* [ALPHA] Creates a new release pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReleasePipelinePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.releasePipelineCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
releasePipelineCreate?: $Fields.releasePipelineCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releasePipelineCreate<_$Context>>
/**
* [ALPHA] Updates a release pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReleasePipelinePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.releasePipelineUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
releasePipelineUpdate?: $Fields.releasePipelineUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releasePipelineUpdate<_$Context>>
/**
* [ALPHA] Archives a release pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReleasePipelineArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.releasePipelineArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
releasePipelineArchive?: $Fields.releasePipelineArchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releasePipelineArchive<_$Context>>
/**
* [ALPHA] Unarchives a release pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReleasePipelineArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.releasePipelineUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
releasePipelineUnarchive?: $Fields.releasePipelineUnarchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releasePipelineUnarchive<_$Context>>
/**
* [ALPHA] Deletes a release pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.releasePipelineDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
releasePipelineDelete?: $Fields.releasePipelineDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releasePipelineDelete<_$Context>>
/**
* Creates a new reaction.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReactionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.reactionCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
reactionCreate?: $Fields.reactionCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.reactionCreate<_$Context>>
/**
* Deletes a reaction.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.reactionDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
reactionDelete?: $Fields.reactionDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.reactionDelete<_$Context>>
/**
* Creates a push subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$PushSubscriptionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.pushSubscriptionCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
pushSubscriptionCreate?: $Fields.pushSubscriptionCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.pushSubscriptionCreate<_$Context>>
/**
* Deletes a push subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$PushSubscriptionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.pushSubscriptionDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
pushSubscriptionDelete?: $Fields.pushSubscriptionDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.pushSubscriptionDelete<_$Context>>
/**
* Creates a new project update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectUpdatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectUpdateCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectUpdateCreate?: $Fields.projectUpdateCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectUpdateCreate<_$Context>>
/**
* Updates a project update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectUpdatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectUpdateUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
projectUpdateUpdate?: $Fields.projectUpdateUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectUpdateUpdate<_$Context>>
/**
* Archives a project update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectUpdateArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectUpdateArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectUpdateArchive?: $Fields.projectUpdateArchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectUpdateArchive<_$Context>>
/**
* Unarchives a project update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectUpdateArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectUpdateUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectUpdateUnarchive?: $Fields.projectUpdateUnarchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectUpdateUnarchive<_$Context>>
/**
* Deletes a project update.
*
* @deprecated Use `projectUpdateArchive` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectUpdateDelete` |
* | **⚠ Deprecated** | Use `projectUpdateArchive` instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectUpdateDelete?: $Fields.projectUpdateDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectUpdateDelete<_$Context>>
/**
* Create a notification to remind a user about a project update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectUpdateReminderPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.createProjectUpdateReminder` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
createProjectUpdateReminder?: $Fields.createProjectUpdateReminder<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.createProjectUpdateReminder<_$Context>>
/**
* Creates a new project status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectStatusPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectStatusCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectStatusCreate?: $Fields.projectStatusCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectStatusCreate<_$Context>>
/**
* Updates a project status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectStatusPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectStatusUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
projectStatusUpdate?: $Fields.projectStatusUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectStatusUpdate<_$Context>>
/**
* Archives a project status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectStatusArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectStatusArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectStatusArchive?: $Fields.projectStatusArchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectStatusArchive<_$Context>>
/**
* Unarchives a project status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectStatusArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectStatusUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectStatusUnarchive?: $Fields.projectStatusUnarchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectStatusUnarchive<_$Context>>
/**
* Creates a new project relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectRelationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectRelationCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectRelationCreate?: $Fields.projectRelationCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectRelationCreate<_$Context>>
/**
* Updates a project relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectRelationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectRelationUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
projectRelationUpdate?: $Fields.projectRelationUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectRelationUpdate<_$Context>>
/**
* Deletes a project relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectRelationDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectRelationDelete?: $Fields.projectRelationDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectRelationDelete<_$Context>>
/**
* Creates a new project milestone.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectMilestonePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectMilestoneCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectMilestoneCreate?: $Fields.projectMilestoneCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectMilestoneCreate<_$Context>>
/**
* Updates a project milestone.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectMilestonePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectMilestoneUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
projectMilestoneUpdate?: $Fields.projectMilestoneUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectMilestoneUpdate<_$Context>>
/**
* Deletes a project milestone.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectMilestoneDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectMilestoneDelete?: $Fields.projectMilestoneDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectMilestoneDelete<_$Context>>
/**
* [Internal] Moves a project milestone to another project, can be called to undo a prior move.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectMilestoneMovePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectMilestoneMove` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
projectMilestoneMove?: $Fields.projectMilestoneMove<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectMilestoneMove<_$Context>>
/**
* Creates a new project label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectLabelCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectLabelCreate?: $Fields.projectLabelCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectLabelCreate<_$Context>>
/**
* Updates a project label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectLabelUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
projectLabelUpdate?: $Fields.projectLabelUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectLabelUpdate<_$Context>>
/**
* Deletes a project label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectLabelDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectLabelDelete?: $Fields.projectLabelDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectLabelDelete<_$Context>>
/**
* Retires a project label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectLabelRetire` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectLabelRetire?: $Fields.projectLabelRetire<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectLabelRetire<_$Context>>
/**
* Restores a project label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.projectLabelRestore` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectLabelRestore?: $Fields.projectLabelRestore<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectLabelRestore<_$Context>>
/**
* Updates the user's organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$OrganizationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.organizationUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
organizationUpdate?: $Fields.organizationUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organizationUpdate<_$Context>>
/**
* Get an organization's delete confirmation token.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$OrganizationDeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.organizationDeleteChallenge` |
* | **Nullability** | Required |
*/
organizationDeleteChallenge?: $Fields.organizationDeleteChallenge.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organizationDeleteChallenge<_$Context>>
/**
* Deletes an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$OrganizationDeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.organizationDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
organizationDelete?: $Fields.organizationDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organizationDelete<_$Context>>
/**
* Cancels the deletion of an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$OrganizationCancelDeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.organizationCancelDelete` |
* | **Nullability** | Required |
*/
organizationCancelDelete?: $Fields.organizationCancelDelete.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organizationCancelDelete<_$Context>>
/**
* Starts a trial for the organization on the specified plan type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$OrganizationStartTrialPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.organizationStartTrialForPlan` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
organizationStartTrialForPlan?: $Fields.organizationStartTrialForPlan<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organizationStartTrialForPlan<_$Context>>
/**
* [DEPRECATED] Starts a trial for the organization.
*
* @deprecated Use organizationStartTrialForPlan
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$OrganizationStartTrialPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.organizationStartTrial` |
* | **⚠ Deprecated** | Use organizationStartTrialForPlan |
* | **Nullability** | Required |
*/
organizationStartTrial?: $Fields.organizationStartTrial.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organizationStartTrial<_$Context>>
/**
* Creates a new organization invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$OrganizationInvitePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.organizationInviteCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
organizationInviteCreate?: $Fields.organizationInviteCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organizationInviteCreate<_$Context>>
/**
* Updates an organization invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$OrganizationInvitePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.organizationInviteUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
organizationInviteUpdate?: $Fields.organizationInviteUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organizationInviteUpdate<_$Context>>
/**
* Re-send an organization invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.resendOrganizationInvite` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
resendOrganizationInvite?: $Fields.resendOrganizationInvite<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.resendOrganizationInvite<_$Context>>
/**
* Re-send an organization invite tied to an email address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.resendOrganizationInviteByEmail` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
resendOrganizationInviteByEmail?: $Fields.resendOrganizationInviteByEmail<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.resendOrganizationInviteByEmail<_$Context>>
/**
* Deletes an organization invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.organizationInviteDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
organizationInviteDelete?: $Fields.organizationInviteDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organizationInviteDelete<_$Context>>
/**
* [INTERNAL] Verifies a domain claim.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$OrganizationDomainSimplePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.organizationDomainClaim` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
organizationDomainClaim?: $Fields.organizationDomainClaim<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organizationDomainClaim<_$Context>>
/**
* [INTERNAL] Verifies a domain to be added to an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$OrganizationDomainPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.organizationDomainVerify` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
organizationDomainVerify?: $Fields.organizationDomainVerify<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organizationDomainVerify<_$Context>>
/**
* [INTERNAL] Adds a domain to be allowed for an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$OrganizationDomainPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.organizationDomainCreate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
organizationDomainCreate?: $Fields.organizationDomainCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organizationDomainCreate<_$Context>>
/**
* [INTERNAL] Updates an organization domain settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$OrganizationDomainPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.organizationDomainUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
organizationDomainUpdate?: $Fields.organizationDomainUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organizationDomainUpdate<_$Context>>
/**
* Deletes a domain.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.organizationDomainDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
organizationDomainDelete?: $Fields.organizationDomainDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organizationDomainDelete<_$Context>>
/**
* Creates a new notification subscription for a cycle, custom view, label, project or team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationSubscriptionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.notificationSubscriptionCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
notificationSubscriptionCreate?: $Fields.notificationSubscriptionCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.notificationSubscriptionCreate<_$Context>>
/**
* Updates a notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationSubscriptionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.notificationSubscriptionUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
notificationSubscriptionUpdate?: $Fields.notificationSubscriptionUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.notificationSubscriptionUpdate<_$Context>>
/**
* Deletes a notification subscription reference.
*
* @deprecated Update `notificationSubscription.active` to `false` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.notificationSubscriptionDelete` |
* | **⚠ Deprecated** | Update `notificationSubscription.active` to `false` instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
notificationSubscriptionDelete?: $Fields.notificationSubscriptionDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.notificationSubscriptionDelete<_$Context>>
/**
* Updates a notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.notificationUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
notificationUpdate?: $Fields.notificationUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.notificationUpdate<_$Context>>
/**
* Marks notification and all related notifications as read.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationBatchActionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.notificationMarkReadAll` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
notificationMarkReadAll?: $Fields.notificationMarkReadAll<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.notificationMarkReadAll<_$Context>>
/**
* Marks notification and all related notifications as unread.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationBatchActionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.notificationMarkUnreadAll` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
notificationMarkUnreadAll?: $Fields.notificationMarkUnreadAll<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.notificationMarkUnreadAll<_$Context>>
/**
* Snoozes a notification and all related notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationBatchActionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.notificationSnoozeAll` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
notificationSnoozeAll?: $Fields.notificationSnoozeAll<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.notificationSnoozeAll<_$Context>>
/**
* Unsnoozes a notification and all related notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationBatchActionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.notificationUnsnoozeAll` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
notificationUnsnoozeAll?: $Fields.notificationUnsnoozeAll<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.notificationUnsnoozeAll<_$Context>>
/**
* Archives a notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.notificationArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
notificationArchive?: $Fields.notificationArchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.notificationArchive<_$Context>>
/**
* Archives a notification and all related notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationBatchActionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.notificationArchiveAll` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
notificationArchiveAll?: $Fields.notificationArchiveAll<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.notificationArchiveAll<_$Context>>
/**
* Unarchives a notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.notificationUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
notificationUnarchive?: $Fields.notificationUnarchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.notificationUnarchive<_$Context>>
/**
* [ALPHA] Creates a new issueToRelease join, adding an issue to a release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueToReleasePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueToReleaseCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
issueToReleaseCreate?: $Fields.issueToReleaseCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueToReleaseCreate<_$Context>>
/**
* [ALPHA] Deletes an issueToRelease by issue and release identifiers
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueToReleaseDeleteByIssueAndRelease` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
issueToReleaseDeleteByIssueAndRelease?: $Fields.issueToReleaseDeleteByIssueAndRelease<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueToReleaseDeleteByIssueAndRelease<_$Context>>
/**
* [ALPHA] Deletes an issueToRelease by its identifier, removing an issue from a release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueToReleaseDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
issueToReleaseDelete?: $Fields.issueToReleaseDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueToReleaseDelete<_$Context>>
/**
* Creates a new issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
issueCreate?: $Fields.issueCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueCreate<_$Context>>
/**
* Creates a list of issues in one transaction.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueBatchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueBatchCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
issueBatchCreate?: $Fields.issueBatchCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueBatchCreate<_$Context>>
/**
* Updates an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
issueUpdate?: $Fields.issueUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueUpdate<_$Context>>
/**
* Updates multiple issues at once.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueBatchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueBatchUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
issueBatchUpdate?: $Fields.issueBatchUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueBatchUpdate<_$Context>>
/**
* Archives an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueArchive` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
issueArchive?: $Fields.issueArchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueArchive<_$Context>>
/**
* Unarchives an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
issueUnarchive?: $Fields.issueUnarchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueUnarchive<_$Context>>
/**
* Deletes (trashes) an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueDelete` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
issueDelete?: $Fields.issueDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueDelete<_$Context>>
/**
* Adds a label to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueAddLabel` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
issueAddLabel?: $Fields.issueAddLabel<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueAddLabel<_$Context>>
/**
* Removes a label from an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueRemoveLabel` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
issueRemoveLabel?: $Fields.issueRemoveLabel<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueRemoveLabel<_$Context>>
/**
* Adds an issue reminder. Will cause a notification to be sent when the issue reminder time is reached.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueReminder` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
issueReminder?: $Fields.issueReminder<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueReminder<_$Context>>
/**
* Subscribes a user to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueSubscribe` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
issueSubscribe?: $Fields.issueSubscribe<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueSubscribe<_$Context>>
/**
* Unsubscribes a user from an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueUnsubscribe` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
issueUnsubscribe?: $Fields.issueUnsubscribe<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueUnsubscribe<_$Context>>
/**
* [INTERNAL] Updates an issue description from the Front app to handle Front attachments correctly.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueDescriptionUpdateFromFront` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
issueDescriptionUpdateFromFront?: $Fields.issueDescriptionUpdateFromFront<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueDescriptionUpdateFromFront<_$Context>>
/**
* Disables external sync on an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueExternalSyncDisable` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
issueExternalSyncDisable?: $Fields.issueExternalSyncDisable<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueExternalSyncDisable<_$Context>>
/**
* Creates a new issue relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueRelationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueRelationCreate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
issueRelationCreate?: $Fields.issueRelationCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueRelationCreate<_$Context>>
/**
* Updates an issue relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueRelationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueRelationUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
issueRelationUpdate?: $Fields.issueRelationUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueRelationUpdate<_$Context>>
/**
* Deletes an issue relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueRelationDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
issueRelationDelete?: $Fields.issueRelationDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueRelationDelete<_$Context>>
/**
* Creates a new label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueLabelCreate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
issueLabelCreate?: $Fields.issueLabelCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueLabelCreate<_$Context>>
/**
* Updates a label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueLabelUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
issueLabelUpdate?: $Fields.issueLabelUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueLabelUpdate<_$Context>>
/**
* Deletes an issue label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueLabelDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
issueLabelDelete?: $Fields.issueLabelDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueLabelDelete<_$Context>>
/**
* Retires a label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueLabelRetire` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
issueLabelRetire?: $Fields.issueLabelRetire<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueLabelRetire<_$Context>>
/**
* Restores a label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueLabelRestore` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
issueLabelRestore?: $Fields.issueLabelRestore<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueLabelRestore<_$Context>>
/**
* Kicks off a GitHub import job.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueImportCreateGithub` |
* | **Nullability** | Required |
* | **Arguments** | 9 |
*/
issueImportCreateGithub?: $Fields.issueImportCreateGithub.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueImportCreateGithub<_$Context>>
/**
* Kicks off a Jira import job.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueImportCreateJira` |
* | **Nullability** | Required |
* | **Arguments** | 11 |
*/
issueImportCreateJira?: $Fields.issueImportCreateJira<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueImportCreateJira<_$Context>>
/**
* Kicks off a Jira import job from a CSV.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueImportCreateCSVJira` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
issueImportCreateCSVJira?: $Fields.issueImportCreateCSVJira<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueImportCreateCSVJira<_$Context>>
/**
* Kicks off a Shortcut (formerly Clubhouse) import job.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueImportCreateClubhouse` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
issueImportCreateClubhouse?: $Fields.issueImportCreateClubhouse<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueImportCreateClubhouse<_$Context>>
/**
* Kicks off an Asana import job.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueImportCreateAsana` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
issueImportCreateAsana?: $Fields.issueImportCreateAsana<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueImportCreateAsana<_$Context>>
/**
* [INTERNAL] Kicks off a Linear to Linear import job.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueImportCreateLinearV2` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
issueImportCreateLinearV2?: $Fields.issueImportCreateLinearV2<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueImportCreateLinearV2<_$Context>>
/**
* Deletes an import job.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueImportDeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueImportDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
issueImportDelete?: $Fields.issueImportDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueImportDelete<_$Context>>
/**
* Kicks off import processing.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueImportProcess` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
issueImportProcess?: $Fields.issueImportProcess<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueImportProcess<_$Context>>
/**
* Updates the mapping for the issue import.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.issueImportUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
issueImportUpdate?: $Fields.issueImportUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueImportUpdate<_$Context>>
/**
* Creates new settings for one or more integrations.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationsSettingsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationsSettingsCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
integrationsSettingsCreate?: $Fields.integrationsSettingsCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationsSettingsCreate<_$Context>>
/**
* Updates settings related to integrations for a project or a team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationsSettingsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationsSettingsUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationsSettingsUpdate?: $Fields.integrationsSettingsUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationsSettingsUpdate<_$Context>>
/**
* Creates a new integrationTemplate join.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationTemplatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationTemplateCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
integrationTemplateCreate?: $Fields.integrationTemplateCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationTemplateCreate<_$Context>>
/**
* Deletes a integrationTemplate.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationTemplateDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
integrationTemplateDelete?: $Fields.integrationTemplateDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationTemplateDelete<_$Context>>
/**
* [INTERNAL] Updates the integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationUpdate?: $Fields.integrationUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationUpdate<_$Context>>
/**
* [INTERNAL] Updates the integration settings.
*
* @deprecated Use integrationUpdate instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationSettingsUpdate` |
* | **⚠ Deprecated** | Use integrationUpdate instead. |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationSettingsUpdate?: $Fields.integrationSettingsUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationSettingsUpdate<_$Context>>
/**
* Generates a webhook for the GitHub commit integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$GitHubCommitIntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationGithubCommitCreate` |
* | **Nullability** | Required |
*/
integrationGithubCommitCreate?: $Fields.integrationGithubCommitCreate.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationGithubCommitCreate<_$Context>>
/**
* Connects the organization with the GitHub App.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationGithubConnect` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
integrationGithubConnect?: $Fields.integrationGithubConnect<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationGithubConnect<_$Context>>
/**
* Connects the organization with the GitHub Import App.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationGithubImportConnect` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationGithubImportConnect?: $Fields.integrationGithubImportConnect<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationGithubImportConnect<_$Context>>
/**
* Refreshes the data for a GitHub import integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationGithubImportRefresh` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
integrationGithubImportRefresh?: $Fields.integrationGithubImportRefresh<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationGithubImportRefresh<_$Context>>
/**
* Connects the organization with a GitHub Enterprise Server.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$GitHubEnterpriseServerPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationGitHubEnterpriseServerConnect` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationGitHubEnterpriseServerConnect?: $Fields.integrationGitHubEnterpriseServerConnect<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationGitHubEnterpriseServerConnect<_$Context>>
/**
* Connects the organization with a GitLab Access Token.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$GitLabIntegrationCreatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationGitlabConnect` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationGitlabConnect?: $Fields.integrationGitlabConnect<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationGitlabConnect<_$Context>>
/**
* Tests connectivity to a self-hosted GitLab instance and clears auth errors if successful.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$GitLabTestConnectionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationGitlabTestConnection` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
integrationGitlabTestConnection?: $Fields.integrationGitlabTestConnection<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationGitlabTestConnection<_$Context>>
/**
* Creates an integration api key for Airbyte to connect with Linear.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.airbyteIntegrationConnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
airbyteIntegrationConnect?: $Fields.airbyteIntegrationConnect<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.airbyteIntegrationConnect<_$Context>>
/**
* [Internal] Connects the Google Calendar to the user to this Linear account via OAuth2.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationGoogleCalendarPersonalConnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
integrationGoogleCalendarPersonalConnect?: $Fields.integrationGoogleCalendarPersonalConnect<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationGoogleCalendarPersonalConnect<_$Context>>
/**
* [INTERNAL] Integrates the organization with LaunchDarkly.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationLaunchDarklyConnect` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
integrationLaunchDarklyConnect?: $Fields.integrationLaunchDarklyConnect<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationLaunchDarklyConnect<_$Context>>
/**
* [INTERNAL] Integrates your personal account with LaunchDarkly.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationLaunchDarklyPersonalConnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
integrationLaunchDarklyPersonalConnect?: $Fields.integrationLaunchDarklyPersonalConnect<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationLaunchDarklyPersonalConnect<_$Context>>
/**
* [INTERNAL] Connects the organization with a Jira Personal Access Token.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.jiraIntegrationConnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
jiraIntegrationConnect?: $Fields.jiraIntegrationConnect<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.jiraIntegrationConnect<_$Context>>
/**
* [INTERNAL] Updates a Jira Integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationJiraUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
integrationJiraUpdate?: $Fields.integrationJiraUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationJiraUpdate<_$Context>>
/**
* Connect your Jira account to Linear.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationJiraPersonal` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationJiraPersonal?: $Fields.integrationJiraPersonal.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationJiraPersonal<_$Context>>
/**
* Connect your GitHub account to Linear.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationGitHubPersonal` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationGitHubPersonal?: $Fields.integrationGitHubPersonal<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationGitHubPersonal<_$Context>>
/**
* Integrates the organization with Intercom.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationIntercom` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
integrationIntercom?: $Fields.integrationIntercom<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationIntercom<_$Context>>
/**
* Disconnects the organization from Intercom.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationIntercomDelete` |
* | **Nullability** | Required |
*/
integrationIntercomDelete?: $Fields.integrationIntercomDelete.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationIntercomDelete<_$Context>>
/**
* [INTERNAL] Refreshes the customer data attributes from the specified integration service.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationCustomerDataAttributesRefresh` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
integrationCustomerDataAttributesRefresh?: $Fields.integrationCustomerDataAttributesRefresh<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationCustomerDataAttributesRefresh<_$Context>>
/**
* [DEPRECATED] Updates settings on the Intercom integration.
*
* @deprecated This mutation is deprecated, please use `integrationSettingsUpdate` instead
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationIntercomSettingsUpdate` |
* | **⚠ Deprecated** | This mutation is deprecated, please use `integrationSettingsUpdate` instead |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
integrationIntercomSettingsUpdate?: $Fields.integrationIntercomSettingsUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationIntercomSettingsUpdate<_$Context>>
/**
* Integrates the organization with Discord.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationDiscord` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationDiscord?: $Fields.integrationDiscord<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationDiscord<_$Context>>
/**
* [INTERNAL] Integrates the organization with Opsgenie.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationOpsgenieConnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
integrationOpsgenieConnect?: $Fields.integrationOpsgenieConnect<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationOpsgenieConnect<_$Context>>
/**
* [INTERNAL] Refresh Opsgenie schedule mappings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationOpsgenieRefreshScheduleMappings` |
* | **Nullability** | Required |
*/
integrationOpsgenieRefreshScheduleMappings?: $Fields.integrationOpsgenieRefreshScheduleMappings.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationOpsgenieRefreshScheduleMappings<_$Context>>
/**
* [INTERNAL] Integrates the organization with PagerDuty.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationPagerDutyConnect` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationPagerDutyConnect?: $Fields.integrationPagerDutyConnect<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationPagerDutyConnect<_$Context>>
/**
* [INTERNAL] Refresh PagerDuty schedule mappings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationPagerDutyRefreshScheduleMappings` |
* | **Nullability** | Required |
*/
integrationPagerDutyRefreshScheduleMappings?: $Fields.integrationPagerDutyRefreshScheduleMappings.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationPagerDutyRefreshScheduleMappings<_$Context>>
/**
* [Internal] Updates existing Slack integration scopes.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.updateIntegrationSlackScopes` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
updateIntegrationSlackScopes?: $Fields.updateIntegrationSlackScopes<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.updateIntegrationSlackScopes<_$Context>>
/**
* Integrates the organization with Slack.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationSlack` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
integrationSlack?: $Fields.integrationSlack<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationSlack<_$Context>>
/**
* Integrates the organization with the Slack Asks app.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationSlackAsks` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationSlackAsks?: $Fields.integrationSlackAsks<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationSlackAsks<_$Context>>
/**
* Updates the Slack team's name in Linear for an existing Slack or Asks integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationSlackWorkspaceNamePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationSlackOrAsksUpdateSlackTeamName` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
integrationSlackOrAsksUpdateSlackTeamName?: $Fields.integrationSlackOrAsksUpdateSlackTeamName<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationSlackOrAsksUpdateSlackTeamName<_$Context>>
/**
* Integrates your personal notifications with Slack.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationSlackPersonal` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationSlackPersonal?: $Fields.integrationSlackPersonal<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationSlackPersonal<_$Context>>
/**
* Connect a Slack channel to Asks.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AsksChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationAsksConnectChannel` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationAsksConnectChannel?: $Fields.integrationAsksConnectChannel<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationAsksConnectChannel<_$Context>>
/**
* Slack integration for team notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$SlackChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationSlackPost` |
* | **Nullability** | Required |
* | **Arguments** | 4 |
*/
integrationSlackPost?: $Fields.integrationSlackPost<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationSlackPost<_$Context>>
/**
* Slack integration for project notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$SlackChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationSlackProjectPost` |
* | **Nullability** | Required |
* | **Arguments** | 4 |
*/
integrationSlackProjectPost?: $Fields.integrationSlackProjectPost<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationSlackProjectPost<_$Context>>
/**
* [Internal] Slack integration for initiative notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$SlackChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationSlackInitiativePost` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
integrationSlackInitiativePost?: $Fields.integrationSlackInitiativePost<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationSlackInitiativePost<_$Context>>
/**
* Slack integration for custom view notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$SlackChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationSlackCustomViewNotifications` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
integrationSlackCustomViewNotifications?: $Fields.integrationSlackCustomViewNotifications<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationSlackCustomViewNotifications<_$Context>>
/**
* Integrates a Slack Asks channel with a Customer.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$SuccessPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationSlackCustomerChannelLink` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
integrationSlackCustomerChannelLink?: $Fields.integrationSlackCustomerChannelLink<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationSlackCustomerChannelLink<_$Context>>
/**
* Slack integration for organization level project update notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$SlackChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationSlackOrgProjectUpdatesPost` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationSlackOrgProjectUpdatesPost?: $Fields.integrationSlackOrgProjectUpdatesPost<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationSlackOrgProjectUpdatesPost<_$Context>>
/**
* [Internal] Slack integration for organization level initiative update notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$SlackChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationSlackOrgInitiativeUpdatesPost` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationSlackOrgInitiativeUpdatesPost?: $Fields.integrationSlackOrgInitiativeUpdatesPost<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationSlackOrgInitiativeUpdatesPost<_$Context>>
/**
* Imports custom emojis from your Slack workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationSlackImportEmojis` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationSlackImportEmojis?: $Fields.integrationSlackImportEmojis<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationSlackImportEmojis<_$Context>>
/**
* Integrates the organization with Figma.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationFigma` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationFigma?: $Fields.integrationFigma<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationFigma<_$Context>>
/**
* Integrates the organization with Gong.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationGong` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationGong?: $Fields.integrationGong<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationGong<_$Context>>
/**
* Integrates the organization with Google Sheets.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationGoogleSheets` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
integrationGoogleSheets?: $Fields.integrationGoogleSheets<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationGoogleSheets<_$Context>>
/**
* Manually update Google Sheets data.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.refreshGoogleSheetsData` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
refreshGoogleSheetsData?: $Fields.refreshGoogleSheetsData<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.refreshGoogleSheetsData<_$Context>>
/**
* Integrates the organization with Sentry.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationSentryConnect` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
integrationSentryConnect?: $Fields.integrationSentryConnect<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationSentryConnect<_$Context>>
/**
* Integrates the organization with Front.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationFront` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationFront?: $Fields.integrationFront<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationFront<_$Context>>
/**
* Integrates the organization with Zendesk.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationZendesk` |
* | **Nullability** | Required |
* | **Arguments** | 4 |
*/
integrationZendesk?: $Fields.integrationZendesk<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationZendesk<_$Context>>
/**
* Enables Loom integration for the organization.
*
* @deprecated Not available.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationLoom` |
* | **⚠ Deprecated** | Not available. |
* | **Nullability** | Required |
*/
integrationLoom?: $Fields.integrationLoom.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationLoom<_$Context>>
/**
* Integrates the organization with Salesforce.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationSalesforce` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
integrationSalesforce?: $Fields.integrationSalesforce<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationSalesforce<_$Context>>
/**
* [INTERNAL] Refreshes the Salesforce integration metadata.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationSalesforceMetadataRefresh` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
integrationSalesforceMetadataRefresh?: $Fields.integrationSalesforceMetadataRefresh<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationSalesforceMetadataRefresh<_$Context>>
/**
* [INTERNAL] Connects the user's personal account with an MCP server.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationMcpServerPersonalConnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
integrationMcpServerPersonalConnect?: $Fields.integrationMcpServerPersonalConnect<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationMcpServerPersonalConnect<_$Context>>
/**
* [INTERNAL] Connects the workspace with an MCP server.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationMcpServerConnect` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationMcpServerConnect?: $Fields.integrationMcpServerConnect<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationMcpServerConnect<_$Context>>
/**
* Deletes an integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationDelete` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationDelete?: $Fields.integrationDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationDelete<_$Context>>
/**
* Archives an integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
integrationArchive?: $Fields.integrationArchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationArchive<_$Context>>
/**
* [Internal] Enables Linear Agent Slack workflow access for a Slack or Slack Asks integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationSlackWorkflowAccessUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationSlackWorkflowAccessUpdate?: $Fields.integrationSlackWorkflowAccessUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationSlackWorkflowAccessUpdate<_$Context>>
/**
* Requests a currently unavailable integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationRequestPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.integrationRequest` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
integrationRequest?: $Fields.integrationRequest<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationRequest<_$Context>>
/**
* Creates a initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativeUpdatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.initiativeUpdateCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
initiativeUpdateCreate?: $Fields.initiativeUpdateCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeUpdateCreate<_$Context>>
/**
* Updates an update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativeUpdatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.initiativeUpdateUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
initiativeUpdateUpdate?: $Fields.initiativeUpdateUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeUpdateUpdate<_$Context>>
/**
* Archives an initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativeUpdateArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.initiativeUpdateArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
initiativeUpdateArchive?: $Fields.initiativeUpdateArchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeUpdateArchive<_$Context>>
/**
* Create a notification to remind a user about an initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativeUpdateReminderPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.createInitiativeUpdateReminder` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
createInitiativeUpdateReminder?: $Fields.createInitiativeUpdateReminder<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.createInitiativeUpdateReminder<_$Context>>
/**
* Unarchives an initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativeUpdateArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.initiativeUpdateUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
initiativeUpdateUnarchive?: $Fields.initiativeUpdateUnarchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeUpdateUnarchive<_$Context>>
/**
* Creates a new initiativeToProject join.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativeToProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.initiativeToProjectCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
initiativeToProjectCreate?: $Fields.initiativeToProjectCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeToProjectCreate<_$Context>>
/**
* Updates a initiativeToProject.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativeToProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.initiativeToProjectUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
initiativeToProjectUpdate?: $Fields.initiativeToProjectUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeToProjectUpdate<_$Context>>
/**
* Deletes a initiativeToProject.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.initiativeToProjectDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
initiativeToProjectDelete?: $Fields.initiativeToProjectDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeToProjectDelete<_$Context>>
/**
* Creates a new initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.initiativeCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
initiativeCreate?: $Fields.initiativeCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeCreate<_$Context>>
/**
* Updates a initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.initiativeUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
initiativeUpdate?: $Fields.initiativeUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeUpdate<_$Context>>
/**
* Archives a initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativeArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.initiativeArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
initiativeArchive?: $Fields.initiativeArchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeArchive<_$Context>>
/**
* Unarchives a initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativeArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.initiativeUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
initiativeUnarchive?: $Fields.initiativeUnarchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeUnarchive<_$Context>>
/**
* Deletes (trashes) an initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.initiativeDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
initiativeDelete?: $Fields.initiativeDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeDelete<_$Context>>
/**
* Creates a new initiative relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativeRelationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.initiativeRelationCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
initiativeRelationCreate?: $Fields.initiativeRelationCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeRelationCreate<_$Context>>
/**
* Updates an initiative relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.initiativeRelationUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
initiativeRelationUpdate?: $Fields.initiativeRelationUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeRelationUpdate<_$Context>>
/**
* Deletes an initiative relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.initiativeRelationDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
initiativeRelationDelete?: $Fields.initiativeRelationDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeRelationDelete<_$Context>>
/**
* Creates a Git target branch automation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$GitAutomationTargetBranchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.gitAutomationTargetBranchCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
gitAutomationTargetBranchCreate?: $Fields.gitAutomationTargetBranchCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.gitAutomationTargetBranchCreate<_$Context>>
/**
* Updates an existing Git target branch automation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$GitAutomationTargetBranchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.gitAutomationTargetBranchUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
gitAutomationTargetBranchUpdate?: $Fields.gitAutomationTargetBranchUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.gitAutomationTargetBranchUpdate<_$Context>>
/**
* Archives a Git target branch automation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.gitAutomationTargetBranchDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
gitAutomationTargetBranchDelete?: $Fields.gitAutomationTargetBranchDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.gitAutomationTargetBranchDelete<_$Context>>
/**
* Creates a new automation state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$GitAutomationStatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.gitAutomationStateCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
gitAutomationStateCreate?: $Fields.gitAutomationStateCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.gitAutomationStateCreate<_$Context>>
/**
* Updates an existing state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$GitAutomationStatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.gitAutomationStateUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
gitAutomationStateUpdate?: $Fields.gitAutomationStateUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.gitAutomationStateUpdate<_$Context>>
/**
* Archives an automation state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.gitAutomationStateDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
gitAutomationStateDelete?: $Fields.gitAutomationStateDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.gitAutomationStateDelete<_$Context>>
/**
* XHR request payload to upload an images, video and other attachments directly to Linear's cloud storage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UploadPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.fileUpload` |
* | **Nullability** | Required |
* | **Arguments** | 5 |
*/
fileUpload?: $Fields.fileUpload<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fileUpload<_$Context>>
/**
* XHR request payload to upload a file for import, directly to Linear's cloud storage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UploadPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.importFileUpload` |
* | **Nullability** | Required |
* | **Arguments** | 4 |
*/
importFileUpload?: $Fields.importFileUpload<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.importFileUpload<_$Context>>
/**
* Upload an image from an URL to Linear.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ImageUploadFromUrlPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.imageUploadFromUrl` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
imageUploadFromUrl?: $Fields.imageUploadFromUrl<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.imageUploadFromUrl<_$Context>>
/**
* [INTERNAL] Permanently delete an uploaded file by asset URL. This should be used as a last resort and will break comments and documents that reference the asset.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$FileUploadDeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.fileUploadDangerouslyDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
fileUploadDangerouslyDelete?: $Fields.fileUploadDangerouslyDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fileUploadDangerouslyDelete<_$Context>>
/**
* Creates a new favorite (project, cycle etc).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$FavoritePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.favoriteCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
favoriteCreate?: $Fields.favoriteCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.favoriteCreate<_$Context>>
/**
* Updates a favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$FavoritePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.favoriteUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
favoriteUpdate?: $Fields.favoriteUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.favoriteUpdate<_$Context>>
/**
* Deletes a favorite reference.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.favoriteDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
favoriteDelete?: $Fields.favoriteDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.favoriteDelete<_$Context>>
/**
* Creates a new entity link.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$EntityExternalLinkPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.entityExternalLinkCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
entityExternalLinkCreate?: $Fields.entityExternalLinkCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.entityExternalLinkCreate<_$Context>>
/**
* Updates an entity link.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$EntityExternalLinkPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.entityExternalLinkUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
entityExternalLinkUpdate?: $Fields.entityExternalLinkUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.entityExternalLinkUpdate<_$Context>>
/**
* Deletes an entity link.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.entityExternalLinkDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
entityExternalLinkDelete?: $Fields.entityExternalLinkDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.entityExternalLinkDelete<_$Context>>
/**
* Creates a custom emoji.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$EmojiPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.emojiCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
emojiCreate?: $Fields.emojiCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.emojiCreate<_$Context>>
/**
* Deletes an emoji.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.emojiDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
emojiDelete?: $Fields.emojiDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.emojiDelete<_$Context>>
/**
* Unsubscribes the user from one type of email.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$EmailUnsubscribePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.emailUnsubscribe` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
emailUnsubscribe?: $Fields.emailUnsubscribe<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.emailUnsubscribe<_$Context>>
/**
* Creates a new email intake address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$EmailIntakeAddressPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.emailIntakeAddressCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
emailIntakeAddressCreate?: $Fields.emailIntakeAddressCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.emailIntakeAddressCreate<_$Context>>
/**
* Rotates an existing email intake address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$EmailIntakeAddressPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.emailIntakeAddressRotate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
emailIntakeAddressRotate?: $Fields.emailIntakeAddressRotate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.emailIntakeAddressRotate<_$Context>>
/**
* Updates an existing email intake address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$EmailIntakeAddressPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.emailIntakeAddressUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
emailIntakeAddressUpdate?: $Fields.emailIntakeAddressUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.emailIntakeAddressUpdate<_$Context>>
/**
* Deletes an email intake address object.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.emailIntakeAddressDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
emailIntakeAddressDelete?: $Fields.emailIntakeAddressDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.emailIntakeAddressDelete<_$Context>>
/**
* Creates a new document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DocumentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.documentCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
documentCreate?: $Fields.documentCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.documentCreate<_$Context>>
/**
* Updates a document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DocumentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.documentUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
documentUpdate?: $Fields.documentUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.documentUpdate<_$Context>>
/**
* Deletes (trashes) a document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DocumentArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.documentDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
documentDelete?: $Fields.documentDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.documentDelete<_$Context>>
/**
* Restores a document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DocumentArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.documentUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
documentUnarchive?: $Fields.documentUnarchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.documentUnarchive<_$Context>>
/**
* Creates a new cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CyclePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.cycleCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
cycleCreate?: $Fields.cycleCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.cycleCreate<_$Context>>
/**
* Updates a cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CyclePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.cycleUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
cycleUpdate?: $Fields.cycleUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.cycleUpdate<_$Context>>
/**
* Archives a cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CycleArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.cycleArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
cycleArchive?: $Fields.cycleArchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.cycleArchive<_$Context>>
/**
* Shifts all cycles starts and ends by a certain number of days, starting from the provided cycle onwards.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CyclePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.cycleShiftAll` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
cycleShiftAll?: $Fields.cycleShiftAll<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.cycleShiftAll<_$Context>>
/**
* Shifts all cycles starts and ends by a certain number of days, starting from the provided cycle onwards.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CyclePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.cycleStartUpcomingCycleToday` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
cycleStartUpcomingCycleToday?: $Fields.cycleStartUpcomingCycleToday<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.cycleStartUpcomingCycleToday<_$Context>>
/**
* Creates a new customer tier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerTierPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customerTierCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
customerTierCreate?: $Fields.customerTierCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerTierCreate<_$Context>>
/**
* Updates a customer tier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerTierPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customerTierUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
customerTierUpdate?: $Fields.customerTierUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerTierUpdate<_$Context>>
/**
* Deletes a customer tier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customerTierDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
customerTierDelete?: $Fields.customerTierDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerTierDelete<_$Context>>
/**
* Creates a new customer status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerStatusPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customerStatusCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
customerStatusCreate?: $Fields.customerStatusCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerStatusCreate<_$Context>>
/**
* Updates a customer status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerStatusPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customerStatusUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
customerStatusUpdate?: $Fields.customerStatusUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerStatusUpdate<_$Context>>
/**
* Deletes a customer status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customerStatusDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
customerStatusDelete?: $Fields.customerStatusDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerStatusDelete<_$Context>>
/**
* Creates a new customer.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customerCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
customerCreate?: $Fields.customerCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerCreate<_$Context>>
/**
* Updates a customer
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customerUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
customerUpdate?: $Fields.customerUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerUpdate<_$Context>>
/**
* Deletes a customer.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customerDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
customerDelete?: $Fields.customerDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerDelete<_$Context>>
/**
* Merges two customers.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customerMerge` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
customerMerge?: $Fields.customerMerge<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerMerge<_$Context>>
/**
* Upserts a customer, creating it if it doesn't exists, updating it otherwise. Matches against an existing customer with `id` or `externalId`
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customerUpsert` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
customerUpsert?: $Fields.customerUpsert<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerUpsert<_$Context>>
/**
* Unsyncs a managed customer from the its current data source. External IDs mapping to the external source will be cleared.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customerUnsync` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
customerUnsync?: $Fields.customerUnsync<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerUnsync<_$Context>>
/**
* Creates a new customer need.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerNeedPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customerNeedCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
customerNeedCreate?: $Fields.customerNeedCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerNeedCreate<_$Context>>
/**
* Creates a new customer need out of an attachment
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerNeedPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customerNeedCreateFromAttachment` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
customerNeedCreateFromAttachment?: $Fields.customerNeedCreateFromAttachment<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerNeedCreateFromAttachment<_$Context>>
/**
* Updates a customer need
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerNeedUpdatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customerNeedUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
customerNeedUpdate?: $Fields.customerNeedUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerNeedUpdate<_$Context>>
/**
* Deletes a customer need.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customerNeedDelete` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
customerNeedDelete?: $Fields.customerNeedDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerNeedDelete<_$Context>>
/**
* Archives a customer need.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerNeedArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customerNeedArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
customerNeedArchive?: $Fields.customerNeedArchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerNeedArchive<_$Context>>
/**
* Unarchives a customer need.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerNeedArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customerNeedUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
customerNeedUnarchive?: $Fields.customerNeedUnarchive<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerNeedUnarchive<_$Context>>
/**
* Creates a new custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomViewPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customViewCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
customViewCreate?: $Fields.customViewCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customViewCreate<_$Context>>
/**
* Updates a custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomViewPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customViewUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
customViewUpdate?: $Fields.customViewUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customViewUpdate<_$Context>>
/**
* Deletes a custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.customViewDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
customViewDelete?: $Fields.customViewDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customViewDelete<_$Context>>
/**
* Saves user message.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ContactPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.contactCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
contactCreate?: $Fields.contactCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.contactCreate<_$Context>>
/**
* [INTERNAL] Saves sales pricing inquiry to Front.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ContactPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.contactSalesCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
contactSalesCreate?: $Fields.contactSalesCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.contactSalesCreate<_$Context>>
/**
* Creates a new comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CommentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.commentCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
commentCreate?: $Fields.commentCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.commentCreate<_$Context>>
/**
* Updates a comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CommentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.commentUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
commentUpdate?: $Fields.commentUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.commentUpdate<_$Context>>
/**
* Deletes a comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.commentDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
commentDelete?: $Fields.commentDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.commentDelete<_$Context>>
/**
* Resolves a comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CommentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.commentResolve` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
commentResolve?: $Fields.commentResolve<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.commentResolve<_$Context>>
/**
* Unresolves a comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CommentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.commentUnresolve` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
commentUnresolve?: $Fields.commentUnresolve<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.commentUnresolve<_$Context>>
/**
* Finds or creates a new user account by email and sends an email with token.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$EmailUserAccountAuthChallengeResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.emailUserAccountAuthChallenge` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
emailUserAccountAuthChallenge?: $Fields.emailUserAccountAuthChallenge<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.emailUserAccountAuthChallenge<_$Context>>
/**
* Authenticates a user account via email and authentication token.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AuthResolverResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.emailTokenUserAccountAuth` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
emailTokenUserAccountAuth?: $Fields.emailTokenUserAccountAuth<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.emailTokenUserAccountAuth<_$Context>>
/**
* Authenticates a user account via email and authentication token for SAML.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AuthResolverResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.samlTokenUserAccountAuth` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
samlTokenUserAccountAuth?: $Fields.samlTokenUserAccountAuth<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.samlTokenUserAccountAuth<_$Context>>
/**
* Authenticate user account through Google OAuth. This is the 2nd step of OAuth flow.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AuthResolverResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.googleUserAccountAuth` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
googleUserAccountAuth?: $Fields.googleUserAccountAuth<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.googleUserAccountAuth<_$Context>>
/**
* [INTERNAL] Starts passkey login process.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$PasskeyLoginStartResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.passkeyLoginStart` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
passkeyLoginStart?: $Fields.passkeyLoginStart<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.passkeyLoginStart<_$Context>>
/**
* [INTERNAL] Finish passkey login process.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AuthResolverResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.passkeyLoginFinish` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
passkeyLoginFinish?: $Fields.passkeyLoginFinish<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.passkeyLoginFinish<_$Context>>
/**
* Creates an organization from onboarding.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CreateOrJoinOrganizationResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.createOrganizationFromOnboarding` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
createOrganizationFromOnboarding?: $Fields.createOrganizationFromOnboarding<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.createOrganizationFromOnboarding<_$Context>>
/**
* Join an organization from onboarding.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CreateOrJoinOrganizationResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.joinOrganizationFromOnboarding` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
joinOrganizationFromOnboarding?: $Fields.joinOrganizationFromOnboarding<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.joinOrganizationFromOnboarding<_$Context>>
/**
* Leave an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CreateOrJoinOrganizationResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.leaveOrganization` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
leaveOrganization?: $Fields.leaveOrganization<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.leaveOrganization<_$Context>>
/**
* Logout the client.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$LogoutResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.logout` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
logout?: $Fields.logout.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.logout<_$Context>>
/**
* Logout an individual session with its ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$LogoutResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.logoutSession` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
logoutSession?: $Fields.logoutSession<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.logoutSession<_$Context>>
/**
* Logout all of user's sessions including the active one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$LogoutResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.logoutAllSessions` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
logoutAllSessions?: $Fields.logoutAllSessions.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.logoutAllSessions<_$Context>>
/**
* Logout all of user's sessions excluding the current one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$LogoutResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.logoutOtherSessions` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
logoutOtherSessions?: $Fields.logoutOtherSessions.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.logoutOtherSessions<_$Context>>
/**
* Creates a new attachment, or updates existing if the same `url` and `issueId` is used.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.attachmentCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
attachmentCreate?: $Fields.attachmentCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachmentCreate<_$Context>>
/**
* Updates an existing issue attachment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.attachmentUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
attachmentUpdate?: $Fields.attachmentUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachmentUpdate<_$Context>>
/**
* Link any url to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.attachmentLinkURL` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
attachmentLinkURL?: $Fields.attachmentLinkURL<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachmentLinkURL<_$Context>>
/**
* Link an existing GitLab MR to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.attachmentLinkGitLabMR` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
attachmentLinkGitLabMR?: $Fields.attachmentLinkGitLabMR<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachmentLinkGitLabMR<_$Context>>
/**
* Link a GitHub issue to a Linear issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.attachmentLinkGitHubIssue` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
attachmentLinkGitHubIssue?: $Fields.attachmentLinkGitHubIssue<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachmentLinkGitHubIssue<_$Context>>
/**
* Link a GitHub pull request to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.attachmentLinkGitHubPR` |
* | **Nullability** | Required |
* | **Arguments** | 10 |
*/
attachmentLinkGitHubPR?: $Fields.attachmentLinkGitHubPR<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachmentLinkGitHubPR<_$Context>>
/**
* Link an existing Zendesk ticket to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.attachmentLinkZendesk` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
attachmentLinkZendesk?: $Fields.attachmentLinkZendesk<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachmentLinkZendesk<_$Context>>
/**
* Link an existing Discord message to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.attachmentLinkDiscord` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
attachmentLinkDiscord?: $Fields.attachmentLinkDiscord<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachmentLinkDiscord<_$Context>>
/**
* Begin syncing the thread for an existing Slack message attachment with a comment thread on its issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.attachmentSyncToSlack` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
attachmentSyncToSlack?: $Fields.attachmentSyncToSlack<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachmentSyncToSlack<_$Context>>
/**
* Link an existing Slack message to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.attachmentLinkSlack` |
* | **Nullability** | Required |
* | **Arguments** | 10 |
*/
attachmentLinkSlack?: $Fields.attachmentLinkSlack<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachmentLinkSlack<_$Context>>
/**
* Link an existing Front conversation to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$FrontAttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.attachmentLinkFront` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
attachmentLinkFront?: $Fields.attachmentLinkFront<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachmentLinkFront<_$Context>>
/**
* Link an existing Intercom conversation to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.attachmentLinkIntercom` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
attachmentLinkIntercom?: $Fields.attachmentLinkIntercom<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachmentLinkIntercom<_$Context>>
/**
* Link an existing Jira issue to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.attachmentLinkJiraIssue` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
attachmentLinkJiraIssue?: $Fields.attachmentLinkJiraIssue<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachmentLinkJiraIssue<_$Context>>
/**
* Link an existing Salesforce case to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.attachmentLinkSalesforce` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
attachmentLinkSalesforce?: $Fields.attachmentLinkSalesforce<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachmentLinkSalesforce<_$Context>>
/**
* Deletes an issue attachment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.attachmentDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
attachmentDelete?: $Fields.attachmentDelete<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachmentDelete<_$Context>>
/**
* Creates a new agent session on a rootcomment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AgentSessionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.agentSessionCreateOnComment` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
agentSessionCreateOnComment?: $Fields.agentSessionCreateOnComment<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.agentSessionCreateOnComment<_$Context>>
/**
* Creates a new agent session on an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AgentSessionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.agentSessionCreateOnIssue` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
agentSessionCreateOnIssue?: $Fields.agentSessionCreateOnIssue<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.agentSessionCreateOnIssue<_$Context>>
/**
* [Internal] Creates a new agent session on behalf of the current user
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AgentSessionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.agentSessionCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
agentSessionCreate?: $Fields.agentSessionCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.agentSessionCreate<_$Context>>
/**
* Updates the externalUrl of an agent session, which is an agent-hosted page associated with this session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AgentSessionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.agentSessionUpdateExternalUrl` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
agentSessionUpdateExternalUrl?: $Fields.agentSessionUpdateExternalUrl<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.agentSessionUpdateExternalUrl<_$Context>>
/**
* Updates an agent session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AgentSessionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.agentSessionUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
agentSessionUpdate?: $Fields.agentSessionUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.agentSessionUpdate<_$Context>>
/**
* Creates an agent activity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AgentActivityPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.agentActivityCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
agentActivityCreate?: $Fields.agentActivityCreate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.agentActivityCreate<_$Context>>
/**
* [Internal] Creates a prompt agent activity from Linear user input.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AgentActivityPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Mutation} |
* | **Path** | `Mutation.agentActivityCreatePrompt` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
agentActivityCreatePrompt?: $Fields.agentActivityCreatePrompt<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.agentActivityCreatePrompt<_$Context>>
      
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