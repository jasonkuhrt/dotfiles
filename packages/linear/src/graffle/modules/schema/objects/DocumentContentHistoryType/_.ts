import type * as $Fields from './fields.js'

export * as DocumentContentHistoryType from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 5 |
*/
export interface DocumentContentHistoryType {
kind: "Object",
name: "DocumentContentHistoryType",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
contentDataSnapshotAt: $Fields.contentDataSnapshotAt,
contentData: $Fields.contentData,
actorIds: $Fields.actorIds
}
}