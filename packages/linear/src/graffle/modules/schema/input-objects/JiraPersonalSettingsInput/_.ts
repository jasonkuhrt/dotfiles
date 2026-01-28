import type * as $Fields from './fields.js'

export * as JiraPersonalSettingsInput from './fields.js'

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
export interface JiraPersonalSettingsInput {
kind: "InputObject",
name: "JiraPersonalSettingsInput",
isAllFieldsNullable: true,
fields: {
siteName: $Fields.siteName
},
type: {
siteName?: $Fields.siteName['type']
}
}