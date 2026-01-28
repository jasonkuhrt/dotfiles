import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"UserSettingsCustomTheme"`
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
value: "UserSettingsCustomTheme"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettingsCustomTheme}.
*
* The accent color in LCH format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettingsCustomTheme} |
* | **Path** | `UserSettingsCustomTheme.accent` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettingsCustomTheme}.
*
* The base color in LCH format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettingsCustomTheme} |
* | **Path** | `UserSettingsCustomTheme.base` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettingsCustomTheme}.
*
* The contrast value.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.UserSettingsCustomTheme} |
* | **Path** | `UserSettingsCustomTheme.contrast` |
* | **Nullability** | Required |
*/
export interface contrast {
kind: "OutputField",
name: "contrast",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Int
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettingsCustomTheme}.
*
* Optional sidebar theme colors.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserSettingsCustomSidebarTheme} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.UserSettingsCustomTheme} |
* | **Path** | `UserSettingsCustomTheme.sidebar` |
* | **Nullability** | Optional |
*/
export interface sidebar {
kind: "OutputField",
name: "sidebar",
arguments: {},
inlineType: [0, ],
namedType: $Schema.UserSettingsCustomSidebarTheme
}
