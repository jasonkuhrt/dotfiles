import type * as $Fields from './fields.js'

export * as AuthResolverResponse from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 10 |
*/
export interface AuthResolverResponse {
kind: "Object",
name: "AuthResolverResponse",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
email: $Fields.email,
allowDomainAccess: $Fields.allowDomainAccess,
users: $Fields.users,
lockedUsers: $Fields.lockedUsers,
availableOrganizations: $Fields.availableOrganizations,
lockedOrganizations: $Fields.lockedOrganizations,
lastUsedOrganizationId: $Fields.lastUsedOrganizationId,
service: $Fields.service,
token: $Fields.token
}
}