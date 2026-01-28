import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"OrganizationAcceptedOrExpiredInviteDetailsPayload"`
*
* {@link https://graphql.org/learn/queries/#meta-fields | GraphQL __typename documentation}
*/
export interface __typename {
kind: "OutputField",
name: "__typename",
arguments: {},
inlineType: [1],
namedType: {
kind: "__typename",
value: "OrganizationAcceptedOrExpiredInviteDetailsPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationAcceptedOrExpiredInviteDetailsPayload}.
*
* The status of the invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationInviteStatus}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.OrganizationAcceptedOrExpiredInviteDetailsPayload} |
* | **Path** | `OrganizationAcceptedOrExpiredInviteDetailsPayload.status` |
* | **Nullability** | Required |
*/
export interface status {
kind: "OutputField",
name: "status",
arguments: {},
inlineType: [1, ],
namedType: $Schema.OrganizationInviteStatus
}
