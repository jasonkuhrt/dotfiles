import type * as $Fields from './fields.js'

export * as UserSettingsFlagsResetPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 2 |
*/
export interface UserSettingsFlagsResetPayload {
kind: "Object",
name: "UserSettingsFlagsResetPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
success: $Fields.success
}
}