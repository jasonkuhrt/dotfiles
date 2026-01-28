import type * as $Fields from './fields.js'

export * as UserSettingsFlagPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 4 |
*/
export interface UserSettingsFlagPayload {
kind: "Object",
name: "UserSettingsFlagPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
flag: $Fields.flag,
value: $Fields.value,
success: $Fields.success
}
}