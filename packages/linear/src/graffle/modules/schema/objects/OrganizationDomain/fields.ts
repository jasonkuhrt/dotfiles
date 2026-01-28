import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"OrganizationDomain"`
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
value: "OrganizationDomain"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationDomain}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationDomain} |
* | **Path** | `OrganizationDomain.id` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationDomain}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.OrganizationDomain} |
* | **Path** | `OrganizationDomain.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationDomain}.
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
* | **Parent** | {@link $Schema.OrganizationDomain} |
* | **Path** | `OrganizationDomain.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationDomain}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.OrganizationDomain} |
* | **Path** | `OrganizationDomain.archivedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationDomain}.
*
* The identity provider the domain belongs to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IdentityProvider} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.OrganizationDomain} |
* | **Path** | `OrganizationDomain.identityProvider` |
* | **Nullability** | Optional |
*/
export interface identityProvider {
kind: "OutputField",
name: "identityProvider",
arguments: {},
inlineType: [0, ],
namedType: $Schema.IdentityProvider
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationDomain}.
*
* Domain name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationDomain} |
* | **Path** | `OrganizationDomain.name` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationDomain}.
*
* Is this domain verified.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationDomain} |
* | **Path** | `OrganizationDomain.verified` |
* | **Nullability** | Required |
*/
export interface verified {
kind: "OutputField",
name: "verified",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationDomain}.
*
* E-mail used to verify this domain.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationDomain} |
* | **Path** | `OrganizationDomain.verificationEmail` |
* | **Nullability** | Optional |
*/
export interface verificationEmail {
kind: "OutputField",
name: "verificationEmail",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationDomain}.
*
* The user who added the domain.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.OrganizationDomain} |
* | **Path** | `OrganizationDomain.creator` |
* | **Nullability** | Optional |
*/
export interface creator {
kind: "OutputField",
name: "creator",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationDomain}.
*
* What type of auth is the domain used for.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationDomainAuthType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.OrganizationDomain} |
* | **Path** | `OrganizationDomain.authType` |
* | **Nullability** | Required |
*/
export interface authType {
kind: "OutputField",
name: "authType",
arguments: {},
inlineType: [1, ],
namedType: $Schema.OrganizationDomainAuthType
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationDomain}.
*
* Whether the domains was claimed by the organization through DNS verification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationDomain} |
* | **Path** | `OrganizationDomain.claimed` |
* | **Nullability** | Optional |
*/
export interface claimed {
kind: "OutputField",
name: "claimed",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationDomain}.
*
* Prevent users with this domain to create new workspaces.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationDomain} |
* | **Path** | `OrganizationDomain.disableOrganizationCreation` |
* | **Nullability** | Optional |
*/
export interface disableOrganizationCreation {
kind: "OutputField",
name: "disableOrganizationCreation",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}
