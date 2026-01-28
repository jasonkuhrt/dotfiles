import type * as $Fields from './fields.js'

export * as ViewPreferencesPayload from './fields.js'

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
export interface ViewPreferencesPayload {
kind: "Object",
name: "ViewPreferencesPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
viewPreferences: $Fields.viewPreferences,
success: $Fields.success
}
}