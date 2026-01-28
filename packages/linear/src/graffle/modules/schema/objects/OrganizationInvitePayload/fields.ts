import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"OrganizationInvitePayload"`
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
value: "OrganizationInvitePayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationInvitePayload}.
*
* The identifier of the last sync operation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationInvitePayload} |
* | **Path** | `OrganizationInvitePayload.lastSyncId` |
* | **Nullability** | Required |
*/
export interface lastSyncId {
kind: "OutputField",
name: "lastSyncId",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationInvitePayload}.
*
* The organization invite that was created or updated.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationInvite}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.OrganizationInvitePayload} |
* | **Path** | `OrganizationInvitePayload.organizationInvite` |
* | **Nullability** | Required |
*/
export interface organizationInvite {
kind: "OutputField",
name: "organizationInvite",
arguments: {},
inlineType: [1, ],
namedType: $Schema.OrganizationInvite
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationInvitePayload}.
*
* Whether the operation was successful.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationInvitePayload} |
* | **Path** | `OrganizationInvitePayload.success` |
* | **Nullability** | Required |
*/
export interface success {
kind: "OutputField",
name: "success",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}
