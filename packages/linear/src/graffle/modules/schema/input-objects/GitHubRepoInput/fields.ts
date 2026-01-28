import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubRepoInput}.
*
* The GitHub repo id.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitHubRepoInput} |
* | **Path** | `GitHubRepoInput.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubRepoInput}.
*
* The full name of the repository.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitHubRepoInput} |
* | **Path** | `GitHubRepoInput.fullName` |
* | **Nullability** | Required |
*/
export interface fullName {
kind: "InputField",
name: "fullName",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubRepoInput}.
*
* Whether the repository is archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitHubRepoInput} |
* | **Path** | `GitHubRepoInput.archived` |
* | **Nullability** | Optional |
*/
export interface archived {
kind: "InputField",
name: "archived",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}