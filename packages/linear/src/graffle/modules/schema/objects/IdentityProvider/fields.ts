import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"IdentityProvider"`
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
value: "IdentityProvider"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IdentityProvider}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IdentityProvider} |
* | **Path** | `IdentityProvider.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ID
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IdentityProvider}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IdentityProvider} |
* | **Path** | `IdentityProvider.createdAt` |
* | **Nullability** | Required |
*/
export interface createdAt {
kind: "OutputField",
name: "createdAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IdentityProvider}.
*
* The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
* been updated after creation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IdentityProvider} |
* | **Path** | `IdentityProvider.updatedAt` |
* | **Nullability** | Required |
*/
export interface updatedAt {
kind: "OutputField",
name: "updatedAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IdentityProvider}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IdentityProvider} |
* | **Path** | `IdentityProvider.archivedAt` |
* | **Nullability** | Optional |
*/
export interface archivedAt {
kind: "OutputField",
name: "archivedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IdentityProvider}.
*
* Whether the identity provider is the default identity provider migrated from organization level settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IdentityProvider} |
* | **Path** | `IdentityProvider.defaultMigrated` |
* | **Nullability** | Required |
*/
export interface defaultMigrated {
kind: "OutputField",
name: "defaultMigrated",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IdentityProvider}.
*
* The type of identity provider.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IdentityProviderType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.IdentityProvider} |
* | **Path** | `IdentityProvider.type` |
* | **Nullability** | Required |
*/
export interface type {
kind: "OutputField",
name: "type",
arguments: {},
inlineType: [1, ],
namedType: $Schema.IdentityProviderType
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IdentityProvider}.
*
* Whether SAML authentication is enabled for organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IdentityProvider} |
* | **Path** | `IdentityProvider.samlEnabled` |
* | **Nullability** | Required |
*/
export interface samlEnabled {
kind: "OutputField",
name: "samlEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IdentityProvider}.
*
* Sign in endpoint URL for the identity provider.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IdentityProvider} |
* | **Path** | `IdentityProvider.ssoEndpoint` |
* | **Nullability** | Optional |
*/
export interface ssoEndpoint {
kind: "OutputField",
name: "ssoEndpoint",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IdentityProvider}.
*
* Binding method for authentication call. Can be either `post` (default) or `redirect`.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IdentityProvider} |
* | **Path** | `IdentityProvider.ssoBinding` |
* | **Nullability** | Optional |
*/
export interface ssoBinding {
kind: "OutputField",
name: "ssoBinding",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IdentityProvider}.
*
* The algorithm of the Signing Certificate. Can be one of `sha1`, `sha256` (default), or `sha512`.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IdentityProvider} |
* | **Path** | `IdentityProvider.ssoSignAlgo` |
* | **Nullability** | Optional |
*/
export interface ssoSignAlgo {
kind: "OutputField",
name: "ssoSignAlgo",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IdentityProvider}.
*
* X.509 Signing Certificate in string form.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IdentityProvider} |
* | **Path** | `IdentityProvider.ssoSigningCert` |
* | **Nullability** | Optional |
*/
export interface ssoSigningCert {
kind: "OutputField",
name: "ssoSigningCert",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IdentityProvider}.
*
* The issuer's custom entity ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IdentityProvider} |
* | **Path** | `IdentityProvider.issuerEntityId` |
* | **Nullability** | Optional |
*/
export interface issuerEntityId {
kind: "OutputField",
name: "issuerEntityId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IdentityProvider}.
*
* The service provider (Linear) custom entity ID. Defaults to https://auth.linear.app/sso
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IdentityProvider} |
* | **Path** | `IdentityProvider.spEntityId` |
* | **Nullability** | Optional |
*/
export interface spEntityId {
kind: "OutputField",
name: "spEntityId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IdentityProvider}.
*
* The SAML priority used to pick default workspace in SAML SP initiated flow, when same domain is claimed for SAML by multiple workspaces. Lower priority value means higher preference.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IdentityProvider} |
* | **Path** | `IdentityProvider.priority` |
* | **Nullability** | Optional |
*/
export interface priority {
kind: "OutputField",
name: "priority",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IdentityProvider}.
*
* Whether SCIM provisioning is enabled for organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IdentityProvider} |
* | **Path** | `IdentityProvider.scimEnabled` |
* | **Nullability** | Required |
*/
export interface scimEnabled {
kind: "OutputField",
name: "scimEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IdentityProvider}.
*
* [INTERNAL] SCIM owners group push settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IdentityProvider} |
* | **Path** | `IdentityProvider.ownersGroupPush` |
* | **Nullability** | Optional |
*/
export interface ownersGroupPush {
kind: "OutputField",
name: "ownersGroupPush",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IdentityProvider}.
*
* [INTERNAL] SCIM admins group push settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IdentityProvider} |
* | **Path** | `IdentityProvider.adminsGroupPush` |
* | **Nullability** | Optional |
*/
export interface adminsGroupPush {
kind: "OutputField",
name: "adminsGroupPush",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IdentityProvider}.
*
* [INTERNAL] SCIM guests group push settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IdentityProvider} |
* | **Path** | `IdentityProvider.guestsGroupPush` |
* | **Nullability** | Optional |
*/
export interface guestsGroupPush {
kind: "OutputField",
name: "guestsGroupPush",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IdentityProvider}.
*
* Whether users are allowed to change their name and display name even if SCIM is enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IdentityProvider} |
* | **Path** | `IdentityProvider.allowNameChange` |
* | **Nullability** | Required |
*/
export interface allowNameChange {
kind: "OutputField",
name: "allowNameChange",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}
