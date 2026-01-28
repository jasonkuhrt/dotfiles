import type * as $Fields from './fields.js'

export * as UserSettingsCustomTheme from './fields.js'

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
export interface UserSettingsCustomTheme {
kind: "Object",
name: "UserSettingsCustomTheme",
fields: {
__typename: $Fields.__typename,
accent: $Fields.accent,
base: $Fields.base,
contrast: $Fields.contrast,
sidebar: $Fields.sidebar
}
}