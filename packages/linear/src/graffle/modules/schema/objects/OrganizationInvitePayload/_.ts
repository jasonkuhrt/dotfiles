import type * as $Fields from './fields.js'

export * as OrganizationInvitePayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
*/
export interface OrganizationInvitePayload {
kind: "Object",
name: "OrganizationInvitePayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
organizationInvite: $Fields.organizationInvite,
success: $Fields.success
}
}