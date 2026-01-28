import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationInviteCreateInput}.
*
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationInviteCreateInput} |
* | **Path** | `OrganizationInviteCreateInput.id` |
* | **Nullability** | Optional |
*/
export interface id {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationInviteCreateInput}.
*
* The email of the invitee.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationInviteCreateInput} |
* | **Path** | `OrganizationInviteCreateInput.email` |
* | **Nullability** | Required |
*/
export interface email {
kind: "InputField",
name: "email",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationInviteCreateInput}.
*
* What user role the invite should grant.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserRoleType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.OrganizationInviteCreateInput} |
* | **Path** | `OrganizationInviteCreateInput.role` |
* | **Default** | `"user"` |
* | **Nullability** | Optional |
*/
export interface role {
kind: "InputField",
name: "role",
inlineType: [0, ],
namedType: $Schema.UserRoleType,
type: $Schema.UserRoleType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationInviteCreateInput}.
*
* The teams that the user has been invited to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationInviteCreateInput} |
* | **Path** | `OrganizationInviteCreateInput.teamIds` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface teamIds {
kind: "InputField",
name: "teamIds",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationInviteCreateInput}.
*
* [INTERNAL] Optional metadata about the invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.OrganizationInviteCreateInput} |
* | **Path** | `OrganizationInviteCreateInput.metadata` |
* | **Nullability** | Optional |
*/
export interface metadata {
kind: "InputField",
name: "metadata",
inlineType: [0, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded'] | null | undefined
}