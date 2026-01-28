import type * as $Fields from './fields.js'

export * as SesDomainIdentity from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* SES domain identity used for sending emails from a custom domain.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 10 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface SesDomainIdentity {
kind: "Object",
name: "SesDomainIdentity",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
domain: $Fields.domain,
region: $Fields.region,
organization: $Fields.organization,
creator: $Fields.creator,
canSendFromCustomDomain: $Fields.canSendFromCustomDomain,
dnsRecords: $Fields.dnsRecords
}
}