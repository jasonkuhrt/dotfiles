import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"ExternalEntityInfoGithubMetadata"`
*
* {@link https://graphql.org/learn/queries/#meta-fields | GraphQL __typename documentation}
*/
export interface __typename {
kind: "OutputField",
name: "__typename",
arguments: {},
inlineType: [1],
namedType: {
kind: "__typename",
value: "ExternalEntityInfoGithubMetadata"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ExternalEntityInfoGithubMetadata}.
*
* The repository name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ExternalEntityInfoGithubMetadata} |
* | **Path** | `ExternalEntityInfoGithubMetadata.repo` |
* | **Nullability** | Optional |
*/
export interface repo {
kind: "OutputField",
name: "repo",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ExternalEntityInfoGithubMetadata}.
*
* The owner of the repository.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ExternalEntityInfoGithubMetadata} |
* | **Path** | `ExternalEntityInfoGithubMetadata.owner` |
* | **Nullability** | Optional |
*/
export interface owner {
kind: "OutputField",
name: "owner",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ExternalEntityInfoGithubMetadata}.
*
* The number of the issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ExternalEntityInfoGithubMetadata} |
* | **Path** | `ExternalEntityInfoGithubMetadata.number` |
* | **Nullability** | Optional |
*/
interface $number {
kind: "OutputField",
name: "number",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Float
}
export { type $number as number }
