import type * as $Fields from './fields.js'

export * as IdentityProvider from './fields.js'

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
* | **Fields** | 19 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface IdentityProvider {
kind: "Object",
name: "IdentityProvider",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
defaultMigrated: $Fields.defaultMigrated,
type: $Fields.type,
samlEnabled: $Fields.samlEnabled,
ssoEndpoint: $Fields.ssoEndpoint,
ssoBinding: $Fields.ssoBinding,
ssoSignAlgo: $Fields.ssoSignAlgo,
ssoSigningCert: $Fields.ssoSigningCert,
issuerEntityId: $Fields.issuerEntityId,
spEntityId: $Fields.spEntityId,
priority: $Fields.priority,
scimEnabled: $Fields.scimEnabled,
ownersGroupPush: $Fields.ownersGroupPush,
adminsGroupPush: $Fields.adminsGroupPush,
guestsGroupPush: $Fields.guestsGroupPush,
allowNameChange: $Fields.allowNameChange
}
}