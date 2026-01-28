import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"PullRequest"`
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
value: "PullRequest"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequest}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequest} |
* | **Path** | `PullRequest.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ID
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequest}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.PullRequest} |
* | **Path** | `PullRequest.createdAt` |
* | **Nullability** | Required |
*/
export interface createdAt {
kind: "OutputField",
name: "createdAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequest}.
*
* The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
* been updated after creation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.PullRequest} |
* | **Path** | `PullRequest.updatedAt` |
* | **Nullability** | Required |
*/
export interface updatedAt {
kind: "OutputField",
name: "updatedAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequest}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.PullRequest} |
* | **Path** | `PullRequest.archivedAt` |
* | **Nullability** | Optional |
*/
export interface archivedAt {
kind: "OutputField",
name: "archivedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequest}.
*
* The title of the pull request.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequest} |
* | **Path** | `PullRequest.title` |
* | **Nullability** | Required |
*/
export interface title {
kind: "OutputField",
name: "title",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequest}.
*
* The number of the pull request in the version control system.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequest} |
* | **Path** | `PullRequest.number` |
* | **Nullability** | Required |
*/
interface $number {
kind: "OutputField",
name: "number",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}
export { type $number as number }

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequest}.
*
* The source branch of the pull request.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequest} |
* | **Path** | `PullRequest.sourceBranch` |
* | **Nullability** | Required |
*/
export interface sourceBranch {
kind: "OutputField",
name: "sourceBranch",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequest}.
*
* The target branch of the pull request.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequest} |
* | **Path** | `PullRequest.targetBranch` |
* | **Nullability** | Required |
*/
export interface targetBranch {
kind: "OutputField",
name: "targetBranch",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequest}.
*
* The URL of the pull request in the version control system.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequest} |
* | **Path** | `PullRequest.url` |
* | **Nullability** | Required |
*/
export interface url {
kind: "OutputField",
name: "url",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequest}.
*
* The status of the pull request.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PullRequestStatus}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.PullRequest} |
* | **Path** | `PullRequest.status` |
* | **Nullability** | Required |
*/
export interface status {
kind: "OutputField",
name: "status",
arguments: {},
inlineType: [1, ],
namedType: $Schema.PullRequestStatus
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequest}.
*
* Merge settings for this pull request.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PullRequestMergeSettings} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.PullRequest} |
* | **Path** | `PullRequest.mergeSettings` |
* | **Nullability** | Optional |
*/
export interface mergeSettings {
kind: "OutputField",
name: "mergeSettings",
arguments: {},
inlineType: [0, ],
namedType: $Schema.PullRequestMergeSettings
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequest}.
*
* The merge commit created when the PR was merged.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PullRequestCommit} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.PullRequest} |
* | **Path** | `PullRequest.mergeCommit` |
* | **Nullability** | Optional |
*/
export interface mergeCommit {
kind: "OutputField",
name: "mergeCommit",
arguments: {},
inlineType: [0, ],
namedType: $Schema.PullRequestCommit
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.PullRequest}.
*
* [ALPHA] The commits associated with the pull request.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PullRequestCommit}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.PullRequest} |
* | **Path** | `PullRequest.commits` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface commits {
kind: "OutputField",
name: "commits",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.PullRequestCommit
}
