import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubSettingsInput}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PullRequestReviewTool} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.GitHubSettingsInput} |
* | **Path** | `GitHubSettingsInput.pullRequestReviewTool` |
* | **Nullability** | Optional |
*/
export interface pullRequestReviewTool {
kind: "InputField",
name: "pullRequestReviewTool",
inlineType: [0, ],
namedType: $Schema.PullRequestReviewTool,
type: $Schema.PullRequestReviewTool['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubSettingsInput}.
*
* The avatar URL for the GitHub organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitHubSettingsInput} |
* | **Path** | `GitHubSettingsInput.orgAvatarUrl` |
* | **Nullability** | Optional |
*/
export interface orgAvatarUrl {
kind: "InputField",
name: "orgAvatarUrl",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubSettingsInput}.
*
* The GitHub organization's name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitHubSettingsInput} |
* | **Path** | `GitHubSettingsInput.orgLogin` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubSettingsInput}.
*
* The names of the repositories connected for the GitHub integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitHubRepoInput}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.GitHubSettingsInput} |
* | **Path** | `GitHubSettingsInput.repositories` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface repositories {
kind: "InputField",
name: "repositories",
inlineType: [0, [1, ]],
namedType: $Schema.GitHubRepoInput,
type: readonly ($Schema.GitHubRepoInput['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubSettingsInput}.
*
* Mapping of team to repository for syncing.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitHubRepoMappingInput}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.GitHubSettingsInput} |
* | **Path** | `GitHubSettingsInput.repositoriesMapping` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface repositoriesMapping {
kind: "InputField",
name: "repositoriesMapping",
inlineType: [0, [1, ]],
namedType: $Schema.GitHubRepoMappingInput,
type: readonly ($Schema.GitHubRepoMappingInput['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubSettingsInput}.
*
* The type of Github org
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GithubOrgType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.GitHubSettingsInput} |
* | **Path** | `GitHubSettingsInput.orgType` |
* | **Nullability** | Optional |
*/
export interface orgType {
kind: "InputField",
name: "orgType",
inlineType: [0, ],
namedType: $Schema.GithubOrgType,
type: $Schema.GithubOrgType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubSettingsInput}.
*
* Whether the integration has code access
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitHubSettingsInput} |
* | **Path** | `GitHubSettingsInput.codeAccess` |
* | **Nullability** | Optional |
*/
export interface codeAccess {
kind: "InputField",
name: "codeAccess",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}