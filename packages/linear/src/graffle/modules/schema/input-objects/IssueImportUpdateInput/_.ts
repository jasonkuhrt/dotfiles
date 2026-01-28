import type * as $Fields from './fields.js'

export * as IssueImportUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 1 |
* | **All Fields Nullable** | No |
*/
export interface IssueImportUpdateInput {
kind: "InputObject",
name: "IssueImportUpdateInput",
isAllFieldsNullable: false,
fields: {
mapping: $Fields.mapping
},
type: {
mapping: $Fields.mapping['type']
}
}