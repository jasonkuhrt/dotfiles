import type * as $Members from './members.js'

export * as IssueRelationType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The type of the issue relation.
*
* **Members:**
* - `blocks`
* - `duplicate`
* - `related`
* - `similar`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 4 |
*/
export interface IssueRelationType {
kind: "Enum",
name: "IssueRelationType",
members: $Members.blocks
| $Members.duplicate
| $Members.related
| $Members.similar
}