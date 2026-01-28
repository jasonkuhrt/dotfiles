import type * as $Fields from './fields.js'

export * as OrganizationDomainSimplePayload from './fields.js'

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
* | **Fields** | 1 |
*/
export interface OrganizationDomainSimplePayload {
kind: "Object",
name: "OrganizationDomainSimplePayload",
fields: {
__typename: $Fields.__typename,
success: $Fields.success
}
}