import type * as $Fields from './fields.js'

export * as IssueImportJqlCheckPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Whether a custom JQL query is valid or not
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
*/
export interface IssueImportJqlCheckPayload {
kind: "Object",
name: "IssueImportJqlCheckPayload",
fields: {
__typename: $Fields.__typename,
success: $Fields.success,
count: $Fields.count,
error: $Fields.error
}
}