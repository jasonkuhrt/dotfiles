import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"SsoUrlFromEmailResponse"`
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
value: "SsoUrlFromEmailResponse"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SsoUrlFromEmailResponse}.
*
* Whether the operation was successful.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SsoUrlFromEmailResponse} |
* | **Path** | `SsoUrlFromEmailResponse.success` |
* | **Nullability** | Required |
*/
export interface success {
kind: "OutputField",
name: "success",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SsoUrlFromEmailResponse}.
*
* SAML SSO sign-in URL.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SsoUrlFromEmailResponse} |
* | **Path** | `SsoUrlFromEmailResponse.samlSsoUrl` |
* | **Nullability** | Required |
*/
export interface samlSsoUrl {
kind: "OutputField",
name: "samlSsoUrl",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}
