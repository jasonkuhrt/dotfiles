import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"AsksWebSettings"`
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
value: "AsksWebSettings"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AsksWebSettings}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AsksWebSettings} |
* | **Path** | `AsksWebSettings.id` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AsksWebSettings}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AsksWebSettings} |
* | **Path** | `AsksWebSettings.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AsksWebSettings}.
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
* | **Parent** | {@link $Schema.AsksWebSettings} |
* | **Path** | `AsksWebSettings.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AsksWebSettings}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AsksWebSettings} |
* | **Path** | `AsksWebSettings.archivedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AsksWebSettings}.
*
* The organization that the Asks web settings are associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Organization}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.AsksWebSettings} |
* | **Path** | `AsksWebSettings.organization` |
* | **Nullability** | Required |
*/
export interface organization {
kind: "OutputField",
name: "organization",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Organization
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AsksWebSettings}.
*
* The user who created the Asks web settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.AsksWebSettings} |
* | **Path** | `AsksWebSettings.creator` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AsksWebSettings}.
*
* The custom domain for the Asks web form. If null, the default Linear-hosted domain will be used.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AsksWebSettings} |
* | **Path** | `AsksWebSettings.domain` |
* | **Nullability** | Optional |
*/
export interface domain {
kind: "OutputField",
name: "domain",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AsksWebSettings}.
*
* The email intake address associated with these Asks web settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EmailIntakeAddress} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.AsksWebSettings} |
* | **Path** | `AsksWebSettings.emailIntakeAddress` |
* | **Nullability** | Optional |
*/
export interface emailIntakeAddress {
kind: "OutputField",
name: "emailIntakeAddress",
arguments: {},
inlineType: [0, ],
namedType: $Schema.EmailIntakeAddress
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AsksWebSettings}.
*
* The identity provider for SAML authentication on this Asks web form.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IdentityProvider} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.AsksWebSettings} |
* | **Path** | `AsksWebSettings.identityProvider` |
* | **Nullability** | Optional |
*/
export interface identityProvider {
kind: "OutputField",
name: "identityProvider",
arguments: {},
inlineType: [0, ],
namedType: $Schema.IdentityProvider
}
