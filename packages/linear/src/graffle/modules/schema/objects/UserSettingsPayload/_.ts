import type * as $Fields from './fields.js'

export * as UserSettingsPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
*/
export interface UserSettingsPayload {
kind: "Object",
name: "UserSettingsPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
userSettings: $Fields.userSettings,
success: $Fields.success
}
}