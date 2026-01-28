import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"PullRequestMergeSettings"`
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
value: "PullRequestMergeSettings"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequestMergeSettings}.
*
* Whether merge queue is enabled for this repository.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequestMergeSettings} |
* | **Path** | `PullRequestMergeSettings.isMergeQueueEnabled` |
* | **Nullability** | Required |
*/
export interface isMergeQueueEnabled {
kind: "OutputField",
name: "isMergeQueueEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequestMergeSettings}.
*
* Whether squash merge is allowed for this pull request's repository.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequestMergeSettings} |
* | **Path** | `PullRequestMergeSettings.squashMergeAllowed` |
* | **Nullability** | Required |
*/
export interface squashMergeAllowed {
kind: "OutputField",
name: "squashMergeAllowed",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequestMergeSettings}.
*
* Whether auto-merge is allowed for the PR's repository.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequestMergeSettings} |
* | **Path** | `PullRequestMergeSettings.autoMergeAllowed` |
* | **Nullability** | Required |
*/
export interface autoMergeAllowed {
kind: "OutputField",
name: "autoMergeAllowed",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequestMergeSettings}.
*
* Whether rebase merge is allowed for pull requests PR's repository.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequestMergeSettings} |
* | **Path** | `PullRequestMergeSettings.rebaseMergeAllowed` |
* | **Nullability** | Required |
*/
export interface rebaseMergeAllowed {
kind: "OutputField",
name: "rebaseMergeAllowed",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequestMergeSettings}.
*
* Whether merge commits are allowed for pull requests PR's repository.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequestMergeSettings} |
* | **Path** | `PullRequestMergeSettings.mergeCommitAllowed` |
* | **Nullability** | Required |
*/
export interface mergeCommitAllowed {
kind: "OutputField",
name: "mergeCommitAllowed",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequestMergeSettings}.
*
* Whether the branch will be deleted when the pull request is merged.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequestMergeSettings} |
* | **Path** | `PullRequestMergeSettings.deleteBranchOnMerge` |
* | **Nullability** | Required |
*/
export interface deleteBranchOnMerge {
kind: "OutputField",
name: "deleteBranchOnMerge",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequestMergeSettings}.
*
* The method used to merge a pull request.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PullRequestMergeMethod} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.PullRequestMergeSettings} |
* | **Path** | `PullRequestMergeSettings.mergeQueueMergeMethod` |
* | **Nullability** | Optional |
*/
export interface mergeQueueMergeMethod {
kind: "OutputField",
name: "mergeQueueMergeMethod",
arguments: {},
inlineType: [0, ],
namedType: $Schema.PullRequestMergeMethod
}
