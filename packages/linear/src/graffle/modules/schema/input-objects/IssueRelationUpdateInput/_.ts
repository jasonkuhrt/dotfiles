import type * as $Fields from './fields.js'

export * as IssueRelationUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface IssueRelationUpdateInput {
kind: "InputObject",
name: "IssueRelationUpdateInput",
isAllFieldsNullable: true,
fields: {
type: $Fields.type,
issueId: $Fields.issueId,
relatedIssueId: $Fields.relatedIssueId
},
type: {
type?: $Fields.type['type'],
issueId?: $Fields.issueId['type'],
relatedIssueId?: $Fields.relatedIssueId['type']
}
}