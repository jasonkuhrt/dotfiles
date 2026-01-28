import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.PullRequestReferenceInput}.
*
* The owner of the repository (e.g., organization or user name).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequestReferenceInput} |
* | **Path** | `PullRequestReferenceInput.repositoryOwner` |
* | **Nullability** | Required |
*/
export interface repositoryOwner {
kind: "InputField",
name: "repositoryOwner",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.PullRequestReferenceInput}.
*
* The name of the repository.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequestReferenceInput} |
* | **Path** | `PullRequestReferenceInput.repositoryName` |
* | **Nullability** | Required |
*/
export interface repositoryName {
kind: "InputField",
name: "repositoryName",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.PullRequestReferenceInput}.
*
* The pull request number.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.PullRequestReferenceInput} |
* | **Path** | `PullRequestReferenceInput.number` |
* | **Nullability** | Required |
*/
interface $number {
kind: "InputField",
name: "number",
inlineType: [1, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded']
}
export { type $number as number }