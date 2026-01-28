import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JoinOrganizationInput}.
*
* The identifier of the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JoinOrganizationInput} |
* | **Path** | `JoinOrganizationInput.organizationId` |
* | **Nullability** | Required |
*/
export interface organizationId {
kind: "InputField",
name: "organizationId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JoinOrganizationInput}.
*
* An optional invite link for an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JoinOrganizationInput} |
* | **Path** | `JoinOrganizationInput.inviteLink` |
* | **Nullability** | Optional |
*/
export interface inviteLink {
kind: "InputField",
name: "inviteLink",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}