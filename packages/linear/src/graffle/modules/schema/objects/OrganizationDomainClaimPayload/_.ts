import type * as $Fields from './fields.js'

export * as OrganizationDomainClaimPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* [INTERNAL] Domain claim request response.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 1 |
*/
export interface OrganizationDomainClaimPayload {
kind: "Object",
name: "OrganizationDomainClaimPayload",
fields: {
__typename: $Fields.__typename,
verificationString: $Fields.verificationString
}
}