import type * as $Fields from './fields.js'

export * as ProjectAttachment from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Project attachment
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 11 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface ProjectAttachment {
kind: "Object",
name: "ProjectAttachment",
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
metadata: $Fields.metadata,
source: $Fields.source,
sourceType: $Fields.sourceType
}
}