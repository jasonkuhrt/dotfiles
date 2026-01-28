import type * as $Fields from './fields.js'

export * as AuthUser from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A user that has access to the the resources of an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 11 |
*/
export interface AuthUser {
kind: "Object",
name: "AuthUser",
fields: {
__typename: $Fields.__typename,
createdAt: $Fields.createdAt,
id: $Fields.id,
name: $Fields.name,
displayName: $Fields.displayName,
email: $Fields.email,
avatarUrl: $Fields.avatarUrl,
role: $Fields.role,
active: $Fields.active,
userAccountId: $Fields.userAccountId,
organization: $Fields.organization,
identityProvider: $Fields.identityProvider
}
}