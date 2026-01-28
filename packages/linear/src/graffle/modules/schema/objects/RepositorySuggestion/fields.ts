import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"RepositorySuggestion"`
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
value: "RepositorySuggestion"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.RepositorySuggestion}.
*
* The full name of the repository in owner/name format (e.g., 'acme/backend').
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.RepositorySuggestion} |
* | **Path** | `RepositorySuggestion.repositoryFullName` |
* | **Nullability** | Required |
*/
export interface repositoryFullName {
kind: "OutputField",
name: "repositoryFullName",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.RepositorySuggestion}.
*
* Hostname of the Git service (e.g., 'github.com', 'github.company.com').
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.RepositorySuggestion} |
* | **Path** | `RepositorySuggestion.hostname` |
* | **Nullability** | Optional |
*/
export interface hostname {
kind: "OutputField",
name: "hostname",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.RepositorySuggestion}.
*
* Confidence score from 0.0 to 1.0.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.RepositorySuggestion} |
* | **Path** | `RepositorySuggestion.confidence` |
* | **Nullability** | Required |
*/
export interface confidence {
kind: "OutputField",
name: "confidence",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}
