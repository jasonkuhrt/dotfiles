import type * as $Fields from './fields.js'

export * as IssueImportSyncCheckPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Whether an issue import can be synced at the end of an import or not
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 2 |
*/
export interface IssueImportSyncCheckPayload {
kind: "Object",
name: "IssueImportSyncCheckPayload",
fields: {
__typename: $Fields.__typename,
canSync: $Fields.canSync,
error: $Fields.error
}
}