import type * as $Fields from './fields.js'

export * as PullRequest from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* [Internal] A pull request in a version control system.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 13 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface PullRequest {
kind: "Object",
name: "PullRequest",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
title: $Fields.title,
number: $Fields.number,
sourceBranch: $Fields.sourceBranch,
targetBranch: $Fields.targetBranch,
url: $Fields.url,
status: $Fields.status,
mergeSettings: $Fields.mergeSettings,
mergeCommit: $Fields.mergeCommit,
commits: $Fields.commits
}
}