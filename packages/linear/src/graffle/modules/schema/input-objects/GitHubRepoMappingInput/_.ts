import type * as $Fields from './fields.js'

export * as GitHubRepoMappingInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 6 |
* | **All Fields Nullable** | Yes |
*/
export interface GitHubRepoMappingInput {
kind: "InputObject",
name: "GitHubRepoMappingInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
linearTeamId: $Fields.linearTeamId,
gitHubRepoId: $Fields.gitHubRepoId,
gitHubLabels: $Fields.gitHubLabels,
bidirectional: $Fields.bidirectional,
default: $Fields.default
},
type: {
id: $Fields.id['type'],
linearTeamId: $Fields.linearTeamId['type'],
gitHubRepoId: $Fields.gitHubRepoId['type'],
gitHubLabels?: $Fields.gitHubLabels['type'],
bidirectional?: $Fields.bidirectional['type'],
default?: $Fields.default['type']
}
}