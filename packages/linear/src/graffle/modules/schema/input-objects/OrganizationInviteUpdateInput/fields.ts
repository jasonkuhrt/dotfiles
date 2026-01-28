import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationInviteUpdateInput}.
*
* The teams that the user has been invited to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationInviteUpdateInput} |
* | **Path** | `OrganizationInviteUpdateInput.teamIds` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface teamIds {
kind: "InputField",
name: "teamIds",
inlineType: [1, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[]
}