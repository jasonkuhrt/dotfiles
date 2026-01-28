import type * as $Fields from './fields.js'

export * as OrganizationPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
*/
export interface OrganizationPayload {
kind: "Object",
name: "OrganizationPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
organization: $Fields.organization,
success: $Fields.success
}
}