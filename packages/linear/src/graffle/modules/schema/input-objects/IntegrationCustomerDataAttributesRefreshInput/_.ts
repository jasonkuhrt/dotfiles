import type * as $Fields from './fields.js'

export * as IntegrationCustomerDataAttributesRefreshInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 1 |
* | **All Fields Nullable** | No |
*/
export interface IntegrationCustomerDataAttributesRefreshInput {
kind: "InputObject",
name: "IntegrationCustomerDataAttributesRefreshInput",
isAllFieldsNullable: false,
fields: {
service: $Fields.service
},
type: {
service: $Fields.service['type']
}
}