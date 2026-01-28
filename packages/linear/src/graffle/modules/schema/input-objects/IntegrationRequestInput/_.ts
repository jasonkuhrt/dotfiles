import type * as $Fields from './fields.js'

export * as IntegrationRequestInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | Yes |
*/
export interface IntegrationRequestInput {
kind: "InputObject",
name: "IntegrationRequestInput",
isAllFieldsNullable: true,
fields: {
email: $Fields.email,
name: $Fields.name
},
type: {
email?: $Fields.email['type'],
name: $Fields.name['type']
}
}