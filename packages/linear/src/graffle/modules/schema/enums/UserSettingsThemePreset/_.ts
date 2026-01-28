import type * as $Members from './members.js'

export * as UserSettingsThemePreset from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* Theme preset options
*
* **Members:**
* - `system`
* - `light`
* - `pureLight`
* - `dark`
* - `magicBlue`
* - `classicDark`
* - `custom`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 7 |
*/
export interface UserSettingsThemePreset {
kind: "Enum",
name: "UserSettingsThemePreset",
members: $Members.system
| $Members.light
| $Members.pureLight
| $Members.dark
| $Members.magicBlue
| $Members.classicDark
| $Members.custom
}