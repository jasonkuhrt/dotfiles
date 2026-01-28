import type * as $Fields from './fields.js'

export * as GitLabSettingsInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface GitLabSettingsInput {
kind: "InputObject",
name: "GitLabSettingsInput",
isAllFieldsNullable: true,
fields: {
url: $Fields.url,
readonly: $Fields.readonly,
expiresAt: $Fields.expiresAt
},
type: {
url?: $Fields.url['type'],
readonly?: $Fields.readonly['type'],
expiresAt?: $Fields.expiresAt['type']
}
}