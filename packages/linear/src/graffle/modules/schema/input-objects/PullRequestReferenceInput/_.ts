import type * as $Fields from './fields.js'

export * as PullRequestReferenceInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Input for referencing a pull request by repository and number.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | No |
*/
export interface PullRequestReferenceInput {
kind: "InputObject",
name: "PullRequestReferenceInput",
isAllFieldsNullable: false,
fields: {
repositoryOwner: $Fields.repositoryOwner,
repositoryName: $Fields.repositoryName,
number: $Fields.number
},
type: {
repositoryOwner: $Fields.repositoryOwner['type'],
repositoryName: $Fields.repositoryName['type'],
number: $Fields.number['type']
}
}