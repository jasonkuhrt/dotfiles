import type * as $Members from './members.js'

export * as SendStrategy from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* **Members:**
* - `desktopThenPush`
* - `desktopAndPush`
* - `desktop`
* - `push`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 4 |
*/
export interface SendStrategy {
kind: "Enum",
name: "SendStrategy",
members: $Members.desktopThenPush
| $Members.desktopAndPush
| $Members.desktop
| $Members.push
}