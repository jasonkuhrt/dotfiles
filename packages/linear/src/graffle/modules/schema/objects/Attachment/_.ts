import type * as $Fields from './fields.js'

export * as Attachment from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Issue attachment (e.g. support ticket, pull request).
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 16 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Attachment {
kind: "Object",
name: "Attachment",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
title: $Fields.title,
subtitle: $Fields.subtitle,
url: $Fields.url,
creator: $Fields.creator,
externalUserCreator: $Fields.externalUserCreator,
metadata: $Fields.metadata,
source: $Fields.source,
sourceType: $Fields.sourceType,
groupBySource: $Fields.groupBySource,
originalIssue: $Fields.originalIssue,
issue: $Fields.issue,
bodyData: $Fields.bodyData
}
}