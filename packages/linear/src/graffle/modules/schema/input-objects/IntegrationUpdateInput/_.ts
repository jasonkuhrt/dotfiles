import type * as $Fields from './fields.js'

export * as IntegrationUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 1 |
* | **All Fields Nullable** | Yes |
*/
export interface IntegrationUpdateInput {
kind: "InputObject",
name: "IntegrationUpdateInput",
isAllFieldsNullable: true,
fields: {
settings: $Fields.settings
},
type: {
settings?: $Fields.settings['type']
}
}