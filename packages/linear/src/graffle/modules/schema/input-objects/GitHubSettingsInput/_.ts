import type * as $Fields from './fields.js'

export * as GitHubSettingsInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface GitHubSettingsInput {
kind: "InputObject",
name: "GitHubSettingsInput",
isAllFieldsNullable: true,
fields: {
pullRequestReviewTool: $Fields.pullRequestReviewTool,
orgAvatarUrl: $Fields.orgAvatarUrl,
orgLogin: $Fields.orgLogin,
repositories: $Fields.repositories,
repositoriesMapping: $Fields.repositoriesMapping,
orgType: $Fields.orgType,
codeAccess: $Fields.codeAccess
},
type: {
pullRequestReviewTool?: $Fields.pullRequestReviewTool['type'],
orgAvatarUrl?: $Fields.orgAvatarUrl['type'],
orgLogin: $Fields.orgLogin['type'],
repositories?: $Fields.repositories['type'],
repositoriesMapping?: $Fields.repositoriesMapping['type'],
orgType?: $Fields.orgType['type'],
codeAccess?: $Fields.codeAccess['type']
}
}