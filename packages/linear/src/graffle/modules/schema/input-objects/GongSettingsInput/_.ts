import type * as $Fields from './fields.js'

export * as GongSettingsInput from './fields.js'

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
export interface GongSettingsInput {
kind: "InputObject",
name: "GongSettingsInput",
isAllFieldsNullable: true,
fields: {
importConfig: $Fields.importConfig
},
type: {
importConfig?: $Fields.importConfig['type']
}
}