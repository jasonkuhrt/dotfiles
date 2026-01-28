import type * as $Fields from './fields.js'

export * as ArchiveResponse from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Contains requested archived model objects.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 4 |
*/
export interface ArchiveResponse {
kind: "Object",
name: "ArchiveResponse",
fields: {
__typename: $Fields.__typename,
archive: $Fields.archive,
totalCount: $Fields.totalCount,
databaseVersion: $Fields.databaseVersion,
includesDependencies: $Fields.includesDependencies
}
}