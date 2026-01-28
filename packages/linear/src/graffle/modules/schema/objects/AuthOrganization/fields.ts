import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"AuthOrganization"`
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
value: "AuthOrganization"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthOrganization}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AuthOrganization} |
* | **Path** | `AuthOrganization.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthOrganization}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthOrganization} |
* | **Path** | `AuthOrganization.id` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthOrganization}.
*
* The organization's name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthOrganization} |
* | **Path** | `AuthOrganization.name` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthOrganization}.
*
* Whether the organization is enabled. Used as a superuser tool to lock down the org.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthOrganization} |
* | **Path** | `AuthOrganization.enabled` |
* | **Nullability** | Required |
*/
export interface enabled {
kind: "OutputField",
name: "enabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthOrganization}.
*
* The organization's unique URL key.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthOrganization} |
* | **Path** | `AuthOrganization.urlKey` |
* | **Nullability** | Required |
*/
export interface urlKey {
kind: "OutputField",
name: "urlKey",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthOrganization}.
*
* Previously used URL keys for the organization (last 3 are kept and redirected).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthOrganization} |
* | **Path** | `AuthOrganization.previousUrlKeys` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface previousUrlKeys {
kind: "OutputField",
name: "previousUrlKeys",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthOrganization}.
*
* The organization's logo URL.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthOrganization} |
* | **Path** | `AuthOrganization.logoUrl` |
* | **Nullability** | Optional |
*/
export interface logoUrl {
kind: "OutputField",
name: "logoUrl",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthOrganization}.
*
* The time at which deletion of the organization was requested.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AuthOrganization} |
* | **Path** | `AuthOrganization.deletionRequestedAt` |
* | **Nullability** | Optional |
*/
export interface deletionRequestedAt {
kind: "OutputField",
name: "deletionRequestedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthOrganization}.
*
* The feature release channel the organization belongs to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseChannel}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.AuthOrganization} |
* | **Path** | `AuthOrganization.releaseChannel` |
* | **Nullability** | Required |
*/
export interface releaseChannel {
kind: "OutputField",
name: "releaseChannel",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ReleaseChannel
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthOrganization}.
*
* Whether SAML authentication is enabled for organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthOrganization} |
* | **Path** | `AuthOrganization.samlEnabled` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthOrganization}.
*
* [INTERNAL] SAML settings
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AuthOrganization} |
* | **Path** | `AuthOrganization.samlSettings` |
* | **Nullability** | Optional |
*/
export interface samlSettings {
kind: "OutputField",
name: "samlSettings",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthOrganization}.
*
* Allowed authentication providers, empty array means all are allowed
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthOrganization} |
* | **Path** | `AuthOrganization.allowedAuthServices` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface allowedAuthServices {
kind: "OutputField",
name: "allowedAuthServices",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthOrganization}.
*
* Whether SCIM provisioning is enabled for organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthOrganization} |
* | **Path** | `AuthOrganization.scimEnabled` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthOrganization}.
*
* The email domain or URL key for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthOrganization} |
* | **Path** | `AuthOrganization.serviceId` |
* | **Nullability** | Required |
*/
export interface serviceId {
kind: "OutputField",
name: "serviceId",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthOrganization}.
*
* The region the organization is hosted in.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthOrganization} |
* | **Path** | `AuthOrganization.region` |
* | **Nullability** | Required |
*/
export interface region {
kind: "OutputField",
name: "region",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthOrganization}.
*
* Whether to hide other organizations for new users signing up with email domains claimed by this organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthOrganization} |
* | **Path** | `AuthOrganization.hideNonPrimaryOrganizations` |
* | **Nullability** | Required |
*/
export interface hideNonPrimaryOrganizations {
kind: "OutputField",
name: "hideNonPrimaryOrganizations",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthOrganization}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthOrganization} |
* | **Path** | `AuthOrganization.userCount` |
* | **Nullability** | Optional |
*/
export interface userCount {
kind: "OutputField",
name: "userCount",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Float
}
