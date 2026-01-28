import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"UserSettingsTheme"`
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
value: "UserSettingsTheme"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettingsTheme}.
*
* The theme preset.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserSettingsThemePreset}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.UserSettingsTheme} |
* | **Path** | `UserSettingsTheme.preset` |
* | **Nullability** | Required |
*/
export interface preset {
kind: "OutputField",
name: "preset",
arguments: {},
inlineType: [1, ],
namedType: $Schema.UserSettingsThemePreset
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.UserSettingsTheme}.
*
* The custom theme definition, only present when preset is 'custom'.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserSettingsCustomTheme} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.UserSettingsTheme} |
* | **Path** | `UserSettingsTheme.custom` |
* | **Nullability** | Optional |
*/
export interface custom {
kind: "OutputField",
name: "custom",
arguments: {},
inlineType: [0, ],
namedType: $Schema.UserSettingsCustomTheme
}
