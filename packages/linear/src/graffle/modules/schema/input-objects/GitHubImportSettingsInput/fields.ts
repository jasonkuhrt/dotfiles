import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubImportSettingsInput}.
*
* The GitHub organization's name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitHubImportSettingsInput} |
* | **Path** | `GitHubImportSettingsInput.orgLogin` |
* | **Nullability** | Required |
*/
export interface orgLogin {
kind: "InputField",
name: "orgLogin",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubImportSettingsInput}.
*
* The avatar URL for the GitHub organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitHubImportSettingsInput} |
* | **Path** | `GitHubImportSettingsInput.orgAvatarUrl` |
* | **Nullability** | Required |
*/
export interface orgAvatarUrl {
kind: "InputField",
name: "orgAvatarUrl",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubImportSettingsInput}.
*
* The names of the repositories connected for the GitHub integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitHubRepoInput}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.GitHubImportSettingsInput} |
* | **Path** | `GitHubImportSettingsInput.repositories` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface repositories {
kind: "InputField",
name: "repositories",
inlineType: [1, [1, ]],
namedType: $Schema.GitHubRepoInput,
type: readonly ($Schema.GitHubRepoInput['type'])[]
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubImportSettingsInput}.
*
* A map storing all available issue labels per repository
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.GitHubImportSettingsInput} |
* | **Path** | `GitHubImportSettingsInput.labels` |
* | **Nullability** | Optional |
*/
export interface labels {
kind: "InputField",
name: "labels",
inlineType: [0, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubImportSettingsInput}.
*
* The type of Github org
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GithubOrgType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.GitHubImportSettingsInput} |
* | **Path** | `GitHubImportSettingsInput.orgType` |
* | **Nullability** | Required |
*/
export interface orgType {
kind: "InputField",
name: "orgType",
inlineType: [1, ],
namedType: $Schema.GithubOrgType,
type: $Schema.GithubOrgType['members']
}