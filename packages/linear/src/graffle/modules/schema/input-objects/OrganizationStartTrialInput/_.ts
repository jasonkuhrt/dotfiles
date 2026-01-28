import type * as $Fields from './fields.js'

export * as OrganizationStartTrialInput from './fields.js'

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
export interface OrganizationStartTrialInput {
kind: "InputObject",
name: "OrganizationStartTrialInput",
isAllFieldsNullable: false,
fields: {
planType: $Fields.planType
},
type: {
planType: $Fields.planType['type']
}
}