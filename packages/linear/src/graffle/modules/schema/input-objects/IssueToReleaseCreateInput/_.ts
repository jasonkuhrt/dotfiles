import type * as $Fields from './fields.js'

export * as IssueToReleaseCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* [ALPHA] The properties of the issueToRelease to create.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface IssueToReleaseCreateInput {
kind: "InputObject",
name: "IssueToReleaseCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
issueId: $Fields.issueId,
releaseId: $Fields.releaseId
},
type: {
id?: $Fields.id['type'],
issueId: $Fields.issueId['type'],
releaseId: $Fields.releaseId['type']
}
}