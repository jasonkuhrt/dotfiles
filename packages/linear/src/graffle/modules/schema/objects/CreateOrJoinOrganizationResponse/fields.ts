import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"CreateOrJoinOrganizationResponse"`
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
value: "CreateOrJoinOrganizationResponse"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CreateOrJoinOrganizationResponse}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthOrganization}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CreateOrJoinOrganizationResponse} |
* | **Path** | `CreateOrJoinOrganizationResponse.organization` |
* | **Nullability** | Required |
*/
export interface organization {
kind: "OutputField",
name: "organization",
arguments: {},
inlineType: [1, ],
namedType: $Schema.AuthOrganization
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CreateOrJoinOrganizationResponse}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthUser}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CreateOrJoinOrganizationResponse} |
* | **Path** | `CreateOrJoinOrganizationResponse.user` |
* | **Nullability** | Required |
*/
export interface user {
kind: "OutputField",
name: "user",
arguments: {},
inlineType: [1, ],
namedType: $Schema.AuthUser
}
