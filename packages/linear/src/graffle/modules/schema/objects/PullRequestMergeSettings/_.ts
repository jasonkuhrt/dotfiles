import type * as $Fields from './fields.js'

export * as PullRequestMergeSettings from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* [Internal] Merge settings for a pull request
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 7 |
*/
export interface PullRequestMergeSettings {
kind: "Object",
name: "PullRequestMergeSettings",
fields: {
__typename: $Fields.__typename,
isMergeQueueEnabled: $Fields.isMergeQueueEnabled,
squashMergeAllowed: $Fields.squashMergeAllowed,
autoMergeAllowed: $Fields.autoMergeAllowed,
rebaseMergeAllowed: $Fields.rebaseMergeAllowed,
mergeCommitAllowed: $Fields.mergeCommitAllowed,
deleteBranchOnMerge: $Fields.deleteBranchOnMerge,
mergeQueueMergeMethod: $Fields.mergeQueueMergeMethod
}
}