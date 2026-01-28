import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"UserSettingsCustomSidebarTheme"`
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
value: "UserSettingsCustomSidebarTheme"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettingsCustomSidebarTheme}.
*
* The accent color in LCH format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettingsCustomSidebarTheme} |
* | **Path** | `UserSettingsCustomSidebarTheme.accent` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface accent {
kind: "OutputField",
name: "accent",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettingsCustomSidebarTheme}.
*
* The base color in LCH format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettingsCustomSidebarTheme} |
* | **Path** | `UserSettingsCustomSidebarTheme.base` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface base {
kind: "OutputField",
name: "base",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettingsCustomSidebarTheme}.
*
* The contrast value.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettingsCustomSidebarTheme} |
* | **Path** | `UserSettingsCustomSidebarTheme.contrast` |
* | **Nullability** | Required |
*/
export interface contrast {
kind: "OutputField",
name: "contrast",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Int
}
