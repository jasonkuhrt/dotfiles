import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"AuthIdentityProvider"`
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
value: "AuthIdentityProvider"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthIdentityProvider}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AuthIdentityProvider} |
* | **Path** | `AuthIdentityProvider.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthIdentityProvider}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthIdentityProvider} |
* | **Path** | `AuthIdentityProvider.id` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthIdentityProvider}.
*
* Whether the identity provider is the default identity provider migrated from organization level settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthIdentityProvider} |
* | **Path** | `AuthIdentityProvider.defaultMigrated` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthIdentityProvider}.
*
* The type of identity provider.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IdentityProviderType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.AuthIdentityProvider} |
* | **Path** | `AuthIdentityProvider.type` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthIdentityProvider}.
*
* Whether SAML authentication is enabled for organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthIdentityProvider} |
* | **Path** | `AuthIdentityProvider.samlEnabled` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthIdentityProvider}.
*
* Sign in endpoint URL for the identity provider.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthIdentityProvider} |
* | **Path** | `AuthIdentityProvider.ssoEndpoint` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthIdentityProvider}.
*
* Binding method for authentication call. Can be either `post` (default) or `redirect`.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthIdentityProvider} |
* | **Path** | `AuthIdentityProvider.ssoBinding` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthIdentityProvider}.
*
* The algorithm of the Signing Certificate. Can be one of `sha1`, `sha256` (default), or `sha512`.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthIdentityProvider} |
* | **Path** | `AuthIdentityProvider.ssoSignAlgo` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthIdentityProvider}.
*
* The issuer's custom entity ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthIdentityProvider} |
* | **Path** | `AuthIdentityProvider.issuerEntityId` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthIdentityProvider}.
*
* The service provider (Linear) custom entity ID. Defaults to https://auth.linear.app/sso
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthIdentityProvider} |
* | **Path** | `AuthIdentityProvider.spEntityId` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthIdentityProvider}.
*
* X.509 Signing Certificate in string form.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthIdentityProvider} |
* | **Path** | `AuthIdentityProvider.ssoSigningCert` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthIdentityProvider}.
*
* The SAML priority used to pick default workspace in SAML SP initiated flow, when same domain is claimed for SAML by multiple workspaces. Lower priority value means higher preference.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthIdentityProvider} |
* | **Path** | `AuthIdentityProvider.priority` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthIdentityProvider}.
*
* Whether SCIM provisioning is enabled for organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthIdentityProvider} |
* | **Path** | `AuthIdentityProvider.scimEnabled` |
* | **Nullability** | Required |
*/
export interface scimEnabled {
kind: "OutputField",
name: "scimEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}
