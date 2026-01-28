import type * as $Members from './members.js'

export * as ProjectUpdateHealthType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The health type when the project update is created.
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
export interface ProjectUpdateHealthType {
kind: "Enum",
name: "ProjectUpdateHealthType",
members: $Members.onTrack
| $Members.atRisk
| $Members.offTrack
}