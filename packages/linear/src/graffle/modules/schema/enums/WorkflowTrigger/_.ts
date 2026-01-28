import type * as $Members from './members.js'

export * as WorkflowTrigger from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* **Members:**
* - `entityCreated`
* - `entityUpdated`
* - `entityCreatedOrUpdated`
* - `entityRemoved`
* - `entityUnarchived`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 5 |
*/
export interface WorkflowTrigger {
kind: "Enum",
name: "WorkflowTrigger",
members: $Members.entityCreated
| $Members.entityUpdated
| $Members.entityCreatedOrUpdated
| $Members.entityRemoved
| $Members.entityUnarchived
}