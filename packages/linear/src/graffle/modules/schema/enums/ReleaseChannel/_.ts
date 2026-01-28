import type * as $Members from './members.js'

export * as ReleaseChannel from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* Features release channel.
*
* **Members:**
* - `development`
* - `internal`
* - `privateBeta`
* - `beta`
* - `preRelease`
* - `public`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 6 |
*/
export interface ReleaseChannel {
kind: "Enum",
name: "ReleaseChannel",
members: $Members.development
| $Members.internal
| $Members.privateBeta
| $Members.beta
| $Members.preRelease
| $Members.public
}