import type * as $Fields from './fields.js'

export * as IssueToRelease from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* [Internal] Join table between issues and releases.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 6 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface IssueToRelease {
kind: "Object",
name: "IssueToRelease",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
issue: $Fields.issue,
release: $Fields.release
}
}