import type * as $Fields from './fields.js'

export * as OauthClientApproval from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Request to install OAuth clients on organizations and the response to the request.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 12 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface OauthClientApproval {
kind: "Object",
name: "OauthClientApproval",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
oauthClientId: $Fields.oauthClientId,
requesterId: $Fields.requesterId,
responderId: $Fields.responderId,
status: $Fields.status,
scopes: $Fields.scopes,
requestReason: $Fields.requestReason,
denyReason: $Fields.denyReason,
newlyRequestedScopes: $Fields.newlyRequestedScopes
}
}