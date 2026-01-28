import type * as $Fields from './fields.js'

export * as OrganizationInvite from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An invitation to the organization that has been sent via email.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 13 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface OrganizationInvite {
kind: "Object",
name: "OrganizationInvite",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
email: $Fields.email,
role: $Fields.role,
external: $Fields.external,
acceptedAt: $Fields.acceptedAt,
expiresAt: $Fields.expiresAt,
metadata: $Fields.metadata,
inviter: $Fields.inviter,
invitee: $Fields.invitee,
organization: $Fields.organization
}
}