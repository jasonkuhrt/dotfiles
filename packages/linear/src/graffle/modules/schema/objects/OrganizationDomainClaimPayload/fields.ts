import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"OrganizationDomainClaimPayload"`
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
value: "OrganizationDomainClaimPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationDomainClaimPayload}.
*
* String to put into DNS for verification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationDomainClaimPayload} |
* | **Path** | `OrganizationDomainClaimPayload.verificationString` |
* | **Nullability** | Required |
*/
export interface verificationString {
kind: "OutputField",
name: "verificationString",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}
