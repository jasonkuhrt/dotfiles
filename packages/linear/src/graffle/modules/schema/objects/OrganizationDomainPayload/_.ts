import type * as $Fields from './fields.js'

export * as OrganizationDomainPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* [INTERNAL] Organization domain operation response.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
*/
export interface OrganizationDomainPayload {
kind: "Object",
name: "OrganizationDomainPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
organizationDomain: $Fields.organizationDomain,
success: $Fields.success
}
}