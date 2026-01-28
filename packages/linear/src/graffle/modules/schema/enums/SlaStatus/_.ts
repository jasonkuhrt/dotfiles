import type * as $Members from './members.js'

export * as SlaStatus from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* **Members:**
* - `Breached`
* - `HighRisk`
* - `MediumRisk`
* - `LowRisk`
* - `Completed`
* - `Failed`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 6 |
*/
export interface SlaStatus {
kind: "Enum",
name: "SlaStatus",
members: $Members.Breached
| $Members.HighRisk
| $Members.MediumRisk
| $Members.LowRisk
| $Members.Completed
| $Members.Failed
}