import type { OrganizationInviteFullDetailsPayload } from '../objects/OrganizationInviteFullDetailsPayload/_.js'
import type { OrganizationAcceptedOrExpiredInviteDetailsPayload } from '../objects/OrganizationAcceptedOrExpiredInviteDetailsPayload/_.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union ↗} |
* | **Members** | 2 |
* | **Types** | {@link $Schema.OrganizationInviteFullDetailsPayload}, {@link $Schema.OrganizationAcceptedOrExpiredInviteDetailsPayload} |
*/
export interface OrganizationInviteDetailsPayload {
kind: "Union",
name: "OrganizationInviteDetailsPayload",
members: [OrganizationInviteFullDetailsPayload, OrganizationAcceptedOrExpiredInviteDetailsPayload],
membersUnion: OrganizationInviteFullDetailsPayload
| OrganizationAcceptedOrExpiredInviteDetailsPayload,
membersIndex: {
OrganizationInviteFullDetailsPayload: OrganizationInviteFullDetailsPayload,
OrganizationAcceptedOrExpiredInviteDetailsPayload: OrganizationAcceptedOrExpiredInviteDetailsPayload
}
}