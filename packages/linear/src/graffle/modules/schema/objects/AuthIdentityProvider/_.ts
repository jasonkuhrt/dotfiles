import type * as $Fields from './fields.js'

export * as AuthIdentityProvider from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An identity provider.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 13 |
*/
export interface AuthIdentityProvider {
kind: "Object",
name: "AuthIdentityProvider",
fields: {
__typename: $Fields.__typename,
createdAt: $Fields.createdAt,
id: $Fields.id,
defaultMigrated: $Fields.defaultMigrated,
type: $Fields.type,
samlEnabled: $Fields.samlEnabled,
ssoEndpoint: $Fields.ssoEndpoint,
ssoBinding: $Fields.ssoBinding,
ssoSignAlgo: $Fields.ssoSignAlgo,
issuerEntityId: $Fields.issuerEntityId,
spEntityId: $Fields.spEntityId,
ssoSigningCert: $Fields.ssoSigningCert,
priority: $Fields.priority,
scimEnabled: $Fields.scimEnabled
}
}