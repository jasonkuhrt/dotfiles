import type * as $Members from './members.js'

export * as UserSettingsThemeDeviceType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* Device type for theme
*
* **Members:**
* - `desktop`
* - `mobileWeb`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 2 |
*/
export interface UserSettingsThemeDeviceType {
kind: "Enum",
name: "UserSettingsThemeDeviceType",
members: $Members.desktop
| $Members.mobileWeb
}