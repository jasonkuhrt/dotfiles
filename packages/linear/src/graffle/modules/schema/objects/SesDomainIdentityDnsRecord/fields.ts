import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"SesDomainIdentityDnsRecord"`
*
* {@link https://graphql.org/learn/queries/#meta-fields | GraphQL __typename documentation}
*/
export interface __typename {
kind: "OutputField",
name: "__typename",
arguments: {},
inlineType: [1],
namedType: {
kind: "__typename",
value: "SesDomainIdentityDnsRecord"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SesDomainIdentityDnsRecord}.
*
* The type of the DNS record.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SesDomainIdentityDnsRecord} |
* | **Path** | `SesDomainIdentityDnsRecord.type` |
* | **Nullability** | Required |
*/
export interface type {
kind: "OutputField",
name: "type",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SesDomainIdentityDnsRecord}.
*
* The name of the DNS record.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SesDomainIdentityDnsRecord} |
* | **Path** | `SesDomainIdentityDnsRecord.name` |
* | **Nullability** | Required |
*/
export interface name {
kind: "OutputField",
name: "name",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SesDomainIdentityDnsRecord}.
*
* The content of the DNS record.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SesDomainIdentityDnsRecord} |
* | **Path** | `SesDomainIdentityDnsRecord.content` |
* | **Nullability** | Required |
*/
export interface content {
kind: "OutputField",
name: "content",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SesDomainIdentityDnsRecord}.
*
* Whether the DNS record is verified in the domain's DNS configuration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SesDomainIdentityDnsRecord} |
* | **Path** | `SesDomainIdentityDnsRecord.isVerified` |
* | **Nullability** | Required |
*/
export interface isVerified {
kind: "OutputField",
name: "isVerified",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}
