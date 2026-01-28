import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"OrganizationInviteFullDetailsPayload"`
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
value: "OrganizationInviteFullDetailsPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationInviteFullDetailsPayload}.
*
* The status of the invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationInviteStatus}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.OrganizationInviteFullDetailsPayload} |
* | **Path** | `OrganizationInviteFullDetailsPayload.status` |
* | **Nullability** | Required |
*/
export interface status {
kind: "OutputField",
name: "status",
arguments: {},
inlineType: [1, ],
namedType: $Schema.OrganizationInviteStatus
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationInviteFullDetailsPayload}.
*
* The name of the inviter.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationInviteFullDetailsPayload} |
* | **Path** | `OrganizationInviteFullDetailsPayload.inviter` |
* | **Nullability** | Required |
*/
export interface inviter {
kind: "OutputField",
name: "inviter",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationInviteFullDetailsPayload}.
*
* The email of the invitee.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationInviteFullDetailsPayload} |
* | **Path** | `OrganizationInviteFullDetailsPayload.email` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationInviteFullDetailsPayload}.
*
* What user role the invite should grant.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserRoleType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.OrganizationInviteFullDetailsPayload} |
* | **Path** | `OrganizationInviteFullDetailsPayload.role` |
* | **Nullability** | Required |
*/
export interface role {
kind: "OutputField",
name: "role",
arguments: {},
inlineType: [1, ],
namedType: $Schema.UserRoleType
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationInviteFullDetailsPayload}.
*
* When the invite was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.OrganizationInviteFullDetailsPayload} |
* | **Path** | `OrganizationInviteFullDetailsPayload.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationInviteFullDetailsPayload}.
*
* Name of the workspace the invite is for.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationInviteFullDetailsPayload} |
* | **Path** | `OrganizationInviteFullDetailsPayload.organizationName` |
* | **Nullability** | Required |
*/
export interface organizationName {
kind: "OutputField",
name: "organizationName",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationInviteFullDetailsPayload}.
*
* ID of the workspace the invite is for.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationInviteFullDetailsPayload} |
* | **Path** | `OrganizationInviteFullDetailsPayload.organizationId` |
* | **Nullability** | Required |
*/
export interface organizationId {
kind: "OutputField",
name: "organizationId",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationInviteFullDetailsPayload}.
*
* URL of the workspace logo the invite is for.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationInviteFullDetailsPayload} |
* | **Path** | `OrganizationInviteFullDetailsPayload.organizationLogoUrl` |
* | **Nullability** | Optional |
*/
export interface organizationLogoUrl {
kind: "OutputField",
name: "organizationLogoUrl",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationInviteFullDetailsPayload}.
*
* Whether the invite has already been accepted.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationInviteFullDetailsPayload} |
* | **Path** | `OrganizationInviteFullDetailsPayload.accepted` |
* | **Nullability** | Required |
*/
export interface accepted {
kind: "OutputField",
name: "accepted",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationInviteFullDetailsPayload}.
*
* Whether the invite has expired.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationInviteFullDetailsPayload} |
* | **Path** | `OrganizationInviteFullDetailsPayload.expired` |
* | **Nullability** | Required |
*/
export interface expired {
kind: "OutputField",
name: "expired",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationInviteFullDetailsPayload}.
*
* Allowed authentication providers, empty array means all are allowed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationInviteFullDetailsPayload} |
* | **Path** | `OrganizationInviteFullDetailsPayload.allowedAuthServices` |
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
