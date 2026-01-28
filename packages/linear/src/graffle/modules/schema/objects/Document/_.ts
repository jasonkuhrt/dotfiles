import type * as $Fields from './fields.js'

export * as Document from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A document that can be attached to different entities.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 25 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Document {
kind: "Object",
name: "Document",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
title: $Fields.title,
icon: $Fields.icon,
color: $Fields.color,
creator: $Fields.creator,
updatedBy: $Fields.updatedBy,
project: $Fields.project,
initiative: $Fields.initiative,
team: $Fields.team,
issue: $Fields.issue,
release: $Fields.release,
cycle: $Fields.cycle,
slugId: $Fields.slugId,
lastAppliedTemplate: $Fields.lastAppliedTemplate,
hiddenAt: $Fields.hiddenAt,
trashed: $Fields.trashed,
sortOrder: $Fields.sortOrder,
comments: $Fields.comments,
content: $Fields.content,
contentState: $Fields.contentState,
documentContentId: $Fields.documentContentId,
url: $Fields.url
}
}