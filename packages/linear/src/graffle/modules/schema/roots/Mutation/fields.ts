import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"Mutation"`
*
* {@link https://graphql.org/learn/queries/#meta-fields | GraphQL __typename documentation}
*/
export interface __typename {
kind: "OutputField",
name: "__typename",
arguments: {},
inlineType: [1],
namedType: {
kind: "__typename",
value: "Mutation"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new state, adding it to the workflow of a team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowStatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.workflowStateCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface workflowStateCreate {
kind: "OutputField",
name: "workflowStateCreate",
arguments: {
/**
* The state to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.WorkflowStateCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.WorkflowStatePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowStatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.workflowStateUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface workflowStateUpdate {
kind: "OutputField",
name: "workflowStateUpdate",
arguments: {
/**
* A partial state object to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.WorkflowStateUpdateInput
},
/**
* The identifier of the state to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.WorkflowStatePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Archives a state. Only states with issues that have all been archived can be archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowStateArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.workflowStateArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface workflowStateArchive {
kind: "OutputField",
name: "workflowStateArchive",
arguments: {
/**
* The identifier of the state to archive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.WorkflowStateArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new webhook.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WebhookPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.webhookCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface webhookCreate {
kind: "OutputField",
name: "webhookCreate",
arguments: {
/**
* The webhook object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.WebhookCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.WebhookPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates an existing Webhook.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WebhookPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.webhookUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface webhookUpdate {
kind: "OutputField",
name: "webhookUpdate",
arguments: {
/**
* The properties of the Webhook.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.WebhookUpdateInput
},
/**
* The identifier of the Webhook.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.WebhookPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a Webhook.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.webhookDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface webhookDelete {
kind: "OutputField",
name: "webhookDelete",
arguments: {
/**
* The identifier of the Webhook to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Rotates the signing secret for a Webhook.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WebhookRotateSecretPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.webhookRotateSecret` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface webhookRotateSecret {
kind: "OutputField",
name: "webhookRotateSecret",
arguments: {
/**
* The identifier of the Webhook to rotate the secret for.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.WebhookRotateSecretPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new ViewPreferences object.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ViewPreferencesPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.viewPreferencesCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface viewPreferencesCreate {
kind: "OutputField",
name: "viewPreferencesCreate",
arguments: {
/**
* The ViewPreferences object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ViewPreferencesCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.ViewPreferencesPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates an existing ViewPreferences object.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ViewPreferencesPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.viewPreferencesUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface viewPreferencesUpdate {
kind: "OutputField",
name: "viewPreferencesUpdate",
arguments: {
/**
* The properties of the view preferences.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ViewPreferencesUpdateInput
},
/**
* The identifier of the ViewPreferences object.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ViewPreferencesPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a ViewPreferences.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.viewPreferencesDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface viewPreferencesDelete {
kind: "OutputField",
name: "viewPreferencesDelete",
arguments: {
/**
* The identifier of the ViewPreferences to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates the user's settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserSettingsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userSettingsUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface userSettingsUpdate {
kind: "OutputField",
name: "userSettingsUpdate",
arguments: {
/**
* A partial notification object to update the settings with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.UserSettingsUpdateInput
},
/**
* The identifier of the userSettings to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.UserSettingsPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Resets user's setting flags.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserSettingsFlagsResetPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userSettingsFlagsReset` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface userSettingsFlagsReset {
kind: "OutputField",
name: "userSettingsFlagsReset",
arguments: {
/**
* The flags to reset. If not provided all flags will be reset.
*/
flags: {
kind: "InputField",
name: "flags",
inlineType: [0, [1, ]],
namedType: $Schema.UserFlagType
}
},
inlineType: [1, ],
namedType: $Schema.UserSettingsFlagsResetPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a user's settings flag.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserSettingsFlagPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userFlagUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface userFlagUpdate {
kind: "OutputField",
name: "userFlagUpdate",
arguments: {
/**
* Flag operation to perform.
*/
operation: {
kind: "InputField",
name: "operation",
inlineType: [1, ],
namedType: $Schema.UserFlagUpdateOperation
},
/**
* Settings flag to increment.
*/
flag: {
kind: "InputField",
name: "flag",
inlineType: [1, ],
namedType: $Schema.UserFlagType
}
},
inlineType: [1, ],
namedType: $Schema.UserSettingsFlagPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Subscribes to or unsubscribes from a notification category for a given notification channel for the user
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserSettingsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationCategoryChannelSubscriptionUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
export interface notificationCategoryChannelSubscriptionUpdate {
kind: "OutputField",
name: "notificationCategoryChannelSubscriptionUpdate",
arguments: {
/**
* The notification channel in which to subscribe to or unsubscribe from the category
*/
channel: {
kind: "InputField",
name: "channel",
inlineType: [1, ],
namedType: $Schema.NotificationChannel
},
/**
* The notification category to subscribe to or unsubscribe from
*/
category: {
kind: "InputField",
name: "category",
inlineType: [1, ],
namedType: $Schema.NotificationCategory
},
/**
* True if the user wants to subscribe, false if the user wants to unsubscribe
*/
subscribe: {
kind: "InputField",
name: "subscribe",
inlineType: [1, ],
namedType: $Schema.Boolean
}
},
inlineType: [1, ],
namedType: $Schema.UserSettingsPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a user. Only available to organization admins and the user themselves.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface userUpdate {
kind: "OutputField",
name: "userUpdate",
arguments: {
/**
* A partial user object to update the user with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.UserUpdateInput
},
/**
* The identifier of the user to update. Use `me` to reference currently authenticated user.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.UserPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Connects the Discord user to this Linear account via OAuth2.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userDiscordConnect` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface userDiscordConnect {
kind: "OutputField",
name: "userDiscordConnect",
arguments: {
/**
* The Discord OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Discord OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.UserPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Disconnects the external user from this Linear account.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userExternalUserDisconnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface userExternalUserDisconnect {
kind: "OutputField",
name: "userExternalUserDisconnect",
arguments: {
/**
* The external service to disconnect.
*/
service: {
kind: "InputField",
name: "service",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.UserPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Changes the role of a user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userChangeRole` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface userChangeRole {
kind: "OutputField",
name: "userChangeRole",
arguments: {
/**
* The new role for the user.
*/
role: {
kind: "InputField",
name: "role",
inlineType: [1, ],
namedType: $Schema.UserRoleType
},
/**
* The identifier of the user
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.UserAdminPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [DEPRECATED] Makes user an admin. Can only be called by an admin or owner.
*
* @deprecated Use userChangeRole instead. This mutation will be removed in a future release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userPromoteAdmin` |
* | **⚠ Deprecated** | Use userChangeRole instead. This mutation will be removed in a future release. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface userPromoteAdmin {
kind: "OutputField",
name: "userPromoteAdmin",
arguments: {
/**
* The identifier of the user to make an admin.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.UserAdminPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [DEPRECATED] Makes user a regular user. Can only be called by an admin or owner.
*
* @deprecated Use userChangeRole instead. This mutation will be removed in a future release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userDemoteAdmin` |
* | **⚠ Deprecated** | Use userChangeRole instead. This mutation will be removed in a future release. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface userDemoteAdmin {
kind: "OutputField",
name: "userDemoteAdmin",
arguments: {
/**
* The identifier of the user to make a regular user.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.UserAdminPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [DEPRECATED] Makes user a regular user. Can only be called by an admin.
*
* @deprecated Use userChangeRole instead. This mutation will be removed in a future release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userPromoteMember` |
* | **⚠ Deprecated** | Use userChangeRole instead. This mutation will be removed in a future release. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface userPromoteMember {
kind: "OutputField",
name: "userPromoteMember",
arguments: {
/**
* The identifier of the user to make a regular user.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.UserAdminPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [DEPRECATED] Makes user a guest. Can only be called by an admin.
*
* @deprecated Use userChangeRole instead. This mutation will be removed in a future release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userDemoteMember` |
* | **⚠ Deprecated** | Use userChangeRole instead. This mutation will be removed in a future release. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface userDemoteMember {
kind: "OutputField",
name: "userDemoteMember",
arguments: {
/**
* The identifier of the user to make a guest.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.UserAdminPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Suspends a user. Can only be called by an admin or owner.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userSuspend` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface userSuspend {
kind: "OutputField",
name: "userSuspend",
arguments: {
/**
* The identifier of the user to suspend.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.UserAdminPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Revokes a user's sessions. Can only be called by an admin or owner.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userRevokeAllSessions` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface userRevokeAllSessions {
kind: "OutputField",
name: "userRevokeAllSessions",
arguments: {
/**
* The identifier of the user to logout all sessions of.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.UserAdminPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Revokes a specific session for a user. Can only be called by an admin or owner.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userRevokeSession` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface userRevokeSession {
kind: "OutputField",
name: "userRevokeSession",
arguments: {
/**
* The identifier of the session to revoke.
*/
sessionId: {
kind: "InputField",
name: "sessionId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The identifier of the user whose session to revoke.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.UserAdminPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Un-suspends a user. Can only be called by an admin or owner.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userUnsuspend` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface userUnsuspend {
kind: "OutputField",
name: "userUnsuspend",
arguments: {
/**
* The identifier of the user to unsuspend.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.UserAdminPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Unlinks a guest user from their identity provider. Can only be called by an admin when SCIM is enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userUnlinkFromIdentityProvider` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface userUnlinkFromIdentityProvider {
kind: "OutputField",
name: "userUnlinkFromIdentityProvider",
arguments: {
/**
* The identifier of the guest user to unlink from their identity provider.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.UserAdminPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new triage responsibility.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TriageResponsibilityPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.triageResponsibilityCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface triageResponsibilityCreate {
kind: "OutputField",
name: "triageResponsibilityCreate",
arguments: {
/**
* The properties of the triage responsibility to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.TriageResponsibilityCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.TriageResponsibilityPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates an existing triage responsibility.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TriageResponsibilityPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.triageResponsibilityUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface triageResponsibilityUpdate {
kind: "OutputField",
name: "triageResponsibilityUpdate",
arguments: {
/**
* The properties of the triage responsibility to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.TriageResponsibilityUpdateInput
},
/**
* The identifier of the triage responsibility to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.TriageResponsibilityPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a triage responsibility.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.triageResponsibilityDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface triageResponsibilityDelete {
kind: "OutputField",
name: "triageResponsibilityDelete",
arguments: {
/**
* The identifier of the triage responsibility to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new time schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimeSchedulePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.timeScheduleCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface timeScheduleCreate {
kind: "OutputField",
name: "timeScheduleCreate",
arguments: {
/**
* The properties of the time schedule to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.TimeScheduleCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.TimeSchedulePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a time schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimeSchedulePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.timeScheduleUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface timeScheduleUpdate {
kind: "OutputField",
name: "timeScheduleUpdate",
arguments: {
/**
* The properties of the time schedule to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.TimeScheduleUpdateInput
},
/**
* The identifier of the time schedule to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.TimeSchedulePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Upsert an external time schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimeSchedulePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.timeScheduleUpsertExternal` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface timeScheduleUpsertExternal {
kind: "OutputField",
name: "timeScheduleUpsertExternal",
arguments: {
/**
* The properties of the time schedule to insert or update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.TimeScheduleUpdateInput
},
/**
* The unique identifier of the external schedule.
*/
externalId: {
kind: "InputField",
name: "externalId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.TimeSchedulePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a time schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.timeScheduleDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface timeScheduleDelete {
kind: "OutputField",
name: "timeScheduleDelete",
arguments: {
/**
* The identifier of the time schedule to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Refresh the integration schedule information.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimeSchedulePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.timeScheduleRefreshIntegrationSchedule` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface timeScheduleRefreshIntegrationSchedule {
kind: "OutputField",
name: "timeScheduleRefreshIntegrationSchedule",
arguments: {
/**
* The identifier of the time schedule to refresh.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.TimeSchedulePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new template.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TemplatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.templateCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface templateCreate {
kind: "OutputField",
name: "templateCreate",
arguments: {
/**
* The template object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.TemplateCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.TemplatePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates an existing template.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TemplatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.templateUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface templateUpdate {
kind: "OutputField",
name: "templateUpdate",
arguments: {
/**
* The properties of the template to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.TemplateUpdateInput
},
/**
* The identifier of the template.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.TemplatePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a template.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.templateDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface templateDelete {
kind: "OutputField",
name: "templateDelete",
arguments: {
/**
* The identifier of the template to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectCreate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface projectCreate {
kind: "OutputField",
name: "projectCreate",
arguments: {
/**
* Whether to connect a Slack channel to the project.
*/
connectSlackChannel: {
kind: "InputField",
name: "connectSlackChannel",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* The issue object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ProjectCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.ProjectPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface projectUpdate {
kind: "OutputField",
name: "projectUpdate",
arguments: {
/**
* A partial project object to update the project with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ProjectUpdateInput
},
/**
* The identifier of the project to update. Also the identifier from the URL is accepted.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Updates all projects currently assigned to to a project status to a new project status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SuccessPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectReassignStatus` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface projectReassignStatus {
kind: "OutputField",
name: "projectReassignStatus",
arguments: {
/**
* The identifier of the new project status to update the projects to.
*/
newProjectStatusId: {
kind: "InputField",
name: "newProjectStatusId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The identifier of the project status with which projects will be updated.
*/
originalProjectStatusId: {
kind: "InputField",
name: "originalProjectStatusId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.SuccessPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes (trashes) a project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectDelete {
kind: "OutputField",
name: "projectDelete",
arguments: {
/**
* The identifier of the project to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Archives a project.
*
* @deprecated Deprecated in favor of projectDelete.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectArchive` |
* | **⚠ Deprecated** | Deprecated in favor of projectDelete. |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface projectArchive {
kind: "OutputField",
name: "projectArchive",
arguments: {
/**
* Whether to trash the project.
*/
trash: {
kind: "InputField",
name: "trash",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* The identifier of the project to archive. Also the identifier from the URL is accepted.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Unarchives a project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectUnarchive {
kind: "OutputField",
name: "projectUnarchive",
arguments: {
/**
* The identifier of the project to restore. Also the identifier from the URL is accepted.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Adds a label to a project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectAddLabel` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface projectAddLabel {
kind: "OutputField",
name: "projectAddLabel",
arguments: {
/**
* The identifier of the label to add.
*/
labelId: {
kind: "InputField",
name: "labelId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The identifier of the project to add the label to.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Removes a label from a project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectRemoveLabel` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface projectRemoveLabel {
kind: "OutputField",
name: "projectRemoveLabel",
arguments: {
/**
* The identifier of the label to remove.
*/
labelId: {
kind: "InputField",
name: "labelId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The identifier of the project to remove the label from.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Disables external sync on a project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectExternalSyncDisable` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface projectExternalSyncDisable {
kind: "OutputField",
name: "projectExternalSyncDisable",
arguments: {
/**
* The source of the external sync to disable.
*/
syncSource: {
kind: "InputField",
name: "syncSource",
inlineType: [1, ],
namedType: $Schema.ExternalSyncService
},
/**
* The ID of the project to disable external sync for.
*/
projectId: {
kind: "InputField",
name: "projectId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new team. The user who creates the team will automatically be added as a member to the newly created team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.teamCreate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface teamCreate {
kind: "OutputField",
name: "teamCreate",
arguments: {
/**
* The team id to copy settings from, if any.
*/
copySettingsFromTeamId: {
kind: "InputField",
name: "copySettingsFromTeamId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The team object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.TeamCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.TeamPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.teamUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
export interface teamUpdate {
kind: "OutputField",
name: "teamUpdate",
arguments: {
/**
* [INTERNAL] Mapping of existing team entities to those inherited from the parent team
*/
mapping: {
kind: "InputField",
name: "mapping",
inlineType: [0, ],
namedType: $Schema.InheritanceEntityMapping
},
/**
* A partial team object to update the team with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.TeamUpdateInput
},
/**
* The identifier of the team to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.TeamPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.teamDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface teamDelete {
kind: "OutputField",
name: "teamDelete",
arguments: {
/**
* The identifier of the team to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Unarchives a team and cancels deletion.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.teamUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface teamUnarchive {
kind: "OutputField",
name: "teamUnarchive",
arguments: {
/**
* The identifier of the team to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.TeamArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes team's cycles data
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.teamCyclesDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface teamCyclesDelete {
kind: "OutputField",
name: "teamCyclesDelete",
arguments: {
/**
* The identifier of the team, which cycles will be deleted.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.TeamPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new team membership.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamMembershipPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.teamMembershipCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface teamMembershipCreate {
kind: "OutputField",
name: "teamMembershipCreate",
arguments: {
/**
* The team membership object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.TeamMembershipCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.TeamMembershipPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a team membership.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamMembershipPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.teamMembershipUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface teamMembershipUpdate {
kind: "OutputField",
name: "teamMembershipUpdate",
arguments: {
/**
* A partial team membership object to update the team membership with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.TeamMembershipUpdateInput
},
/**
* The identifier of the team membership to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.TeamMembershipPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a team membership.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.teamMembershipDelete` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface teamMembershipDelete {
kind: "OutputField",
name: "teamMembershipDelete",
arguments: {
/**
* Whether to leave the parent teams.
*/
alsoLeaveParentTeams: {
kind: "InputField",
name: "alsoLeaveParentTeams",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* The identifier of the team membership to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a previously used team key.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.teamKeyDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface teamKeyDelete {
kind: "OutputField",
name: "teamKeyDelete",
arguments: {
/**
* The identifier of the team key to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new roadmapToProject join.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapToProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.roadmapToProjectCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface roadmapToProjectCreate {
kind: "OutputField",
name: "roadmapToProjectCreate",
arguments: {
/**
* The properties of the roadmapToProject to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.RoadmapToProjectCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.RoadmapToProjectPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a roadmapToProject.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapToProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.roadmapToProjectUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface roadmapToProjectUpdate {
kind: "OutputField",
name: "roadmapToProjectUpdate",
arguments: {
/**
* The properties of the roadmapToProject to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.RoadmapToProjectUpdateInput
},
/**
* The identifier of the roadmapToProject to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.RoadmapToProjectPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a roadmapToProject.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.roadmapToProjectDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface roadmapToProjectDelete {
kind: "OutputField",
name: "roadmapToProjectDelete",
arguments: {
/**
* The identifier of the roadmapToProject to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new roadmap.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.roadmapCreate` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface roadmapCreate {
kind: "OutputField",
name: "roadmapCreate",
arguments: {
/**
* The properties of the roadmap to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.RoadmapCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.RoadmapPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a roadmap.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.roadmapUpdate` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface roadmapUpdate {
kind: "OutputField",
name: "roadmapUpdate",
arguments: {
/**
* The properties of the roadmap to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.RoadmapUpdateInput
},
/**
* The identifier of the roadmap to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.RoadmapPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Archives a roadmap.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.roadmapArchive` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface roadmapArchive {
kind: "OutputField",
name: "roadmapArchive",
arguments: {
/**
* The identifier of the roadmap to archive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.RoadmapArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Unarchives a roadmap.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.roadmapUnarchive` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface roadmapUnarchive {
kind: "OutputField",
name: "roadmapUnarchive",
arguments: {
/**
* The identifier of the roadmap to unarchive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.RoadmapArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a roadmap.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.roadmapDelete` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface roadmapDelete {
kind: "OutputField",
name: "roadmapDelete",
arguments: {
/**
* The identifier of the roadmap to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Create CSV export report for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CreateCsvExportReportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.createCsvExportReport` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface createCsvExportReport {
kind: "OutputField",
name: "createCsvExportReport",
arguments: {
includePrivateTeamIds: {
kind: "InputField",
name: "includePrivateTeamIds",
inlineType: [0, [1, ]],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CreateCsvExportReportPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [ALPHA] Creates a new release stage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseStagePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseStageCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface releaseStageCreate {
kind: "OutputField",
name: "releaseStageCreate",
arguments: {
/**
* The ReleaseStage object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ReleaseStageCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.ReleaseStagePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [ALPHA] Updates a release stage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseStagePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseStageUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface releaseStageUpdate {
kind: "OutputField",
name: "releaseStageUpdate",
arguments: {
/**
* A partial ReleaseStage object to update the ReleaseStage with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ReleaseStageUpdateInput
},
/**
* The identifier of the release stage to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ReleaseStagePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [ALPHA] Archives a release stage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseStageArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseStageArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface releaseStageArchive {
kind: "OutputField",
name: "releaseStageArchive",
arguments: {
/**
* The identifier of the release stage to archive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ReleaseStageArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [ALPHA] Unarchives a release stage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseStageArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseStageUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface releaseStageUnarchive {
kind: "OutputField",
name: "releaseStageUnarchive",
arguments: {
/**
* The identifier of the release stage to unarchive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ReleaseStageArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [ALPHA] Syncs release data.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseSync` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface releaseSync {
kind: "OutputField",
name: "releaseSync",
arguments: {
/**
* The release data to sync.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ReleaseSyncInput
}
},
inlineType: [1, ],
namedType: $Schema.ReleasePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [ALPHA] Creates a new release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface releaseCreate {
kind: "OutputField",
name: "releaseCreate",
arguments: {
/**
* The release to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ReleaseCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.ReleasePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [ALPHA] Updates a release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface releaseUpdate {
kind: "OutputField",
name: "releaseUpdate",
arguments: {
/**
* A partial Release object to update the Release with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ReleaseUpdateInput
},
/**
* The identifier of the release to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ReleasePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [ALPHA] Marks a release as completed. If version is provided, completes that specific release; otherwise completes the most recent started release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseComplete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface releaseComplete {
kind: "OutputField",
name: "releaseComplete",
arguments: {
/**
* The input containing the pipeline ID and optional version.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ReleaseCompleteInput
}
},
inlineType: [1, ],
namedType: $Schema.ReleasePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [ALPHA] Updates a release by pipeline. If version is provided, updates that specific release; otherwise updates the most recent started release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseUpdateByPipeline` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface releaseUpdateByPipeline {
kind: "OutputField",
name: "releaseUpdateByPipeline",
arguments: {
/**
* The input containing the pipeline ID, optional version, and optional stage name.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ReleaseUpdateByPipelineInput
}
},
inlineType: [1, ],
namedType: $Schema.ReleasePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [ALPHA] Deletes a release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface releaseDelete {
kind: "OutputField",
name: "releaseDelete",
arguments: {
/**
* The identifier of the release to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [ALPHA] Archives a release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface releaseArchive {
kind: "OutputField",
name: "releaseArchive",
arguments: {
/**
* The identifier of the release to archive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ReleaseArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [ALPHA] Unarchives a release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface releaseUnarchive {
kind: "OutputField",
name: "releaseUnarchive",
arguments: {
/**
* The identifier of the release to unarchive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ReleaseArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [ALPHA] Creates a new release pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePipelinePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releasePipelineCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface releasePipelineCreate {
kind: "OutputField",
name: "releasePipelineCreate",
arguments: {
/**
* The ReleasePipeline object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ReleasePipelineCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.ReleasePipelinePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [ALPHA] Updates a release pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePipelinePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releasePipelineUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface releasePipelineUpdate {
kind: "OutputField",
name: "releasePipelineUpdate",
arguments: {
/**
* A partial ReleasePipeline object to update the ReleasePipeline with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ReleasePipelineUpdateInput
},
/**
* The identifier of the release pipeline to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ReleasePipelinePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [ALPHA] Archives a release pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePipelineArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releasePipelineArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface releasePipelineArchive {
kind: "OutputField",
name: "releasePipelineArchive",
arguments: {
/**
* The identifier of the release pipeline to archive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ReleasePipelineArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [ALPHA] Unarchives a release pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePipelineArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releasePipelineUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface releasePipelineUnarchive {
kind: "OutputField",
name: "releasePipelineUnarchive",
arguments: {
/**
* The identifier of the release pipeline to unarchive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ReleasePipelineArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [ALPHA] Deletes a release pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releasePipelineDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface releasePipelineDelete {
kind: "OutputField",
name: "releasePipelineDelete",
arguments: {
/**
* The identifier of the release pipeline to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new reaction.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReactionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.reactionCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface reactionCreate {
kind: "OutputField",
name: "reactionCreate",
arguments: {
/**
* The reaction object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ReactionCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.ReactionPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a reaction.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.reactionDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface reactionDelete {
kind: "OutputField",
name: "reactionDelete",
arguments: {
/**
* The identifier of the reaction to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a push subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PushSubscriptionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.pushSubscriptionCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface pushSubscriptionCreate {
kind: "OutputField",
name: "pushSubscriptionCreate",
arguments: {
/**
* The push subscription to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.PushSubscriptionCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.PushSubscriptionPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a push subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PushSubscriptionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.pushSubscriptionDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface pushSubscriptionDelete {
kind: "OutputField",
name: "pushSubscriptionDelete",
arguments: {
/**
* The identifier of the push subscription to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.PushSubscriptionPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new project update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectUpdateCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectUpdateCreate {
kind: "OutputField",
name: "projectUpdateCreate",
arguments: {
/**
* Data for the project update to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ProjectUpdateCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.ProjectUpdatePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a project update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectUpdateUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface projectUpdateUpdate {
kind: "OutputField",
name: "projectUpdateUpdate",
arguments: {
/**
* A data to update the project update with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ProjectUpdateUpdateInput
},
/**
* The identifier of the project update to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectUpdatePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Archives a project update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdateArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectUpdateArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectUpdateArchive {
kind: "OutputField",
name: "projectUpdateArchive",
arguments: {
/**
* The identifier of the project update to archive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectUpdateArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Unarchives a project update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdateArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectUpdateUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectUpdateUnarchive {
kind: "OutputField",
name: "projectUpdateUnarchive",
arguments: {
/**
* The identifier of the project update to unarchive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectUpdateArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a project update.
*
* @deprecated Use `projectUpdateArchive` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectUpdateDelete` |
* | **⚠ Deprecated** | Use `projectUpdateArchive` instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectUpdateDelete {
kind: "OutputField",
name: "projectUpdateDelete",
arguments: {
/**
* The identifier of the project update to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Create a notification to remind a user about a project update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdateReminderPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.createProjectUpdateReminder` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface createProjectUpdateReminder {
kind: "OutputField",
name: "createProjectUpdateReminder",
arguments: {
/**
* The user identifier to whom the notification will be sent. By default, it is set to the project lead.
*/
userId: {
kind: "InputField",
name: "userId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The identifier of the project to remind about.
*/
projectId: {
kind: "InputField",
name: "projectId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectUpdateReminderPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new project status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectStatusPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectStatusCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectStatusCreate {
kind: "OutputField",
name: "projectStatusCreate",
arguments: {
/**
* The ProjectStatus object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ProjectStatusCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.ProjectStatusPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a project status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectStatusPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectStatusUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface projectStatusUpdate {
kind: "OutputField",
name: "projectStatusUpdate",
arguments: {
/**
* A partial ProjectStatus object to update the ProjectStatus with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ProjectStatusUpdateInput
},
/**
* The identifier of the project status to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectStatusPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Archives a project status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectStatusArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectStatusArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectStatusArchive {
kind: "OutputField",
name: "projectStatusArchive",
arguments: {
/**
* The identifier of the project status to archive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectStatusArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Unarchives a project status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectStatusArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectStatusUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectStatusUnarchive {
kind: "OutputField",
name: "projectStatusUnarchive",
arguments: {
/**
* The identifier of the project status to unarchive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectStatusArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new project relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectRelationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectRelationCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectRelationCreate {
kind: "OutputField",
name: "projectRelationCreate",
arguments: {
/**
* The project relation to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ProjectRelationCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.ProjectRelationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a project relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectRelationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectRelationUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface projectRelationUpdate {
kind: "OutputField",
name: "projectRelationUpdate",
arguments: {
/**
* The properties of the project relation to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ProjectRelationUpdateInput
},
/**
* The identifier of the project relation to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectRelationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a project relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectRelationDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectRelationDelete {
kind: "OutputField",
name: "projectRelationDelete",
arguments: {
/**
* The identifier of the project relation to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new project milestone.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestonePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectMilestoneCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectMilestoneCreate {
kind: "OutputField",
name: "projectMilestoneCreate",
arguments: {
/**
* The project milestone to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ProjectMilestoneCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.ProjectMilestonePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a project milestone.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestonePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectMilestoneUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface projectMilestoneUpdate {
kind: "OutputField",
name: "projectMilestoneUpdate",
arguments: {
/**
* A partial object to update the project milestone with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ProjectMilestoneUpdateInput
},
/**
* The identifier of the project milestone to update. Also the identifier from the URL is accepted.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectMilestonePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a project milestone.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectMilestoneDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectMilestoneDelete {
kind: "OutputField",
name: "projectMilestoneDelete",
arguments: {
/**
* The identifier of the project milestone to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [Internal] Moves a project milestone to another project, can be called to undo a prior move.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestoneMovePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectMilestoneMove` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface projectMilestoneMove {
kind: "OutputField",
name: "projectMilestoneMove",
arguments: {
/**
* The project to move the milestone to, as well as any additional options need to make a successful move, or undo a previous move.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ProjectMilestoneMoveInput
},
/**
* The identifier of the project milestone to move.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectMilestoneMovePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new project label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectLabelCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectLabelCreate {
kind: "OutputField",
name: "projectLabelCreate",
arguments: {
/**
* The project label to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ProjectLabelCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.ProjectLabelPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a project label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectLabelUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface projectLabelUpdate {
kind: "OutputField",
name: "projectLabelUpdate",
arguments: {
/**
* A partial label object to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ProjectLabelUpdateInput
},
/**
* The identifier of the label to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectLabelPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a project label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectLabelDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectLabelDelete {
kind: "OutputField",
name: "projectLabelDelete",
arguments: {
/**
* The identifier of the label to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Retires a project label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectLabelRetire` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectLabelRetire {
kind: "OutputField",
name: "projectLabelRetire",
arguments: {
/**
* The identifier of the label to retire.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectLabelPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Restores a project label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectLabelRestore` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectLabelRestore {
kind: "OutputField",
name: "projectLabelRestore",
arguments: {
/**
* The identifier of the label to restore.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectLabelPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates the user's organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface organizationUpdate {
kind: "OutputField",
name: "organizationUpdate",
arguments: {
/**
* A partial organization object to update the organization with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.OrganizationUpdateInput
}
},
inlineType: [1, ],
namedType: $Schema.OrganizationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Get an organization's delete confirmation token.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationDeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationDeleteChallenge` |
* | **Nullability** | Required |
*/
export interface organizationDeleteChallenge {
kind: "OutputField",
name: "organizationDeleteChallenge",
arguments: {},
inlineType: [1, ],
namedType: $Schema.OrganizationDeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationDeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface organizationDelete {
kind: "OutputField",
name: "organizationDelete",
arguments: {
/**
* Information required to delete an organization.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.DeleteOrganizationInput
}
},
inlineType: [1, ],
namedType: $Schema.OrganizationDeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Cancels the deletion of an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationCancelDeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationCancelDelete` |
* | **Nullability** | Required |
*/
export interface organizationCancelDelete {
kind: "OutputField",
name: "organizationCancelDelete",
arguments: {},
inlineType: [1, ],
namedType: $Schema.OrganizationCancelDeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Starts a trial for the organization on the specified plan type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationStartTrialPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationStartTrialForPlan` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface organizationStartTrialForPlan {
kind: "OutputField",
name: "organizationStartTrialForPlan",
arguments: {
/**
* Plan details for trial
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.OrganizationStartTrialInput
}
},
inlineType: [1, ],
namedType: $Schema.OrganizationStartTrialPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [DEPRECATED] Starts a trial for the organization.
*
* @deprecated Use organizationStartTrialForPlan
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationStartTrialPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationStartTrial` |
* | **⚠ Deprecated** | Use organizationStartTrialForPlan |
* | **Nullability** | Required |
*/
export interface organizationStartTrial {
kind: "OutputField",
name: "organizationStartTrial",
arguments: {},
inlineType: [1, ],
namedType: $Schema.OrganizationStartTrialPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new organization invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationInvitePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationInviteCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface organizationInviteCreate {
kind: "OutputField",
name: "organizationInviteCreate",
arguments: {
/**
* The organization invite object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.OrganizationInviteCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.OrganizationInvitePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates an organization invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationInvitePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationInviteUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface organizationInviteUpdate {
kind: "OutputField",
name: "organizationInviteUpdate",
arguments: {
/**
* The updates to make to the organization invite object.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.OrganizationInviteUpdateInput
},
/**
* The identifier of the organization invite to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.OrganizationInvitePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Re-send an organization invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.resendOrganizationInvite` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface resendOrganizationInvite {
kind: "OutputField",
name: "resendOrganizationInvite",
arguments: {
/**
* The identifier of the organization invite to re-send.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Re-send an organization invite tied to an email address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.resendOrganizationInviteByEmail` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface resendOrganizationInviteByEmail {
kind: "OutputField",
name: "resendOrganizationInviteByEmail",
arguments: {
/**
* The email address tied to the organization invite to re-send.
*/
email: {
kind: "InputField",
name: "email",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes an organization invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationInviteDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface organizationInviteDelete {
kind: "OutputField",
name: "organizationInviteDelete",
arguments: {
/**
* The identifier of the organization invite to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Verifies a domain claim.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationDomainSimplePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationDomainClaim` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface organizationDomainClaim {
kind: "OutputField",
name: "organizationDomainClaim",
arguments: {
/**
* The ID of the organization domain to claim.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.OrganizationDomainSimplePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Verifies a domain to be added to an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationDomainPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationDomainVerify` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface organizationDomainVerify {
kind: "OutputField",
name: "organizationDomainVerify",
arguments: {
/**
* The organization domain to verify.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.OrganizationDomainVerificationInput
}
},
inlineType: [1, ],
namedType: $Schema.OrganizationDomainPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Adds a domain to be allowed for an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationDomainPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationDomainCreate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface organizationDomainCreate {
kind: "OutputField",
name: "organizationDomainCreate",
arguments: {
/**
* Whether to trigger an email verification flow during domain creation.
*/
triggerEmailVerification: {
kind: "InputField",
name: "triggerEmailVerification",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* The organization domain entry to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.OrganizationDomainCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.OrganizationDomainPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Updates an organization domain settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationDomainPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationDomainUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface organizationDomainUpdate {
kind: "OutputField",
name: "organizationDomainUpdate",
arguments: {
/**
* The organization domain entry to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.OrganizationDomainUpdateInput
},
/**
* The identifier of the domain to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.OrganizationDomainPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a domain.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationDomainDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface organizationDomainDelete {
kind: "OutputField",
name: "organizationDomainDelete",
arguments: {
/**
* The identifier of the domain to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new notification subscription for a cycle, custom view, label, project or team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationSubscriptionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationSubscriptionCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface notificationSubscriptionCreate {
kind: "OutputField",
name: "notificationSubscriptionCreate",
arguments: {
/**
* The subscription object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.NotificationSubscriptionCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.NotificationSubscriptionPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationSubscriptionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationSubscriptionUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface notificationSubscriptionUpdate {
kind: "OutputField",
name: "notificationSubscriptionUpdate",
arguments: {
/**
* A partial notification subscription object to update the notification subscription with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.NotificationSubscriptionUpdateInput
},
/**
* The identifier of the notification subscription to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.NotificationSubscriptionPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a notification subscription reference.
*
* @deprecated Update `notificationSubscription.active` to `false` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationSubscriptionDelete` |
* | **⚠ Deprecated** | Update `notificationSubscription.active` to `false` instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface notificationSubscriptionDelete {
kind: "OutputField",
name: "notificationSubscriptionDelete",
arguments: {
/**
* The identifier of the notification subscription reference to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface notificationUpdate {
kind: "OutputField",
name: "notificationUpdate",
arguments: {
/**
* A partial notification object to update the notification with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.NotificationUpdateInput
},
/**
* The identifier of the notification to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.NotificationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Marks notification and all related notifications as read.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationBatchActionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationMarkReadAll` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface notificationMarkReadAll {
kind: "OutputField",
name: "notificationMarkReadAll",
arguments: {
/**
* The time when notification was marked as read.
*/
readAt: {
kind: "InputField",
name: "readAt",
inlineType: [1, ],
namedType: $Schema.DateTime
},
/**
* The type and id of the entity to archive notifications for.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.NotificationEntityInput
}
},
inlineType: [1, ],
namedType: $Schema.NotificationBatchActionPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Marks notification and all related notifications as unread.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationBatchActionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationMarkUnreadAll` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface notificationMarkUnreadAll {
kind: "OutputField",
name: "notificationMarkUnreadAll",
arguments: {
/**
* The type and id of the entity to archive notifications for.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.NotificationEntityInput
}
},
inlineType: [1, ],
namedType: $Schema.NotificationBatchActionPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Snoozes a notification and all related notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationBatchActionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationSnoozeAll` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface notificationSnoozeAll {
kind: "OutputField",
name: "notificationSnoozeAll",
arguments: {
/**
* The time until a notification will be snoozed. After that it will appear in the inbox again.
*/
snoozedUntilAt: {
kind: "InputField",
name: "snoozedUntilAt",
inlineType: [1, ],
namedType: $Schema.DateTime
},
/**
* The type and id of the entity to archive notifications for.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.NotificationEntityInput
}
},
inlineType: [1, ],
namedType: $Schema.NotificationBatchActionPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Unsnoozes a notification and all related notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationBatchActionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationUnsnoozeAll` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface notificationUnsnoozeAll {
kind: "OutputField",
name: "notificationUnsnoozeAll",
arguments: {
/**
* The time when the notification was unsnoozed.
*/
unsnoozedAt: {
kind: "InputField",
name: "unsnoozedAt",
inlineType: [1, ],
namedType: $Schema.DateTime
},
/**
* The type and id of the entity to archive notifications for.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.NotificationEntityInput
}
},
inlineType: [1, ],
namedType: $Schema.NotificationBatchActionPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Archives a notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface notificationArchive {
kind: "OutputField",
name: "notificationArchive",
arguments: {
/**
* The id of the notification to archive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.NotificationArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Archives a notification and all related notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationBatchActionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationArchiveAll` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface notificationArchiveAll {
kind: "OutputField",
name: "notificationArchiveAll",
arguments: {
/**
* The type and id of the entity to archive notifications for.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.NotificationEntityInput
}
},
inlineType: [1, ],
namedType: $Schema.NotificationBatchActionPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Unarchives a notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface notificationUnarchive {
kind: "OutputField",
name: "notificationUnarchive",
arguments: {
/**
* The id of the notification to archive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.NotificationArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [ALPHA] Creates a new issueToRelease join, adding an issue to a release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueToReleasePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueToReleaseCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface issueToReleaseCreate {
kind: "OutputField",
name: "issueToReleaseCreate",
arguments: {
/**
* The properties of the issueToRelease to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.IssueToReleaseCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.IssueToReleasePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [ALPHA] Deletes an issueToRelease by issue and release identifiers
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueToReleaseDeleteByIssueAndRelease` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface issueToReleaseDeleteByIssueAndRelease {
kind: "OutputField",
name: "issueToReleaseDeleteByIssueAndRelease",
arguments: {
/**
* The identifier of the release
*/
releaseId: {
kind: "InputField",
name: "releaseId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The identifier of the issue. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId: {
kind: "InputField",
name: "issueId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [ALPHA] Deletes an issueToRelease by its identifier, removing an issue from a release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueToReleaseDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface issueToReleaseDelete {
kind: "OutputField",
name: "issueToReleaseDelete",
arguments: {
/**
* The identifier of the issueToRelease to delete
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface issueCreate {
kind: "OutputField",
name: "issueCreate",
arguments: {
/**
* The issue object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.IssueCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.IssuePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a list of issues in one transaction.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueBatchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueBatchCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface issueBatchCreate {
kind: "OutputField",
name: "issueBatchCreate",
arguments: {
/**
* A list of issue objects to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.IssueBatchCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.IssueBatchPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface issueUpdate {
kind: "OutputField",
name: "issueUpdate",
arguments: {
/**
* A partial issue object to update the issue with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.IssueUpdateInput
},
/**
* The identifier of the issue to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssuePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates multiple issues at once.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueBatchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueBatchUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface issueBatchUpdate {
kind: "OutputField",
name: "issueBatchUpdate",
arguments: {
/**
* A partial issue object to update the issues with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.IssueUpdateInput
},
/**
* The id's of the issues to update. Can't be more than 50 at a time.
*/
ids: {
kind: "InputField",
name: "ids",
inlineType: [1, [1, ]],
namedType: $Schema.UUID
}
},
inlineType: [1, ],
namedType: $Schema.IssueBatchPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Archives an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueArchive` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface issueArchive {
kind: "OutputField",
name: "issueArchive",
arguments: {
/**
* Whether to trash the issue.
*/
trash: {
kind: "InputField",
name: "trash",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* The identifier of the issue to archive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Unarchives an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface issueUnarchive {
kind: "OutputField",
name: "issueUnarchive",
arguments: {
/**
* The identifier of the issue to archive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes (trashes) an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueDelete` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface issueDelete {
kind: "OutputField",
name: "issueDelete",
arguments: {
/**
* Whether to permanently delete the issue and skip the grace period of 30 days. Available only to admins!
*/
permanentlyDelete: {
kind: "InputField",
name: "permanentlyDelete",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* The identifier of the issue to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Adds a label to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueAddLabel` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface issueAddLabel {
kind: "OutputField",
name: "issueAddLabel",
arguments: {
/**
* The identifier of the label to add.
*/
labelId: {
kind: "InputField",
name: "labelId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The identifier of the issue to add the label to.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssuePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Removes a label from an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueRemoveLabel` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface issueRemoveLabel {
kind: "OutputField",
name: "issueRemoveLabel",
arguments: {
/**
* The identifier of the label to remove.
*/
labelId: {
kind: "InputField",
name: "labelId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The identifier of the issue to remove the label from.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssuePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Adds an issue reminder. Will cause a notification to be sent when the issue reminder time is reached.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueReminder` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface issueReminder {
kind: "OutputField",
name: "issueReminder",
arguments: {
/**
* The time when a reminder notification will be sent.
*/
reminderAt: {
kind: "InputField",
name: "reminderAt",
inlineType: [1, ],
namedType: $Schema.DateTime
},
/**
* The identifier of the issue to add a reminder for.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssuePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Subscribes a user to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueSubscribe` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
export interface issueSubscribe {
kind: "OutputField",
name: "issueSubscribe",
arguments: {
/**
* The email of the user to subscribe, default is the current user.
*/
userEmail: {
kind: "InputField",
name: "userEmail",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The identifier of the user to subscribe, default is the current user.
*/
userId: {
kind: "InputField",
name: "userId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The identifier of the issue to subscribe to.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssuePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Unsubscribes a user from an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueUnsubscribe` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
export interface issueUnsubscribe {
kind: "OutputField",
name: "issueUnsubscribe",
arguments: {
/**
* The email of the user to unsubscribe, default is the current user.
*/
userEmail: {
kind: "InputField",
name: "userEmail",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The identifier of the user to unsubscribe, default is the current user.
*/
userId: {
kind: "InputField",
name: "userId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The identifier of the issue to unsubscribe from.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssuePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Updates an issue description from the Front app to handle Front attachments correctly.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueDescriptionUpdateFromFront` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface issueDescriptionUpdateFromFront {
kind: "OutputField",
name: "issueDescriptionUpdateFromFront",
arguments: {
/**
* Description to update the issue with.
*/
description: {
kind: "InputField",
name: "description",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The identifier of the issue to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssuePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Disables external sync on an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueExternalSyncDisable` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface issueExternalSyncDisable {
kind: "OutputField",
name: "issueExternalSyncDisable",
arguments: {
/**
* The ID of the sync attachment to disable.
*/
attachmentId: {
kind: "InputField",
name: "attachmentId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssuePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new issue relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueRelationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueRelationCreate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface issueRelationCreate {
kind: "OutputField",
name: "issueRelationCreate",
arguments: {
/**
* Used by client undo operations. Should not be set directly.
*/
overrideCreatedAt: {
kind: "InputField",
name: "overrideCreatedAt",
inlineType: [0, ],
namedType: $Schema.DateTime
},
/**
* The issue relation to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.IssueRelationCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.IssueRelationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates an issue relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueRelationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueRelationUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface issueRelationUpdate {
kind: "OutputField",
name: "issueRelationUpdate",
arguments: {
/**
* The properties of the issue relation to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.IssueRelationUpdateInput
},
/**
* The identifier of the issue relation to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueRelationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes an issue relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueRelationDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface issueRelationDelete {
kind: "OutputField",
name: "issueRelationDelete",
arguments: {
/**
* The identifier of the issue relation to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueLabelCreate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface issueLabelCreate {
kind: "OutputField",
name: "issueLabelCreate",
arguments: {
/**
* Whether to replace all team-specific labels with the same name with this newly created workspace label (default: false).
*/
replaceTeamLabels: {
kind: "InputField",
name: "replaceTeamLabels",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* The issue label to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.IssueLabelCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.IssueLabelPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueLabelUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
export interface issueLabelUpdate {
kind: "OutputField",
name: "issueLabelUpdate",
arguments: {
/**
* Whether to replace all team-specific labels with the same name with this updated workspace label (default: false).
*/
replaceTeamLabels: {
kind: "InputField",
name: "replaceTeamLabels",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* A partial label object to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.IssueLabelUpdateInput
},
/**
* The identifier of the label to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueLabelPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes an issue label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueLabelDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface issueLabelDelete {
kind: "OutputField",
name: "issueLabelDelete",
arguments: {
/**
* The identifier of the label to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Retires a label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueLabelRetire` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface issueLabelRetire {
kind: "OutputField",
name: "issueLabelRetire",
arguments: {
/**
* The identifier of the label to retire.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueLabelPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Restores a label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueLabelRestore` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface issueLabelRestore {
kind: "OutputField",
name: "issueLabelRestore",
arguments: {
/**
* The identifier of the label to restore.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueLabelPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Kicks off a GitHub import job.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueImportCreateGithub` |
* | **Nullability** | Required |
* | **Arguments** | 9 |
*/
export interface issueImportCreateGithub {
kind: "OutputField",
name: "issueImportCreateGithub",
arguments: {
/**
* ID of the organization into which to import data.
*
* @deprecated Argument will be ignored. Use teamId to import in a specific team, or teamName to import into a new team.
*/
organizationId: {
kind: "InputField",
name: "organizationId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* ID of the team into which to import data.
*/
teamId: {
kind: "InputField",
name: "teamId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Name of new team. When teamId is not set.
*/
teamName: {
kind: "InputField",
name: "teamName",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* IDs of the Github repositories from which we will import data.
*/
githubRepoIds: {
kind: "InputField",
name: "githubRepoIds",
inlineType: [0, [1, ]],
namedType: $Schema.Int
},
/**
* Labels to use to filter the import data. Only issues matching any of these filters will be imported.
*/
githubLabels: {
kind: "InputField",
name: "githubLabels",
inlineType: [0, [1, ]],
namedType: $Schema.String
},
/**
* [DEPRECATED] ID of the Github import integration to use to access issues.
*
* @deprecated An import can span multiple integrations. Value will be ignored.
*/
integrationId: {
kind: "InputField",
name: "integrationId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Whether or not we should import GitHub organization level projects.
*
* @deprecated Argument will be ignored. The project information of an issue is always imported regardless of whether the project is linked to the repository of the issue or not
*/
githubShouldImportOrgProjects: {
kind: "InputField",
name: "githubShouldImportOrgProjects",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* Whether to instantly process the import with the default configuration mapping.
*/
instantProcess: {
kind: "InputField",
name: "instantProcess",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* Whether or not we should collect the data for closed issues.
*/
includeClosedIssues: {
kind: "InputField",
name: "includeClosedIssues",
inlineType: [0, ],
namedType: $Schema.Boolean
}
},
inlineType: [1, ],
namedType: $Schema.IssueImportPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Kicks off a Jira import job.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueImportCreateJira` |
* | **Nullability** | Required |
* | **Arguments** | 11 |
*/
export interface issueImportCreateJira {
kind: "OutputField",
name: "issueImportCreateJira",
arguments: {
/**
* ID of the organization into which to import data.
*
* @deprecated Argument will be ignored. Use teamId to import in a specific team, or teamName to import into a new team.
*/
organizationId: {
kind: "InputField",
name: "organizationId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* ID of the team into which to import data. Empty to create new team.
*/
teamId: {
kind: "InputField",
name: "teamId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Name of new team. When teamId is not set.
*/
teamName: {
kind: "InputField",
name: "teamName",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Jira personal access token to access Jira REST API.
*/
jiraToken: {
kind: "InputField",
name: "jiraToken",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Jira project key from which we will import data.
*/
jiraProject: {
kind: "InputField",
name: "jiraProject",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Jira user account email.
*/
jiraEmail: {
kind: "InputField",
name: "jiraEmail",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Jira installation or cloud hostname.
*/
jiraHostname: {
kind: "InputField",
name: "jiraHostname",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* A custom JQL query to filter issues being imported
*/
jql: {
kind: "InputField",
name: "jql",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Whether to instantly process the import with the default configuration mapping.
*/
instantProcess: {
kind: "InputField",
name: "instantProcess",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* Whether or not we should collect the data for closed issues.
*/
includeClosedIssues: {
kind: "InputField",
name: "includeClosedIssues",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* ID of issue import. If not provided it will be generated.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueImportPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Kicks off a Jira import job from a CSV.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueImportCreateCSVJira` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface issueImportCreateCSVJira {
kind: "OutputField",
name: "issueImportCreateCSVJira",
arguments: {
/**
* ID of the organization into which to import data.
*
* @deprecated Argument will be ignored. Use teamId to import in a specific team, or teamName to import into a new team.
*/
organizationId: {
kind: "InputField",
name: "organizationId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* ID of the team into which to import data. Empty to create new team.
*/
teamId: {
kind: "InputField",
name: "teamId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Name of new team. When teamId is not set.
*/
teamName: {
kind: "InputField",
name: "teamName",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* URL for the CSV.
*/
csvUrl: {
kind: "InputField",
name: "csvUrl",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Jira installation or cloud hostname.
*/
jiraHostname: {
kind: "InputField",
name: "jiraHostname",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Jira personal access token to access Jira REST API.
*/
jiraToken: {
kind: "InputField",
name: "jiraToken",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Jira user account email.
*/
jiraEmail: {
kind: "InputField",
name: "jiraEmail",
inlineType: [0, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueImportPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Kicks off a Shortcut (formerly Clubhouse) import job.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueImportCreateClubhouse` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
export interface issueImportCreateClubhouse {
kind: "OutputField",
name: "issueImportCreateClubhouse",
arguments: {
/**
* ID of the organization into which to import data.
*
* @deprecated Argument will be ignored. Use teamId to import in a specific team, or teamName to import into a new team.
*/
organizationId: {
kind: "InputField",
name: "organizationId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* ID of the team into which to import data.
*/
teamId: {
kind: "InputField",
name: "teamId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Name of new team. When teamId is not set.
*/
teamName: {
kind: "InputField",
name: "teamName",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Shortcut (formerly Clubhouse) token to fetch information from the Clubhouse API.
*/
clubhouseToken: {
kind: "InputField",
name: "clubhouseToken",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Shortcut (formerly Clubhouse) group name to choose which issues we should import.
*/
clubhouseGroupName: {
kind: "InputField",
name: "clubhouseGroupName",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Whether to instantly process the import with the default configuration mapping.
*/
instantProcess: {
kind: "InputField",
name: "instantProcess",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* Whether or not we should collect the data for closed issues.
*/
includeClosedIssues: {
kind: "InputField",
name: "includeClosedIssues",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* ID of issue import. If not provided it will be generated.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueImportPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Kicks off an Asana import job.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueImportCreateAsana` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
export interface issueImportCreateAsana {
kind: "OutputField",
name: "issueImportCreateAsana",
arguments: {
/**
* ID of the organization into which to import data.
*
* @deprecated Argument will be ignored. Use teamId to import in a specific team, or teamName to import into a new team.
*/
organizationId: {
kind: "InputField",
name: "organizationId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* ID of the team into which to import data.
*/
teamId: {
kind: "InputField",
name: "teamId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Name of new team. When teamId is not set.
*/
teamName: {
kind: "InputField",
name: "teamName",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Asana token to fetch information from the Asana API.
*/
asanaToken: {
kind: "InputField",
name: "asanaToken",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Asana team name to choose which issues we should import.
*/
asanaTeamName: {
kind: "InputField",
name: "asanaTeamName",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Whether to instantly process the import with the default configuration mapping.
*/
instantProcess: {
kind: "InputField",
name: "instantProcess",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* Whether or not we should collect the data for closed issues.
*/
includeClosedIssues: {
kind: "InputField",
name: "includeClosedIssues",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* ID of issue import. If not provided it will be generated.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueImportPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Kicks off a Linear to Linear import job.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueImportCreateLinearV2` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface issueImportCreateLinearV2 {
kind: "OutputField",
name: "issueImportCreateLinearV2",
arguments: {
/**
* The source organization to import from.
*/
linearSourceOrganizationId: {
kind: "InputField",
name: "linearSourceOrganizationId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* ID of issue import. If not provided it will be generated.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueImportPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes an import job.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportDeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueImportDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface issueImportDelete {
kind: "OutputField",
name: "issueImportDelete",
arguments: {
/**
* ID of the issue import to delete.
*/
issueImportId: {
kind: "InputField",
name: "issueImportId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueImportDeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Kicks off import processing.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueImportProcess` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface issueImportProcess {
kind: "OutputField",
name: "issueImportProcess",
arguments: {
/**
* The mapping configuration to use for processing the import.
*/
mapping: {
kind: "InputField",
name: "mapping",
inlineType: [1, ],
namedType: $Schema.JSONObject
},
/**
* ID of the issue import which we're going to process.
*/
issueImportId: {
kind: "InputField",
name: "issueImportId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueImportPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates the mapping for the issue import.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueImportUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface issueImportUpdate {
kind: "OutputField",
name: "issueImportUpdate",
arguments: {
/**
* The properties of the issue import to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.IssueImportUpdateInput
},
/**
* The identifier of the issue import.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueImportPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates new settings for one or more integrations.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationsSettingsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationsSettingsCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface integrationsSettingsCreate {
kind: "OutputField",
name: "integrationsSettingsCreate",
arguments: {
/**
* The settings to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.IntegrationsSettingsCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationsSettingsPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates settings related to integrations for a project or a team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationsSettingsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationsSettingsUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationsSettingsUpdate {
kind: "OutputField",
name: "integrationsSettingsUpdate",
arguments: {
/**
* A settings object to update the settings with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.IntegrationsSettingsUpdateInput
},
/**
* The identifier of the settings to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationsSettingsPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new integrationTemplate join.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationTemplatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationTemplateCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface integrationTemplateCreate {
kind: "OutputField",
name: "integrationTemplateCreate",
arguments: {
/**
* The properties of the integrationTemplate to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.IntegrationTemplateCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationTemplatePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a integrationTemplate.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationTemplateDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface integrationTemplateDelete {
kind: "OutputField",
name: "integrationTemplateDelete",
arguments: {
/**
* The identifier of the integrationTemplate to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Updates the integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationUpdate {
kind: "OutputField",
name: "integrationUpdate",
arguments: {
/**
* A partial integration object to update the integration with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.IntegrationUpdateInput
},
/**
* The identifier of the integration to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Updates the integration settings.
*
* @deprecated Use integrationUpdate instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSettingsUpdate` |
* | **⚠ Deprecated** | Use integrationUpdate instead. |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationSettingsUpdate {
kind: "OutputField",
name: "integrationSettingsUpdate",
arguments: {
/**
* An integration settings object.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.IntegrationSettingsInput
},
/**
* The identifier of the integration to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Generates a webhook for the GitHub commit integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitHubCommitIntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGithubCommitCreate` |
* | **Nullability** | Required |
*/
export interface integrationGithubCommitCreate {
kind: "OutputField",
name: "integrationGithubCommitCreate",
arguments: {},
inlineType: [1, ],
namedType: $Schema.GitHubCommitIntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Connects the organization with the GitHub App.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGithubConnect` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
export interface integrationGithubConnect {
kind: "OutputField",
name: "integrationGithubConnect",
arguments: {
/**
* Whether the integration should have code access
*/
codeAccess: {
kind: "InputField",
name: "codeAccess",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* The GitHub grant code that's exchanged for OAuth tokens.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The GitHub data to connect with.
*/
installationId: {
kind: "InputField",
name: "installationId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Connects the organization with the GitHub Import App.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGithubImportConnect` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationGithubImportConnect {
kind: "OutputField",
name: "integrationGithubImportConnect",
arguments: {
/**
* The GitHub grant code that's exchanged for OAuth tokens.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The GitHub data to connect with.
*/
installationId: {
kind: "InputField",
name: "installationId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Refreshes the data for a GitHub import integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGithubImportRefresh` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface integrationGithubImportRefresh {
kind: "OutputField",
name: "integrationGithubImportRefresh",
arguments: {
/**
* The id of the integration to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Connects the organization with a GitHub Enterprise Server.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitHubEnterpriseServerPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGitHubEnterpriseServerConnect` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationGitHubEnterpriseServerConnect {
kind: "OutputField",
name: "integrationGitHubEnterpriseServerConnect",
arguments: {
/**
* The name of GitHub organization.
*/
organizationName: {
kind: "InputField",
name: "organizationName",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The base URL of the GitHub Enterprise Server installation.
*/
githubUrl: {
kind: "InputField",
name: "githubUrl",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.GitHubEnterpriseServerPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Connects the organization with a GitLab Access Token.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitLabIntegrationCreatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGitlabConnect` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationGitlabConnect {
kind: "OutputField",
name: "integrationGitlabConnect",
arguments: {
/**
* The URL of the GitLab installation.
*/
gitlabUrl: {
kind: "InputField",
name: "gitlabUrl",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The GitLab Access Token to connect with.
*/
accessToken: {
kind: "InputField",
name: "accessToken",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.GitLabIntegrationCreatePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Tests connectivity to a self-hosted GitLab instance and clears auth errors if successful.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitLabTestConnectionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGitlabTestConnection` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface integrationGitlabTestConnection {
kind: "OutputField",
name: "integrationGitlabTestConnection",
arguments: {
/**
* The ID of the GitLab integration to test.
*/
integrationId: {
kind: "InputField",
name: "integrationId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.GitLabTestConnectionPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates an integration api key for Airbyte to connect with Linear.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.airbyteIntegrationConnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface airbyteIntegrationConnect {
kind: "OutputField",
name: "airbyteIntegrationConnect",
arguments: {
/**
* Airbyte integration settings.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.AirbyteConfigurationInput
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [Internal] Connects the Google Calendar to the user to this Linear account via OAuth2.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGoogleCalendarPersonalConnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface integrationGoogleCalendarPersonalConnect {
kind: "OutputField",
name: "integrationGoogleCalendarPersonalConnect",
arguments: {
/**
* [Internal] The Google OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Integrates the organization with LaunchDarkly.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationLaunchDarklyConnect` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
export interface integrationLaunchDarklyConnect {
kind: "OutputField",
name: "integrationLaunchDarklyConnect",
arguments: {
/**
* The LaunchDarkly OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The LaunchDarkly project key.
*/
projectKey: {
kind: "InputField",
name: "projectKey",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The LaunchDarkly environment.
*/
environment: {
kind: "InputField",
name: "environment",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Integrates your personal account with LaunchDarkly.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationLaunchDarklyPersonalConnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface integrationLaunchDarklyPersonalConnect {
kind: "OutputField",
name: "integrationLaunchDarklyPersonalConnect",
arguments: {
/**
* The LaunchDarkly OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Connects the organization with a Jira Personal Access Token.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.jiraIntegrationConnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface jiraIntegrationConnect {
kind: "OutputField",
name: "jiraIntegrationConnect",
arguments: {
/**
* Jira integration settings.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.JiraConfigurationInput
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Updates a Jira Integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationJiraUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface integrationJiraUpdate {
kind: "OutputField",
name: "integrationJiraUpdate",
arguments: {
/**
* Jira integration update input.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.JiraUpdateInput
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Connect your Jira account to Linear.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationJiraPersonal` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationJiraPersonal {
kind: "OutputField",
name: "integrationJiraPersonal",
arguments: {
/**
* The Jira OAuth code, when connecting using OAuth.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The Jira personal access token, when connecting using a PAT.
*/
accessToken: {
kind: "InputField",
name: "accessToken",
inlineType: [0, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Connect your GitHub account to Linear.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGitHubPersonal` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationGitHubPersonal {
kind: "OutputField",
name: "integrationGitHubPersonal",
arguments: {
/**
* Whether to connect with code access.
*/
codeAccess: {
kind: "InputField",
name: "codeAccess",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* The GitHub OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Integrates the organization with Intercom.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationIntercom` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
export interface integrationIntercom {
kind: "OutputField",
name: "integrationIntercom",
arguments: {
/**
* The Intercom domain URL to use for the integration. Defaults to app.intercom.com if not provided.
*/
domainUrl: {
kind: "InputField",
name: "domainUrl",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The Intercom OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Intercom OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Disconnects the organization from Intercom.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationIntercomDelete` |
* | **Nullability** | Required |
*/
export interface integrationIntercomDelete {
kind: "OutputField",
name: "integrationIntercomDelete",
arguments: {},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Refreshes the customer data attributes from the specified integration service.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationCustomerDataAttributesRefresh` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface integrationCustomerDataAttributesRefresh {
kind: "OutputField",
name: "integrationCustomerDataAttributesRefresh",
arguments: {
/**
* The integration service to refresh customer data attributes from.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.IntegrationCustomerDataAttributesRefreshInput
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [DEPRECATED] Updates settings on the Intercom integration.
*
* @deprecated This mutation is deprecated, please use `integrationSettingsUpdate` instead
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationIntercomSettingsUpdate` |
* | **⚠ Deprecated** | This mutation is deprecated, please use `integrationSettingsUpdate` instead |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface integrationIntercomSettingsUpdate {
kind: "OutputField",
name: "integrationIntercomSettingsUpdate",
arguments: {
/**
* A partial Intercom integration settings object to update the integration settings with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.IntercomSettingsInput
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Integrates the organization with Discord.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationDiscord` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationDiscord {
kind: "OutputField",
name: "integrationDiscord",
arguments: {
/**
* The Discord OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Discord OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Integrates the organization with Opsgenie.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationOpsgenieConnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface integrationOpsgenieConnect {
kind: "OutputField",
name: "integrationOpsgenieConnect",
arguments: {
/**
* The Opsgenie API key.
*/
apiKey: {
kind: "InputField",
name: "apiKey",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Refresh Opsgenie schedule mappings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationOpsgenieRefreshScheduleMappings` |
* | **Nullability** | Required |
*/
export interface integrationOpsgenieRefreshScheduleMappings {
kind: "OutputField",
name: "integrationOpsgenieRefreshScheduleMappings",
arguments: {},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Integrates the organization with PagerDuty.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationPagerDutyConnect` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationPagerDutyConnect {
kind: "OutputField",
name: "integrationPagerDutyConnect",
arguments: {
/**
* The PagerDuty OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The PagerDuty OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Refresh PagerDuty schedule mappings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationPagerDutyRefreshScheduleMappings` |
* | **Nullability** | Required |
*/
export interface integrationPagerDutyRefreshScheduleMappings {
kind: "OutputField",
name: "integrationPagerDutyRefreshScheduleMappings",
arguments: {},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [Internal] Updates existing Slack integration scopes.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.updateIntegrationSlackScopes` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
export interface updateIntegrationSlackScopes {
kind: "OutputField",
name: "updateIntegrationSlackScopes",
arguments: {
/**
* The ID of the existing Slack integration
*/
integrationId: {
kind: "InputField",
name: "integrationId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Slack OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Slack OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Integrates the organization with Slack.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlack` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
export interface integrationSlack {
kind: "OutputField",
name: "integrationSlack",
arguments: {
/**
* [DEPRECATED] Whether or not v2 of Slack OAuth should be used. No longer used.
*/
shouldUseV2Auth: {
kind: "InputField",
name: "shouldUseV2Auth",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* The Slack OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Slack OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Integrates the organization with the Slack Asks app.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackAsks` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationSlackAsks {
kind: "OutputField",
name: "integrationSlackAsks",
arguments: {
/**
* The Slack OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Slack OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates the Slack team's name in Linear for an existing Slack or Asks integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationSlackWorkspaceNamePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackOrAsksUpdateSlackTeamName` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface integrationSlackOrAsksUpdateSlackTeamName {
kind: "OutputField",
name: "integrationSlackOrAsksUpdateSlackTeamName",
arguments: {
/**
* The integration ID.
*/
integrationId: {
kind: "InputField",
name: "integrationId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationSlackWorkspaceNamePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Integrates your personal notifications with Slack.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackPersonal` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationSlackPersonal {
kind: "OutputField",
name: "integrationSlackPersonal",
arguments: {
/**
* The Slack OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Slack OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Connect a Slack channel to Asks.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AsksChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationAsksConnectChannel` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationAsksConnectChannel {
kind: "OutputField",
name: "integrationAsksConnectChannel",
arguments: {
/**
* The Slack OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Slack OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.AsksChannelConnectPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Slack integration for team notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SlackChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackPost` |
* | **Nullability** | Required |
* | **Arguments** | 4 |
*/
export interface integrationSlackPost {
kind: "OutputField",
name: "integrationSlackPost",
arguments: {
/**
* [DEPRECATED] Whether or not v2 of Slack OAuth should be used. No longer used.
*/
shouldUseV2Auth: {
kind: "InputField",
name: "shouldUseV2Auth",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* The Slack OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Integration's associated team.
*/
teamId: {
kind: "InputField",
name: "teamId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Slack OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.SlackChannelConnectPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Slack integration for project notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SlackChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackProjectPost` |
* | **Nullability** | Required |
* | **Arguments** | 4 |
*/
export interface integrationSlackProjectPost {
kind: "OutputField",
name: "integrationSlackProjectPost",
arguments: {
/**
* The service to enable once connected, either 'notifications' or 'updates'.
*/
service: {
kind: "InputField",
name: "service",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Slack OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Integration's associated project.
*/
projectId: {
kind: "InputField",
name: "projectId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Slack OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.SlackChannelConnectPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [Internal] Slack integration for initiative notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SlackChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackInitiativePost` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
export interface integrationSlackInitiativePost {
kind: "OutputField",
name: "integrationSlackInitiativePost",
arguments: {
/**
* The Slack OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Integration's associated initiative.
*/
initiativeId: {
kind: "InputField",
name: "initiativeId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Slack OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.SlackChannelConnectPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Slack integration for custom view notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SlackChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackCustomViewNotifications` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
export interface integrationSlackCustomViewNotifications {
kind: "OutputField",
name: "integrationSlackCustomViewNotifications",
arguments: {
/**
* The Slack OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Integration's associated custom view.
*/
customViewId: {
kind: "InputField",
name: "customViewId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Slack OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.SlackChannelConnectPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Integrates a Slack Asks channel with a Customer.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SuccessPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackCustomerChannelLink` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
export interface integrationSlackCustomerChannelLink {
kind: "OutputField",
name: "integrationSlackCustomerChannelLink",
arguments: {
/**
* The Slack OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The customer to link the Slack channel with
*/
customerId: {
kind: "InputField",
name: "customerId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Slack OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.SuccessPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Slack integration for organization level project update notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SlackChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackOrgProjectUpdatesPost` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationSlackOrgProjectUpdatesPost {
kind: "OutputField",
name: "integrationSlackOrgProjectUpdatesPost",
arguments: {
/**
* The Slack OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Slack OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.SlackChannelConnectPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [Internal] Slack integration for organization level initiative update notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SlackChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackOrgInitiativeUpdatesPost` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationSlackOrgInitiativeUpdatesPost {
kind: "OutputField",
name: "integrationSlackOrgInitiativeUpdatesPost",
arguments: {
/**
* The Slack OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Slack OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.SlackChannelConnectPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Imports custom emojis from your Slack workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackImportEmojis` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationSlackImportEmojis {
kind: "OutputField",
name: "integrationSlackImportEmojis",
arguments: {
/**
* The Slack OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Slack OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Integrates the organization with Figma.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationFigma` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationFigma {
kind: "OutputField",
name: "integrationFigma",
arguments: {
/**
* The Figma OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Figma OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Integrates the organization with Gong.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGong` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationGong {
kind: "OutputField",
name: "integrationGong",
arguments: {
/**
* The Gong OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Gong OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Integrates the organization with Google Sheets.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGoogleSheets` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface integrationGoogleSheets {
kind: "OutputField",
name: "integrationGoogleSheets",
arguments: {
/**
* The Google OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Manually update Google Sheets data.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.refreshGoogleSheetsData` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface refreshGoogleSheetsData {
kind: "OutputField",
name: "refreshGoogleSheetsData",
arguments: {
/**
* The type of export.
*/
type: {
kind: "InputField",
name: "type",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The identifier of the Google Sheets integration to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Integrates the organization with Sentry.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSentryConnect` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
export interface integrationSentryConnect {
kind: "OutputField",
name: "integrationSentryConnect",
arguments: {
/**
* The slug of the Sentry organization being connected.
*/
organizationSlug: {
kind: "InputField",
name: "organizationSlug",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Sentry grant code that's exchanged for OAuth tokens.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Sentry installationId to connect with.
*/
installationId: {
kind: "InputField",
name: "installationId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Integrates the organization with Front.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationFront` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationFront {
kind: "OutputField",
name: "integrationFront",
arguments: {
/**
* The Front OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Front OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Integrates the organization with Zendesk.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationZendesk` |
* | **Nullability** | Required |
* | **Arguments** | 4 |
*/
export interface integrationZendesk {
kind: "OutputField",
name: "integrationZendesk",
arguments: {
/**
* The Zendesk installation subdomain.
*/
subdomain: {
kind: "InputField",
name: "subdomain",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Zendesk OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Zendesk OAuth scopes.
*/
scope: {
kind: "InputField",
name: "scope",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Zendesk OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Enables Loom integration for the organization.
*
* @deprecated Not available.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationLoom` |
* | **⚠ Deprecated** | Not available. |
* | **Nullability** | Required |
*/
export interface integrationLoom {
kind: "OutputField",
name: "integrationLoom",
arguments: {},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Integrates the organization with Salesforce.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSalesforce` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
export interface integrationSalesforce {
kind: "OutputField",
name: "integrationSalesforce",
arguments: {
/**
* The Salesforce OAuth code.
*/
code: {
kind: "InputField",
name: "code",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Salesforce installation subdomain.
*/
subdomain: {
kind: "InputField",
name: "subdomain",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Salesforce OAuth redirect URI.
*/
redirectUri: {
kind: "InputField",
name: "redirectUri",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Refreshes the Salesforce integration metadata.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSalesforceMetadataRefresh` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface integrationSalesforceMetadataRefresh {
kind: "OutputField",
name: "integrationSalesforceMetadataRefresh",
arguments: {
/**
* The ID of the integration to refresh metadata for.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Connects the user's personal account with an MCP server.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationMcpServerPersonalConnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface integrationMcpServerPersonalConnect {
kind: "OutputField",
name: "integrationMcpServerPersonalConnect",
arguments: {
/**
* The URL of the MCP server to connect with.
*/
serverUrl: {
kind: "InputField",
name: "serverUrl",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Connects the workspace with an MCP server.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationMcpServerConnect` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationMcpServerConnect {
kind: "OutputField",
name: "integrationMcpServerConnect",
arguments: {
/**
* The ID of the team to connect the MCP server to.
*/
teamId: {
kind: "InputField",
name: "teamId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The URL of the MCP server to connect with.
*/
serverUrl: {
kind: "InputField",
name: "serverUrl",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes an integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationDelete` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationDelete {
kind: "OutputField",
name: "integrationDelete",
arguments: {
/**
* Whether to skip deleting the installation on the external service side.
*/
skipInstallationDeletion: {
kind: "InputField",
name: "skipInstallationDeletion",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* The identifier of the integration to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Archives an integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface integrationArchive {
kind: "OutputField",
name: "integrationArchive",
arguments: {
/**
* The identifier of the integration to archive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [Internal] Enables Linear Agent Slack workflow access for a Slack or Slack Asks integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackWorkflowAccessUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationSlackWorkflowAccessUpdate {
kind: "OutputField",
name: "integrationSlackWorkflowAccessUpdate",
arguments: {
/**
* Whether to enable workflow access.
*/
enabled: {
kind: "InputField",
name: "enabled",
inlineType: [1, ],
namedType: $Schema.Boolean
},
/**
* The ID of the integration to toggle workflow access for.
*/
integrationId: {
kind: "InputField",
name: "integrationId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Requests a currently unavailable integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationRequestPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationRequest` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface integrationRequest {
kind: "OutputField",
name: "integrationRequest",
arguments: {
/**
* Integration request details.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.IntegrationRequestInput
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationRequestPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeUpdateCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface initiativeUpdateCreate {
kind: "OutputField",
name: "initiativeUpdateCreate",
arguments: {
/**
* The initiative update object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.InitiativeUpdateCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.InitiativeUpdatePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates an update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeUpdateUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface initiativeUpdateUpdate {
kind: "OutputField",
name: "initiativeUpdateUpdate",
arguments: {
/**
* A data to update the update with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.InitiativeUpdateUpdateInput
},
/**
* The identifier of the update to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.InitiativeUpdatePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Archives an initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdateArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeUpdateArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface initiativeUpdateArchive {
kind: "OutputField",
name: "initiativeUpdateArchive",
arguments: {
/**
* The identifier of the initiative update to archive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.InitiativeUpdateArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Create a notification to remind a user about an initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdateReminderPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.createInitiativeUpdateReminder` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface createInitiativeUpdateReminder {
kind: "OutputField",
name: "createInitiativeUpdateReminder",
arguments: {
/**
* The user identifier to whom the notification will be sent. By default, it is set to the initiative owner.
*/
userId: {
kind: "InputField",
name: "userId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The identifier of the initiative to remind about.
*/
initiativeId: {
kind: "InputField",
name: "initiativeId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.InitiativeUpdateReminderPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Unarchives an initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdateArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeUpdateUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface initiativeUpdateUnarchive {
kind: "OutputField",
name: "initiativeUpdateUnarchive",
arguments: {
/**
* The identifier of the initiative update to unarchive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.InitiativeUpdateArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new initiativeToProject join.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeToProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeToProjectCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface initiativeToProjectCreate {
kind: "OutputField",
name: "initiativeToProjectCreate",
arguments: {
/**
* The properties of the initiativeToProject to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.InitiativeToProjectCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.InitiativeToProjectPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a initiativeToProject.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeToProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeToProjectUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface initiativeToProjectUpdate {
kind: "OutputField",
name: "initiativeToProjectUpdate",
arguments: {
/**
* The properties of the initiativeToProject to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.InitiativeToProjectUpdateInput
},
/**
* The identifier of the initiativeToProject to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.InitiativeToProjectPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a initiativeToProject.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeToProjectDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface initiativeToProjectDelete {
kind: "OutputField",
name: "initiativeToProjectDelete",
arguments: {
/**
* The identifier of the initiativeToProject to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface initiativeCreate {
kind: "OutputField",
name: "initiativeCreate",
arguments: {
/**
* The properties of the initiative to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.InitiativeCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.InitiativePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface initiativeUpdate {
kind: "OutputField",
name: "initiativeUpdate",
arguments: {
/**
* The properties of the initiative to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.InitiativeUpdateInput
},
/**
* The identifier of the initiative to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.InitiativePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Archives a initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface initiativeArchive {
kind: "OutputField",
name: "initiativeArchive",
arguments: {
/**
* The identifier of the initiative to archive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.InitiativeArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Unarchives a initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface initiativeUnarchive {
kind: "OutputField",
name: "initiativeUnarchive",
arguments: {
/**
* The identifier of the initiative to unarchive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.InitiativeArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes (trashes) an initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface initiativeDelete {
kind: "OutputField",
name: "initiativeDelete",
arguments: {
/**
* The identifier of the initiative to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new initiative relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeRelationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeRelationCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface initiativeRelationCreate {
kind: "OutputField",
name: "initiativeRelationCreate",
arguments: {
/**
* The initiative relation to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.InitiativeRelationCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.InitiativeRelationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates an initiative relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeRelationUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface initiativeRelationUpdate {
kind: "OutputField",
name: "initiativeRelationUpdate",
arguments: {
/**
* The properties of the initiative relation to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.InitiativeRelationUpdateInput
},
/**
* The identifier of the initiative relation to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes an initiative relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeRelationDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface initiativeRelationDelete {
kind: "OutputField",
name: "initiativeRelationDelete",
arguments: {
/**
* The identifier of the initiative relation to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a Git target branch automation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitAutomationTargetBranchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.gitAutomationTargetBranchCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface gitAutomationTargetBranchCreate {
kind: "OutputField",
name: "gitAutomationTargetBranchCreate",
arguments: {
/**
* The Git target branch automation to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.GitAutomationTargetBranchCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.GitAutomationTargetBranchPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates an existing Git target branch automation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitAutomationTargetBranchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.gitAutomationTargetBranchUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface gitAutomationTargetBranchUpdate {
kind: "OutputField",
name: "gitAutomationTargetBranchUpdate",
arguments: {
/**
* The updates.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.GitAutomationTargetBranchUpdateInput
},
/**
* The identifier of the Git target branch automation to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.GitAutomationTargetBranchPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Archives a Git target branch automation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.gitAutomationTargetBranchDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface gitAutomationTargetBranchDelete {
kind: "OutputField",
name: "gitAutomationTargetBranchDelete",
arguments: {
/**
* The identifier of the Git target branch automation to archive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new automation state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitAutomationStatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.gitAutomationStateCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface gitAutomationStateCreate {
kind: "OutputField",
name: "gitAutomationStateCreate",
arguments: {
/**
* The automation state to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.GitAutomationStateCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.GitAutomationStatePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates an existing state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitAutomationStatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.gitAutomationStateUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface gitAutomationStateUpdate {
kind: "OutputField",
name: "gitAutomationStateUpdate",
arguments: {
/**
* The state to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.GitAutomationStateUpdateInput
},
/**
* The identifier of the state to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.GitAutomationStatePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Archives an automation state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.gitAutomationStateDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface gitAutomationStateDelete {
kind: "OutputField",
name: "gitAutomationStateDelete",
arguments: {
/**
* The identifier of the automation state to archive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* XHR request payload to upload an images, video and other attachments directly to Linear's cloud storage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UploadPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.fileUpload` |
* | **Nullability** | Required |
* | **Arguments** | 5 |
*/
export interface fileUpload {
kind: "OutputField",
name: "fileUpload",
arguments: {
/**
* Optional metadata.
*/
metaData: {
kind: "InputField",
name: "metaData",
inlineType: [0, ],
namedType: $Schema.JSON
},
/**
* Should the file be made publicly accessible (default: false).
*/
makePublic: {
kind: "InputField",
name: "makePublic",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* File size of the uploaded file.
*/
size: {
kind: "InputField",
name: "size",
inlineType: [1, ],
namedType: $Schema.Int
},
/**
* MIME type of the uploaded file.
*/
contentType: {
kind: "InputField",
name: "contentType",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Filename of the uploaded file.
*/
filename: {
kind: "InputField",
name: "filename",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.UploadPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* XHR request payload to upload a file for import, directly to Linear's cloud storage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UploadPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.importFileUpload` |
* | **Nullability** | Required |
* | **Arguments** | 4 |
*/
export interface importFileUpload {
kind: "OutputField",
name: "importFileUpload",
arguments: {
/**
* Optional metadata.
*/
metaData: {
kind: "InputField",
name: "metaData",
inlineType: [0, ],
namedType: $Schema.JSON
},
/**
* File size of the uploaded file.
*/
size: {
kind: "InputField",
name: "size",
inlineType: [1, ],
namedType: $Schema.Int
},
/**
* MIME type of the uploaded file.
*/
contentType: {
kind: "InputField",
name: "contentType",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Filename of the uploaded file.
*/
filename: {
kind: "InputField",
name: "filename",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.UploadPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Upload an image from an URL to Linear.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ImageUploadFromUrlPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.imageUploadFromUrl` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface imageUploadFromUrl {
kind: "OutputField",
name: "imageUploadFromUrl",
arguments: {
/**
* URL of the file to be uploaded to Linear.
*/
url: {
kind: "InputField",
name: "url",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ImageUploadFromUrlPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Permanently delete an uploaded file by asset URL. This should be used as a last resort and will break comments and documents that reference the asset.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FileUploadDeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.fileUploadDangerouslyDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface fileUploadDangerouslyDelete {
kind: "OutputField",
name: "fileUploadDangerouslyDelete",
arguments: {
/**
* The asset URL of the uploaded file to delete.
*/
assetUrl: {
kind: "InputField",
name: "assetUrl",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.FileUploadDeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new favorite (project, cycle etc).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FavoritePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.favoriteCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface favoriteCreate {
kind: "OutputField",
name: "favoriteCreate",
arguments: {
/**
* The favorite object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.FavoriteCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.FavoritePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FavoritePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.favoriteUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface favoriteUpdate {
kind: "OutputField",
name: "favoriteUpdate",
arguments: {
/**
* A partial favorite object to update the favorite with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.FavoriteUpdateInput
},
/**
* The identifier of the favorite to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.FavoritePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a favorite reference.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.favoriteDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface favoriteDelete {
kind: "OutputField",
name: "favoriteDelete",
arguments: {
/**
* The identifier of the favorite reference to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new entity link.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EntityExternalLinkPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.entityExternalLinkCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface entityExternalLinkCreate {
kind: "OutputField",
name: "entityExternalLinkCreate",
arguments: {
/**
* The entity link object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.EntityExternalLinkCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.EntityExternalLinkPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates an entity link.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EntityExternalLinkPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.entityExternalLinkUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface entityExternalLinkUpdate {
kind: "OutputField",
name: "entityExternalLinkUpdate",
arguments: {
/**
* The entity link object to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.EntityExternalLinkUpdateInput
},
/**
* The identifier of the entity link to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.EntityExternalLinkPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes an entity link.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.entityExternalLinkDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface entityExternalLinkDelete {
kind: "OutputField",
name: "entityExternalLinkDelete",
arguments: {
/**
* The identifier of the entity link to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a custom emoji.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EmojiPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.emojiCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface emojiCreate {
kind: "OutputField",
name: "emojiCreate",
arguments: {
/**
* The emoji object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.EmojiCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.EmojiPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes an emoji.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.emojiDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface emojiDelete {
kind: "OutputField",
name: "emojiDelete",
arguments: {
/**
* The identifier of the emoji to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Unsubscribes the user from one type of email.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EmailUnsubscribePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.emailUnsubscribe` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface emailUnsubscribe {
kind: "OutputField",
name: "emailUnsubscribe",
arguments: {
/**
* Unsubscription details.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.EmailUnsubscribeInput
}
},
inlineType: [1, ],
namedType: $Schema.EmailUnsubscribePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new email intake address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EmailIntakeAddressPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.emailIntakeAddressCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface emailIntakeAddressCreate {
kind: "OutputField",
name: "emailIntakeAddressCreate",
arguments: {
/**
* The email intake address object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.EmailIntakeAddressCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.EmailIntakeAddressPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Rotates an existing email intake address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EmailIntakeAddressPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.emailIntakeAddressRotate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface emailIntakeAddressRotate {
kind: "OutputField",
name: "emailIntakeAddressRotate",
arguments: {
/**
* The identifier of the email intake address.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.EmailIntakeAddressPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates an existing email intake address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EmailIntakeAddressPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.emailIntakeAddressUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface emailIntakeAddressUpdate {
kind: "OutputField",
name: "emailIntakeAddressUpdate",
arguments: {
/**
* The properties of the email intake address to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.EmailIntakeAddressUpdateInput
},
/**
* The identifier of the email intake address.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.EmailIntakeAddressPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes an email intake address object.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.emailIntakeAddressDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface emailIntakeAddressDelete {
kind: "OutputField",
name: "emailIntakeAddressDelete",
arguments: {
/**
* The identifier of the email intake address to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.documentCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface documentCreate {
kind: "OutputField",
name: "documentCreate",
arguments: {
/**
* The document to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.DocumentCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.DocumentPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.documentUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface documentUpdate {
kind: "OutputField",
name: "documentUpdate",
arguments: {
/**
* A partial document object to update the document with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.DocumentUpdateInput
},
/**
* The identifier of the document to update. Also the identifier from the URL is accepted.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DocumentPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes (trashes) a document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.documentDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface documentDelete {
kind: "OutputField",
name: "documentDelete",
arguments: {
/**
* The identifier of the document to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DocumentArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Restores a document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.documentUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface documentUnarchive {
kind: "OutputField",
name: "documentUnarchive",
arguments: {
/**
* The identifier of the document to restore.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DocumentArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CyclePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.cycleCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface cycleCreate {
kind: "OutputField",
name: "cycleCreate",
arguments: {
/**
* The cycle object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.CycleCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.CyclePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CyclePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.cycleUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface cycleUpdate {
kind: "OutputField",
name: "cycleUpdate",
arguments: {
/**
* A partial cycle object to update the cycle with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.CycleUpdateInput
},
/**
* The identifier of the cycle to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CyclePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Archives a cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CycleArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.cycleArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface cycleArchive {
kind: "OutputField",
name: "cycleArchive",
arguments: {
/**
* The identifier of the cycle to archive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CycleArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Shifts all cycles starts and ends by a certain number of days, starting from the provided cycle onwards.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CyclePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.cycleShiftAll` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface cycleShiftAll {
kind: "OutputField",
name: "cycleShiftAll",
arguments: {
/**
* A partial cycle object to update the cycle with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.CycleShiftAllInput
}
},
inlineType: [1, ],
namedType: $Schema.CyclePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Shifts all cycles starts and ends by a certain number of days, starting from the provided cycle onwards.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CyclePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.cycleStartUpcomingCycleToday` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface cycleStartUpcomingCycleToday {
kind: "OutputField",
name: "cycleStartUpcomingCycleToday",
arguments: {
/**
* The identifier of the cycle to start as of midnight today. Must be the upcoming cycle.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CyclePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new customer tier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerTierPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerTierCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface customerTierCreate {
kind: "OutputField",
name: "customerTierCreate",
arguments: {
/**
* The CustomerTier object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.CustomerTierCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.CustomerTierPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a customer tier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerTierPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerTierUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface customerTierUpdate {
kind: "OutputField",
name: "customerTierUpdate",
arguments: {
/**
* A partial CustomerTier object to update the CustomerTier with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.CustomerTierUpdateInput
},
/**
* The identifier of the customer tier to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CustomerTierPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a customer tier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerTierDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface customerTierDelete {
kind: "OutputField",
name: "customerTierDelete",
arguments: {
/**
* The identifier of the customer tier to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new customer status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerStatusPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerStatusCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface customerStatusCreate {
kind: "OutputField",
name: "customerStatusCreate",
arguments: {
/**
* The CustomerStatus object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.CustomerStatusCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.CustomerStatusPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a customer status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerStatusPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerStatusUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface customerStatusUpdate {
kind: "OutputField",
name: "customerStatusUpdate",
arguments: {
/**
* A partial CustomerStatus object to update the CustomerStatus with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.CustomerStatusUpdateInput
},
/**
* The identifier of the customer status to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CustomerStatusPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a customer status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerStatusDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface customerStatusDelete {
kind: "OutputField",
name: "customerStatusDelete",
arguments: {
/**
* The identifier of the customer status to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new customer.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface customerCreate {
kind: "OutputField",
name: "customerCreate",
arguments: {
/**
* The customer to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.CustomerCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.CustomerPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a customer
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface customerUpdate {
kind: "OutputField",
name: "customerUpdate",
arguments: {
/**
* The properties of the customer to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.CustomerUpdateInput
},
/**
* The identifier of the customer to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CustomerPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a customer.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface customerDelete {
kind: "OutputField",
name: "customerDelete",
arguments: {
/**
* The identifier of the customer to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Merges two customers.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerMerge` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface customerMerge {
kind: "OutputField",
name: "customerMerge",
arguments: {
/**
* The ID of the customer to merge. The needs of this customer will be transferred before it gets deleted.
*/
sourceCustomerId: {
kind: "InputField",
name: "sourceCustomerId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The ID of the target customer to merge into. The needs of this customer will be retained
*/
targetCustomerId: {
kind: "InputField",
name: "targetCustomerId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CustomerPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Upserts a customer, creating it if it doesn't exists, updating it otherwise. Matches against an existing customer with `id` or `externalId`
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerUpsert` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface customerUpsert {
kind: "OutputField",
name: "customerUpsert",
arguments: {
/**
* The customer to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.CustomerUpsertInput
}
},
inlineType: [1, ],
namedType: $Schema.CustomerPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Unsyncs a managed customer from the its current data source. External IDs mapping to the external source will be cleared.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerUnsync` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface customerUnsync {
kind: "OutputField",
name: "customerUnsync",
arguments: {
/**
* The identifier of the customer to unsync.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CustomerPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new customer need.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerNeedCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface customerNeedCreate {
kind: "OutputField",
name: "customerNeedCreate",
arguments: {
/**
* The customer need to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.CustomerNeedCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.CustomerNeedPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new customer need out of an attachment
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerNeedCreateFromAttachment` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface customerNeedCreateFromAttachment {
kind: "OutputField",
name: "customerNeedCreateFromAttachment",
arguments: {
/**
* The customer need to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.CustomerNeedCreateFromAttachmentInput
}
},
inlineType: [1, ],
namedType: $Schema.CustomerNeedPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a customer need
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedUpdatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerNeedUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface customerNeedUpdate {
kind: "OutputField",
name: "customerNeedUpdate",
arguments: {
/**
* The properties of the customer need to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.CustomerNeedUpdateInput
},
/**
* The identifier of the customer need to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CustomerNeedUpdatePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a customer need.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerNeedDelete` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface customerNeedDelete {
kind: "OutputField",
name: "customerNeedDelete",
arguments: {
/**
* Whether to keep the attachment associated with the customer need.
*/
keepAttachment: {
kind: "InputField",
name: "keepAttachment",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* The identifier of the customer need to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Archives a customer need.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerNeedArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface customerNeedArchive {
kind: "OutputField",
name: "customerNeedArchive",
arguments: {
/**
* The identifier of the customer need to archive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CustomerNeedArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Unarchives a customer need.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerNeedUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface customerNeedUnarchive {
kind: "OutputField",
name: "customerNeedUnarchive",
arguments: {
/**
* The identifier of the customer need to unarchive.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CustomerNeedArchivePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomViewPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customViewCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface customViewCreate {
kind: "OutputField",
name: "customViewCreate",
arguments: {
/**
* The properties of the custom view to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.CustomViewCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.CustomViewPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomViewPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customViewUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface customViewUpdate {
kind: "OutputField",
name: "customViewUpdate",
arguments: {
/**
* The properties of the custom view to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.CustomViewUpdateInput
},
/**
* The identifier of the custom view to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CustomViewPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customViewDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface customViewDelete {
kind: "OutputField",
name: "customViewDelete",
arguments: {
/**
* The identifier of the custom view to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Saves user message.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ContactPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.contactCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface contactCreate {
kind: "OutputField",
name: "contactCreate",
arguments: {
/**
* The contact entry to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ContactCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.ContactPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Saves sales pricing inquiry to Front.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ContactPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.contactSalesCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface contactSalesCreate {
kind: "OutputField",
name: "contactSalesCreate",
arguments: {
/**
* The contact entry to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.ContactSalesCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.ContactPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CommentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.commentCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface commentCreate {
kind: "OutputField",
name: "commentCreate",
arguments: {
/**
* The comment object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.CommentCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.CommentPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates a comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CommentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.commentUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
export interface commentUpdate {
kind: "OutputField",
name: "commentUpdate",
arguments: {
/**
* [INTERNAL] Flag to prevent setting editedAt when updating bodyData (used for background uploads).
*/
skipEditedAt: {
kind: "InputField",
name: "skipEditedAt",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* A partial comment object to update the comment with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.CommentUpdateInput
},
/**
* The identifier of the comment to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CommentPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes a comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.commentDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface commentDelete {
kind: "OutputField",
name: "commentDelete",
arguments: {
/**
* The identifier of the comment to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Resolves a comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CommentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.commentResolve` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface commentResolve {
kind: "OutputField",
name: "commentResolve",
arguments: {
resolvingCommentId: {
kind: "InputField",
name: "resolvingCommentId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The identifier of the comment to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CommentPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Unresolves a comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CommentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.commentUnresolve` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface commentUnresolve {
kind: "OutputField",
name: "commentUnresolve",
arguments: {
/**
* The identifier of the comment to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CommentPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Finds or creates a new user account by email and sends an email with token.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EmailUserAccountAuthChallengeResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.emailUserAccountAuthChallenge` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface emailUserAccountAuthChallenge {
kind: "OutputField",
name: "emailUserAccountAuthChallenge",
arguments: {
/**
* The data used for email authentication.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.EmailUserAccountAuthChallengeInput
}
},
inlineType: [1, ],
namedType: $Schema.EmailUserAccountAuthChallengeResponse
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Authenticates a user account via email and authentication token.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthResolverResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.emailTokenUserAccountAuth` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface emailTokenUserAccountAuth {
kind: "OutputField",
name: "emailTokenUserAccountAuth",
arguments: {
/**
* The data used for token authentication.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.TokenUserAccountAuthInput
}
},
inlineType: [1, ],
namedType: $Schema.AuthResolverResponse
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Authenticates a user account via email and authentication token for SAML.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthResolverResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.samlTokenUserAccountAuth` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface samlTokenUserAccountAuth {
kind: "OutputField",
name: "samlTokenUserAccountAuth",
arguments: {
/**
* The data used for token authentication.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.TokenUserAccountAuthInput
}
},
inlineType: [1, ],
namedType: $Schema.AuthResolverResponse
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Authenticate user account through Google OAuth. This is the 2nd step of OAuth flow.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthResolverResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.googleUserAccountAuth` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface googleUserAccountAuth {
kind: "OutputField",
name: "googleUserAccountAuth",
arguments: {
/**
* The data used for Google authentication.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.GoogleUserAccountAuthInput
}
},
inlineType: [1, ],
namedType: $Schema.AuthResolverResponse
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Starts passkey login process.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PasskeyLoginStartResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.passkeyLoginStart` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface passkeyLoginStart {
kind: "OutputField",
name: "passkeyLoginStart",
arguments: {
/**
* Random ID to start passkey login with.
*/
authId: {
kind: "InputField",
name: "authId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.PasskeyLoginStartResponse
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [INTERNAL] Finish passkey login process.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthResolverResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.passkeyLoginFinish` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface passkeyLoginFinish {
kind: "OutputField",
name: "passkeyLoginFinish",
arguments: {
response: {
kind: "InputField",
name: "response",
inlineType: [1, ],
namedType: $Schema.JSONObject
},
/**
* Random ID to start passkey login with.
*/
authId: {
kind: "InputField",
name: "authId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.AuthResolverResponse
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates an organization from onboarding.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CreateOrJoinOrganizationResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.createOrganizationFromOnboarding` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface createOrganizationFromOnboarding {
kind: "OutputField",
name: "createOrganizationFromOnboarding",
arguments: {
/**
* Onboarding survey.
*/
survey: {
kind: "InputField",
name: "survey",
inlineType: [0, ],
namedType: $Schema.OnboardingCustomerSurvey
},
/**
* Organization details for the new organization.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.CreateOrganizationInput
}
},
inlineType: [1, ],
namedType: $Schema.CreateOrJoinOrganizationResponse
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Join an organization from onboarding.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CreateOrJoinOrganizationResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.joinOrganizationFromOnboarding` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface joinOrganizationFromOnboarding {
kind: "OutputField",
name: "joinOrganizationFromOnboarding",
arguments: {
/**
* Organization details for the organization to join.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.JoinOrganizationInput
}
},
inlineType: [1, ],
namedType: $Schema.CreateOrJoinOrganizationResponse
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Leave an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CreateOrJoinOrganizationResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.leaveOrganization` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface leaveOrganization {
kind: "OutputField",
name: "leaveOrganization",
arguments: {
/**
* ID of the organization to leave.
*/
organizationId: {
kind: "InputField",
name: "organizationId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CreateOrJoinOrganizationResponse
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Logout the client.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.LogoutResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.logout` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface logout {
kind: "OutputField",
name: "logout",
arguments: {
/**
* The reason for logging out.
*/
reason: {
kind: "InputField",
name: "reason",
inlineType: [0, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.LogoutResponse
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Logout an individual session with its ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.LogoutResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.logoutSession` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface logoutSession {
kind: "OutputField",
name: "logoutSession",
arguments: {
/**
* ID of the session to logout.
*/
sessionId: {
kind: "InputField",
name: "sessionId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.LogoutResponse
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Logout all of user's sessions including the active one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.LogoutResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.logoutAllSessions` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface logoutAllSessions {
kind: "OutputField",
name: "logoutAllSessions",
arguments: {
/**
* The reason for logging out.
*/
reason: {
kind: "InputField",
name: "reason",
inlineType: [0, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.LogoutResponse
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Logout all of user's sessions excluding the current one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.LogoutResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.logoutOtherSessions` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface logoutOtherSessions {
kind: "OutputField",
name: "logoutOtherSessions",
arguments: {
/**
* The reason for logging out.
*/
reason: {
kind: "InputField",
name: "reason",
inlineType: [0, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.LogoutResponse
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new attachment, or updates existing if the same `url` and `issueId` is used.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface attachmentCreate {
kind: "OutputField",
name: "attachmentCreate",
arguments: {
/**
* The attachment object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.AttachmentCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.AttachmentPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates an existing issue attachment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface attachmentUpdate {
kind: "OutputField",
name: "attachmentUpdate",
arguments: {
/**
* A partial attachment object to update the attachment with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.AttachmentUpdateInput
},
/**
* The identifier of the attachment to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.AttachmentPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Link any url to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkURL` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface attachmentLinkURL {
kind: "OutputField",
name: "attachmentLinkURL",
arguments: {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*/
createAsUser: {
kind: "InputField",
name: "createAsUser",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*/
displayIconUrl: {
kind: "InputField",
name: "displayIconUrl",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The title to use for the attachment.
*/
title: {
kind: "InputField",
name: "title",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The url to link.
*/
url: {
kind: "InputField",
name: "url",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The issue for which to link the url. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId: {
kind: "InputField",
name: "issueId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The id for the attachment.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.AttachmentPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Link an existing GitLab MR to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkGitLabMR` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
export interface attachmentLinkGitLabMR {
kind: "OutputField",
name: "attachmentLinkGitLabMR",
arguments: {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*/
createAsUser: {
kind: "InputField",
name: "createAsUser",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*/
displayIconUrl: {
kind: "InputField",
name: "displayIconUrl",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The title to use for the attachment.
*/
title: {
kind: "InputField",
name: "title",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The issue for which to link the GitLab merge request. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId: {
kind: "InputField",
name: "issueId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Optional attachment ID that may be provided through the API.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The URL of the GitLab merge request to link.
*/
url: {
kind: "InputField",
name: "url",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The path name to the project including any (sub)groups. E.g. linear/main/client.
*/
projectPathWithNamespace: {
kind: "InputField",
name: "projectPathWithNamespace",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The GitLab merge request number to link.
*/
number: {
kind: "InputField",
name: "number",
inlineType: [1, ],
namedType: $Schema.Float
}
},
inlineType: [1, ],
namedType: $Schema.AttachmentPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Link a GitHub issue to a Linear issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkGitHubIssue` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface attachmentLinkGitHubIssue {
kind: "OutputField",
name: "attachmentLinkGitHubIssue",
arguments: {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*/
createAsUser: {
kind: "InputField",
name: "createAsUser",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*/
displayIconUrl: {
kind: "InputField",
name: "displayIconUrl",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The title to use for the attachment.
*/
title: {
kind: "InputField",
name: "title",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The Linear issue for which to link the GitHub issue. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId: {
kind: "InputField",
name: "issueId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Optional attachment ID that may be provided through the API.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The URL of the GitHub issue to link.
*/
url: {
kind: "InputField",
name: "url",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.AttachmentPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Link a GitHub pull request to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkGitHubPR` |
* | **Nullability** | Required |
* | **Arguments** | 10 |
*/
export interface attachmentLinkGitHubPR {
kind: "OutputField",
name: "attachmentLinkGitHubPR",
arguments: {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*/
createAsUser: {
kind: "InputField",
name: "createAsUser",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*/
displayIconUrl: {
kind: "InputField",
name: "displayIconUrl",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The title to use for the attachment.
*/
title: {
kind: "InputField",
name: "title",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The issue for which to link the GitHub pull request. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId: {
kind: "InputField",
name: "issueId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Optional attachment ID that may be provided through the API.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The URL of the GitHub pull request to link.
*/
url: {
kind: "InputField",
name: "url",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The owner of the GitHub repository.
*
* @deprecated No longer required
*/
owner: {
kind: "InputField",
name: "owner",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The name of the GitHub repository.
*
* @deprecated No longer required
*/
repo: {
kind: "InputField",
name: "repo",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The GitHub pull request number to link.
*
* @deprecated No longer required
*/
number: {
kind: "InputField",
name: "number",
inlineType: [0, ],
namedType: $Schema.Float
},
/**
* [Internal] The kind of link between the issue and the pull request.
*/
linkKind: {
kind: "InputField",
name: "linkKind",
inlineType: [0, ],
namedType: $Schema.GitLinkKind
}
},
inlineType: [1, ],
namedType: $Schema.AttachmentPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Link an existing Zendesk ticket to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkZendesk` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface attachmentLinkZendesk {
kind: "OutputField",
name: "attachmentLinkZendesk",
arguments: {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*/
createAsUser: {
kind: "InputField",
name: "createAsUser",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*/
displayIconUrl: {
kind: "InputField",
name: "displayIconUrl",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The title to use for the attachment.
*/
title: {
kind: "InputField",
name: "title",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The Zendesk ticket ID to link.
*/
ticketId: {
kind: "InputField",
name: "ticketId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The issue for which to link the Zendesk ticket. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId: {
kind: "InputField",
name: "issueId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Optional attachment ID that may be provided through the API.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The URL of the Zendesk ticket to link.
*/
url: {
kind: "InputField",
name: "url",
inlineType: [0, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.AttachmentPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Link an existing Discord message to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkDiscord` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
export interface attachmentLinkDiscord {
kind: "OutputField",
name: "attachmentLinkDiscord",
arguments: {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*/
createAsUser: {
kind: "InputField",
name: "createAsUser",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*/
displayIconUrl: {
kind: "InputField",
name: "displayIconUrl",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The title to use for the attachment.
*/
title: {
kind: "InputField",
name: "title",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The issue for which to link the Discord message. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId: {
kind: "InputField",
name: "issueId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Optional attachment ID that may be provided through the API.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The Discord channel ID for the message to link.
*/
channelId: {
kind: "InputField",
name: "channelId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Discord message ID for the message to link.
*/
messageId: {
kind: "InputField",
name: "messageId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Discord message URL for the message to link.
*/
url: {
kind: "InputField",
name: "url",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.AttachmentPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Begin syncing the thread for an existing Slack message attachment with a comment thread on its issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentSyncToSlack` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface attachmentSyncToSlack {
kind: "OutputField",
name: "attachmentSyncToSlack",
arguments: {
/**
* The ID of the Slack attachment to begin syncing.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.AttachmentPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Link an existing Slack message to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkSlack` |
* | **Nullability** | Required |
* | **Arguments** | 10 |
*/
export interface attachmentLinkSlack {
kind: "OutputField",
name: "attachmentLinkSlack",
arguments: {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*/
createAsUser: {
kind: "InputField",
name: "createAsUser",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*/
displayIconUrl: {
kind: "InputField",
name: "displayIconUrl",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The title to use for the attachment.
*/
title: {
kind: "InputField",
name: "title",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* [DEPRECATED] The Slack channel ID for the message to link.
*
* @deprecated This field is now ignored.
*/
channel: {
kind: "InputField",
name: "channel",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* [DEPRECATED] Unique identifier of either a thread's parent message or a message in the thread.
*
* @deprecated This field is now ignored.
*/
ts: {
kind: "InputField",
name: "ts",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* [DEPRECATED] The latest timestamp for the Slack message.
*
* @deprecated This field is now ignored.
*/
latest: {
kind: "InputField",
name: "latest",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The issue to which to link the Slack message. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId: {
kind: "InputField",
name: "issueId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Slack message URL for the message to link.
*/
url: {
kind: "InputField",
name: "url",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Optional attachment ID that may be provided through the API.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Whether to begin syncing the message's Slack thread with a comment thread on the issue.
*/
syncToCommentThread: {
kind: "InputField",
name: "syncToCommentThread",
inlineType: [0, ],
namedType: $Schema.Boolean
}
},
inlineType: [1, ],
namedType: $Schema.AttachmentPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Link an existing Front conversation to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FrontAttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkFront` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface attachmentLinkFront {
kind: "OutputField",
name: "attachmentLinkFront",
arguments: {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*/
createAsUser: {
kind: "InputField",
name: "createAsUser",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*/
displayIconUrl: {
kind: "InputField",
name: "displayIconUrl",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The title to use for the attachment.
*/
title: {
kind: "InputField",
name: "title",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The Front conversation ID to link.
*/
conversationId: {
kind: "InputField",
name: "conversationId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The issue for which to link the Front conversation. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId: {
kind: "InputField",
name: "issueId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Optional attachment ID that may be provided through the API.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.FrontAttachmentPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Link an existing Intercom conversation to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkIntercom` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface attachmentLinkIntercom {
kind: "OutputField",
name: "attachmentLinkIntercom",
arguments: {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*/
createAsUser: {
kind: "InputField",
name: "createAsUser",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*/
displayIconUrl: {
kind: "InputField",
name: "displayIconUrl",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The title to use for the attachment.
*/
title: {
kind: "InputField",
name: "title",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The Intercom conversation ID to link.
*/
conversationId: {
kind: "InputField",
name: "conversationId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* An optional Intercom conversation part ID to link to
*/
partId: {
kind: "InputField",
name: "partId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Optional attachment ID that may be provided through the API.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The issue for which to link the Intercom conversation. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId: {
kind: "InputField",
name: "issueId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.AttachmentPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Link an existing Jira issue to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkJiraIssue` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface attachmentLinkJiraIssue {
kind: "OutputField",
name: "attachmentLinkJiraIssue",
arguments: {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*/
createAsUser: {
kind: "InputField",
name: "createAsUser",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*/
displayIconUrl: {
kind: "InputField",
name: "displayIconUrl",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The title to use for the attachment.
*/
title: {
kind: "InputField",
name: "title",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The issue for which to link the Jira issue. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId: {
kind: "InputField",
name: "issueId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The Jira issue key or ID to link.
*/
jiraIssueId: {
kind: "InputField",
name: "jiraIssueId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Optional attachment ID that may be provided through the API.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Optional fallback URL to use if the Jira issue cannot be found.
*/
url: {
kind: "InputField",
name: "url",
inlineType: [0, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.AttachmentPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Link an existing Salesforce case to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkSalesforce` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface attachmentLinkSalesforce {
kind: "OutputField",
name: "attachmentLinkSalesforce",
arguments: {
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=app` mode.
*/
createAsUser: {
kind: "InputField",
name: "createAsUser",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating comments in `actor=app` mode.
*/
displayIconUrl: {
kind: "InputField",
name: "displayIconUrl",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The title to use for the attachment.
*/
title: {
kind: "InputField",
name: "title",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The issue for which to link the Salesforce case. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId: {
kind: "InputField",
name: "issueId",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Optional attachment ID that may be provided through the API.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The URL of the Salesforce case to link.
*/
url: {
kind: "InputField",
name: "url",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.AttachmentPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Deletes an issue attachment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface attachmentDelete {
kind: "OutputField",
name: "attachmentDelete",
arguments: {
/**
* The identifier of the attachment to delete.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DeletePayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new agent session on a rootcomment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSessionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.agentSessionCreateOnComment` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface agentSessionCreateOnComment {
kind: "OutputField",
name: "agentSessionCreateOnComment",
arguments: {
/**
* The agent session object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.AgentSessionCreateOnComment
}
},
inlineType: [1, ],
namedType: $Schema.AgentSessionPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates a new agent session on an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSessionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.agentSessionCreateOnIssue` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface agentSessionCreateOnIssue {
kind: "OutputField",
name: "agentSessionCreateOnIssue",
arguments: {
/**
* The agent session object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.AgentSessionCreateOnIssue
}
},
inlineType: [1, ],
namedType: $Schema.AgentSessionPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [Internal] Creates a new agent session on behalf of the current user
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSessionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.agentSessionCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface agentSessionCreate {
kind: "OutputField",
name: "agentSessionCreate",
arguments: {
/**
* The agent session object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.AgentSessionCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.AgentSessionPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates the externalUrl of an agent session, which is an agent-hosted page associated with this session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSessionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.agentSessionUpdateExternalUrl` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface agentSessionUpdateExternalUrl {
kind: "OutputField",
name: "agentSessionUpdateExternalUrl",
arguments: {
/**
* The agent session object to update.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.AgentSessionUpdateExternalUrlInput
},
/**
* The identifier of the agent session to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.AgentSessionPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Updates an agent session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSessionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.agentSessionUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface agentSessionUpdate {
kind: "OutputField",
name: "agentSessionUpdate",
arguments: {
/**
* A partial agent session object to update the agent session with.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.AgentSessionUpdateInput
},
/**
* The identifier of the agent session to update.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.AgentSessionPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* Creates an agent activity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivityPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.agentActivityCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface agentActivityCreate {
kind: "OutputField",
name: "agentActivityCreate",
arguments: {
/**
* The agent activity object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.AgentActivityCreateInput
}
},
inlineType: [1, ],
namedType: $Schema.AgentActivityPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Mutation}.
*
* [Internal] Creates a prompt agent activity from Linear user input.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivityPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.agentActivityCreatePrompt` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface agentActivityCreatePrompt {
kind: "OutputField",
name: "agentActivityCreatePrompt",
arguments: {
/**
* The prompt agent activity object to create.
*/
input: {
kind: "InputField",
name: "input",
inlineType: [1, ],
namedType: $Schema.AgentActivityCreatePromptInput
}
},
inlineType: [1, ],
namedType: $Schema.AgentActivityPayload
}
