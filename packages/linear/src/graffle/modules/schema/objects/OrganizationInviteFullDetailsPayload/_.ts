import type * as $Fields from './fields.js'

export * as OrganizationInviteFullDetailsPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 11 |
*/
export interface OrganizationInviteFullDetailsPayload {
kind: "Object",
name: "OrganizationInviteFullDetailsPayload",
fields: {
__typename: $Fields.__typename,
status: $Fields.status,
inviter: $Fields.inviter,
email: $Fields.email,
role: $Fields.role,
createdAt: $Fields.createdAt,
organizationName: $Fields.organizationName,
organizationId: $Fields.organizationId,
organizationLogoUrl: $Fields.organizationLogoUrl,
accepted: $Fields.accepted,
expired: $Fields.expired,
allowedAuthServices: $Fields.allowedAuthServices
}
}