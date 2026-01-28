import type * as $Members from './members.js'

export * as InitiativeUpdateHealthType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The health type when the update is created.
*
* **Members:**
* - `onTrack`
* - `atRisk`
* - `offTrack`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 3 |
*/
export interface InitiativeUpdateHealthType {
kind: "Enum",
name: "InitiativeUpdateHealthType",
members: $Members.onTrack
| $Members.atRisk
| $Members.offTrack
}