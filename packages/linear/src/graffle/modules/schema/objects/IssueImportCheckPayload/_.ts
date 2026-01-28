import type * as $Fields from './fields.js'

export * as IssueImportCheckPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 1 |
*/
export interface IssueImportCheckPayload {
kind: "Object",
name: "IssueImportCheckPayload",
fields: {
__typename: $Fields.__typename,
success: $Fields.success
}
}