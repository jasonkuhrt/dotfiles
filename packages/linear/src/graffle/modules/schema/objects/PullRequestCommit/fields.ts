import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"PullRequestCommit"`
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
value: "PullRequestCommit"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequestCommit}.
*
* The Git commit SHA.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequestCommit} |
* | **Path** | `PullRequestCommit.sha` |
* | **Nullability** | Required |
*/
export interface sha {
kind: "OutputField",
name: "sha",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequestCommit}.
*
* The full commit message.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequestCommit} |
* | **Path** | `PullRequestCommit.message` |
* | **Nullability** | Required |
*/
export interface message {
kind: "OutputField",
name: "message",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequestCommit}.
*
* The timestamp when the commit was committed (ISO 8601 string).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequestCommit} |
* | **Path** | `PullRequestCommit.committedAt` |
* | **Nullability** | Required |
*/
export interface committedAt {
kind: "OutputField",
name: "committedAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequestCommit}.
*
* Number of additions in this commit.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequestCommit} |
* | **Path** | `PullRequestCommit.additions` |
* | **Nullability** | Required |
*/
export interface additions {
kind: "OutputField",
name: "additions",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequestCommit}.
*
* Number of deletions in this commit.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequestCommit} |
* | **Path** | `PullRequestCommit.deletions` |
* | **Nullability** | Required |
*/
export interface deletions {
kind: "OutputField",
name: "deletions",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequestCommit}.
*
* The number of changed files if available.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequestCommit} |
* | **Path** | `PullRequestCommit.changedFiles` |
* | **Nullability** | Optional |
*/
export interface changedFiles {
kind: "OutputField",
name: "changedFiles",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequestCommit}.
*
* Linear user IDs for commit authors (includes co-authors).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequestCommit} |
* | **Path** | `PullRequestCommit.authorUserIds` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface authorUserIds {
kind: "OutputField",
name: "authorUserIds",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequestCommit}.
*
* External user IDs for commit authors (includes co-authors).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequestCommit} |
* | **Path** | `PullRequestCommit.authorExternalUserIds` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface authorExternalUserIds {
kind: "OutputField",
name: "authorExternalUserIds",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.String
}
