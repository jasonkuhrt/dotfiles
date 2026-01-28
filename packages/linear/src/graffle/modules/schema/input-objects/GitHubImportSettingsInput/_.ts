import type * as $Fields from './fields.js'

export * as GitHubImportSettingsInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 5 |
* | **All Fields Nullable** | Yes |
*/
export interface GitHubImportSettingsInput {
kind: "InputObject",
name: "GitHubImportSettingsInput",
isAllFieldsNullable: true,
fields: {
orgLogin: $Fields.orgLogin,
orgAvatarUrl: $Fields.orgAvatarUrl,
repositories: $Fields.repositories,
labels: $Fields.labels,
orgType: $Fields.orgType
},
type: {
orgLogin: $Fields.orgLogin['type'],
orgAvatarUrl: $Fields.orgAvatarUrl['type'],
repositories: $Fields.repositories['type'],
labels?: $Fields.labels['type'],
orgType: $Fields.orgType['type']
}
}