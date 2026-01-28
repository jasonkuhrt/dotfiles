import type * as $Fields from './fields.js'

export * as GitHubPersonalSettingsInput from './fields.js'

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
export interface GitHubPersonalSettingsInput {
kind: "InputObject",
name: "GitHubPersonalSettingsInput",
isAllFieldsNullable: false,
fields: {
login: $Fields.login
},
type: {
login: $Fields.login['type']
}
}