import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationStartTrialInput}.
*
* The plan type to trial.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationStartTrialInput} |
* | **Path** | `OrganizationStartTrialInput.planType` |
* | **Nullability** | Required |
*/
export interface planType {
kind: "InputField",
name: "planType",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}