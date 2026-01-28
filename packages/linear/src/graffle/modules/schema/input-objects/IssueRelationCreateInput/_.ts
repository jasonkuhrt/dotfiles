import type * as $Fields from './fields.js'

export * as IssueRelationCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface IssueRelationCreateInput {
kind: "InputObject",
name: "IssueRelationCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
type: $Fields.type,
issueId: $Fields.issueId,
relatedIssueId: $Fields.relatedIssueId
},
type: {
id?: $Fields.id['type'],
type: $Fields.type['type'],
issueId: $Fields.issueId['type'],
relatedIssueId: $Fields.relatedIssueId['type']
}
}