import type * as $Fields from './fields.js'

export * as UserSettingsCustomSidebarTheme from './fields.js'

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
export interface UserSettingsCustomSidebarTheme {
kind: "Object",
name: "UserSettingsCustomSidebarTheme",
fields: {
__typename: $Fields.__typename,
accent: $Fields.accent,
base: $Fields.base,
contrast: $Fields.contrast
}
}