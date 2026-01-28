import type * as $Fields from './fields.js'

export * as SesDomainIdentityDnsRecord from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A DNS record for a SES domain identity.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 4 |
*/
export interface SesDomainIdentityDnsRecord {
kind: "Object",
name: "SesDomainIdentityDnsRecord",
fields: {
__typename: $Fields.__typename,
type: $Fields.type,
name: $Fields.name,
content: $Fields.content,
isVerified: $Fields.isVerified
}
}