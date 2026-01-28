import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubRepoMappingInput}.
*
* The unique identifier for this mapping.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitHubRepoMappingInput} |
* | **Path** | `GitHubRepoMappingInput.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubRepoMappingInput}.
*
* The Linear team id to map to the given project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitHubRepoMappingInput} |
* | **Path** | `GitHubRepoMappingInput.linearTeamId` |
* | **Nullability** | Required |
*/
export interface linearTeamId {
kind: "InputField",
name: "linearTeamId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubRepoMappingInput}.
*
* The GitHub repo id.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitHubRepoMappingInput} |
* | **Path** | `GitHubRepoMappingInput.gitHubRepoId` |
* | **Nullability** | Required |
*/
export interface gitHubRepoId {
kind: "InputField",
name: "gitHubRepoId",
inlineType: [1, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubRepoMappingInput}.
*
* Labels to filter incoming GitHub issue creation by.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitHubRepoMappingInput} |
* | **Path** | `GitHubRepoMappingInput.gitHubLabels` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface gitHubLabels {
kind: "InputField",
name: "gitHubLabels",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubRepoMappingInput}.
*
* Whether the sync for this mapping is bidirectional.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitHubRepoMappingInput} |
* | **Path** | `GitHubRepoMappingInput.bidirectional` |
* | **Nullability** | Optional |
*/
export interface bidirectional {
kind: "InputField",
name: "bidirectional",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubRepoMappingInput}.
*
* Whether this mapping is the default one for issue creation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitHubRepoMappingInput} |
* | **Path** | `GitHubRepoMappingInput.default` |
* | **Nullability** | Optional |
*/
interface $default {
kind: "InputField",
name: "default",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
export { type $default as default }