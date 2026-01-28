import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.DeleteOrganizationInput}.
*
* The deletion code to confirm operation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.DeleteOrganizationInput} |
* | **Path** | `DeleteOrganizationInput.deletionCode` |
* | **Nullability** | Required |
*/
export interface deletionCode {
kind: "InputField",
name: "deletionCode",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}