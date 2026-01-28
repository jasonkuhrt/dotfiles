import type * as $Fields from './fields.js'

export * as CreateOrJoinOrganizationResponse from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 2 |
*/
export interface CreateOrJoinOrganizationResponse {
kind: "Object",
name: "CreateOrJoinOrganizationResponse",
fields: {
__typename: $Fields.__typename,
organization: $Fields.organization,
user: $Fields.user
}
}