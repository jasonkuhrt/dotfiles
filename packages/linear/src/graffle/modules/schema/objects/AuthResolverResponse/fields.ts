import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"AuthResolverResponse"`
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
value: "AuthResolverResponse"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthResolverResponse}.
*
* User account ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthResolverResponse} |
* | **Path** | `AuthResolverResponse.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthResolverResponse}.
*
* Email for the authenticated account.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthResolverResponse} |
* | **Path** | `AuthResolverResponse.email` |
* | **Nullability** | Required |
*/
export interface email {
kind: "OutputField",
name: "email",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthResolverResponse}.
*
* Should the signup flow allow access for the domain.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthResolverResponse} |
* | **Path** | `AuthResolverResponse.allowDomainAccess` |
* | **Nullability** | Optional |
*/
export interface allowDomainAccess {
kind: "OutputField",
name: "allowDomainAccess",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthResolverResponse}.
*
* List of active users that belong to the user account.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthUser}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.AuthResolverResponse} |
* | **Path** | `AuthResolverResponse.users` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface users {
kind: "OutputField",
name: "users",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.AuthUser
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthResolverResponse}.
*
* List of locked users that are locked by login restrictions
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthUser}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.AuthResolverResponse} |
* | **Path** | `AuthResolverResponse.lockedUsers` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface lockedUsers {
kind: "OutputField",
name: "lockedUsers",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.AuthUser
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthResolverResponse}.
*
* List of organizations allowing this user account to join automatically.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthOrganization}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.AuthResolverResponse} |
* | **Path** | `AuthResolverResponse.availableOrganizations` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface availableOrganizations {
kind: "OutputField",
name: "availableOrganizations",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.AuthOrganization
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthResolverResponse}.
*
* List of organization available to this user account but locked due to the current auth method.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthOrganization}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.AuthResolverResponse} |
* | **Path** | `AuthResolverResponse.lockedOrganizations` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface lockedOrganizations {
kind: "OutputField",
name: "lockedOrganizations",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.AuthOrganization
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthResolverResponse}.
*
* ID of the organization last accessed by the user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthResolverResponse} |
* | **Path** | `AuthResolverResponse.lastUsedOrganizationId` |
* | **Nullability** | Optional |
*/
export interface lastUsedOrganizationId {
kind: "OutputField",
name: "lastUsedOrganizationId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthResolverResponse}.
*
* The authentication service used for the current session (e.g., google, email, saml).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthResolverResponse} |
* | **Path** | `AuthResolverResponse.service` |
* | **Nullability** | Optional |
*/
export interface service {
kind: "OutputField",
name: "service",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthResolverResponse}.
*
* Application token.
*
* @deprecated Deprecated and not used anymore. Never populated.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthResolverResponse} |
* | **Path** | `AuthResolverResponse.token` |
* | **⚠ Deprecated** | Deprecated and not used anymore. Never populated. |
* | **Nullability** | Optional |
*/
export interface token {
kind: "OutputField",
name: "token",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}
