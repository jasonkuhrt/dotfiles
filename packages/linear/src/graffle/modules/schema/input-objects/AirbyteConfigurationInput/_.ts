import type * as $Fields from './fields.js'

export * as AirbyteConfigurationInput from './fields.js'

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
export interface AirbyteConfigurationInput {
kind: "InputObject",
name: "AirbyteConfigurationInput",
isAllFieldsNullable: false,
fields: {
apiKey: $Fields.apiKey
},
type: {
apiKey: $Fields.apiKey['type']
}
}