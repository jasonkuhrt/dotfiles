import type * as $Fields from './fields.js'

export * as PullRequestCommit from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* [ALPHA] A pull request commit.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 8 |
*/
export interface PullRequestCommit {
kind: "Object",
name: "PullRequestCommit",
fields: {
__typename: $Fields.__typename,
sha: $Fields.sha,
message: $Fields.message,
committedAt: $Fields.committedAt,
additions: $Fields.additions,
deletions: $Fields.deletions,
changedFiles: $Fields.changedFiles,
authorUserIds: $Fields.authorUserIds,
authorExternalUserIds: $Fields.authorExternalUserIds
}
}