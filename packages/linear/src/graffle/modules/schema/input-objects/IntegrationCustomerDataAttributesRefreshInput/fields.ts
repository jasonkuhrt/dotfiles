import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationCustomerDataAttributesRefreshInput}.
*
* The integration service to refresh customer data attributes from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntegrationCustomerDataAttributesRefreshInput} |
* | **Path** | `IntegrationCustomerDataAttributesRefreshInput.service` |
* | **Nullability** | Required |
*/
export interface service {
kind: "InputField",
name: "service",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}