import type * as $Fields from './fields.js'

export * as OrganizationDomain from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Defines the use of a domain by an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 12 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface OrganizationDomain {
kind: "Object",
name: "OrganizationDomain",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
identityProvider: $Fields.identityProvider,
name: $Fields.name,
verified: $Fields.verified,
verificationEmail: $Fields.verificationEmail,
creator: $Fields.creator,
authType: $Fields.authType,
claimed: $Fields.claimed,
disableOrganizationCreation: $Fields.disableOrganizationCreation
}
}