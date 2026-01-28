import type * as $Fields from './fields.js'

export * as IssueToReleasePayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* [ALPHA] The result of an issueToRelease mutation.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
*/
export interface IssueToReleasePayload {
kind: "Object",
name: "IssueToReleasePayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
issueToRelease: $Fields.issueToRelease,
success: $Fields.success
}
}