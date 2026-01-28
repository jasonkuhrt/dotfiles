import type * as $Members from './members.js'

export * as UserSettingsThemeMode from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* Theme color mode
*
* **Members:**
* - `light`
* - `dark`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 2 |
*/
export interface UserSettingsThemeMode {
kind: "Enum",
name: "UserSettingsThemeMode",
members: $Members.light
| $Members.dark
}