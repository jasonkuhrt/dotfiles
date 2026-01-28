import type * as $Members from './members.js'

export * as SlackChannelType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* **Members:**
* - `DirectMessage`
* - `MultiPersonDirectMessage`
* - `Private`
* - `PrivateGroup`
* - `Public`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 5 |
*/
export interface SlackChannelType {
kind: "Enum",
name: "SlackChannelType",
members: $Members.DirectMessage
| $Members.MultiPersonDirectMessage
| $Members.Private
| $Members.PrivateGroup
| $Members.Public
}