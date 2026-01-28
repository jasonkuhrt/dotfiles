import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"OauthClientApproval"`
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
value: "OauthClientApproval"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OauthClientApproval}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OauthClientApproval} |
* | **Path** | `OauthClientApproval.id` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OauthClientApproval}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.OauthClientApproval} |
* | **Path** | `OauthClientApproval.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OauthClientApproval}.
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
* | **Parent** | {@link $Schema.OauthClientApproval} |
* | **Path** | `OauthClientApproval.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OauthClientApproval}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.OauthClientApproval} |
* | **Path** | `OauthClientApproval.archivedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OauthClientApproval}.
*
* The uuid of the OAuth client being requested for installation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OauthClientApproval} |
* | **Path** | `OauthClientApproval.oauthClientId` |
* | **Nullability** | Required |
*/
export interface oauthClientId {
kind: "OutputField",
name: "oauthClientId",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OauthClientApproval}.
*
* The person who requested installing the OAuth client.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OauthClientApproval} |
* | **Path** | `OauthClientApproval.requesterId` |
* | **Nullability** | Required |
*/
export interface requesterId {
kind: "OutputField",
name: "requesterId",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OauthClientApproval}.
*
* The person who responded to the request to install the OAuth client.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OauthClientApproval} |
* | **Path** | `OauthClientApproval.responderId` |
* | **Nullability** | Optional |
*/
export interface responderId {
kind: "OutputField",
name: "responderId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OauthClientApproval}.
*
* The status for the OAuth client approval request.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OAuthClientApprovalStatus}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.OauthClientApproval} |
* | **Path** | `OauthClientApproval.status` |
* | **Nullability** | Required |
*/
export interface status {
kind: "OutputField",
name: "status",
arguments: {},
inlineType: [1, ],
namedType: $Schema.OAuthClientApprovalStatus
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OauthClientApproval}.
*
* The scopes the app has been approved for.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OauthClientApproval} |
* | **Path** | `OauthClientApproval.scopes` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface scopes {
kind: "OutputField",
name: "scopes",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OauthClientApproval}.
*
* The reason the person wants to install this OAuth client.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OauthClientApproval} |
* | **Path** | `OauthClientApproval.requestReason` |
* | **Nullability** | Optional |
*/
export interface requestReason {
kind: "OutputField",
name: "requestReason",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OauthClientApproval}.
*
* The reason the request for the OAuth client approval was denied.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OauthClientApproval} |
* | **Path** | `OauthClientApproval.denyReason` |
* | **Nullability** | Optional |
*/
export interface denyReason {
kind: "OutputField",
name: "denyReason",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OauthClientApproval}.
*
* New scopes that were requested for approval after the initial request.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OauthClientApproval} |
* | **Path** | `OauthClientApproval.newlyRequestedScopes` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface newlyRequestedScopes {
kind: "OutputField",
name: "newlyRequestedScopes",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.String
}
